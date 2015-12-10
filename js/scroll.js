//변수 - 일반
var i, temp; //임시
var auto; //진행중
var running = 0;//진행중 표시

var pre_selectedIndex = [];//이전에 선택한 무기
var selected = -1;  //지정한 무기의 (배열 내 순서)
var grade = 0; //현 강화단계
var gold = 0; //총 소모 골드
var count = 1; //시도횟수

var	images = "./images/selfish/";
var imageList = []; //이미지 선로딩용 임시저장소

//변수 - DOM 지정
var $top = document.getElementById('top');
	var $weapon = document.getElementById('weapon');
var $clear = document.getElementById('clear');

var $center_left = document.getElementById('center_left');
		var $center_left_back = document.getElementById('center_left_back');
		var $center_left_target = document.getElementById('center_left_target');
	var $now = document.getElementById('now');
		var $now_img = document.getElementById('now_img');
		var $now_text = document.getElementById('now_text');
	var $message = document.getElementById('message');
		var $message_img = document.getElementById('message_img');
		var $message_text = document.getElementById('message_text');
	var $show = document.getElementById('show');
		var $show_right = document.getElementById('show_right');
		var $show_bar = document.getElementById('show_bar');
		var $show_text = document.getElementById('show_text');


var $store = document.getElementById('store');
	var $store_table = document.getElementById('store_table');
	var $enchant1 = document.getElementById('enchant1');
	var $enchant2 = document.getElementById('enchant2');
	var $enchant3 = document.getElementById('enchant3');
	var $enchant4 = document.getElementById('enchant4');
	var $enchant5 = document.getElementById('enchant5');
	var $enchant6 = document.getElementById('enchant6');
	var $enchant7 = document.getElementById('enchant7');
	
var $record = document.getElementById('record');
	var $record_head = document.getElementById('record_head');
	var $record_display = document.getElementById('record_display');
	var $record_table = document.getElementById('record_table');
	var $record_high = document.getElementById('record_high');

var $result = document.getElementById('result');
	var $result_num = document.getElementById('result_num');
	var $record_clear = document.getElementById('record_clear');
	
var $cover = document.getElementById('cover');

//자료

var selfishList = [
	["구원의 이기 - 소검","w0101"],["구원의 이기 - 도","w0102"],["구원의 이기 - 둔기","w0103"],["구원의 이기 - 대검","w0104"],["구원의 이기 - 광검","w0105"],
	["구원의 이기 - 너클","w0201"],["구원의 이기 - 건틀렛","w0202"],["구원의 이기 - 클로","w0203"],["구원의 이기 - 권투글러브","w0204"],["구원의 이기 - 통파","w0205"],
	["구원의 이기 - 리볼버","w0301"],["구원의 이기 - 자동권총","w0302"],["구원의 이기 - 머스켓","w0303"],["구원의 이기 - 핸드캐넌","w0304"],["구원의 이기 - 보우건","w0305"],
	["구원의 이기 - 창","w0401"],["구원의 이기 - 봉","w0402"],["구원의 이기 - 로드","w0403"],["구원의 이기 - 스태프","w0404"],["구원의 이기 - 빗자루","w0405"],
	["구원의 이기 - 십자가","w0501"],["구원의 이기 - 염주","w0502"],["구원의 이기 - 토템","w0503"],["구원의 이기 - 낫","w0504"],["구원의 이기 - 배틀액스","w0505"],
	["구원의 이기 - 단검","w0601"],["구원의 이기 - 쌍검","w0602"],["구원의 이기 - 완드","w0603"],["구원의 이기 - 차크라 웨펀","w0604"],
	["이기의 조력자 - 쿠로","a0101"],["이기의 조력자 - 마테카","a0102"],["이기의 조력자 - 네르베","a0103"],["이기의 조력자 - 로크","a0104"],["이기의 조력자 - 아그네스","a0105"],
	["탐식의 형상","a0201"],["탐식의 얼개","a0202"],["탐식의 잔재","a0203"],["탐식의 증적","a0204"],["탐식의 근원","a0205"]
];

var chanceList = [//강화/증폭 성공 확률
	0.01,//1
	0.05,//2
	0.1,//3
	0.3,//4
	0.5,//5
	0.7,//6
	0.9//7
];

var priceList = [
	3000000,//1
	12000000,//2
	32000000,//3
	90000000,//4
	143000000,//5
	200000000,//6
	260000000//7
];

//함수 (퍼온 거)
					function loadImages(arr,callBack){ // 이미지 불러오기

						//출처 : http://stackoverflow.com/questions/8264528/image-preloader-javascript-that-supports-eventNames/8265310#8265310
						var imagesArray = [];
						var img;
						var remaining = arr.length;
						for (var i = 0; i < arr.length; i++) {
							img = new Image();
							img.onload = function() {
								//외부 처리 
								document.getElementById("cover").innerHTML = "\
								로딩 중 ("+Math.round((((arr.length - remaining + 1)/arr.length)*100),0).toString()+"%)";
								//내부 처리
								--remaining;
								if (remaining <= 0) {
									callBack();
								};
							};
							img.onerror = function() {
								//외부 처리 
								document.getElementById("cover").innerHTML = "\
								로딩 중 ("+Math.round((((arr.length - remaining + 1)/arr.length)*100),0).toString()+"%)";
								--remaining;
								if (remaining <= 0) {
									callBack();
								};
							};
							img.src = arr[i];
							document.getElementById('imagePreloader').innerHTML += "\
							<img src='" + img.src + "'>";
							imagesArray.push(img);
						};
						
					};


					//천단위 콤마 표시 (출처 : http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript)
					function thousand(num) {
						return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					}

					//만단위 한글로 전환 (출처 : http://kin.naver.com/qna/detail.nhn?d1id=1&dirId=1040202&docId=159019083&qb=amF2YXNjcmlwdCDsiKvsnpAgNOuLqOychCDtlZzquIA=&enc=utf8&section=kin&rank=2&search_sort=0&spq=0&pid=R6VWNc5Y7vKssb7f6YZsssssssd-312648&sid=UKssqHJvLDEAAC0QENA)
					function setWon(pWon) {
						var won  = pWon.toString();
						var arrWon  = ["", "만 ", "억 ", "조 ", "경 ", "해 ", "자 ", "양 ", "구 ", "간 ", "정 "];
						var changeWon = "";
						var pattern = /(-?[0-9]+)([0-9]{4})/;
						while(pattern.test(won)) {
							won = won.replace(pattern,"$1,$2");
						}
						won = won + "";
						var arrCnt = won.split(",").length-1;
						for(var ii=0; ii<won.split(",").length; ii++) {
							changeWon += won.split(",")[ii]+arrWon[arrCnt];
							arrCnt--;
						}
						return changeWon;
					}


//함수
function selecting(target) {//무기 변경
	//1회 이상 시도한 수 교체 시도 시
	if (count > 1) {
		if (target != pre_selectedIndex) {//미리 선택되어있으면 바꿀건지 질문
			if (! confirm("무기를 바꾸면 기존 강화 기록이 초기화됩니다.\n바꾸시겠습니까?")) {
				$weapon.selectedIndex = pre_selectedIndex;
				return;
			}
		}
	}
	//타겟이 배열에서 몇번째인지 체크
	var temp = 0;
	for (i=0;i<selfishList.length;i++) {
		if (selfishList[i][1] == $weapon.value) {
			temp = i;
			break;
		}
	}
	//잔재 제거
		//재생 중단
		clearTimeout(auto);
		//버튼 초기화
		onoff(0);
		//강폭값, 시도횟수, 보호권 초기화
		grade = 0; //현 재련단계
		count = 1; //시도횟수
		gold = 0;//총 소모 골드
		//강폭기 초기화
		$center_left_target.src = "";	
		$center_left_target.style.visibility = "hidden";
		//메세지 초기화
		$message_img.style.visibility = "hidden";
		$message_text.innerHTML = "";
		//하단 초기화
		$record_table.innerHTML = "";
		$result_num.innerHTML = thousand(gold);
	//타겟의 (배열 내 순서)를 변수에 입력
	selected = temp;
	pre_selectedIndex = $weapon.selectedIndex;
	//입력한 변수 출력 (이미지, 명칭)
	$now_img.style.visibility = "visible";
	$now_img.src = images + selfishList[selected][1] + ".png";	
	$now_text.innerHTML = "+0 " + selfishList[selected][0]
	//강폭기 준비
	ready();
	//강화권 이용횟수 초기화
	var target = $store_table.getElementsByTagName("tr");
	for (i=1;i<target.length;i++) {
		target[i].getElementsByTagName("td")[3].innerHTML = "0";
	}
	//버튼 활성화
	onoff(0);
	$clear.disabled = "";
}
	function ready() {//재련 준비창 출력
		//안내 메세지
		$show_bar.style.width = "0%";
		$show_text.style.color = "#D37CFF";
		if (grade != 20) {
			$show_text.innerHTML = "+12 강화권 대기 중 <span class='white'>\
			(" + thousand(count) + "회차)</span>";
		}
	}

function generate(num) {
	//12강 확인 시 : 종료
	if (grade == 12) {
		$show_text.innerHTML = "강화 종료";
		onoff(-1);
	//12강이 아닐 경우 : 지속
	} else {
		//강폭기에 이미지 출력
		$center_left_target.src = images + selfishList[selected][1] + ".png";	
		$center_left_target.style.visibility = "visible";
		//게이지 출력
		$show_text.style.color = "black";
		$show_text.innerHTML = (Math.round(chanceList[num]*100)).toString() + "프로 +12 강화권 사용중...";
		loading(num);
	}
}

	function loading(num) {
		if (($show_bar.offsetWidth/$show_right.offsetWidth)*100+8 < 100) {
			$show_bar.style.width = (($show_bar.offsetWidth/$show_right.offsetWidth)*100+8).toString() + "%";
			auto = setTimeout(function() {
					loading(num);
				},50);
		} else {
			get(num);
			if (grade != 12) {
				onoff(0);
			} else {
				generate(num);
			}
		}
	}

		function get(num) {
			//스타일 복구
			$show_bar.style.width = "0px";
			$show_right.style.backgroundColor = "black";
			$show_text.style.color = "#D37CFF";
			
			//성공여부 결정
			var temp = Math.random();
			
			//강폭 성공 시
			if (temp < chanceList[num]) {
				//아이템 명칭 변경
				$now_text.innerHTML = "";
				$now_text.innerHTML += "+12 " + selfishList[selected][0];
				//성공/실패 메세지 출력
				$message_img.src = images + "yes.png";
				$message_img.style.visibility = "visible";
				$message_text.innerHTML = "";
				$message_text.innerHTML += " <span class='green'>" + (Math.round(chanceList[num]*100)).toString() + "프로 +12 강화권 성공</span>\
				 ( +" + (grade).toString() + " &#8658; +" + (grade+12).toString() + " )";
			//강폭 실패 시
			} else {
				//아이템 명칭 변경
				$now_text.innerHTML = "";
				$now_text.innerHTML += "+0 " + selfishList[selected][0];
				//성공/실패 메세지 출력
				$message_img.src = images + "no.png";
				$message_img.style.visibility = "visible";
				$message_text.innerHTML = "";
				$message_text.innerHTML += " <span class='orange'>" + (Math.round(chanceList[num]*100)).toString() + "프로 +12 강화권 실패</span>\
				 ( +" + (grade).toString() + " &#8658; +" + (grade).toString() + " )";
			}
			
			//하단에 표시
			row = $record_table.insertRow(-1);
			if (temp < chanceList[num]) {
				var cell_0 = row.insertCell(0);
					cell_0.innerHTML = "<img id='record_img' src='" + images + "yes.png' />";//성공/실패 이미지
					cell_0.className = "col_1";
				var cell_1 = row.insertCell(1);
					cell_1.innerHTML = thousand(count);//회차
					cell_1.className = "col_2";
				var cell_2 = row.insertCell(2);
					cell_2.innerHTML = "<span class='purple'>" + (Math.round(chanceList[num]*100)).toString() + "%</span>";//확률
					cell_2.className = "col_3";
				var cell_3 = row.insertCell(3);
					cell_3.innerHTML = "<span class='green'>성공</span>";//결과
					cell_3.className = "col_4";
				var cell_4 = row.insertCell(4);
					cell_4.innerHTML = "<span class='purple'>+" + (grade).toString() + " &#8658; +" + (grade+12).toString() + "</span>";//변화
					cell_4.className = "col_5";
			} else {
				var cell_0 = row.insertCell(0);
					cell_0.innerHTML = "<img id='record_img' src='" + images + "no.png' />";//성공/실패 이미지
					cell_0.className = "col_1";
				var cell_1 = row.insertCell(1);
					cell_1.innerHTML = thousand(count);//회차
					cell_1.className = "col_2";
				var cell_2 = row.insertCell(2);
					cell_2.innerHTML = "<span class='purple'>" + (Math.round(chanceList[num]*100)).toString() + "%</span>";//확률
					cell_2.className = "col_3";
				var cell_3 = row.insertCell(3);
					cell_3.innerHTML = "<span class='orange'>실패</span>";//결과
					cell_3.className = "col_4";
				var cell_4 = row.insertCell(4);
					cell_4.innerHTML = "<span class='purple'>+" + (grade).toString() + " &#8658; +" + (grade).toString() + "</span>";//변화
					cell_4.className = "col_5";
			}
			var cell_5 = row.insertCell(5);
				cell_5.innerHTML = "<span class='epic'>" + $now_text.innerHTML + "</span>";
				cell_5.className = "col_6";
			$record_display.scrollTop = $record_display.scrollHeight;
			
			//등급, 시도횟수, 보호권 수치 변경
			if (temp < chanceList[num]) {
				//강폭 성공 시
				grade += 12; //강폭 등급
				count += 1; //시도횟수
			} else {
				grade += 0; //강폭 등급
				count += 1; //시도횟수 (상승)
			}
			
			//강화권 이용횟수, 골드 소모 증가
			var target = $store_table.getElementsByTagName("tr")[num+1].getElementsByTagName("td")[3];
			target.innerHTML = (parseInt(target.innerHTML)+1).toString();
			gold += priceList[num];
			$result_num.innerHTML = setWon(gold);
			
			//강폭기에서 이미지 제거
			$center_left_target.src = "";
			$center_left_target.style.visibility = "hidden";
			//강폭 단계 변경
			ready();
		}

function onoff(num) {
	switch (num) {
		case -1:
			enchant1.value="종료";
			enchant2.value="종료";
			enchant3.value="종료";
			enchant4.value="종료";
			enchant5.value="종료";
			enchant6.value="종료";
			enchant7.value="종료";
			enchant1.disabled="disabled";
			enchant2.disabled="disabled";
			enchant3.disabled="disabled";
			enchant4.disabled="disabled";
			enchant5.disabled="disabled";
			enchant6.disabled="disabled";
			enchant7.disabled="disabled";
			
			enchant1.className = "off";
			enchant2.className = "off";
			enchant3.className = "off";
			enchant4.className = "off";
			enchant5.className = "off";
			enchant6.className = "off";
			enchant7.className = "off";
			
			break;
		case 0:
			enchant1.value="사용하기";
			enchant2.value="사용하기";
			enchant3.value="사용하기";
			enchant4.value="사용하기";
			enchant5.value="사용하기";
			enchant6.value="사용하기";
			enchant7.value="사용하기";
			enchant1.disabled="";
			enchant2.disabled="";
			enchant3.disabled="";
			enchant4.disabled="";
			enchant5.disabled="";
			enchant6.disabled="";
			enchant7.disabled="";
			
			enchant1.className = "off";
			enchant2.className = "off";
			enchant3.className = "off";
			enchant4.className = "off";
			enchant5.className = "off";
			enchant6.className = "off";
			enchant7.className = "off";
			
			break;
		case 1:
			enchant1.disabled="";
			enchant2.disabled="disabled";
			enchant3.disabled="disabled";
			enchant4.disabled="disabled";
			enchant5.disabled="disabled";
			enchant6.disabled="disabled";
			enchant7.disabled="disabled";
			
			enchant2.className = "off";
			enchant3.className = "off";
			enchant4.className = "off";
			enchant5.className = "off";
			enchant6.className = "off";
			enchant7.className = "off";
			
			enchant1.value="취소";
			enchant1.className = "on";
			
			break;
		case 2:
			enchant1.disabled="disabled";
			enchant2.disabled="";
			enchant3.disabled="disabled";
			enchant4.disabled="disabled";
			enchant5.disabled="disabled";
			enchant6.disabled="disabled";
			enchant7.disabled="disabled";
			
			enchant1.className = "off";
			enchant3.className = "off";
			enchant4.className = "off";
			enchant5.className = "off";
			enchant6.className = "off";
			enchant7.className = "off";
			
			enchant2.value="취소";
			enchant2.className = "on";
			
			break;
		case 3:
			enchant1.disabled="disabled";
			enchant2.disabled="disabled";
			enchant3.disabled="";
			enchant4.disabled="disabled";
			enchant5.disabled="disabled";
			enchant6.disabled="disabled";
			enchant7.disabled="disabled";
			
			enchant1.className = "off";
			enchant2.className = "off";
			enchant4.className = "off";
			enchant5.className = "off";
			enchant6.className = "off";
			enchant7.className = "off";
			
			enchant3.value="취소";
			enchant3.className = "on";
			
			break;
		case 4:
			enchant1.disabled="disabled";
			enchant2.disabled="disabled";
			enchant3.disabled="disabled";
			enchant4.disabled="";
			enchant5.disabled="disabled";
			enchant6.disabled="disabled";
			enchant7.disabled="disabled";
			
			enchant1.className = "off";
			enchant2.className = "off";
			enchant3.className = "off";
			enchant5.className = "off";
			enchant6.className = "off";
			enchant7.className = "off";
			
			enchant4.value="취소";
			enchant4.className = "on";
			
			break;
		case 5:
			enchant1.disabled="disabled";
			enchant2.disabled="disabled";
			enchant3.disabled="disabled";
			enchant4.disabled="disabled";
			enchant5.disabled="";
			enchant6.disabled="disabled";
			enchant7.disabled="disabled";
			
			enchant1.className = "off";
			enchant2.className = "off";
			enchant3.className = "off";
			enchant4.className = "off";
			enchant6.className = "off";
			enchant7.className = "off";
			
			enchant5.value="취소";
			enchant5.className = "on";
			
			break;
		case 6:
			enchant1.disabled="disabled";
			enchant2.disabled="disabled";
			enchant3.disabled="disabled";
			enchant4.disabled="disabled";
			enchant5.disabled="disabled";
			enchant6.disabled="";
			enchant7.disabled="disabled";
			
			enchant1.className = "off";
			enchant2.className = "off";
			enchant3.className = "off";
			enchant4.className = "off";
			enchant5.className = "off";
			enchant7.className = "off";
			
			enchant6.value="취소";
			enchant6.className = "on";
			
			break;
		case 7:
			enchant1.disabled="disabled";
			enchant2.disabled="disabled";
			enchant3.disabled="disabled";
			enchant4.disabled="disabled";
			enchant5.disabled="disabled";
			enchant6.disabled="disabled";
			enchant7.disabled="";
			
			enchant1.className = "off";
			enchant2.className = "off";
			enchant3.className = "off";
			enchant4.className = "off";
			enchant5.className = "off";
			enchant6.className = "off";
			
			enchant7.value="취소";
			enchant7.className = "on";
			
			break;
	}
}

function reset(num) {
	ready();
	
	if (num == 1) {
		//재생 중단
		clearTimeout(auto);
		//버튼 초기화
		onoff(0);
		//강폭값, 시도횟수, 보호권 초기화
		grade = 0; //현 재련단계
		count = 1; //시도횟수
		gold = 0;//총 소모 골드
		//강폭기 초기화
		$center_left_target.src = "";	
		$center_left_target.style.visibility = "hidden";
		//이름 초기화
		$now_text.innerHTML = "+0 " + selfishList[selected][0]
		//메세지 초기화
		$message_img.style.visibility = "hidden";
		$message_text.innerHTML = "";
		//하단 초기화
		$record_table.innerHTML = "";
		//강폭기 초기화
		ready();
		//강화권 이용횟수 초기화
		var target = $store_table.getElementsByTagName("tr");
		for (i=1;i<target.length;i++) {
			target[i].getElementsByTagName("td")[3].innerHTML = "0";
		}
		//하단 하단 초기화
		$record_table.innerHTML = "";
		//강기 표기 초기화
		$result_num.innerHTML = "0";
	}
}



//실행
window.onload = function() {
	//선로딩
	for (i=0;i<selfishList.length;i++) {
		imageList.push(images + selfishList[i][1] + ".png");
	}
	imageList.push(images + "back0.png");
	imageList.push(images + "scroll0.png");
	imageList.push(images + "gold.png");
	imageList.push(images + "yes.png");
	imageList.push(images + "no.png");
	
	loadImages(imageList,function(){
	
		cover.style.display = "none";
		
		//실행
		$weapon.onchange = function() {
			selecting($weapon.selectedIndex);
		};
		
		$enchant1.onclick = function() {
			if (enchant1.className == "off") {
				onoff(1);
				
				generate(1-1);
			} else {
				clearTimeout(auto);
				onoff(0);
				reset(0);
			}
		};
		$enchant2.onclick = function() {
			if (enchant2.className == "off") {
				onoff(2);
				
				generate(2-1);
			} else {
				clearTimeout(auto);
				onoff(0);
				reset(0);
			}
		};
		$enchant3.onclick = function() {
			if (enchant3.className == "off") {
				onoff(3);
				
				generate(3-1);
			} else {
				clearTimeout(auto);
				onoff(0);
				reset(0);
			}
		};
		$enchant4.onclick = function() {
			if (enchant4.className == "off") {
				onoff(4);
				
				generate(4-1);
			} else {
				clearTimeout(auto);
				onoff(0);
				reset(0);
			}
		};
		$enchant5.onclick = function() {
			if (enchant5.className == "off") {
				onoff(5);
				
				generate(5-1);
			} else {
				clearTimeout(auto);
				onoff(0);
				reset(0);
			}
		};
		$enchant6.onclick = function() {
			if (enchant6.className == "off") {
				onoff(6);
				
				generate(6-1);
			} else {
				clearTimeout(auto);
				onoff(0);
				reset(0);
			}
		};
		$enchant7.onclick = function() {
			if (enchant7.className == "off") {
				onoff(7);
				
				generate(7-1);
			} else {
				clearTimeout(auto);
				onoff(0);
				reset(0);
			}
		};
		
		
		$clear.onclick = function() {
			clearTimeout(auto);
			onoff(0);
			running = 0;
			reset(1);
		};
		
		$record_clear.onclick = function() {
			$record_table.innerHTML = "";
		};
	});
	
}