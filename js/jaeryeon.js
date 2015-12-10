//변수 - 일반
var i, temp; //임시
var auto; //자동실행

var pre_selectedIndex;//이전에 선택한 무기
var selected = -1;  //지정한 무기의 (배열 내 순서)
var grade = 0; //현 재련단계
var count_grade = 1; //현 단계 시도횟수
var count_all = 1; //전체 시도횟수
var material = 0;  //총 소모 강렬한기운

var	images = "./images/selfish/";
var imageList = []; //이미지 선로딩용 임시저장소

//변수 - DOM 지정
var press = document.getElementById('press');
	var weapon = document.getElementById('weapon');
	var open1 = document.getElementById('open1');
	var open2 = document.getElementById('open2');
	var open3 = document.getElementById('open3');
var clear = document.getElementById('clear');
var now = document.getElementById('now');
	var now_img = document.getElementById('now_img');
	var now_text = document.getElementById('now_text');
var message = document.getElementById('message');
	var message_img = document.getElementById('message_img');
	var message_text = document.getElementById('message_text');
var show = document.getElementById('show');
	var show_img = document.getElementById('show_img');
	var show_right = document.getElementById('show_right');
	var show_bar = document.getElementById('show_bar');
	var show_text = document.getElementById('show_text');
var record = document.getElementById('record');
	var record_top = document.getElementById('record_top');
	var record_bottom = document.getElementById('record_bottom');
var result = document.getElementById('result');
	var result_num = document.getElementById('result_num');
var cover = document.getElementById('cover');

//자료
var list_selfish = [
	["구원의 이기 - 소검","w0101"],["구원의 이기 - 도","w0102"],["구원의 이기 - 둔기","w0103"],["구원의 이기 - 대검","w0104"],["구원의 이기 - 광검","w0105"],
	["구원의 이기 - 너클","w0201"],["구원의 이기 - 건틀렛","w0202"],["구원의 이기 - 클로","w0203"],["구원의 이기 - 권투글러브","w0204"],["구원의 이기 - 통파","w0205"],
	["구원의 이기 - 리볼버","w0301"],["구원의 이기 - 자동권총","w0302"],["구원의 이기 - 머스켓","w0303"],["구원의 이기 - 핸드캐넌","w0304"],["구원의 이기 - 보우건","w0305"],
	["구원의 이기 - 창","w0401"],["구원의 이기 - 봉","w0402"],["구원의 이기 - 로드","w0403"],["구원의 이기 - 스태프","w0404"],["구원의 이기 - 빗자루","w0405"],
	["구원의 이기 - 십자가","w0501"],["구원의 이기 - 염주","w0502"],["구원의 이기 - 토템","w0503"],["구원의 이기 - 낫","w0504"],["구원의 이기 - 배틀액스","w0505"],
	["구원의 이기 - 단검","w0601"],["구원의 이기 - 쌍검","w0602"],["구원의 이기 - 완드","w0603"],["구원의 이기 - 차크라 웨펀","w0604"],
	["이기의 조력자 - 쿠로","a0101"],["이기의 조력자 - 마테카","a0102"],["이기의 조력자 - 네르베","a0103"],["이기의 조력자 - 로크","a0104"],["이기의 조력자 - 아그네스","a0105"],
	["탐식의 형상","a0201"],["탐식의 얼개","a0202"],["탐식의 잔재","a0203"],["탐식의 증적","a0204"],["탐식의 근원","a0205"]
];

var list_ganggi = [
	64,//1재련
	71,//2재련
	77,//3재련
	85,//4재련
	91,//5재련
	98,//6재련
	104,//7재련
	112//8재련
];

var list_chance = [
	0.9,//1재련
	0.8,//2재련
	0.7,//3재련
	0.5,//4재련
	0.3,//5재련
	0.2,//6재련
	0.1,//7재련
	0.05//8재련
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


//함수

function selecting(target) {//무기 변경
	//미리 선택되어있으면 바꿀건지 질문
	if (selected != -1) {
		if (!(confirm("무기를 바꾸면 기존 재련기록이 초기화됩니다.\n바꾸시겠습니까?"))) {
			weapon.selectedIndex = pre_selectedIndex;
			return;
		}
	}
	//타겟이 배열에서 몇번째인지 체크
	for (i=0;i<list_selfish.length;i++) {
		if (list_selfish[i][1] == target) {
			temp = i;
			break;
		}
	}
	//잔재 제거
		//재생 중단
		clearTimeout(auto);
		//버튼 초기화
		onoff(0);
		//재련값, 시도횟수, 강기 초기화
		grade = 0; //현 재련단계
		count_now = 1; //현 단계 시도횟수
		count_all = 1; //전체 시도횟수
		material = 0;  //총 소모 강렬한기운
		//메세지 초기화
		message_img.style.visibility = "hidden";
		message_text.innerHTML = "";
		//하단 하단
		record_bottom.innerHTML = "";
		//강기 표기 초기화
		result_num.innerHTML = "";
	//타겟의 (배열 내 순서)를 변수에 입력
	selected = temp;
	pre_selectedIndex = weapon.selectedIndex;
	//입력한 변수 출력 (이미지, 명칭)
	now_img.style.visibility = "visible";
	now_img.src = images + list_selfish[selected][1] + ".png";	
	now_text.innerHTML = "+0 " + list_selfish[selected][0]
	//용화덕 표기 변경
	ready();
	//버튼 활성화
	open1.disabled = "";
	open2.disabled = "";
	open3.disabled = "";
	clear.disabled = "";
}
	function ready() {//재련 준비창 출력
		show_img.src = images + "yong0.png";
		show_bar.style.width = "0%";
		show_text.style.color = "#D37CFF";
		if (grade != 8) {
			show_text.innerHTML = (grade+1).toString() + "단계 재련 대기 중 <span class='white'>(\
			<img src='./images/selfish/ganggi.png' style='height:16px;'> x <span class='orange'>" + list_ganggi[grade] + "</span> / \
			성공확률 : <span class='orange'>" + Math.round(list_chance[grade]*100).toString() + "</span>%)</span>";
		}
	}

function generate(num) {
	//8재련 확인 시 : 종료
	if (grade == 8) {
		show_img.src = images + "yong0.png";
		show_text.innerHTML = "재련 종료";
		onoff(-1);
	//8재련이 아닐 경우 : 지속
	} else {
		show_text.style.color = "black";
		show_text.innerHTML = (grade+1).toString() + "단계 재련 중... ("+count_now+"번째 시도)";
		show_img.src = images + "yong1.gif";
		switch (num) {
			case 1://1회 개봉
				loading(1);
				break;
			case 2://연속 개봉
				loading(2);
				break;
			case 3://연속 개봉
				get();
				auto = setTimeout(function() {
						generate(3);
					},100);
				break;
		}
	}
}

	function loading(num) {
		if (show_bar.offsetWidth < show_right.offsetWidth) {
			show_bar.style.width = ((show_bar.offsetWidth/show_right.offsetWidth)*100+2).toString() + "%";
			auto = setTimeout(function() {
					loading(num);
				},50);
		} else {
			if (num == 1) {
				get();
				if (grade != 8) {
					onoff(0);
				} else {
					generate(1);
				}
			} else {
				get();
				generate(2);
			}
		}
	}

		function get() {
			//스타일 복구
			show_bar.style.width = "0px";
			show_right.style.backgroundColor = "black";
			show_text.style.color = "#D37CFF";
			
			//성공여부 결정
			temp = Math.random();
			
			//무조건 : 강기 소모
			material += list_ganggi[grade];  //총 소모 강렬한기운
			result_num.innerHTML = material + "개 (약 " + Math.ceil(material/100)+ "일)";
			
			//재련 성공 시
			if (temp < list_chance[grade]) {
				//아이템 명칭 변경
				now_text.innerHTML = "";
				now_text.innerHTML += "+" + (grade+1).toString() + " " + list_selfish[selected][0]
				//성공/실패 메세지 출력
				message_img.src = images + "yes.png";
				message_img.style.visibility = "visible";
				message_text.innerHTML = "";
				message_text.innerHTML += " <span class='green'>" + (grade+1).toString() + "단계 재련 성공</span> (" + count_now + "번째 시도 / 전체 시도 수 : " + count_all + ")"
			//재련 실패 시
			} else {
				//아이템 명칭 변경
				now_text.innerHTML = "";
				now_text.innerHTML += "+" + grade.toString() + " " + list_selfish[selected][0]
				//성공/실패 메세지 출력
				message_img.src = images + "no.png";
				message_img.style.visibility = "visible";
				message_text.innerHTML = "";
				message_text.innerHTML += " <span class='orange'>" + (grade+1).toString() + "단계 재련 실패</span> (" + count_now + "번째 시도 / 전체 시도 수 : " + count_all + ")"
			}
			
			//하단에 표시
			if (temp < list_chance[grade]) {
				record_bottom.innerHTML += "<img id='record_img' src='" + images + "yes.png' />";
				record_bottom.innerHTML += "<div id='record_target' class='epic'>+" + (grade+1).toString() + "</div>";
				record_bottom.innerHTML += "<div id='record_result' ><span class='green'>성공</span></div>";
			} else {
				record_bottom.innerHTML += "<img id='record_img' src='" + images + "no.png' />";
				record_bottom.innerHTML += "<div id='record_target'>+" + (grade+1).toString() + "</div>";
				record_bottom.innerHTML += "<div id='record_result' ><span class='orange'>실패</span></div>";
			}
			record_bottom.innerHTML += "<div id='record_now' >" + count_now + "</div>";
			record_bottom.innerHTML += "<div id='record_all' >" + count_all + "</div>";
			record_bottom.innerHTML += "<div id='record_item' ><span class='epic'>" + now_text.innerHTML + "</span></div><br/>";
			record_bottom.scrollTop = record_bottom.scrollHeight;
			
			//시도횟수 변경
			if (temp < list_chance[grade]) {
				//재련 성공 시
				grade += 1; //재련 등급 (상승)
				count_now = 1; //현 단계 시도횟수 (초기화)
				count_all += 1; //전체 시도횟수 (상승)
			} else {
				//재련 실패 시
				count_now += 1; //현 단계 시도횟수 (상승)
				count_all += 1; //전체 시도횟수 (상승)
			}
			
			//재련 단계 변경
			show_img.src = images + "yong0.png";
			ready();
		}

function onoff(num) {
	switch (num) {
		case -1:
			open1.value="종료";
			open2.value="종료";
			open3.value="종료";
			open1.disabled="disabled";
			open2.disabled="disabled";
			open3.disabled="disabled";
			
			open1.className = "off";
			open2.className = "off";
			open3.className = "off";
			
			break;
		case 0:
			open1.value="1회 재련";
			open2.value="연속 재련";
			open3.value="고속 재련";
			open1.disabled="";
			open2.disabled="";
			open3.disabled="";
			
			open1.className = "off";
			open2.className = "off";
			open3.className = "off";
			
			break;
		case 1:
			open1.value="정지";
			open2.disabled="disabled";
			open3.disabled="disabled";
			
			open1.className = "on";
			open2.className = "off";
			open3.className = "off";
			
			break;
		case 2:
			open1.disabled="disabled";
			open2.value="정지";
			open3.disabled="disabled";
			
			open1.className = "off";
			open2.className = "on";
			open3.className = "off";
			
			break;
		case 3:
			open1.disabled="disabled";
			open2.disabled="disabled";
			open3.value="정지";
			
			open1.className = "off";
			open2.className = "off";
			open3.className = "on";
			
			break;
	}
}

function reset(num) {
	ready();
	
	if (num == 1) {
		//버튼 초기화
		onoff(0);
		//재련값, 시도횟수, 강기 초기화
		grade = 0; //현 재련단계
		count_now = 1; //현 단계 시도횟수
		count_all = 1; //전체 시도횟수
		material = 0;  //총 소모 강렬한기운
		//아이템 초기화
		now_text.innerHTML = "+" + grade.toString() + " " + list_selfish[selected][0]
		//메세지 초기화
		message_img.style.visibility = "hidden";
		message_text.innerHTML = "";
		//재련표기 초기화
		ready();
		//하단 하단 초기화
		record_bottom.innerHTML = "";
		//강기 표기 초기화
		result_num.innerHTML = "";
	}
}



//실행
window.onload = function() {
	//선로딩
	for (i=0;i<list_selfish.length;i++) {
		imageList.push(images + list_selfish[i][1] + ".png");
	}
	imageList.push(images + "yong0.png");
	imageList.push(images + "yong1.gif");
	imageList.push(images + "ganggi.png");
	imageList.push(images + "yes.png");
	imageList.push(images + "no.png");
	
	loadImages(imageList,function(){
	
		cover.style.display = "none";
		
		//실행
		weapon.onchange = function() {
			selecting(this.value);
		};
		
		open1.onclick = function() {
			if (open1.className == "off") {
				onoff(1);
				
				generate(1);
			} else {
				clearTimeout(auto);
				onoff(0);
				reset(0);
			}
		};
		
		open2.onclick = function() {
			if (open2.className == "off") {
				onoff(2);
				
				generate(2);
			} else {
				clearTimeout(auto);
				onoff(0);
				reset(0);
			}
		};
		
		open3.onclick = function() {
			if (open3.className == "off") {
				onoff(3);
				
				generate(3);
			} else {
				clearTimeout(auto);
				onoff(0);
				reset(0);
			}
		};
		
		clear.onclick = function() {
			clearTimeout(auto);
			onoff(0);
			reset(1);
		};
	});
	
}