	//=================================================================================================================
	//※ 함수 - 선로딩, 기능 보충
	//=================================================================================================================
					// 자바스크립트 불러오기
					function loadJs(fileName, callBack){
						var script = document.createElement("script")
						script.type = "text/javascript";
						
						if (script.readyState){  //IE
							script.onreadystatechange = function(){
								if (script.readyState == "loaded" ||
										script.readyState == "complete"){
									script.onreadystatechange = null;
									callBack();
								}
							};
						} else {  //Others
							script.onload = function(){
								callBack();
							};
						}

						script.src = fileName;
						script.async = true;
						document.getElementsByTagName("head")[0].appendChild(script);
					}

					// 이미지 불러오기 (원본 //출처 : http://stackoverflow.com/questions/8264528/image-preloader-javascript-that-supports-eventNames/8265310#8265310)
					function loadImages(arr,callBack){
						
						setTimeout(function() {
							
						}, 1000);
						
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
					
					//특정 클래스 지우기
					function removeClass(target,toErase) {
						target.className = target.className.replace( new RegExp('(?:^|\\s)'+toErase+'(?!\\S)') ,'');
					}
					
					//특정 select 비우기
					function clearSelect(selectbox)
					{
						var i;
						for(i=selectbox.options.length-1;i>=0;i--)
						{
							selectbox.remove(i);
						}
					}
//=================================================================================================================
//※ 함수 - 내부작업용
//=================================================================================================================
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
//※ 함수 - 창 생성용
//=================================================================================================================
//인벤토리 창 생성
function generateInventory() {
	var tempArr = [];
	for (i=0;i<itemList.length;i++) {
		if (itemList[i][4] != "") {
			var row = _inventory_table.insertRow(-1);
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
					var row = _set_table.insertRow(-1);
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
				var row = _set_table.insertRow(-1);
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

//결과물 창 생성
function generateShow() {
	maxQuantity = 0;
	for (var i=0;i<dropQuantityList.length;i++) {
		for (var j=0;j<dropQuantityList[i].length;j++) {
			if (maxQuantity < dropQuantityList[i][j]) {
				maxQuantity = dropQuantityList[i][j];
			}
		}
	}
	
	for (var i=0;i<maxQuantity;i++) {
		_show_display.innerHTML += "<div id='show_img_no" + i.toString() + "' class='show_img' ></div>";
		_show_display.innerHTML += "<div id='show_name_no" + i.toString() + "' class='show_name'></div>";
		_show_display.innerHTML += "<div id='show_level_no" + i.toString() + "' class='show_level'></div>";
		if (i+1 != maxQuantity) {
			_show_display.innerHTML += "<br />";
		}
	}

}
//=================================================================================================================
//※ 함수 - 작동용
//=================================================================================================================

//던전 선택
function dungeon_select() {
	//1. 변수 조절
	input[0] = parseInt(_dungeon.value);
	//2-1. 레벨 출력
	temp = levelList[parseInt(_dungeon.value)];
	_dungeon_level.innerHTML = "";
	for (i=0;i<temp.length;i++) {
		_dungeon_level.innerHTML += temp[i].toString();
		if (i < temp.length-1) {
			_dungeon_level.innerHTML += ", ";
		}
	}
	//2-2초대장 소모 출력
	_dungeon_cost.innerHTML = "";
	_dungeon_cost.innerHTML += costList[_dungeon.value].toString();
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
function simulate(num) {
	//=================================
	//* 사전 : 던전 입장
	//=================================
		//0. 입장 - 초대장 소모
			//0-1. 소모한 초대장 수 증가
			cost[0] += costList[input[0]];//총 소모
			cost[1] += costList[input[0]];//실질 소모
			//0-2. 소모한 초대장 수 반영
			_cost_invitation.innerHTML = thousand(cost[0]);
			_cost_real.innerHTML = thousand(cost[1]);
			_cost_gold.innerHTML = setWon(cost[0]*gold);
			_cost_gold_real.innerHTML = setWon(cost[1]*gold);
		//1. 도전 - 결과물 창 비우기
		resetShow();
	//=================================
	//* 본격 : 클리어 후 아이템 확인
	//=================================
		//2. 난이도 결정
		input[1] = rand(chanceList2_num[0]);
			//2-1. 난이도에 따른 아이템 드랍량 결정 (dropQuantityList 참고)
			var quantity =  dropQuantityList[input[1]][Math.floor(Math.random() * dropQuantityList[input[1]].length)];//
		//3. 난이도, 회차 표시
		_message_count.innerHTML = thousand(count);
		_message_difficulty.innerHTML = chanceList2_name[0][input[1]];
		//4. 아이템 드랍량 만큼 drop() 실시
		getItem(0, quantity, num);
}

	//아이템 결정, 이후 드롭
	function getItem(now, quantity, num) {//quantity : 남은 드롭량 : 
		//1. 등급 결정
		input[2] = chanceList2_name[1][input[1]][_difficulty.value.toString()][rand(chanceList2_num[1][input[1]][_difficulty.value.toString()])];
			//IF : 에픽이 아니면 : 드롭
			if (input[2] != "에픽") {
				drop(now, input[2]);
				//해당 사이클 종료, 재실행 여부 결정
				getItemCycle(now, quantity, num);
				return;
			};
		//2. 고유에픽 결정
		input[3] = chanceList2_name[2][rand(chanceList2_num[2])];
			//IF : 고유 에픽이면 : 드롭
			if (input[3] == "고유에픽") {
				//IF : 고유 에픽 리스트가 비어있지 않다면 : 드롭
				if (currentList_goyu.length > 0) {
					drop(now, input[3]);
					//해당 사이클 종료, 재실행 여부 결정
					getItemCycle(now, quantity, num);
					return;
				}
			};
		//3. 종류 결정
		input[4] = chanceList2_name[3][rand(chanceList2_num[3])];
		//4. 레벨 결정 (가중치 = 각 종류&레벨별 아이템 개수, '죽성'은 가중치를 더함)
			//4-1. 레벨 종류만큼 칸 설정
			currentList_level = [];
			for (i=0;i<levelList[input[0]].length;i++) {
				currentList_level.push(0);
			}
			//4-2. 해당 칸은 특정 레벨 & 특정 장비의 개수만큼 숫자가 증가
			for (i=0;i<currentList.length;i++) {
				for (j=0;j<levelList[input[0]].length;j++) {
					//앞에서 선택된 장비이고 레벨이 맞을 경우, 해당 레벨 칸 +1
					if ((currentList[i][0] == input[4] //무기, 방어구 전용 : 대분류
					|| currentList[i][1] == input[4])//악세사리, 특수장비 : 1차 소분류
					&& currentList[i][3] == levelList[input[0]][j]) {
						currentList_level[j] += 1;
					}
				}
			}
			//4-3. 추가 가중치 계산
			for (i=0;i<chanceList2_num[4].length;i++) {
				if (chanceList2_num[4][i][0].indexOf(input[0]) != -1) {
					for (j=0;j<currentList_level.length;j++) {
						currentList_level[j] = currentList_level[j] * chanceList2_num[4][i][1][j];
					}
					break;
				}
			}
		input[5] = levelList[input[0]][rand(currentList_level)];
		//5. 인풋을 바탕으로 드롭
		drop(now, input[2]);//('에픽')을 전송, 나머진 drop()에서 해결
		//해당 사이클 종료, 재실행 여부 결정
		getItemCycle(now, quantity, num);
		return;
	}
	
		//아이템 드롭 이후 getItem 재실행 여부 결정
		function getItemCycle(now, quantity, num) {//<now : 현재 출력한 개수, quantity : 최대 출력 개수, num : 명령어>
			if (now+1 < quantity) {
				if (num == 1) {//IF : '1번 실행'을 클릭했을 경우
					autoDrop = setTimeout(function() {//일정 딜레이 이후 재실행
						getItem(now+1, quantity, num);
					}, 40);
				} else {//IF : '연속 실행' 또는 '탐색 시작'을 클릭했을 경우
					getItem(now+1, quantity, num);//즉각 재실행
				}
			} else {//IF : 드랍 완료 시
				//1. 회차 증가
				count += 1;
					
				//2. 차후 일정
				if (num == 1) {//2-1. 1번 실행
					thisTime = []//'이번에 드랍한 아이템' 초기화
					onoff(0);
				} else if (num == 2) {//2-2. 연속 실행
					//2-2--1. 답변 체크용 임시 변수
					var out = 0;//(1보다 크면 종료 조건 충족)
					//2-2-0. 조건 없음
					if (objective[0] == "none") {
						if (running == 1) {//'자동 실행 변수'가 ON일때만 반응
							thisTime = []//'이번에 드랍한 아이템' 초기화
							autoRun = setTimeout(function() {
								simulate(2);
							}, 25);
							return;
						} else {
							//뒷처리
							clearTimeout(autoRun);//자동실행 해제
							running = 0;//'자동 실행 변수' OFF
							thisTime = [];//'이번에 드랍한 아이템' 초기화
							objective = []//목표 초기화
							onoff(0);
						}
					//2-2-1. 에픽 아이템 탐색
					} else if (objective[0] == "item") {
						if (thisTime.length > 0) {
							for (i=0;i<thisTime.length;i++) {
								if (objective[4] == thisTime[i][4]) {//아이템 명칭
									var showing = thisTime[i][4];
									out += 1;
								} else if (objective[4] == "" && objective[3] == thisTime[i][2]) {//3차 분류
									var showing = thisTime[i][4] + " (모든 " + objective[3] + " 아이템)";
									out += 1;
								} else if (objective[4] == "" && objective[3] == "" && objective[2] == thisTime[i][1]) {//2차 분류
									var showing = thisTime[i][4] + " (모든 " + objective[2] + " 아이템)";
									out += 1;
								} else if (objective[4] == "" && objective[3] == "" && objective[2] == "" && objective[1] == thisTime[i][0]) {//1차 분류
									var showing = thisTime[i][4] + " (모든 " + objective[1] + " 아이템)";
									out += 1;
								} else if (objective[4] == "" && objective[3] == "" && objective[2] == "" && objective[1] == "") {//'무조건'
									var showing = thisTime[i][4] + " (모든 에픽 아이템 )";
									out += 1;
								}
								if (out > 0) {
									//출력용 답변 기억
									break;
								}
							}
						}
					//2-2-2. 세트 완성
					} else if (objective[0] == "set") {
						var out = 0;

						if (objective[1] == "") {//'모든 세트'가 목표일 경우

							temp2 = _set_table.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
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
							temp2 = _set_table.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
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
							temp2 = _set_table.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
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
					//2-2-3. 실행 횟수
					} else if (objective[0] == "count") {
						if (objective[2] + 1 >= objective[1]) {
							var showing = (objective[2] + 1).toString() + "회 실행";
							out += 1;
						} else {
							objective[2] += 1;
						}
					//2-2-4. 초대장 제한
					} else if (objective[0] == "cost") {
						if (objective[2] + (costList[input[0]]*2) > objective[1]) {
							var showing = objective[1].toString() + "장 중 " + (objective[2] + costList[input[0]]).toString() + "장 사용 \
								(총 " + Math.floor(objective[1]/costList[input[0]]).toString() + "회 실행)";
							out += 1;
						} else {
							objective[2] += costList[input[0]];
						}
					//2-2-5. 피로도 제한
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
						_record.innerHTML += "<span class='system'>====================&lt;연속 실행 종료&gt;====================</span>";
						_record.innerHTML += "<span class='system'>※ 종료 조건 : " + _objective_list.options[_objective_list.selectedIndex].text + " － " + showing + "</span>";
						_record.innerHTML += "<span class='system'>======================================================</span>";
						//final. 스크롤바 이동 (종료 메세지가 보이도록)
						_record.scrollTop = _record.scrollHeight;
						//뒷처리
						running = 0;//'자동 실행 변수' OFF
						thisTime = [];//'이번에 드랍한 아이템' 초기화
						objective = []//목표 초기화
						onoff(0);//잠긴 버튼 복구
					//미달성 시
					} else {
						if (running == 1) {//'자동 실행 변수'가 ON일때만 반응
							thisTime = []//'이번에 드랍한 아이템' 초기화
							autoRun = setTimeout(function() {
								simulate(2);
							}, 25);
						}
					}
						
				}
			}
		}
	
	//아이템 드롭
	function drop(now, item) {
		switch (item) {
		//1. 언커먼
			case "언커먼":
			//출력
				//_show_display.innerHTML += "<img src = '" + images + "3_언커먼.png' alt='언커' />";//하단 : 다음 마이피 버전
				//_show_display.innerHTML += "<img src = 'http://img2.ruliweb.daum.net/mypi/gup/a/125/4/o/3771057031.jpg' alt='언커' />";
				//_show_display.innerHTML += "<div class='show_name uncommon'>언커먼 아이템</div>";
				//_show_display.innerHTML += "<div class='show_level'>" + levelList[input[0]][Math.floor(Math.random() * levelList[input[0]].length)] + "</div> <br />";
				
				document.getElementById("show_img_no" + now.toString()).className = "show_img show";
				document.getElementById("show_name_no" + now.toString()).className = "show_name show uncommon";
				document.getElementById("show_level_no" + now.toString()).className = "show_level show";
				
				document.getElementById("show_img_no" + now.toString()).style.backgroundPosition = spritePosition("언커먼",1);
				document.getElementById("show_name_no" + now.toString()).innerHTML = "언커먼 아이템";
				document.getElementById("show_level_no" + now.toString()).innerHTML = levelList[input[0]][Math.floor(Math.random() * levelList[input[0]].length)].toString();
				break;
		//2. 마봉
			case "마봉":
			//출력
				//_show_display.innerHTML += "<img src = '" + images + "3_마봉.png' alt='마봉' />";//하단 : 다음 마이피 버전
				//_show_display.innerHTML += "<img src = 'http://img2.ruliweb.daum.net/mypi/gup/a/125/4/o/3771057020.jpg' alt='마봉' />";
				//_show_display.innerHTML += "<div class='show_name rare'>마법으로 봉인된 레어 아이템</div>";
				//_show_display.innerHTML += "<div class='show_level'>" + levelList[input[0]][Math.floor(Math.random() * levelList[input[0]].length)] + "</div> <br />";
				
				document.getElementById("show_img_no" + now.toString()).className = "show_img show";
				document.getElementById("show_name_no" + now.toString()).className = "show_name show rare";
				document.getElementById("show_level_no" + now.toString()).className = "show_level show";
				
				document.getElementById("show_img_no" + now.toString()).style.backgroundPosition = spritePosition("마봉",1);
				document.getElementById("show_name_no" + now.toString()).innerHTML = "마법으로 봉인된 레어 아이템";
				document.getElementById("show_level_no" + now.toString()).innerHTML = levelList[input[0]][Math.floor(Math.random() * levelList[input[0]].length)].toString();
				break;
		//3. 코스모 소울
			case "코스모소울":
				//_show_display.innerHTML += "<img src = '" + images + "3_코스모소울.png' alt='소울' />";//하단 : 다음 마이피 버전
				//_show_display.innerHTML += "<img src = 'http://img2.ruliweb.daum.net/mypi/gup/a/125/4/o/3771057034.jpg' alt='소울' />";
				//_show_display.innerHTML += "<div class='show_name unique'>코스모 소울</div>";
				//_show_display.innerHTML += "<div class='show_level'>-</div> <br />";
				
				document.getElementById("show_img_no" + now.toString()).className = "show_img show";
				document.getElementById("show_name_no" + now.toString()).className = "show_name show epic";
				document.getElementById("show_level_no" + now.toString()).className = "show_level show";
				
				document.getElementById("show_img_no" + now.toString()).style.backgroundPosition = spritePosition("코스모소울",1);
				document.getElementById("show_name_no" + now.toString()).innerHTML = "코스모 소울";
				document.getElementById("show_level_no" + now.toString()).innerHTML = "-";
				
				//드랍한 아이템 '이름으로' 업데이트
				update("코스모소울");
				break;
		//4. 지옥구슬
			case "지옥구슬":
				//_show_display.innerHTML += "<img src = '" + images + "3_지옥구슬.png' alt='구슬' />";//하단 : 다음 마이피 버전
				//_show_display.innerHTML += "<img src = 'http://img2.ruliweb.daum.net/mypi/gup/a/125/4/o/3771057033.jpg' alt='구슬' />";
				//_show_display.innerHTML += "<div class='show_name unique'>" + areaList[input[0]] + " 지옥 구슬</div>";
				//_show_display.innerHTML += "<div class='show_level'>-</div> <br />";
				
				document.getElementById("show_img_no" + now.toString()).className = "show_img show";
				document.getElementById("show_name_no" + now.toString()).className = "show_name show unique";
				document.getElementById("show_level_no" + now.toString()).className = "show_level show";
				
				document.getElementById("show_img_no" + now.toString()).style.backgroundPosition = spritePosition("지옥구슬",1);
				document.getElementById("show_name_no" + now.toString()).innerHTML = areaList[input[0]] + " 지옥 구슬";
				document.getElementById("show_level_no" + now.toString()).innerHTML = "-";
				
				//드랍한 아이템 '이름으로' 업데이트
				update("지옥구슬");
				break;
		//5. 고유 에픽
			case "고유에픽":
				//미리 구축된 현재지역 고유에픽 리스트(currentList_goyu)에서 랜덤으로 선정
				temp = currentList_goyu[Math.floor(Math.random() * currentList_goyu.length)];
				//아이콘 결정 & 출력
					//0.아이콘 칸 가시화
					document.getElementById("show_img_no" + now.toString()).className = "show_img show";
					
					//1. 이름으로 검색
					if (icon[0].indexOf(temp[7]) != -1) {
						document.getElementById("show_img_no" + now.toString()).style.backgroundPosition = spritePosition(temp[7],1);
					//2. 장비 종류로 검색 (무기 : 3차 분류 / 나머지 : 2차 분류)
					} else if (icon[1].indexOf(temp[1]) != -1 || icon[1].indexOf(temp[2]) != -1 ) {
						//2-1. 무기
						if (temp[0] == "방어구") {
							//_show_display.innerHTML += "<img src='" + images + "2_" + temp[1] + ".png'>";
							document.getElementById("show_img_no" + now.toString()).innerHTML += "<img src='" + images + "2_" + temp[1] + ".png'>";
						//2-2. 방어구, 장신구, 특수장비
						} else {
							//_show_display.innerHTML += "<img src='" + images + "3_" + temp[2] + ".png'>";
							document.getElementById("show_img_no" + now.toString()).innerHTML += "<img src='" + images + "2_" + temp[2] + ".png'>";
						}
					//3. 그냥 '에픽' 아이콘 사용
					} else {
						//_show_display.innerHTML += "<img src='" + images + "3_에픽.png'>";//하단 : 다음 마이피 버전
						//_show_display.innerHTML += "<img src='http://img2.ruliweb.daum.net/mypi/gup/a/125/4/o/3771057032.jpg'>";
						document.getElementById("show_img_no" + now.toString()).innerHTML += "<img src='http://img2.ruliweb.daum.net/mypi/gup/a/125/4/o/3771057032.jpg'>";
					}
				//이름, 레벨 출력
					//_show_display.innerHTML += "<div class='show_name epic'>" + temp[4] + "</div>";
					//_show_display.innerHTML += "<div class='show_level'>" + temp[3] + "</div> <br />";
				document.getElementById("show_name_no" + now.toString()).className = "show_name show epic";
				document.getElementById("show_level_no" + now.toString()).className = "show_level show";
				
				document.getElementById("show_name_no" + now.toString()).innerHTML = temp[4];
				document.getElementById("show_level_no" + now.toString()).innerHTML = temp[3];
				
				//'이번에 드랍한 아이템'에 이름 기록
				thisTime.push(temp);
				
				//드랍한 아이템 '정보로' 업데이트
				update(temp);
				break;
		//6. 에픽
			case "에픽":
				//1. 특정 종류&레벨의 아이템 리스트 구축
				tempArr = [];
				for (i=0;i<currentList.length;i++) {
					if ((currentList[i][0] == input[4]/*종류-무기*/
					|| currentList[i][1] == input[4]/*종류-방어구*/
					|| currentList[i][2] == input[4])/*종류-악세서리&특수장비*/
					&& currentList[i][3] == input[5])/*레벨*/ {
						tempArr.push(currentList[i]);
					}
				}
				//미리 리스트에서 랜덤으로 선정
				temp = tempArr[Math.floor(Math.random() * tempArr.length)];
				//아이콘 결정 & 출력
					//0.아이콘 칸 가시화
					document.getElementById("show_img_no" + now.toString()).className = "show_img show";
					
					//1. 이름으로 검색
					if (icon[0].indexOf(temp[7]) != -1) {
						document.getElementById("show_img_no" + now.toString()).style.backgroundPosition = spritePosition(temp[7],1);
					//2. 장비 종류로 검색 (무기 : 3차 분류 / 나머지 : 2차 분류)
					} else if (icon[1].indexOf(temp[1]) != -1 || icon[1].indexOf(temp[2]) != -1 ) {
						//2-1. 무기
						if (temp[0] == "방어구") {
							//_show_display.innerHTML += "<img src='" + images + "2_" + temp[1] + ".png'>";
							document.getElementById("show_img_no" + now.toString()).innerHTML += "<img src='" + images + "2_" + temp[1] + ".png'>";
						//2-2. 방어구, 장신구, 특수장비
						} else {
							//_show_display.innerHTML += "<img src='" + images + "3_" + temp[2] + ".png'>";
							document.getElementById("show_img_no" + now.toString()).innerHTML += "<img src='" + images + "2_" + temp[2] + ".png'>";
						}
					//3. 그냥 '에픽' 아이콘 사용
					} else {
						//_show_display.innerHTML += "<img src='" + images + "3_에픽.png'>";//하단 : 다음 마이피 버전
						//_show_display.innerHTML += "<img src='http://img2.ruliweb.daum.net/mypi/gup/a/125/4/o/3771057032.jpg'>";
						document.getElementById("show_img_no" + now.toString()).innerHTML += "<img src='http://img2.ruliweb.daum.net/mypi/gup/a/125/4/o/3771057032.jpg'>";
					}
				//이름, 레벨 출력
					//_show_display.innerHTML += "<div class='show_name epic'>" + temp[4] + "</div>";
					//_show_display.innerHTML += "<div class='show_level'>" + temp[3] + "</div> <br />";
				document.getElementById("show_name_no" + now.toString()).className = "show_name show epic";
				document.getElementById("show_level_no" + now.toString()).className = "show_level show";
				
				document.getElementById("show_name_no" + now.toString()).innerHTML = temp[4];
				document.getElementById("show_level_no" + now.toString()).innerHTML = temp[3];
				
				//'이번에 드랍한 아이템'에 이름 기록
				thisTime.push(temp);
				
				//드랍한 아이템 '정보로' 업데이트
				update(temp);
				break;
		}
	}
	

//right에 업데이트
function update(name) {
	//1. 획득/소비 수치 변경
	if (name == "코스모소울") {
		get[2] += 1;
		_result_soul.innerHTML = thousand(get[2]);//출력
		//실질 초대장 감소
		cost[1] -= cutList[0];
		_cost_real.innerHTML = thousand(cost[1]);
		_cost_gold_real.innerHTML = setWon(cost[1]*gold);
	} else if (name == "지옥구슬") {
		get[3] += 1;
		_result_beed.innerHTML = thousand(get[3]);//출력
		//실질 초대장 감소
		cost[1] -= cutList[1][input[0]];
		_cost_real.innerHTML = thousand(cost[1]);
	} else {//에픽
		num = 0;//순번 찾기
		for (i=0;i<itemList.length;i++) {
			if (itemList[i][4] == name[4]) {
				num = i;
				break;
			}
		};
		get[0] += 1;//획득 에픽
		get[1] += 1;//보유 에픽
		_result_epic.innerHTML = thousand(get[0]);//출력
		_result_epic_real.innerHTML = thousand(get[1]);//출력
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
			_inventory_check_collect.innerHTML = gathered.toString();
		}
	}

	
	//3. record에 기록
	if (name == "코스모소울") {//현재 기록하지 않음
		/*
		_record.innerHTML += "\
			<span class='etc'>" + thousand(count.toString()) + " 회차 [초대장 : " + thousand(cost[0]) + " (실질 : " + thousand(cost[1]) + ")]\
			<br />\
			<span class='unique'>　코스모 소울</span> [실질 소모 초대장 " + cutList[0] + "장 감소]<br/></span>";
		*/
	} else if (name == "지옥구슬") {//현재 기록하지 않음
		/*
		_record.innerHTML += "\
			<span class='etc'>" + thousand(count.toString()) + " 회차 [초대장 : " + thousand(cost[0]) + " (실질 : " + thousand(cost[1]) + ")]\
			<br />\
			<span class='unique'>　" + areaList[input[0]] + " 지옥 구슬</span> 실질 소모 초대장 " + cutList[1][input[0]] + "장 감소]<br/></span>";
		*/
	} else {//에픽
		if (name[0] == "방어구") {//방어구
			if (name[5] != "") {//세트 방어구
				_record.innerHTML += "\
					<span class='equip " + itemList[i][0] + " " + itemList[i][1] + " " + itemList[i][2] + " lv" + itemList[i][3].toString() + "'>" + thousand(count.toString()) + "회차 \
					<span class='cost'>(초대장 : " + thousand(cost[0]) + " / 실질 : " + thousand(cost[1]) + ")</span> \
					<span class='difficulty_" + input[1].toString() + "'> &lt;" + chanceList2_name[0][input[1]].toString() + "&gt;</span>\
					<br />\
					<span class='set'>　" + name[4] + "</span> [" + name[1] + " / " + name[3] + "제]\
					 <span class='quantity'>(x" + itemList[i][8] + ")</span><br/></span>";
			} else {//'비'세트 방어구
				_record.innerHTML += "\
					<span class='equip " + itemList[i][0] + " " + itemList[i][1] + " " + itemList[i][2] + " lv" + itemList[i][3].toString() + "'>" + thousand(count.toString()) + "회차 \
					<span class='cost'>(초대장 : " + thousand(cost[0]) + " / 실질 : " + thousand(cost[1]) + ")</span> \
					<span class='difficulty_" + input[1].toString() + "'> &lt;" + chanceList2_name[0][input[1]].toString() + "&gt;</span>\
					<br />\
					<span class='epic'>　" + name[4] + "</span> [" + name[1] + " / " + name[3] + "제]\
					 <span class='quantity'>(x" + itemList[i][8] + ")</span><br/></span>";
			}
		} else {//그외
			if (name[5] != "") {//세트 그외
				_record.innerHTML += "\
					<span class='equip " + itemList[i][0] + " " + itemList[i][1] + " " + itemList[i][2] + " lv" + itemList[i][3].toString() + "'>" + thousand(count.toString()) + "회차 \
					<span class='cost'>(초대장 : " + thousand(cost[0]) + " / 실질 : " + thousand(cost[1]) + ")</span> \
					<span class='difficulty_" + input[1].toString() + "'> &lt;" + chanceList2_name[0][input[1]].toString() + "&gt;</span>\
					<br />\
					<span class='set'>　" + name[4] + "</span> [" + name[2] + " / " + name[3] + "제] \
					 <span class='quantity'>(x" + itemList[i][8] + ")</span><br/></span>";
			} else {//'비'세트 그외
				_record.innerHTML += "\
					<span class='equip " + itemList[i][0] + " " + itemList[i][1] + " " + itemList[i][2] + " lv" + itemList[i][3].toString() + "'>" + thousand(count.toString()) + "회차 \
					<span class='cost'>(초대장 : " + thousand(cost[0]) + " / 실질 : " + thousand(cost[1]) + ")</span> \
					<span class='difficulty_" + input[1].toString() + "'> &lt;" + chanceList2_name[0][input[1]].toString() + "&gt;</span>\
					<br />\
					<span class='epic'>　" + name[4] + "</span> [" + name[2] + " / " + name[3] + "제] \
					<span class='quantity'>(x" + itemList[i][8] + ")</span><br/></span>";
			}
		}
	
	//4. inventory에 기록 (에픽 한정)
		var tr = document.getElementById("inventory_row_" + num);
		//4-1. 보유량 업데이트
		tr.getElementsByTagName("td")[4].innerHTML = itemList[num][9].toString();
		//4-2. 해체 버튼 활성화
		if (tr.getElementsByTagName("td")[4].innerHTML == "1") {
			tr.getElementsByTagName("td")[3].innerHTML = "\
				<a href='javascript:void(0);' onclick='recycle(" + num.toString() + ",1);' >해체</a>";
		}
		//4-3. 첫 획득 (없으면) 업데이트
		if (tr.getElementsByTagName("td")[4].innerHTML == "1") {
			tr.getElementsByTagName("td")[5].innerHTML = "\
				" + thousand(itemList[num][10]) + "회차\
				<span class='cost'><br/>(초대장 : " + thousand(itemList[num][11]) + "\
				<br/>/ 실질 : " + thousand(itemList[num][12]) + ")";
		}
		//4-4. 해당 아이템 (색깔 입혀서) 가시화
		if (name[5] != "") {//세트
			tr.getElementsByTagName("td")[0].innerHTML = "<span class='set'>" + tr.getElementsByTagName("td")[0].innerHTML + "</span>";
		} else {//그 외
			tr.getElementsByTagName("td")[0].innerHTML = "<span class='epic'>" + tr.getElementsByTagName("td")[0].innerHTML + "</span>";
		}
		while(1) {//"now_show" 클래스를 확실히 제거
			if (tr.className.indexOf("not_show") != -1) {
				removeClass(tr,"not_show");
			} else {
				break;
			}
		}
		while(1) {//"show" 클래스를 확실히 제거 (하나만 놔두기 위해)
			if (tr.className.indexOf("show") != -1) {
				removeClass(tr,"show");
			} else {
				break;
			}
		}
		tr.className += " show";
	//5. set에 기록 (에픽 한정, '세트 아이템' 한정)
		if (itemList[num][5] != "") {
			//5-0. set에서 해당하는 행 찾기
			temp2 = _set_table.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
			for (i=0;i<temp2;i++) {
				if (document.getElementById("set_row_" + i.toString()).getElementsByTagName("td")[0].innerHTML.indexOf(itemList[num][4]) != -1) {
					tr = document.getElementById("set_row_" + i.toString());
					break;
				}
			}
			//5-1. 보유량 업데이트
			tr.getElementsByTagName("td")[4].innerHTML = itemList[num][9].toString();
			//5-2. 해체 버튼 활성화
			if (tr.getElementsByTagName("td")[4].innerHTML == "1") {
				tr.getElementsByTagName("td")[3].innerHTML = "\
					<a href='javascript:void(0);' onclick='recycle(" + num.toString() + ",1);' >해체</a>";//inventory 기준으로 설정 (set에서 위치는 차후에 별도로 계산)
			}
			//5-3. 첫 획득 (없으면) 업데이트
			if (tr.getElementsByTagName("td")[4].innerHTML == "1") {
				tr.getElementsByTagName("td")[5].innerHTML = "\
					" + thousand(itemList[num][10]) + "회차\
					<span class='cost'><br/>(초대장 : " + thousand(itemList[num][11]) + "\
					<br/>/ 실질 : " + thousand(itemList[num][12]) + ")";
			}
			//5-4. 해당 아이템 (색깔 입혀서) 가시화
			tr.getElementsByTagName("td")[0].innerHTML = "<span class='set'>" + tr.getElementsByTagName("td")[0].innerHTML + "</span>";
			while(1) {//"now_show" 클래스를 확실히 제거
				if (tr.className.indexOf("not_show") != -1) {
					removeClass(tr,"not_show");
				} else {
					break;
				}
			}
			while(1) {//"show" 클래스를 확실히 제거 (하나만 놔두기 위해)
				if (tr.className.indexOf("show") != -1) {
					removeClass(tr,"show");
				} else {
					break;
				}
			}
			tr.className += " show";
			//5-5. '세트' 업데이트
			//5-5-1. 세트 지정
			temp2 = _set_table.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
			for (i=0;i<temp2;i++) {
				if (document.getElementById("set_row_" + i.toString()).getElementsByTagName("td")[0].innerHTML.indexOf(itemList[num][5]) != -1) {
					tr_set = document.getElementById("set_row_" + i.toString());
					break;
				}
			}
			//5-5-2. 세트 완성 현황 파악 및 반영
			var a = 0;//해당 세트 보유 파츠 수
			var b = 0;//해당 세트 총 파츠 수
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
				//5-5-4-2-1. (완성 '시' 한정) 세트 첫 획득 지정
					if (tr_set.getElementsByTagName("td")[5].innerHTML == "") {
						tr_set.getElementsByTagName("td")[5].innerHTML = "\
							" + thousand(count) + "회차\
							<span class='cost'><br/>(초대장 : " + thousand(cost[0]) + "\
							<br/>/ 실질 : " + thousand(cost[1]) + ")";
					}
				}
			//5-5-5. (a가 0보다 크면) 세트 가시화
			if (a > 0) {
				while(1) {//"now_show" 클래스를 확실히 제거
					if (tr_set.className.indexOf("not_show") != -1) {
						removeClass(tr_set,"not_show");
					} else {
						break;
					}
				}
				while(1) {//"show" 클래스를 확실히 제거 (하나만 놔두기 위해)
					if (tr_set.className.indexOf("show") != -1) {
						removeClass(tr_set,"show");
					} else {
						break;
					}
				}
				tr_set.className += " show";
			} else {
					while(1) {//"show" 클래스를 확실히 제거
						if (tr_set.className.indexOf("show") != -1) {
							removeClass(tr_set,"show");
						} else {
							break;
						}
					}
					while(1) {//"now_show" 클래스를 확실히 제거 (하나만 놔두기 위해)
						if (tr_set.className.indexOf("not_show") != -1) {
							removeClass(tr_set,"not_show");
						} else {
							break;
						}
					}
					tr_set.className += " not_show";
				}
		}
		//set 기록 끝

	//final. 스크롤바 이동
	_record.scrollTop = _record.scrollHeight;
	
	}
}

	//inventory, set에서 아이템 해체
	function recycle(num,amount) {
		//정말로 해체할지 질문
		if (!_inventory_check_confirm.checked && !_inventory_check_confirm.checked) {
			if (!confirm("'" + itemList[num][4] + "' 을(를) " + amount.toString() + "개 해체하시겠습니까?\n(보유 수량 : " + itemList[num][9].toString() + ")")) {
				return;
			}
		}
		//1. 실질 소모 초대장 감소
		cost[1] -= cutList[2]*amount;
		_cost_real.innerHTML = thousand(cost[1]);
		_cost_gold_real.innerHTML = setWon(cost[1]*gold);
		//2. 아이템 수량 감소
			//2-1. 해당 아이템 보유 갯수 amount만큼 감소
			itemList[num][9] -= amount;
			//2-2. 전체 에픽 보유 갯수 감소 & result에 표기
			get[1] -= amount;
			_result_epic_real.innerHTML = thousand(get[1]);//출력
			//2-3. inventory에 반영 (tr)
			var tr = document.getElementById("inventory_row_" + num);
			tr.getElementsByTagName("td")[4].innerHTML = itemList[num][9].toString();
			//2-4. set에 반영 (tr2) (세트 아이템 한정)
			if (itemList[num][5] != "") {
				temp2 = _set_table.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
				for (i=0;i<temp2;i++) {
					if (document.getElementById("set_row_" + i.toString()).getElementsByTagName("td")[0].innerHTML.indexOf(itemList[num][4]) != -1) {
						tr2 = document.getElementById("set_row_" + i.toString());
						break;
					}
				}
				tr2.getElementsByTagName("td")[4].innerHTML = itemList[num][9].toString();
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
			_inventory_check_collect.innerHTML = gathered.toString();
			//3-3. inventory 설정
				//3-3-1. inventory - '해체' 버튼 제거
				tr.getElementsByTagName("td")[3].innerHTML = "없음";
				//3-3-2. inventory - '첫 획득' 기록 제거
				tr.getElementsByTagName("td")[5].innerHTML = "";
				//3-3-3. inventory - 해당 아이템 (색깔 지우고) 가시화 해제
				tr.getElementsByTagName("td")[0].innerHTML = (tr.getElementsByTagName("td")[0].innerText || tr.getElementsByTagName("td")[0].textContent);
				while(1) {//"show" 클래스를 확실히 제거
					if (tr.className.indexOf("show") != -1) {
						removeClass(tr,"show");
					} else {
						break;
					}
				}
				while(1) {//"now_show" 클래스를 확실히 제거 (하나만 놔두기 위해)
					if (tr.className.indexOf("not_show") != -1) {
						removeClass(tr,"not_show");
					} else {
						break;
					}
				}
				tr.className += " not_show";
			//3-4. set 설정
			if (itemList[num][5] != "") {
				//3-4-1. inventory - '해체' 버튼 제거
				tr2.getElementsByTagName("td")[3].innerHTML = "없음";
				//3-4-2. inventory - '첫 획득' 기록 제거
				tr2.getElementsByTagName("td")[5].innerHTML = "";
				//3-4-3. inventory - 해당 아이템 (색깔 지우고) 가시화 해제
				tr2.getElementsByTagName("td")[0].innerHTML = (tr2.getElementsByTagName("td")[0].innerText || tr2.getElementsByTagName("td")[0].textContent);
				while (1) {//"show" 클래스를 확실히 제거
					if (tr2.className.indexOf("show") != -1) {
						removeClass(tr2,"show");
					} else {
						break;
					}
				}
				if (tr2.clasName != "not_show") {
					tr2.className += " not_show";
				}
				//3-5. set에서 '세트' 설정
				temp2 = _set_table.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
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
					while(1) {//"now_show" 클래스를 확실히 제거
						if (tr_set.className.indexOf("not_show") != -1) {
							removeClass(tr_set,"not_show");
						} else {
							break;
						}
					}
					while(1) {//"show" 클래스를 확실히 제거 (하나만 놔두기 위해)
						if (tr_set.className.indexOf("show") != -1) {
							removeClass(tr_set,"show");
						} else {
							break;
						}
					}
					tr_set.className += " show";
				} else {
					while(1) {//"show" 클래스를 확실히 제거
						if (tr_set.className.indexOf("show") != -1) {
							removeClass(tr_set,"show");
						} else {
							break;
						}
					}
					while(1) {//"now_show" 클래스를 확실히 제거 (하나만 놔두기 위해)
						if (tr_set.className.indexOf("not_show") != -1) {
							removeClass(tr_set,"not_show");
						} else {
							break;
						}
					}
					tr_set.className += " not_show";
				}
			
			}
		}
		
		
	}

//=================================================================================================================
//※ 함수 - 기타
//=================================================================================================================
//결과물 창 비우기
function resetShow() {
	for (var i=0;i<maxQuantity;i++) {
		document.getElementById("show_img_no" + i.toString()).className = "show_img";
		document.getElementById("show_name_no" + i.toString()).className = "show_name";
		document.getElementById("show_level_no" + i.toString()).className = "show_level";
	
		document.getElementById("show_img_no" + i.toString()).innerHTML = "";
		document.getElementById("show_name_no" + i.toString()).innerHTML = "";
		document.getElementById("show_level_no" + i.toString()).innerHTML = "";
	}
}

//버튼 변경
function onoff(num) {
	switch (num) {
		case 0:
			_run1.value = "1회 실행";
			_run2.value = "연속 실행";
			
			_run1.disabled = "";
			_run2.disabled = "";
			
			_dungeon.disabled = "";
			_difficulty.disabled = "";
			_channel.disabled = "";
			
			_objective_list.disabled = "";
				_objective_item_first.disabled = "";
				if (_objective_item_first.value != "") {
					_objective_item_second.disabled = "";
				}
				if (_objective_item_second.value != "") {
					_objective_item_third.disabled = "";
				}
				if (_objective_item_third.value != "") {
					_objective_item_name.disabled = "";
				}
				
				_objective_set_first.disabled = "";
				if (_objective_set_first.value != "") {
					_objective_set_name.disabled = "";
				}
				_objective_count_text.disabled = "";
				_objective_cost_text.disabled = "";
				_objective_fatigue_max.disabled = "";
				_objective_fatigue_per.disabled = "";
			
			_clear.disabled = "";
			break;
		case 1:
			_run1.value = "실행 중";
			
			_run1.disabled = "disabled";
			_run2.disabled = "disabled";
			
			_dungeon.disabled = "disabled";
			_difficulty.disabled = "disabled";
			_channel.disabled = "disabled";
			
			_objective_list.disabled = "disabled";
			_objective_item_first.disabled = "disabled";
			_objective_item_second.disabled = "disabled";
			_objective_item_third.disabled = "disabled";
			_objective_item_name.disabled = "disabled";
			_objective_set_first.disabled = "disabled";
			_objective_set_name.disabled = "disabled";
			_objective_count_text.disabled = "disabled";
			_objective_cost_text.disabled = "disabled";
			_objective_fatigue_max.disabled = "disabled";
			_objective_fatigue_per.disabled = "disabled";
			
			_clear.disabled = "disabled";
			break;
		case 2:
			_run2.value = "정지";
			
			_run1.disabled = "disabled";
			
			_dungeon.disabled = "disabled";
			_difficulty.disabled = "disabled";
			_channel.disabled = "disabled";
			
			_objective_list.disabled = "disabled";
			_objective_item_first.disabled = "disabled";
			_objective_item_second.disabled = "disabled";
			_objective_item_third.disabled = "disabled";
			_objective_item_name.disabled = "disabled";
			_objective_set_first.disabled = "disabled";
			_objective_set_name.disabled = "disabled";
			_objective_count_text.disabled = "disabled";
			_objective_cost_text.disabled = "disabled";
			_objective_fatigue_max.disabled = "disabled";
			_objective_fatigue_per.disabled = "disabled";
			
			_clear.disabled = "disabled";
			break;
	}
}

