//=================================================================================================================
//※ 변수 지정
//=================================================================================================================
var i, j; //for 루프
var auto, autoBlast;//setTimeout 전용

//선택
var pre_selectedIndex = -1;//이전에 선택한 항아리

//입력&출력 정보
var count = 1; //회차
var icon = [//아이콘 표기 시 사용
	[],//[0] : 개별 아이템 아이콘
	[],//[1] : 종류 아이콘
	[] //[2] : 등급 아이콘
];
var pot;//항아리 종류
var trade = 0;//교환가능 여부
var level;//드랍 아이템 레벨

//비용
var gold = 0;//소모 골드
var date = 0;//소모 일수

//이미지
var	images = "./images/hell/";
var imageList = []; //이미지 선로딩용 임시저장소


//=================================================================================================================
//※ DOM 변수에 할당 (앞에 '$'를 붙임)
//=================================================================================================================
var $wrapper = document.getElementById("wrapper");

var $frame_head = document.getElementById("frame_head");
	var $clear = document.getElementById("clear");

var $frame_menu = document.getElementById("frame_menu");
	var $select_pot = document.getElementById("select_pot");
	var $select_trade = document.getElementById("select_trade");
	var $select_cost = document.getElementById("select_cost");
	var $select_effect = document.getElementById("select_effect");

var $frame_main = document.getElementById("frame_main");
	var $main_count_cover = document.getElementById("main_count_cover");
	var $main_count = document.getElementById("main_count");

var $frame_cost = document.getElementById("frame_cost");
	var $cost_gold = document.getElementById("cost_gold");
	var $cost_date = document.getElementById("cost_date");
var $frame_record = document.getElementById("frame_record");
var $frame_filter = document.getElementById("frame_filter");
	var $record_clear = document.getElementById("record_clear");


var $cover =  document.getElementById('cover');
var $imagePreloader = document.getElementById('imagePreloader');

//=================================================================================================================
//※ 자료
//=================================================================================================================
//레벨 가중치 - 레벨별 가중치
var chanceList_num = [
	[33, 33, 12, 15, 7],//귀검사(각 레벨 별)
	[33, 33, 12, 15, 7],//격투가(각 레벨 별)
	[33, 33, 12, 15, 7],//거너(각 레벨 별)
	[33, 33, 12, 15, 7],//마법사(각 레벨 별)
	[33, 33, 12, 15, 7],//프리스트(각 레벨 별)
	[33, 33, 12, 15, 7],//도적(각 레벨 별)
	[33, 45, 22],//보조장비(60&65 / 70&75 / 80&85)
	[50, 50]//마법석(65 / 75&85)
];
//레벨 가중치 - 해당 레벨
var chanceList_name = [
	[[60], [70], [75], [80], [85]],//귀검사
	[[60], [70], [75], [80], [85]],//격투가
	[[60], [70], [75], [80], [85]],//거너
	[[60], [70], [75], [80], [85]],//마법사
	[[60], [70], [75], [80], [85]],//프리스트
	[[60], [70], [75], [80], [85]],//도적
	[[60, 65], [70, 75], [80, 85]],//보조장비
	[[60, 65],[70, 75, 80, 85]]//마법석
];

var costList_gold = [
	5000000,//교불
	50000000//교가
]
var costList_date = [
	100,//교불
	0//교가
]
var costList_name = [
	"500만 <strong>Gold</strong> (+100일)",//교불
	"5000만 <strong>Gold</strong>"//교불
]

//항아리 명칭
var potList = [
	"영웅의 귀검사 항아리",
	"영웅의 격투가 항아리",
	"영웅의 거너 항아리",
	"영웅의 마법사 항아리",
	"영웅의 프리스트 항아리",
	"영웅의 도적 항아리",
	"영웅의 보조장비 항아리",
	"영웅의 마법석 항아리"
];
//분류 기준
var conditionList = [
	"귀검사，다크나이트，나이트",
	"격투가",
	"거너",
	"마법사，크리에이터",
	"프리스트",
	"도적",
	"보조장비",
	"마법석"
];
var equipList = [
	"소검","도","둔기","대검","광검",
	"너클","건틀릿","클로","권투글러브","통파",
	"리볼버","자동권총","머스켓","핸드캐넌","보우건",
	"창","봉","로드","스탭","빗자루",
	"십자가","염주","토템","낫","배틀액스",
	"단검","쌍검","완드","차크라웨펀",
	"천","가죽","경갑","중갑","판금",
	"목걸이","팔찌","반지","보조장비","마법석"
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
					}
//=================================================================================================================
//※ 함수 - 작동용
//=================================================================================================================

//카드 애니메이션
function cardAni(num,target) {
	switch (num) {
		case 0://현재 회차 카드 생성
			//카드 생성
			var card = document.createElement("div");
			card.id = "card" + (target).toString();
			card.className = "flipcard h No" + pot.toString();
			$frame_main.appendChild(card);
				var card_front = document.createElement("div");
				card_front.id = "card" + (target).toString() + "_front";
				card_front.className = "front";
				document.getElementById("card" + (target).toString()).appendChild(card_front);
					var card_title = document.createElement("p");
					card_title.className = "title";
					card_title.innerHTML = potList[pot];
					document.getElementById("card" + (target).toString() + "_front").appendChild(card_title);
					var card_click = document.createElement("p");
					card_click.id = "card" + (target).toString() + "_click";
					card_click.className = "click";
					card_click.innerHTML = "(클릭하세요)";
					document.getElementById("card" + (target).toString() + "_front").appendChild(card_click);
				var card_back = document.createElement("div");
				card_back.id = "card" + (target).toString() + "_back";
				card_back.className = "back";
				document.getElementById("card" + (target).toString()).appendChild(card_back);
					var card_text = document.createElement("p");
					card_text.id = "card" + (target).toString() + "_text";
					card_text.className = "text";
					document.getElementById("card" + (target).toString() + "_back").appendChild(card_text);
					var card_detail = document.createElement("p");
					card_detail.id = "card" + (target).toString() + "_detail";
					card_detail.className = "detail";
					document.getElementById("card" + (target).toString() + "_back").appendChild(card_detail);
					var card_img = document.createElement("img");
					card_img.id = "card" + (target).toString() + "_img";
					document.getElementById("card" + (target).toString() + "_back").appendChild(card_img);
			
			//카드 배치
			document.getElementById("card" + (target).toString()).style.top = "25px";
			document.getElementById("card" + (target).toString()).style.left = "-122px";
			
			//카드 등장시키기
			auto = setTimeout(function() {
				cardAni(1, target);
			},10);
			break;
		case 1://현재 회차 카드 등장
			if (document.getElementById("card" + (target).toString()).offsetLeft < 15) {
				document.getElementById("card" + (target).toString()).style.left
					= (document.getElementById("card" + (target).toString()).offsetLeft + 5).toString() + "px";
				auto = setTimeout(function() {
					cardAni(1, target);
				},10);
			} else {
				document.getElementById("card" + count.toString()).style.left = "15px";
				document.getElementById("card" + count.toString()).onclick = function() {
					document.getElementById("card" + count.toString() + "_click").innerHTML = "";
					auto = setTimeout(function() {
						cardAni(2);
					},10);
				}
			}
			break;
		case 2://카드 뒤집기, 회차 추가
			//기존 카드 클릭 설정 제거
			document.getElementById("card" + count.toString()).onclick = "";
			//기존 카드 이동
			if (document.getElementById("card" + count.toString()).offsetLeft < 147) {
				document.getElementById("card" + count.toString()).style.left
					= (document.getElementById("card" + count.toString()).offsetLeft + 5).toString() + "px";
				auto = setTimeout(function() {
					cardAni(2);
				},10);
			} else {
				//회차 증가
				$main_count.innerHTML = thousand(count);
				$main_count_cover.style.display = "block";
				//카드 공개, 충격파 발생
				document.getElementById("card" + (count).toString()).className += " flipped";
				getItem();
				if (! $select_effect.checked) {
					blast();
				}
				//이전회차 카드 제거
				if (document.getElementById("card" + (count-1).toString())) {
					var erase = document.getElementById("card" + (count-1).toString());
					erase.parentElement.removeChild(erase);
				}
				//새 카드 생성
				cardAni(0, count+1);
				//회차, 비용 증가
				count += 1;
				gold += costList_gold[parseInt($select_trade.value)];
				date += costList_date[parseInt($select_trade.value)];
				$cost_gold.innerHTML = setWon(gold);
				$cost_date.innerHTML = thousand(date);
			}
			break;
		case 3://카드 제거
			//카드 있는지 체크 후 있으면 제거
			for (i=$frame_main.childNodes.length-1;i>=0;i--) {
				if ($frame_main.childNodes[i].id != "main_count_cover") {
					var erase = $frame_main.childNodes[i];
					erase.parentElement.removeChild(erase);
				}
			};
			
			break;
	}
}
	//카드 공개 충격파 설정
	function blast() {
		//충격파 div 생성
		var blaster = document.createElement("div");
		blaster.style.position = "absolute";
		blaster.style.top = "-25px";
		blaster.style.left = "230px";
		blaster.style.zIndex = "2";
		blaster.style.width = "350px";
		blaster.style.height = "350px";
		
		blaster.style.backgroundImage = "url(./images/hell/card_blast.png)";
		
		blaster.style.pointerEvents = "none";
		
		//충격파 div 이식
		$wrapper.appendChild(blaster);
		
		//충격파 실행
		animation(blaster,350,4550);
	}
	
	//카드 공개 충격파 실행
	function animation(target,frameWidth,now) {
		if (now > 0) {
			autoBlast = setTimeout(function() {
				target.style.backgroundPosition = (now - frameWidth).toString() + "px 0px";
				animation(target,frameWidth,now - frameWidth);
			}, 40);
		} else {
			target.parentElement.removeChild(target);
		}
	}


	
//아이템 출현
function getItem() {
	//1. 레벨 가중치 적용 후 레벨 선정
	level = chanceList_name[pot][rand(chanceList_num[pot])];
	//2. 레벨에 따른 아이템 드랍
		//2-1. 특정 종류&레벨의 아이템 리스트 구축
		var tempArr = [];
		for (i=0;i<itemList.length;i++) {
			if ((itemList[i][1] == conditionList[pot]/*종류-각 직업 무기*/
			|| itemList[i][2] == conditionList[pot])/*종류-악세서리&특수장비*/
			&& level.indexOf(itemList[i][3]) != -1)/*레벨*/ {
				tempArr.push(itemList[i]);
			}
		}
		//2-2. 미리 리스트에서 랜덤으로 선정
		var temp = tempArr[Math.floor(Math.random() * tempArr.length)];
		//보유 수량 증가
		for (i=0;i<itemList.length;i++) {
			if (itemList[i] == temp) {
				itemList[i][9] += 1;
			}
		}
		
		//이름 출력
		document.getElementById("card" + count.toString() + "_text").innerHTML = temp[4] + " <span class='skyblue'>(x" + temp[9].toString() + ")</span>";
		
		//아이콘 결정 & 출력
			//1. 이름으로 검색
			if (icon[0].indexOf(temp[7]) != -1) {
				document.getElementById("card" + count.toString() + "_img").src = images + "1_" + temp[7] + ".png";
			//2. 장비 종류로 검색 (무기 : 3차 분류 / 나머지 : 2차 분류)
			} else if (icon[1].indexOf(temp[1]) != -1 || icon[1].indexOf(temp[2]) != -1 ) {
				//2-1. 무기
				if (temp[0] == "방어구") {
					document.getElementById("card" + count.toString() + "_img").src = images + "2_" + temp[1] + ".png";
				//2-2. 방어구, 장신구, 특수장비
				} else {
					document.getElementById("card" + count.toString() + "_img").src = images + "2_" + temp[2] + ".png";
				}
			//3. 그냥 '에픽' 아이콘 사용
			} else {
				//_show_display.innerHTML += "<img src='" + images + "3_에픽.png'>";//하단 : 다음 마이피 버전
					document.getElementById("card" + count.toString() + "_img").src = "http://img2.ruliweb.daum.net/mypi/gup/a/125/4/o/3771057032.jpg";
			}
		
		//세부 사항 출력
		document.getElementById("card" + count.toString() + "_detail").innerHTML = "[" + temp[2] + "/" + temp[3].toString() + "제]";
		
		//업데이트
		$frame_record.innerHTML += "<p>" + count.toString() + "회차 : \
			<span class='epic'>" + temp[4] + "</span> [" + temp[2] + " / " + temp[3].toString() + "제] <span class='skyblue'>(x" + temp[9].toString() + ")</span></p>";
		//업데이트 창 이동
		$frame_record.scrollTop = $frame_record.scrollHeight;
}

//초기화
function reset() {
	//자동실행 중단
	clearTimeout(auto);
	
	//카드 지우기
	cardAni(3);
	
	//회차, 비용 초기화
	count = 1;
		$main_count.innerHTML = thousand(count);
		$main_count_cover.style.display = "none";
	gold = 0;
		$cost_gold.innerHTML = "0";
	date = 0;
		$cost_date.innerHTML = "0";
	//보유개수 초기화
	for (i=0;i<itemList.length;i++) {
		itemList[i][9] = 0;
	}
	//획득기록창 비우기
	$frame_record.innerHTML = "";
			
	//카드 재생성
	cardAni(0,count);
}

//=================================================================================================================
//※ 실행
//=================================================================================================================
window.onload = function() {
	//선작업 : 일부 아이템리스트 제거
	var tempList = [];
	for (i=0;i<itemList.length;i++) {
		//고유 에픽 제거
		if (itemList[i][6] != "") {
			tempList.push(i);
		}
	};
	for (i=tempList.length-1;i>=0;i--) {
		itemList.splice(tempList[i],1);
	};
	
	//선로딩 : 이미지
	//1단계 : 아이템 이미지 추가
	for (i=0;i<itemList.length;i++) {
		if (itemList[i][7] != "") {//아이콘 이름이 있다면
			icon[0].push(itemList[i][7]);//"아이콘 이름"을 불러올 대상으로 추가
			imageList.push(images + "1_" + itemList[i][7] + ".png")//이미지 선로딩 대상에 추가
		}
	}
	//※ 일부 이미지는 다음 마이피에서 가져옴 - 트래픽 초과 방지
	//1-1단계 : 코스모소울, 지옥구슬 추가
	//imageList.push(images + "3_코스모소울.png");
	//imageList.push(images + "3_지옥구슬.png");
	imageList.push("http://img2.ruliweb.daum.net/mypi/gup/a/125/4/o/3771057034.jpg");//코스모소울 - 다음 마이피
	imageList.push("http://img2.ruliweb.daum.net/mypi/gup/a/125/4/o/3771057033.jpg");//지옥구슬 - 다음 마이피
	
	
	//2단계 : 부위 이미지 추가 (equipList 참고)
	for (i=0;i<equipList.length;i++) {
		icon[1].push(equipList[i]);
		imageList.push(images + "2_" + equipList[i] + ".png");
	}
	
	//3단계 : 등급 이미지 추가 (gradeList 참고)
	/*
	for (i=0;i<gradeList.length;i++) {
		icon[2].push(gradeList[i]);
		imageList.push(images + "3_" + gradeList[i] + ".png");
	}
	*/
	imageList.push("http://img2.ruliweb.daum.net/mypi/gup/a/125/4/o/3771057031.jpg");//언커먼 - 다음 마이피
	imageList.push("http://img2.ruliweb.daum.net/mypi/gup/a/125/4/o/3771057020.jpg");//마봉 - 다음 마이피
	imageList.push("http://img2.ruliweb.daum.net/mypi/gup/a/125/4/o/3771057032.jpg");//에픽 - 다음 마이피
	
	//4단계 : 기타 이미지 추가
	imageList.push(images + "pot.png");//상단 항아리
	imageList.push(images + "main_background.png");//메인 배경
	imageList.push(images + "record_background.png");//기록 배경
	imageList.push(images + "card_front_0.png");//카드 앞면 1 - 귀검사
	imageList.push(images + "card_front_1.png");//카드 앞면 2 - 격투가
	imageList.push(images + "card_front_2.png");//카드 앞면 3 - 거너
	imageList.push(images + "card_front_3.png");//카드 앞면 4 - 마법사
	imageList.push(images + "card_front_4.png");//카드 앞면 5 - 프리스트
	imageList.push(images + "card_front_5.png");//카드 앞면 6 - 도적
	imageList.push(images + "card_front_6.png");//카드 앞면 7 - 보조장비
	imageList.push(images + "card_front_7.png");//카드 앞면 8 - 마법석
	imageList.push(images + "card_back2.png");//카드 뒷면
	imageList.push(images + "card_blast.png");//개봉 충격파
	
	//5단게 : 이미지 선로딩 실시
	loadImages(imageList,function(){
		//=================================================================================================================
		//※ 선로딩 끝, 본격적 실행 시작
		//=================================================================================================================
			//0. 선로딩 잔재 제거 (cover 제거)
			$cover.style.display = "none";
			
			$select_pot.onchange = function() {
				switch (pre_selectedIndex) {
					case -1://처음 변경
						//변수 변경
						pot = parseInt($select_pot.value);
						pre_selectedIndex = pot;
						
						//교환 여부 활성화
						$select_trade.disabled = "";
						$select_trade.style.backgroundColor = "#F4FA58";
						$select_cost.innerHTML = costList_name[parseInt($select_trade.value)];
						
						//카드 세팅
						cardAni(0, count);
						
						break;
					default ://처음 변경이 아닐 경우
						switch (count) {
							case 1://1회차일 경우
								//변수 변경
								pot = parseInt($select_pot.value);
								pre_selectedIndex = $select_pot.selectedIndex;
								
								//리셋 후 카드 세팅
								reset();
								
								break;
							default://1회차가 아닐 경우
								if (confirm("다른 항아리를 선택하면 기존 기록/정보가 사라집니다.\n항아리를 바꾸시겠습니까?")) {
									//변수 변경
									pot = parseInt($select_pot.value);
									pre_selectedIndex = $select_pot.selectedIndex;
									
									//리셋 후 카드 세팅
									reset();
									
									break;
								} else {
									$select_pot.selectedIndex = pre_selectedIndex;
								}
						}
				}
			};
			
			$select_trade.onchange = function() {
				$select_cost.innerHTML = costList_name[parseInt($select_trade.value)];
			};
			
			$clear.onclick = function() {
				if (confirm("\n초기화하시겠습니까?\n기존의 모든 정보가 사라집니다.")) {
					reset();
				}
			};
			
			$record_clear.onclick = function() {
				if (confirm("\n획득 기록창을 지우시겠습니까?\n(아이템 획득 정보, 회차, 소모 비용은 초기화되지 않습니다)")) {
					$frame_record.innerHTML = "";
				}
			};
	});
	
};