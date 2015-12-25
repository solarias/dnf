//=================================================================================================================
//※ 변수 지정
//=================================================================================================================
var i, temp; //임시
var auto; //자동실행
var running = 0;//자동실행 "중"

//선택
var pre_selectedIndex = 0;//이전에 선택한 무기
var selected = -1;  //지정한 무기의 (배열 내 순서)
var method = 0;//인챈트 방식 (0 : 강화, 1 : 증폭)

//단계
var grade = 0; //현 강화/증폭 단계
var count = 1; //시도횟수
var scroll_goal = 12;//강화권 목표

//비용, 최대치
var gold = 0;//총 소모 골드
var sera = 0;//총 소모 세라
var mosun = 0;//총 소모 모순
var mosun_gold = 0;//모순 골드 시세
var protect = 0;//총 소모 보호권
var protect_gold = 0;//보호권 골드 시세
var max = 0;//최고 강화등급

//이미지
var	images = "./images/selfish/";
var imageList = []; //이미지 선로딩용 임시저장소


//=================================================================================================================
//※ DOM 변수에 할당 (앞에 '$'를 붙임)
//=================================================================================================================
var $top = document.getElementById('top');
	var $weapon = document.getElementById('weapon');
	var $method = document.getElementById('method');
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
	var $open1 = document.getElementById('open1');
	var $open2 = document.getElementById('open2');
	var $open3 = document.getElementById('open3');
		var $store_table = document.getElementById('store_table');
	var $objective = document.getElementById('objective');
	var $enchant_img = document.getElementById('enchant_img');
	var $enchant_chance = document.getElementById('enchant_chance');
	var $enchant_count = document.getElementById('enchant_count');
	var $enchant_price = document.getElementById('enchant_price');
	var $enchant = document.getElementById('enchant');
	
var $record = document.getElementById('record');
	var $record_head = document.getElementById('record_head');
	var $record_display = document.getElementById('record_display');
	var $record_table = document.getElementById('record_table');
	var $enchant_method = document.getElementById('enchant_method');

var $record_filter = document.getElementById('record_filter');
	var $record_high = document.getElementById('record_high');
		var $record_high_select = document.getElementById('record_high_select');
	var $record_result = document.getElementById('record_result');
		var $record_result_select = document.getElementById('record_result_select');
	var $record_scroll = document.getElementById('record_scroll');
		var $record_scroll_method = document.getElementById('record_scroll_method');

var $result = document.getElementById('result');
		var $record_clear = document.getElementById('record_clear');
	var $result_gold_num = document.getElementById('result_gold_num');
	var $result_sera = document.getElementById('result_sera');
	var $result_sera_num = document.getElementById('result_sera_num');
	var $result_sera_gold = document.getElementById('result_sera_gold');
	var $result_mosun = document.getElementById('result_mosun');
	var $result_mosun_num = document.getElementById('result_mosun_num');
	var $result_mosun_gold = document.getElementById('result_mosun_gold');
	var $result_mosun_set = document.getElementById('result_mosun_set');
	var $result_protect_img = document.getElementById('result_protect_img');
	var $result_protect_num = document.getElementById('result_protect_num');
	var $result_protect_gold = document.getElementById('result_protect_gold');
	var $result_protect_set = document.getElementById('result_protect_set');
	var $result_gross = document.getElementById('result_gross');
	
	var $result_max_method = document.getElementById('result_max_method');
	var $result_max_num = document.getElementById('result_max_num');
	var $result_max_count = document.getElementById('result_max_count');
	
var $cover = document.getElementById('cover');

//=================================================================================================================
//※ 자료
//=================================================================================================================
var methodList = [
	"강화", "증폭"
]

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
	1,//1
	1,//2
	1,//3
	1,//4
	0.9,//5
	0.8,//6
	0.75,//7
	0.7,//8
	0.6,//9
	0.5,//10
	0.4,//11
	0.25,//12
	0.2,//13
	0.1,//14
	0.08,//15
	0.06,//16
	0.04,//17
	0.02,//18
	0.01,//19
	0.005//20
];

var priceList = [//해당 단계 강폭 비용
	[//강화 (세라)
		200,//1
		200,//2
		200,//3
		200,//4
		200,//5
		200,//6
		200,//7
		200,//8
		200,//9
		200,//10
		480,//11
		480,//12
		480,//13
		480,//14
		480,//15
		480,//16
		480,//17
		480,//18
		480,//19
		480//20
	],[//증폭 (골드)
		547200,//1
		547200,//2
		547200,//3
		547200,//4
		547200,//5
		547200,//6
		547200,//7
		547200,//8
		547200,//9
		547200,//10
		547200,//11
		547200,//12
		547200,//13
		547200,//14
		547200,//15
		547200,//16
		547200,//17
		547200,//18
		547200,//19
		547200//20
	]
];

var scrollList_price = [//강폭권 가격
	[//강화
		3000000,//1
		12000000,//5
		32000000,//10
		90000000,//30
		143000000,//50
		200000000,//70
		260000000//90
	],[//증폭
		4000000,//1
		20000000,//5
		38000000,//10
		140000000,//30
		250000000,//50
		400000000,//70
		1000000000//90
	]
];

var dropList = [//해당 단계 도전 실패 시 결과
	[//강화
		0,//1
		0,//2
		0,//3
		0,//4
		-1,//5
		-1,//6
		-1,//7
		-3,//8
		-3,//9
		-3,//10
		-10,//11
		-11,//12
		-12,//13
		-13,//14
		-14,//15
		-15,//16
		-16,//17
		-17,//18
		-18,//19
		-19//20
	],[//실패
		0,//1
		0,//2
		0,//3
		0,//4
		-1,//5
		-1,//6
		-1,//7
		-7,//8
		-8,//9
		-9,//10
		-10,//11
		-11,//12
		-12,//13
		-13,//14
		-14,//15
		-15,//16
		-16,//17
		-17,//18
		-18,//19
		-19//20
	]
];

var scrollList_chance = [//강폭권 확률
	0.01,//1
	0.05,//5
	0.1,//10
	0.3,//30
	0.5,//50
	0.7,//70
	0.9//90
];

var scrollList_count = [//강폭권 사용횟수
	[//강화
		0,//1
		0,//5
		0,//10
		0,//30
		0,//50
		0,//70
		0//90
	],[//증폭
		0,//1
		0,//5
		0,//10
		0,//30
		0,//50
		0,//70
		0//90
	]
];

var scrollList_price = [//강폭권 가격
	[//강화
		3000000,//1
		12000000,//5
		32000000,//10
		90000000,//30
		143000000,//50
		200000000,//70
		260000000//90
	],[//증폭
		4000000,//1
		20000000,//5
		38000000,//10
		140000000,//30
		250000000,//50
		400000000,//70
		1000000000//90
	]
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

					//숫자인지 판단 (출처 : http://mwultong.blogspot.com/2007/01/isnum-isnumeric-isnumber-javascript.html)
					function isNumber(s) {
						s += ''; // 문자열로 변환
						s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
						if (s == '' || isNaN(s)) return false;
						return true;
					}
					
//=================================================================================================================
//※ 함수 - 작동용
//=================================================================================================================

function selecting(target,how) {//무기&방법 변경
	//1회 이상 시도한 수 교체 시도 시
	if (count > 1) {
		if (target != pre_selectedIndex) {//미리 선택되어있으면 바꿀건지 질문
			if (! confirm("무기를 바꾸면 기존 강화/증폭 기록이 초기화됩니다.\n바꾸시겠습니까?")) {
				$weapon.selectedIndex = pre_selectedIndex;
				return;
			}
		} else if (parseInt(how) != method) {//강폭 방식이 바뀌면 바꿀건지 질문
			if (! confirm("강화/증폭 방법을 바꾸면 기존 기록이 초기화됩니다.\n바꾸시겠습니까?")) {
				$method.selectedIndex = method;
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
		//단계치 초기화
		grade = 0; //현 재련단계
		count = 1; //시도횟수
		//비용, 최대치 초기화
		gold = 0;//총 소모 골드
		sera = 0;//총 소모 세라
		mosun = 0;//총 소모 모순
		protect = 0;//총 소모 보호권
		max = 0;//최고 강화등급
		//강폭기 초기화
		$center_left_target.src = "";
		$center_left_target.style.visibility = "hidden";
		//메세지 초기화
		$message_img.style.visibility = "hidden";
		$message_text.innerHTML = "";
		//강폭권 사용횟수 초기화
		for(i=0;i<scrollList_count.length;i++) {
			for(j=0;j<scrollList_count[i].length;j++) {
				scrollList_count[i][j] = 0;
			}
		}
		//하단 초기화
		$record_table.innerHTML = "";
		//바닥 초기화
		$result_gold_num.innerHTML = setWon(gold);
		$result_sera_num.innerHTML = setWon(sera);
		$result_sera_gold.innerHTML = setWon(sera*1000);
		$result_mosun_num.innerHTML = thousand(mosun);
		$result_mosun_gold.innerHTML = setWon(mosun * mosun_gold);
		$result_protect_num.innerHTML = setWon(protect * protect_gold);
		$result_protect_gold.innerHTML = setWon(protect * protect_gold);
		$result_gross.innerHTML = setWon(gold + (sera*1000) + (mosun*mosun_gold) + (protect*protect_gold));
		$result_max_num.innerHTML = thousand(max);
		$result_max_count.innerHTML = "0";
	//타겟의 (배열 내 순서)를 변수에 입력
	selected = temp;
	pre_selectedIndex = $weapon.selectedIndex;
	//강폭 방법 입력
		//변수 변경
		method = $method.selectedIndex;
		//상점 변경
		$enchant_img.src = images + "scroll" + method.toString() + ".png";
		$enchant_method.innerHTML = methodList[method];
		$enchant_count.innerHTML = scrollList_count[method][$enchant_chance.selectedIndex];
		$enchant_price.innerHTML = setWon(scrollList_price[method][$enchant_chance.selectedIndex]) + " Gold";
		//하단(필터링) 변경
		$record_scroll_method.innerHTML = methodList[method];
		//바닥 변경
		if (method == 0) {	
			$result_sera.style.display = "inline";
			$result_mosun.style.display = "none";
			$result_protect_img.src = images + "protect0.png";
		} else {
			$result_sera.style.display = "none";
			$result_mosun.style.display = "inline";
			$result_protect_img.src = images + "protect1.png";
		}
		$result_max_method.innerHTML = methodList[method];
	//입력한 변수 출력 (이미지, 명칭)
	$now_img.style.visibility = "visible";
	$now_img.src = images + selfishList[selected][1] + ".png";	
	$now_text.innerHTML = "+0 " + selfishList[selected][0]
	//강폭기 준비
	ready();
	//버튼/리스트 활성화
	onoff(0);
	$clear.disabled = "";
	$objective.disabled = "";
	$enchant_chance.disabled = "";
}
	function ready() {//재련 준비창 출력
		//강폭기 이미지
		$center_left_back.src = images + "back" + method.toString() + ".png";
		//(고속 한정) 강폭기에 장비 장착
		if (running == 1) {
			$center_left_target.src = images + selfishList[selected][1] + ".png";	
			$center_left_target.style.visibility = "visible";
		} else {
			$center_left_target.src = "";	
			$center_left_target.style.visibility = "hidden";
		}
		//안내 메세지
		$show_bar.style.width = "0%";
		$show_text.style.color = "#D37CFF";
		var word = ["대기", "진행"];
		if (grade != 20) {
			$show_text.innerHTML = (grade+1).toString() + "단계 " + methodList[method] + " " + word[running] + " 중 ";
			if (method == 0) {
				$show_text.innerHTML += "<span class='white'>(" + thousand(count) + "회차 / 비용 : " + setWon(priceList[method][grade]) + " 세라)</span>";
			} else {
				$show_text.innerHTML += "<span class='white'>(" + thousand(count) + "회차 / 비용 : " + setWon(priceList[method][grade]) + " Gold, <img src='./images/selfish/mosun.png'> x " + (grade+1).toString() + ")</span>";
			}
		}
	}

function generate(num, goal) {
	//강폭기에 이미지 출력
	$center_left_target.src = images + selfishList[selected][1] + ".png";	
	$center_left_target.style.visibility = "visible";
	//게이지 출력
	$show_text.style.color = "black";
	if (num >= 11) {//강폭권
		$show_text.innerHTML = Math.round(scrollList_chance[$enchant_chance.selectedIndex]*100).toString() + "프로 +" + goal.toString() + " " + methodList[method] + "권 시도중...";
	} else {//일반 강폭
		$show_text.innerHTML = (grade+1).toString() + "단계 " + methodList[method] + " 중...";
	};
	switch (num) {
		case 1://1회 실행
			loading(1, goal);
			break;
		case 2://연속 실행
			loading(2, goal);
			break;
		case 3://고속 실행
			get(num, goal);
			if (grade == 20) {//20강 달성
				onoff(-1);//종료
			} else 	if (grade < goal) {//목표 미달성시
				auto = setTimeout(function() {
						generate(3, goal);
					},100);
			} else {//목표 달성 시
				onoff(0);
			}
			break;
		case 11://강폭권
			loading(11, goal);
			break;
	}
}

	function loading(num, goal) {
		if (($show_bar.offsetWidth/$show_right.offsetWidth)*100+5 < 100) {
			$show_bar.style.width = (($show_bar.offsetWidth/$show_right.offsetWidth)*100+5).toString() + "%";
			auto = setTimeout(function() {
					loading(num, goal);
				},50);
		} else {
			get(num, goal);
			if (grade == 20) {//20강 달성
				onoff(-1);
			} else if (num == 1 || num >= 11) {//1회 강폭 or 강폭권
				onoff(0);
			} else {//연속실행
				if (grade >= goal) {
					onoff(0);
				} else {
					generate(num, goal);
				}
			}
		}
	}

		function get(num, goal) {
			//스타일 복구
			$show_bar.style.width = "0px";
			$show_right.style.backgroundColor = "black";
			$show_text.style.color = "#D37CFF";
			
			//성공여부 결정
			var temp = Math.random();
			var result = 0;
			var tempGoal = [,,];//강폭 결과수치([0] : 성공, [1] : 실패, [2] : 확률)
			if (num >= 11) {//강폭권 : 전용 확률 사용
				tempGoal[0] = goal;
				tempGoal[1] = grade;
				tempGoal[2] = scrollList_chance[$enchant_chance.selectedIndex];
				if (temp < tempGoal[2]) {
					result = 1;
				}
			} else {//나머지 : 일반 확률 사용
				tempGoal[0] = grade+1;
				tempGoal[1] = (grade + dropList[method][grade]);
				tempGoal[2] = chanceList[grade];
				if (temp < tempGoal[2]) {
					result = 1;
				}
			}
			
			//강폭 성공 시
			if (result == 1) {
				//아이템 명칭 변경
				$now_text.innerHTML = "";
				$now_text.innerHTML += "+" + tempGoal[0].toString() + " " + selfishList[selected][0];
				//성공/실패 메세지 출력
				$message_img.src = images + "yes.png";
				$message_img.style.visibility = "visible";
				$message_text.innerHTML = "<span class='green'>" + tempGoal[0].toString() + "단계 " + methodList[method] + " 성공</span>\
					( +" + grade.toString() + " &#8658; +" + tempGoal[0].toString() + " )";
			//강폭 실패 시
			} else {
				//아이템 명칭 변경
				$now_text.innerHTML = "";
				$now_text.innerHTML += "+" + tempGoal[1].toString() + " " + selfishList[selected][0];
				//성공/실패 메세지 출력
				$message_img.src = images + "no.png";
				$message_img.style.visibility = "visible";
				$message_text.innerHTML = "<span class='orange'>" + tempGoal[0].toString() + "단계 " + methodList[method] + " 실패</span>\
					( +" + grade.toString() + " &#8658; +" + tempGoal[1].toString() + " )";
			}
			
			//하단에 표시
			row = $record_table.insertRow(-1);
			row.className = "";
			row.className += " to" + tempGoal[0].toString();
			if (num >= 11){
				row.className += " scroll";
			}
			if (result == 1) {
				row.className += " success";
				var cell_0 = row.insertCell(0);
					if (num >= 11) {
						cell_0.innerHTML = "<img id='record_img' src='" + images + "scroll" + method.toString() + ".png' />";//12강폭권 이미지
					} else {
						cell_0.innerHTML = "<img id='record_img' src='" + images + "yes.png' />";//성공/실패 이미지
					}
					cell_0.className = "col_1";
				var cell_1 = row.insertCell(1);
					cell_1.innerHTML = thousand(count);//회차
					cell_1.className = "col_2";
				var cell_2 = row.insertCell(2);
					cell_2.innerHTML = "<span class='purple'>+" + tempGoal[0].toString() + "</span>";//목표
					cell_2.className = "col_3";
				var cell_3 = row.insertCell(3);
					cell_3.innerHTML = "<span class='yellow'>" + Math.round(tempGoal[2]*100).toString() + "%</span>";//확률
					cell_3.className = "col_4";
				var cell_4 = row.insertCell(4);
					cell_4.innerHTML = "<span class='green'>성공</span>";//결과
					cell_4.className = "col_5";
				var cell_5 = row.insertCell(5);
					cell_5.innerHTML = "<span class='purple'>+" + grade.toString() + " &#8658; +" + tempGoal[0].toString() + "</span>";//변화
					cell_5.className = "col_6";
			} else {
				row.className += " failed";
				var cell_0 = row.insertCell(0);
					if (num >= 11) {
						cell_0.innerHTML = "<img id='record_img' src='" + images + "scroll" + method.toString() + ".png' />";//12강폭권 이미지
					} else {
						cell_0.innerHTML = "<img id='record_img' src='" + images + "no.png' />";//성공/실패 이미지
					}
					cell_0.className = "col_1";
				var cell_1 = row.insertCell(1);
					cell_1.innerHTML = thousand(count);//회차
					cell_1.className = "col_2";
				var cell_2 = row.insertCell(2);
					cell_2.innerHTML = "<span class='purple'>+" + tempGoal[0].toString() + "</span>";//목표
					cell_2.className = "col_3";
				var cell_3 = row.insertCell(3);
					cell_3.innerHTML = "<span class='yellow'>" + Math.round(tempGoal[2]*100).toString() + "%</span>";//확률
					cell_3.className = "col_4";
				var cell_4 = row.insertCell(4);
					cell_4.innerHTML = "<span class='orange'>실패</span>";//결과
					cell_4.className = "col_5";
				var cell_5 = row.insertCell(5);
					cell_5.innerHTML = "<span class='purple'>+" + grade.toString() + " &#8658; +" + tempGoal[1].toString() + "</span>";//변화
					cell_5.className = "col_6";
			}
			var cell_6 = row.insertCell(6);
				cell_6.innerHTML = "<span class='epic'>" + $now_text.innerHTML + "</span>";
				cell_6.className = "col_7";
			$record_display.scrollTop = $record_display.scrollHeight;
			
			//비용, 강폭권 이용횟수 계산
			if (num >= 11) {
				gold += scrollList_price[method][$enchant_chance.selectedIndex];
				scrollList_count[method][$enchant_chance.selectedIndex] += 1;
				$enchant_count = scrollList_count[method][$enchant_chance.selectedIndex].toString();
			} else {
				if (method == 0) {//강화
					sera += priceList[method][grade];
				} else {//증폭
					gold += priceList[method][$enchant_chance.selectedIndex];
					mosun += (grade+1);
				}
			};
			$result_gold_num.innerHTML = setWon(gold);
			$result_sera_num.innerHTML = setWon(sera);
			$result_sera_gold.innerHTML = setWon(sera*1000);
			$result_mosun_num.innerHTML = thousand(mosun);
			$result_mosun_gold.innerHTML = setWon(mosun * mosun_gold);
			//$result_protect_gold.innerHTML = setWon(protect * protect_gold); (보호권은 차후에 계산)
			$result_gross.innerHTML = setWon(gold + (sera*1000) + (mosun*mosun_gold) + (protect*protect_gold));
			
			//단계, 최대치, 보호권, 회차 계산
			if (result == 1) {//강폭 성공 시
				grade = tempGoal[0]; //강폭 등급 변경
				if (grade > max) {//최대치 갱신
					max = grade;
					$result_max_num.innerHTML = thousand(max);
					$result_max_count.innerHTML = thousand(count);
				}
			} else {//강폭 실패 시
				if (grade >= 10 && num < 11) {//보호권 갱신 (강폭권 아닐 때)
					protect += 1;
					$result_protect_num.innerHTML = thousand(protect);
					$result_protect_gold.innerHTML = setWon(protect * protect_gold);
				}
				grade = tempGoal[1]; //강폭 등급 변경
			}
			count += 1; //시도횟수
			
			//강폭기에서 이미지 제거
			$center_left_target.src = "";
			$center_left_target.style.visibility = "hidden";
			//강폭 단계 변경
			ready();
		}

function onoff(num) {
	switch (num) {
		case -1://종료
			$open1.value="종료";
			$open2.value="종료";
			$open3.value="종료";
			$enchant.value="종료";
			$open1.disabled="disabled";
			$open2.disabled="disabled";
			$open3.disabled="disabled";
			$enchant.disabled="disabled";
			
			$open1.className = "off";
			$open2.className = "off";
			$open3.className = "off";
			$enchant.className = "off";
			
			$objective.disabled = "";
			$enchant_chance.disabled = "";
			
			$show_text.innerHTML = methodList[method] + " 종료";
			break;
		case 0:
			$open1.value="1회 " + methodList[method];
			$open2.value="연속 " + methodList[method];
			$open3.value="고속 " + methodList[method];
			$enchant.value="사용하기";
			$open1.disabled="";
			$open2.disabled="";
			$open3.disabled="";
			$enchant.disabled="";
			
			$open1.className = "off";
			$open2.className = "off";
			$open3.className = "off";
			$enchant.className = "off";
			
			$objective.disabled = "";
			$enchant_chance.disabled = "";
			
			break;
		case 1:
			$open1.value="취소";
			$open2.disabled="disabled";
			$open3.disabled="disabled";
			$enchant.disabled="disabled";
			
			$open1.className = "on";
			$open2.className = "off";
			$open3.className = "off";
			$enchant.className = "off";
			
			$objective.disabled = "disabled";
			$enchant_chance.disabled = "disabled";
			
			break;
		case 2:
			$open1.disabled="disabled";
			$open2.value="취소";
			$open3.disabled="disabled";
			$enchant.disabled="disabled";
			
			$open1.className = "off";
			$open2.className = "on";
			$open3.className = "off";
			$enchant.className = "off";
			
			$objective.disabled = "disabled";
			$enchant_chance.disabled = "disabled";
			
			break;
		case 3:
			$open1.disabled="disabled";
			$open2.disabled="disabled";
			$open3.value="취소";
			$enchant.disabled="disabled";
			
			$open1.className = "off";
			$open2.className = "off";
			$open3.className = "on";
			$enchant.className = "off";
			
			$objective.disabled = "disabled";
			$enchant_chance.disabled = "disabled";
			
			break;
		case 11:
			$open1.disabled="disabled";
			$open2.disabled="disabled";
			$open3.disabled="disabled";
			$enchant.disabled="disabled";
			$enchant.value="강화 중";
			
			$open1.className = "off";
			$open2.className = "off";
			$open3.className = "off";
			$enchant.className = "off";
			
			$objective.disabled = "disabled";
			$enchant_chance.disabled = "disabled";
			
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
		//단계치 초기화
		grade = 0; //현 재련단계
		count = 1; //시도횟수
		//비용, 최대치 초기화
		gold = 0;//총 소모 골드
		sera = 0;//총 소모 세라
		mosun = 0;//총 소모 모순
		protect = 0;//총 소모 보호권
		max = 0;//최고 강화등급
		//강폭기 초기화
		$center_left_target.src = "";
		$center_left_target.style.visibility = "hidden";
		//메세지 초기화
		$message_img.style.visibility = "hidden";
		$message_text.innerHTML = "";
		//강폭권 사용횟수 초기화
		for(i=0;i<scrollList_count.length;i++) {
			for(j=0;j<scrollList_count[i].length;j++) {
				scrollList_count[i][j] = 0;
			}
		}
		//하단 초기화
		$record_table.innerHTML = "";
		//바닥 초기화
		$result_gold_num.innerHTML = setWon(gold);
		$result_sera_num.innerHTML = setWon(sera);
		$result_sera_gold.innerHTML = setWon(sera*1000);
		$result_mosun_num.innerHTML = thousand(mosun);
		$result_mosun_gold.innerHTML = setWon(mosun * mosun_gold);
		$result_protect_num.innerHTML = setWon(protect * protect_gold);
		$result_protect_gold.innerHTML = setWon(protect * protect_gold);
		$result_gross.innerHTML = setWon(gold + (sera*1000) + (mosun*mosun_gold) + (protect*protect_gold));
		$result_max_num.innerHTML = thousand(max);
		$result_max_count.innerHTML = "0";
		//강폭표기 초기화
		$now_text.innerHTML = "+0 " + selfishList[selected][0]
		ready();
	}
}



//=================================================================================================================
//※ 실행
//=================================================================================================================
window.onload = function() {
	//선로딩
	for (i=0;i<selfishList.length;i++) {
		imageList.push(images + selfishList[i][1] + ".png");
	}
	imageList.push(images + "back0.png");
	imageList.push(images + "back1.png");
	imageList.push(images + "scroll0.png");
	imageList.push(images + "scroll1.png");
	imageList.push(images + "yes.png");
	imageList.push(images + "no.png");
	imageList.push(images + "gold.png");
	imageList.push(images + "sera.png");
	imageList.push(images + "protect0.png");
	imageList.push(images + "protect1.png");
	imageList.push(images + "mosun.png");
	
	loadImages(imageList,function(){
	
		cover.style.display = "none";
		
		//선택, 초기화
		$weapon.onchange = function() {
			$method.disabled = "";
			selecting($weapon.selectedIndex,$method.selectedIndex);
		};
		$method.onchange = function() {
			selecting($weapon.selectedIndex,$method.selectedIndex);
		};
		$clear.onclick = function() {
			if (confirm("완전히 초기화하시겠습니까? 기록, 장비, 소모 재료 등이 모두 초기화됩니다.")) {
				clearTimeout(auto);
				onoff(0);
				running = 0;
				reset(1);
			}
		};
		
		//실행, 상점
		$open1.onclick = function() {
			if ($open1.className == "off") {
				onoff(1);
				
				generate(1, grade+1);
			} else {
				clearTimeout(auto);
				onoff(0);
				reset(0);
			}
		};
		
		$open2.onclick = function() {
			if ($open2.className == "off") {
				onoff(2);
				
				generate(2, parseInt($objective.value));
			} else {
				clearTimeout(auto);
				onoff(0);
				reset(0);
			}
		};
		
		$open3.onclick = function() {
			if ($open3.className == "off") {
				onoff(3);
				
				running = 1;
				generate(3, parseInt($objective.value));
			} else {
				clearTimeout(auto);
				onoff(0);
				running = 0;
				reset(0);
			}
		};
		
		$enchant_chance.onchange = function() {
			$enchant_count.innerHTML = scrollList_count[method][$enchant_chance.selectedIndex];
			$enchant_price.innerHTML = setWon(scrollList_price[method][$enchant_chance.selectedIndex]) + " Gold";
		};
		
		$enchant.onclick = function() {
			if ($enchant.className == "off") {
				onoff(11);
				
				generate(11, 12);
			} else {
				clearTimeout(auto);
				onoff(0);
				running = 0;
				reset(0);
			}
		};
		
		//필터링
		$record_high.onclick = function() {
			var target = $record_high_select.value;
			var sheet = document.getElementById("filter_high");
			try {
				if ($record_high.checked) {
					var text = "";
					for (i=20;i>=target;i--) {
						text += ":not(.to" + i.toString() + ")";
					}
					sheet.innerHTML = "";
					sheet.innerHTML += "#record_display table tr" + text + " {\
						display:none;\
					}";
				} else {
					sheet.innerHTML = "";
				}
			} catch(e) {
				alert("＊경고 : 해당 필터링 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않거나, 기능상 오류입니다.");
				$record_high.checked = false;
			}
		}
			$record_high_select.onchange = function() {
				var target = $record_high_select.value;
				var sheet = document.getElementById("filter_high");
				try {
					if ($record_high.checked) {
						var text = "";
						for (i=20;i>=target;i--) {
							text += ":not(.to" + i.toString() + ")";
						}
						sheet.innerHTML = "";
						sheet.innerHTML += "#record_display table tr" + text + " {\
							display:none;\
						}";
					} else {
						sheet.innerHTML = "";
					}
				} catch(e) {
					alert("＊경고 : 해당 필터링 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않거나, 기능상 오류입니다.");
					$record_high.checked = false;
				}
			}
		
		$record_result.onclick = function() {
			var target = $record_result_select.value;
			var sheet = document.getElementById("filter_result");
			try {
				if ($record_result.checked) {
					sheet.innerHTML = "#record_display table tr:not(." + target + ") {\
						display:none;\
					}";
				} else {
					sheet.innerHTML = "";
				}
			} catch(e) {
				alert("＊경고 : 해당 필터링 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않거나, 기능상 오류입니다.");
				$record_result.checked = false;
			}
		}
			$record_result_select.onchange = function() {
				var target = $record_result_select.value;
				var sheet = document.getElementById("filter_result");
				try {
					if ($record_result.checked) {
						sheet.innerHTML = "#record_display table tr:not(." + target + ") {\
							display:none;\
						}";
					}
				} catch(e) {
					alert("＊경고 : 해당 필터링 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않거나, 기능상 오류입니다.");
					$record_result.checked = false;
				}
			}
		
		$record_scroll.onclick = function() {
			var sheet = document.getElementById("filter_scroll");
			try {
				if ($record_scroll.checked) {
					sheet.innerHTML = "#record_display table tr:not(.scroll) {\
						display:none;\
					}";
				} else {
					sheet.innerHTML = "";
				}
			} catch(e) {
				alert("＊경고 : 해당 필터링 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않거나, 기능상 오류입니다.");
				$record_scroll.checked = false;
			}
		}
		
		//바닥
		$result_mosun_set.onclick = function() {
			var challenge = prompt("모순의 결정체 가격을 입력하세요.\n(현재 가격 : " + thousand(mosun_gold) + " Gold)");
			if (! isNumber(challenge)) {
				alert("※ 경고 : 숫자를 입력하지 않았거나, 취소를 누르셨습니다.\n다시 시도해주세요.");
			} else {
				mosun_gold = challenge;
				$result_mosun_gold.innerHTML = setWon(mosun * mosun_gold);
				$result_gross.innerHTML = setWon(gold + (sera*1000) + (mosun*mosun_gold) + (protect*protect_gold));
			}
		};
		$result_protect_set.onclick = function() {
			var challenge = prompt("장비/증폭 보호권 가격을 입력하세요.\n(현재 가격 : " + thousand(protect_gold) + " Gold)");
			if (! isNumber(challenge)) {
				alert("※ 경고 : 숫자를 입력하지 않았거나, 취소를 누르셨습니다.\n다시 시도해주세요.");
			} else {
				protect_gold = challenge;
				$result_protect_gold.innerHTML = setWon(protect * protect_gold);
				$result_gross.innerHTML = setWon(gold + (sera*1000) + (mosun*mosun_gold) + (protect*protect_gold));
			}
		};
		
		
		$record_clear.onclick = function() {
			if (confirm("강화/증폭 기록을 초기화하시겠습니까? 장비, 소모 재료 등은 보존됩니다.")) {
				$record_table.innerHTML = "";
			}
		};
	});
	
}