//=================================================================================================================
//※ 변수 지정
//=================================================================================================================
var i, j; //for 루프
var auto1, auto2, auto3, autoBlast;//setTimeout 전용 (1,2 : 1회, 3 : 연속, 3 : 충격파)
var running = 0;//연속실행 상태 기억

//입력&출력 정보
var count = 0; //회차
var date = 0;//일차
var pot = 0;//항아리 개봉 횟수
var over = 0;//카드 넘긴 횟수

var getAntonium = 0;//이번 회차에 획득한 응토
var antoniumToSpirit = 0;//응토 업그레이드 유무

//비용

//이미지
var	images = "./images/anton/";
var imageList = []; //이미지 선로딩용 임시저장소

//=================================================================================================================
//※ DOM 변수에 할당 (앞에 '$'를 붙임)
//=================================================================================================================
var $frame_left = document.getElementById("frame_left");
var $left_count_num = document.getElementById("left_count_num");
var $left_count_date = document.getElementById("left_count_date");
var $left_antonium_num = document.getElementById("left_antonium_num");
var $clear = document.getElementById("clear");
var $open1 = document.getElementById("open1");
var $open2 = document.getElementById("open2");

var $frame_right = document.getElementById("frame_right");
var $title_1 = document.getElementById("title_1");
var $title_2 = document.getElementById("title_2");
var $title_3 = document.getElementById("title_3");
var $get_antonium = document.getElementById("get_antonium");
var $get_spirit = document.getElementById("get_spirit");
var $record = document.getElementById("record");
var $inventory = document.getElementById("inventory");
var $shop = document.getElementById("shop");
var $shift1 = document.getElementById("shift1");
var $shift2 = document.getElementById("shift2");
var $shift3 = document.getElementById("shift3");
var $gamble = document.getElementById("gamble");
	var $gamble_right = document.getElementById("gamble_right");
	var $gamble_bar = document.getElementById("gamble_bar");
	var $gamble_text = document.getElementById("gamble_text");
	var $gamble_count_num = document.getElementById("gamble_count_num");
	var $gamble_open = document.getElementById("gamble_open");

var $cover = document.getElementById("cover");

//=================================================================================================================
//※ 자료
//=================================================================================================================
//일반 에픽 or 안톤 관련
var chanceList_num = [
	[86,14],//[0] : 에픽 or 안톤
	//일반 에픽
	[4,1.3,1.25,1.25],//[1] : 에픽 한정 - 무기/악세서리/특수장비 선택
	[33, 33, 12, 15],//[2] : 무기 에픽 - 레벨 가중치
	[33, 33, 12, 15],//[3] : 악세서리 에픽 - 레벨 가중치
	[33, 45, 22],//[4] : 보조장비 에픽 - 레벨 가중치
	[50, 50],//[5] : 마법석 에픽 - 레벨 가중치
	//안톤
	[50,50],//[6] : 저지1 응토 가중치
	[74,14,12],//[7] : 저지2 응토 가중치
	[74,14,12]//[8] : 토벌1 응토 가중치
	
];
var chanceList_name = [
	["에픽", "안톤"],
	//일반 에픽
	["무기","악세서리","보조장비","마법석"],
	[[60], [70], [75], [80]],//무기 에픽
	[[60], [70], [75], [80]],//악세서리 에픽
	[[60, 65], [70, 75], [80]],//보조장비 에픽
	[[60, 65],[70, 75, 80]],//마법석 에픽
	//안톤
	[2,3],//저지1 응토
	[0,2,3],//저지2 응토
	[0,2,3]//토벌1 응토
];
	//=================================================================================================================
	//※ 함수 - 선로딩, 내부작업용
	//=================================================================================================================
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
								이미지 로딩 중 ("+Math.round((((arr.length - remaining + 1)/arr.length)*100),0).toString()+"%)";
								//내부 처리
								--remaining;
								if (remaining <= 0) {
									callBack();
								};
							};
							img.onerror = function() {
								//외부 처리 
								document.getElementById("cover").innerHTML = "\
								이미지 로딩 중 ("+Math.round((((arr.length - remaining + 1)/arr.length)*100),0).toString()+"%)";
								--remaining;
								if (remaining <= 0) {
									callBack();
								};
							};
							img.src = arr[i];
							imagesArray.push(img);
						};
						
					};

					//IE8에 indexOf 적용
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
					}
					
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

					//숫자인지 판단 (출처 : http://mwultong.blogspot.com/2007/01/isnum-isnumeric-isnumber-javascript.html)
					function isNumber(s) {
						s += ''; // 문자열로 변환
						s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
						if (s == '' || isNaN(s)) return false;
						return true;
					}
					
					//가중치 적용 랜덤
					function rand(target) {//target : 숫자가 들어있는 배열
						var number = 0;
						for (x=0;x<target.length;x++) {
							number += target[x];
						}
						var tmp = Math.random() * number;
						
						number = 0;
						for (x=0;x<target.length;x++) {
							number += target[x];
							if (tmp < number) {
								return x;
							}
						}
					}
					
					//특정 클래스 지우기
					function removeClass(target,toErase) {
						target.className = target.className.replace( new RegExp('(?:^|\\s)'+toErase+'(?!\\S)') ,'');
					}
					
					//애니메이션 감지
					function transitionEndEventName () {
						var i,
							undefined,
							el = document.createElement('div'),
							transitions = {
								'transition':'transitionend',
								'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
								'MozTransition':'transitionend',
								'WebkitTransition':'webkitTransitionEnd'
							};

						for (i in transitions) {
							if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
								return transitions[i];
							}
						}

						//TODO: throw 'TransitionEnd event is not supported in this browser'; 
					}
//=================================================================================================================
//※ 함수 - 작동용
//=================================================================================================================
//충격파 배치
function generateBlast() {
	for (var i=1;i<=20;i++) {
		var target = document.getElementById("card" + i.toString());
		//충격파 div 생성
		var blaster = document.createElement("div");
		blaster.id = "card" + i.toString() + "_blast";
		blaster.className = "blast";
		blaster.style.position = "absolute";
		var posX = target.offsetLeft;
		var posY = target.offsetTop;
		blaster.style.left = (posX - 125).toString() + "px";
		blaster.style.top = (posY - 103).toString() + "px";
		blaster.style.zIndex = "3";
		blaster.style.width = "350px";
		blaster.style.height = "350px";
		
		blaster.style.backgroundImage = "url(./images/anton/card_blast.png)";
		
		//충격파 div 이식
		$frame_left.appendChild(blaster);
	}
}

//실행 (1 : 1회 실행, 2 : 연속 실행(최초), 3 : 연속 실행(이후))
function simulate(num) {
	//회차 증가
	count += 1;
	if (count%3 == 1) {
		date += 1;
	} else {
		date += 3;
	}

	//회차 표시
	$left_count_num.innerHTML = count.toString();
	$left_count_date.innerHTML = date.toString();

	//응토 보상
	var antonium = [,,];//[0] : 저지1, [1] : 저지2, [2] : 토벌1
	antonium[0] = chanceList_name[6][rand(chanceList_num[6])];
	antonium[1] = chanceList_name[7][rand(chanceList_num[7])];
	antonium[2] = chanceList_name[8][rand(chanceList_num[8])];
	getAntonium = antonium[0] + antonium[1] + antonium[2];
	antonList[0][4] += getAntonium + 2;
		//응토 120개 이상 : 교체
		if (antonList[0][4] >= 120) {
			antonList[0][4] -= 120;
			antonList[1][4] += 1;
			antoniumToSpirit = 1;
		} else {
			antoniumToSpirit = 0;
		}
		//응토 보상 적용
		$left_antonium_num.innerHTML = getAntonium.toString();
		$get_antonium.innerHTML = thousand(antonList[0][4]);
		$get_spirit.innerHTML = thousand(antonList[1][4]);
		
	//카드 보상, 이후 다음 회차로
	switch (num) {
		case 1:
			if (count == 1) {
				for (var i=1;i<=20;i++) {
					document.getElementById("card" + i.toString() + "_back").style.WebkitTransition = "none";
					document.getElementById("card" + i.toString() + "_back").style.MozTransition = "none";
					document.getElementById("card" + i.toString() + "_back").style.OTransition = "none";
					document.getElementById("card" + i.toString() + "_back").style.transition = "none";
					drop(i);
					document.getElementById("card" + i.toString() + "_back").offsetHeight;
					document.getElementById("card" + i.toString() + "_back").style.WebkitTransition = "0.6s";
					document.getElementById("card" + i.toString() + "_back").style.MozTransition = "0.6s";
					document.getElementById("card" + i.toString() + "_back").style.OTransition = "0.6s";
					document.getElementById("card" + i.toString() + "_back").style.transition = "0.6s";
					document.getElementById("card" + i.toString()).className += " flipped";
					auto2 = setTimeout(function() {
						over += 1;
						if (over >= 20) {
							over = 0;
							onoff(0);
						}
					}, 600);
				}
			} else {
				for (var i=1;i<=20;i++) (function(i){
					while (1) {
						if (document.getElementById("card" + i.toString()).className.indexOf("flipped") != -1) {
							removeClass(document.getElementById("card" + i.toString()),"flipped");
						} else {
							break;
						}
					}
					auto1 = setTimeout(function() {
						document.getElementById("card" + i.toString() + "_back").style.WebkitTransition = "none";
						document.getElementById("card" + i.toString() + "_back").style.MozTransition = "none";
						document.getElementById("card" + i.toString() + "_back").style.OTransition = "none";
						document.getElementById("card" + i.toString() + "_back").style.transition = "none";
						drop(i);
						document.getElementById("card" + i.toString() + "_back").offsetHeight;
						document.getElementById("card" + i.toString() + "_back").style.WebkitTransition = "0.6s";
						document.getElementById("card" + i.toString() + "_back").style.MozTransition = "0.6s";
						document.getElementById("card" + i.toString() + "_back").style.OTransition = "0.6s";
						document.getElementById("card" + i.toString() + "_back").style.transition = "0.6s";
						document.getElementById("card" + i.toString()).className += " flipped";
						auto2 = setTimeout(function() {
							over += 1;
							if (over >= 20) {
								over = 0;
								onoff(0);
							}
						}, 600);
					}, 600);
				})(i);
			}
			
			break;
		case 2:
			for (var i=1;i<=20;i++) {
				document.getElementById("card" + i.toString() + "_front").style.WebkitTransition = "none";
				document.getElementById("card" + i.toString() + "_front").style.MozTransition = "none";
				document.getElementById("card" + i.toString() + "_front").style.OTransition = "none";
				document.getElementById("card" + i.toString() + "_front").style.transition = "none";
				document.getElementById("card" + i.toString() + "_back").style.WebkitTransition = "none";
				document.getElementById("card" + i.toString() + "_back").style.MozTransition = "none";
				document.getElementById("card" + i.toString() + "_back").style.OTransition = "none";
				document.getElementById("card" + i.toString() + "_back").style.transition = "none";
				drop(i);
				document.getElementById("card" + i.toString() + "_back").offsetHeight;
				document.getElementById("card" + i.toString()).className += " flipped";
			}
			auto3 = setTimeout(function() {
				simulate(3);
			}, 150);
			break;
		case 3:
			for (var i=1;i<=20;i++) {
				drop(i);
			}
			auto3 = setTimeout(function() {
				simulate(3);
			}, 150);
	}
}

//아이템 드랍
function drop(num) {
	var type1 = chanceList_name[0][rand(chanceList_num[0])];
	if (type1 == "에픽") {
		//카드 뒷면 설정
		document.getElementById("card" + num.toString() + "_back").style.backgroundPosition = "0px 0px";
		
		//에픽 종류 선정
		var type2 = chanceList_name[1][rand(chanceList_num[1])];
		
		//레벨 선정
		var level = chanceList_name[2 + chanceList_name[1].indexOf(type2)][rand(chanceList_num[2 + chanceList_name[1].indexOf(type2)])];
		
		//특정 종류&레벨의 아이템 리스트 구축
		var tempArr = [];
		for (var i=0;i<itemList.length;i++) {
			if ((itemList[i][0] == type2/*종류-무기*/
			|| itemList[i][1] == type2/*종류-악세서리*/
			|| itemList[i][2] == type2)/*종류-보조장비&마법석*/
			&& level.indexOf(itemList[i][3]) != -1) {/*레벨*/
				tempArr.push(itemList[i]);
			}
		}
		//리스트에서 랜덤으로 선정
		var temp = tempArr[Math.floor(Math.random() * tempArr.length)];
		/*
		//보유 수량 증가
		for (var i=0;i<itemList.length;i++) {
			if (itemList[i] == temp) {
				itemList[i][9] += 1;
			}
		}
		*/
		//이름 출력
		document.getElementById("card" + num.toString() + "_text").innerHTML = "<span class='epic'>" + temp[4] + "</span>";
		//아이콘 출력
		document.getElementById("card" + num.toString() + "_img").style.backgroundPosition = spritePosition(temp[7]);
		
		//내 꺼일 때 한정
		if (num == 1) {
			//업데이트
			update(1,temp);//1 : 일반 에픽
		}
	} else if (type1 == "안톤") {
		var tempArr = [[],[]];//[0] : 드랍 가능 리스트, [1] : 확률 가중치
		for (var i=0;i<antonList.length;i++) {
			if (antonList[i][3] != 0) {
				tempArr[0].push(i);
				tempArr[1].push(antonList[i][3]);
			}
		}
		//가중치에 따라 드랍 대상 선정
		var temp = antonList[tempArr[0][rand(tempArr[1])]];
		
		//카드 뒷면 설정
		if (temp[0] == "안톤의 영혼 조각") {
			document.getElementById("card" + num.toString() + "_back").style.backgroundPosition = "0px 0px";
		} else {
			document.getElementById("card" + num.toString() + "_back").style.backgroundPosition = "100px 0px";
			if (running != 1) {
				blast(num);
			}
		}
		
		//이름 출력
		document.getElementById("card" + num.toString() + "_text").innerHTML = "<span class='" + temp[1] + "'>" + temp[0] + "</span>";
		//아이콘 출력
		document.getElementById("card" + num.toString() + "_img").style.backgroundPosition = spritePosition(temp[0]);
		
		
		
		//내 꺼일 때 한정
		if (num == 1) {
			//보유 수량 증가
			for (var i=0;i<antonList.length;i++) {
				if (antonList[i] == temp) {
					antonList[i][4] += 1;
					break;
				}
			}
			//업데이트
			update(2,temp);//2 : 안톤 관련
		}
	}
}
	//카드 공개 충격파 설정
	function blast(num) {
		//충격파 실행
		var blaster = document.getElementById("card" + num.toString() + "_blast");
		
		animation(blaster,350,4900);
	}
	
	//카드 공개 충격파 실행
	function animation(target,frameWidth,now) {
		if (now > 0) {
			autoBlast = setTimeout(function() {
				target.style.backgroundPosition = (now - frameWidth).toString() + "px 0px";
				animation(target,frameWidth,now - frameWidth);
			}, 40);
		} else {
			target.style.backgroundPosition = "0px 0px";
		}
	}

	
//업데이트
function update(num, target) {
	//획득 기록
	if (num == 1) {
		var text1 = "<span class='yellow'>" + target[4] + "</span>" + " [" + target[2] + "/" + target[3].toString() + "제]";
	} else {
		var text1 = "<span class='" + target[1] + "'>" + target[0] + "</span>";
	}
	if (antoniumToSpirit == 1) {
		var text2 = "<br/>┗ <span class='skyblue'>응축된 안토니움</span> 120개 &#8658; <span class='unique'>안톤의 영혼 조각</span> 1개"
	} else {
		var text2 = ""
	}
	$record.innerHTML += "<p>" + count.toString() + "회차 (" + date.toString() + "일차)\
	<span class='skyblue'>(응축된 안토니움 : <span class='white'>" + getAntonium.toString() + "개 + 2개</span>)</span>\
	<br/>┗ " + text1 + text2 + "</p>";
	
	$record.scrollTop = $record.scrollHeight;
	//get 부분
	$get_spirit.innerHTML = thousand(antonList[1][4]);
	
	//인벤토리
	
}

//버튼 활성화/비활성화
function onoff(num) {
	switch (num) {
		case 0://모두 활성화
			$open1.disabled = "";
			$open2.disabled = "";
			$clear.disabled = "";
			$gamble_open.disabled = "";
			
			$open1.value = "1회 토벌";
			$open2.value = "연속 토벌";
			break;
		case 1://기본 실행중
			clearTimeout(auto1);
			clearTimeout(auto2);
			clearTimeout(auto3);
			
			$open1.disabled = "disabled";
			$open2.disabled = "disabled";
			$clear.disabled = "disabled";
			$gamble_open.disabled = "disabled";
			
			$open1.value = "토벌 중";
			$open2.value = "연속 토벌";
			break;
		case 2://연속 실행중
			clearTimeout(auto1);
			clearTimeout(auto2);
			clearTimeout(auto3);
			
			$open1.disabled = "disabled";
			$open2.disabled = "";
			$clear.disabled = "disabled";
			$gamble_open.disabled = "disabled";
			
			$open1.value = "1회 토벌";
			$open2.value = "토벌 중지";
			break;
	}
}
//=================================================================================================================
//※ 실행
//=================================================================================================================
window.onload = function() {

	//선작업 : 일부 아이템리스트 제거
	var tempList = [];
	for (i=0;i<itemList.length;i++) {
		//방어구 아이템, 85레벨 아이템, 고유 에픽 제거
		if (itemList[i][0] == "방어구" || itemList[i][3] == 85 || itemList[i][6] != "") {
			tempList.push(i);
		}
	};
	//역순으로 아이템 리스트내 특정 아이템 제거
	for (i=tempList.length-1;i>=0;i--) {
		itemList.splice(tempList[i],1);
	};
	
	//선로딩 : 이미지
	//1단계 : 스프아이트 이미지 추가 (일반 에픽은 여길 참고)
	imageList.push("./sprite/images/sprite_anton.png");
	
	//2단계 : 안톤 관련 이미지 추가 (인벤토리/상점 전용)
	for (i=0;i<antonList.length;i++) {
		imageList.push(images + "antonImg/" + "1_" + antonList[i][0] + ".png")//이미지 선로딩 대상에 추가
	}
	
	//3단계 : 기타 이미지 추가
	imageList.push(images + "background.jpg");//메인 배경
	imageList.push(images + "card_front.png");//카드 앞면
	imageList.push(images + "card_back.png");//카드 뒷면
	imageList.push(images + "card_blast.png");//개봉 충격파 (골드 카드 전용)
	imageList.push(images + "card_frame.png");//내 캐릭터 표시
	imageList.push(images + "hang.png");//항아리
	imageList.push(images + "record.png");//항아리
	imageList.push(images + "inventory.png");//항아리
	
	//5단게 : 이미지 선로딩 실시
	loadImages(imageList,function(){
		//=================================================================================================================
		//※ 선로딩 끝, 본격적 실행 시작
		//=================================================================================================================
			//0. 선로딩 잔재 제거 (cover 제거)
			$cover.style.display = "none";
			
			//1. 충격파 배치
			generateBlast()
			
			//2. 버튼 설정
			$open1.onclick = function() {
				onoff(1);
				simulate(1);
			}
			$open2.onclick = function() {
				if (running == 0) {
					running = 1
					onoff(2);
					simulate(2);
				} else {
					clearTimeout(auto3);
					
					//카드 앞면&뒷면 뒤집기 활성화
					for (var i=1;i<=20;i++) {
						document.getElementById("card" + i.toString() + "_front").style.WebkitTransition = "0.6s";
						document.getElementById("card" + i.toString() + "_front").style.MozTransition = "0.6s";
						document.getElementById("card" + i.toString() + "_front").style.OTransition = "0.6s";
						document.getElementById("card" + i.toString() + "_front").style.transition = "0.6s";
						document.getElementById("card" + i.toString() + "_back").style.WebkitTransition = "0.6s";
						document.getElementById("card" + i.toString() + "_back").style.MozTransition = "0.6s";
						document.getElementById("card" + i.toString() + "_back").style.OTransition = "0.6s";
						document.getElementById("card" + i.toString() + "_back").style.transition = "0.6s";
						//기준 골카 충격파 실행 (마지막 카드)
						if (document.getElementById("card" + i.toString() + "_back").style.backgroundPosition == "100px 0px") {
							blast(i);
						}
					}
					
					running = 0;
					onoff(0);
				}
			}
			$clear.onclick = function() {
				
			}
			
			$gamble_open.onclick = function() {
				
			}
			
			$shift1.onclick = function() {
				//버튼 변경
				$shift1.className = "selected";
				$shift2.className = "";
				$shift2.className = "";
				//제목 변경
				$title_1.style.display = "block";
				$title_2.style.display = "none";
				$title_3.style.display = "none";
				//창 변경
				$record.style.display = "block";
				$inventory.style.display = "none";
				$shop.style.display = "none";
			}
			$shift2.onclick = function() {
				//버튼 변경
				$shift1.className = "";
				$shift2.className = "selected";
				$shift3.className = "";
				//제목 변경
				$title_1.style.display = "none";
				$title_2.style.display = "block";
				$title_3.style.display = "none";
				//창 변경
				$record.style.display = "none";
				$inventory.style.display = "block";
				$shop.style.display = "none";
			}
			$shift3.onclick = function() {
				//버튼 변경
				$shift1.className = "";
				$shift2.className = "";
				$shift3.className = "selected";
				//제목 변경
				$title_1.style.display = "none";
				$title_2.style.display = "none";
				$title_3.style.display = "block";
				//창 변경
				$record.style.display = "none";
				$inventory.style.display = "none";
				$shop.style.display = "block";
			}
	});
	
}


//===============================
//※ 급조 - 관련 사이트 기능
//===============================
var linkDrop = document.getElementById("frame_etc_link_list");
linkDrop.selectedIndex = 0;

document.getElementById("frame_etc_link_list").onchange = function() {
	if (linkDrop.value != "") {
		var yesno = confirm("※ 주의 : 해당 사이트로 이동하면 현재 진행된 기록은 모두 지워집니다.\n그래도 이동하시겠습니까?");
		if (yesno) {
			window.location.href = linkDrop.value;
		} else {
			linkDrop.selectedIndex = 0;
		}
	}
}