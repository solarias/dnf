//변수 - 일반
var i, temp; //임시
var auto; //자동실행
var count = 1;

var countdown = [];//3분 타이머
var resultArr = [];

var	images = "./images/selfish/";
var imageList = []; //이미지 선로딩용 임시저장소

//변수 - DOM 지정
var open1 = document.getElementById('open1');
var open2 = document.getElementById('open2');
var clear = document.getElementById('clear');
var show = document.getElementById('show');
	var show_img = document.getElementById('show_img');
	var show_right = document.getElementById('show_right');
	var show_bar = document.getElementById('show_bar');
	var show_text = document.getElementById('show_text');
var record = document.getElementById('record');
	var record_img = document.getElementById('record_img');
	var record_text = document.getElementById('record_text');
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

var count_selfish = [];//누적용


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
function generate(num) {
	show_text.style.color = "black";
	show_text.innerHTML = "항아리 개봉 중...";
	show_img.src = images + "hang1.gif";
	switch (num) {
		case 1://1회 개봉
			loading(1);
			break;
		case 2://연속 개봉
			loading(2);
			break;
	}
}

	function loading(num) {
		if (show_bar.offsetWidth < 380) {
			show_bar.style.width = (show_bar.offsetWidth + 10).toString() + "px";
			auto = setTimeout(function() {
					loading(num);
				},20);
		} else {
			if (num == 1) {
				pick();
				onoff(0);
			} else {
				pick();
				generate(2);
			}
		}
	}

		function pick() {
			//스타일 복구
			show_bar.style.width = "0px";
			show_right.style.backgroundColor = "black";
			show_text.style.color = "#E5B64A";
			
			//상단에 표시
			show_img.src = images + "secret.png";
			show_text.innerHTML = "<span class='epic'>시크릿 안톤 에픽 아이템</span>";
			show_text.innerHTML += " <span class='blue'>(3분 후 공개)</span>"
			
			//하단에 표시
			var text = "<div class='line'>";
			text += "<img id='image_" + count.toString() + "' src='" + images + "secret.png' />";
			text += "<div>" + count + "회차 : <span id='name_" + count.toString() + "' class='epic'>시크릿 안톤 에픽 아이템</span>"
			text += " <span id='timer_" + count.toString() + "' class='blue'>(3:00)</span>";
			text += "</div>";
			record.innerHTML += text;
			record.scrollTop = record.scrollHeight;
			
			//변수 변화
			countdown.push(180);
			count += 1;
		}

//항목 공개
function showdown() {
	for (var i=0;i<countdown.length;i++) {
		if (countdown[i] > 0) {
			var h = Math.floor(countdown[i]/60);
				h = h.toString();
			var s = countdown[i]%60
				s = s.toString();
				if (s.length == 1) {
					s = "0" + s;
				} else if (s.length == 0) {
					s = "00";
				}
			document.getElementById("timer_" + (i+1).toString()).innerHTML = "(" + h + ":" + s + ")";
			
			countdown[i] -= 1;
		} else if (countdown[i] == 0) {
			//대상 선정
			resultArr[i] = Math.floor(Math.random() * list_selfish.length);
			
			//누적 배열에 저장
			count_selfish[resultArr[i]][1] += 1;
			
			//아이템 표시
			document.getElementById("image_" + (i+1).toString()).src = images + list_selfish[resultArr[i]][1] + ".png";
			document.getElementById("name_" + (i+1).toString()).innerHTML = list_selfish[resultArr[i]][0];
			if (count_selfish[resultArr[i]][1] == 1) {
				document.getElementById("timer_" + (i+1)).className = "green";
				document.getElementById("timer_" + (i+1)).innerHTML = "(NEW)"
			} else {
				document.getElementById("timer_" + (i+1)).className = "orange";
				document.getElementById("timer_" + (i+1)).innerHTML = "(x" + count_selfish[resultArr[i]][1].toString() + ")";
			}
			
			countdown[i] = -1;
		}
	}
}
		
function onoff(num) {
	switch (num) {
		case 0:
			open1.value="1회 개봉";
			open2.value="연속 개봉";
			open1.disabled="";
			open2.disabled="";
			
			open1.className = "off";
			open2.className = "off";
			
			break;
		case 1:
			open1.value="정지";
			open2.disabled="disabled";
			
			open1.className = "on";
			open2.className = "off";
			
			break;
		case 2:
			open1.disabled="disabled";
			open2.value="정지";
			
			open1.className = "off";
			open2.className = "on";
			
			break;
	}
}

function reset(num) {
	show_img.src = images + "hang0.png";
	show_bar.style.width = "0px";
	show_text.innerHTML = "";
	
	if (num == 1) {
		count = 1;
		record.innerHTML = "";
	}
}



//실행
window.onload = function() {
	//선로딩
	for (i=0;i<list_selfish.length;i++) {
		imageList.push(images + list_selfish[i][1] + ".png");
	}
	imageList.push(images + "hang0.png");
	imageList.push(images + "hang1.gif");
	imageList.push(images + "secret.png");
	
	loadImages(imageList,function(){
	
		document.getElementsByTagName('body')[0].style.backgroundColor="#FFFFCC";
		cover.style.display = "none";
		
		//누적용 배열 준비
		for (i=0;i<list_selfish.length;i++) {
			count_selfish[i] = [];
			count_selfish[i][0] = list_selfish[i][0];
			count_selfish[i][1] = 0;
		};
		
		//실행
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
		
		clear.onclick = function() {
			clearTimeout(auto);
			onoff(0);
			reset(1);
		};
		
		setInterval(function() {
			showdown();
		}, 1000);
	});
	
}