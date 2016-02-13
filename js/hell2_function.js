			//=================================================================================================================
			//※ 함수 - 선로딩, 내부작업용
			//=================================================================================================================
					// 이미지 선로딩 (출처 : http://stackoverflow.com/questions/8264528/image-preloader-javascript-that-supports-eventNames/8265310#8265310)
					function loadImages(arr,callBack){ 
						var imagesArray = [];
						var img;
						var remaining = arr.length;
						for (var i = 0; i < arr.length; i++) {
							img = new Image();
							img.onload = function() {
								//외부 처리 
								document.getElementById("cover_notice").innerHTML = "\
								이미지 로딩 중 ("+Math.round((((arr.length - remaining + 1)/arr.length)*100),0).toString()+"%)";
								//내부 처리
								--remaining;
								if (remaining <= 0) {
									callBack();
								};
							};
							img.onerror = function() {
								//외부 처리 
								document.getElementById("cover_notice").innerHTML = "\
								이미지 로딩 중 ("+Math.round((((arr.length - remaining + 1)/arr.length)*100),0).toString()+"%)";
								--remaining;
								if (remaining <= 0) {
									callBack();
								};
							};
							img.src = arr[i];
							document.getElementById("imagePreloader").innerHTML += "<img src='" + arr[i] + "' />";
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
					};
					
					//배열 최대치&최소치 함수
					Array.prototype.max = function() {
					  return Math.max.apply(null, this);
					};

					Array.prototype.min = function() {
					  return Math.min.apply(null, this);
					};

					//특정 클래스 추가/삭제
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
					
					//특정 select 비우기
					function clearSelect(selectbox)	{
						for (var i = selectbox.options.length-1;i>=0;i--) {
							selectbox.remove(i);
						}
					}
					
					//천단위 콤마 표시 (출처 : http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript)
					function thousand(num) {
						return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
					
					//코스모소울 비용 계산
					function soulCount(level) {
						for (var i=0;i<soulCostList.length;i++) {
							if (soulCostList[i][0] == level) {
								return soulCostList[i][1];
							}
						}
					}
					
					//레벨별 해체 결과물 계산
					function disCount(type,level) {
						switch (type) {
							case "초대장":
								for (var i=0;i<cutList[2].length;i++) {
									if (cutList[2][i][0] == level) {
										return cutList[2][i][1];
									}
								}
								
								break;
							case "코스모소울":
								for (var i=0;i<cutList[3].length;i++) {
									if (cutList[3][i][0] == level) {
										return cutList[3][i][1];
									}
								}
								
								break;
						}
					}
//=================================================================================================================
//※ 함수 - 창 생성용
//=================================================================================================================
//인벤토리 창 생성
function generateInventory() {
	var tempArr = [];
	for (i=0;i<itemList.length;i++) {
		if (itemList[i][4] != "") {
			var row = $inventory_table.insertRow(-1);
				row.id = "inventory_row_" + i.toString();
				row.className = "equip";//'에픽 장비'
				row.className += " " + "not_show";//출력하지 않음
				row.className += " " + itemList[i][0];//1차 분류
				row.className += " " + itemList[i][1];//2차 분류
				row.className += " " + itemList[i][2];//3차 분류
				row.className += " " + "lv" + itemList[i][3].toString();//레벨
			var cell_1 = row.insertCell(0);
				cell_1.innerHTML = itemList[i][4];//아이템 명칭
				cell_1.className = "col_1";
			var cell_2 = row.insertCell(1);
				if (itemList[i][0] == "방어구") {
					cell_2.innerHTML = itemList[i][1];//분류(무기 : 3차 분류)
				} else {
					cell_2.innerHTML = itemList[i][2];//분류(나머지 : 2차 분류)
				}
				cell_2.className = "col_2";
			var cell_3 = row.insertCell(2);
				cell_3.innerHTML = itemList[i][3].toString();//레벨
				cell_3.className = "col_3";
			var cell_5 = row.insertCell(3);
				cell_5.innerHTML = "없음";//해체 버튼 (초기상태 : '없음')
				cell_5.className = "col_4";
			var cell_4 = row.insertCell(4);
				cell_4.innerHTML = itemList[i][9].toString();//보유 수량
				cell_4.className = "col_5";
			var cell_6 = row.insertCell(5);
				cell_6.innerHTML = "";//획득 시기 : 차후에 정보를 받음
				cell_6.className = "col_6";
		}
	}
}

//세트 창 생성
function generateSet() {
	tempArr = [];
	num = 0;//세트 아이템 테이블 순번 (td의 아이디에 붙여넣음, 하나 작성할 때마다 1씩 증가)
	for (i=0;i<itemList.length;i++) {
		if (itemList[i][4] != "") {
			//3-2-1. 세트 아이템일 경우
			if (itemList[i][5] != "") {
				//3-2-2. '세트'가 등록되지 않았을 경우
				if (tempArr.indexOf(itemList[i][5]) == -1) {//IF : "세트"가 등록되어있지 않다면
					tempArr.push(itemList[i][5]);
					//3-2-3. '세트' 등록
					var row = $set_table.insertRow(-1);
						row.id = "set_row_" + num.toString();
						row.className = "equip";//'에픽 장비'
						row.className += " " + "hap";//장비 '세트'
						row.className += " " + "not_show";//출력하지 않음
						//3-2-3-1. 해당 세트를 구성하는 '모든 파츠'를 클래스로 등록
						temp = 0;//현 파츠 전체 개수
						for (j=0;j<itemList.length;j++) {
							if (itemList[j][5] == itemList[i][5]) {
								if (row.className != itemList[j][0]) {//2차 분류
									row.className += " " + itemList[j][0];
								}
								if (row.className != itemList[j][1]) {//2차 분류
									row.className += " " + itemList[j][1];
								}
								if (row.className != itemList[j][2]) {//3차 분류
									row.className += " " + itemList[j][2];
								}
								temp += 1;
							}
						}
						row.className += " " + "lv" + itemList[i][3].toString();//레벨
					var cell_1 = row.insertCell(0);
						cell_1.innerHTML = itemList[i][5];//세트 명칭
						cell_1.className = "col_1";
					var cell_2 = row.insertCell(1);
						cell_2.innerHTML = itemList[i][1];//분류 : 해당 파츠들의 2차 분류를 따름
						cell_2.className = "col_2";
					var cell_3 = row.insertCell(2);
						cell_3.innerHTML = itemList[i][3].toString();//레벨
						cell_3.className = "col_3";
					var cell_4 = row.insertCell(3);
						cell_4.innerHTML = "";//해체 : '세트'는 불가능
						cell_4.className = "col_4";
					var cell_5 = row.insertCell(4);
						//앞에서 계산한 temp를 "세트 전체 개수"로 적용
						cell_5.innerHTML = "0/" + temp.toString();//보유 수량
						cell_5.className = "col_5";
					var cell_6 = row.insertCell(5);
						cell_6.innerHTML = "";//획득 시기 : 차후에 정보를 받음
						cell_6.className = "col_6";
				
					num += 1;
				}
				//3-3. 세트 파츠 아이템 등록
				var row = $set_table.insertRow(-1);
					row.id = "set_row_" + num.toString();
					row.className = "equip";//'에픽 장비'
					row.className += " " + "not_show";//출력하지 않음
					row.className += " " + itemList[i][0];//1차 분류
					row.className += " " + itemList[i][1];//2차 분류
					row.className += " " + itemList[i][2];//3차 분류
					row.className += " " + "lv" + itemList[i][3].toString();//레벨
				var cell_1 = row.insertCell(0);
					cell_1.innerHTML = "┗ " + itemList[i][4];//아이템 명칭
					cell_1.className = "col_1";
				var cell_2 = row.insertCell(1);
					if (itemList[i][0] == "방어구") {
						cell_2.innerHTML = itemList[i][1];//분류(무기 : 3차 분류)
					} else {
						cell_2.innerHTML = itemList[i][2];//분류(나머지 : 2차 분류)
					}
					cell_2.className = "col_2";
				var cell_3 = row.insertCell(2);
					cell_3.innerHTML = itemList[i][3].toString();//레벨
					cell_3.className = "col_3";
				var cell_5 = row.insertCell(3);
					cell_5.innerHTML = "없음";//해체 버튼 (초기상태 : '없음')
					cell_5.className = "col_4";
				var cell_4 = row.insertCell(4);
					cell_4.innerHTML = itemList[i][9].toString();//보유 수량
					cell_4.className = "col_5";
				var cell_6 = row.insertCell(5);
					cell_6.innerHTML = "";//획득 시기 : 차후에 정보를 받음
					cell_6.className = "col_6";
					
				num += 1;
			}
		}
	}
}

//에픽도감 창 생성
function generateCraft() {
	var tempArr = [];
	for (i=0;i<itemList.length;i++) {
		if (itemList[i][4] != "" & itemList[i][6] == "" ) {//고유 에픽은 제외
			var row = $craft_table.insertRow(-1);
				row.id = "craft_row_" + i.toString();
				row.className = "equip";//'에픽 장비'
				row.className += " " + "not_show";//출력하지 않음
				row.className += " " + itemList[i][0];//1차 분류
				row.className += " " + itemList[i][1];//2차 분류
				row.className += " " + itemList[i][2];//3차 분류
				row.className += " " + "lv" + itemList[i][3].toString();//레벨
			var cell_1 = row.insertCell(0);
				cell_1.innerHTML = itemList[i][4];//아이템 명칭
				cell_1.className = "col_1";
			var cell_2 = row.insertCell(1);
				if (itemList[i][0] == "방어구") {
					cell_2.innerHTML = itemList[i][1];//분류(무기 : 3차 분류)
				} else {
					cell_2.innerHTML = itemList[i][2];//분류(나머지 : 2차 분류)
				}
				cell_2.className = "col_2";
			var cell_3 = row.insertCell(2);//레벨
				cell_3.innerHTML = itemList[i][3].toString();
				cell_3.className = "col_3";
			var cell_4 = row.insertCell(3);//보유량
				cell_4.innerHTML = "0";
				cell_4.className = "col_4";
			var cell_5 = row.insertCell(4);//조각수
				cell_5.innerHTML = "0";
				cell_5.className = "col_5";
			var cell_6 = row.insertCell(5);//제작
				cell_6.innerHTML = "불가";//제작 버튼 (초기상태 : '불가')
				cell_6.className = "col_6";
			var cell_7 = row.insertCell(6);//비용
				cell_7.innerHTML = thousand(soulCount(itemList[i][3])) + "개";//보유 수량
				cell_7.className = "col_7";
		}
	}
	//필요 조각수 표시
	$craft_check_max.innerHTML = thousand(maxJogak);
}
//=================================================================================================================
//※ 함수 - 선택 & 실행
//=================================================================================================================
//날짜 계산
function setDate() {
	var arr = dateSettingList;
	//a. 날짜 계산
	if ($round_count.innerHTML == "0") {
		var tempDate = 0;
	} else {
		var tempDate = Math.ceil(count / (Math.ceil(arr[0] / arr[1]) + Math.ceil(arr[2] / arr[1]) + Math.ceil(arr[3] / arr[1]) + Math.ceil(arr[4] / arr[1]) + Math.ceil(arr[5] / arr[1]) + Math.ceil(arr[6] / arr[1])));
	}
	//b. 날짜 출력
	$date_count.innerHTML = thousand(tempDate);
	//c. 날짜 "요약" 출력
	//c-1. 1년 이상
	if (tempDate >= 365) {
		var tempDate2 = Math.floor(tempDate / 365).toString() + "년 " + Math.min(11,Math.floor((tempDate % 365) / 30)).toString() + "개월";
	} else {
		var tempDate2 = Math.min(11,Math.floor(tempDate / 30)).toString() + "개월";
	}
	//c-2. 1년 미만 (단, 12 미만 유지)
	
	$date_summary_num.innerHTML = "약 " + tempDate2;
}

//던전 선택
function dungeon_select() {
	//1. 변수 조절 (오류 대비 - 공백이면 숫자 "0" 반환)
	if ($dungeon.value == "") {
		input[0] = 0;
	} else {
		input[0] = parseInt($dungeon.value);
	}
	//2. 배경 변경
	$frame_top.style.background = "url('./images/epic/background_" + input[0].toString() + ".jpg')"
	//3. 아이템 정리
	for (var i=0;i<maxQuantity;i++) {
		document.getElementById("item" + i.toString()).style.top = startList[input[0]][0].toString() + "px";
		document.getElementById("item" + i.toString()).style.left = startList[input[0]][1].toString() + "px";
		
		document.getElementById("item_name" + i.toString()).className = "item_name";
		document.getElementById("item_name" + i.toString()).style.visibility = "hidden";
			document.getElementById("description" + i.toString()).style.left = "0px";
		document.getElementById("item_img" + i.toString()).style.visibility = "hidden";
		
		document.getElementById("effect_appear" + i.toString()).style.visibility = "hidden";
		document.getElementById("effect_land" + i.toString()).style.visibility = "hidden";
		document.getElementById("effect_wait" + i.toString()).style.visibility = "hidden";
		
		//애니메이션 정지
		clearTimeout(autoLooting[i-1]);
		clearTimeout(autoEffect["appear"][i-1]);
		clearTimeout(autoEffect["land"][i-1]);
		clearTimeout(autoEffect["wait"][i-1]);
		document.getElementById("item_img"+ i.toString()).className = "item_img";
	}
	//4. 에픽 조각 드랍 가능 zone 설정 (에픽 조각이 일반 장비 아이콘을 덮지 않도록)
	zoneList = [];
	for (var i=jogakRange[input[0]][0][0];i<=jogakRange[input[0]][0][1];i++) {
		for (var j=jogakRange[input[0]][1][0];j<=jogakRange[input[0]][1][1];j++) {
			zoneList.push([i,j]);
		}
	}
	
	//5. 일반 장비 드랍 가능 zone 설정
	for (var i=0;i<coopList[input[0]].length;i++) {
		zoneList.push(coopList[input[0]][i]);
	}
	
	//6. 기여자 이름 변경
	$person_helper.innerHTML = helpList[input[0]];
};

//(실행 전) 에픽 드랍 리스트 구축
function getEpicList() {
	//1. 현재 지역 고유 에픽 리스트
	currentList_goyu = [];
	for (i=0;i<goyuList.length;i++) {
		if (goyuList[i][6] == areaList[input[0]]) {//지역명 일치 시
			currentList_goyu.push(goyuList[i]);
		}
	}
	//2. (고유 에픽을 제외한) '레벨대'별 에픽 리스트
	currentList = [];
	for (i=0;i<itemList.length;i++) {
		if (levelList[input[0]].indexOf(itemList[i][3]) != -1
		&& itemList[i][4] != ""
		&& itemList[i][6] == "") {//드랍 레벨이 맞으면 & 명칭이 공백이 아니면 &고유 에픽이 아니면
			currentList.push(itemList[i]);
		}
	}
}

//실행
function simulate(num){
	//=================================
	//* 입장료 지불
	//=================================
	//0-1. 소모한 초대장 수 증가
	cost[0] += costList[input[0]];//총 소모
	cost[1] += costList[input[0]];//실질 소모
	//0-2. 소모한 초대장 수 반영
	$cost_invitation.innerHTML = thousand(cost[0]);
	$cost_real.innerHTML = thousand(cost[1]);
	$cost_gold.innerHTML = setWon(cost[0]*gold);
	$cost_gold_real.innerHTML = setWon(cost[1]*gold);
	
	//=================================
	//* 변수 초기화
	//=================================
	//아이템 착지 개수 초기화
	dropCount = 0;
	
	//해당 회차에서 획득한 아이템 리스트 초기화
	thisTime = [];
	
	//=================================
	//* 아이템들 재정렬 (탐색 시 2번째 실행부터는 일부 기능을 수행하지 않음)
	//=================================
	for (var i=0;i<maxQuantity;i++) {
		//아이템 루팅 시작 위치로 이동 (탐색 시 2번째 실행부터 : 무시)
		if (num != 3) {
			document.getElementById("item" + i.toString()).style.top = startList[input[0]][0].toString() + "px";
			document.getElementById("item" + i.toString()).style.left = startList[input[0]][1].toString() + "px";
		}
		
		//아이템 이름 숨기기&이동, 이미지 숨기기
		document.getElementById("description" + i.toString()).className = "description";
		document.getElementById("item_name" + i.toString()).className = "item_name";
		document.getElementById("item_name" + i.toString()).style.visibility = "hidden";
			document.getElementById("description" + i.toString()).style.left = "0px";
		document.getElementById("item_img" + i.toString()).style.visibility = "hidden";
		
		//에픽 이펙트 숨기기
		document.getElementById("effect_appear" + i.toString()).style.visibility = "hidden";
		document.getElementById("effect_land" + i.toString()).style.visibility = "hidden";
		document.getElementById("effect_wait" + i.toString()).style.visibility = "hidden";
		
		//애니메이션 정지 (탐색 시 2번째 실행부터 : 무시)
		if (num != 3) {
			clearTimeout(autoLooting[i-1]);
			clearTimeout(autoEffect["appear"][i-1]);
			clearTimeout(autoEffect["land"][i-1]);
			clearTimeout(autoEffect["wait"][i-1]);
			document.getElementById("item_img"+ i.toString()).className = "item_img";
		}
	}
	//=================================
	//* 회차 표기
	//=================================
	$round_count.innerHTML = thousand(count);
		//회차에 따른 날짜 표시
		setDate();
	
	//=================================
	//* 현재 회차 진행
	//=================================
	//1. 던전 난이도 입력
	input[1] = $difficulty.value;
	//2. 지옥파티 난이도 결정
	input[2] = rand(chanceList_num[0]);
	$round_difficulty.innerHTML =  chanceList_name[0][input[2]];//난이도 출력
	
	//3. zone 딥카피
	var zoneArr = [];
	for (var i=0;i<zoneList.length;i++) {
		zoneArr[i] = zoneList[i];//
	}
	//4. zone을 나눠서 섞기
		//4-0-1. 최대 조각 드랍위치 개수 기억
		var jogak_zone_max = (jogakRange[input[0]][0][1] - jogakRange[input[0]][0][0] + 1) * (jogakRange[input[0]][1][1] - jogakRange[input[0]][1][0] + 1);
		//4-0-2. 최대 조각 드랍템 개수 기억
		var jogak_item_max = dropQuantityList[1].max();
		//4-1. 나누기
		var tempArr1 = [];//에픽 조각
		for (var i=0;i<jogak_zone_max;i++) {
			tempArr1[i] = zoneArr[i];
		}
		var tempArr2 = [];//일반 장비
		for (var i=jogak_zone_max;i<zoneArr.length;i++) {
			tempArr2[i - jogak_zone_max] = zoneArr[i];
		}
		//4-2. 섞기
		shuffle(tempArr1);
		shuffle(tempArr2);
		//4-3. 다시 넣기
		zoneArr = [];
		for (var i=0;i<jogak_item_max;i++) {//드랍템 개수만큼만 기억하기
			zoneArr.push(tempArr1[i]);
		};
		for (var i=0;i<tempArr2.length;i++) {
			zoneArr.push(tempArr2[i]);
		};
	//5. 이용하는 zone 개수 파악
		//5-1. 조각 드랍 수량
		var jogak_quantity = dropQuantityList[1][input[1]];
		//5-2. 마봉&에픽 드랍 수량
		var equip_quantity = dropQuantityList[0][input[2]];
		//5-3. 초대장 드랍 수량
		var invitation_quantity = dropQuantityList[2][input[1]][Math.floor(Math.random() * dropQuantityList[2][input[1]].length)];
		//5-4 총 드랍 개수 저장
		quantity = equip_quantity + invitation_quantity + jogak_quantity;
		
	//6. 아이템 분류 & 결정 & 출력
		//6-1. 에픽 조각
		for (var i = 0;i < jogak_quantity;i++) {
			//조각 종류 "선정"
			sortItem("조각", i, zoneArr);
		}
		//6-2. 일반 장비
		for (var i = jogak_item_max;i < jogak_item_max + equip_quantity;i++) {
			//장비 종류 "선정"
			sortItem("장비", i, zoneArr);
		}
		//6-3. 초대장
		for (var i = jogak_item_max + equip_quantity;i < jogak_item_max + equip_quantity + invitation_quantity;i++) {
			//초대장 "드랍"
			getItem("초대장", input[1], i, zoneArr);
		}
	//7. 에픽을 제외한 아이템 업데이트
		//7-1. 아이템 종류 구분
		var thisEpic = [];
		for (var i=0;i<thisTime.length;i++) {
			if (thisTime[i][2] == "에픽" || thisTime[i][2] == "고유에픽") {
				//에픽 아이템 : 별도로 분류한 후 다음 단계에서 처리
				thisEpic.push(thisTime[i][3]);
			} else {
				//에픽이 아닌 아이템 : 업데이트 실시
				switch(thisTime[i][2]) {
					case "마봉" :
						//아무것도 실시하지 않음
						
						break;
					case "코스모소울" :
					case "지옥구슬" :
					case "초대장" :
						update(thisTime[i][2]);
						
						break;
					case "조각" :
						update(thisTime[i][2], thisTime[i][3]);
						
						break;
				}
			}
		}
	
	//8. (에픽 한정) 드랍 아이템 사운드 출력, 일괄 업데이트
		//IF 방금 에픽이 있었으면
		if (thisEpic.length > 0) {
			//8-1. 출현 사운드 출력
			try {
				if ($filter_sound.checked) {
					sound_appear.pause();
					sound_appear.currentTime = 0;
					sound_appear.play();
				}
			} catch(e) {
			}
			
			//8-2. inventory, set, craft - 개별 업데이트 실시
			for (var i=0;i<thisEpic.length;i++) {
				update("에픽", thisEpic[i]);
			}
			
			//8-3. record - 일괄 업데이트
				//8-3-1. 회차, 초대장 소모량, 지옥파티 난이도 (등장한 아이템의 모든 분류정보를 class에 입력)
				var text = "<span class='equip";
				for (var i=0;i<thisEpic.length;i++) {
					text += " " + thisEpic[i][0] + " " + thisEpic[i][1] + " " + thisEpic[i][2] + " lv" + thisEpic[i][3].toString();
				}
					text += "'><span class='run";
				for (var i=0;i<thisEpic.length;i++) {
					text += " " + thisEpic[i][0] + " " + thisEpic[i][1] + " " + thisEpic[i][2] + " lv" + thisEpic[i][3].toString();
				}
					text += "'>" + thousand(count.toString()) + "회차 \
								<span class='cost'>(초대장 : " + thousand(cost[0]) + " / 실질 : " + thousand(cost[1]) + ")</span>\
								<span class='difficulty_" + input[2].toString() + "'> &lt;" + chanceList_name[0][input[2]].toString() + "&gt;</span>\
							</span><br />";
				//8-3-2. 아이템 정보
				for (var i=0;i<thisEpic.length;i++) {
					if (thisEpic[i][0] == "방어구") {//방어구
						if (thisEpic[i][5] != "") {//세트 방어구
							text += "\
								<span class='get " + thisEpic[i][0] + " " + thisEpic[i][1] + " " + thisEpic[i][2] + " lv" + thisEpic[i][3].toString() + "'>\
									<span class='set'>　" + thisEpic[i][4] + "</span> [" + thisEpic[i][1] + " / " + thisEpic[i][3] + "제]\
									 <span class='quantity'>(x" + thisEpic[i][8] + ")</span>\
								</span><br />";
						} else {//'비'세트 방어구
							text += "\
								<span class='get " + thisEpic[i][0] + " " + thisEpic[i][1] + " " + thisEpic[i][2] + " lv" + thisEpic[i][3].toString() + "'>\
									<span class='epic'>　" + thisEpic[i][4] + "</span> [" + thisEpic[i][1] + " / " + thisEpic[i][3] + "제]\
									 <span class='quantity'>(x" + thisEpic[i][8] + ")</span>\
								</span><br />";
						}
					} else {//그외
						if (thisEpic[i][5] != "") {//세트 그외
							text += "\
								<span class='get " + thisEpic[i][0] + " " + thisEpic[i][1] + " " + thisEpic[i][2] + " lv" + thisEpic[i][3].toString() + "'>\
								<span class='set'>　" + thisEpic[i][4] + "</span> [" + thisEpic[i][2] + " / " + thisEpic[i][3] + "제] \
								 <span class='quantity'>(x" + thisEpic[i][8] + ")</span>\
								</span><br />";
						} else {//'비'세트 그외
							text += "\
								<span class='get " + thisEpic[i][0] + " " + thisEpic[i][1] + " " + thisEpic[i][2] + " lv" + thisEpic[i][3].toString() + "'>\
								<span class='epic'>　" + thisEpic[i][4] + "</span> [" + thisEpic[i][2] + " / " + thisEpic[i][3] + "제] \
								<span class='quantity'>(x" + thisEpic[i][8] + ")</span>\
								</span><br />";
						}
					}
				}
				text += "</span>";
				//8-3-3. record에 기록 (record가 열려있을 때만)
				if ($record.style.display == "block") {
					//IF - record가 열려있음
						//내용 저장
						content_text[0] += text;
						//내용 출력
						$record.innerHTML += text;
						//스크롤바 이동
						$record.scrollTop = $record.scrollHeight;
				} else {
					//IF - record가 닫혀있음 (차후에 record를 열면 그 때 업데이트 실시)
						//내용 저장
						content_text[0] += text;
				}
				
		}
	
	
	//=================================
	//* 회차 증가
	//=================================
	count += 1;
	
	//=================================
	//* 차후 계획
	//=================================
	//IF - 1회 실행
	if (num == 1) {
		//아이템 드롭 - 실시
		for (var i=0;i<thisTime.length;i++) {
			dropItem(thisTime[i]);
		}
		//버튼 활성화 준비
		onoff(2.5);
	//IF - 탐색 실시 (2 : 첫번째 탐색, 3 : 두번째 이후 탐색)
	} else if (num == 2 || num == 3) {
		//-1. 답변 체크용 임시 변수
		var out = 0;//(1보다 크면 종료 조건 충족)
		//0. 조건 없음
		if (objective[0] == "none") {
			if (running == 1) {//'자동 실행 변수'가 ON일때만 반응
				autoRunning = setTimeout(function() {
					simulate(2);
				}, 25);
				return;
			} else {
				//뒷처리
				clearTimeout(autoRunning);//자동실행 해제
				running = 0;//'자동 실행 변수' OFF
				objective = []//목표 초기화
				onoff(0);
			}
		//1. 에픽 아이템 탐색
		} else if (objective[0] == "item") {
			if (thisEpic.length > 0) {
				for (i=0;i<thisEpic.length;i++) {
					if (objective[4] == thisEpic[i][4]) {//아이템 명칭
						var showing = thisEpic[i][4];
						out += 1;
					} else if (objective[4] == "" && objective[3] == thisEpic[i][2]) {//3차 분류
						var showing = thisEpic[i][4] + " (모든 " + objective[3] + " 아이템)";
						out += 1;
					} else if (objective[4] == "" && objective[3] == "" && objective[2] == thisEpic[i][1]) {//2차 분류
						var showing = thisEpic[i][4] + " (모든 " + objective[2] + " 아이템)";
						out += 1;
					} else if (objective[4] == "" && objective[3] == "" && objective[2] == "" && objective[1] == thisEpic[i][0]) {//1차 분류
						var showing = thisEpic[i][4] + " (모든 " + objective[1] + " 아이템)";
						out += 1;
					} else if (objective[4] == "" && objective[3] == "" && objective[2] == "" && objective[1] == "") {//'무조건'
						var showing = thisEpic[i][4] + " (모든 에픽 아이템 )";
						out += 1;
					}
					if (out > 0) {
						//출력용 답변 기억
						break;
					}
				}
			}
		//2. 세트 완성
		} else if (objective[0] == "set") {
			if (objective[1] == "") {//'모든 세트'가 목표일 경우

				temp2 = $set_table.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
				for (i=0;i<temp2;i++) {
					//완료된 세트 검색
					var tr_set = document.getElementById("set_row_" + i.toString());
					if (tr_set.getElementsByTagName("td")[5].innerHTML != "") {
						//그 세트의 파츠 중 이번 회차에 완료한 게 있다면
						var set_name = (tr_set.getElementsByTagName("td")[0].innerText || tr_set.getElementsByTagName("td")[0].textContent);
						for (j=0;j<itemList.length;j++) {
							if (itemList[j][5] == set_name && itemList[j][10] >= count-1) {//1을 빼는 이유 : count는 이미 1을 더해버렸기 때문에
								//출력용 답변 기억
								var showing = set_name + " (모든 세트)";
								out += 1;
								break;
							}
						}
					}
					if (out > 0) {
						break;
					}
				}
			} else if (objective[2] == "") {//모든 '특정 분류' 세트가 목표일 경우
				temp2 = $set_table.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
				for (i=0;i<temp2;i++) {
					//완료된 세트 검색
					var tr_set = document.getElementById("set_row_" + i.toString());
					if (tr_set.getElementsByTagName("td")[5].innerHTML != "") {
						//그 세트가 해당 분류라면
						if (tr_set.getElementsByTagName("td")[1].innerHTML == objective[1]) {
							//그 세트의 파츠 중 이번 회차에 완료한 게 있다면
							var set_name = (tr_set.getElementsByTagName("td")[0].innerText || tr_set.getElementsByTagName("td")[0].textContent);
							for (j=0;j<itemList.length;j++) {
								if (itemList[j][5] == set_name && itemList[j][10] == count-1) {//1을 빼는 이유 : count는 이미 1을 더해버렸기 때문에
									//출력용 답변 기억
									var showing = set_name + " (모든 " + objective[1] + " 아이템)";
									out += 1;
									break;
								}
							}
						}
					}
					if (out > 0) {
						break;
					}
				}
			} else {//'특정 세트'가 목표일 경우
				temp2 = $set_table.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
				for (i=0;i<temp2;i++) {
					if (document.getElementById("set_row_" + i.toString()).getElementsByTagName("td")[0].innerHTML.indexOf(objective[2]) != -1) {
						tr_set = document.getElementById("set_row_" + i.toString());
						break;
					}
				}
				if (tr_set.getElementsByTagName("td")[5].innerHTML != "") {
					//출력용 답변 기억
					var showing = (tr_set.getElementsByTagName("td")[0].innerText || tr_set.getElementsByTagName("td")[0].textContent);
					out += 1;
				}
			}
		//3. 실행 횟수
		} else if (objective[0] == "count") {
			if (objective[2] + 1 >= objective[1]) {
				var showing = (objective[2] + 1).toString() + "회 실행";
				out += 1;
			} else {
				objective[2] += 1;
			}
		//4. 초대장 제한
		} else if (objective[0] == "cost") {
			if (objective[2] + (costList[input[0]]*2) > objective[1]) {
				var showing = objective[1].toString() + "장 중 " + (objective[2] + costList[input[0]]).toString() + "장 사용 \
					(총 " + Math.floor(objective[1]/costList[input[0]]).toString() + "회 실행)";
				out += 1;
			} else {
				objective[2] += costList[input[0]];
			}
		//5. 피로도 제한
		} else if (objective[0] == "fatigue") {
			if  (objective[3] + objective[2] >= objective[1]) {
				var showing = Math.ceil(objective[1]/objective[2]).toString() + "회 실행 (전체 피로도 : " + objective[1].toString() + ")";
				out += 1;
			} else {
				objective[3] += objective[2];
			}
		}
		
		//정지 조건 달성
		if (out > 0) {
			//메세지 출력
			var tempText = "<span class='system'>====================&lt;탐색 종료&gt;====================";
				tempText += "<br/>※ 종료 조건 : " + $objective_list.options[$objective_list.selectedIndex].text + " － " + showing
				tempText += "<br/>==================================================</span>";
			$record.innerHTML += tempText;
			//스크롤바 이동 (종료 메세지가 보이도록)
			if ($record.style.display == "block") {
				$record.scrollTop = $record.scrollHeight;
			}
			//뒷처리
				//'자동 실행 변수' OFF
				running = 0;
				//목표 초기화
				objective = [];
				//아이템 드롭 - 실시
				for (var i=0;i<thisTime.length;i++) {
					dropItem(thisTime[i]);
				}
				//버튼 활성화 준비
				onoff(2.5);
		//미달성 시
		} else {
			if (running == 1) {//'자동 실행 변수'가 ON일때만 반응
				//아이템 드롭 - 실시하지 않음 (중단 시 별도로 처리)
				//재실행
				autoRunning = setTimeout(function() {
					simulate(3);
				}, 16);
			} else {
				//아이템 드롭 - 실시
				for (var i=0;i<thisTime.length;i++) {
					dropItem(thisTime[i]);
				}
				//버튼 활성화 준비
				onoff(2.5);
			}
		}
	}
	
}

//아이템 분류
function sortItem(type, zone, zoneArr) {
	//1. 등급 결정 (장비 한정, 조각은 "에픽" Only)
	switch (type) {
		case "장비":
			//일반 장비 : 마봉, 에픽, 코스모소울, 지옥구슬
			input[3] = chanceList_name[1][input[2]][input[1]][rand(chanceList_num[1][input[2]][input[1]])];
				//IF : 에픽이 아니면 : 드롭
				if (input[3] != "에픽") {
					getItem(type, input[3], zone, zoneArr);
					return;
				};
			break;
		case "조각":
			//조각 : 에픽 Only
			input[3] = "에픽";
			break;
	}
	//2. 고유에픽 결정 (장비 한정, 조각은 "일반에픽" Only)
	switch (type) {
		case "장비":
			//일반 장비 : 일반에픽, 고유에픽
			input[4] = chanceList_name[2][rand(chanceList_num[2])];
				//IF : 고유 에픽이면 : 드롭
				if (input[4] == "고유에픽") {
					//IF : 고유 에픽 리스트가 비어있지 않다면 : 드롭
					if (currentList_goyu.length > 0) {
						getItem(type, input[4], zone, zoneArr);
						return;
					}
				};
			break;
		case "조각":
			//조각 : 일반에픽 Only
			input[4] = "일반에픽";
			break;
	}
	//3. 종류 결정
	input[5] = chanceList_name[3][rand(chanceList_num[3])];
	//4. 레벨 결정 (가중치 = 각 종류&레벨별 아이템 개수)
		//4-1. 레벨 종류만큼 칸 설정
		currentList_level = [];
		for (var i=0;i<levelList[input[0]].length;i++) {
			currentList_level.push(0);
		}
		//4-2. 해당 칸은 특정 레벨 & 특정 장비의 개수만큼 숫자가 증가
		for (var i=0;i<currentList.length;i++) {
			for (var j=0;j<levelList[input[0]].length;j++) {
				//앞에서 선택된 장비이고 레벨이 맞을 경우, 해당 레벨 칸 +1
				if ((currentList[i][0] == input[5] //무기, 방어구 전용 : 대분류
				|| currentList[i][1] == input[5])//악세사리, 특수장비 : 1차 소분류
				&& currentList[i][3] == levelList[input[0]][j]) {
					currentList_level[j] += 1;
				}
			}
		}
		//4-3. 추가 가중치 계산
		for (var i=0;i<chanceList_num[4].length;i++) {
			if (chanceList_num[4][i][0].indexOf(input[0]) != -1) {
				for (var j=0;j<currentList_level.length;j++) {
					currentList_level[j] = currentList_level[j] * chanceList_num[4][i][1][j];
				}
				break;
			}
		}
		input[6] = levelList[input[0]][rand(currentList_level)];
	//5. 인풋을 바탕으로 드롭
	getItem(type, input[3], zone, zoneArr);//('에픽')을 전송, 나머진 getItem()에서 해결
	return;
}

	//아이템 결정, 이름 출력 (루팅 : dropItem()에서 실시)
	function getItem(type, item, zone, zoneArr) {
		switch (type) {
			case "장비" :
				
				switch (item) {
					case "마봉":
						//아이템 필드 이미지 & 이름 결정
						var name1 = fieldList[Math.floor(Math.random() * fieldList.length)];
						if (name1.split("_")[1] == "방어구") {
							var name2 = name1.split("_")[2] + " " + name1.split("_")[3];
						} else {
							var name2 = name1.split("_")[3];
						}
						
						//아이템 이름 변경
						document.getElementById("description" + zone.toString()).className += " normal";//이름 숨기기 옵션용
						document.getElementById("item_name" + zone.toString()).className += " rare";
						document.getElementById("item_name" + zone.toString()).innerHTML = "마법으로 봉인된 " + name2;
							document.getElementById("description" + zone.toString()).style.left = (-document.getElementById("item_name" + zone.toString()).offsetWidth/2).toString() + "px";
						
						//아이템 필드 이미지 변경, 크기 조절
						document.getElementById("item_img" + zone.toString()).style.backgroundPosition = spritePosition(name1,1);
						document.getElementById("item_img" + zone.toString()).style.width = spriteSize(name1,"width",1);
							document.getElementById("item_img" + zone.toString()).style.left = (-document.getElementById("item_img" + zone.toString()).offsetWidth/2).toString() + "px";
						document.getElementById("item_img" + zone.toString()).style.height = spriteSize(name1,"height",1);
						
						//아이템 이름, 필드 이미지 가시화
						document.getElementById("item_name" + zone.toString()).style.visibility = "visible";
						document.getElementById("item_img" + zone.toString()).style.visibility = "visible";
						
						//아이템 등록
						thisTime.push([zone, zoneArr, item]);
						
						break;
						
					case "코스모소울":
						//아이템 필드 이미지 & 이름 결정
						var name1 = "field_기타";
						var name2 = "코스모 소울";
						
						//아이템 이름 변경
						document.getElementById("description" + zone.toString()).className += " normal";//이름 숨기기 옵션용
						document.getElementById("item_name" + zone.toString()).className += " epic";
						document.getElementById("item_name" + zone.toString()).innerHTML = name2;
							document.getElementById("description" + zone.toString()).style.left = (-document.getElementById("item_name" + zone.toString()).offsetWidth/2).toString() + "px";
						
						//아이템 필드 이미지 변경, 크기 조절
						document.getElementById("item_img" + zone.toString()).style.backgroundPosition = spritePosition(name1,1);
						document.getElementById("item_img" + zone.toString()).style.width = spriteSize(name1,"width",1);
							document.getElementById("item_img" + zone.toString()).style.left = (-document.getElementById("item_img" + zone.toString()).offsetWidth/2).toString() + "px";
						document.getElementById("item_img" + zone.toString()).style.height = spriteSize(name1,"height",1);
						
						//아이템 이름, 필드 이미지 가시화
						document.getElementById("item_name" + zone.toString()).style.visibility = "visible";
						document.getElementById("item_img" + zone.toString()).style.visibility = "visible";
						
						//아이템 등록
						thisTime.push([zone, zoneArr, item]);
						
						break;
					case "지옥구슬":
						var name1 = "field_기타";
						var name2 =  areaList[input[0]] + " 지옥구슬";
						
						//아이템 이름 변경
						document.getElementById("description" + zone.toString()).className += " normal";//이름 숨기기 옵션용
						document.getElementById("item_name" + zone.toString()).className += " unique";
						document.getElementById("item_name" + zone.toString()).innerHTML = name2;
							document.getElementById("description" + zone.toString()).style.left = (-document.getElementById("item_name" + zone.toString()).offsetWidth/2).toString() + "px";
						
						//아이템 필드 이미지 변경, 크기 조절
						document.getElementById("item_img" + zone.toString()).style.backgroundPosition = spritePosition(name1,1);
						document.getElementById("item_img" + zone.toString()).style.width = spriteSize(name1,"width",1);
							document.getElementById("item_img" + zone.toString()).style.left = (-document.getElementById("item_img" + zone.toString()).offsetWidth/2).toString() + "px";
						document.getElementById("item_img" + zone.toString()).style.height = spriteSize(name1,"height",1);
						
						//아이템 이름, 필드 이미지 가시화
						document.getElementById("item_name" + zone.toString()).style.visibility = "visible";
						document.getElementById("item_img" + zone.toString()).style.visibility = "visible";
						
						//아이템 등록
						thisTime.push([zone, zoneArr, item]);
						
						break;
					default:
						if (item == "고유에픽") {
							temp = currentList_goyu[Math.floor(Math.random() * currentList_goyu.length)];
						} else if (item == "에픽") {
							tempArr = [];
							for (j=0;j<currentList.length;j++) {
								if ((currentList[j][0] == input[5]/*종류-무기*/
								|| currentList[j][1] == input[5]/*종류-방어구*/
								|| currentList[j][2] == input[5])/*종류-악세서리&특수장비*/
								&& currentList[j][3] == input[6])/*레벨*/ {
									tempArr.push(currentList[j]);
								}
							}
							//미리 리스트에서 랜덤으로 선정
							temp = tempArr[Math.floor(Math.random() * tempArr.length)];
						}
						
						//아이템 이름 변경, 이후 미리 측정한 길이 부여
						document.getElementById("description" + zone.toString()).className += " normal";//이름 숨기기 옵션용
						document.getElementById("item_name" + zone.toString()).className += " epic";
						document.getElementById("item_name" + zone.toString()).innerHTML = temp[4];
							document.getElementById("description" + zone.toString()).style.left = (-document.getElementById("item_name" + zone.toString()).offsetWidth/2).toString() + "px";
						
						//아이템 필드 이미지 변경, 크기 조절
						var field_name = "field_" + temp[0] + "_" + temp[1] + "_" + temp[2];
						document.getElementById("item_img" + zone.toString()).style.backgroundPosition = spritePosition(field_name,1);
						document.getElementById("item_img" + zone.toString()).style.width = spriteSize(field_name,"width",1);
							document.getElementById("item_img" + zone.toString()).style.left = (-document.getElementById("item_img" + zone.toString()).offsetWidth/2).toString() + "px";
						document.getElementById("item_img" + zone.toString()).style.height = spriteSize(field_name,"height",1);
						
						//아이템 이름, 필드 이미지 가시화
						document.getElementById("item_name" + zone.toString()).style.visibility = "visible";
						document.getElementById("item_img" + zone.toString()).style.visibility = "visible";
								
						//출현 이펙트 가시화 (에픽 전용)
						document.getElementById("effect_appear" + zone.toString()).style.left = (-144).toString() + "px";
						document.getElementById("effect_appear" + zone.toString()).style.top = (-235+25+(document.getElementById("item_img" + zone.toString()).offsetHeight/2)).toString() + "px";
						document.getElementById("effect_appear" + zone.toString()).style.visibility = "visible";
						
						//아이템 등록
						thisTime.push([zone, zoneArr, "에픽", temp]);
				}
			
				break;
			case "조각" :
				//에픽 장비 선정
				tempArr = [];
				for (var j=0;j<currentList.length;j++) {
					if ((currentList[j][0] == input[5]/*종류-무기*/
					|| currentList[j][1] == input[5]/*종류-방어구*/
					|| currentList[j][2] == input[5])/*종류-악세서리&특수장비*/
					&& currentList[j][3] == input[6])/*레벨*/ {
						tempArr.push(currentList[j]);
					}
				}
				//미리 리스트에서 랜덤으로 선정
				temp = tempArr[Math.floor(Math.random() * tempArr.length)];
				
				//아이템 이름 변경, 이후 미리 측정한 길이 부여
				document.getElementById("description" + zone.toString()).className += " jogak";//이름 숨기기 옵션용
				document.getElementById("item_name" + zone.toString()).className += " jogak";
				document.getElementById("item_name" + zone.toString()).innerHTML = temp[4] + " 조각";
					document.getElementById("description" + zone.toString()).style.left = (-document.getElementById("item_name" + zone.toString()).offsetWidth/2).toString() + "px";
				
				//아이템 필드 이미지 변경, 크기 조절
				var field_name = "field_에픽조각";
				document.getElementById("item_img" + zone.toString()).style.backgroundPosition = spritePosition(field_name,1);
				document.getElementById("item_img" + zone.toString()).style.width = spriteSize(field_name,"width",1);
					document.getElementById("item_img" + zone.toString()).style.left = (-document.getElementById("item_img" + zone.toString()).offsetWidth/2).toString() + "px";
				document.getElementById("item_img" + zone.toString()).style.height = spriteSize(field_name,"height",1);
				
				//아이템 이름, 필드 이미지 가시화
				document.getElementById("item_name" + zone.toString()).style.visibility = "visible";
				document.getElementById("item_img" + zone.toString()).style.visibility = "visible";
				
				//아이템 등록
				thisTime.push([zone, zoneArr, type, temp]);

				break;
			case "완성" :
				//item 인수를 드랍할 장비로 선정
				temp = item;
				
				//아이템 이름 변경, 이후 미리 측정한 길이 부여
				document.getElementById("description" + zone.toString()).className += " normal";//이름 숨기기 옵션용
				document.getElementById("item_name" + zone.toString()).className += " epic";
				document.getElementById("item_name" + zone.toString()).innerHTML = "(조각 완성) " + temp[4];
					document.getElementById("description" + zone.toString()).style.left = (-document.getElementById("item_name" + zone.toString()).offsetWidth/2).toString() + "px";
				
				//아이템 필드 이미지 변경, 크기 조절
				var field_name = "field_" + temp[0] + "_" + temp[1] + "_" + temp[2];
				document.getElementById("item_img" + zone.toString()).style.backgroundPosition = spritePosition(field_name,1);
				document.getElementById("item_img" + zone.toString()).style.width = spriteSize(field_name,"width",1);
					document.getElementById("item_img" + zone.toString()).style.left = (-document.getElementById("item_img" + zone.toString()).offsetWidth/2).toString() + "px";
				document.getElementById("item_img" + zone.toString()).style.height = spriteSize(field_name,"height",1);
				
				//아이템 이름, 필드 이미지 가시화
				document.getElementById("item_name" + zone.toString()).style.visibility = "visible";
				document.getElementById("item_img" + zone.toString()).style.visibility = "visible";
						
				//출현 이펙트 가시화 (에픽 전용)
				document.getElementById("effect_appear" + zone.toString()).style.left = (-144).toString() + "px";
				document.getElementById("effect_appear" + zone.toString()).style.top = (-235+25+(document.getElementById("item_img" + zone.toString()).offsetHeight/2)).toString() + "px";
				document.getElementById("effect_appear" + zone.toString()).style.visibility = "visible";
				
				//=================================
				//* 완성템 개별 드랍 & 업데이트 - 시작
				//=================================
					//아이템 드랍 실시
					dropItem([zone,zoneArr,"에픽",temp]);
					//버튼 활성화 대기
					onoff(2.5);
					dropCount = quantity - 1;//한 개 드롭되면 바로 버튼 활성화되도록
					
					//8-1. 출현 사운드 출력
					try {
						if ($filter_sound.checked) {
							sound_appear.pause();
							sound_appear.currentTime = 0;
							sound_appear.play();
						}
					} catch(e) {
					}
					
					//아이템 업데이트 (inventory, set, craft)
					update("완성", temp);
					
					//아이템 업데이트 (record)
					var makeCount = count - 1;//(제작 시점은 일반 회차보다 1 낮게 설정)
					//8-3-1. 회차, 초대장 소모량, 지옥파티 난이도 (등장한 아이템의 모든 분류정보를 class에 입력)
					var text = "<span class='equip " + temp[0] + " " + temp[1] + " " + temp[2] + " lv" + temp[3].toString();
						text += "'><span class='run " + temp[0] + " " + temp[1] + " " + temp[2] + " lv" + temp[3].toString();
						text += "'>조각 완성 (" + thousand(makeCount.toString()) + "회차 \
									<span class='cost'> - 초대장 : " + thousand(cost[0]) + " / 실질 : " + thousand(cost[1]) + ")</span>\
								</span><br />";
					//8-3-2. 아이템 정보
					if (temp[0] == "방어구") {//방어구
						if (temp[5] != "") {//세트 방어구
							text += "\
								<span class='get " + temp[0] + " " + temp[1] + " " + temp[2] + " lv" + temp[3].toString() + "'>\
									<span class='set'>　" + temp[4] + "</span> [" + temp[1] + " / " + temp[3] + "제]\
									 <span class='quantity'>(x" + temp[8] + ")</span>\
								</span><br />";
						} else {//'비'세트 방어구
							text += "\
								<span class='get " + temp[0] + " " + temp[1] + " " + temp[2] + " lv" + temp[3].toString() + "'>\
									<span class='epic'>　" + temp[4] + "</span> [" + temp[1] + " / " + temp[3] + "제]\
									 <span class='quantity'>(x" + temp[8] + ")</span>\
								</span><br />";
						}
					} else {//그외
						if (temp[5] != "") {//세트 그외
							text += "\
								<span class='get " + temp[0] + " " + temp[1] + " " + temp[2] + " lv" + temp[3].toString() + "'>\
								<span class='set'>　" + temp[4] + "</span> [" + temp[2] + " / " + temp[3] + "제] \
								 <span class='quantity'>(x" + temp[8] + ")</span>\
								</span><br />";
						} else {//'비'세트 그외
							text += "\
								<span class='get " + temp[0] + " " + temp[1] + " " + temp[2] + " lv" + temp[3].toString() + "'>\
								<span class='epic'>　" + temp[4] + "</span> [" + temp[2] + " / " + temp[3] + "제] \
								<span class='quantity'>(x" + temp[8] + ")</span>\
								</span><br />";
						}
					}
					text += "</span>";
					//8-3-3. record에 기록
					//record는 닫혀있음 - 내용만 저장 (차후에 record를 열면 그 때 업데이트 실시)
						content_text[0] += text;
				//=================================
				//* 완성템 개별 드랍 & 업데이트 - 끝
				//=================================
				
				break;
			case "초대장" :
				//아이템 이름 변경, 이후 미리 측정한 길이 부여
				document.getElementById("description" + zone.toString()).className += " normal";//이름 숨기기 옵션용
				document.getElementById("item_name" + zone.toString()).className += " rare";
				document.getElementById("item_name" + zone.toString()).innerHTML = "지옥파티 초대장";
					document.getElementById("description" + zone.toString()).style.left = (-document.getElementById("item_name" + zone.toString()).offsetWidth/2).toString() + "px";
				
				//아이템 필드 이미지 변경, 크기 조절
				var field_name = "field_초대장";
				document.getElementById("item_img" + zone.toString()).style.backgroundPosition = spritePosition(field_name,1);
				document.getElementById("item_img" + zone.toString()).style.width = spriteSize(field_name,"width",1);
					document.getElementById("item_img" + zone.toString()).style.left = (-document.getElementById("item_img" + zone.toString()).offsetWidth/2).toString() + "px";
				document.getElementById("item_img" + zone.toString()).style.height = spriteSize(field_name,"height",1);
				
				//아이템 이름, 필드 이미지 가시화
				document.getElementById("item_name" + zone.toString()).style.visibility = "visible";
				document.getElementById("item_img" + zone.toString()).style.visibility = "visible";
				
				//아이템 등록
				thisTime.push([zone, zoneArr, type, temp]);
				
				break;
		}
		
	}
	
	//아이템 드롭
	function dropItem(info) {
		//아이템 회전 시작
		document.getElementById("item_img" + info[0].toString()).className += " rotate";
		
		switch (info[2]) {
			case "에픽":
				//애니메이션 실행
				animation(document.getElementById("effect_appear" + info[0].toString()),"appear",info[0],341,0,-4091,40,0);
				
				//루팅 개시
				looting(info[2], info[0], info[1], 1, 1, 1);
				
				break;
			default:
				//루팅 개시
				looting(info[2], info[0], info[1], 1, 0, 0);
				
				break;
		}
	}

//=================================================================================================================
//※ 함수 - 업데이트
//=================================================================================================================
//popup에 업데이트
function update(type, info) {
	//1. 획득/소비 수치 변경
	if (type == "코스모소울") {
		//획득량 증가
		get[2] += 1;
		$result_soul_get.innerHTML = thousand(get[2]);//출력
		if (!$result_check_soulAuto.checked) {
			//(첫 보유량 증가일 경우 - 해체 버튼 활성화)
			if (get[3] == 0) {
				$result_button_soulDisassemble.disabled = "";
				$result_button_soulDisassemble.value = "해체";
			}
			//보유량 증가
			get[3] += 1;
			$result_soul_have.innerHTML = thousand(get[3]);//출력
		} else {
			//실질 초대장 감소
			cost[1] -= cutList[0];
			$cost_real.innerHTML = thousand(cost[1]);
			$cost_gold_real.innerHTML = setWon(cost[1]*gold);
		}
	} else if (type == "지옥구슬") {
		get[4] += 1;
		$result_beed_get.innerHTML = thousand(get[4]);//출력
		//실질 초대장 감소
		cost[1] -= cutList[1][input[0]];
		$cost_real.innerHTML = thousand(cost[1]);
	} else if (type == "초대장") {
		get[5] += 1;
		$result_cost_get.innerHTML = thousand(get[5]);//출력
		//실질 초대장 감소
		cost[1] -= 1;
		$cost_real.innerHTML = thousand(cost[1]);
	} else if (type == "에픽" || type == "완성"){//에픽
		num = 0;//순번 찾기
		for (i=0;i<itemList.length;i++) {
			if (itemList[i][4] == info[4]) {
				num = i;
				break;
			}
		};
		get[0] += 1;//획득 에픽
			$result_epic_get.innerHTML = thousand(get[0]);//출력
		//(첫 보유량 증가일 경우 - 해체 버튼 활성화)
		if (get[1] == 0) {
			$result_button_epicDisassemble.disabled = "";
			$result_button_epicDisassemble.value = "해체";
		}
		get[1] += 1;//보유 에픽
			$result_epic_have.innerHTML = thousand(get[1]);//출력
		//2. itemList에 획득량 기록 (에픽 한정)
		itemList[num][8] += 1;//해당 아이템 획득 수 증가
		itemList[num][9] += 1;//해당 아이템 보유 수 증가
		if (itemList[num][9] == 1) {//IF : 첫번째 득템일 경우
			itemList[num][10] = count;//당시 회차 기억
			itemList[num][11] = cost[0];//당시 총 소비 기억
			itemList[num][12] = cost[1];//당시 실질 소비 기억
		}
		//3. 최초 보유이면 : 수집률 증가
		if (itemList[num][9] == 1) {
			collect += 1;
			var gathered = Math.floor((collect/itemList.length)*1000)/10;
			$inventory_check_collect.innerHTML = gathered.toString();
		}
	} else if (type == "조각") {
		num = 0;//순번 찾기
		for (i=0;i<itemList.length;i++) {
			if (itemList[i][4] == info[4]) {
				num = i;
				break;
			}
		};
		//2. itemList에 획득량 기록
		itemList[num][13] += 1;//해당 조각 수 증가
	}
	
	//3. record에 기록 - simulate() 함수에서 일괄 처리
	
	//4. inventory에 기록 (에픽 한정)
	if (type == "에픽" || type == "완성") {
		var tr_inventory = document.getElementById("inventory_row_" + num);
		//4-1. 보유량 업데이트
		tr_inventory.getElementsByTagName("td")[4].innerHTML = itemList[num][9].toString();
		//4-2. 해체 버튼 활성화
		if (tr_inventory.getElementsByTagName("td")[5].innerHTML == "") {
			tr_inventory.getElementsByTagName("td")[3].innerHTML = "\
				<a href='javascript:void(0);' onclick='recycle(" + num.toString() + ",1);' >해체</a>";
		}
		//4-3. 첫 획득 (없으면) 업데이트
		if (tr_inventory.getElementsByTagName("td")[5].innerHTML == "") {
			if (type == "에픽") {//드랍으로 첫 획득시
				tr_inventory.getElementsByTagName("td")[5].innerHTML = "\
					" + thousand(itemList[num][10]) + "회차 (드랍)\
					<br/><span class='cost'>(초대장 : " + thousand(itemList[num][11]) + "\
					<br/>/ 실질 : " + thousand(itemList[num][12]) + ")";
			} else if (type == "완성") {//완성으로 첫 획득시
				tr_inventory.getElementsByTagName("td")[5].innerHTML = "\
					" + thousand(itemList[num][10]) + "회차 <span class='yellow'>(완성)</span>\
					<br/><span class='cost'>(초대장 : " + thousand(itemList[num][11]) + "\
					<br/>/ 실질 : " + thousand(itemList[num][12]) + ")";
			}
		}
		//4-4. 해당 아이템 (색깔 입혀서) 가시화
		if (tr_inventory.className.indexOf("not_show") != -1) {
			if (info[5] != "") {//세트
				tr_inventory.getElementsByTagName("td")[0].innerHTML = "<span class='set'>" + tr_inventory.getElementsByTagName("td")[0].innerHTML + "</span>";
			} else {//그 외
				tr_inventory.getElementsByTagName("td")[0].innerHTML = "<span class='epic'>" + tr_inventory.getElementsByTagName("td")[0].innerHTML + "</span>";
			}
		}
		removeClass(tr_inventory,"not_show");
		addClass(tr_inventory,"show");
	//5. set에 기록 (에픽 한정, '세트 아이템' 한정)
		if (itemList[num][5] != "") {
			//5-0. set에서 해당하는 행 찾기
			temp2 = $set_table.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
			for (i=0;i<temp2;i++) {
				if (document.getElementById("set_row_" + i.toString()).getElementsByTagName("td")[0].innerHTML.indexOf(itemList[num][4]) != -1) {
					var tr_set = document.getElementById("set_row_" + i.toString());
					break;
				}
			}
			//5-1. 보유량 업데이트
			tr_set.getElementsByTagName("td")[4].innerHTML = itemList[num][9].toString();
			//5-2. 해체 버튼 활성화
			if (tr_set.getElementsByTagName("td")[5].innerHTML == "") {
				tr_set.getElementsByTagName("td")[3].innerHTML = "\
					<a href='javascript:void(0);' onclick='recycle(" + num.toString() + ",1);' >해체</a>";//inventory 기준으로 설정 (set에서 위치는 차후에 별도로 계산)
			}
			//5-3. 첫 획득 (없으면) 업데이트
			if (tr_set.getElementsByTagName("td")[5].innerHTML == "") {
				if (type == "에픽") {//드랍으로 첫 획득시
					tr_set.getElementsByTagName("td")[5].innerHTML = "\
						" + thousand(itemList[num][10]) + "회차 (드랍)\
						<br/><span class='cost'>(초대장 : " + thousand(itemList[num][11]) + "\
						<br/>/ 실질 : " + thousand(itemList[num][12]) + ")";
				} else if (type == "완성") {//완성으로 첫 획득시
					tr_set.getElementsByTagName("td")[5].innerHTML = "\
						" + thousand(itemList[num][10]) + "회차 <span class='yellow'>(완성)</span>\
						<br/><span class='cost'>(초대장 : " + thousand(itemList[num][11]) + "\
						<br/>/ 실질 : " + thousand(itemList[num][12]) + ")";
				}
			}
			//5-4. 해당 아이템 (색깔 입혀서) 가시화
			if (tr_set.className.indexOf("not_show") != -1) {
				tr_set.getElementsByTagName("td")[0].innerHTML = "<span class='set'>" + tr_set.getElementsByTagName("td")[0].innerHTML + "</span>";
			}
			removeClass(tr_set,"not_show");
			addClass(tr_set,"show");
			//5-5. '세트' 업데이트
			//5-5-1. 세트 지정
			temp2 = $set_table.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
			for (i=0;i<temp2;i++) {
				if (document.getElementById("set_row_" + i.toString()).getElementsByTagName("td")[0].innerHTML.indexOf(itemList[num][5]) != -1) {
					var tr_set_hap = document.getElementById("set_row_" + i.toString());
					break;
				}
			}
			//5-5-2. 세트 완성 현황 파악 및 반영
			var a = 0;//해당 세트 보유 파츠 수
			var b = 0;//해당 세트 총 파츠 수
			for (i=0;i<itemList.length;i++) {
				if (itemList[i][5] == (tr_set_hap.getElementsByTagName("td")[0].innerText || tr_set_hap.getElementsByTagName("td")[0].textContent)) {
					if (itemList[i][9] > 0) {
						a += 1; //보유한 것만 증가
					};
					b += 1;//세트 이름이 일치하면 증가
				};
			};
			//5-5-3. 세트 보유 현황 변경
			tr_set_hap.getElementsByTagName("td")[4].innerHTML = a.toString() + "/" + b.toString();
			//5-5-4. 세트 이름 스타일 변경
				//5-5-4-1. 진행중
				var tr_name = (tr_set_hap.getElementsByTagName("td")[0].innerText || tr_set_hap.getElementsByTagName("td")[0].textContent);
				if (a < b) {
					tr_set_hap.getElementsByTagName("td")[0].innerHTML = tr_name;
					tr_set_hap.getElementsByTagName("td")[5].innerHTML = "";
				//5-5-4-2. 완성
				} else {
					tr_set_hap.getElementsByTagName("td")[0].innerHTML = "<span class='epic'>" + tr_name + "</span>"
				//5-5-4-2-1. (완성 '시' 한정) 세트 첫 획득 지정
					if (tr_set_hap.getElementsByTagName("td")[5].innerHTML == "") {
						tr_set_hap.getElementsByTagName("td")[5].innerHTML = "\
							" + thousand(count) + "회차\
							<span class='cost'><br/>(초대장 : " + thousand(cost[0]) + "\
							<br/>/ 실질 : " + thousand(cost[1]) + ")";
					}
				}
			//5-5-5. (a가 0보다 크면) 세트 가시화
			if (a > 0) {
				removeClass(tr_set_hap,"not_show");
				addClass(tr_set_hap,"show");
			} else {
				removeClass(tr_set_hap,"show");
				addClass(tr_set_hap,"not_show");
			}
		}
		//set 기록 끝
	
	}
	//6. craft에 기록 (에픽, 조각 한정)
	if (((type == "에픽" || type == "완성") && info[6] == "") || type == "조각") {
		var tr_craft = document.getElementById("craft_row_" + num);
		//6-1. 보유량 업데이트
		if ((type == "에픽" || type == "완성")) {
			tr_craft.getElementsByTagName("td")[3].innerHTML = itemList[num][9].toString();
		}
		//6-2. 조각수 업데이트
		if (itemList[num][13] < maxJogak) {//필요 조각 수 미만
			tr_craft.getElementsByTagName("td")[4].innerHTML = thousand(itemList[num][13]);
		} else {//필요 조각 수 이상 습득 시
			//클래스 추가
			if (tr_craft.className.indexOf("available") == -1) {
				tr_craft.className += " available";
			}
			//조각 수 색깔 변경
			tr_craft.getElementsByTagName("td")[4].innerHTML = "<span class='yellow'>" + thousand(itemList[num][13]) + "</span>";
		}
		//6-3. 제작 버튼 활성화
		if (itemList[num][13] >= maxJogak) {
			tr_craft.getElementsByTagName("td")[5].className = "col_6 button";
			tr_craft.getElementsByTagName("td")[5].innerHTML = "제작";
			tr_craft.getElementsByTagName("td")[5].onclick = (function(num) {
				return function() {
					make(num,1);
				};})(num);
		}
		//6-4. 해당 아이템 (색깔 입혀서) 가시화 (조각 한정)
		if (type == "조각") {
			if (tr_craft.className.indexOf("not_show") != -1) {
				if (info[5] != "") {//세트
					tr_craft.getElementsByTagName("td")[0].innerHTML = "<span class='set'>" + tr_craft.getElementsByTagName("td")[0].innerHTML + "</span>";
				} else {//그 외
					tr_craft.getElementsByTagName("td")[0].innerHTML = "<span class='epic'>" + tr_craft.getElementsByTagName("td")[0].innerHTML + "</span>";
				}
			}
			removeClass(tr_craft,"not_show");
			addClass(tr_craft,"show");
		}
	}
	
}

	//inventory, set에서 아이템 해체
	function recycle(num,amount) {
		//정말로 해체할지 질문
		if (!$inventory_check_confirm.checked || !$set_check_confirm.checked) {
			if (!confirm("'" + itemList[num][4] + "' 을(를) " + amount.toString() + "개 해체하시겠습니까?\n(보유 수량 : " + itemList[num][9].toString() + ")")) {
				return;
			}
		}
		//1. 아이템 수량 감소
			//1-1. 해당 아이템 보유 갯수 amount만큼 감소
			itemList[num][9] -= amount;
			//1-2. 전체 에픽 보유량 갯수 감소 & result에 표기
			get[1] -= amount;
			$result_epic_have.innerHTML = thousand(get[1]);//출력
			//1-2-1. 에픽 개수가 0이 되면 - result에서 해체 버튼 비활성화
			if (get[1] == 0) {
				$result_button_epicDisassemble.disabled = "disabled";
				$result_button_epicDisassemble.value = "없음";
			}
			//1-3. inventory에 반영 (tr)
			var tr = document.getElementById("inventory_row_" + num);
			tr.getElementsByTagName("td")[4].innerHTML = itemList[num][9].toString();
			//1-4. set에 반영 (tr2) (세트 아이템 한정)
			if (itemList[num][5] != "") {
				temp2 = $set_table.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
				for (i=0;i<temp2;i++) {
					if (document.getElementById("set_row_" + i.toString()).getElementsByTagName("td")[0].innerHTML.indexOf(itemList[num][4]) != -1) {
						tr2 = document.getElementById("set_row_" + i.toString());
						break;
					}
				}
				tr2.getElementsByTagName("td")[4].innerHTML = itemList[num][9].toString();
			}
		//2. 결과물 처리
		if (!$result_check_soulAuto.checked) {
			//코소 자동 해체 OFF - 코스모 소울 보유량 증가
			//(첫 보유량 증가일 경우 - 해체 버튼 활성화)
			if (get[3] == 0) {
				$result_button_soulDisassemble.disabled = "";
				$result_button_soulDisassemble.value = "해체";
			}
			//보유량 증가
			get[3] += disCount("코스모소울",itemList[num][3]);
			$result_soul_have.innerHTML = thousand(get[3]);//출력
		} else {
			//코소 자동 해체 ON - 실질 초대장 소모량 감소
			cost[1] -= disCount("초대장",itemList[num][3])*amount;
			$cost_real.innerHTML = thousand(cost[1]);
			$cost_gold_real.innerHTML = setWon(cost[1]*gold);
		}
		//3. IF : 해체를 해서 보유량이 0이 되었을 경우
		if (itemList[num][9] == 0) {
			//3-1. '첫 획득 정보' 초기화
			itemList[num][10] == 0;//첫 득템 당시 회차
			itemList[num][11] == 0;//첫 득템 당시 총 소모 초대장
			itemList[num][12] == 0;//첫 득템 당시 실질 소모 초대장
			//3-2. 수집률 감소
			collect -= 1;
			var gathered = Math.floor((collect/itemList.length)*1000)/10;
			$inventory_check_collect.innerHTML = gathered.toString();
			//3-3. inventory 설정
				//3-3-1. inventory - '해체' 버튼 제거
				tr.getElementsByTagName("td")[3].innerHTML = "없음";
				//3-3-2. inventory - '첫 획득' 기록 제거
				tr.getElementsByTagName("td")[5].innerHTML = "";
				//3-3-3. inventory - 해당 아이템 (색깔 지우고) 가시화 해제
				tr.getElementsByTagName("td")[0].innerHTML = (tr.getElementsByTagName("td")[0].innerText || tr.getElementsByTagName("td")[0].textContent);
				removeClass(tr,"show");
				addClass(tr,"not_show");
			//3-4. set 설정
			if (itemList[num][5] != "") {
				//3-4-1. inventory - '해체' 버튼 제거
				tr2.getElementsByTagName("td")[3].innerHTML = "없음";
				//3-4-2. inventory - '첫 획득' 기록 제거
				tr2.getElementsByTagName("td")[5].innerHTML = "";
				//3-4-3. inventory - 해당 아이템 (색깔 지우고) 가시화 해제
				tr2.getElementsByTagName("td")[0].innerHTML = (tr2.getElementsByTagName("td")[0].innerText || tr2.getElementsByTagName("td")[0].textContent);
				removeClass(tr2,"show");
				addClass(tr2,"not_show");
				//3-5. set에서 '세트' 설정
				temp2 = $set_table.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
				for (i=0;i<temp2;i++) {
					if (document.getElementById("set_row_" + i.toString()).getElementsByTagName("td")[0].innerHTML.indexOf(itemList[num][5]) != -1) {
						tr_set = document.getElementById("set_row_" + i.toString());
						break;
					}
				}
				//5-5-2. 세트 완성 현황 파악 및 반영
				var a = 0;
				var b = 0;
				for (i=0;i<itemList.length;i++) {
					if (itemList[i][5] == (tr_set.getElementsByTagName("td")[0].innerText || tr_set.getElementsByTagName("td")[0].textContent)) {
						if (itemList[i][9] > 0) {
							a += 1; //보유한 것만 증가
						};
						b += 1;//세트 이름이 일치하면 증가
					};
				};
				//5-5-3. 세트 보유 현황 변경
				tr_set.getElementsByTagName("td")[4].innerHTML = a.toString() + "/" + b.toString();
				//5-5-4. 세트 이름 스타일 변경
					//5-5-4-1. 진행중
					var tr_name = (tr_set.getElementsByTagName("td")[0].innerText || tr_set.getElementsByTagName("td")[0].textContent);
					if (a < b) {
						tr_set.getElementsByTagName("td")[0].innerHTML = tr_name;
						tr_set.getElementsByTagName("td")[5].innerHTML = "";
					//5-5-4-2. 완성
					} else {
						tr_set.getElementsByTagName("td")[0].innerHTML = "<span class='epic'>" + tr_name + "</span>"
					//5-5-4-2-1. (완성 시 한정) 세트 첫 획득 지정
						tr_set.getElementsByTagName("td")[5].innerHTML = "\
							" + thousand(count) + "회차\
							<span class='cost'><br/>(초대장 : " + thousand(cost[0]) + "\
							<br/>/ 실질 : " + thousand(cost[1]) + ")";
					}
				//5-5-5. (a가 0보다 크면) 세트 가시화
				if (a > 0) {
					removeClass(tr_set,"not_show");
					addClass(tr_set,"show");
				} else {
					removeClass(tr_set,"show");
					addClass(tr_set,"not_show");
				}
			
			}
		}
		
		
	}

	//craft에서 아이템 제작
	function make(num,amount) {
		//0-1. 코스모 소울 수량 체크 (부족하면 취소)
		if (get[3] < soulCount(itemList[num][3])) {
			alert("※경고 : 코스모 소울이 부족합니다.\n(필요량 : " + thousand(soulCount(itemList[num][3])) + "개, 보유량 : " + thousand(get[3]) + "개)");
			return;
		}
		//0-2. 정말로 제작할지 질문
		if (!confirm("'" + itemList[num][4] + "' 을(를) " + amount.toString() + "개 제작하시겠습니까?\n(코스모소울 소모량 : " + thousand(soulCount(itemList[num][3])) + "개 / 보유량 : " + thousand(get[3]) + "개)")) {
			return;
		}
		//0-3. 에픽 도감 - 해당 아이템 찾아두기
		var tr_craft = document.getElementById("craft_row_" + num);
		//1. 코스모소울 차감
		get[3] -= soulCount(itemList[num][3]);
		$result_soul_have.innerHTML = thousand(get[3]);
			//보유량이 0이 되면 - 해체 버튼 비활성화
			if (get[3] == 0) {
				$result_button_soulDisassemble.disabled = "disabled";
				$result_button_soulDisassemble.value = "없음";
			}
		//2. 에픽 조각 차감
		itemList[num][13] -= maxJogak;
		if (itemList[num][13] < maxJogak) {
			//필요 조각 수 미만 보유 시
			tr_craft.getElementsByTagName("td")[4].innerHTML = thousand(itemList[num][13]);
		} else {
			//필요 조각 수 이상 보유 시
			tr_craft.getElementsByTagName("td")[4].innerHTML = "<span class='yellow'>" + thousand(itemList[num][13]) + "</span>";
		}
		//3. (에픽 조각 차감 후 조각 수가 0일 경우) 에픽 도감 - 해당 아이템 비가시화
		if (itemList[num][13] == 0) {
			removeClass(tr_craft,"show");
			addClass(tr_craft,"not_show");
		}
		//3. (에픽 조각 차감 후 제작이 불가능할 경우) 에픽 도감 - 해당 아이템 제작 버튼 해제
		if (itemList[num][13] < maxJogak) {
			removeClass(tr_craft,"available");
			tr_craft.getElementsByTagName("td")[5].className = "col_6";
			tr_craft.getElementsByTagName("td")[5].innerHTML = "불가";
			tr_craft.getElementsByTagName("td")[5].onclick = "";
		}
		//4. 에픽 도감 창 닫기
		shift("");
		//5. 필드 아이템 정리
		for (var i=0;i<maxQuantity;i++) {
			//아이템 루팅 시작 위치로 이동
			document.getElementById("item" + i.toString()).style.top = startList[input[0]][0].toString() + "px";
			document.getElementById("item" + i.toString()).style.left = startList[input[0]][1].toString() + "px";
			
			//아이템 이름 숨기기&이동, 이미지 숨기기
			document.getElementById("description" + i.toString()).className = "description";
			document.getElementById("item_name" + i.toString()).className = "item_name";
			document.getElementById("item_name" + i.toString()).style.visibility = "hidden";
				document.getElementById("description" + i.toString()).style.left = "0px";
			document.getElementById("item_img" + i.toString()).style.visibility = "hidden";
			
			//에픽 이펙트 숨기기
			document.getElementById("effect_appear" + i.toString()).style.visibility = "hidden";
			document.getElementById("effect_land" + i.toString()).style.visibility = "hidden";
			document.getElementById("effect_wait" + i.toString()).style.visibility = "hidden";
			
			//애니메이션 정지
			clearTimeout(autoLooting[i-1]);
			clearTimeout(autoEffect["appear"][i-1]);
			clearTimeout(autoEffect["land"][i-1]);
			clearTimeout(autoEffect["wait"][i-1]);
			document.getElementById("item_img"+ i.toString()).className = "item_img";
		}
		//6. 아이템 드롭
		var point = Math.floor(Math.random() * coopList[input[0]].length);
		var list = coopList[input[0]];
		getItem("완성", itemList[num],point,list);
	}


//=================================================================================================================
//※ 함수 - 애니메이션
//=================================================================================================================
//아이템 루팅
function looting(type, zone, zoneArr, step, sound, animating, leftMove, topMove, topMoveModify) {
	
	if (step == 1) {
		var leftMove = zoneArr[zone][0];
		var topMove = zoneArr[zone][1];
		var topMoveModify = 5;//5로 고정
	}
	
	if (step < 12) {
		
		document.getElementById("item" + zone.toString()).style.left = (document.getElementById("item" + zone.toString()).offsetLeft + leftMove).toString() + "px";
		document.getElementById("item" + zone.toString()).style.top = (document.getElementById("item" + zone.toString()).offsetTop - topMove).toString() + "px";
		
		step += 1;
		topMove -= topMoveModify;
		
		autoLooting[zone-1] = setTimeout(function() {
			looting(type, zone, zoneArr, step, sound, animating, leftMove, topMove, topMoveModify);
		},50);
	} else {
		//사운드 출력
		if (sound == 1) {
			try {
				if ($filter_sound.checked) {
					sound_land.pause();
					sound_land.currentTime = 0;
					sound_land.play();
				}
			} catch(e) {
			}
		}
		
		//이미지 회전 중단
		document.getElementById("item_img"+ zone.toString()).className = "item_img shadow";
		
		//버튼 활성화
		dropCount += 1;
		if (dropCount == quantity) {//모든 아이템 드랍 완료
			running = 0;
			onoff(0);
		}
		
		//애니메이션 지속
		if (animating == 1) {
			//착지 이펙트 가시화
			document.getElementById("effect_land" + zone.toString()).style.left = (-302).toString() + "px";
			document.getElementById("effect_land" + zone.toString()).style.top = (-161+25+(document.getElementById("item_img" + zone.toString()).offsetHeight/2)).toString() + "px";
			document.getElementById("effect_land" + zone.toString()).style.visibility = "visible";
			animation(document.getElementById("effect_land" + zone.toString()),"land",zone,604,0,-4227,150,0);
						
			//대기 이펙트 가시화
			document.getElementById("effect_wait" + zone.toString()).style.left = (-99).toString() + "px";
			document.getElementById("effect_wait" + zone.toString()).style.top = (-98+25+(document.getElementById("item_img" + zone.toString()).offsetHeight/2)).toString() + "px";
			document.getElementById("effect_wait" + zone.toString()).style.visibility = "visible";
			animation(document.getElementById("effect_wait" + zone.toString()),"wait",zone,188,0,-2255,100,1);
		}
	}
}

//에픽 드랍 이펙트 출력
function animation(target,type,zone,frameWidth,now,limit,speed,repeat) {
	if (now - frameWidth >= limit) {
		target.style.backgroundPosition = (now - frameWidth).toString() + "px 0px";
		autoEffect[type][zone-1] = setTimeout(function() {
			animation(target,type,zone,frameWidth,now - frameWidth,limit,speed,repeat);
		}, speed);
	} else if (repeat == 1){
		target.style.backgroundPosition = "0px 0px";
		autoEffect[type][zone-1] = setTimeout(function() {
			animation(target,type,zone,frameWidth,0,limit,speed,repeat);
		}, speed);
	} else {
		target.style.visibility = "hidden";
	}
}

//=================================================================================================================
//※ 함수 - 기타 (버튼 변경, 창 변경)
//=================================================================================================================
//버튼 변경
function onoff(num) {
	switch (num) {
		case 0:
			$start1.disabled = "";
			$start2.disabled = "";
			
			$start1.value = "1회 실행";
			$start2.value = "탐색 실시";
			
			$dungeon.disabled = "";
			$difficulty.disabled = "";
			$channel.disabled = "";
			
			$objective_list.disabled = "";
				$objective_item_first.disabled = "";
				if ($objective_item_first.value != "") {
					$objective_item_second.disabled = "";
				}
				if ($objective_item_second.value != "") {
					$objective_item_third.disabled = "";
				}
				if ($objective_item_third.value != "") {
					$objective_item_name.disabled = "";
				}
				
				$objective_set_first.disabled = "";
				if ($objective_set_first.value != "") {
					$objective_set_name.disabled = "";
				}
				$objective_count_text.disabled = "";
				$objective_cost_text.disabled = "";
				$objective_fatigue_max.disabled = "";
				$objective_fatigue_per.disabled = "";
			
			$reset.disabled = "";
			break;
		case 1:
			$start1.disabled = "disabled";
			$start2.disabled = "disabled";
			
			$start1.value = "실행 중";
			
			$dungeon.disabled = "disabled";
			$difficulty.disabled = "disabled";
			$channel.disabled = "disabled";
			
			$objective_list.disabled = "disabled";
			$objective_item_first.disabled = "disabled";
			$objective_item_second.disabled = "disabled";
			$objective_item_third.disabled = "disabled";
			$objective_item_name.disabled = "disabled";
			$objective_set_first.disabled = "disabled";
			$objective_set_name.disabled = "disabled";
			$objective_count_text.disabled = "disabled";
			$objective_cost_text.disabled = "disabled";
			$objective_fatigue_max.disabled = "disabled";
			$objective_fatigue_per.disabled = "disabled";
			
			$reset.disabled = "disabled";
			break;
		case 2:
			$start1.disabled = "disabled";
			$start2.disabled = "";
			
			$start2.value = "탐색 중지";
			
			$dungeon.disabled = "disabled";
			$difficulty.disabled = "disabled";
			$channel.disabled = "disabled";
			
			$objective_list.disabled = "disabled";
			$objective_item_first.disabled = "disabled";
			$objective_item_second.disabled = "disabled";
			$objective_item_third.disabled = "disabled";
			$objective_item_name.disabled = "disabled";
			$objective_set_first.disabled = "disabled";
			$objective_set_name.disabled = "disabled";
			$objective_count_text.disabled = "disabled";
			$objective_cost_text.disabled = "disabled";
			$objective_fatigue_max.disabled = "disabled";
			$objective_fatigue_per.disabled = "disabled";
			
			$reset.disabled = "disabled";
			break;
		case 2.5:
			$start1.disabled = "disabled";
			$start2.disabled = "disabled";
			
			$start2.value = "확인 중";
			
			break;
	}
}

//창 변경
function shift(target) {
	switch (target) {
		case "":
			right_display = "none";
			$popup.style.display = "none";
			$checkbox.style.display = "none";
			
			$shift1.className = "";
			$shift2.className = "";
			$shift3.className = "";
			$shift4.className = "";
			
			$shift1.value = "획득 기록";
			$shift2.value = "인벤토리";
			$shift3.value = "세트 아이템";
			$shift4.value = "도감";
			
			break;
		case "record":
			right_display = "record";
			$popup.style.display = "block";
			$checkbox.style.display = "block";
			
			$popup_title.className = "title_record";//클래스 설정 이유 : 배경이미지 변경
			$popup_title.innerHTML = "획득 기록";
			
			$shift1.className = "selected";
			$shift2.className = "";
			$shift3.className = "";
			$shift4.className = "";
			
			$shift1.value = "창 닫기";
			$shift2.value = "인벤토리";
			$shift3.value = "세트 아이템";
			$shift4.value = "도감";
			
			$record_filter.style.display = "block";
			$inventory_filter.style.display = "none";
			$set_filter.style.display = "none";
			$craft_filter.style.display = "none";
			
			$record.style.display = "block";
			$inventory.style.display = "none";
			$set.style.display = "none";
			$craft.style.display = "none";
			
			$record_check.style.display = "block";
			$inventory_check.style.display = "none";
			$set_check.style.display = "none";
			$craft_check.style.display = "none";
			
			//최신 내용 업데이트 (최신 업데이트 회차가 현 회차와 다를 경우)
			if ($record.innerHTML != content_text[0]) {
				//내용 업데이트
				$record.innerHTML = content_text[0];
				//스크롤바 이동
				$record.scrollTop = $record.scrollHeight;
			}
			
			//화면 스크롤
			$record.scrollTop = $record.scrollHeight;
			
			break;
		case "inventory":
			right_display = "inventory";
			$popup.style.display = "block";
			$checkbox.style.display = "block";
			
			$popup_title.className = "title_inventory";//클래스 설정 이유 : 배경이미지 변경
			$popup_title.innerHTML = "인벤토리";
			
			$shift1.className = "";
			$shift2.className = "selected";
			$shift3.className = "";
			$shift4.className = "";
			
			$shift1.value = "획득 기록";
			$shift2.value = "창 닫기";
			$shift3.value = "세트 아이템";
			$shift4.value = "도감";
			
			$record_filter.style.display = "none";
			$inventory_filter.style.display = "block";
			$set_filter.style.display = "none";
			$craft_filter.style.display = "none";
			
			$record.style.display = "none";
			$inventory.style.display = "block";
			$set.style.display = "none";
			$craft.style.display = "none";
			
			$record_check.style.display = "none";
			$inventory_check.style.display = "block";
			$set_check.style.display = "none";
			$craft_check.style.display = "none";
			
			break;
		case "set":
			right_display = "set";
			$popup.style.display = "block";
			$checkbox.style.display = "block";
			
			$popup_title.className = "title_set";//클래스 설정 이유 : 배경이미지 변경
			$popup_title.innerHTML = "세트 아이템";
			
			$shift1.className = "";
			$shift2.className = "";
			$shift3.className = "selected";
			$shift4.className = "";
			
			$shift1.value = "획득 기록";
			$shift2.value = "인벤토리";
			$shift3.value = "창 닫기";
			$shift4.value = "도감";
			
			$record_filter.style.display = "none";
			$inventory_filter.style.display = "none";
			$set_filter.style.display = "block";
			$craft_filter.style.display = "none";
			
			$record.style.display = "none";
			$inventory.style.display = "none";
			$set.style.display = "block";
			$craft.style.display = "none";
			
			$record_check.style.display = "none";
			$inventory_check.style.display = "none";
			$set_check.style.display = "block";
			$craft_check.style.display = "none";
			
			break;
		case "craft":
			right_display = "craft";
			$popup.style.display = "block";
			$checkbox.style.display = "block";
			
			$popup_title.className = "title_craft";//클래스 설정 이유 : 배경이미지 변경
			$popup_title.innerHTML = "에픽 도감";
			
			$shift1.className = "";
			$shift2.className = "";
			$shift3.className = "";
			$shift4.className = "selected";
			
			$shift1.value = "획득 기록";
			$shift2.value = "인벤토리";
			$shift3.value = "세트 아이템";
			$shift4.value = "닫기";
			
			$record_filter.style.display = "none";
			$inventory_filter.style.display = "none";
			$set_filter.style.display = "none";
			$craft_filter.style.display = "block";
			
			$record.style.display = "none";
			$inventory.style.display = "none";
			$set.style.display = "none";
			$craft.style.display = "block";
			
			$record_check.style.display = "none";
			$inventory_check.style.display = "none";
			$set_check.style.display = "none";
			$craft_check.style.display = "block";
			
			break;
	}
}