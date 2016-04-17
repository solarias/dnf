
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
								}
							};
							img.onerror = function() {
								//외부 처리
								document.getElementById("cover_notice").innerHTML = "\
								이미지 로딩 중 ("+Math.round((((arr.length - remaining + 1)/arr.length)*100),0).toString()+"%)";
								--remaining;
								if (remaining <= 0) {
									callBack();
								}
							};
							img.src = arr[i];
							document.getElementById("imagePreloader").innerHTML += "<img src='" + arr[i] + "' />";
							imagesArray.push(img);
						}
					}

					//코스모소울 비용 계산
					function soulCount(level) {
						for (var i=0;i<soulCostList.length;i++) {
							if (soulCostList[i][0] === level) {
								return soulCostList[i][1];
							}
						}
					}

					//레벨별 해체 결과물 계산
					function disCount(type,level) {
						switch (type) {
							case "초대장":
								for (var i=0;i<cutList[2].length;i++) {
									if (cutList[2][i][0] === level) {
										return cutList[2][i][1];
									}
								}

								break;
							case "코스모소울":
								for (var i=0;i<cutList[3].length;i++) {
									if (cutList[3][i][0] === level) {
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
	for (var i=0;i<itemList.length;i++) {
		if (itemList[i]["name"] !== "") {
			var row = $("#inventory_table").insertRow(-1);
				row.id = "inventory_row_" + i.toString();
				row.className = "equip";//'에픽 장비'
				row.className += " " + "not_show";//출력하지 않음
				row.className += " " + itemList[i]["sort1"];//1차 분류
				row.className += " " + itemList[i]["sort2"];//2차 분류
				row.className += " " + itemList[i]["sort3"];//3차 분류
				row.className += " " + "lv" + itemList[i]["level"].toString();//레벨
			var cell_1 = row.insertCell(0);
				cell_1.innerHTML = itemList[i]["name"];//아이템 명칭
				cell_1.className = "col_1";
			var cell_2 = row.insertCell(1);
				if (itemList[i]["sort1"] === "방어구") {
					cell_2.innerHTML = itemList[i]["sort2"];//분류(무기 : 3차 분류)
				} else {
					cell_2.innerHTML = itemList[i]["sort3"];//분류(나머지 : 2차 분류)
				}
				cell_2.className = "col_2";
			var cell_3 = row.insertCell(2);
				cell_3.innerHTML = itemList[i]["level"].toString();//레벨
				cell_3.className = "col_3";
			var cell_5 = row.insertCell(3);
				cell_5.innerHTML = "없음";//해체 버튼 (초기상태 : '없음')
				cell_5.className = "col_4";
			var cell_4 = row.insertCell(4);
				cell_4.innerHTML = itemList[i]["have"].toString();//보유 수량
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
	num = 0;//세트 현황 테이블 순번 (td의 아이디에 붙여넣음, 하나 작성할 때마다 1씩 증가)
	for (var i=0;i<itemList.length;i++) {
		if (itemList[i]["name"] !== "") {
			//3-2-1. 세트 현황일 경우
			if (itemList[i]["set"] !== "") {
				//3-2-2. '세트'가 등록되지 않았을 경우
				if (tempArr.indexOf(itemList[i]["set"]) === -1) {//IF : "세트"가 등록되어있지 않다면
					tempArr.push(itemList[i]["set"]);
					//3-2-3. '세트' 등록
					var row = $("#set_table").insertRow(-1);
						row.id = "set_row_" + num.toString();
						row.className = "equip";//'에픽 장비'
						row.className += " " + "hap";//장비 '세트'
						row.className += " " + "not_show";//출력하지 않음
						//3-2-3-1. 해당 세트를 구성하는 '모든 파츠'를 클래스로 등록
						temp = 0;//현 파츠 전체 개수
						for (j=0;j<itemList.length;j++) {
							if (itemList[j]["set"] === itemList[i]["set"]) {
								if (row.className !== itemList[j]["sort1"]) {//2차 분류
									row.className += " " + itemList[j]["sort1"];
								}
								if (row.className !== itemList[j]["sort2"]) {//2차 분류
									row.className += " " + itemList[j]["sort2"];
								}
								if (row.className !== itemList[j]["sort3"]) {//3차 분류
									row.className += " " + itemList[j]["sort3"];
								}
								temp += 1;
							}
						}
						row.className += " " + "lv" + itemList[i]["level"].toString();//레벨
					var cell_1 = row.insertCell(0);
						cell_1.innerHTML = itemList[i]["set"];//세트 명칭
						cell_1.className = "col_1";
					var cell_2 = row.insertCell(1);
						cell_2.innerHTML = itemList[i]["sort2"];//분류 : 해당 파츠들의 2차 분류를 따름
						cell_2.className = "col_2";
					var cell_3 = row.insertCell(2);
						cell_3.innerHTML = itemList[i]["level"].toString();//레벨
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
				var row = $("#set_table").insertRow(-1);
					row.id = "set_row_" + num.toString();
					row.className = "equip";//'에픽 장비'
					row.className += " " + "not_show";//출력하지 않음
					row.className += " " + itemList[i]["sort1"];//1차 분류
					row.className += " " + itemList[i]["sort2"];//2차 분류
					row.className += " " + itemList[i]["sort3"];//3차 분류
					row.className += " " + "lv" + itemList[i]["level"].toString();//레벨
				var cell_1 = row.insertCell(0);
					cell_1.innerHTML = "┗ " + itemList[i]["name"];//아이템 명칭
					cell_1.className = "col_1";
				var cell_2 = row.insertCell(1);
					if (itemList[i]["sort1"] === "방어구") {
						cell_2.innerHTML = itemList[i]["sort2"];//분류(무기 : 3차 분류)
					} else {
						cell_2.innerHTML = itemList[i]["sort3"];//분류(나머지 : 2차 분류)
					}
					cell_2.className = "col_2";
				var cell_3 = row.insertCell(2);
					cell_3.innerHTML = itemList[i]["level"].toString();//레벨
					cell_3.className = "col_3";
				var cell_5 = row.insertCell(3);
					cell_5.innerHTML = "없음";//해체 버튼 (초기상태 : '없음')
					cell_5.className = "col_4";
				var cell_4 = row.insertCell(4);
					cell_4.innerHTML = itemList[i]["have"].toString();//보유 수량
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
	for (var i=0;i<itemList.length;i++) {
		if (itemList[i]["name"] !== "" & itemList[i]["goyu"] === "" ) {//고유 에픽은 제외
			var row = $("#craft_table").insertRow(-1);
				row.id = "craft_row_" + i.toString();
				row.className = "equip";//'에픽 장비'
				row.className += " " + "not_show";//출력하지 않음
				row.className += " " + itemList[i]["sort1"];//1차 분류
				row.className += " " + itemList[i]["sort2"];//2차 분류
				row.className += " " + itemList[i]["sort3"];//3차 분류
				row.className += " " + "lv" + itemList[i]["level"].toString();//레벨
			var cell_1 = row.insertCell(0);
				cell_1.innerHTML = itemList[i]["name"];//아이템 명칭
				cell_1.className = "col_1";
			var cell_2 = row.insertCell(1);
				if (itemList[i]["sort1"] === "방어구") {
					cell_2.innerHTML = itemList[i]["sort2"];//분류(무기 : 3차 분류)
				} else {
					cell_2.innerHTML = itemList[i]["sort3"];//분류(나머지 : 2차 분류)
				}
				cell_2.className = "col_2";
			var cell_3 = row.insertCell(2);//레벨
				cell_3.innerHTML = itemList[i]["level"].toString();
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
				cell_7.innerHTML = "<input id='gabriel_checkbox_" + [i] + "' class='gabriel_checkbox' type='checkbox' />";//보유 수량
				cell_7.className = "col_7";
		}
	}
	//필요 조각수 표시
	$("#craft_check_max").innerHTML = thousand(maxJogak);
	//조각 교환 장비 선택
	var tempChk = $$(".gabriel_checkbox");
	for (var i=0;i<tempChk.length;i++) {
		(function(i) {
			tempChk[i].onclick = function() {
				//1-1. 조각 교환 활성화 시
				if (tempChk[i].checked === true) {
					//기존 거 (있으면) 비활성화
					if (gabrielSetting["get"] != null) {
						for (var j=0;j<itemList.length;j++) {
							if (itemList[j]["name"] === gabrielSetting["get"]["name"]) {
								$("#gabriel_checkbox_" + j.toString()).checked = false;

								break;
							}
						}
					}
					//새로운 것 등록
					var tempNum = parseInt(tempChk[i].id.split("_")[2]);
					gabrielSetting["get"] = itemList[tempNum];
					//체크박스 다시 한번 더 활성화 (버그 방지)
					tempChk[i].checked = true;
				//1-2. 조각 교환 비활성화 시
				} else {
					//기존 거 등록 제거
					gabrielSetting["get"] = null;
				}

				//2. 가브리엘 현황 변경
				setGabriel("settingOnly");
			}
		})(i)
	}
}
//=================================================================================================================
//※ 함수 - 선택 & 실행
//=================================================================================================================
//날짜 표시
function setDate() {
	//a. 피로도 설정 불러오기
	var arr = dateSettingList;

	//b. 날짜 변경 or 표시
	switch (dateState['changed']) {
		case 2:
			arr = dateSettingDefault;
		//피로도 세팅 변경됨 : 날짜 데이터 새로 계산
		case 1:
			//평일 길이 계산
			dateState['len_wd'] =
				Math.ceil(arr[0]/arr[2]) +
				Math.ceil(arr[3]/arr[2]) +
				Math.ceil(arr[4]/arr[2]) +
				Math.ceil(arr[5]/arr[2]) +
				Math.ceil(arr[6]/arr[2]) +
				Math.ceil(arr[7]/arr[2]);
			//주말 길이 계산
			dateState['len_we'] =
				Math.ceil(arr[1]/arr[2]) +
				Math.ceil(arr[3]/arr[2]) +
				Math.ceil(arr[4]/arr[2]) +
				Math.ceil(arr[5]/arr[2]) +
				Math.ceil(arr[6]/arr[2]) +
				Math.ceil(arr[7]/arr[2]);
			//잔일&일차&주차&요일 초기화
			dateState['date'] = 1;
			dateState['week'] = 1;
			dateState['day'] = dateSettingWeek[0];//1일차 요일 적용
			dateState['dayType'] = dayTypeList[dateState['day']];
			if (count === 0) {
				//첫 실행 전 : 피로도 꽉 채우기
				dateState['remain'] = dateState['len_' + dateState['dayType']];
				//피로도 게이지 100%
				$("#date_fatigue").style.width = "100%";
			} else {
				//나머지 : 남은 피로도 계산
				dateState['remain'] = count;//일단 count 수치 부여, 이후 하루씩 깎아가기
				if (dateState['remain'] - dateState['len_' + dateState['dayType']] >= 0) {
					while (1) {
						//남은 회차 감소
						dateState['remain'] -= dateState['len_' + dateState['dayType']];
						//일차 추가
						dateState['date'] += 1;
						//주차 갱신
						dateState['week'] = Math.max(1, Math.ceil(dateState['date'] / 7));
						//요일 갱신
						dateState['day'] = dateSettingWeek[(dateSettingWeek.indexOf(dateState['day']) + 1) % 7];
						//요일 타입 변경
						dateState['dayType'] = dayTypeList[dateState['day']];
						//()다음 요일분 감소 시 remain이 음수가 될 경우) 반복문 탈출
						if (dateState['remain'] - dateState['len_' + dateState['dayType']] < 0) break;
					}
				}
				//잔량 뒤집기
				dateState['remain'] = dateState['len_' + dateState['dayType']] - dateState['remain'];
				//피로도 게이지 출력
				$("#date_fatigue").style.width = ((dateState['remain'] / dateState['len_' + dateState['dayType']]) * 100).toString() + "%";
			}

			//계산 완료 표시
			dateState['changed'] = 0;

			break;
		//그 외 : 기존 수치만 변경
		case 0:
			if (dateState['remain'] > 0) {
				//남은 회차 1 감소
				dateState['remain'] -= 1;
			//(일차 증가 시)
			} else {
				//일차 갱신
				dateState['date'] += 1;
				//요일 변경
				dateState['day'] = dateSettingWeek[(dateSettingWeek.indexOf(dateState['day']) + 1) % 7];
				//요일 타입 변경
				dateState['dayType'] = dayTypeList[dateState['day']];
				//남은 회차 증가
				dateState['remain'] =  dateState['len_' + dateState['dayType']] - 1;
			}

			//주차 갱신
			dateState['week'] = Math.max(1, Math.ceil(dateState['date'] / 7));

			break;
	}

	//c. 날짜 출력
	$("#date_count").innerHTML = thousand(dateState['date']);

	//d. 주차 & 요일 출력
	$("#date_summary_num").innerHTML = thousand(dateState['week']) + "주차 " + dateState['day'] + "요일";

	//e. 피로도 게이지 출력
	$("#date_fatigue").style.width = ((dateState['remain'] / dateState['len_' + dateState['dayType']]) * 100).toString() + "%";
}

//던전 선택
function dungeon_select() {
	//1. 변수 조절 (오류 대비 - 공백이면 숫자 "0" 반환)
	if ($("#dungeon").value === "") {
		input[0] = 0;
	} else {
		input[0] = parseInt($("#dungeon").value);
	}
	//2. 배경 변경
	$("#frame_top").style.background = "url('./images/epic/background_" + input[0].toString() + ".jpg')";
	//3. 아이템 정리
	for (var i=0;i<maxQuantity;i++) {
		$("#item" + i.toString()).style.top = startList[input[0]][0].toString() + "px";
		$("#item" + i.toString()).style.left = startList[input[0]][1].toString() + "px";

		$("#item_name" + i.toString()).className = "item_name";
		$("#item_name" + i.toString()).style.visibility = "hidden";
			$("#description" + i.toString()).style.left = "0px";
		$("#item_img" + i.toString()).style.visibility = "hidden";

		$("#effect_appear" + i.toString()).style.visibility = "hidden";
		$("#effect_land" + i.toString()).style.visibility = "hidden";
		$("#effect_wait" + i.toString()).style.visibility = "hidden";

		//애니메이션 정지
		clearTimeout(autoLooting[i-1]);
		clearTimeout(autoEffect["appear"][i-1]);
		clearTimeout(autoEffect["land"][i-1]);
		clearTimeout(autoEffect["wait"][i-1]);
		$("#item_img"+ i.toString()).className = "item_img";
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
	$("#person_helper").innerHTML = helpList[input[0]];

	//7. 브금 실행
	if ($("#option_bgm").checked === true) {
		play($("#bgm_type").value);
	}
}


//목표 현황 입력
function setObjective(cmd) {
	//목표 초기화
	objective = [];
	//입력 1. 목표 명칭
	objective.push($("#objective_list").value);
	//목표 종류에 따라 다른 절차 수행
	switch (objective[0]) {
		case "none":

			break;
		case "item":
			objective.push($("#objective_item_first").value);//입력 2. 1차 분류
			objective.push($("#objective_item_second").value);//입력 3. 2차 분류
			objective.push($("#objective_item_third").value);//입력 4. 3차 분류
			objective.push($("#objective_item_name").value);//입력 5. 아이템 명칭

			break;
		case "set":
			if (cmd === "run") {
				//해당 세트 완성여부 판단
				temp2 = $("#set_table").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
				for (var i=0;i<temp2;i++) {
					if ($("#set_row_" + i.toString()).getElementsByTagName("td")[0].innerHTML.indexOf($("#objective_set_name").value) !== -1) {
						tr_set = $("#set_row_" + i.toString());
						break;
					}
				}
				if (tr_set.getElementsByTagName("td")[5].innerHTML !== "") {
					alert("＊경고 : 해당 세트는 이미 완성되었습니다.\n대상 : \"" + $("#objective_set_name").value + "\"");
					return;
				}
			}
			objective.push($("#objective_set_first").value);//입력 2. 세트 분류
			objective.push($("#objective_set_name").value);//입력 3. 세트 병칭

			break;
		case "count":
			if (cmd === "run") {
				if ($("#objective_count_text").value === "") {
					alert("＊경고 : 실행 횟수를 입력하세요.");
					return;
				} else if (! isNumber($("#objective_count_text").value)) {
					alert("＊경고 : 실행 횟수는 숫자를 입력해야 합니다.");
					return;
				} else if (parseInt($("#objective_count_text").value) <= 0) {
					alert("＊경고 : 실행 횟수는 0보다 커야 합니다.");
					return;
				}
			}
			objective.push(parseInt($("#objective_count_text").value));//입력 2. 실행 횟수
			objective.push(0);//입력 3. 현재 진행한 횟수

			break;
		case "cost":
			if (cmd === "run") {
				if ($("#objective_cost_text").value === "") {
					alert("＊경고 : 초대장 개수를 입력하세요.");
					return;
				} else if (! isNumber($("#objective_cost_text").value)) {
					alert("＊경고 : 초대장 개수는 숫자를 입력해야 합니다.");
					return;
				} else if (parseInt($("#objective_cost_text").value) <= 0) {
					alert("＊경고 : 초대장 개수는 0보다 커야 합니다.");
					return;
				} else if (parseInt($("#objective_cost_text").value) < costList[input[0]]) {
					alert("＊경고 : 초대장 개수가 입장 조건(" + costList[input[0]] + "장)보다 부족합니다.");
					return;
				}
			}
			objective.push(parseInt($("#objective_cost_text").value));//입력 2. 초대장 제한
			objective.push(0);//입력 3. 현재 소모한 초대장

			break;
		case "fatigue":
			if (cmd === "run") {
				if ($("#objective_fatigue_max").value === "") {
					alert("＊경고 : 전체 피로도를 입력하세요.");
					return;
				} else
				if ($("#objective_fatigue_per").value === "") {
					alert("＊경고 : 1회동 소모 피로도를 입력하세요.");
					return;
				} else
				if (! isNumber($("#objective_fatigue_max").value)) {
					alert("＊경고 : 전체 피로도는 숫자를 입력해야 합니다.");
					return;
				} else if (! isNumber($("#objective_fatigue_per").value)) {
					alert("＊경고 : 1회당 소모 피로도는 숫자를 입력해야 합니다.");
					return;
				} else if (parseInt($("#objective_fatigue_max").value) <= 0) {
					alert("＊경고 : 전체 피로도는 0보다 커야 합니다.");
					return;
				} else if (parseInt($("#objective_fatigue_per").value) <= 0) {
					alert("＊경고 : 1회동 소모 피로도는 0보다 커야 합니다.");
					return;
				}
			}
			objective.push(parseInt($("#objective_fatigue_max").value));//입력 2. 전체 피로도
			objective.push(parseInt($("#objective_fatigue_per").value));//입력 3. 1회당 소모 피로도
			objective.push(0);//입력 4. 현재 소모한 피로도

			break;
	}

	if (cmd === "run") {
		return true;
	}
}


//목표 현황 체크
function checkObjective(cmd) {
	//목표현황 체크
	setObjective();

	//================================================
	//* A. 수집현황 출력
	//================================================
	var target = [];//수집할 대상(item : 개체 하나, set : 개체 여럿)

	switch (objective[0]) {
		//a. 특정 아이템 탐색
		case "item" :
			if (objective[4] !== "") {
				//수집현황 검색
				for (var i=0;i<itemList.length;i++) {
					if (objective[4] === itemList[i]["name"]) {
						target.push(itemList[i]);

						break;
					}
				}

				//수집현황 표시
				$("#objective_state_item_name").innerHTML = target[0]["sort3"];
				$("#objective_state_item_quantity").innerHTML = target[0]["have"];
				$("#objective_state_item_jogak").innerHTML = target[0]["jogak"];
				if (target[0]["have"] === 0 && target[0]["jogak"] < maxJogak) {
					$("#objective_state_item_complete").classList.remove("true");
					$("#objective_state_item_complete").classList.add("false");
				} else {
					$("#objective_state_item_complete").classList.remove("false");
					$("#objective_state_item_complete").classList.add("true");
				}
			}
			//표시되지 않은 수집현황 지우기
			if (target.length === 0) {
				$("#objective_state_item_name").innerHTML = "";
				$("#objective_state_item_quantity").innerHTML = "";
				$("#objective_state_item_jogak").innerHTML = "";
				$("#objective_state_item_complete").classList.remove("true");
				$("#objective_state_item_complete").classList.remove("false");
			}

			break;
		//b. 특정 세트 탐색
		case "set" :
			if (objective[2] !== "") {
				//수집현황 검색
				for (var i=0;i<itemList.length;i++) {
					if (objective[2] === itemList[i]["set"]) {
						target.push(itemList[i]);
					}
				}

				//수집현황 표시
				for (var i=0;i<target.length;i++) {
					$("#objective_state_set_" + (i+1).toString() + "_name").innerHTML = target[i]["sort3"];
					$("#objective_state_set_" + (i+1).toString() + "_quantity").innerHTML = target[i]["have"];
					$("#objective_state_set_" + (i+1).toString() + "_jogak").innerHTML = target[i]["jogak"];
					if (target[i]["have"] === 0 && target[i]["jogak"] < maxJogak) {
						$("#objective_state_set_" + (i+1).toString() + "_complete").classList.remove("true");
						$("#objective_state_set_" + (i+1).toString() + "_complete").classList.add("false");
					} else {
						$("#objective_state_set_" + (i+1).toString() + "_complete").classList.remove("false");
						$("#objective_state_set_" + (i+1).toString() + "_complete").classList.add("true");
					}
				}
			}
			//표시되지 않은 수집현황 지우기
			for (var i=0;i<5;i++) {
				if (i+1 > target.length) {
					$("#objective_state_set_" + (i+1).toString() + "_name").innerHTML = "";
					$("#objective_state_set_" + (i+1).toString() + "_quantity").innerHTML = "";
					$("#objective_state_set_" + (i+1).toString() + "_jogak").innerHTML = "";
					$("#objective_state_set_" + (i+1).toString() + "_complete").classList.remove("true");
					$("#objective_state_set_" + (i+1).toString() + "_complete").classList.remove("false");
				}
			}

			break;
	}

	//A-1. 별도 cmd가 없으면 여기서 중단
	if (!cmd) return;


	//================================================
	//* B. 탐색 종료 조건 확인
	//================================================

	//-1. 출력용 변수 준비 (종료 조건 체크용)
	var out = false;//(0보다 크면 종료 조건 충족)
	var showing = "";//('조건' 메세지)
	//0. 조건 없음
	if (objective[0] === "none") {
		//출력용 메시지 관리
		out = false;//종료 조건 미달성
		showing = "";//충족시킬 조건 없음
	//1. 에픽 아이템 탐색
	} else if (objective[0] === "item") {
		if (thisEpic.length > 0 || thisJogak.length > 0) {
			var thisArray = [];
			for (var i=0;i<thisEpic.length;i++) {
				thisArray.push(thisEpic[i]);
			}
			for (var i=0;i<thisJogak.length;i++) {
				thisArray.push(thisJogak[i]);
			}
			for (var i=0;i<thisArray.length;i++) {
				//아이템 명칭
				if (objective[4] === thisArray[i]["name"]) {
					//출력용 메시지 관리
					showing = objective[4];
					out = true;
				//3차 분류
				} else if (objective[4] === "" && objective[3] === thisArray[i]["sort3"]) {
					showing = thisEpic[i]["name"] + " (모든 " + objective[3] + " 아이템)";
					out = true;
				//2차 분류
				} else if (objective[4] === "" && objective[3] === "" && objective[2] === thisArray[i]["sort2"]) {
					showing = thisEpic[i]["name"] + " (모든 " + objective[2] + " 아이템)";
					out = true;
				//1차 분류
				} else if (objective[4] === "" && objective[3] === "" && objective[2] === "" && objective[1] === thisArray[i]["sort1"]) {
					showing = thisEpic[i]["name"] + " (모든 " + objective[1] + " 아이템)";
					out = true;
				//'모든 에픽'
				} else if (objective[4] === "" && objective[3] === "" && objective[2] === "" && objective[1] === "") {
					showing = thisEpic[i]["name"] + " (모든 에픽 아이템 )";
					out = true;
				}
			}
		}
	//2. 세트 완성
	} else if (objective[0] === "set") {
		if (objective[1] === "") {//'모든 세트'가 목표일 경우

			temp2 = $("#set_table").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
			for (var i=0;i<temp2;i++) {
				//완료된 세트 검색
				var tr_set = $("#set_row_" + i.toString());
				if (tr_set.getElementsByTagName("td")[5].innerHTML !== "") {
					//그 세트의 파츠 중 이번 회차에 완료한 게 있다면
					var set_name = (tr_set.getElementsByTagName("td")[0].innerText || tr_set.getElementsByTagName("td")[0].textContent);
					for (j=0;j<itemList.length;j++) {
						if (itemList[j]["set"] === set_name && itemList[j]["firstCount"] >= count) {//1을 빼는 이유 : count는 이미 1을 더해버렸기 때문에
							//출력용 답변 기억
							showing = set_name + " (모든 세트)";
							out = true;
							break;
						}
					}
				}
			}
		} else if (objective[2] === "") {//모든 '특정 분류' 세트가 목표일 경우
			temp2 = $("#set_table").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
			for (var i=0;i<temp2;i++) {
				//완료된 세트 검색
				var tr_set = $("#set_row_" + i.toString());
				if (tr_set.getElementsByTagName("td")[5].innerHTML !== "") {
					//그 세트가 해당 분류라면
					if (tr_set.getElementsByTagName("td")[1].innerHTML === objective[1]) {
						//그 세트의 파츠 중 이번 회차에 완료한 게 있다면
						var set_name = (tr_set.getElementsByTagName("td")[0].innerText || tr_set.getElementsByTagName("td")[0].textContent);
						for (j=0;j<itemList.length;j++) {
							if (itemList[j]["set"] === set_name && itemList[j]["firstCount"] === count) {//1을 빼는 이유 : count는 이미 1을 더해버렸기 때문에
								//출력용 답변 기억
								showing = set_name + " (모든 " + objective[1] + " 아이템)";
								out = true;
								break;
							}
						}
					}
				}
			}
		} else {//'특정 세트'가 목표일 경우
			temp2 = $("#set_table").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
			for (var i=0;i<temp2;i++) {
				if ($("#set_row_" + i.toString()).getElementsByTagName("td")[0].innerHTML.indexOf(objective[2]) !== -1) {
					tr_set = $("#set_row_" + i.toString());
					break;
				}
			}
			if (tr_set.getElementsByTagName("td")[5].innerHTML !== "") {
				//출력용 답변 기억
				showing = (tr_set.getElementsByTagName("td")[0].innerText || tr_set.getElementsByTagName("td")[0].textContent);
				out = true;
			}
		}
	//3. 실행 횟수
	} else if (objective[0] === "count") {
		if (objective[2] + 1 >= objective[1]) {
			showing = (objective[2] + 1).toString() + "회 실행";
			out = true;
		} else {
			objective[2] += 1;
		}
	//4. 초대장 제한
	} else if (objective[0] === "cost") {
		if (objective[2] + (costList[input[0]]*2) > objective[1]) {
			showing = objective[1].toString() + "장 중 " + (objective[2] + costList[input[0]]).toString() + "장 사용 \
				(총 " + Math.floor(objective[1]/costList[input[0]]).toString() + "회 실행)";
			out = true;
		} else {
			objective[2] += costList[input[0]];
		}
	//5. 피로도 제한
	} else if (objective[0] === "fatigue") {
		if  (objective[3] + objective[2] >= objective[1]) {
			showing = Math.ceil(objective[1]/objective[2]).toString() + "회 실행 (전체 피로도 : " + objective[1].toString() + ")";
			out = true;
		} else {
			objective[3] += objective[2];
		}
	}

	//(cmd가 "report"라면)보고서 제출
	if (cmd === "report") {
		return {
			"out":out,
			"showing":showing
		};
	}
}


//(실행 전) 에픽 드랍 리스트 구축
function getEpicList() {
	//1. 현재 지역 고유 에픽 리스트
	currentList_goyu = [];
	for (var i=0;i<goyuList.length;i++) {
		if (goyuList[i]["goyu"] === areaList[input[0]]) {//지역명 일치 시
			currentList_goyu.push(goyuList[i]);
		}
	}
	//2. (고유 에픽을 제외한) '레벨대'별 에픽 리스트
	currentList = [];
	for (var i=0;i<itemList.length;i++) {
		if (levelList[input[0]].indexOf(itemList[i]["level"]) !== -1 &&
			itemList[i]["name"] !== "" &&
			itemList[i]["goyu"] === "") {//드랍 레벨이 맞으면 & 명칭이 공백이 아니면 &고유 에픽이 아니면
				currentList.push(itemList[i]);
		}
	}
}

//실행
function simulate(num){
	//=================================
	//* 회차 증가
	//=================================
	count += 1;
	//=================================
	//* 입장료 지불
	//=================================
	//0-1. 소모한 초대장 수 증가
	cost[0] += costList[input[0]];//총 소모
	cost[1] += costList[input[0]];//실질 소모
	//0-2. 소모한 초대장 수 반영
	$("#cost_invitation").innerHTML = thousand(cost[0]);
	$("#cost_real").innerHTML = thousand(cost[1]);
	$("#cost_gold").innerHTML = setWon(cost[0]*gold);
	$("#cost_gold_real").innerHTML = setWon(cost[1]*gold);

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
		if (num !== 3) {
			$("#item" + i.toString()).style.top = startList[input[0]][0].toString() + "px";
			$("#item" + i.toString()).style.left = startList[input[0]][1].toString() + "px";
		}

		//아이템 이름 숨기기&이동, 이미지 숨기기
		$("#description" + i.toString()).className = "description";
		$("#item_name" + i.toString()).className = "item_name";
		$("#item_name" + i.toString()).style.visibility = "hidden";
			$("#description" + i.toString()).style.left = "0px";
		$("#item_img" + i.toString()).style.visibility = "hidden";

		//에픽 이펙트 숨기기
		$("#effect_appear" + i.toString()).style.visibility = "hidden";
		$("#effect_land" + i.toString()).style.visibility = "hidden";
		$("#effect_wait" + i.toString()).style.visibility = "hidden";

		//애니메이션 정지 (탐색 시 2번째 실행부터 : 무시)
		if (num !== 3) {
			clearTimeout(autoLooting[i-1]);
			clearTimeout(autoEffect["appear"][i-1]);
			clearTimeout(autoEffect["land"][i-1]);
			clearTimeout(autoEffect["wait"][i-1]);
			$("#item_img"+ i.toString()).className = "item_img";
		}
	}
	//=================================
	//* 회차 표기
	//=================================
	$("#round_count").innerHTML = thousand(count);
		//회차에 따른 날짜 표시
		setDate();

	//=================================
	//* 현재 회차 진행
	//=================================
	//1. 던전 난이도 입력
	input[1] = $("#difficulty").value;
	//2. 지옥파티 난이도 결정
	input[2] = rand(chanceList_num[0]);
	$("#round_difficulty").innerHTML =  chanceList_name[0][input[2]];//난이도 출력

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
		tempArr1 = shuffle(tempArr1);
		tempArr2 = shuffle(tempArr2);
		//4-3. 다시 넣기
		zoneArr = [];
		for (var i=0;i<jogak_item_max;i++) {//드랍템 개수만큼만 기억하기
			zoneArr.push(tempArr1[i]);
		}
		for (var i=0;i<tempArr2.length;i++) {
			zoneArr.push(tempArr2[i]);
		}
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
		thisEpic = [];//'이번에 드랍된 에픽템' 리스트 초기화
		thisJogak = [];//'이번에 조각을 모두 모운 에픽템' 리스트 초기화
		for (var i=0;i<thisTime.length;i++) {
			if (thisTime[i][2] === "에픽" || thisTime[i][2] === "고유에픽") {
				//아이템 업데이트 실시
				update("에픽", thisTime[i][3]);
				//나머지는 별도로 분류한 후 다음 단계에서 처리
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
						//조각 수 업데이트
						update(thisTime[i][2], thisTime[i][3]);
						//이번 업데이트로 조각을 제작 가능 수준까지 모인다면
						if (thisTime[i][3]["jogak"] === maxJogak) {
							//thisJogak에 추가되지 않았다면(중복등록 방지)
							for (var j=0;j<thisJogak.length;j++) {
								if (thisTime[i][3]["name"] === thisEpic[j]["name"]) continue;
							}
							//thisJogak에 등록
							thisJogak.push(thisTime[i][3]);
						}

						break;
				}
			}
		}

	//8. (에픽 한정) 드랍 아이템 사운드 출력, 일괄 업데이트
		//IF 방금 에픽이 있었으면
		if (thisEpic.length > 0 || thisJogak.length > 0) {
			//8-1. 출현 사운드 출력
			try {
				if ($("#option_sound").checked) {
					sound_appear.pause();
					sound_appear.currentTime = 0;
					sound_appear.play();
				}
			} catch(e) {
			}

			//8-3. (에픽 한정) record - 일괄 업데이트
			if (thisEpic.length > 0) {
				//8-3-1. 회차, 초대장 소모량, 지옥파티 난이도 (등장한 아이템의 모든 분류정보를 class에 입력)
				var text = "<span class='equip";
				for (var i=0;i<thisEpic.length;i++) {
					text += " " + thisEpic[i]["sort1"] + " " + thisEpic[i]["sort2"] + " " + thisEpic[i]["sort3"] + " lv" + thisEpic[i]["level"].toString();
				}
					text += "'><span class='run";
				for (var i=0;i<thisEpic.length;i++) {
					text += " " + thisEpic[i]["sort1"] + " " + thisEpic[i]["sort2"] + " " + thisEpic[i]["sort3"] + " lv" + thisEpic[i]["level"].toString();
				}
					text += "'>" + thousand(count.toString()) + "회차 \
								<span class='cost'>(초대장 : " + thousand(cost[0]) + " / 실질 : " + thousand(cost[1]) + ")</span>\
								<span class='difficulty_" + input[2].toString() + "'> &lt;" + chanceList_name[0][input[2]].toString() + "&gt;</span>\
							</span><br />";
				//8-3-2. 아이템 정보
				for (var i=0;i<thisEpic.length;i++) {
					if (thisEpic[i]["sort1"] === "방어구") {//방어구
						if (thisEpic[i]["set"] !== "") {//세트 방어구
							text += "\
								<span class='get " + thisEpic[i]["sort1"] + " " + thisEpic[i]["sort2"] + " " + thisEpic[i]["sort3"] + " lv" + thisEpic[i]["level"].toString() + "'>\
									<span class='set'>　" + thisEpic[i]["name"] + "</span> [" + thisEpic[i]["sort2"] + " / " + thisEpic[i]["level"] + "제]\
									 <span class='quantity'>(x" + thisEpic[i]["get"] + ")</span>\
								</span><br />";
						} else {//'비'세트 방어구
							text += "\
								<span class='get " + thisEpic[i]["sort1"] + " " + thisEpic[i]["sort2"] + " " + thisEpic[i]["sort3"] + " lv" + thisEpic[i]["level"].toString() + "'>\
									<span class='epic'>　" + thisEpic[i]["name"] + "</span> [" + thisEpic[i]["sort2"] + " / " + thisEpic[i]["level"] + "제]\
									 <span class='quantity'>(x" + thisEpic[i]["get"] + ")</span>\
								</span><br />";
						}
					} else {//그외
						if (thisEpic[i]["set"] !== "") {//세트 그외
							text += "\
								<span class='get " + thisEpic[i]["sort1"] + " " + thisEpic[i]["sort2"] + " " + thisEpic[i]["sort3"] + " lv" + thisEpic[i]["level"].toString() + "'>\
								<span class='set'>　" + thisEpic[i]["name"] + "</span> [" + thisEpic[i]["sort3"] + " / " + thisEpic[i]["level"] + "제] \
								 <span class='quantity'>(x" + thisEpic[i]["get"] + ")</span>\
								</span><br />";
						} else {//'비'세트 그외
							text += "\
								<span class='get " + thisEpic[i]["sort1"] + " " + thisEpic[i]["sort2"] + " " + thisEpic[i]["sort3"] + " lv" + thisEpic[i]["level"].toString() + "'>\
								<span class='epic'>　" + thisEpic[i]["name"] + "</span> [" + thisEpic[i]["sort3"] + " / " + thisEpic[i]["level"] + "제] \
								<span class='quantity'>(x" + thisEpic[i]["get"] + ")</span>\
								</span><br />";
						}
					}
				}
				text += "</span>";
				//8-3-3. record에 기록 (record가 열려있을 때만)
				if ($("#record").style.display === "block") {
					//IF - record가 열려있음
						//내용 저장
						content_text[0] += text;
						//내용 출력
						$("#record").innerHTML += text;
						//스크롤바 이동
						$("#record").scrollTop = $("#record").scrollHeight;
				} else {
					//IF - record가 닫혀있음 (차후에 record를 열면 그 때 업데이트 실시)
						//내용 저장
						content_text[0] += text;
				}
			}

		}

		//9. 아이템 드롭 판단
		checkDrop(num);
}

//아이템 드롭 판단
function checkDrop(num) {
	//가브리엘 출현 여부 판단
	var tempGabriel = false;
	if ($("#option_gabriel").checked === true && Math.random() <= gabrielSetting["chance"]) {
		tempGabriel = true;
	}

	//IF - 1회 실행
	if (num === 1) {
		//1. 아이템 드롭
		for (var i=0;i<thisTime.length;i++) {
			dropItem(thisTime[i]);
		}
		//2-1. 가브리엘 출현
		if (tempGabriel === true) {
			onoff('gabriel');
			setGabriel();
		//2-2.가브리엘 미출현
		} else {
			//버튼 재활성화 준비
			onoff('drop');
			//재실행 여부 체크
			nextStep(3);
		}
		//추가실행 : 하지 않음
	//IF - 탐색 실시 (2 : 첫번째 탐색, 3 : 두번째 이후 탐색)
	} else if (num === 2 || num === 3) {
		//1. 목표현황 체크 후 보고서 받기
		var tempReport = checkObjective("report");
		var out = tempReport["out"];
		var showing = tempReport["showing"];

		//2-1. 종료 조건 달성
		if (out === true) {
			//a. 메세지 출력
			var tempText = "<span class='system'>====================&lt;탐색 종료&gt;====================";
				tempText += "<br/>※ 종료 조건 : " + $("#objective_list").options[$("#objective_list").selectedIndex].text + " － " + showing
				tempText += "<br/>================================================</span>";
			$("#record").innerHTML += tempText;
			//b. 스크롤바 이동 (종료 메세지가 보이도록)
			if ($("#record").style.display === "block") {
				$("#record").scrollTop = $("#record").scrollHeight;
			}
			//c. 변수 처리
				//'자동 실행 변수' OFF
				running = 0;
				//목표 초기화
				objective = [];
			//d-1. 아이템 드롭
			for (var i=0;i<thisTime.length;i++) {
				dropItem(thisTime[i]);
			}
			//d-2. 가브리엘 출현
			if (tempGabriel === true) {
				//이미 종료 조건 충족했다고 기억
				gabrielSetting["alreadySatisfy"] = true;
				//가브리엘 출현
				onoff('gabriel');
				setGabriel();
			//가브리엘 미출현
			} else {
				//버튼 재활성화 준비
				onoff('drop');
				//재실행 여부 체크
				nextStep(num);
			}
		//2-2. 종료 조건 미달성 or 무조건 실행
		} else {
			if (running === 1) {//'자동 실행 변수'가 ON일 경우
				//a. 가브리엘 출현 시
				if (tempGabriel === true) {
					//아이템 드롭
					for (var i=0;i<thisTime.length;i++) {
						dropItem(thisTime[i]);
					}
					//가브리엘 실행 후 재실행 예약
					gabrielSetting["replay"] = true;
					//가브리엘 출현 (가브리엘 종료 후 재실행)
					onoff('gabriel');
					setGabriel();
				//b. 가브리엘 미출현
				} else {
					//아이템 드롭 - 실시하지 않음 (생략하고 다음 회차로 넘어감)
					//재실행 여부 체크
					nextStep(num);
				}
			} else {
				//아이템 드롭
				for (var i=0;i<thisTime.length;i++) {
					dropItem(thisTime[i]);
				}
				//가브리엘 출현
				if (tempGabriel === true) {
					onoff('gabriel');
					setGabriel();
				//가브리엘 미출현
				} else {
					//버튼 재활성화 준비
					onoff('drop');
					//재실행 여부 체크
					nextStep(num);
				}
			}
		}
	}
}


//재실행 여부 체크
function nextStep(num, cmd) {
	//B. 아이템 드롭, 가브리엘 출현, 정지
		//IF - 1회 실행
		if (num === 1) {
			//추가실행 : 하지 않음
		//IF - 탐색 실시 (2 : 첫번째 탐색, 3 : 두번째 이후 탐색)
		} else if (num === 2 || num === 3) {
			//1. 목표현황 체크 후 보고서 받기
			var tempReport = checkObjective("report");
			var out = tempReport["out"];
			var showing = tempReport["showing"];

			//2-1. 종료 조건 달성
			if (out === true) {
				//a. (아직 메시지 출력 안했다면)
				if (gabrielSetting["alreadySatisfy"] === false) {
					//a-1. 메세지 출력
					var tempText = "<span class='system'>====================&lt;탐색 종료&gt;====================";
						tempText += "<br/>※ 종료 조건 : " + $("#objective_list").options[$("#objective_list").selectedIndex].text + " － " + showing
						tempText += "<br/>================================================</span>";
					$("#record").innerHTML += tempText;
					//a-1. 스크롤바 이동 (종료 메세지가 보이도록)
					if ($("#record").style.display === "block") {
						$("#record").scrollTop = $("#record").scrollHeight;
					}
					//a-2. 변수 처리
						//'자동 실행 변수' OFF
						running = 0;
						//목표 초기화
						objective = [];
				}
				//b. 버튼 정상화
				onoff(0);
				//추가실행 : 하지 않음
			//2-2. 종료 조건 미달성 or 무조건 실행
			} else {
				if (running === 1) {//'자동 실행 변수'가 ON일 경우
					//추가실행 : 실시
					autoRunning = setTimeout(function() {
						simulate(2);
					}, 25);
				} else {
					//추가실행 : 하지 않음
				}
			}
		}
}


//가브리엘 출현
function setGabriel(cmd) {
	//0. 수동일 때 일부 실행
	if ($("#gabriel_type").value === "manual" && cmd != "settingOnly") {
		//사운드 출력
		if ($("#option_sound").checked === true) {
			try {
				sound_appear.pause();
				sound_appear.currentTime = 0;
			} catch(e) {};
			sound_appear.play();
		}
		//가브리엘 출현 중이라고 기억
		gabrielSetting["trading"] = true;
	//1. 자동일 때 (아이템 선정 안해놨다면) 일부 "부랴부랴" 실행
	} else if ($("#gabriel_type").value === "auto" && gabrielSetting["get"] === null) {
		//창 오픈
		onoff("gabriel_autoFirst");
		//사운드 출력
		if ($("#option_sound").checked === true) {
			try {
				sound_appear.pause();
				sound_appear.currentTime = 0;
			} catch(e) {};
			sound_appear.play();
		}
		//가브리엘 출현 중이라고 기억
		gabrielSetting["trading"] = true;
	}

	//2. 기존 설정 초기화
		//a. DOM 판단용용 변수
		var idList = ["type","icon","name","jogak"];
		//b. 조각 받을 아이템
		for (var i=0;i<idList.length;i++) {
			$("#gabriel_item_get_" + idList[i]).innerHTML = "";
		}
		$("#gabriel_item_get_icon").style.backgroundPosition = "0px 0px";
		//c. 조각 줄 아이템
		for (var i=1;i<=5;i++) {
			for (var j=0;j<idList.length;j++) {
				$("#gabriel_item_give_" + i.toString() + "_" + idList[j]).innerHTML = "";
			}
			$("#gabriel_item_give_" + i.toString() + "_icon").style.backgroundPosition = "0px 0px";
		}
		//c. 메시지 창
		$("#gabriel_message_box").style.visibility = "hidden";
		//d. 버튼
		$("#gabriel_yes").disabled = "";
		$("#gabriel_change").disabled = "";

	//3-1. 아이템 지정 안됨
	if (gabrielSetting["get"] === null) {
		//a. 메세지 준비
		$("#gabriel_message").innerHTML = "에픽 조각을 받고 싶은 장비를<br/>에픽 도감에서 선택해주세요.";
		//b. 메세지 출력
		$("#gabriel_message_box").style.visibility = "visible";
		//c. "조각 교환 불가" 판단
			//"교환" 버튼 비활성화
			$("#gabriel_yes").disabled = "disabled";
			//"재료 교체 비활성화"
			$("#gabriel_change").disabled = "disabled";
			//버튼 액션
			if (cmd != "settingOnly") {
				doGabriel("notSet");
			}
			return;
	//3-2. 아이템 지정됨
	} else {
		//받을 아이템 출력
		$("#gabriel_item_get_type").innerHTML = gabrielSetting["get"]["sort1"];
		$("#gabriel_item_get_icon").style.backgroundPosition = spritePosition(gabrielSetting["get"]["icon"], 1);
		$("#gabriel_item_get_name").innerHTML = gabrielSetting["get"]["name"];
		$("#gabriel_item_get_jogak").innerHTML = gabrielSetting["get"]["jogak"] + " 조각 (+ 5)";
	}

	//4. 조각 제공 아이템 수집
		//4-1. 아이템 조건 파악
		var type = gabrielSetting["get"]["sort1"];
		var level = gabrielSetting["get"]["level"];
		var name = gabrielSetting["get"]["name"];
		//4-2. 이름이 다르고 레벨 & 제 1분류가 모두 동일하고 조각이 10개 이상인 아이템 3종
		var tempArr1 = [];
		for (var i=0;i<itemList.length;i++) {
			if (itemList[i]["name"] != name && itemList[i]["sort1"] === type && itemList[i]["level"] === level && itemList[i]["jogak"] >= 10) {
				tempArr1.push(itemList[i]);
			}
		}
		//4-3. 이름이 다르고 레벨이 동일하고 제 1분류가 다르고 조각이 10개 이상이고 4-2에서 선정 안된 아이템 2종
		var tempArr2 = [];
		for (var i=0;i<itemList.length;i++) {
			if (itemList[i]["name"] != name && itemList[i]["sort1"] != type && itemList[i]["level"] === level && itemList[i]["jogak"] >= 10 && tempArr1.indexOf(itemList[i]) < 0) {
				tempArr2.push(itemList[i]);
			}
		}

	//5-1. 조각 제공 아이템 조각 부족
	if (tempArr1.length < 3 || tempArr2.length < 2) {
		//a. 메세지 준비
		$("#gabriel_message").innerHTML = "동일 레벨의 에픽 조각이<br/>부족하여 교환할 수 없습니다.";
		//b. 메세지 출력
		$("#gabriel_message_box").style.visibility = "visible";
		//c. "조각 교환 불가" 판단
			//"교환" 버튼 비활성화
			$("#gabriel_yes").disabled = "disabled";
			//"재료 교체 비활성화"
			$("#gabriel_change").disabled = "disabled";
			//버튼 액션
			if (cmd != "settingOnly") {
				doGabriel("no");
			}
			return;
	//5-2. 조각 제공 아이템 조각 충분
	} else {
		//a. 배열 섞기
		tempArr1 = shuffle(tempArr1);
		tempArr2 = shuffle(tempArr2);
		//b. 1 배열에서 3개, 2 배열에서 2개 기억
		var tempArr3 = [];
			tempArr3.push(tempArr1[0]);
			tempArr3.push(tempArr1[1]);
			tempArr3.push(tempArr1[2]);
			tempArr3.push(tempArr2[0]);
			tempArr3.push(tempArr2[1]);
			//b-1 합친 배열 섞어주기
			tempArr3 = shuffle(tempArr3);
		gabrielSetting["give"] = tempArr3;
		//c. 기억된 아이템 출력
		for (var i=0;i<5;i++) {
			$("#gabriel_item_give_" + (i+1).toString() + "_type").innerHTML = gabrielSetting["give"][i]["sort1"];
			$("#gabriel_item_give_" + (i+1).toString() + "_icon").style.backgroundPosition = spritePosition(gabrielSetting["give"][i]["icon"], 1);
			$("#gabriel_item_give_" + (i+1).toString() + "_name").innerHTML = gabrielSetting["give"][i]["name"];
			$("#gabriel_item_give_" + (i+1).toString() + "_jogak").innerHTML = gabrielSetting["give"][i]["jogak"] + " 조각 (-10)";
		}
		//버튼 액션
		if (cmd != "settingOnly") {
			doGabriel("yes");
		}
	}
}
//가브리엘 교환 실시
function doGabriel(cmd) {
	//취소
	function no() {
		//가브리엘 거래 종료
		gabrielSetting["trading"] = false;
		//취소 사운드 출력
		if ($("#option_sound").checked === true) {
			try {
				sfxList["hell_gabriel_no"].pause();
				sfxList["hell_gabriel_no"].currentTime = 0;
			} catch(e) {}
			sfxList["hell_gabriel_no"].play();
		}
		//재실행 여부 체크
			//재실행 시
			if (gabrielSetting["replay"] === true) {
				//재실형 변수 제거
				gabrielSetting["replay"] === false
				//버튼 재설정
				onoff(2);
				//재실행 여부 체크
				nextStep(3);
			//재실행 필요없으면
			} else {
				//버튼 정상화
				onoff(0);
			}
	}
	//교환
	function yes() {
		//가브리엘 거래 종료
		gabrielSetting["trading"] = false;
		//교환 사운드 출력
		if ($("#option_sound").checked === true) {
			try {
				sfxList["hell_gabriel_yes"].pause();
				sfxList["hell_gabriel_yes"].currentTime = 0;
			} catch(e) {}
			sfxList["hell_gabriel_yes"].play();
		}
		//조각 감소
		for (var i=0;i<gabrielSetting["give"].length;i++) {
			update("조각", gabrielSetting["give"][i], -10)
		}
		//조각 증가
		update("조각", gabrielSetting["get"], 5)
		//이번 업데이트로 조각을 제작 가능 수준까지 모인다면
		if (gabrielSetting["get"]["jogak"] - 5 < maxJogak && gabrielSetting["get"]["jogak"] >= maxJogak) {
			//thisJogak에 등록
			thisJogak.push(gabrielSetting["get"]);
		}
		//재실행 여부 체크
			//재실행 시
			if (gabrielSetting["replay"] === true) {
				//재실형 변수 제거
				gabrielSetting["replay"] === false
				//버튼 재설정
				onoff(2);
				//재실행 여부 체크
				nextStep(3);
			//재실행 필요없으면
			} else {
				//버튼 정상화
				onoff(0);
			}
	}

	//아이템 교환
	$("#gabriel_change").onclick = function() {
		//가브리엘 다시 출현 (배열 을섞기 위해)
		setGabriel("settingOnly");
	}

	//교환 취소
	$("#gabriel_no").onclick = function() {
		no();
	}
	//교환 실시
	$("#gabriel_yes").onclick = function() {
		yes();
	}

	//자동 교환
	if ($("#gabriel_type").value === "auto" && cmd != "notSet") {
		switch (cmd) {
			case "no":
				no();

				break;
			case "yes":
				yes();

				break;
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
				if (input[3] !== "에픽") {
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
				if (input[4] === "고유에픽") {
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
				if ((currentList[i]["sort1"] === input[5] //무기, 방어구 전용 : 대분류
				|| currentList[i]["sort2"] === input[5])//악세사리, 특수장비 : 1차 소분류
				&& currentList[i]["level"] === levelList[input[0]][j]) {
					currentList_level[j] += 1;
				}
			}
		}
		//4-3. 추가 가중치 계산
		for (var i=0;i<chanceList_num[4].length;i++) {
			if (chanceList_num[4][i][0].indexOf(input[0]) !== -1) {
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
						if (name1.split("_")[1] === "방어구") {
							var name2 = name1.split("_")[2] + " " + name1.split("_")[3];
						} else {
							var name2 = name1.split("_")[3];
						}

						//아이템 이름 변경
						$("#description" + zone.toString()).className += " normal";//이름 숨기기 옵션용
						$("#item_name" + zone.toString()).className += " rare";
						$("#item_name" + zone.toString()).innerHTML = "마법으로 봉인된 " + name2;
							$("#description" + zone.toString()).style.left = (-$("#item_name" + zone.toString()).offsetWidth/2).toString() + "px";

						//아이템 필드 이미지 변경, 크기 조절
						$("#item_img" + zone.toString()).style.backgroundPosition = spritePosition(name1,1);
						$("#item_img" + zone.toString()).style.width = spriteSize(name1,"width",1);
							$("#item_img" + zone.toString()).style.left = (-$("#item_img" + zone.toString()).offsetWidth/2).toString() + "px";
						$("#item_img" + zone.toString()).style.height = spriteSize(name1,"height",1);

						//아이템 이름, 필드 이미지 가시화
						$("#item_name" + zone.toString()).style.visibility = "visible";
						$("#item_img" + zone.toString()).style.visibility = "visible";

						//아이템 등록
						thisTime.push([zone, zoneArr, item]);

						break;

					case "코스모소울":
						//아이템 필드 이미지 & 이름 결정
						var name1 = "field_기타";
						var name2 = "코스모 소울";

						//아이템 이름 변경
						$("#description" + zone.toString()).className += " normal";//이름 숨기기 옵션용
						$("#item_name" + zone.toString()).className += " epic";
						$("#item_name" + zone.toString()).innerHTML = name2;
							$("#description" + zone.toString()).style.left = (-$("#item_name" + zone.toString()).offsetWidth/2).toString() + "px";

						//아이템 필드 이미지 변경, 크기 조절
						$("#item_img" + zone.toString()).style.backgroundPosition = spritePosition(name1,1);
						$("#item_img" + zone.toString()).style.width = spriteSize(name1,"width",1);
							$("#item_img" + zone.toString()).style.left = (-$("#item_img" + zone.toString()).offsetWidth/2).toString() + "px";
						$("#item_img" + zone.toString()).style.height = spriteSize(name1,"height",1);

						//아이템 이름, 필드 이미지 가시화
						$("#item_name" + zone.toString()).style.visibility = "visible";
						$("#item_img" + zone.toString()).style.visibility = "visible";

						//아이템 등록
						thisTime.push([zone, zoneArr, item]);

						break;
					case "지옥구슬":
						var name1 = "field_기타";
						var name2 =  areaList[input[0]] + " 지옥구슬";

						//아이템 이름 변경
						$("#description" + zone.toString()).className += " normal";//이름 숨기기 옵션용
						$("#item_name" + zone.toString()).className += " unique";
						$("#item_name" + zone.toString()).innerHTML = name2;
							$("#description" + zone.toString()).style.left = (-$("#item_name" + zone.toString()).offsetWidth/2).toString() + "px";

						//아이템 필드 이미지 변경, 크기 조절
						$("#item_img" + zone.toString()).style.backgroundPosition = spritePosition(name1,1);
						$("#item_img" + zone.toString()).style.width = spriteSize(name1,"width",1);
							$("#item_img" + zone.toString()).style.left = (-$("#item_img" + zone.toString()).offsetWidth/2).toString() + "px";
						$("#item_img" + zone.toString()).style.height = spriteSize(name1,"height",1);

						//아이템 이름, 필드 이미지 가시화
						$("#item_name" + zone.toString()).style.visibility = "visible";
						$("#item_img" + zone.toString()).style.visibility = "visible";

						//아이템 등록
						thisTime.push([zone, zoneArr, item]);

						break;
					default:
						if (item === "고유에픽") {
							temp = currentList_goyu[Math.floor(Math.random() * currentList_goyu.length)];
						} else if (item === "에픽") {
							tempArr = [];
							for (j=0;j<currentList.length;j++) {
								if ((currentList[j]["sort1"] === input[5]/*종류-무기*/
								|| currentList[j]["sort2"] === input[5]/*종류-방어구*/
								|| currentList[j]["sort3"] === input[5])/*종류-악세서리&특수장비*/
								&& currentList[j]["level"] === input[6])/*레벨*/ {
									tempArr.push(currentList[j]);
								}
							}
							//미리 리스트에서 랜덤으로 선정
							temp = tempArr[Math.floor(Math.random() * tempArr.length)];
						}

						//아이템 이름 변경, 이후 미리 측정한 길이 부여
						$("#description" + zone.toString()).className += " normal";//이름 숨기기 옵션용
						$("#item_name" + zone.toString()).className += " epic";
						$("#item_name" + zone.toString()).innerHTML = temp["name"];
							$("#description" + zone.toString()).style.left = (-$("#item_name" + zone.toString()).offsetWidth/2).toString() + "px";

						//아이템 필드 이미지 변경, 크기 조절
						var field_name = "field_" + temp["sort1"] + "_" + temp["sort2"] + "_" + temp["sort3"];
						$("#item_img" + zone.toString()).style.backgroundPosition = spritePosition(field_name,1);
						$("#item_img" + zone.toString()).style.width = spriteSize(field_name,"width",1);
							$("#item_img" + zone.toString()).style.left = (-$("#item_img" + zone.toString()).offsetWidth/2).toString() + "px";
						$("#item_img" + zone.toString()).style.height = spriteSize(field_name,"height",1);

						//아이템 이름, 필드 이미지 가시화
						$("#item_name" + zone.toString()).style.visibility = "visible";
						$("#item_img" + zone.toString()).style.visibility = "visible";

						//출현 이펙트 가시화 (에픽 전용)
						$("#effect_appear" + zone.toString()).style.left = (-144).toString() + "px";
						$("#effect_appear" + zone.toString()).style.top = (-235+25+($("#item_img" + zone.toString()).offsetHeight/2)).toString() + "px";
						$("#effect_appear" + zone.toString()).style.visibility = "visible";

						//아이템 등록
						thisTime.push([zone, zoneArr, "에픽", temp]);
				}

				break;
			case "조각" :
				//에픽 장비 선정
				tempArr = [];
				for (var j=0;j<currentList.length;j++) {
					if ((currentList[j]["sort1"] === input[5]/*종류-무기*/
					|| currentList[j]["sort2"] === input[5]/*종류-방어구*/
					|| currentList[j]["sort3"] === input[5])/*종류-악세서리&특수장비*/
					&& currentList[j]["level"] === input[6])/*레벨*/ {
						tempArr.push(currentList[j]);
					}
				}
				//미리 리스트에서 랜덤으로 선정
				temp = tempArr[Math.floor(Math.random() * tempArr.length)];

				//아이템 이름 변경, 이후 미리 측정한 길이 부여
				$("#description" + zone.toString()).className += " jogak";//이름 숨기기 옵션용
				$("#item_name" + zone.toString()).className += " jogak";
				$("#item_name" + zone.toString()).innerHTML = temp["name"] + " 조각";
					$("#description" + zone.toString()).style.left = (-$("#item_name" + zone.toString()).offsetWidth/2).toString() + "px";

				//아이템 필드 이미지 변경, 크기 조절
				var field_name = "field_에픽조각";
				$("#item_img" + zone.toString()).style.backgroundPosition = spritePosition(field_name,1);
				$("#item_img" + zone.toString()).style.width = spriteSize(field_name,"width",1);
					$("#item_img" + zone.toString()).style.left = (-$("#item_img" + zone.toString()).offsetWidth/2).toString() + "px";
				$("#item_img" + zone.toString()).style.height = spriteSize(field_name,"height",1);

				//아이템 이름, 필드 이미지 가시화
				$("#item_name" + zone.toString()).style.visibility = "visible";
				$("#item_img" + zone.toString()).style.visibility = "visible";

				//아이템 등록
				thisTime.push([zone, zoneArr, type, temp]);

				break;
			case "완성" :
				//item 인수를 드랍할 장비로 선정
				temp = item;

				//아이템 이름 변경, 이후 미리 측정한 길이 부여
				$("#description" + zone.toString()).className += " normal";//이름 숨기기 옵션용
				$("#item_name" + zone.toString()).className += " epic";
				$("#item_name" + zone.toString()).innerHTML = "(조각 완성) " + temp["name"];
					$("#description" + zone.toString()).style.left = (-$("#item_name" + zone.toString()).offsetWidth/2).toString() + "px";

				//아이템 필드 이미지 변경, 크기 조절
				var field_name = "field_" + temp["sort1"] + "_" + temp["sort2"] + "_" + temp["sort3"];
				$("#item_img" + zone.toString()).style.backgroundPosition = spritePosition(field_name,1);
				$("#item_img" + zone.toString()).style.width = spriteSize(field_name,"width",1);
					$("#item_img" + zone.toString()).style.left = (-$("#item_img" + zone.toString()).offsetWidth/2).toString() + "px";
				$("#item_img" + zone.toString()).style.height = spriteSize(field_name,"height",1);

				//아이템 이름, 필드 이미지 가시화
				$("#item_name" + zone.toString()).style.visibility = "visible";
				$("#item_img" + zone.toString()).style.visibility = "visible";

				//출현 이펙트 가시화 (에픽 전용)
				$("#effect_appear" + zone.toString()).style.left = (-144).toString() + "px";
				$("#effect_appear" + zone.toString()).style.top = (-235+25+($("#item_img" + zone.toString()).offsetHeight/2)).toString() + "px";
				$("#effect_appear" + zone.toString()).style.visibility = "visible";

				//=================================
				//* 완성템 개별 드랍 & 업데이트 - 시작
				//=================================
					//아이템 드랍 실시
					dropItem([zone,zoneArr,"에픽",temp]);
					//버튼 활성화 대기
					onoff("drop");
					dropCount = quantity - 1;//한 개 드롭되면 바로 버튼 활성화되도록

					//8-1. 출현 사운드 출력
					try {
						if ($("#option_sound").checked) {
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
					var text = "<span class='equip " + temp["sort1"] + " " + temp["sort2"] + " " + temp["sort3"] + " lv" + temp["level"].toString();
						text += "'><span class='run " + temp["sort1"] + " " + temp["sort2"] + " " + temp["sort3"] + " lv" + temp["level"].toString();
						text += "'>조각 완성 (" + thousand(makeCount.toString()) + "회차 \
									<span class='cost'> - 초대장 : " + thousand(cost[0]) + " / 실질 : " + thousand(cost[1]) + ")</span>\
								</span><br />";
					//8-3-2. 아이템 정보
					if (temp["sort1"] === "방어구") {//방어구
						if (temp["set"] !== "") {//세트 방어구
							text += "\
								<span class='get " + temp["sort1"] + " " + temp["sort2"] + " " + temp["sort3"] + " lv" + temp["level"].toString() + "'>\
									<span class='set'>　" + temp["name"] + "</span> [" + temp["sort2"] + " / " + temp["level"] + "제]\
									 <span class='quantity'>(x" + temp["get"] + ")</span>\
								</span><br />";
						} else {//'비'세트 방어구
							text += "\
								<span class='get " + temp["sort1"] + " " + temp["sort2"] + " " + temp["sort3"] + " lv" + temp["level"].toString() + "'>\
									<span class='epic'>　" + temp["name"] + "</span> [" + temp["sort2"] + " / " + temp["level"] + "제]\
									 <span class='quantity'>(x" + temp["get"] + ")</span>\
								</span><br />";
						}
					} else {//그외
						if (temp["set"] !== "") {//세트 그외
							text += "\
								<span class='get " + temp["sort1"] + " " + temp["sort2"] + " " + temp["sort3"] + " lv" + temp["level"].toString() + "'>\
								<span class='set'>　" + temp["name"] + "</span> [" + temp["sort3"] + " / " + temp["level"] + "제] \
								 <span class='quantity'>(x" + temp["get"] + ")</span>\
								</span><br />";
						} else {//'비'세트 그외
							text += "\
								<span class='get " + temp["sort1"] + " " + temp["sort2"] + " " + temp["sort3"] + " lv" + temp["level"].toString() + "'>\
								<span class='epic'>　" + temp["name"] + "</span> [" + temp["sort3"] + " / " + temp["level"] + "제] \
								<span class='quantity'>(x" + temp["get"] + ")</span>\
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
				$("#description" + zone.toString()).className += " normal";//이름 숨기기 옵션용
				$("#item_name" + zone.toString()).className += " rare";
				$("#item_name" + zone.toString()).innerHTML = "지옥파티 초대장";
					$("#description" + zone.toString()).style.left = (-$("#item_name" + zone.toString()).offsetWidth/2).toString() + "px";

				//아이템 필드 이미지 변경, 크기 조절
				var field_name = "field_초대장";
				$("#item_img" + zone.toString()).style.backgroundPosition = spritePosition(field_name,1);
				$("#item_img" + zone.toString()).style.width = spriteSize(field_name,"width",1);
					$("#item_img" + zone.toString()).style.left = (-$("#item_img" + zone.toString()).offsetWidth/2).toString() + "px";
				$("#item_img" + zone.toString()).style.height = spriteSize(field_name,"height",1);

				//아이템 이름, 필드 이미지 가시화
				$("#item_name" + zone.toString()).style.visibility = "visible";
				$("#item_img" + zone.toString()).style.visibility = "visible";

				//아이템 등록
				thisTime.push([zone, zoneArr, type, temp]);

				break;
		}

	}

	//아이템 드롭
	function dropItem(info) {
		//아이템 회전 시작
		$("#item_img" + info[0].toString()).className += " rotate";

		switch (info[2]) {
			case "에픽":
				//애니메이션 실행
				animation($("#effect_appear" + info[0].toString()),"appear",info[0],341,0,-4091,40,0);

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
function update(type, info, quantity) {
	//1. 획득/소비 수치 변경
	if (type === "코스모소울") {
		//획득량 증가
		get[2] += 1;
		$("#result_soul_get").innerHTML = thousand(get[2]);//출력
		//실질 초대장 감소
		cost[1] -= cutList[0];
		$("#cost_real").innerHTML = thousand(cost[1]);
		$("#cost_gold_real").innerHTML = setWon(cost[1]*gold);
	} else if (type === "지옥구슬") {
		get[4] += 1;
		$("#result_beed_get").innerHTML = thousand(get[4]);//출력
		//실질 초대장 감소
		cost[1] -= cutList[1][input[0]];
		$("#cost_real").innerHTML = thousand(cost[1]);
	} else if (type === "초대장") {
		get[5] += 1;
		$("#result_cost_get").innerHTML = thousand(get[5]);//출력
		//실질 초대장 감소
		cost[1] -= 1;
		$("#cost_real").innerHTML = thousand(cost[1]);
	} else if (type === "에픽" || type === "완성"){//에픽
		num = 0;//순번 찾기
		for (var i=0;i<itemList.length;i++) {
			if (itemList[i]["name"] === info["name"]) {
				num = i;
				break;
			}
		};
		get[0] += 1;//획득 에픽
			$("#result_epic_get").innerHTML = thousand(get[0]);//출력
		//(첫 보유량 증가일 경우 - 해체 버튼 활성화)
		if (get[1] === 0) {
			$("#result_button_epicDisassemble").disabled = "";
			$("#result_button_epicDisassemble").value = "해체";
		}
		get[1] += 1;//보유 에픽
			$("#result_epic_have").innerHTML = thousand(get[1]);//출력
		//2. itemList에 획득량 기록 (에픽 한정)
		itemList[num]["get"] += 1;//해당 아이템 획득 수 증가
		itemList[num]["have"] += 1;//해당 아이템 보유 수 증가
		if (itemList[num]["have"] === 1) {//IF : 첫번째 득템일 경우
			itemList[num]["firstCount"] = count;//당시 회차 기억
			itemList[num]["firstInvite"] = cost[0];//당시 총 소비 기억
			itemList[num]["firstReal"] = cost[1];//당시 실질 소비 기억
		}
		//3. 최초 보유이면 : 수집률 증가
		if (itemList[num]["have"] === 1) {
			collect += 1;
			var gathered = Math.floor((collect/itemList.length)*1000)/10;
			$("#inventory_check_collect").innerHTML = gathered.toString();
		}
	} else if (type === "조각") {
		num = 0;//순번 찾기
		for (var i=0;i<itemList.length;i++) {
			if (itemList[i]["name"] === info["name"]) {
				num = i;
				break;
			}
		};
		//2. itemList에 획득량 기록
		if (!quantity) {
			//수량 미지정 시 -> 1개로 조정
			quantity = 1;//해당 조각 수 증가
		}
		//수량만큼 조각 수 변경
		itemList[num]["jogak"] += quantity;//해당 조각 수 증가
		//3. 이번 업데이트로 조각을 제작 가능 수준까지 모인다면
		if (itemList[num]["jogak"] - quantity < maxJogak && itemList[num]["jogak"] >= maxJogak) {
			//에픽 도감 특수 처리
				//깜박임
				$("#shift4").classList.add("ready");
				//기본 애니메이션 종료
				clearTimeout(autoEffect["jogak"]);
				//애니메이션 실행
				animation($("#shift4_effect"),"appear","jogak",682,0,-8182,80,0);
		}
	}

	//3. record에 기록 - simulate() 함수에서 일괄 처리

	//4. inventory에 기록 (에픽 한정)
	if (type === "에픽" || type === "완성") {
		var tr_inventory = $("#inventory_row_" + num);
		//4-1. 보유량 업데이트
		tr_inventory.getElementsByTagName("td")[4].innerHTML = itemList[num]["have"].toString();
		//4-2. 해체 버튼 활성화
		if (tr_inventory.getElementsByTagName("td")[5].innerHTML === "") {
			tr_inventory.getElementsByTagName("td")[3].innerHTML = "\
				<a href='javascript:void(0);' onclick='recycle(" + num.toString() + ",1);' >해체</a>";
		}
		//4-3. 첫 획득 (없으면) 업데이트
		if (tr_inventory.getElementsByTagName("td")[5].innerHTML === "") {
			if (type === "에픽") {//드랍으로 첫 획득시
				tr_inventory.getElementsByTagName("td")[5].innerHTML = "\
					" + thousand(itemList[num]["firstCount"]) + "회차 (드랍)\
					<br/><span class='cost'>(초대장 : " + thousand(itemList[num]["firstInvite"]) + "\
					<br/>/ 실질 : " + thousand(itemList[num]["firstReal"]) + ")";
			} else if (type === "완성") {//완성으로 첫 획득시
				tr_inventory.getElementsByTagName("td")[5].innerHTML = "\
					" + thousand(itemList[num]["firstCount"]) + "회차 <span class='yellow'>(완성)</span>\
					<br/><span class='cost'>(초대장 : " + thousand(itemList[num]["firstInvite"]) + "\
					<br/>/ 실질 : " + thousand(itemList[num]["firstReal"]) + ")";
			}
		}
		//4-4. 해당 아이템 (색깔 입혀서) 가시화
		if (tr_inventory.className.indexOf("not_show") !== -1) {
			if (info["set"] !== "") {//세트
				tr_inventory.getElementsByTagName("td")[0].innerHTML = "<span class='set'>" + tr_inventory.getElementsByTagName("td")[0].innerHTML + "</span>";
			} else {//그 외
				tr_inventory.getElementsByTagName("td")[0].innerHTML = "<span class='epic'>" + tr_inventory.getElementsByTagName("td")[0].innerHTML + "</span>";
			}
		}
		tr_inventory.classList.remove("not_show");
		tr_inventory.classList.add("show");
	//5. set에 기록 (에픽 한정, '세트 현황' 한정)
		if (itemList[num]["set"] !== "") {
			//5-0. set에서 해당하는 행 찾기
			temp2 = $("#set_table").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
			for (var i=0;i<temp2;i++) {
				if ($("#set_row_" + i.toString()).getElementsByTagName("td")[0].innerHTML.indexOf(itemList[num]["name"]) !== -1) {
					var tr_set = $("#set_row_" + i.toString());
					break;
				}
			}
			//5-1. 보유량 업데이트
			tr_set.getElementsByTagName("td")[4].innerHTML = itemList[num]["have"].toString();
			//5-2. 해체 버튼 활성화
			if (tr_set.getElementsByTagName("td")[5].innerHTML === "") {
				tr_set.getElementsByTagName("td")[3].innerHTML = "\
					<a href='javascript:void(0);' onclick='recycle(" + num.toString() + ",1);' >해체</a>";//inventory 기준으로 설정 (set에서 위치는 차후에 별도로 계산)
			}
			//5-3. 첫 획득 (없으면) 업데이트
			if (tr_set.getElementsByTagName("td")[5].innerHTML === "") {
				if (type === "에픽") {//드랍으로 첫 획득시
					tr_set.getElementsByTagName("td")[5].innerHTML = "\
						" + thousand(itemList[num]["firstCount"]) + "회차 (드랍)\
						<br/><span class='cost'>(초대장 : " + thousand(itemList[num]["firstInvite"]) + "\
						<br/>/ 실질 : " + thousand(itemList[num]["firstReal"]) + ")";
				} else if (type === "완성") {//완성으로 첫 획득시
					tr_set.getElementsByTagName("td")[5].innerHTML = "\
						" + thousand(itemList[num]["firstCount"]) + "회차 <span class='yellow'>(완성)</span>\
						<br/><span class='cost'>(초대장 : " + thousand(itemList[num]["firstInvite"]) + "\
						<br/>/ 실질 : " + thousand(itemList[num]["firstReal"]) + ")";
				}
			}
			//5-4. 해당 아이템 (색깔 입혀서) 가시화
			if (tr_set.className.indexOf("not_show") !== -1) {
				tr_set.getElementsByTagName("td")[0].innerHTML = "<span class='set'>" + tr_set.getElementsByTagName("td")[0].innerHTML + "</span>";
			}
			tr_set.classList.remove("not_show");
			tr_set.classList.add("show");
			//5-5. '세트' 업데이트
			//5-5-1. 세트 지정
			temp2 = $("#set_table").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
			for (var i=0;i<temp2;i++) {
				if ($("#set_row_" + i.toString()).getElementsByTagName("td")[0].innerHTML.indexOf(itemList[num]["set"]) !== -1) {
					var tr_set_hap = $("#set_row_" + i.toString());
					break;
				}
			}
			//5-5-2. 세트 완성 현황 파악 및 반영
			var a = 0;//해당 세트 보유 파츠 수
			var b = 0;//해당 세트 총 파츠 수
			for (var i=0;i<itemList.length;i++) {
				if (itemList[i]["set"] === (tr_set_hap.getElementsByTagName("td")[0].innerText || tr_set_hap.getElementsByTagName("td")[0].textContent)) {
					if (itemList[i]["have"] > 0) {
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
					if (tr_set_hap.getElementsByTagName("td")[5].innerHTML === "") {
						tr_set_hap.getElementsByTagName("td")[5].innerHTML = "\
							" + thousand(count) + "회차\
							<span class='cost'><br/>(초대장 : " + thousand(cost[0]) + "\
							<br/>/ 실질 : " + thousand(cost[1]) + ")";
					}
				}
			//5-5-5. (a가 0보다 크면) 세트 가시화
			if (a > 0) {
				tr_set_hap.classList.remove("not_show");
				tr_set_hap.classList.add("show");
			} else {
				tr_set_hap.classList.remove("show");
				tr_set_hap.classList.add("not_show");
			}
		}
		//set 기록 끝

	}

	//6. craft에 기록 (에픽, 조각 한정)
	if (((type === "에픽" || type === "완성") && info["goyu"] === "") || type === "조각") {
		var tr_craft = $("#craft_row_" + num);
		//6-1. 보유량 업데이트
		if ((type === "에픽" || type === "완성")) {
			tr_craft.getElementsByTagName("td")[3].innerHTML = itemList[num]["have"].toString();
		}
		//6-2. 조각수 업데이트
		tr_craft.getElementsByTagName("td")[4].innerHTML = thousand(itemList[num]["jogak"]);
		if (itemList[num]["jogak"] < maxJogak) {//필요 조각 수 미만
			tr_craft.getElementsByTagName("td")[4].classList.remove("ready");
		} else {//필요 조각 수 이상 습득 시
			//"제작 가능"클래스 추가
			tr_craft.classList.add("available");
			//조각 수 색깔 변경
			tr_craft.getElementsByTagName("td")[4].classList.add("ready");
		}
		//6-3. 제작 버튼 활성화
		if (itemList[num]["jogak"] >= maxJogak) {
			tr_craft.getElementsByTagName("td")[5].className = "col_6 button";
			tr_craft.getElementsByTagName("td")[5].innerHTML = "제작";
			tr_craft.getElementsByTagName("td")[5].onclick = (function(num) {
				return function() {
					make(num,1);
				};})(num);
		}
		//6-4. 해당 아이템 (색깔 입혀서) 가시화 (조각 한정)
		if (type === "조각") {
			if (tr_craft.className.indexOf("not_show") !== -1) {
				if (info["set"] !== "") {//세트
					tr_craft.getElementsByTagName("td")[0].innerHTML = "<span class='set'>" + tr_craft.getElementsByTagName("td")[0].innerHTML + "</span>";
				} else {//그 외
					tr_craft.getElementsByTagName("td")[0].innerHTML = "<span class='epic'>" + tr_craft.getElementsByTagName("td")[0].innerHTML + "</span>";
				}
			}
			tr_craft.classList.remove("not_show");
			tr_craft.classList.add("show");
		}
	}

	//7. 수집현황 업데이트
	checkObjective();
}


//inventory, set에서 아이템 해체
function recycle(num,amount) {
	//정말로 해체할지 질문
	if (!$("#inventory_check_confirm").checked || !$("#set_check_confirm").checked) {
		if (!confirm("'" + itemList[num]["name"] + "' 을(를) " + amount.toString() + "개 해체하시겠습니까?\n(보유 수량 : " + itemList[num]["have"].toString() + ")")) {
			return;
		}
	}
	//1. 아이템 수량 감소
		//1-1. 해당 아이템 보유 갯수 amount만큼 감소
		itemList[num]["have"] -= amount;
		//1-2. 전체 에픽 보유량 갯수 감소 & result에 표기
		get[1] -= amount;
		$("#result_epic_have").innerHTML = thousand(get[1]);//출력
		//1-2-1. 에픽 개수가 0이 되면 - result에서 해체 버튼 비활성화
		if (get[1] === 0) {
			$("#result_button_epicDisassemble").disabled = "disabled";
			$("#result_button_epicDisassemble").value = "없음";
		}
		//1-3. inventory에 반영 (tr)
		var tr = $("#inventory_row_" + num);
		tr.getElementsByTagName("td")[4].innerHTML = itemList[num]["have"].toString();
		//1-4. set에 반영 (tr2) (세트 현황 한정)
		if (itemList[num]["set"] !== "") {
			temp2 = $("#set_table").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
			for (var i=0;i<temp2;i++) {
				if ($("#set_row_" + i.toString()).getElementsByTagName("td")[0].innerHTML.indexOf(itemList[num]["name"]) !== -1) {
					tr2 = $("#set_row_" + i.toString());
					break;
				}
			}
			tr2.getElementsByTagName("td")[4].innerHTML = itemList[num]["have"].toString();
		}
	//2. 결과물 처리
		//실질 초대장 소모량 감소
		cost[1] -= disCount("초대장",itemList[num]["level"])*amount;
		$("#cost_real").innerHTML = thousand(cost[1]);
		$("#cost_gold_real").innerHTML = setWon(cost[1]*gold);
	//3. IF : 해체를 해서 보유량이 0이 되었을 경우
	if (itemList[num]["have"] === 0) {
		//3-1. '첫 획득 정보' 초기화
		itemList[num]["firstCount"] === 0;//첫 득템 당시 회차
		itemList[num]["firstInvite"] === 0;//첫 득템 당시 총 소모 초대장
		itemList[num]["firstReal"] === 0;//첫 득템 당시 실질 소모 초대장
		//3-2. 수집률 감소
		collect -= 1;
		var gathered = Math.floor((collect/itemList.length)*1000)/10;
		$("#inventory_check_collect").innerHTML = gathered.toString();
		//3-3. inventory 설정
			//3-3-1. inventory - '해체' 버튼 제거
			tr.getElementsByTagName("td")[3].innerHTML = "없음";
			//3-3-2. inventory - '첫 획득' 기록 제거
			tr.getElementsByTagName("td")[5].innerHTML = "";
			//3-3-3. inventory - 해당 아이템 (색깔 지우고) 가시화 해제
			tr.getElementsByTagName("td")[0].innerHTML = (tr.getElementsByTagName("td")[0].innerText || tr.getElementsByTagName("td")[0].textContent);
			tr.classList.remove("show");
			tr.classList.add("not_show");
		//3-4. set 설정
		if (itemList[num]["set"] !== "") {
			//3-4-1. inventory - '해체' 버튼 제거
			tr2.getElementsByTagName("td")[3].innerHTML = "없음";
			//3-4-2. inventory - '첫 획득' 기록 제거
			tr2.getElementsByTagName("td")[5].innerHTML = "";
			//3-4-3. inventory - 해당 아이템 (색깔 지우고) 가시화 해제
			tr2.getElementsByTagName("td")[0].innerHTML = (tr2.getElementsByTagName("td")[0].innerText || tr2.getElementsByTagName("td")[0].textContent);
			tr2.classList.remove("show");
			tr2.classList.add("not_show");
			//3-5. set에서 '세트' 설정
			temp2 = $("#set_table").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
			for (var i=0;i<temp2;i++) {
				if ($("#set_row_" + i.toString()).getElementsByTagName("td")[0].innerHTML.indexOf(itemList[num]["set"]) !== -1) {
					tr_set = $("#set_row_" + i.toString());
					break;
				}
			}
			//5-5-2. 세트 완성 현황 파악 및 반영
			var a = 0;
			var b = 0;
			for (var i=0;i<itemList.length;i++) {
				if (itemList[i]["set"] === (tr_set.getElementsByTagName("td")[0].innerText || tr_set.getElementsByTagName("td")[0].textContent)) {
					if (itemList[i]["have"] > 0) {
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
				tr_set.classList.remove("not_show");
				tr_set.classList.add("show");
			} else {
				tr_set.classList.remove("show");
				tr_set.classList.add("not_show");
			}

		}
	}

	//수집현황 업데이트
	checkObjective();
}


//craft에서 아이템 제작
function make(num,amount) {
	//0-0. 시뮬레이터 실행중 - 제작 불가
	if (running === 1) {
		alert("※ 경고 : 탐색 중에는 아이템 제작을 할 수 없습니다.");
		return;
	}

			//0-1. 코스모 소울 수량 체크 (부족하면 취소)  - "무조건" 차감 : 부족할 일은 없음
			/*
			if (get[3] < soulCount(itemList[num]["level"])) {
				alert("※경고 : 코스모 소울이 부족합니다.\n(필요량 : " + thousand(soulCount(itemList[num]["level"])) + "개, 보유량 : " + thousand(get[3]) + "개)");
				return;
			}
			*/

	//0-2. 정말로 제작할지 질문
	if (!confirm("'" + itemList[num]["name"] + "' 을(를) " + amount.toString() + "개 제작하시겠습니까?\
\n(코스모소울 " + soulCount(itemList[num]["level"]) + "개 분의 실질 초대장 소모량이 증가합니다.)\
\n(실질 초대장 소모량 증가량 : " + thousand(soulCount(itemList[num]["level"]) * cutList[0]) + "장)")) {
		return;
	}
	//0-3. 에픽 도감 - 해당 아이템 찾아두기
	var tr_craft = $("#craft_row_" + num);

	//1. 코스모소울 "대신" 실질 초대장 소모량 증가
	cost[1] += soulCount(itemList[num]["level"]) * cutList[0];
	$("#cost_real").innerHTML = thousand(cost[1]);
	$("#cost_gold_real").innerHTML = setWon(cost[1]*gold);

	//코스모소울 : 소모하지 않음
	/*
	get[3] -= soulCount(itemList[num]["level"]);
	$("#result_soul_have").innerHTML = thousand(get[3]);
		//보유량이 0이 되면 - 해체 버튼 비활성화
		if (get[3] === 0) {
			$("#result_button_soulDisassemble").disabled = "disabled";
			$("#result_button_soulDisassemble").value = "없음";
		}
	*/

	//2. 에픽 조각 차감
	itemList[num]["jogak"] -= maxJogak;
	tr_craft.getElementsByTagName("td")[4].innerHTML = thousand(itemList[num]["jogak"]);
	if (itemList[num]["jogak"] < maxJogak) {
		//필요 조각 수 미만 보유 시
		tr_craft.getElementsByTagName("td")[4].classList.remove("ready");
	} else {
		//필요 조각 수 이상 보유 시
		tr_craft.getElementsByTagName("td")[4].classList.add("ready");
	}
	//3. (에픽 조각 차감 후 조각 수가 0일 경우) 에픽 도감 - 해당 아이템 비가시화
	if (itemList[num]["jogak"] === 0) {
		tr_craft.classList.remove("show");
		tr_craft.classList.add("not_show");
	}
	//4. (에픽 조각 차감 후 제작이 불가능할 경우) 에픽 도감 - 해당 아이템 제작 버튼 해제
	if (itemList[num]["jogak"] < maxJogak) {
		tr_craft.classList.remove("available");
		tr_craft.getElementsByTagName("td")[5].className = "col_6";
		tr_craft.getElementsByTagName("td")[5].innerHTML = "불가";
		tr_craft.getElementsByTagName("td")[5].onclick = "";
	}
	//5. 에픽 도감 창 닫기
	shift("");
	//6. 필드 아이템 정리
	for (var i=0;i<maxQuantity;i++) {
		//아이템 루팅 시작 위치로 이동
		$("#item" + i.toString()).style.top = startList[input[0]][0].toString() + "px";
		$("#item" + i.toString()).style.left = startList[input[0]][1].toString() + "px";

		//아이템 이름 숨기기&이동, 이미지 숨기기
		$("#description" + i.toString()).className = "description";
		$("#item_name" + i.toString()).className = "item_name";
		$("#item_name" + i.toString()).style.visibility = "hidden";
			$("#description" + i.toString()).style.left = "0px";
		$("#item_img" + i.toString()).style.visibility = "hidden";

		//에픽 이펙트 숨기기
		$("#effect_appear" + i.toString()).style.visibility = "hidden";
		$("#effect_land" + i.toString()).style.visibility = "hidden";
		$("#effect_wait" + i.toString()).style.visibility = "hidden";

		//애니메이션 정지
		clearTimeout(autoLooting[i-1]);
		clearTimeout(autoEffect["appear"][i-1]);
		clearTimeout(autoEffect["land"][i-1]);
		clearTimeout(autoEffect["wait"][i-1]);
		$("#item_img"+ i.toString()).className = "item_img";
	}
	//7. 아이템 드롭
	var point = Math.floor(Math.random() * coopList[input[0]].length);
	var list = coopList[input[0]];
	getItem("완성", itemList[num],point,list);
}


//=================================================================================================================
//※ 함수 - 애니메이션
//=================================================================================================================
//아이템 루팅
function looting(type, zone, zoneArr, step, sound, animating, leftMove, topMove, topMoveModify) {

	if (step === 1) {
		var leftMove = zoneArr[zone][0];
		var topMove = zoneArr[zone][1];
		var topMoveModify = 5;//5로 고정
	}

	if (step < 12) {

		$("#item" + zone.toString()).style.left = ($("#item" + zone.toString()).offsetLeft + leftMove).toString() + "px";
		$("#item" + zone.toString()).style.top = ($("#item" + zone.toString()).offsetTop - topMove).toString() + "px";

		step += 1;
		topMove -= topMoveModify;

		autoLooting[zone-1] = setTimeout(function() {
			looting(type, zone, zoneArr, step, sound, animating, leftMove, topMove, topMoveModify);
		},50);
	} else {
		//사운드 출력
		if (sound === 1) {
			try {
				if ($("#option_sound").checked) {
					sound_land.pause();
					sound_land.currentTime = 0;
					sound_land.play();
				}
			} catch(e) {
			}
		}

		//이미지 회전 중단
		$("#item_img"+ zone.toString()).className = "item_img shadow";

		//아이템 드랍 대기
		dropCount += 1;
		if (dropCount === quantity) {//모든 아이템 드랍 완료
			//가브리엘 미출현 중에만 버튼 활성화
			if (gabrielSetting["trading"] === false) {
				//자동 실행 변수 = ofF
				running = 0;
				//버튼 활성화
				onoff(0);
			}
		}

		//애니메이션 지속
		if (animating === 1) {
			//착지 이펙트 가시화
			$("#effect_land" + zone.toString()).style.left = (-302).toString() + "px";
			$("#effect_land" + zone.toString()).style.top = (-161+25+($("#item_img" + zone.toString()).offsetHeight/2)).toString() + "px";
			$("#effect_land" + zone.toString()).style.visibility = "visible";
			animation($("#effect_land" + zone.toString()),"land",zone,604,0,-4227,150,0);

			//대기 이펙트 가시화
			$("#effect_wait" + zone.toString()).style.left = (-99).toString() + "px";
			$("#effect_wait" + zone.toString()).style.top = (-98+25+($("#item_img" + zone.toString()).offsetHeight/2)).toString() + "px";
			$("#effect_wait" + zone.toString()).style.visibility = "visible";
			animation($("#effect_wait" + zone.toString()),"wait",zone,188,0,-2255,100,1);
		}
	}
}

//에픽 드랍 이펙트 출력
function animation(target,type,zone,frameWidth,now,limit,speed,repeat) {
	switch (zone) {
		case "jogak":
			//에픽 조각
			if (now - frameWidth >= limit) {
				target.style.display = "block";
				target.style.backgroundPosition = (now - frameWidth).toString() + "px 0px";
				autoEffect["jogak"] = setTimeout(function() {
					animation(target,type,zone,frameWidth,now - frameWidth,limit,speed,repeat);
				}, speed);
			} else {
				target.style.display = "none";
			}

			break;
		default :
			//에픽 아이템
			if (now - frameWidth >= limit) {
				target.style.backgroundPosition = (now - frameWidth).toString() + "px 0px";
				autoEffect[type][zone-1] = setTimeout(function() {
					animation(target,type,zone,frameWidth,now - frameWidth,limit,speed,repeat);
				}, speed);
			} else if (repeat === 1){
				target.style.backgroundPosition = "0px 0px";
				autoEffect[type][zone-1] = setTimeout(function() {
					animation(target,type,zone,frameWidth,0,limit,speed,repeat);
				}, speed);
			} else {
				target.style.visibility = "hidden";
			}
	}
}

//=================================================================================================================
//※ 함수 - 기타 (브금 실행, 버튼 변경, 창 변경, 확률 변경)
//=================================================================================================================
//브금 실행
function play(type) {
	//IF(기존 브금 실행중) 해당 브금 종료
	if (bgm !== "none") {
		switch (bgm) {
			case "hell":
				bgmList["hell"].currentTime = 0;
				bgmList["hell"].pause();

				break;
			default:
				bgmList[bgm.toString()].currentTime = 0;
				bgmList[bgm.toString()].pause();
				break;
		}
	}

	//신규 브금 실행 or 브금 정지
	if ($("#option_bgm").checked === false) {
		bgm = "none";
	} else {
		switch (type) {
			case "dungeon":
				bgmList[input[0].toString()].play();
				bgm = input[0];

				break;
			case "hell":
				bgmList["hell"].play();
				bgm = "hell";

				break;
		}
	}
}

//상황에 따른 버튼 & 특정 창 변경
function onoff(cmd) {
	switch (cmd) {
		//초기 상태
		case 0:
			//버튼
			$("#start1").disabled = "";
			$("#start2").disabled = "";

			$("#start1").value = "1회 실행";
			$("#start2").value = "탐색 실시";

			$("#dungeon").disabled = "";
			$("#difficulty").disabled = "";
			$("#channel").disabled = "";

			$("#objective_list").disabled = "";
				$("#objective_item_first").disabled = "";
				if ($("#objective_item_first").value !== "") {
					$("#objective_item_second").disabled = "";
				}
				if ($("#objective_item_second").value !== "") {
					$("#objective_item_third").disabled = "";
				}
				if ($("#objective_item_third").value !== "") {
					$("#objective_item_name").disabled = "";
				}

				$("#objective_set_first").disabled = "";
				if ($("#objective_set_first").value !== "") {
					$("#objective_set_name").disabled = "";
				}
				$("#objective_count_text").disabled = "";
				$("#objective_cost_text").disabled = "";
				$("#objective_fatigue_max").disabled = "";
				$("#objective_fatigue_per").disabled = "";

			$("#reset").disabled = "";

			//창
			$("#popup_gabriel").style.display = "none";

			break;
		//1회 실행 중(= 1회 실행 후 아이템 드랍 중)
		case 1:
			//버튼
			$("#start1").disabled = "disabled";
			$("#start2").disabled = "disabled";

			$("#start1").value = "실행 중";
			$("#start2").value = "탐색 실시";

			$("#dungeon").disabled = "disabled";
			$("#difficulty").disabled = "disabled";
			$("#channel").disabled = "disabled";

			$("#objective_list").disabled = "disabled";
			$("#objective_item_first").disabled = "disabled";
			$("#objective_item_second").disabled = "disabled";
			$("#objective_item_third").disabled = "disabled";
			$("#objective_item_name").disabled = "disabled";
			$("#objective_set_first").disabled = "disabled";
			$("#objective_set_name").disabled = "disabled";
			$("#objective_count_text").disabled = "disabled";
			$("#objective_cost_text").disabled = "disabled";
			$("#objective_fatigue_max").disabled = "disabled";
			$("#objective_fatigue_per").disabled = "disabled";

			$("#reset").disabled = "disabled";

			//창
			$("#popup_gabriel").style.display = "none";

			break;
		//탐색 중
		case 2:
			//버튼
			$("#start1").disabled = "disabled";
			$("#start2").disabled = "";

			$("#start1").value = "1회 실행";
			$("#start2").value = "탐색 중지";

			$("#dungeon").disabled = "disabled";
			$("#difficulty").disabled = "disabled";
			$("#channel").disabled = "disabled";

			$("#objective_list").disabled = "disabled";
			$("#objective_item_first").disabled = "disabled";
			$("#objective_item_second").disabled = "disabled";
			$("#objective_item_third").disabled = "disabled";
			$("#objective_item_name").disabled = "disabled";
			$("#objective_set_first").disabled = "disabled";
			$("#objective_set_name").disabled = "disabled";
			$("#objective_count_text").disabled = "disabled";
			$("#objective_cost_text").disabled = "disabled";
			$("#objective_fatigue_max").disabled = "disabled";
			$("#objective_fatigue_per").disabled = "disabled";

			$("#reset").disabled = "disabled";

			//창
			$("#popup_gabriel").style.display = "none";

			break;
		//가브리엘 등장
		case "gabriel" :
			//버튼
			$("#start1").disabled = "disabled";
			$("#start2").disabled = "disabled";

			$("#start1").value = "조각 교환 중";
			$("#start2").value = "조각 교환 중";

			//창 (수동 교환 지정 시에만)
			if ($("#gabriel_type").value === "manual") {
				$("#popup_gabriel").style.display = "block";
			}

			break;
		//자동일 때 가브리엘 첫 등장
		case "gabriel_autoFirst" :
			//버튼
			$("#start1").disabled = "disabled";
			$("#start2").disabled = "disabled";

			$("#start1").value = "조각 교환 중";
			$("#start2").value = "조각 교환 중";

			//창 (이번에만 딱 한번)
			$("#popup_gabriel").style.display = "block";

			break;
		//아이템 드랍 중
		case "drop":
			//버튼
			$("#start1").disabled = "disabled";
			$("#start2").disabled = "disabled";

			$("#start2").value = "확인 중";

			//창
			$("#popup_gabriel").style.display = "none";

			break;
	}
}

//창 변경
function shift(target) {
	var temp = 0;

	//record
	if (target === "record")  {
		//1. 열렸다고 기록
		temp = 1;
		right_display = "record";

		//2. 제목 표시
		$("#popup_title").className = "title_record";//클래스 설정 이유 : 배경이미지 변경
		$("#popup_title").innerHTML = "획득 기록";

		//3. 필터링, 본문, 체크박스 표시
		$("#record_filter").style.display = "block";
		$("#record").style.display = "block";
		$("#record_check").style.display = "block";

		//4. 버튼 변경
		$("#shift1").classList.add("selected");
		$("#shift1").value = "창 닫기";

		//5. 최신 내용 업데이트 (최신 업데이트 회차가 현 회차와 다를 경우)
		if ($("#record").innerHTML !== content_text[0]) {
			//내용 업데이트
			$("#record").innerHTML = content_text[0];
		}

		//6. 화면 스크롤
		$("#record").scrollTop = $("#record").scrollHeight;
	} else {
		//1. 필터링, 본문, 체크박스 미표시
		$("#record_filter").style.display = "none";
		$("#record").style.display = "none";
		$("#record_check").style.display = "none";

		//2. 버튼 초기화
		$("#shift1").classList.remove("selected");
		$("#shift1").value = "획득 기록";
	}

	//inventory
	if (target === "inventory")  {
		//1. 열렸다고 기록
		temp = 1;
		right_display = "inventory";

		//2. 제목 표시
		$("#popup_title").className = "title_inventory";//클래스 설정 이유 : 배경이미지 변경
		$("#popup_title").innerHTML = "인벤토리";

		//3. 필터링, 본문, 체크박스 표시
		$("#inventory_filter").style.display = "block";
		$("#inventory").style.display = "block";
		$("#inventory_check").style.display = "block";

		//4. 버튼 변경
		$("#shift2").classList.add("selected");
		$("#shift2").value = "창 닫기";
	} else {
		//1. 필터링, 본문, 체크박스 미표시
		$("#inventory_filter").style.display = "none";
		$("#inventory").style.display = "none";
		$("#inventory_check").style.display = "none";

		//2. 버튼 초기화
		$("#shift2").classList.remove("selected");
		$("#shift2").value = "인벤토리";
	}

	//set
	if (target === "set")  {
		//1. 열렸다고 기록
		temp = 1;
		right_display = "set";

		//2. 제목 표시
		$("#popup_title").className = "title_set";//클래스 설정 이유 : 배경이미지 변경
		$("#popup_title").innerHTML = "세트 현황";

		//3. 필터링, 본문, 체크박스 표시
		$("#set_filter").style.display = "block";
		$("#set").style.display = "block";
		$("#set_check").style.display = "block";

		//4. 버튼 변경
		$("#shift3").classList.add("selected");
		$("#shift3").value = "창 닫기";
	} else {
		//1. 필터링, 본문, 체크박스 미표시
		$("#set_filter").style.display = "none";
		$("#set").style.display = "none";
		$("#set_check").style.display = "none";

		//2. 버튼 초기화
		$("#shift3").classList.remove("selected");
		$("#shift3").value = "세트 현황";
	}

	//craft
	if (target === "craft")  {
		//1. 열렸다고 기록
		temp = 1;
		right_display = "craft";

		//2. 제목 표시
		$("#popup_title").className = "title_craft";//클래스 설정 이유 : 배경이미지 변경
		$("#popup_title").innerHTML = "에픽 도감";

		//3. 필터링, 본문, 체크박스 표시
		$("#craft_filter").style.display = "block";
		$("#craft").style.display = "block";
		$("#craft_check").style.display = "block";

		//4. 버튼 변경
		$("#shift4").classList.add("selected");
		$("#shift4").classList.remove("ready");//색상 변화 효과 제거
		$("#shift4").value = "창 닫기";
	} else {
		//1. 필터링, 본문, 체크박스 미표시
		$("#craft_filter").style.display = "none";
		$("#craft").style.display = "none";
		$("#craft_check").style.display = "none";

		//2. 버튼 초기화
		$("#shift4").classList.remove("selected");
		$("#shift4").value = "에픽 도감";
	}

	//chance
	if (target === "chance")  {
		//1. 열렸다고 기록
		temp = 2;
		right_display = "chance";

		//2. chance 팝업 표시
		$("#popup_chance").style.display = "block";

		//6. 화면 스크롤 (위로)
		$("#popup_chance_main").scrollTop = 0;
	} else {
		//1. chance 팝업 미표시
		$("#popup_chance").style.display = "none";
	}

	//(chance 빼고) 공용 팝업창
	if (temp === 1) {
		//(chance 빼고) 하나라도 열렸다면
		$("#popup").style.display = "block";
		$("#checkbox").style.display = "block";
	} else {
		//(chance 빼고) 열린 게 없다면
		$("#popup").style.display = "none";
		$("#checkbox").style.display = "none";
		right_display = "none";
	}

	//열었음 : 열기 효과음
	if ($("#option_sound").checked === true) {
		if (temp > 0) {
			sfxList["open"].play();
		//닫았음 : 닫기 효과음
		} else {
			sfxList["close"].play();
		}
	}
}

//확률 변경
function setChance(cmd) {
	/*기초 변수 준비*/
	var chanceList = [
		["어려움","매우어려움"],
		["노멀","익스퍼트","마스터","킹","슬레이어"],
		["에픽 아이템","코스모 소울","지옥 구슬"]
	];
	//apply 전용 (100%가 넘는지 체크)
	var num = 0;
	//소수점 연산 정확도 상승
	function fixed(num, multi) {
		var temp;
		var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
		if (!match) {
			temp = 0;
		} else {
			temp = Math.max(
				0,
				// Number of digits right of decimal point.
				(match[1] ? match[1].length : 0)
				// Adjust for scientific notation.
				- (match[2] ? +match[2] : 0)
			);
		}

		if (!multi) {
			num = num.toFixed(temp) + 3;
		} else {
			num = (num * multi).toFixed(Math.max(0,temp - Math.log(multi) + 3));
		}

		return parseFloat(num);
	}

	//작업 개시
	for (var i=1;i<=chanceList[0].length;i++) {
		for (var j=1;j<=chanceList[1].length;j++) {
			//드랍률 3종 합계 초기화
			num = 0;

			for (var k=1;k<=chanceList[2].length;k++) {
				switch (cmd) {
					case "show":
						$("#chance_text_" + i.toString() + j.toString() + k.toString()).value = fixed(chanceList_num[1][i-1][j-1][k],100).toString();

						break;
					case "reset":
						$("#chance_text_" + i.toString() + j.toString() + k.toString()).value = fixed(chanceList_num_default[1][i-1][j-1][k],100).toString();
						chanceList_num[1][i-1][j-1][k] = chanceList_num_default[1][i-1][j-1][k];

						break;
					case "perfect":
						//에픽
						if (k === 1) {
							$("#chance_text_" + i.toString() + j.toString() + k.toString()).value = 100;
							chanceList_num[1][i-1][j-1][k] = 1;
						//비에픽
						} else {
							$("#chance_text_" + i.toString() + j.toString() + k.toString()).value = 0;
							chanceList_num[1][i-1][j-1][k] = 0;
						}
					case "apply":
						//입력된 값이 숫자인지 확인
						if (!isNumber($("#chance_text_" + i.toString() + j.toString() + k.toString()).value)) {
							alert("※ 경고 : \"" + chanceList[0][i-1] + "\" & \"" + chanceList[1][j-1] + "\" 난이도의 \"" + chanceList[2][k-1] + "\" 드랍률이 숫자가 아닙니다.");

							return;
						//공란이면 "0"을 입력
						} else if ($("#chance_text_" + i.toString() + j.toString() + k.toString()).value === "") {
							$("#chance_text_" + i.toString() + j.toString() + k.toString()).value = "0";
						}

						num += fixed(parseFloat($("#chance_text_" + i.toString() + j.toString() + k.toString()).value),0.01);

						break;
				}
			}

			switch (cmd) {
			//"초기화" : 마봉 확률 초기화
				case "reset":
					chanceList_num[1][i-1][j-1][0] = chanceList_num_default[1][i-1][j-1][0];

					break;
			//"퍼펙트" : 마봉 확률 = 0
				case "perfect":
					chanceList_num[1][i-1][j-1][0] = 0;

					break;
			//"적용" : 아이템 3종 확률 합이 100% 이하면 적용
				case "apply":
					if (num > 1) {

						alert("※ 경고 : \"" + chanceList[0][i-1] + "\" & \"" + chanceList[1][j-1] + "\" 난이도의 드랍률의 합계가 100%를 넘습니다.");

						return;
					}
					//마봉
					chanceList_num[1][i-1][j-1][0] = 1 - num;
					//에픽 아이템
					chanceList_num[1][i-1][j-1][1] = fixed(parseFloat($("#chance_text_" + i.toString() + j.toString() + "1").value),0.01);
					//코스모 소울
					chanceList_num[1][i-1][j-1][2] = fixed(parseFloat($("#chance_text_" + i.toString() + j.toString() + "2").value),0.01);
					//지옥 구슬
					chanceList_num[1][i-1][j-1][3] = fixed(parseFloat($("#chance_text_" + i.toString() + j.toString() + "3").value),0.01);

					break;
			}
		}
	}

	//안내 메시지
	switch (cmd) {
		case "reset":
			alert("드랍 확률이 초기화되었습니다.");

			break;
		case "perfect":
			alert("에픽 드랍률이 100%가 되었습니다.");

			break;
		case "apply":
			alert("드랍 확률이 정상적으로 적용되었습니다.");

			break;
	}
}
