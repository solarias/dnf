
(function() {


//=================================================================================================================
//※ 변수
//=================================================================================================================
//수치
var round = 0;//현재 라운드
var people = 0;//현재 참여 인원

var arr_go = [];//대기 - 출전 인원
var arr_no = [];//대기 - 판정승
var arr_win = [];//배틀 - 승리 인원

//=================================================================================================================
//※ 출현 캐릭터 리스트
//=================================================================================================================
//※ chaList[0] : 이름
//※ chaList[1] : 이미지 이름
//※ chaList[2] : 특성 (다중 특성 : 쉼표로 구분)
var chaList = [];

//이미지
var images = "./images/worldcup_hots/";
var imageList = [];//이미지 선로딩용
var imageList2 = [];//이미지 선로딩용

		//=================================================================================================================
		//※ 보조 함수
		//=================================================================================================================
		// 이미지 선로딩 (원본 출처 : http://stackoverflow.com/questions/8264528/image-preloader-javascript-that-supports-eventNames/8265310#8265310)
		function loadImages(arr,callBack){
			//변수 세팅
			var imagesArray = [];
			var img;
			var remaining = arr[0].length;
			var remaining2 = arr[1].length;
			var bg = "", bg2 = "";
			//로딩 게시
			for (let i = 0; i < arr[0].length; i++) {
				bg += "url('" + arr[0][i] + "'), ";
				--remaining;
			}
			for (let i = 0; i < arr[1].length; i++) {
				img = new Image();
				img.onload = function() {
					//외부 처리
					var percent = Math.round((((arr[1].length - remaining2 + 1)/arr[1].length)*100),0).toString()+"%";
					$("#loading_bar").style.width = percent;
					$("#loading_num").innerHTML = (arr[1].length - remaining2 + 1).toString() + " / " + arr[1].length.toString();
					//내부 처리
					--remaining2;
					if (remaining2 <= 0) {
						bg = bg.slice(0, -2);
						$("#imagePreloader2").style.backgroundImage = bg;
						callBack();
					};
				};
				img.onerror = function() {
					//외부 처리
					var percent = Math.round((((arr[1].length - remaining2 + 1)/arr[1].length)*100),0).toString()+"%";
					$("#loading_bar").style.width = percent;
					$("#loading_num").innerHTML = (arr[1].length - remaining2 + 1).toString() + " / " + arr[1].length.toString();
					--remaining2;
					if (remaining2 <= 0) {
						bg = bg.slice(0, -2);
						$("#imagePreloader2").style.backgroundImage = bg;
						callBack();
					};
				};
				img.src = arr[1][i];
				bg += "url('" + arr[1][i] + "'), ";
			}
		}


//=================================================================================================================
//※ 구동 함수
//=================================================================================================================
//현 라운드 출전 인원 정리
function ready(type) {
	//1. 창 활성화
	$("#frame_intro").style.display = "none";
	$("#frame_loading").style.display = "none";
	$("#frame_ready").style.display = "inline-block";
	$("#frame_battle").style.display = "none";
	$("#frame_victory").style.display = "none";

	//2. 라운드 증가
	round += 1;

	//3. IF 첫 라운드 ? 인원 불러오기
	if (round == 1) {
		//3-1.첫 라운드 : 등록
		for (var i=0;i<chaList.length;i++){
			if (chaList[i][0] != "") {
				switch (type) {
					case "all":
						arr_go.push(chaList[i]);

						break;
					default:
						if (chaList[i][2].indexOf(type) != -1) {
							arr_go.push(chaList[i]);
						}

						break;
				}
			}
		}
	} else {
		//3-2-1. 이전 출전자 비우기
		arr_go = [];
		//3-2-2. 새 출전자 등록
		for (var i=0;i<arr_win.length;i++){
			arr_go.push(arr_win[i]);
		}
		//3-2-3. 이전 우승자 비우기
		arr_win = [];
	}

	//4. 인원 셔플
	arr_go = shuffle(arr_go)

	//5. 부전승 체크
		//5-1. 부전승 칸 비우기
		arr_no = []
		//5-2. 부전승 등록
		if (arr_go.length % 2 != 0) {
			arr_no.push(arr_go[arr_go.length - 1]);
			arr_go.pop();
		}

	//6. 현재 참여 인원 기억
	people = arr_go.length + arr_no.length;

	//7. 각종 수치 표시
	$("#ready_round").innerHTML = round.toString();
	$("#ready_people").innerHTML = people.toString();

	//8. 출전 인원 표시
		//a. 기존 출전자 지우기
		$("#ready_image_go").innerHTML = "";
		//b. 새 출전자 등록
		for (var i=0;i<arr_go.length;i++) {
			//b-1 이미지 불러오기
			var img = document.createElement("img");
			img.src = arr_go[i][1];
				var img2 = document.createElement("img");
				img2.src = arr_go[i][2];
			img.style.backgroundImage = "url('" + arr_go[i][2] + "')";
			//b-2. 이미지 사이즈 조절
			let w = (img2.naturalWidth/img2.naturalHeight) * 200;
			let h = 200;
			img.style.width = w.toString() + "px";
			img.style.height = h.toString() + "px";
			img.style.backgroundSize = img.style.width + " " + img.style.height;
				img2.src = "";
			//b-3. 이미지 배치
			$("#ready_image_go").appendChild(img);
		}
		//c. 스크롤 올리기
		$("#ready_image_go").scrollTop = "0px";

	//9. 부전승 표시 : 하지 않음

	//10. 시작 버튼
	$("#ready_start").onclick = function() {
		//7-1. 이미지 숨겨두기
		$("#battle_img_left").className = "battle_img";
		$("#battle_img_right").className = "battle_img";
		$("#battle_img_left").style.left = "-450px";
		$("#battle_img_right").style.right = "-450px";
		//7-2. 프레임 전환
		$("#frame_ready").style.display = "none";
		$("#frame_battle").style.display = "block";
		//7-3. 이미지 배치 시작
		battle_ready(0);
	}

	//11. 처음으로 버튼
	$("#ready_reset").onclick = function() {
		if (confirm("첫 화면으로 돌아가시겠습니까?")) {
			//1. 변수 초기화
			round = 0;//현재 라운드
			people = 0;//현재 참여 인원

			arr_go = [];//대기 - 출전 인원
			arr_no = [];//대기 - 판정승
			arr_win = [];//배틀 - 승리 인원

			//2. 창 표시
			$("#frame_intro").style.display = "inline-block";
			$("#frame_ready").style.display = "none";
			$("#frame_battle").style.display = "none";
			$("#frame_victory").style.display = "none";
		}
	}
}

//전투 준비 & 개시
function battle_ready(counter){
	if (counter == 0) {
		//최초 : 배치
		//1. 라운드 & 남은 회차
		$("#battle_round").innerHTML = round.toString();
		$("#battle_people").innerHTML = people.toString();
		$("#battle_now").innerHTML = (arr_win.length + 1).toString();
		$("#battle_all").innerHTML = Math.floor(people/2).toString();
		//2. 이름 표시
		$("#battle_name_left").innerHTML = "ID : " + arr_go[0][0] +
			" <a href='https://safebooru.org/index.php?page=post&s=view&id=" + arr_go[0][0] + "' target='_blank'>(원출처 보기)</a>";
		$("#battle_name_right").innerHTML = "ID : " + arr_go[1][0] +
			" <a href='https://safebooru.org/index.php?page=post&s=view&id=" + arr_go[1][0] + "' target='_blank'>(원출처 보기)</a>";
		//3. 이미지 표시
			//3-1. 좌측 이미지
				//a. 이미지 비우기
				$("#battle_img_left").innerHTML = "";
				//b. 이미지 불러오기
				var img = document.createElement("img");
				img.src = arr_go[0][1];
					var img2 = document.createElement("img");
					img2.src = arr_go[0][2];
				img.style.backgroundImage = "url('" + arr_go[0][2] + "')";
				//c. 이미지 사이즈 조절
				if (img2.naturalWidth / 370 >= img2.naturalHeight / 480) {
					img.style.width = "370px";
					img.style.height = ((img2.naturalHeight/img2.naturalWidth) * 370).toString() + "px";
				} else {
					img.style.width = ((img2.naturalWidth/img2.naturalHeight) * 480).toString() + "px";
					img.style.height = "480px";
				}
				img.style.backgroundSize = img.style.width + " " + img.style.height;
					img2.src = "";
				//d. 이미지 배치
				$("#battle_img_left").appendChild(img);
			//3-2. 우측 이미지
				//a. 이미지 비우기
				$("#battle_img_right").innerHTML = "";
				//b. 이미지 불러오기
				var img = document.createElement("img");
				img.src = arr_go[1][1];
					var img2 = document.createElement("img");
					img2.src = arr_go[1][2];
				img.style.backgroundImage = "url('" + arr_go[1][2] + "')";
				//c. 이미지 사이즈 조절
				if (img2.naturalWidth / 370 >= img2.naturalHeight / 480) {
					img.style.width = "370px";
					img.style.height = ((img2.naturalHeight/img2.naturalWidth) * 370).toString() + "px";
				} else {
					img.style.width = ((img2.naturalWidth/img2.naturalHeight) * 480).toString() + "px";
					img.style.height = "480px";
				}
				img.style.backgroundSize = img.style.width + " " + img.style.height;
					img2.src = "";
				//d. 이미지 배치
				$("#battle_img_right").appendChild(img);
	}
	if (counter < 470) {
		//중간 : 캐릭터 이동
		//1. 이미지 이동
		$("#battle_img_left").style.left = ($("#battle_img_left").offsetLeft + 10).toString() + "px";
		$("#battle_img_left").style.opacity = Math.max(0,(counter/470)).toString();
		$("#battle_img_right").style.right = (-($("#battle_img_right").offsetWidth + $("#battle_img_right").offsetLeft - 900) + 10).toString() + "px";
		$("#battle_img_right").style.opacity = Math.max(0,(counter/470)).toString();

		//2. 다음 이동 대기
		setTimeout(function() {
			battle_ready(counter + 10);
		},1000/(60*3));

	} else {
		//나머지 : 전투 실시 (클릭 대기)
		//1. 이미지 정지(자동)

		//2. 이미지선택 효과 활성화
		$("#battle_img_left").classList.add("selectable");
		$("#battle_img_right").classList.add("selectable");
		//3. 랜덤 버튼 활성화
		$("#battle_random").disabled = "";
		$("#battle_random").onclick = function() {
			var random_num = Math.floor(Math.random() * 2);
			battle_effect(random_num);
		}
		//4. 이미지 클릭(+리셋) 이벤트
		$("#battle_img_left").onclick = function() {
			battle_effect(0);
		}
		$("#battle_img_right").onclick = function() {
			battle_effect(1);
		}
		$("#battle_reset").disabled = "";
		$("#battle_reset").onclick = function() {
			if (confirm("첫 화면으로 돌아가시겠습니까?")) {
				//1. 변수 초기화
				round = 0;//현재 라운드
				people = 0;//현재 참여 인원

				arr_go = [];//대기 - 출전 인원
				arr_no = [];//대기 - 판정승
				arr_win = [];//배틀 - 승리 인원

				//2. 창 표시
				$("#frame_intro").style.display = "inline-block";
				$("#frame_ready").style.display = "none";
				$("#frame_battle").style.display = "none";
				$("#frame_victory").style.display = "none";
			}
		}
	}
}

//전투 효과
function battle_effect(win) {
	//a. 이미지 클릭 비활성화
	$("#battle_reset").disabled = "disabled";
	$("#battle_img_left").onclick = null;
	$("#battle_img_right").onclick = null;
	$("#battle_reset").onclick = null;
	//b. 수치 처리
		//0. 패자 번호 기억
		var loose = (win == 1) ? 0 : 1;
		//1. 승자 등록 & 현 라운드 캐릭터 지우기
		arr_win.push(arr_go[win]);
		arr_go.splice(0,2);

	//c. 시각 처리
		//1.랜덤 클릭 비활성화
		$("#battle_random").disabled = "disabled";
		//2. 이미지 방향 텍스트
		var side = ["left","right"];
		//3. 이미지 테두리 표시
		$("#battle_img_" + side[win]).className = "battle_img winner";
		$("#battle_img_" + side[loose]).className = "battle_img";
		//4. 글자 색상 변경
		$("#battle_name_" + side[win]).className = "battle_name yellow";
		//5. 승자 글자 표시
		$("#battle_winner_" + side[win]).style.display = "block";


	//d. 다음 이벤트 대기
	setTimeout(function() {
		//1. 승자 글자 비활성화
		$("#battle_winner_" + side[win]).style.display = "none";
		//2. 이미지 이동 개시
		battle_finish(0);
	},350);
}

//전투 마무리
function battle_finish(counter) {
	$("#battle_img_left").blur();
	$("#battle_img_right").blur();

	if (counter > -470) {
		//중간 : 캐릭터 이동
		//1. 이미지 이동
		$("#battle_img_left").style.left = ($("#battle_img_left").offsetLeft - 10).toString() + "px";
		$("#battle_img_left").style.opacity = Math.max(0,((470+counter)/470)).toString();
		$("#battle_img_right").style.right = (-($("#battle_img_right").offsetWidth + $("#battle_img_right").offsetLeft - 900) - 10).toString() + "px";
		$("#battle_img_right").style.opacity = Math.max(0,((470+counter)/470)).toString();

		//2. 다음 이동 대기
		setTimeout(function() {
			battle_finish(counter - 10);
		},1000/(60*3));

	} else {
		//캐릭터 초기상태로 재배치
			//1. 이름 지우기 (& 색상 초기화)
			$("#battle_name_left").innerHTML = "";
			$("#battle_name_right").innerHTML = "";

			$("#battle_name_left").className = "battle_name";
			$("#battle_name_right").className = "battle_name";
			//2. 이미지 지우기 (& 테두리 초기화)
			$("#battle_img_left").innerHTML = "";
			$("#battle_img_right").innerHTML = "";

			$("#battle_img_left").className = "battle_img";
			$("#battle_img_right").className = "battle_img";

		//캐릭터가 남음 - 다음 경기
		if (arr_go.length > 0) {
			battle_ready(0);
		//캐릭터가 없음
		} else {
			//a. 부전승자 (있으면) 등록
			if (arr_no.length > 0) {
				arr_win.push(arr_no[0]);
				arr_no = [];
			}
			//b. 우승자가 1명 뿐 -> "우승"
			if (arr_win.length == 1) {
				victory();
			//c. 아니면 - 다음 라운드
			} else {
				//b. 다음 라운드 준비
				ready();
			}
		}
	}
}

//우승
function victory() {
	//1. 창 표시
	$("#frame_intro").style.display = "none";
	$("#frame_ready").style.display = "none";
	$("#frame_battle").style.display = "none";
	$("#frame_victory").style.display = "inline-block";

	//2. 우승자 이미지 표시
		//a. 기존 이미지 비우기
		$("#victory_img").innerHTML = "";
		//b. 이미지 불러오기
		var img = document.createElement("img");
		img.src = arr_win[0][1];
		img.style.backgroundImage = "url('" + arr_win[0][2] + "')";
			var img2 = document.createElement("img");
			img2.src = arr_win[0][2];
		//c. 이미지 사이즈 조절
		if (img2.naturalWidth / 370 >= img2.naturalHeight / 480) {
			img.style.width = "370px";
			img.style.height = ((img2.naturalHeight/img2.naturalWidth) * 370).toString() + "px";
		} else {
			img.style.width = ((img2.naturalWidth/img2.naturalHeight) * 480).toString() + "px";
			img.style.height = "480px";
		}
		img.style.backgroundSize = img.style.width + " " + img.style.height;
			img2.src = "";
		//d. 이미지 배치
		$("#victory_img").appendChild(img);

	//3. 우승자 이름 표시
	$("#victory_name").innerHTML = "ID : " + arr_win[0][0] +
		" <a href='https://safebooru.org/index.php?page=post&s=view&id=" + arr_win[0][0] + "' target='_blank'>(원출처 보기)</a>";

	//4. 되돌아가기 버튼
	$("#victory_return").onclick = function() {
		//1. 변수 초기화
		round = 0;//현재 라운드
		people = 0;//현재 참여 인원

		arr_go = [];//대기 - 출전 인원
		arr_no = [];//대기 - 판정승
		arr_win = [];//배틀 - 승리 인원

		//2. 창 표시
		$("#frame_intro").style.display = "inline-block";
		$("#frame_ready").style.display = "none";
		$("#frame_battle").style.display = "none";
		$("#frame_victory").style.display = "none";
	}
}

//=================================================================================================================
//※ 실행
//=================================================================================================================
window.onload = function() {
	//이미지 선로딩 - 실시
	$("#intro_start").onclick = function() {
		if (chaList.length > 0) {
			if (confirm("이전 게임의 이미지 목록을 다시 사용하시겠습니까?")) {
				ready("all");

				return;
			}
		}
		if (!confirm("이미지 로딩으로 인한 데이터 소모가 상당할 수 있습니다.\nWIFI 환경이 아닌 모바일이라면 실행 취소를 권장합니다.\n\n실행하시겠습니까?")) {
			return;
		}

		//화면 전환
		$("#frame_intro").style.display = "none";
		$("#frame_loading").style.display = "block";

		//수집된 이미지 초기화
		imageList = [];
		imageList2 = [];
		chaList = [];

		//이미지 수집 개시
		var query = "-guro -gore -comic";
		var pg = (Math.floor(Math.random() * 10000) + 1).toString();
        var url = "https://safebooru.org/index.php?page=dapi&s=post&q=index&limit=32&tags="+encodeURIComponent(query) +
		"&pid=" + pg.toString();
        var q = encodeURIComponent('select * from xml where url="'+url+'"');
        var yql = 'https://query.yahooapis.com/v1/public/yql?q='+q;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(this.response,"text/xml");
                var imgs = doc.querySelectorAll("posts post");

				$("#loading_notice").innerHTML = "이미지 32종 수집 완료.<br>프리뷰 이미지 정리 중...";

				for (let i=0;i<imgs.length;i++) {
					var url = "https:" + imgs[i].getAttribute("sample_url");
					var url2 = "https:" + imgs[i].getAttribute("preview_url");
					imageList.push(url);
					imageList2.push(url2);
					chaList.push([imgs[i].getAttribute("id"),url,url2]);
				}

				//로딩 실시
				loadImages([imageList,imageList2],function() {
					//시작
					ready("all");
				});
            }
        };
		//이미지 수집 안내 문구
		$("#loading_notice").innerHTML = "세이프부루 이미지 32종<br>무작위로 수집 중...";
			$("#loading_bar").style.width = "0%";
			$("#loading_num").innerHTML = "";
        xhttp.open("GET", yql, true);
        xhttp.send();
	}
};


}());
