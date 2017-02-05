//=================================================================================================================
//※ 변수 지정
//=================================================================================================================
var i, j; //for loop
var auto; //자동실행
var running = 0;//자동실행 "중"

var chanceList = [];//확률 가중치 저장용 배열
var objective = [];//연속 개봉 목표

//회차, 비용
var count = 1;//회차
var boost = 0;//현재 부스터 게이지 기억 (px)
var twice = 0;//2배 지급여부
var month = 0;//이달의 아이템
var key = 0;//총 소모 열쇠
var sera = 0;//총 소모 세라
var gold = 0;//총 소모 골드

//이미지, 사운드
var	images = "./images/snack/";
var imageList = []; //이미지 선로딩용 임시저장소

var track;//사운드 묶음
var audio;//사운드 출력

//=================================================================================================================
//※ DOM 변수에 할당 (앞에 '$'를 붙임)
//=================================================================================================================
var $head = document.getElementById("head");
	var $audioCheck = document.getElementById("audioCheck");
var $gauge = document.getElementById("gauge");
	var $gauge_img = document.getElementById("gauge_img");
	var $gauge_progress = document.getElementById("gauge_progress");
	var $gauge_bar = document.getElementById("gauge_bar");
	var $gauge_text = document.getElementById("gauge_text");
var $control = document.getElementById("control");
	var $control_count = document.getElementById("control_count");
	var $open1 = document.getElementById("open1");
	var $open2 = document.getElementById("open2");
var $objective = document.getElementById("objective");
	var $objective_text = document.getElementById("objective_text");
	var $objective_unit = document.getElementById("objective_unit");
var $show = document.getElementById("show");
	var $show_title = document.getElementById("show_title");
	var $show_body = document.getElementById("show_body");
		//name 부분 : p 태그를 별도로 지정
		var $show_item1_img = document.getElementById("show_item1_img");
		var $show_item1_name = document.getElementById("show_item1_name").getElementsByTagName("p")[0];
		var $show_item2_img = document.getElementById("show_item2_img");
		var $show_item2_name = document.getElementById("show_item2_name").getElementsByTagName("p")[0];
	var $show_booster = document.getElementById("show_booster");
		var $show_booster_body = document.getElementById("show_booster_body");
		var $show_booster_bar = document.getElementById("show_booster_bar");
var $cost = document.getElementById("cost");
	var $cost_key = document.getElementById("cost_key");
	var $cost_sera = document.getElementById("cost_sera");
	var $cost_gold = document.getElementById("cost_gold");
var $record = document.getElementById("record");
	var $record_table = document.getElementById("record_table");
var $record_check = document.getElementById("record_check");
	var $record_check_twice = document.getElementById("record_check_twice");
	var $record_check_month = document.getElementById("record_check_month");
	var $record_clear = document.getElementById("record_clear");

var $clear = document.getElementById("clear");
var $inventory_filter = document.getElementById("inventory_filter");
var $inventory = document.getElementById("inventory");
	var $inventory_table = document.getElementById("inventory_table");
var $inventory_check = document.getElementById("inventory_check");
	var $inventory_check_all = document.getElementById("inventory_check_all");

var $filter_inventory_check_all = document.getElementById("filter_inventory_check_all");

var $cover = document.getElementById("cover");

//=================================================================================================================
//※ 자료
//=================================================================================================================


		//=================================================================================================================
		//※ 함수 - 선로딩, 내부작업용
		//=================================================================================================================
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

		//이미지 불러오기 (출처 : http://stackoverflow.com/questions/8264528/image-preloader-javascript-that-supports-eventNames/8265310#8265310)
		function loadImages(arr,callBack){

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

		//천단위 콤마 표시 (출처 : http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript)
		function thousand(num) {
			if (isNaN(num)) {
				return "";
			} else {
				var temp = parseInt(num.toString().replace(/,/g,''));
				return temp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
		}

		//콤마 제거 후 숫자로 변환
		function toNumber(string) {
			return parseInt(string.replace(/,/g,''));
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
//인벤토리 아이템리스트 생성
function setInventory() {
	var tempArr = [];
	for (i=0;i<itemList.length;i++) {
		if (tempArr.indexOf(itemList[i][1]) == -1) {
			tempArr.push(itemList[i][1]);

			var row = $inventory_table.insertRow(-1);
				row.id = "row_" + i.toString();
			var cell_1 = row.insertCell(0);
				cell_1.innerHTML = "<img src='" + images + itemList[i][4] + ".png'>";//아이템 이미지
				cell_1.className = "col_1";
			var cell_2 = row.insertCell(1);
				cell_2.innerHTML = "<span class='" + itemList[i][5] + "'>" + itemList[i][1] + "</span>";//아이템 명칭
				cell_2.className = "col_2";
			var cell_3 = row.insertCell(2);
				cell_3.innerHTML = "0";//아이템 수량 -> 비워두기
				cell_3.className = "col_3";
		}
	}
}

//로딩
function loading(num, speed) {
	//게이지 증가
	if (($gauge_bar.offsetWidth/$gauge_progress.offsetWidth)*100+speed < 100) {
		$gauge_bar.style.width = (($gauge_bar.offsetWidth/$gauge_progress.offsetWidth)*100+speed).toString() + "%";
		auto = setTimeout(function() {
				loading(num, speed);
			},1000/60);
	} else {
		//아이템 드롭
		get(num);
		if (num == 1) {
			onoff(0);
		} else {
			if (objective[0] == "month") {//종료조건 - 이달의 아이템
				if (month == 1) {
					onoff(0);

					var row = $record_table.insertRow(-1)
					row.className = "not_twice not_month";
					var cell = row.insertCell(0);
					cell.innerHTML += "<span class='system'>=============<연속개봉 종료>=============<br/>\
					※ 종료 조건 : 이달의 아이템 획득\
					<br/>========================================</span>";
						//스크롤 이동
						$record.scrollTop = $record.scrollHeight;

					return;
				}
			} else if (objective[0] == "key") {//종료조건 - 열쇠
				objective[2] += 3;
				if (objective[2] + 3 > objective[1]) {
					onoff(0);

					var row = $record_table.insertRow(-1)
					row.className = "not_twice not_month";
					var cell = row.insertCell(0);
					cell.innerHTML += "<span class='system'>=============<연속개봉 종료>=============<br/>\
					※ 종료 조건 : 열쇠 수량 제한\
					<br/>(총 " + thousand(objective[1]) + "개의 열쇠 &#8658; " + Math.floor(objective[1] / 3).toString() + "회 실시)\
					<br/>========================================</span>";
						//스크롤 이동
						$record.scrollTop = $record.scrollHeight;


					return;
				}
			} else if (objective[0] == "sera") {//종료조건 - 세라
				objective[2] += 750;
				if (objective[2] + 750 > objective[1]) {
					onoff(0);

					var row = $record_table.insertRow(-1)
					row.className = "not_twice not_month";
					var cell = row.insertCell(0);
					cell.innerHTML += "<span class='system'>=============<연속개봉 종료>=============<br/>\
					※ 종료 조건 : 비용 제한 (세라)\
					<br/>(총 " + thousand(objective[1]) + " 세라 &#8658; " + Math.floor(objective[1] / 750).toString() + "회 실시)\
					<br/>========================================</span>";
						//스크롤 이동
						$record.scrollTop = $record.scrollHeight;


					return;
				}
			}
			//종료조건 없음 or 미달성 → 계속 실행
				//게이지 초기화
				$gauge_bar.style.width = "0px";
				//순서 표기
				$control_count.innerHTML = thousand(count);
				//재실행
				auto = setTimeout(function() {
						loading(2, speed);
					},100);
		}
	}
}
//드롭
function get(num) {
	//상품 결정
	var prize = [];
	prize[0] = itemList[rand(chanceList)];//1번째 상품
	prize[1] = itemList[rand(chanceList)];//2번째 상품
	//배경 변경, 사운드 출력
	if (prize[0][5] == "month" || prize[1][5] == "month") {
		//배경 코드
		month = 1;//(다음 아이템 뽑기까진 month 수치가 유지됨)
		//사운드
		try{
			if ($audioCheck.checked) {
				audio = track["month"];
				audio.pause();
				audio.currentTime = 0;
				audio.play();
			}
		}catch(e){}
	} else {
		//배경
		month = 0;
		//사운드
		try{
			if ($audioCheck.checked) {
				audio = track["normal"];
				audio.pause();
				audio.currentTime = 0;
				audio.play();
			}
		}catch(e){}
	}
	var back = "back" + month.toString() + twice.toString();
	switch (back) {
		case "back00":
			$show_body.style.background = "url('./images/snack/back00.png')";

			break;
		case "back01":
			$show_body.style.background = "url('./images/snack/back01.png')";

			break;
		case "back10":
			$show_body.style.background = "url('./images/snack/back10.png')";

			break;
		case "back11":
			$show_body.style.background = "url('./images/snack/back11.png')";

			break;
	}

	//상품 출력
	$show_item1_img.src = images + prize[0][4] + ".png";
	$show_item1_name.innerHTML = "<span class='" + prize[0][5] + "'>" + prize[0][0] + "</span>";
	$show_item2_img.src = images + prize[1][4] + ".png";
	$show_item2_name.innerHTML = "<span class='" + prize[1][5] + "'>" + prize[1][0] + "</span>";

	//상품 업데이트
	update(prize,twice);

	//비용 증가
	key += 3;
	sera += 750;
	gold += 750000;

	//증가된 비용 표기
	$cost_key.innerHTML = thousand(key);
	$cost_sera.innerHTML = setWon(sera);
	$cost_gold.innerHTML = setWon(gold);

	//부스터 증가 및 표기
	if (twice == 1) {//2배 상황
		twice = 0;
		$show_booster_bar.style.background = "url('./images/snack/bar1.gif') repeat-x"
		$show_booster_bar.style.width = boost.toString() + "px";
		$show_booster_body.src = "./images/snack/booster1.png";
	} else {//일반 상황
		boost += 36;
		$show_booster_bar.style.width = boost.toString() + "px";
		if (boost >= 200) {//2배 도달
			boost -= 200;
			twice = 1;
			$show_booster_bar.style.width = "0px";
			$show_booster_body.src = "./images/snack/booster2.gif";
		} else if (boost >= 160) {//80% 이상
			$show_booster_bar.style.background = "url('./images/snack/bar2.gif') repeat-x"
		}
	}

	//회차 증가
	count += 1;
}

//상품 업데이트
function update(prize, doubled) {
	//2배 입력 준비
	var text = "";
	if (doubled == 1) {
		text = "<span class='orange'> (보상 x2)</span>";
	}
	//업데이트 1 : 하단
	var row = $record_table.insertRow(-1)
	row.className = "";
	if (doubled == 0) {//체크박스 - x2
		row.className += " " + "not_twice";
	}
	var temp = 0;
	for (var i=0;i<prize.length;i++) {
		if (prize[i][5] == "month") {//체크박스 - 이달의 아이템
			temp += 1;
		}
	}
	if (temp == 0) {//체크박스 - 이달의 아이템
		row.className += " " + "not_month";
	}

	var cell = row.insertCell(0);
	cell.innerHTML += thousand(count) + "회차 " + text + "<br/>\
		　┗ <img src='" + images + prize[0][4] + ".png'> <span class='" + prize[0][5] + "'>" + prize[0][0] + "</span><br/>\
		　┗ <img src='" + images + prize[1][4] + ".png'> <span class='" + prize[1][5] + "'>" + prize[1][0] + "</span>";
		//스크롤 이동
		$record.scrollTop = $record.scrollHeight;
	//업데이트 2 : 인벤토리
	for (i=0;i<prize.length;i++) {

		var trList = $inventory_table.getElementsByTagName("tr");
		for (j=0;j<trList.length;j++) {
			var tdList = trList[j].getElementsByTagName("td");
			if ((tdList[1].innerText || tdList[1].textContent) == prize[i][1]) {
				//가시화
				trList[j].className = "show";
				//수량 증가
				tdList[2].innerHTML = thousand(toNumber(tdList[2].innerHTML) + (prize[i][2] * (doubled + 1)));
			}
		};

	}
}

//버튼 설정
function onoff(num) {
	switch (num) {
		case 0:
			$open1.value = "1회개봉";
			$open2.value = "연속개봉";
			$open1.disabled = "";
			$open2.disabled = "";
			$open1.className = "off";
			$open2.className = "off";

			$objective.disabled = "";
			$objective_text.disabled = "";

			//순서 표기
			$control_count.innerHTML = thousand(count-1);
			//게이지 준비
				//아이콘 변경
				$gauge_img.src = "./images/snack/lock1.png";
				//게이지 시각화
				$gauge_bar.style.width = "0px";
				$gauge_bar.style.display = "block";
				//게이지 문구 색상, 글씨 변경
				$gauge_text.style.color = "#D37CFF";
				$gauge_text.innerHTML = "주머니 개봉 대기중 " +
					"<span class='white'>" +
						"(비용 : <img src='./images/snack/key.png'> × 3 = 750세라)" +
					"</span>";

			break;
		case 1:
			$open1.value = "취소";
			$open2.disabled = "disabled";
			$open1.className = "on";
			$open2.className = "off";

			$objective.disabled = "disabled";
			$objective_text.disabled = "disabled";

			//순서 표기
			$control_count.innerHTML = thousand(count);
			//게이지 준비
				//아이콘 변경
				$gauge_img.src = "./images/snack/lock2.gif";
				//게이지 시각화
				$gauge_bar.style.width = "0px";
				$gauge_bar.style.display = "block";
				//게이지 문구 색상, 글씨 변경
				$gauge_text.style.color = "black";
				$gauge_text.innerHTML = "스낵 주머니 개봉 중";

			break;
		case 2:
			$open2.value = "취소";
			$open1.disabled = "disabled";
			$open1.className = "off";
			$open2.className = "on";

			$objective.disabled = "disabled";
			$objective_text.disabled = "disabled";

			//순서 표기
			$control_count.innerHTML = thousand(count);
			//게이지 준비
				//아이콘 변경
				$gauge_img.src = "./images/snack/lock2.gif";
				//게이지 시각화
				$gauge_bar.style.width = "0px";
				$gauge_bar.style.display = "block";
				//게이지 문구 색상, 글씨 변경
				$gauge_text.style.color = "black";
				$gauge_text.innerHTML = "스낵 주머니 개봉 중";

			break;
	}
}
//=================================================================================================================
//※ 실행
//=================================================================================================================
document.addEventListener("DOMContentLoaded", function(e) {
	//사운드 선로딩
	try{
		track = {
			normal:new Audio('./sound/snack_normal.mp3'),
			month:new Audio('./sound/snack_month.mp3')
		}
	}catch(e){}

	//이미지 선로딩
	for (i=0;i<itemList.length;i++) {
		imageList.push(images + itemList[i][4] + ".png");
	}
	imageList.push(images + "key.png");//key
	imageList.push(images + "lock1.png");//lock1
	imageList.push(images + "lock2.gif");//lock2
	imageList.push(images + "top.png");//top
	imageList.push(images + "back00.png");//back00
	imageList.push(images + "back01.png");//back01
	imageList.push(images + "back10.png");//back10
	imageList.push(images + "back11.png");//back11
	imageList.push(images + "initial.png");//initial
	imageList.push(images + "booster1.png");//booster1
	imageList.push(images + "booster2.gif");//booster2
	imageList.push(images + "bar1.gif");//bar1
	imageList.push(images + "bar2.gif");//bar2
	imageList.push(images + "pocket_back.png");//pocket_back
	imageList.push(images + "check_back.png");//check_back
	imageList.push(images + "inventory.png");//inventory

	//선로딩 실시
	loadImages(imageList,function(){

		//표지 닫기
		$cover.style.display = "none";

		//인벤토리 생성
		setInventory();

		//확률 가중치 저장
		for (i=0;i<itemList.length;i++) {
			chanceList.push(itemList[i][3]);
		};

		//버튼 클릭
		$open1.onclick = function() {
			if ($open1.className == "off") {
				onoff(1);
				loading(1,2);
			} else {
				clearTimeout(auto);
				onoff(0);
			}
		}
		$open2.onclick = function() {
			if ($open2.className == "off") {
				//목표 입력
				objective = [];//목표 초기화
				objective.push($objective.value);//입력 1. 목표 명칭
				switch (objective[0]) {
					case "month":
						//추가 행위 없음

						break;
					case "key":
						if ($objective_text.value == "") {
							alert("＊경고 : 열쇠 수량을 입력하세요.");
							return;
						} else if (! isNumber(toNumber($objective_text.value))) {
							alert("＊경고 : 열쇠 수량은 숫자를 입력해야 합니다.");
							return;
						} else if (parseInt(toNumber($objective_text.value)) < 3) {
							alert("＊경고 : 열쇠 수량은 *3개*보다 많아야 합니다.");
							return;
						}
						objective.push(toNumber($objective_text.value));//입력 2. 열쇠 수량
						objective.push(0);//입력 3. 현재 소모한 열쇠

						break;
					case "sera":
						if ($objective_text.value == "") {
							alert("＊경고 : 세라 비용를 입력하세요.");
							return;
						} else if (! isNumber(toNumber($objective_text.value))) {
							alert("＊경고 : 세라 비용은 숫자를 입력해야 합니다.");
							return;
						} else if (parseInt(toNumber($objective_text.value)) < 750) {
							alert("＊경고 : 세라 비용은 *750원*보다 커야 합니다.");
							return;
						}
						objective.push(toNumber($objective_text.value));//입력 2. 세라 비용
						objective.push(0);//입력 3. 현재 소모한 비용

						break;
				}
				onoff(2);

				loading(2,5);
			} else {
				clearTimeout(auto);
				onoff(0);
			}
		}
		$objective.onchange = function() {
			//배경색 조절
			if ($objective.value == "") {
				$objective.style.backgroundColor = "white";
				$objective_text.style.display = "none";
				$objective_unit.style.display = "none";
			} else {
				$objective.style.backgroundColor = "#F4FA58";
				//관련 창 활성화
				if ($objective.value == "key") {//열쇠 수량 제한
					$objective_text.style.display = "inline";
					$objective_unit.style.display = "inline";
					$objective_unit.innerHTML = "개";
				} else if ($objective.value == "sera") {//비용 제한
					$objective_text.style.display = "inline";
					$objective_unit.style.display = "inline";
					$objective_unit.innerHTML = "원";
				} else {//이달의 아이템
					$objective_text.style.display = "none";
					$objective_unit.style.display = "none";
				}
			}
		}
		$objective_text.onfocus = function() {
			$objective_text.value = '';
		}
		$objective_text.onkeypress = function() {
			if (event.keyCode != 13) {
				$objective_text.value = $objective_text.value.toString().replace(/,/g,'');
			}
		}
		$objective_text.onkeyup = function() {
			$objective_text.value = thousand($objective_text.value);
		}

		$clear.onclick = function() {
			if (! confirm("초기화하시겠습니까? 모든 기록과 획득 정보가 사라집니다.")) {
				return;
			}
			//실행 중지
			clearTimeout(auto);
			onoff(0);

			//변수 초기화
			count = 1;
			boost = 0;
			twice = 0;
			month = 0;
			key = 0;
			sera = 0;
			gold = 0;

			//출력 초기화
			$control_count.innerHTML = "0";

			$show_item1_img.src = images + "initial.png";
			$show_item1_name.innerHTML = "대기중";
			$show_item2_img.src = images + "initial.png";
			$show_item2_name.innerHTML = "대기중";

			$show_booster_body.src = images + "booster1.png";
			$show_booster_bar.style.width = "0px";
			$show_booster_bar.style.background = "url('" + images + "bar1.gif') repeat-x";

			$cost_key.innerHTML = "0";
			$cost_sera.innerHTML = "0";
			$cost_gold.innerHTML = "0";

			$record_table.innerHTML = "";
			$inventory_table.innerHTML = "";
			setInventory();
		}

		$record_clear.onclick = function() {
			if (confirm("획득 기록을 지우시겠습니까? 회차, 비용 및 인벤토리 정보는 보존됩니다.")) {
				$record_table.innerHTML = "";
			}
		}

		//필터링

		//체크박스
		$record_check_twice.onclick = function() {
			var sheet = document.getElementById("style_record_check_twice");
			try {
				if ($record_check_twice.checked) {
					sheet.innerHTML = "#record_table tr.not_twice {\
						display:none;\
					}";
				} else {
					sheet.innerHTML = "";
				}
			} catch(e) {
				alert("＊경고 : 체크박스 설정을 변경할 수 없습니다.\n(오류가 있거나, 브라우저가 특정 기능을 지원하지 않습니다.)");
				$record_check_twice.checked = false;
			}
		}
		$record_check_month.onclick = function() {
			var sheet = document.getElementById("style_record_check_month");
			try {
				if ($record_check_month.checked) {
					sheet.innerHTML = "#record_table tr.not_month {\
						display:none;\
					}";
				} else {
					sheet.innerHTML = "";
				}
			} catch(e) {
				alert("＊경고 : 체크박스 설정을 변경할 수 없습니다.\n(오류가 있거나, 브라우저가 특정 기능을 지원하지 않습니다.)");
				$record_check_month.checked = false;
			}
		}
		$inventory_check_all.onclick = function() {
			var sheet = document.getElementById("style_inventory_check_all");
			try {
				if ($inventory_check_all.checked) {
					sheet.innerHTML = "#inventory_display table tr {\
						display:block;\
					}";
				} else {
					sheet.innerHTML = "";
				}
			} catch(e) {
				alert("＊경고 : 체크박스 설정을 변경할 수 없습니다.\n(오류가 있거나, 브라우저가 특정 기능을 지원하지 않습니다.)");
				$inventory_check_all.checked = false;
			}
		}

	});

});
