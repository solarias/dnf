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

//이미지
var images = "./images/worldcup_hots/";
var imageList = [];//이미지 선로딩용

		//=================================================================================================================
		//※ 보조 함수
		//=================================================================================================================
		// 이미지 선로딩 (원본 출처 : http://stackoverflow.com/questions/8264528/image-preloader-javascript-that-supports-eventNames/8265310#8265310)
		function loadImages(arr,callBack){
			var imagesArray = [];
			var img;
			var remaining = arr.length;
			for (var i = 0; i < arr.length; i++) {
				img = new Image();
				img.onload = function() {
					//외부 처리
					$("#loading_bar").style.width = Math.round((((arr.length - remaining + 1)/arr.length)*100),0).toString()+"%";
					//내부 처리
					--remaining;
					if (remaining <= 0) {
						callBack();
					};
				};
				img.onerror = function() {
					//외부 처리
					$("#loading_bar").style.width = Math.round((((arr.length - remaining + 1)/arr.length)*100),0).toString()+"%";
					--remaining;
					if (remaining <= 0) {
						callBack();
					};
				};
				img.src = arr[i];
				document.getElementById("imagePreloader").innerHTML += "<img src='" + arr[i] + " />";
				imagesArray.push(img);
			};
		};


		//0. IE8에 배열 indexOf 적용
		if (!Array.prototype.indexOf)
		{
		  Array.prototype.indexOf = function(elt /*, from*/)
		  {
			var len = this.length >>> 0;

			var from = Number(arguments[1]) || 0;
			from = (from < 0)
				 ? Math.ceil(from)
				 : Math.floor(from);
			if (from < 0)
			  from += len;

			for (; from < len; from++)
			{
			  if (from in this &&
				  this[from] === elt)
				return from;
			}
			return -1;
		  };
		};

		//1. DOM 관련
			//DOM 접근용 함수
				//하나의 개체 접근
				function $(parameter) {
					return document.querySelector(parameter);
				}
				//다수 개체 접근(반환 형식 : 배열)
				function $$(parameter) {
					return document.querySelectorAll(parameter);
				}

			//특정 class 확인&추가&제거
			function hasClass(ele,cls) {
			  return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
			}

			function addClass(ele,cls) {
			  if (!hasClass(ele,cls)) ele.className += " "+cls;
			}

			function removeClass(ele,cls) {
			  if (hasClass(ele,cls)) {
				var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
				ele.className=ele.className.replace(reg,' ');
			  }
			}


		//2. 수치, 랜덤 관련
			//천단위 콤마 표시 (출처 : http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript)
			function thousand(num) {
				return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			};

			//숫자 여부 판단 (출처 : http://mwultong.blogspot.com/2007/01/isnum-isnumeric-isnumber-javascript.html)
			function isNumber(s) {
			  s += ''; // 문자열로 변환
			  s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
			  if (s == '' || isNaN(s)) return false;
			  return true;
			};

			//가중치 적용 랜덤
			function rand(target) {//target : 숫자가 들어있는 배열
				var number = 0;
				for (i=0;i<target.length;i++) {
					number += target[i];
				}
				var tmp = Math.random() * number;

				number = 0;
				for (i=0;i<target.length;i++) {
					number += target[i];
					if (tmp < number) {
						return i;
					}
				}
			};

			//셔플
			function shuffle(array) {
				var currentIndex = array.length, temporaryValue, randomIndex ;

				// While there remain elements to shuffle...
				while (0 !== currentIndex) {
					// Pick a remaining element...
					randomIndex = Math.floor(Math.random() * currentIndex);
					currentIndex -= 1;

					// And swap it with the current element.
					temporaryValue = array[currentIndex];
					array[currentIndex] = array[randomIndex];
					array[randomIndex] = temporaryValue;
				}

				return array;
			}



//=================================================================================================================
//※ 구동 함수
//=================================================================================================================
//현 라운드 출전 인원 정리
function ready(type) {
	//1. 창 활성화
	$("#frame_intro").style.display = "none";
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
			img.src = images + arr_go[i][1] + ".jpg";
			//b-2. 이미지 사이즈 조절
			img.style.width = ((img.naturalWidth/img.naturalHeight) * 180).toString() + "px";
			img.style.height = "180px";
			//b-3. 이미지 배치
			$("#ready_image_go").appendChild(img);
		}
		//c. 스크롤 올리기
		$("#ready_image_go").scrollTop = "0px";

	//9. (있으면) 부전승 인원 표시
	if (arr_no.length > 0) {
		//a. 기존 부전승 지우기
		$("#ready_image_no").innerHTML = "";
		//b. 이미지 불러오기
		var img = document.createElement("img");
		img.src = images + arr_no[0][1] + ".jpg";
		//c. 이미지 사이즈 조절
		img.style.width = ((img.naturalWidth/img.naturalHeight) * 180).toString() + "px";
		img.style.height = "180px";
		//d. 이미지 배치
		$("#ready_image_no").innerHTML = "";
		$("#ready_image_no").appendChild(img);
	} else {
		$("#ready_image_no").innerHTML = "없음";
	}

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
		$("#battle_name_left").innerHTML = arr_go[0][0];
		$("#battle_name_right").innerHTML = arr_go[1][0];
		//3. 이미지 표시
			//3-1. 좌측 이미지
				//a. 이미지 비우기
				$("#battle_img_left").innerHTML = "";
				//b. 이미지 불러오기
				var img = document.createElement("img");
				img.src = images + arr_go[0][1] + ".jpg";
				//c. 이미지 사이즈 조절
				img.style.width = ((img.naturalWidth/img.naturalHeight) * 450).toString() + "px";
				img.style.height = "450px";
				//d. 이미지 배치
				$("#battle_img_left").appendChild(img);
			//3-2. 우측 이미지
				//a. 이미지 비우기
				$("#battle_img_right").innerHTML = "";
				//b. 이미지 불러오기
				var img = document.createElement("img");
				img.src = images + arr_go[1][1] + ".jpg";
				//c. 이미지 사이즈 조절
				img.style.width = ((img.naturalWidth/img.naturalHeight) * 450).toString() + "px";
				img.style.height = "450px";
				//d. 이미지 배치
				$("#battle_img_right").appendChild(img);
	}
	if (counter < 520) {
		//중간 : 캐릭터 이동
		//1. 이미지 이동
		$("#battle_img_left").style.left = ($("#battle_img_left").offsetLeft + 10).toString() + "px";
		$("#battle_img_left").style.opacity = Math.max(0,((counter-120)/520)).toString();
		$("#battle_img_right").style.right = (-($("#battle_img_right").offsetWidth + $("#battle_img_right").offsetLeft - 900) + 10).toString() + "px";
		$("#battle_img_right").style.opacity = Math.max(0,((counter-120)/520)).toString();
		console.log(((counter)/520).toString());

		//2. 다음 이동 대기
		setTimeout(function() {
			battle_ready(counter + 10);
		},1000/(60*3));

	} else {
		//나머지 : 전투 실시 (클릭 대기)
		//1. 이미지 정지
		$("#battle_img_left").style.left = "80px";
		$("#battle_img_right").style.right = "80px";
		//2. 이미지선택 효과 활성화
		addClass($("#battle_img_left"),"selectable");
		addClass($("#battle_img_right"),"selectable");
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

	if (counter > -520) {
		//중간 : 캐릭터 이동
		//1. 이미지 이동
		$("#battle_img_left").style.left = ($("#battle_img_left").offsetLeft - 10).toString() + "px";
		$("#battle_img_left").style.opacity = Math.max(0,((400+counter)/520)).toString();
		$("#battle_img_right").style.right = (-($("#battle_img_right").offsetWidth + $("#battle_img_right").offsetLeft - 900) - 10).toString() + "px";
		$("#battle_img_right").style.opacity = Math.max(0,((400+counter)/520)).toString();

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
		img.src = images + arr_win[0][1] + ".jpg";
		//c. 이미지 사이즈 조절
		img.style.width = ((img.naturalWidth/img.naturalHeight) * 450).toString() + "px";
		img.style.height = "450px";
		//d. 이미지 배치
		$("#victory_img").appendChild(img);

	//3. 우승자 이름 표시
	$("#victory_name").innerHTML = arr_win[0][0];

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
	$("#loading_start").value = "시공 Online";
	$("#loading_start").disabled = "";

	//이미지 선로딩 - 준비
	imageList.push("./images/worldcup/frame/mark_vs.png");
	imageList.push("./images/worldcup/frame/logo.png");

	for (var i=0;i<chaList.length;i++) {
		if (chaList[i][0] != "") {
			imageList.push(images + chaList[i][1] + ".jpg");
		}
	}

	//이미지 선로딩 - 실시
	$("#loading_start").onclick = function() {
		//버튼 비활성화
		$("#loading_start").value = "로딩 중";
		$("#loading_start").disabled = "disabled";

		//로딩 실시
		loadImages(imageList,function() {

			//로딩 화면 제거
			$("#frame_loading").style.display = "none";
			$("#frame_intro").style.display = "block";

			//주요 버튼 작동 실시
			$("#intro_start_1").onclick = function() {
				ready("영웅");
			}

		});
	}
}


}());
