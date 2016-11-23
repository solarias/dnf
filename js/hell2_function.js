
	//=================================================================================================================
	//※ 함수 - 선로딩, 내부작업용
	//=================================================================================================================
	// 컨텐츠 선로딩 (원본 출처 : http://stackoverflow.com/questions/8264528/image-preloader-javascript-that-supports-eventNames/8265310#8265310)
	function loadContents(callBack) {
		//환경 세팅
		var arrImage = imageList;
			var imagesArray = [];
			var img;
		var arrBgm = bgmList;
		var arrSfx = sfxList;
		var initial = arrImage.length + Object.keys(arrBgm).length + Object.keys(arrSfx).length;
			var remaining = initial;
			var imageState = arrImage.length;
			var soundState = Object.keys(arrBgm).length + Object.keys(arrSfx).length;
		var percent = "0%";

		//로딩 함수
		function setLoad(text) {
			//퍼센트 계산
			percent = Math.round((((initial - remaining + 1)/initial)*100),0).toString() + "%";
			//외부 처리
			$("#loading_notice").innerHTML = "" +
				text + " 로딩 중 (" + percent + " 완료)";
			$("#loading_progress_bar").style.width = percent;
			//내부 처리
			--remaining;
			switch (text) {
				case "이미지":
					--imageState;

					break;
				default:
					--soundState;

					break;
			}
			//로딩 완료 -> 실행 개시
			if (remaining <= 0) {
				callBack();
			}
			//이미지"만" 로딩 완료, 사운드 로딩 0 -> 실행 개시
			if (imageState <= 0 && soundState === Object.keys(arrBgm).length + Object.keys(arrSfx).length) {
				//사운드 oncanplaythrough 무시
				if (Object.keys(arrBgm).length > 0) {
					for (var key in arrBgm) {
						if (arrBgm.hasOwnProperty(key)) {
							arrBgm[key].oncanplaythrough = "";
						}
					}
				}
				if (Object.keys(arrSfx).length > 0) {
					for (var key in arrSfx) {
						if (arrSfx.hasOwnProperty(key)) {
							arrSfx[key].oncanplaythrough = "";
						}
					}
				}

				callBack();
			}
		}

		//이미지 로딩
		for (var i = 0; i < arrImage.length; i++) {
			img = new Image();
			img.onload = function() {
				setLoad("이미지");
			};
			img.onerror = function() {
				setLoad("이미지");
			};
			img.src = arrImage[i];
			$("#imagePreloader").innerHTML += "<img src='" + arrImage[i] + "' />";
			imagesArray.push(img);
		}

		//배경음 로드
		if (Object.keys(arrBgm).length > 0) {
			for (var key in arrBgm) {
				if (arrBgm.hasOwnProperty(key)) {
					try {
						arrBgm[key].oncanplaythrough = function() {
							setLoad("배경음");
							this.oncanplaythrough = "";
						};
						arrBgm[key].onerror = function() {
							setLoad("배경음");
							this.oncanplaythrough = "";
						};
					} catch(e) {
						setLoad("배경음");
					}
				}
			}
		}

		//효과음 로드
		if (Object.keys(arrSfx).length > 0) {
			for (var key in arrSfx) {
				if (arrSfx.hasOwnProperty(key)) {
					try {
						arrSfx[key].oncanplaythrough = function() {
							setLoad("효과음");
							this.oncanplaythrough = "";
						};
						arrSfx[key].onerror = function() {
							setLoad("효과음");
							this.oncanplaythrough = "";
						};
					} catch(e) {
						setLoad("효과음");
					}
				}
			}
		}
	}



	//에픽 소울 비용 계산
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
			case "에픽 소울":
				for (var i=0;i<cutList[3].length;i++) {
					if (cutList[3][i][0] === level) {
						return cutList[3][i][1];
					}
				}

				break;
		}
	}

//=================================================================================================================
//※ 함수 - 캐릭터 관련
//=================================================================================================================
	//캐릭터 직업 초기화
	function clearCharacterClass() {
		var tempArr = Object.keys(characterList);
		for (var i=0;i<tempArr.length;i++) {
			$("#character_sprite").classList.remove(tempArr[i]);
		}
	}

	//무작위 캐릭터 설정
	function setRandomCharacter() {
		//(혹시 모르니) 캐릭터 직업 초기화
		clearCharacterClass();

		var tempArr = deepCopy(Object.keys(characterList));
		for (var i=0;i<tempArr.length;i++) {
			if (tempArr[i] === "beckey") {
				tempArr.splice(i,1);
				break;
			}
		}
		var tempClass = tempArr[Math.floor(Math.random() * tempArr.length)];
		$("#character_sprite").classList.add(tempClass);
	}

	//해당 직업 표시
	function setCharacter(selected) {
		$("#character_sprite").classList.add(selected);
		$("#character_type").disabled = "disabled";
		if (selected === "beckey") {
			clearSelect($("#character_type"));
			var option = document.createElement("option");
				option.innerHTML = "베키";
				option.value = "beckey";
				$("#character_type").add(option);
		} else {
			$("#character_type").selectedIndex = indexSelectByValue($("#character_type"),myCharacter);
		}
	}
//=================================================================================================================
//※ 함수 - 옵션 제어용
//=================================================================================================================
	//아이템 명칭 출력 여부
	function opt_name_normal(cmd) {
		if (cmd === "on") $("#option_name_normal").checked = optionList["name_normal"];

		var sheet = $("#style_name_normal");
		try {
			//필터링 적용
			if ($("#option_name_normal").checked) {
				sheet.innerHTML = "" +
				".item_name.type_normal {" +
				"	display:table;" +
				"}";
			} else {
				//필터링 해제
				sheet.innerHTML = "";
			}
		} catch(e) {
			alert("＊경고 : \"아이템 명칭\" 필터링을 사용할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
			$("#option_name_normal").checked = true;
		}
	}

	//조각 명칭 출력 여부
	function opt_name_jogak(cmd) {
		if (cmd === "on") $("#option_name_jogak").checked = dataObj["optionList"]["name_jogak"];

		var sheet = $("#style_name_jogak");
		try {
			//필터링 적용
			if ($("#option_name_jogak").checked) {
				sheet.innerHTML = "" +
				".item_name.type_jogak {" +
				"	display:table;" +
				"}";
			} else {
				//필터링 해제
				sheet.innerHTML = "";
			}

		} catch(e) {
			alert("＊경고 : \"에픽 조각 명칭\" 필터링을 사용할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
			$("#option_name_jogak").checked = false;
		}
	}

	//캐릭터 이미지 출력
	function opt_character(cmd) {
		if (cmd === "on") $("#option_character").checked = optionList["character"];

		if ($("#option_character").checked) {
			$("#character_sprite").style.display = "block";
		} else {
			$("#character_sprite").style.display = "none";
		}
	}

	//BGM 출력여부
	function opt_bgm_type(cmd) {
		if (cmd === "on") {
			$("#option_bgm").checked = optionList["bgm"];
			$("#bgm_type").selectedIndex = indexSelectByValue($("#bgm_type"), optionList["bgm_type"]);
		}

		playBGM($("#bgm_type").value);
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
	var tempArr = [];
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
								if (!row.classList.contains(itemList[j]["sort1"])) {//2차 분류
									row.classList.add(itemList[j]["sort1"]);
								}
								if (!row.classList.contains(itemList[j]["sort2"])) {//2차 분류
									row.classList.add(itemList[j]["sort2"]);
								}
								if (!row.classList.contains(itemList[j]["sort3"])) {//3차 분류
									row.classList.add(itemList[j]["sort3"]);
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
	//조각 교환 장비 선택 기능 추가
	generateGabriel();
}

function generateGabriel() {
	//조각 교환 장비 선택
	var tempChk = $$(".gabriel_checkbox");
	for (var i=0;i<tempChk.length;i++) {
		(function(i) {
			tempChk[i].onclick = function() {
				//1-1. 조각 교환 활성화 시
				if (tempChk[i].checked === true) {
					//기존 거 (있으면) 비활성화
					if (gabrielSetting["get"] !== null) {
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
			};
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
			if (dateCount === 0) {
				//첫 실행 전 : 피로도 꽉 채우기
				dateState['remain'] = dateState['len_' + dateState['dayType']];
				//피로도 게이지 100%
				$("#date_fatigue").style.width = "100%";
			} else {
				//나머지 : 남은 피로도 계산
				dateState['remain'] = dateCount;//일단 count 수치 부여, 이후 하루씩 깎아가기
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
					//100일 달성 시 tower 증가
					if (dateState['date'] % 100 === 0) {
						tower += 1;
						//"교환 불가" 항아리 지정해놨으면
						if ($("#pot_tradable").value === "notTradable") {
							//문구 변경
							$("#pot_open").value = "개봉 (" + tower.toString() + ")";
							//버튼 활성화
							$("#pot_open").disabled = "";
						}
					}
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

//던전 로딩
function dungeon_loading(dun) {
	//게임 저장
	saveData();

}
//던전 선택
function dungeon_select(cmd) {
	//0. (정해둔 던전이 있다면) 해당 던전 표시
	if (cmd) {
		$("#dungeon").selectedIndex = indexSelectByValue($("#dungeon"),cmd.toString());
	}
	//0. (오류 임시처방) RPG & 베키 : 난이도 슬레이어로 고정
	if (playMode !== "normal") {
		$("#difficulty").selectedIndex = 4;
	}

	//1. 변수 조절 (오류 대비 - 공백이면 숫자 "0" 반환)
	if ($("#dungeon").value === "") {
		input["dungeon"] = 0;
	} else {
		input["dungeon"] = parseInt($("#dungeon").value);
	}

	//2. 배경 변경
	$("#frame_top").style.background = "url('./images/epic/background/background_" + input["dungeon"].toString() + ".jpg')";
	//3. 아이템 정리
	for (var i=0;i<maxQuantity;i++) {
		//item - left, top 수치는 여기서만 다룸 (나머지는 translate() 활용)
		$("#item" + i.toString()).style.left = (startList[input["dungeon"]][0] - 400).toString() + "px";
		$("#item" + i.toString()).style.top = (startList[input["dungeon"]][1] + 32).toString() + "px";

		$("#item_name" + i.toString()).classList.remove("rare","unique","epic","jogak");
		$("#item_name" + i.toString()).style.visibility = "hidden";
		$("#item_img" + i.toString()).style.visibility = "hidden";

		$("#effect_appear" + i.toString()).style.visibility = "hidden";
		$("#effect_land" + i.toString()).style.visibility = "hidden";
		$("#effect_wait" + i.toString()).style.visibility = "hidden";

		//애니메이션 정지
		clearRequestTimeout(autoLooting[i-1]);
		clearRequestTimeout(autoEffect["appear"][i-1]);
		clearRequestTimeout(autoEffect["land"][i-1]);
		clearRequestTimeout(autoEffect["wait"][i-1]);
		$("#item_img"+ i.toString()).classList.remove("rotate");
	}
	//4. 에픽 조각 드랍 가능 zone 설정 (에픽 조각이 일반 장비 아이콘을 덮지 않도록)
	zoneList = [];
	for (var i=jogakRange[input["dungeon"]][0][0];i<=jogakRange[input["dungeon"]][0][1];i++) {
		for (var j=jogakRange[input["dungeon"]][1][0];j<=jogakRange[input["dungeon"]][1][1];j++) {
			zoneList.push([i,j]);
		}
	}

	//5. 일반 장비 드랍 가능 zone 설정
	for (var i=0;i<coopList[input["dungeon"]].length;i++) {
		zoneList.push(coopList[input["dungeon"]][i]);
	}

	//6. 기여자 이름 변경
	$("#person_helper").innerHTML = helpList[input["dungeon"]];

	//7. 캐릭터 & 기둥 레벨 & 체력 배치
		//x축
		if (startList[input["dungeon"]][0] < 300) {
			$("#character_sprite").style.left = (startList[input["dungeon"]][0] - 120) + "px";
			$("#character_sprite").classList.remove("left");
			$("#character_sprite").classList.add("right");
		} else {
			$("#character_sprite").style.left = (startList[input["dungeon"]][0]- 385) + "px";
			$("#character_sprite").classList.remove("right");
			$("#character_sprite").classList.add("left");
		}
		//y축
		$("#character_sprite").style.top = (startList[input["dungeon"]][1] - 177) + "px";
		//상태
		$("#character_sprite").classList.add("wait");

	//8. (For rpg모드) 기둥 레벨, 부위, 체력 출력
	if (playMode !== "normal") {
		//출력 텍스트 메모장
		var text = "";
		//기둥 레벨
		$("#hellgate_level").style.left = (startList[input["dungeon"]][0] - 125) + "px";
		$("#hellgate_level").style.top = (startList[input["dungeon"]][1] - 70) + "px";
		if (input["dungeon"] === 6) {//위치 예외 : 태동
			$("#hellgate_level").style.top = (startList[input["dungeon"]][1] - 40) + "px";
		}
		text = "[Lv.";
		for (var i=0;i<levelList[playMode][input["dungeon"]].length;i++) {
			text += levelList[playMode][input["dungeon"]][i];
			if (i+1 < levelList[playMode][input["dungeon"]].length) text += ", ";
		}
		text += "]";
		$("#hellgate_level").innerHTML = text;
		//기둥 부위
		$("#hellgate_item").style.left = (startList[input["dungeon"]][0] - 125) + "px";
		$("#hellgate_item").style.top = (startList[input["dungeon"]][1] - 55) + "px";
		if (input["dungeon"] === 6) {//위치 예외 : 태동
			$("#hellgate_item").style.top = (startList[input["dungeon"]][1] - 25) + "px";
		}
		text = "[";
		for (var i=0;i<dropPartList[playMode][input["dungeon"]].length;i++) {
			if (dropPartList[playMode][input["dungeon"]][i] !== "")  {
				text += dropPartList[playMode][input["dungeon"]][i];
				if (i+1 < dropPartList[playMode][input["dungeon"]].length) text += ", ";
			}
		}
		if (text[text.length-2] === ",") text = text.slice(0,text.length-2);
		text += "]";
		$("#hellgate_item").innerHTML = text;
		//기둥 체력
		$("#hellgate_life").style.left = (startList[input["dungeon"]][0] - 125) + "px";
		$("#hellgate_life").style.top = (startList[input["dungeon"]][1] - 40) + "px";
		if (input["dungeon"] === 6) {//위치 예외 : 태동
			$("#hellgate_life").style.top = (startList[input["dungeon"]][1] - 10) + "px";
		}
		hellgate = lifeList[input["dungeon"]];
		$("#hellgate_life").innerHTML = thousand(lifeList[input["dungeon"]]);

		$("#hellgate_level").style.display = "block";
		$("#hellgate_item").style.display = "block";
		$("#hellgate_life").style.display = "block";
	} else {
		hellgate = 1;
	}


	//8. 브금 실행
	if ($("#option_bgm").checked === true) {
		playBGM($("#bgm_type").value);
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
					return false;
				}
			}
			objective.push($("#objective_set_first").value);//입력 2. 세트 분류
			objective.push($("#objective_set_name").value);//입력 3. 세트 병칭

			break;
		case "count":
		if (cmd === "run") {
			if ($("#objective_count_text").value === "") {
				alert("＊경고 : 실행 횟수를 입력하세요.");
				return false;
			} else if (! isNumber($("#objective_count_text").value)) {
				alert("＊경고 : 실행 횟수는 숫자를 입력해야 합니다.");
				return false;
			} else if (parseInt($("#objective_count_text").value) <= 0) {
				alert("＊경고 : 실행 횟수는 0보다 커야 합니다.");
				return false;
			}
		}
		objective.push(parseInt($("#objective_count_text").value));//입력 2. 실행 횟수
		objective.push(count);//입력 3. 시점

		break;
		case "cost":
		if (cmd === "run") {
			if ($("#objective_cost_text").value === "") {
				alert("＊경고 : 초대장 개수를 입력하세요.");
				return false;
			} else if (! isNumber($("#objective_cost_text").value)) {
				alert("＊경고 : 초대장 개수는 숫자를 입력해야 합니다.");
				return false;
			} else if (parseInt($("#objective_cost_text").value) <= 0) {
				alert("＊경고 : 초대장 개수는 0보다 커야 합니다.");
				return false;
			} else if (parseInt($("#objective_cost_text").value) < costList[input["dungeon"]]) {
				alert("＊경고 : 초대장 개수가 입장 조건(" + costList[input["dungeon"]] + "장)보다 부족합니다.");
				return false;
			}
		}
		objective.push(parseInt($("#objective_cost_text").value));//입력 2. 초대장 제한
		objective.push(count);//입력 3. 현재 시점

		break;
		case "fatigue":
		if (cmd === "run") {
			if ($("#objective_fatigue_max").value === "") {
				alert("＊경고 : 전체 피로도를 입력하세요.");
				return false;
			} else
			if ($("#objective_fatigue_per").value === "") {
				alert("＊경고 : 1회동 소모 피로도를 입력하세요.");
				return false;
			} else
			if (! isNumber($("#objective_fatigue_max").value)) {
				alert("＊경고 : 전체 피로도는 숫자를 입력해야 합니다.");
				return false;
			} else if (! isNumber($("#objective_fatigue_per").value)) {
				alert("＊경고 : 1회당 소모 피로도는 숫자를 입력해야 합니다.");
				return false;
			} else if (parseInt($("#objective_fatigue_max").value) <= 0) {
				alert("＊경고 : 전체 피로도는 0보다 커야 합니다.");
				return false;
			} else if (parseInt($("#objective_fatigue_per").value) <= 0) {
				alert("＊경고 : 1회동 소모 피로도는 0보다 커야 합니다.");
				return false;
			}
		}
		objective.push(parseInt($("#objective_fatigue_max").value));//입력 2. 전체 피로도
		objective.push(parseInt($("#objective_fatigue_per").value));//입력 3. 1회당 소모 피로도
		objective.push(count);//입력 4. 시점

		break;
	}

	if (cmd === "run") {
		return true;
	}
}


//목표 현황 체크
function checkObjective(cmd) {

	//================================================
	//* A. 수집현황 출력
	//================================================
	var target = [];//수집할 대상(item : 개체 하나, set : 개체 여럿)

	//A-1. (cmd가 "setting"이라면 - 준비, 실행) 목표 수집
	if (cmd === "setting") {
		//목표 생성
		setObjective();
	}

	//목표 업데이트
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
				$("#objective_state_item_jogak").innerHTML = thousand(target[0]["jogak"]);
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
					$("#objective_state_set_" + (i+1).toString() + "_jogak").innerHTML = thousand(target[i]["jogak"]);
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

	//(cmd가 report가 아니라면) 여기까지
	if (cmd !== "report") {
		return;
	}


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
					showing = thisArray[i]["name"] + " (모든 " + objective[3] + " 아이템)";
					out = true;
				//2차 분류
				} else if (objective[4] === "" && objective[3] === "" && objective[2] === thisArray[i]["sort2"]) {
					showing = thisArray[i]["name"] + " (모든 " + objective[2] + " 아이템)";
					out = true;
				//1차 분류
				} else if (objective[4] === "" && objective[3] === "" && objective[2] === "" && objective[1] === thisArray[i]["sort1"]) {
					showing = thisArray[i]["name"] + " (모든 " + objective[1] + " 아이템)";
					out = true;
				//'모든 에픽'
				} else if (objective[4] === "" && objective[3] === "" && objective[2] === "" && objective[1] === "") {
					showing = thisArray[i]["name"] + " (모든 에픽 아이템 )";
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
		if (objective[2] + objective[1] <= count) {
			showing = objective[1].toString() + "회 실행";
			out = true;
		}
	//4. 초대장 제한
	} else if (objective[0] === "cost") {
		if (objective[2] + Math.floor(objective[1]/costList[input["dungeon"]]) <= count) {
			showing = objective[1].toString() + "장 중 " + ( Math.floor(objective[1]/costList[input["dungeon"]]) * costList[input["dungeon"]]).toString() + "장 사용 \
				(총 " + Math.floor(objective[1]/costList[input["dungeon"]]).toString() + "회 실행)";
			out = true;
		}
	//5. 피로도 제한
	} else if (objective[0] === "fatigue") {
		if  (objective[3] + Math.ceil(objective[1]/objective[2]) <= count) {
			showing = Math.ceil(objective[1]/objective[2]).toString() + "회 실행 (전체 피로도 : " + objective[1].toString() + ")";
			out = true;
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
		if (goyuList[i]["goyu"] === areaList[input["dungeon"]]) {//지역명 일치 시
			currentList_goyu.push(goyuList[i]);
		}
	}
	//2. (고유 에픽을 제외한) '레벨대'별 에픽 리스트
	currentList = [];
	for (var i=0;i<itemList.length;i++) {
		if (levelList[playMode][input["dungeon"]].indexOf(itemList[i]["level"]) !== -1 &&
			itemList[i]["name"] !== "" &&
			itemList[i]["goyu"] === "") {//드랍 레벨이 맞으면 & 명칭이 공백이 아니면 &고유 에픽이 아니면
				currentList.push(itemList[i]);
		}
	}
}

//기둥 부수기
function trigger(num, step, hitsound) {
	switch (step) {
		case 0:
			//=================================
			//* 회차 증가
			//=================================
			count += 1;
			//=================================
			//* 회차 표기
			//=================================
			$("#round_count").innerHTML = thousand(count);
			//=================================
			//* 입장료 지불
			//=================================
			cost["invite"] += costList[input["dungeon"]];//총 소모
			cost["invite_real"] += costList[input["dungeon"]];//실질 소모
			//0-2. 소모한 초대장 수 반영
			$("#cost_invitation").innerHTML = thousand(cost["invite"]);
			$("#cost_real").innerHTML = thousand(cost["invite_real"]);
			$("#cost_gold").innerHTML = setWon(cost["invite"]*gold + cost["gold"]);
			$("#cost_gold_real").innerHTML = setWon(cost["invite_real"]*gold + cost["gold_real"]);
			//=================================
			//* 타격음 결정
			//=================================
			if (myCharacter === "") {
				var tempArr = Object.keys(characterList);
				for (var i=0;i<tempArr.length;i++) {
					if ($("#character_sprite").classList.contains(tempArr[i])) {
						hitsound = "hit_" + characterList[tempArr[i]]["hittype"];
						break;
					}
				}
			} else {
				hitsound = "hit_" + characterList[myCharacter]["hittype"];
			}
			//=================================
			//* 체력 감소 개시
			//=================================
			requestTimeout(function() {
				trigger(num, 1, hitsound);
			},playSpeed[playMode]);

			break;
		default:
			//=================================
			//* 타격음 재생
			//=================================
			if ($("#option_hitsound").checked) {
				if (sfxList[hitsound].paused) {
					sfxList[hitsound].play();
				} else {
					sfxList[hitsound].currentTime = 0;
				}
			}
			//=================================
			//* 체력 감소
			//=================================
			//일반 모드 : 방어력 무시 (즉사 처리를 위해)
			if (playMode === "normal") {
				hellgate = Math.max(0, hellgate - power);
			//RPG모드 : 방어력 적용
			} else {
				hellgate = Math.max(0, hellgate - Math.max(0,(power - defList[input["dungeon"]])));
			}
			$("#hellgate_life").innerHTML = thousand(hellgate);
			//날짜 단위 증가
			dateCount += 1;
				//날짜 단위가 "100 의 배수 + 1"일 때마다 저장
				if ((dateCount - 1) % 100 === 0)
					saveData();
				//회차에 따른 날짜 표시
				setDate();
			if (hellgate > 0 && runningState !== "") {
				requestTimeout(function() {
					trigger(num, 1, hitsound);
				},playSpeed[playMode]);
			} else if (hellgate <= 0) {
				//(실행 중지 명령 감지) 실행 상태를 바꾸지 않음
				if (runningState === "trigger") runningState = "simulate";
				simulate(num);
			} else {
				//실행 중지 : 기둥 체력 회복
				if (playMode !== "normal") {
					hellgate = lifeList[input["dungeon"]];
					$("#hellgate_life").innerHTML = thousand(hellgate);
				} else {
					hellgate = 1;
				}
				//실행 중지 : 게임 저장
				saveData();
			}
			break;
	}
}

//실행
function simulate(num){
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
		coordinate[i-1] = [0,0];
		$("#item" + i.toString()).style.msTransform = "translate(0px,0px)";
		$("#item" + i.toString()).style.webkitTransform = "translate(0px,0px)";
		$("#item" + i.toString()).style.transform = "translate(0px,0px)";

		//아이템 이름 숨기기&이동, 이미지 숨기기
		$("#item_name" + i.toString()).classList.remove("type_normal","type_jogak");
		$("#item_name" + i.toString()).classList.remove("rare","unique","epic","jogak");
		$("#item_name" + i.toString()).style.visibility = "hidden";
		$("#item_img" + i.toString()).style.visibility = "hidden";

		//에픽 이펙트 숨기기
		$("#effect_appear" + i.toString()).style.visibility = "hidden";
		$("#effect_land" + i.toString()).style.visibility = "hidden";
		$("#effect_wait" + i.toString()).style.visibility = "hidden";

	//애니메이션 정지 (탐색 시 2번째 실행부터 : 무시)
		if (num !== 3) {
			clearRequestTimeout(autoLooting[i-1]);
			clearRequestTimeout(autoEffect["appear"][i-1]);
			clearRequestTimeout(autoEffect["land"][i-1]);
			clearRequestTimeout(autoEffect["wait"][i-1]);
			$("#item_img"+ i.toString()).classList.remove("rotate");
		}
	}

	//=================================
	//* 현재 회차 진행
	//=================================
	//1. 던전 난이도 입력
	input["dun_diff"] = $("#difficulty").value;
	//2. 지옥파티 난이도 결정
		//단일 난이도 패치 - 매우 어려움으로 고정
		input["hell_diff"] = 1;//0 : 어려움, 1 : 매우 어려움

	//3. zone 딥카피
	var zoneArr = [];
	for (var i=0;i<zoneList.length;i++) {
		zoneArr[i] = zoneList[i];//
	}
	//4. zone을 나눠서 섞기
		//4-0-1. 최대 조각 드랍위치 개수 기억
		var jogak_zone_max = (jogakRange[input["dungeon"]][0][1] - jogakRange[input["dungeon"]][0][0] + 1) * (jogakRange[input["dungeon"]][1][1] - jogakRange[input["dungeon"]][1][0] + 1);
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
		var jogak_quantity = dropQuantityList[1][input["dun_diff"]];
		//5-2. 마봉&에픽 드랍 수량
		var equip_quantity = dropQuantityList[0][input["hell_diff"]];
		//5-3. 초대장 드랍 수량
		var invitation_quantity = dropQuantityList[2][input["dun_diff"]][Math.floor(Math.random() * dropQuantityList[2][input["dun_diff"]].length)];
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
			getItem("초대장", input["dun_diff"], i, zoneArr);
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
					case "에픽 소울" :
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
								if (thisTime[i][3]["name"] === thisJogak[j]["name"]) continue;
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
			playSfx("epic_appear");

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
								<span class='cost'>(초대장 : " + thousand(cost["invite"]) + " / 실질 : " + thousand(cost["invite_real"]) + ")</span>\
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
						$("#record").innerHTML = content_text[0];
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
			//아이템 드롭 사운드
			playSfx("item_drop");
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
			nextStep(1);
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
			content_text[0] += tempText;
			$("#record").innerHTML = content_text[0];
			//a-0. 메시지 출력함
			gabrielSetting["alreadySatisfy"] = true;
			//b. 스크롤바 이동 (종료 메세지가 보이도록)
			if ($("#record").style.display === "block") {
				$("#record").scrollTop = $("#record").scrollHeight;
			}
			//c. 변수 처리
				//'자동 실행 변수' OFF
				runningState = "";
					//=================================
					//* 캐릭터 스프라이트 정지
					//=================================
					$("#character_sprite").classList.remove("attack");
					$("#character_sprite").classList.add("wait");
					//=================================
					//* 기둥 체력 회복
					//=================================
					if (playMode !== "normal") {
						hellgate = lifeList[input["dungeon"]];
						$("#hellgate_life").innerHTML = thousand(hellgate);
					} else {
						hellgate = 1;
					}
				//목표 초기화
				objective = [];
			//d-1. 아이템 드롭
				//아이템 드롭 사운드
				playSfx("item_drop");
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
			if (runningState !== "") {//'자동 실행 변수'가 ON일 경우
				//a. 가브리엘 출현 시
				if (tempGabriel === true) {
					//아이템 드롭 사운드
					playSfx("item_drop");
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
					//(RPG 모드일 때만 && 헬 기둥 원킬 안낼 때만)아이템 드롭
					if (playMode !== "normal" && power < lifeList[input["dungeon"]] + defList[input["dungeon"]]) {
						//아이템 드롭 사운드
						playSfx("item_drop");
						for (var i=0;i<thisTime.length;i++) {
							dropItem(thisTime[i]);
						}
					}
					//재실행 여부 체크
					nextStep(num);
				}
			} else {
				//아이템 드롭 사운드
				playSfx("item_drop");
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
	//=================================
	//* 최종 던전 클리어 => 엔딩 직행
	//=================================
	//아이템 루팅 안했으면 루팅 실시
	if (playMode !== "normal" && input["dungeon"] === 18) {
		//1. 목표현황 체크 후 보고서 받기
		var tempReport = checkObjective("report");
		var out = tempReport["out"];
		var showing = tempReport["showing"];

		//아이템 루팅 안하는 조건 달성
		if ((num === 2 || num === 3) &&
			out === false &&
			runningState !== "" &&
			power >= lifeList[input["dungeon"]] + defList[input["dungeon"]]) {
			//아이템 드롭 사운드
			playSfx("item_drop");
			for (var i=0;i<thisTime.length;i++) {
				dropItem(thisTime[i]);
			}
		}
		//'자동 실행 변수' OFF
		runningState = "";
			//=================================
			//* 캐릭터 스프라이트 정지
			//=================================
			$("#character_sprite").classList.remove("attack");
			$("#character_sprite").classList.add("wait");
			//=================================
			//* 기둥 체력 회복
			//=================================
			if (playMode !== "normal") {
				hellgate = lifeList[input["dungeon"]];
				$("#hellgate_life").innerHTML = thousand(hellgate);
			} else {
				hellgate = 1;
			}
		//목표 초기화
		objective = [];
		//버튼 정상화 대기
		onoff(2.5);
		//게임 저장
		saveData();
		//엔딩 실행
		ending(0);
	//IF - 1회 실행
	} else if (num === 1) {
		//게임 저장
		saveData();
		//'자동 실행 변수' OFF
		runningState = "";
			//=================================
			//* 캐릭터 스프라이트 정지
			//=================================
			$("#character_sprite").classList.remove("attack");
			$("#character_sprite").classList.add("wait");
			//=================================
			//* 기둥 체력 회복
			//=================================
			if (playMode !== "normal") {
				hellgate = lifeList[input["dungeon"]];
				$("#hellgate_life").innerHTML = thousand(hellgate);
			} else {
				hellgate = 1;
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
			//a. (아직 메시지 출력 안했다면)
			if (gabrielSetting["alreadySatisfy"] === false) {
				//a-0. 이제 메시지 출력함
				gabrielSetting["alreadySatisfy"] = true;
				//a-1. 메세지 출력
				var tempText = "<span class='system'>====================&lt;탐색 종료&gt;====================";
					tempText += "<br/>※ 종료 조건 : " + $("#objective_list").options[$("#objective_list").selectedIndex].text + " － " + showing
					tempText += "<br/>================================================</span>";
				content_text[0] += tempText;
				$("#record").innerHTML = content_text[0];
				//a-1. 스크롤바 이동 (종료 메세지가 보이도록)
				if ($("#record").style.display === "block") {
					$("#record").scrollTop = $("#record").scrollHeight;
				}
				//a-2. 변수 처리
					//게임 저장
					saveData();
					//'자동 실행 변수' OFF
					runningState = "";
						//=================================
						//* 캐릭터 스프라이트 정지
						//=================================
						$("#character_sprite").classList.remove("attack");
						$("#character_sprite").classList.add("wait");
						//=================================
						//* 기둥 체력 회복
						//=================================
						if (playMode !== "normal") {
							hellgate = lifeList[input["dungeon"]];
							$("#hellgate_life").innerHTML = thousand(hellgate);
						} else {
							hellgate = 1;
						}
					//목표 초기화
					objective = [];
			}
			//b. 버튼 정상화 대기
			onoff(2.5);
			//추가실행 : 하지 않음
		//2-2. 종료 조건 미달성 or 무조건 실행
		} else {
			if (runningState !== "") {//'자동 실행 변수'가 ON일 경우
				//=================================
				//* 기둥 체력 회복
				//=================================
				if (playMode !== "normal") {
					hellgate = lifeList[input["dungeon"]];
					$("#hellgate_life").innerHTML = thousand(hellgate);
				} else {
					hellgate = 1;
				}
				//추가실행 : 실시
				runningState = "trigger";
				trigger(2,0);
			} else {
				//게임 저장
				saveData();
				//'자동 실행 변수' OFF
				runningState = "";
					//=================================
					//* 캐릭터 스프라이트 정지
					//=================================
					$("#character_sprite").classList.remove("attack");
					$("#character_sprite").classList.add("wait");
					//=================================
					//* 기둥 체력 회복
					//=================================
					if (playMode !== "normal") {
						hellgate = lifeList[input["dungeon"]];
						$("#hellgate_life").innerHTML = thousand(hellgate);
					} else {
						hellgate = 1;
					}
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
		playSfx("epic_appear");
	//1. 자동일 때 (아이템 선정 안해놨다면) 일부 "부랴부랴" 실행
	} else if ($("#gabriel_type").value === "auto" && gabrielSetting["get"] === null && cmd !== "settingOnly") {
		//창 오픈
		onoff("gabriel_autoFirst");
		//사운드 출력
		playSfx("epic_appear");
	}

	//1-5. ("settingOnly"가 아니라면)상태 변경
	if (cmd !== "settingOnly") {
		//공격모션 잠시 중지
		$("#character_sprite").classList.remove("attack");
		$("#character_sprite").classList.add("wait");
		//가브리엘 출현 중이라고 기억
		gabrielSetting["trading"] = true;
		//변경 횟수 충전
		gabrielSetting["changable"] = gabrielSetting["maxChangable"];
			//충전 수치 반영
			$("#gabriel_change").value = "재료 변경 (" + gabrielSetting["changable"] + "/" + gabrielSetting["maxChangable"] + ")"
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
		//교환 횟가 0이라면 버튼 잠금
		if (gabrielSetting["changable"] <= 0) {
			$("#gabriel_change").disabled = "disabled";
		//아니라면 교환 버튼 열기
		} else {
			$("#gabriel_change").disabled = "";
		}

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
		$("#gabriel_item_get_type").innerHTML = "<p>" + gabrielSetting["get"]["sort1"] + "</p>";
		$("#gabriel_item_get_icon").style.backgroundPosition = spritePosition(gabrielSetting["get"]["icon"], 1);
		$("#gabriel_item_get_name").innerHTML = "<p>" + gabrielSetting["get"]["name"] + "</p>";
		$("#gabriel_item_get_jogak").innerHTML = "<p>" + gabrielSetting["get"]["jogak"] + " 조각 (+ 5)" + "</p>";
	}

	//4. 조각 제공 아이템 수집
		//4-1. 아이템 조건 파악
		var type = gabrielSetting["get"]["sort1"];
		var level = gabrielSetting["get"]["level"];
		var name = gabrielSetting["get"]["name"];
		var set = gabrielSetting["get"]["set"];
		//4-2. 이름이 다르고 레벨이 동일하고 (그 외 조건 없음) 조각이 10개 이상인 아이템 5종
		var tempArr = [];
		for (var i=0;i<itemList.length;i++) {
			if (itemList[i]["name"] != name && itemList[i]["level"] === level && itemList[i]["jogak"] >= 10 && tempArr.indexOf(itemList[i]) < 0) {
				tempArr.push(itemList[i]);
			}
		}

	//5-1. 조각 제공 아이템 조각 부족
	if (tempArr.length < 5) {
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
		tempArr = shuffle(tempArr);
		//b. 1 배열에서 3개, 2 배열에서 2개 기억
		var tempArr2 = [];
			for (var i=0;i<tempArr.length;i++) {
				//지정되지 않은 템만 집어넣기 (세트 선정 시 동일 세트템은 중복해서 들어가므로)
				if (tempArr2.indexOf(tempArr[i]) < 0) {
					tempArr2.push(tempArr[i]);
				}
				if (tempArr2.length === 5) {
					break;
				}
			}
			//b-1 합친 배열 섞어주기
			tempArr2 = shuffle(tempArr2);
		gabrielSetting["give"] = tempArr2;
		//c. 기억된 아이템 출력
		for (var i=0;i<5;i++) {
			$("#gabriel_item_give_" + (i+1).toString() + "_type").innerHTML = "<p>" + gabrielSetting["give"][i]["sort1"] + "</p>";
			$("#gabriel_item_give_" + (i+1).toString() + "_icon").style.backgroundPosition = spritePosition(gabrielSetting["give"][i]["icon"], 1);
			$("#gabriel_item_give_" + (i+1).toString() + "_name").innerHTML = "<p>" + gabrielSetting["give"][i]["name"] + "</p>";
			$("#gabriel_item_give_" + (i+1).toString() + "_jogak").innerHTML = "<p>" + gabrielSetting["give"][i]["jogak"] + " 조각 (-10)" + "</p>";
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
		//취소 사운드 출력
		playSfx("hell_gabriel_no");
		//재실행 여부 체크
			//재실행 시
			if (gabrielSetting["replay"] === true) {
				//공격모션 재개
				$("#character_sprite").classList.remove("wait");
				$("#character_sprite").classList.add("attack");
				//재실형 변수 제거
				gabrielSetting["replay"] = false;
				//가브리엘 거래 종료
				gabrielSetting["trading"] = false;
				//버튼 재설정
				onoff(2);
				//재실행 여부 체크
				nextStep(3);
			//재실행 필요없으면
			} else {
				//가브리엘 거래 종료
				gabrielSetting["trading"] = false;
				//버튼 정상화
				onoff(0);
			}
	}
	//교환
	function yes() {
		//교환 사운드 출력
		playSfx("hell_gabriel_yes");
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
				//공격모션 재개
				$("#character_sprite").classList.remove("wait");
				$("#character_sprite").classList.add("attack");
				//재실형 변수 제거
				gabrielSetting["replay"] = false;
				//가브리엘 거래 종료
				gabrielSetting["trading"] = false;
				//버튼 재설정
				onoff(2);
				//재실행 여부 체크
				nextStep(3);
			//재실행 필요없으면
			} else {
				//가브리엘 거래 종료
				gabrielSetting["trading"] = false;
				//버튼 정상화
				onoff(0);
			}
	}

	//재료 교환
	$("#gabriel_change").onclick = function() {
		//교환 횟수 감소
		gabrielSetting["changable"] -= 1;
			//수치 반영
			$("#gabriel_change").value = "재료 변경 (" + gabrielSetting["changable"].toString() + "/" + gabrielSetting["maxChangable"] + ")";
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
			//일반 장비 : 마봉, 에픽, 에픽 소울, 지옥구슬
			input["rarity"] = chanceList_name[1][input["hell_diff"]][input["dun_diff"]][rand(chanceList_num[1][input["hell_diff"]][input["dun_diff"]])];
				//IF : 에픽이 아니면 : 드롭
				if (input["rarity"] !== "에픽") {
					getItem(type, input["rarity"], zone, zoneArr);
					return;
				};
			break;
		case "조각":
			//조각 : 에픽 Only
			input["rarity"] = "에픽";
			break;
	}
	//2. 고유에픽 결정 (장비 한정, 조각은 "일반에픽" Only)
	switch (type) {
		case "장비":
			//일반 장비 : 일반에픽, 고유에픽
			var temp_name = deepCopy(chanceList_name[2]);
			var temp_num = deepCopy(chanceList_num[2]);
				//안톤 레이드 :
				if (input["dungeon"] === 17) {
					temp_num[1] *= 20;
					temp_num[0] = 1 - temp_num[1];
				}
			input["goyu"] = temp_name[rand(temp_num)];
				//IF : 고유 에픽이면 : 드롭
				if (input["goyu"] === "고유에픽") {
					//IF : 고유 에픽 리스트가 비어있지 않다면 : 드롭
					if (currentList_goyu.length > 0) {
						getItem(type, input["goyu"], zone, zoneArr);
						return;
					}
				};
			break;
		case "조각":
			//조각 : 일반에픽 Only
			input["goyu"] = "일반에픽";
			break;
	}
	//3. 종류 결정
		//(for RPG모드) 드랍되는 장비 종류 불러오기
		var arr_name = deepCopy(dropPartList[playMode][input["dungeon"]]);
		var arr_num = deepCopy(chanceList_num[3]);
		var searchLength = arr_name.length;
		for (var i=searchLength-1;i>=0;i--) {
			if (arr_name[i] === "") {
				arr_name.splice(i,1);
				arr_num.splice(i,1);
			}
		}
		//a-1. 장비 종류만큼 칸 설정
		var arr_num2 = [];
		for (var i=0;i<arr_name.length;i++) {
			arr_num2.push(0);
		}
		//a-2. 해당 칸은 특정 장비의 개수만큼 숫자가 증가
		for (var i=0;i<currentList.length;i++) {
			for (var j=0;j<arr_num2.length;j++) {
				//계산 중인 장비라면, 해당 레벨 칸 +1
				if ((currentList[i]["sort1"] === arr_name[j] //무기, 방어구 전용 : 대분류
				|| currentList[i]["sort2"] === arr_name[j])) {//악세사리, 특수장비 : 1차 소분류
					arr_num2[j] += 1;
				}
			}
		}
		//a-3. 아이템 수량 & 기본 가중치 합산
		var arr_num3 = [];
		for (var i=0;i<arr_num2.length;i++) {
			arr_num3[i] = arr_num[i] * arr_num2[i];
		}
	input["type"] = arr_name[rand(arr_num3)];
	//4. 레벨 결정 (가중치 = 각 종류&레벨별 아이템 개수)
	switch (playMode) {
		case "normal":
			//4-1. 레벨 종류만큼 칸 설정
			currentList_level = [];
			for (var i=0;i<levelList[playMode][input["dungeon"]].length;i++) {
				currentList_level.push(0);
			}
			//4-2. 해당 칸은 특정 레벨 & 특정 장비의 개수만큼 숫자가 증가
			for (var i=0;i<currentList.length;i++) {
				for (var j=0;j<levelList[playMode][input["dungeon"]].length;j++) {
					//앞에서 선택된 장비이고 레벨이 맞을 경우, 해당 레벨 칸 +1
					if ((currentList[i]["sort1"] === input["type"] //무기, 방어구 전용 : 대분류
					|| currentList[i]["sort2"] === input["type"])//악세사리, 특수장비 : 1차 소분류
					&& currentList[i]["level"] === levelList[playMode][input["dungeon"]][j]) {
						currentList_level[j] += 1;
					}
				}
			}
			//4-3. 추가 가중치 계산
			for (var i=0;i<chanceList_num[4].length;i++) {
				if (chanceList_num[4][i][0].indexOf(input["dungeon"]) !== -1) {
					for (var j=0;j<currentList_level.length;j++) {
						currentList_level[j] = currentList_level[j] * chanceList_num[4][i][1][j];
					}
					break;
				}
			}
			input["level"] = levelList[playMode][input["dungeon"]][rand(currentList_level)];

			break;
		//RPG모드 : 레벨별 가주치 미구현 - 전부 다 집어넣음
		default:
			input["level"] = levelList[playMode][input["dungeon"]];

			break;
	}
	//5. 인풋을 바탕으로 드롭
	getItem(type, input["rarity"], zone, zoneArr);//('에픽')을 전송, 나머진 getItem()에서 해결
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
						$("#item_name" + zone.toString()).classList.add("type_normal");//이름 숨기기 옵션용
						$("#item_name" + zone.toString()).classList.add("rare");
						$("#item_name" + zone.toString()).innerHTML = "마법으로 봉인된 " + name2;

						//아이템 필드 이미지 변경, 크기 조절
						$("#item_img" + zone.toString()).className = "item_img " + name1;

						//아이템 이름, 필드 이미지 비가시화 (마봉은 보이지 않음)
						$("#item_name" + zone.toString()).style.visibility = "hidden";
						$("#item_img" + zone.toString()).style.visibility = "hidden";

						//아이템 등록
						thisTime.push([zone, zoneArr, item]);

						break;

					case "에픽 소울":
						//아이템 필드 이미지 & 이름 결정
						var name1 = "field_기타";
						var name2 = "에픽 소울";

						//아이템 이름 변경
						$("#item_name" + zone.toString()).classList.add("type_normal");//이름 숨기기 옵션용
						$("#item_name" + zone.toString()).classList.add("epic");
						$("#item_name" + zone.toString()).innerHTML = name2;

						//아이템 필드 이미지 변경, 크기 조절
						$("#item_img" + zone.toString()).className = "item_img " + name1;

						//아이템 이름, 필드 이미지 가시화
						$("#item_name" + zone.toString()).style.visibility = "visible";
						$("#item_img" + zone.toString()).style.visibility = "visible";

						//아이템 등록
						thisTime.push([zone, zoneArr, item]);

						break;
					case "지옥구슬":
						var name1 = "field_기타";
						var name2 =  areaList[input["dungeon"]] + " 지옥구슬";

						//아이템 이름 변경
						$("#item_name" + zone.toString()).classList.add("type_normal");//이름 숨기기 옵션용
						$("#item_name" + zone.toString()).classList.add("unique");
						$("#item_name" + zone.toString()).innerHTML = name2;

						//아이템 필드 이미지 변경, 크기 조절
						$("#item_img" + zone.toString()).className = "item_img " + name1;

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
							var tempArr = [];
							for (j=0;j<currentList.length;j++) {
								if ((currentList[j]["sort1"] === input["type"]/*종류-무기*/
								|| currentList[j]["sort2"] === input["type"]/*종류-방어구*/
								|| currentList[j]["sort3"] === input["type"])/*종류-악세서리&특수장비*/
								&& ((playMode === "normal" && currentList[j]["level"] === input["level"])
							|| (playMode !== "normal" && input["level"].indexOf(currentList[j]["level"]) >= 0)))/*레벨*/ {
									tempArr.push(currentList[j]);
								}
							}
							//미리 리스트에서 랜덤으로 선정
							temp = tempArr[Math.floor(Math.random() * tempArr.length)];
						}

						//아이템 이름 변경, 이후 미리 측정한 길이 부여
						$("#item_name" + zone.toString()).classList.add("type_normal");//이름 숨기기 옵션용
						$("#item_name" + zone.toString()).classList.add("epic");
						$("#item_name" + zone.toString()).innerHTML = temp["name"];

						//아이템 필드 이미지 변경, 크기 조절
							// ★ 아이템 필드 이미지 자료 : sprite 폴더 내 spriteCss.css 파일 참고
							//	(엑셀 파일 영향받지 않음, 개별 편집 필요)
						var field_name = "field_" + temp["sort1"] + "_" + temp["sort2"] + "_" + temp["sort3"];
						$("#item_img" + zone.toString()).className = "item_img " + field_name;

						//아이템 이름, 필드 이미지 가시화
						$("#item_name" + zone.toString()).style.visibility = "visible";
						$("#item_img" + zone.toString()).style.visibility = "visible";

						//출현 이펙트 가시화 (에픽 전용)
						$("#effect_appear" + zone.toString()).style.top = (-260+25+($("#item_img" + zone.toString()).offsetHeight/2)).toString() + "px";
						$("#effect_appear" + zone.toString()).style.visibility = "visible";

						//아이템 등록
						thisTime.push([zone, zoneArr, "에픽", temp]);
				}

				break;
			case "조각" :
				//에픽 장비 선정
				var tempArr = [];
				for (var j=0;j<currentList.length;j++) {
					if ((currentList[j]["sort1"] === input["type"]/*종류-무기*/
					|| currentList[j]["sort2"] === input["type"]/*종류-방어구*/
					|| currentList[j]["sort3"] === input["type"])/*종류-악세서리&특수장비*/
					&& ((playMode === "normal" && currentList[j]["level"] === input["level"])
				|| (playMode !== "normal" && input["level"].indexOf(currentList[j]["level"]) >= 0)))/*레벨*/ {
						tempArr.push(currentList[j]);
					}
				}
				//미리 리스트에서 랜덤으로 선정
				temp = tempArr[Math.floor(Math.random() * tempArr.length)];

				//아이템 이름 변경, 이후 미리 측정한 길이 부여
				$("#item_name" + zone.toString()).classList.add("type_jogak");//이름 숨기기 옵션용
				$("#item_name" + zone.toString()).classList.add("jogak");
				$("#item_name" + zone.toString()).innerHTML = temp["name"] + " 조각";

				//아이템 필드 이미지 변경, 크기 조절
				var field_name = "field_에픽조각";
				$("#item_img" + zone.toString()).className = "item_img " + field_name;

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
				$("#item_name" + zone.toString()).classList.add("type_normal");//이름 숨기기 옵션용
				$("#item_name" + zone.toString()).classList.add("epic");
				$("#item_name" + zone.toString()).innerHTML = "(조각 완성) " + temp["name"];

				//아이템 필드 이미지 변경, 크기 조절
				var field_name = "field_" + temp["sort1"] + "_" + temp["sort2"] + "_" + temp["sort3"];
				$("#item_img" + zone.toString()).className = "item_img " + field_name;

				//아이템 이름, 필드 이미지 가시화
				$("#item_name" + zone.toString()).style.visibility = "visible";
				$("#item_img" + zone.toString()).style.visibility = "visible";

				//출현 이펙트 가시화 (에픽 전용)
				$("#effect_appear" + zone.toString()).style.top = (-260+25+($("#item_img" + zone.toString()).offsetHeight/2)).toString() + "px";
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
					playSfx("epic_appear");

					//아이템 업데이트 (inventory, set, craft)
					update("완성", temp);

					//아이템 업데이트 (record)
					//8-3-1. 회차, 초대장 소모량, 지옥파티 난이도 (등장한 아이템의 모든 분류정보를 class에 입력)
					var text = "<span class='equip " + temp["sort1"] + " " + temp["sort2"] + " " + temp["sort3"] + " lv" + temp["level"].toString();
						text += "'><span class='run " + temp["sort1"] + " " + temp["sort2"] + " " + temp["sort3"] + " lv" + temp["level"].toString();
						text += "'>조각 완성 (" + thousand(count) + "회차 \
									<span class='cost'> - 초대장 : " + thousand(cost["invite"]) + " / 실질 : " + thousand(cost["invite_real"]) + ")</span>\
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
						//열려있으면 업데이트
						if ($("#record").style.display === "block") {
							$("#record").innerHTML = content_text[0];
						}
				//=================================
				//* 완성템 개별 드랍 & 업데이트 - 끝
				//=================================

				break;
			case "항아리" :
				//item 인수를 드랍할 장비로 선정
				temp = item;

				//아이템 이름 변경, 이후 미리 측정한 길이 부여
				$("#item_name" + zone.toString()).classList.add("type_normal");//이름 숨기기 옵션용
				$("#item_name" + zone.toString()).classList.add("epic");
				$("#item_name" + zone.toString()).innerHTML = "(항아리) " + temp["name"];

				//아이템 필드 이미지 변경, 크기 조절
				var field_name = "field_" + temp["sort1"] + "_" + temp["sort2"] + "_" + temp["sort3"];
				$("#item_img" + zone.toString()).className = "item_img " + field_name;

				//아이템 이름, 필드 이미지 가시화
				$("#item_name" + zone.toString()).style.visibility = "visible";
				$("#item_img" + zone.toString()).style.visibility = "visible";

				//출현 이펙트 가시화 (에픽 전용)
				$("#effect_appear" + zone.toString()).style.top = (-260+25+($("#item_img" + zone.toString()).offsetHeight/2)).toString() + "px";
				$("#effect_appear" + zone.toString()).style.visibility = "visible";

				//=================================
				//* 완성템 개별 드랍 & 업데이트 - 시작
				//=================================
					//아이템 드롭 사운드
					playSfx("item_drop");
					//아이템 드랍 실시
					dropItem([zone,zoneArr,"에픽",temp]);
					//버튼 활성화 대기
					onoff("drop");
					dropCount = quantity - 1;//한 개 드롭되면 바로 버튼 활성화되도록

					//8-1. 출현 사운드 출력
					playSfx("epic_appear");

					//아이템 업데이트 (inventory, set, craft)
					update("항아리", temp);

					//아이템 업데이트 (record)
					//8-3-1. 회차, 초대장 소모량, 지옥파티 난이도 (등장한 아이템의 모든 분류정보를 class에 입력)
					var text = "<span class='equip " + temp["sort1"] + " " + temp["sort2"] + " " + temp["sort3"] + " lv" + temp["level"].toString();
						text += "'><span class='run " + temp["sort1"] + " " + temp["sort2"] + " " + temp["sort3"] + " lv" + temp["level"].toString();
						text += "'>항아리 (" + thousand(count) + "회차 \
									<span class='cost'> - 초대장 : " + thousand(cost["invite"]) + " / 실질 : " + thousand(cost["invite_real"]) + ")</span>\
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
						//열려있으면 업데이트
						if ($("#record").style.display === "block") {
							$("#record").innerHTML = content_text[0];
						}
				//=================================
				//* 완성템 개별 드랍 & 업데이트 - 끝
				//=================================

				break;
			case "초대장" :
				//아이템 이름 변경, 이후 미리 측정한 길이 부여
				$("#item_name" + zone.toString()).classList.add("type_normal");//이름 숨기기 옵션용
				$("#item_name" + zone.toString()).classList.add("rare");
				$("#item_name" + zone.toString()).innerHTML = "지옥파티 초대장";

				//아이템 필드 이미지 변경, 크기 조절
				var field_name = "field_초대장";
				$("#item_img" + zone.toString()).className = "item_img " + field_name;

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
		$("#item_img" + info[0].toString()).classList.add("rotate");

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
	if (type === "에픽 소울") {
		//획득량 증가
		get["soul_get"] += 1;
		$("#result_soul_get").innerHTML = thousand(get["soul_get"]);//출력
		//코소 자동 해체 OFF or 코소가 음수일 경우
		if (!$("#option_soul").checked || get["soul_have"] < 0) {
			//(보유량이 음수가 아니게 됨 - 붉은 글씨 해제)
			if (get["soul_have"] === -1) {
				$("#result_soul_have").classList.remove("red");
			}
			//(보유량이 0보다 커짐 - 해체 버튼 활성화)
			if (get["soul_have"] === 0) {
				$("#result_button_soulDisassemble").disabled = "";
				$("#result_button_soulDisassemble").value = "해체";
			}

			//보유량 증가
			get["soul_have"] += 1;
			$("#result_soul_have").innerHTML = thousand(get["soul_have"]);//출력
		//코소 자동 해체 ON
		} else {
			//실질 초대장 감소
			cost["invite_real"] -= cutList[0];
			$("#cost_real").innerHTML = thousand(cost["invite_real"]);
			$("#cost_gold_real").innerHTML = setWon(cost["invite_real"]*gold + cost["gold_real"]);
		}
	} else if (type === "지옥구슬") {
		get["beed_get"] += 1;
		$("#result_beed_get").innerHTML = thousand(get["beed_get"]);//출력
		//실질 초대장 감소
		cost["invite_real"] -= cutList[1][input["dungeon"]];
		$("#cost_real").innerHTML = thousand(cost["invite_real"]);
	} else if (type === "초대장") {
		get["invite_get"] += 1;
		$("#result_cost_get").innerHTML = thousand(get["invite_get"]);//출력
		//실질 초대장 감소
		cost["invite_real"] -= 1;
		$("#cost_real").innerHTML = thousand(cost["invite_real"]);
	} else if (type === "에픽" || type === "완성" || type === "항아리"){//에픽
		num = 0;//순번 찾기
		for (var i=0;i<itemList.length;i++) {
			if (itemList[i]["name"] === info["name"]) {
				num = i;
				break;
			}
		};
		get["epic_get"] += 1;//획득 에픽
			$("#result_epic_get").innerHTML = thousand(get["epic_get"]);//출력
		//(첫 보유량 증가일 경우 - 해체 버튼 활성화)
		if (get["epic_have"] === 0) {
			$("#result_button_epicDisassemble").disabled = "";
			$("#result_button_epicDisassemble").value = "해체";
		}
		get["epic_have"] += 1;//보유 에픽
			$("#result_epic_have").innerHTML = thousand(get["epic_have"]);//출력
		//2. itemList에 획득량 기록 (에픽 한정)
		itemList[num]["get"] += 1;//해당 아이템 획득 수 증가
		itemList[num]["have"] += 1;//해당 아이템 보유 수 증가
		if (itemList[num]["have"] === 1) {//IF : 첫번째 득템일 경우
			itemList[num]["firstCount"] = count;//당시 회차 기억
			itemList[num]["firstInvite"] = cost["invite"];//당시 총 소비 기억
			itemList[num]["firstReal"] = cost["invite_real"];//당시 실질 소비 기억
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
				clearRequestTimeout(autoEffect["jogak"]);
				//애니메이션 실행
				animation($("#shift4_effect"),"appear","jogak",682,0,-8182,80,0);
		}
	}

	//3. record에 기록 - simulate() 함수에서 일괄 처리

	//4. inventory에 기록 (에픽 한정)
	if (type === "에픽" || type === "완성" || type === "항아리") {
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
			var tempText = "";
				tempText += thousand(itemList[num]["firstCount"]) + "회차 ";
			if (type === "에픽") {//드랍으로 첫 획득시
				tempText += "(드랍)";
			} else if (type === "완성") {//완성으로 첫 획득시
				tempText += "<span class='yellow'>(완성)</span>";
			} else if (type === "항아리") {//완성으로 첫 획득시
				tempText += "<span class='set'>(항아리)</span>";
			}
			tempText += "\
				<br/><span class='cost'>(초대장 : " + thousand(itemList[num]["firstInvite"]) + "\
				<br/>/ 실질 : " + thousand(itemList[num]["firstReal"]) + ")";
			tr_inventory.getElementsByTagName("td")[5].innerHTML = tempText;
		}
		//4-4. 해당 아이템 (색깔 입혀서) 가시화
		if (tr_inventory.className.indexOf("not_show") !== -1) {
			if (info["set"] !== "") {//세트
				tr_inventory.getElementsByTagName("td")[0].classList.add("color_set");
			} else {//그 외
				tr_inventory.getElementsByTagName("td")[0].classList.add("color_epic");
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
				var tempText = "";
					tempText += thousand(itemList[num]["firstCount"]) + "회차 ";
					tempText += "\
					<br/><span class='cost'>(초대장 : " + thousand(itemList[num]["firstInvite"]) + "\
					<br/>/ 실질 : " + thousand(itemList[num]["firstReal"]) + ")";
				if (type === "에픽") {
					tempText += "(드랍)"
				} else if (type === "완성") {//완성으로 첫 획득시
					tempText += "<span class='yellow'>(완성)</span>"
				} else if (type === "항아리") {//항아리로 첫 획득시
					tempText += "<span class='set'>(항아리)</span>"
				}
				tr_set.getElementsByTagName("td")[5].innerHTML = tempText;
			}
			//5-4. 해당 아이템 (색깔 입혀서) 가시화
			if (tr_set.className.indexOf("not_show") !== -1) {
				tr_set.getElementsByTagName("td")[0].classList.add("color_set");
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
				if (itemList[i]["set"] === tr_set_hap.getElementsByTagName("td")[0].innerHTML) {
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
				if (a < b) {
					tr_set_hap.getElementsByTagName("td")[0].classList.remove("color_epic");
					tr_set_hap.getElementsByTagName("td")[5].innerHTML = "";
				//5-5-4-2. 완성
				} else {
					tr_set_hap.getElementsByTagName("td")[0].classList.add("color_epic");
				//5-5-4-2-1. (완성 '시' 한정) 세트 첫 획득 지정
					if (tr_set_hap.getElementsByTagName("td")[5].innerHTML === "") {
						tr_set_hap.getElementsByTagName("td")[5].innerHTML = "\
							" + thousand(count) + "회차\
							<span class='cost'><br/>(초대장 : " + thousand(cost["invite"]) + "\
							<br/>/ 실질 : " + thousand(cost["invite_real"]) + ")";
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
	if (((type === "에픽" || type === "완성" || type === "항아리") && info["goyu"] === "") || type === "조각") {
		var tr_craft = $("#craft_row_" + num);
		//6-1. 보유량 업데이트
		if ((type === "에픽" || type === "완성" || type === "항아리")) {
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
					tr_craft.getElementsByTagName("td")[0].classList.add("color_set");
				} else {//그 외
					tr_craft.getElementsByTagName("td")[0].classList.add("color_epic");
				}
			}
			tr_craft.classList.remove("not_show");
			tr_craft.classList.add("show");
		}
	}

	//7. 수집현황 업데이트
	checkObjective("update");

	//8. equip에 기록 (에픽 한정)
	if (type === "에픽" || type === "완성" || type === "항아리") {
		//내 캐릭터 지정됨 & 장착 가능한 부위
		if (myCharacter !== "" &&
		(info["class"] === "" ||
		info["class"].indexOf(myCharacter) >= 0)) {
			//장비 부위 업데이트
			setEquip();
		}
	}
}


//inventory, set에서 아이템 해체
function recycle(num,amount,cmd) {
	//(보유량 = 1 & 장착 중) 해체 불가 (cmd가 skip일 경우 경고창 없이 중지)
		//해체하려는 장비 부위 파악
		var tempPart = itemList[num]["sort3"];
		if (itemList[num]["sort1"] === "무기") tempPart = itemList[num]["sort1"];
		if (itemList[num]["have"] === 1 && wearingList[tempPart] === itemList[num]) {
			if (cmd !== "skip") {
				alert ("※ 경고 : " + itemList[num]["name"] + "을(를) 해체하려면 장비 장착 메뉴에서 해당 장비를 장착해제 하세요.");
			}
			//해체 중단
			return;
		}
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
		get["epic_have"] -= amount;
		$("#result_epic_have").innerHTML = thousand(get["epic_have"]);//출력
		//1-2-1. 에픽 개수가 0이 되면 - result에서 해체 버튼 비활성화
		if (get["epic_have"] === 0) {
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
		//코소 자동 해체 OFF - 에픽 소울 보유량 증가
		if (!$("#option_soul").checked) {
			//보유량 증가량 확인
			var increase = disCount("에픽 소울",itemList[num]["level"]);
			//(보유량이 0 이하에서 양수가 되면 - 해체 버튼 활성화)
			if (get["soul_have"] <= 0 && get["soul_have"] + increase > 0) {
				$("#result_soul_have").classList.remove("red");
				$("#result_button_soulDisassemble").disabled = "";
				$("#result_button_soulDisassemble").value = "해체";
			}
			//보유량 증가
			get["soul_have"] += increase
			$("#result_soul_have").innerHTML = thousand(get["soul_have"]);//출력
		//코소 자동 해체 ON - 실질 초대장 소모량 감소
		} else {
			cost["invite_real"] -= disCount("초대장",itemList[num]["level"])*amount;
			$("#cost_real").innerHTML = thousand(cost["invite_real"]);
			$("#cost_gold_real").innerHTML = setWon(cost["invite_real"]*gold + cost["gold_real"]);
		}
	//3. IF : 해체를 해서 보유량이 0이 되었을 경우
	if (itemList[num]["have"] === 0) {
		//3-1. '첫 획득 정보' 초기화
		itemList[num]["firstCount"] = 0;//첫 득템 당시 회차
		itemList[num]["firstInvite"] = 0;//첫 득템 당시 총 소모 초대장
		itemList[num]["firstReal"] = 0;//첫 득템 당시 실질 소모 초대장
		//3-2. 강화 등급 0으로 초기화
		itemList[num]["enchant"] = 0;
		//3-3. 수집률 감소
		collect -= 1;
		var gathered = Math.floor((collect/itemList.length)*1000)/10;
		$("#inventory_check_collect").innerHTML = gathered.toString();
		//3-4. inventory 설정
			//3-3-1. inventory - '해체' 버튼 제거
			tr.getElementsByTagName("td")[3].innerHTML = "없음";
			//3-3-2. inventory - '첫 획득' 기록 제거
			tr.getElementsByTagName("td")[5].innerHTML = "";
			//3-3-3. inventory - 해당 아이템 (색깔 지우고) 가시화 해제
			tr.getElementsByTagName("td")[0].classList.remove("color_epic", "color_set");
			tr.classList.remove("show");
			tr.classList.add("not_show");
		//3-5. set 설정
		if (itemList[num]["set"] !== "") {
			//3-4-1. inventory - '해체' 버튼 제거
			tr2.getElementsByTagName("td")[3].innerHTML = "없음";
			//3-4-2. inventory - '첫 획득' 기록 제거
			tr2.getElementsByTagName("td")[5].innerHTML = "";
			//3-4-3. inventory - 해당 아이템 (색깔 지우고) 가시화 해제
			tr2.getElementsByTagName("td")[0].classList.remove("color_epic", "color_set");
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
				if (itemList[i]["set"] === tr_set.getElementsByTagName("td")[0].innerHTML) {
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
				if (a < b) {
					tr_set.getElementsByTagName("td")[0].classList.remove("color_epic", "color_set");
					tr_set.getElementsByTagName("td")[5].innerHTML = "";
				//5-5-4-2. 완성
				} else {
					tr_set.getElementsByTagName("td")[0].classList.add("color_epic");
				//5-5-4-2-1. (완성 시 한정) 세트 첫 획득 지정
					tr_set.getElementsByTagName("td")[5].innerHTML = "\
						" + thousand(count) + "회차\
						<span class='cost'><br/>(초대장 : " + thousand(cost["invite"]) + "\
						<br/>/ 실질 : " + thousand(cost["invite_real"]) + ")";
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
	checkObjective("update");
}


//craft에서 아이템 제작
function make(num,amount) {
	//0-0. 시뮬레이터 실행중 - 제작 불가
	if (runningState !== "") {
		alert("※ 경고 : 탐색 중에는 아이템 제작을 할 수 없습니다.");
		return;
	}

			//0-1. 에픽 소울 수량 체크 (부족하면 취소)  - "무조건" 차감 : 부족할 일은 없음
			/*
			if (get["soul_have"] < soulCount(itemList[num]["level"])) {
				alert("※경고 : 에픽 소울이 부족합니다.\n(필요량 : " + thousand(soulCount(itemList[num]["level"])) + "개, 보유량 : " + thousand(get["soul_have"]) + "개)");
				return;
			}
			*/

	//0-2. 정말로 제작할지 질문
	if (!confirm("'" + itemList[num]["name"] + "' 을(를) " + amount.toString() + "개 제작하시겠습니까?\
\n(에픽 소울 " + soulCount(itemList[num]["level"]) + "개가 무조건 소모됩니다.)\
\n(에픽 소울 수량이 음수가 되면, 0이 될 떄 까지 실질 초대장 소모량이 감소하지 않습니다.)")) {
		return;
	}
	//0-3. 에픽 도감 - 해당 아이템 찾아두기
	var tr_craft = $("#craft_row_" + num);

	//에픽 소울 소모
	get["soul_have"] -= soulCount(itemList[num]["level"]);
	$("#result_soul_have").innerHTML = thousand(get["soul_have"]);
		//보유량이 0 이하가 되면 - 해체 버튼 비활성화
		if (get["soul_have"] <= 0) {
			$("#result_button_soulDisassemble").disabled = "disabled";
			$("#result_button_soulDisassemble").value = "없음";
		}
		//보유량이 0 미만이 되면 - 붉은 글씨
		if (get["soul_have"] < 0) {
			$("#result_soul_have").classList.add("red");
		}

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
		coordinate[i-1] = [0,0];
		$("#item" + i.toString()).style.msTransform = "translate(0px,0px)";
		$("#item" + i.toString()).style.webkitTransform = "translate(0px,0px)";
		$("#item" + i.toString()).style.transform = "translate(0px,0px)";

		//아이템 이름 숨기기&이동, 이미지 숨기기
		$("#item_name" + i.toString()).classList.remove("type_normal","type_jogak");
		$("#item_name" + i.toString()).classList.remove("rare","unique","epic","jogak");
		$("#item_name" + i.toString()).style.visibility = "hidden";
		$("#item_img" + i.toString()).style.visibility = "hidden";

		//에픽 이펙트 숨기기
		$("#effect_appear" + i.toString()).style.visibility = "hidden";
		$("#effect_land" + i.toString()).style.visibility = "hidden";
		$("#effect_wait" + i.toString()).style.visibility = "hidden";

		//애니메이션 정지
		clearRequestTimeout(autoLooting[i-1]);
		clearRequestTimeout(autoEffect["appear"][i-1]);
		clearRequestTimeout(autoEffect["land"][i-1]);
		clearRequestTimeout(autoEffect["wait"][i-1]);
		$("#item_img"+ i.toString()).classList.remove("rotate");
	}
	//7. 아이템 드롭
	var point = Math.floor(Math.random() * coopList[input["dungeon"]].length);
	var list = coopList[input["dungeon"]];
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
		$("#item" + zone.toString()).style.zIndex = 900 - (zoneArr[zone][1]*10);
	}

	if (step < 12) {

		coordinate[zone-1][0] += leftMove;
		coordinate[zone-1][1] -= topMove;
		var coo = coordinate[zone-1][0].toString() + "px," + coordinate[zone-1][1].toString() + "px"
		$("#item" + zone.toString()).style.msTransform = "translate(" + coo + ")";
		$("#item" + zone.toString()).style.webkitTransform = "translate(" + coo + ") rotateY(0deg)";
		$("#item" + zone.toString()).style.transform = "translate(" + coo + ") rotateY(0deg)";

		step += 1;
		topMove -= topMoveModify;

		autoLooting[zone-1] = requestTimeout(function() {
			looting(type, zone, zoneArr, step, sound, animating, leftMove, topMove, topMoveModify);
		},40);

	} else {
		//사운드 출력
		if (sound === 1) {
			playSfx("epic_land");
		}

		//이미지 회전 중단
		$("#item_img"+ zone.toString()).classList.remove("rotate");

		//아이템 드랍 대기
		dropCount += 1;
		if (dropCount === quantity) {//모든 아이템 드랍 완료
			//()가브리엘 미출현 중 & 미 실행 중)에만 버튼 활성화
			if (gabrielSetting["trading"] === false && runningState === "") {
				//버튼 활성화
				onoff(0);
			}
		}

		//애니메이션 지속
		if (animating === 1) {
			//베키모드 : 효과음 실행
			if (myCharacter === "beckey") {
				playSfx("beckey_epic");
			}

			//착지 이펙트 가시화
			$("#effect_land" + zone.toString()).style.top = (-181+25+($("#item_img" + zone.toString()).offsetHeight/2)).toString() + "px";
			$("#effect_land" + zone.toString()).style.visibility = "visible";
			animation($("#effect_land" + zone.toString()),"land",zone,604,0,-4227,120,0);

			//대기 이펙트 가시화
			$("#effect_wait" + zone.toString()).style.top = (-118+25+($("#item_img" + zone.toString()).offsetHeight/2)).toString() + "px";
			$("#effect_wait" + zone.toString()).style.visibility = "visible";
			animation($("#effect_wait" + zone.toString()),"wait",zone,188,0,-2255,70,1);
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
				autoEffect["jogak"] = requestTimeout(function() {
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
				autoEffect[type][zone-1] = requestTimeout(function() {
					animation(target,type,zone,frameWidth,now - frameWidth,limit,speed,repeat);
				}, speed);
			} else if (repeat === 1){
				target.style.backgroundPosition = "0px 0px";
				autoEffect[type][zone-1] = requestTimeout(function() {
					animation(target,type,zone,frameWidth,0,limit,speed,repeat);
				}, speed);
			} else {
				target.style.visibility = "hidden";
			}
	}
}

//=================================================================================================================
//※ 함수 - 장비 장착, 강화, 영웅의 항아리
//=================================================================================================================
//장비 장착하기
function setEquip(cmd, toWearName, noSound, dontsave) {
	//cmd 없음 : 착용 가능한 모든 장비 검색 후 등록
	if (!cmd || cmd === "nosave") {
		//장비창 비우기
		for (var i=0;i<partList.length;i++) {
			clearSelect($("#list_" + partList[i] + "_select"));
			var option = document.createElement("option");
				option.value = "";
				if (myCharacter !== "beckey") {
					option.innerHTML = "Lv.60 | 마법으로 봉인된 모험가 " + partList[i];
				} else {
					option.innerHTML = "Lv.60 | 베키의 망가진 " + partList[i];
				}
			$("#list_" + partList[i] + "_select").add(option);
		}
		//탐색 개시
		for (var i=0;i<itemList.length;i++) {
			//착용 가능한 장비이고 보유 수량이 1 이상일 경우
			if ((itemList[i]["class"] === "" ||
			itemList[i]["class"].indexOf(myCharacter) >= 0) &&
			itemList[i]["have"] > 0) {
				var option = document.createElement("option");
					option.value = itemList[i]["name"];
					option.innerHTML = "Lv." + itemList[i]["level"] + " | " + itemList[i]["name"]
				//무기 : sort1 기준 저장
				if (itemList[i]["sort1"] === "무기") {
					$("#list_" + itemList[i]["sort1"] + "_select").add(option);
				//나머지 : sort3 기준 저장
				} else {
					$("#list_" + itemList[i]["sort3"] + "_select").add(option);
				}
			}
		}
		for (var i=0;i<partList.length;i++) {
			(function(i) {
				//(현재 착용중인 장비가 있다면)해당 장비 선택
				if (wearingList[partList[i]] !== null) {
					for (var j=0;j<$("#list_" + partList[i] + "_select").options.length;j++) {
						if ($("#list_" + partList[i] + "_select").options[j].value === wearingList[partList[i]]["name"]) {
							$("#list_" + partList[i] + "_select").selectedIndex = j;
							if (cmd === "nosave") {
								setEquip(partList[i], $("#list_" + partList[i] + "_select").value, "noSound", "dontsave");
							} else {
								setEquip(partList[i], $("#list_" + partList[i] + "_select").value, "noSound");
							}
							break;
						}
					}
				}
				//(SELECT 변경 시)각 장비마다 착용 효과 적용
				$("#list_" + partList[i] + "_select").onchange = function() {
					setEquip(partList[i], $("#list_" + partList[i] + "_select").value);
				}
			})(i)
		}
	//기본 장비 장착
	} else if (toWearName === "") {
		//1. 착용장비 정보 초기화
		wearingList[cmd] = null;
		//2. 대상 리스트창 초기화
			//2-2. 아이콘 변경
			$("#list_" + cmd + "_icon").style.backgroundPosition = "0px 0px";
			//2-3. 강화 수치 표시
			$("#list_" + cmd + "_enchant").innerHTML = "+0";
			//2-4. 세트 표시
			$("#list_" + cmd + "_set").innerHTML = "";
		//3, 상단 현황 초기화
			//아이콘 변경
			$("#state_" + cmd + "_icon").style.backgroundPosition = "0px 0px";
			//강화 수치 변경
			$("#state_" + cmd + "_enchant").innerHTML = "+0";
		//4. 사운드 출력
		if (!noSound) {
			playSfx("wearing");
		}
		//5. 전투력 계산
		setPower();
		//게임 저장
		if (cmd !== "nosave" && (!dontsave || dontsave !== "dontsave")) {
			saveData();
		}

	//특정 부위 징칙
	} else {
		//1. 착용장비 정보 등록
		for (var i=0;i<itemList.length;i++) {
			if (itemList[i]["name"] === toWearName) {
				wearingList[cmd] = itemList[i];

				break;
			}
		}
		//2. 대상 리스트창 최신화
			//2-2. 아이콘 변경
			$("#list_" + cmd + "_icon").style.backgroundPosition = spritePosition(wearingList[cmd]["icon"], 1);
			//2-3. 강화 수치 표시
			$("#list_" + cmd + "_enchant").innerHTML = "+" + wearingList[cmd]["enchant"];
			//2-4. 세트 표시
			$("#list_" + cmd + "_set").innerHTML = wearingList[cmd]["set"];
		//3, 상단 현황 최신화
			//아이콘 변경
			$("#state_" + cmd + "_icon").style.backgroundPosition = spritePosition(wearingList[cmd]["icon"], 1);
			//강화 수치 변경
			$("#state_" + cmd + "_enchant").innerHTML = "+" + wearingList[cmd]["enchant"];
		//4. 사운드 출력
		if (!noSound) {//함수 작동 시 사운드를 원치 않으면 noSound 값이 정해져있음
			playSfx("wearing");
		}
		//5. 전투력 계산
		setPower();
		//게임 저장
		if (cmd !== "nosave" && (!dontsave || dontsave !== "dontsave")) {
			saveData();
		}
	}

}

//아이템 전투력 판단
function calcPower(item) {
	//기본 장비 : 별도 계산 후 반환
	if (typeof(item) != "object") {
		//부위 파악
		var cmd = item;
		var toPower = 0;
		if (cmd === "무기")
			toPower = pplList["lv0"] * 3;
		else if (cmd === "보조장비" || cmd === "귀걸이")
			toPower = pplList["lv0"] * 2;
		else
			toPower = pplList["lv0"];
		return {
			"power":toPower,
			"setted":0
		}
	}

	//전투력 준비
	var tempPower = 0;
	//부위 파악
	var part = "";
	if (item["sort1"] === "무기") part = "무기";
		else part = item["sort3"];
	//레벨 파악
	var level = "lv" + item["level"].toString();
	//레벨 & 부위 따른 전투력
	switch (part) {
		case "무기":
			tempPower += pplList[level] * 3;
			break;
		case "보조장비":
			tempPower += pplList[level] * 2;
			break;
		case "마법석":
			tempPower += pplList[level] * 2;
			break;
		case "귀걸이":
			tempPower += pplList[level] * 2;
			break;
		default:
			tempPower += pplList[level];
			break;
	}
	//레벨 & 강화수치에 따른 전투력
	var enchant = item["enchant"];
	for (var i=0;i<=enchant;i++) {
		if (i > 0 && i <= 5) tempPower += eplList[level][0];
		else if (i > 5 && i <= 10) tempPower += eplList[level][1];
		else if (i > 10 && i <= 12) tempPower += eplList[level][2];
		else if (i > 12 && i <= 15) tempPower += eplList[level][3];
		if (i > 15 && i <= 20) tempPower += eplList[level][4];
	}
	//세트에 따른 전투력
	var set = item["set"];
	var setted = 0;
	var setCount = [0,0];//0 : 장착, 1 : 전체
	for (var i=0;i<partList.length;i++) {
		if (wearingList[partList[i]] !== null && wearingList[partList[i]]["set"] === set) setCount[0] += 1;
	}
	for (var i=0;i<itemList.length;i++) {
		if (itemList[i]["set"] === set) setCount[1] += 1;
	}
		//(총 세트 부위 수 & 장착 세트 부위 수가 동일) 50% 강화
		if (setCount[0] === setCount[1]) {
			tempPower *= 1.5;
			setted = 1;
		}
	//전투력 반환
	return {
		"power":tempPower,
		"set":setted
	};
}


//총 전투력 측정
function setPower() {
	//RPG모드에서만 실시
	if (playMode !== "normal") {
		//전투력 준비
		var tempPower = 0;
		//전투력 합산
		var report = {};
		for (var i=0;i<partList.length;i++) {
			if (wearingList[partList[i]] === null) {
				report = calcPower(partList[i]);
				tempPower += report["power"];
			} else {
				report = calcPower(wearingList[partList[i]]);
				tempPower += report["power"];
			}
			$("#list_" + partList[i] + "_power").innerHTML = "전투력 : " + thousand(report["power"]);
			//세트 완성 - 카테고리란을 녹색 표시
			if (report["set"] === 1) {
				$("#list_" + partList[i] + "_type").classList.add("set");
			//아니면 그냥 놔둠
			} else {
				$("#list_" + partList[i] + "_type").classList.remove("set");
			}
		}
		//베키 : 전투력 2배 뻥튀기
		if (myCharacter === "beckey") tempPower *= 2;
		//전투력 적용
		power = tempPower;
		$("#character_power").innerHTML = thousand(power);
	}
}

//장비 강화
function doEnchant(target, part, step) {
	switch (step) {
		//0단계 : 강화 준비
		case 0:
			//강화 중 기억
			enchantList["enchanting"] = 1;
			//강화 도중엔 장착 탭 끄지 못함
			for (var i=1;i<=5;i++) {
				$("#shift" + i.toString()).disabled = "disabled";
			}
			$("#shift_chance").disabled = "disabled";
			//모든 강화 버튼 비활성화
			for (var i=0;i<partList.length;i++) {
				(function(i) {
					$("#list_" + partList[i] + "_enchant_run").disabled = "disabled";
				})(i)
			}
			//아이콘 표시
			$("#enchant_icon").className = "";
			$("#enchant_icon").style.backgroundPosition = spritePosition(target["icon"],1);
			//강화 정보 세팅
			$("#enchant_text").innerHTML = "강화 중...";
			$("#enchant_text").className = "enchanting";
			//사운드 출력
			playSfx("enchant_progress", [
				"enchant_success",
				"enchant_fail",
				"enchant_zero"
			]);
			//강화 진행
			$("#enchant_progress_bar").style.width = ($("#enchant_progress_bar").offsetWidth + 5).toString() + "px";
			requestTimeout(function() {
				doEnchant(target, part, 1);
			}, 16);

			break;
		//나머지 : 게이지 상승
		case 1:
			if ($("#enchant_progress_bar").offsetWidth + 5 < $("#enchant_progress").offsetWidth) {
				$("#enchant_progress_bar").style.width = ($("#enchant_progress_bar").offsetWidth + 5).toString() + "px"
				requestTimeout(function() {
					doEnchant(target, part, 1);
				}, 16);
			} else {
				endEnchant(target, part);
			}
			break;
	}
}
//장비 강화 적용
	//강화 변수 확인
	function endEnchant(target, part) {
		var enName = target["name"];
		var enIcon = target["icon"];
		//단계
		var enLevel = target["enchant"];
		//비용
		var enCost = enchantList["cost"][enLevel];
		//확률
		var enChance = enchantList["chance"][enLevel];
	//강화비용 차감
		cost["gold"] += enCost;
		cost["gold_real"] += enCost;
		$("#cost_gold").innerHTML = setWon(cost["invite"]*gold + cost["gold"]);
		$("#cost_gold_real").innerHTML = setWon(cost["invite_real"]*gold + cost["gold_real"]);
	//강화 성공여부 결정
	var result = 0;
		//성공
		if (Math.random() <= enChance) {
			result = 1;
		//실패
		} else {
			result = 0;
		}
	//강화 효과 적용
	switch (result) {
		//강화 성공
		case 1:
			//사운드 출력
			playSfx("enchant_success", [
				"enchant_progress"
			]);
			//강화 인터페이스 출력
			$("#enchant_text").className = "";
			$("#enchant_text").innerHTML = "+" + (target["enchant"]+1).toString() +
				"단계 강화 <span class='set'>성공!</span> (+" + target["enchant"].toString() + " -> +" + (target["enchant"]+1).toString() + ")";
			$("#enchant_progress_bar").style.width = "0px";
			//강화 단계 증가
			target["enchant"] += 1;
			//장착 창 갱신
			setEquip(part, target["name"], "noSound");
			//게임 저장
			saveData();

			break;
		//강화 실패
		case 0:
			//사운드 출력
			if (target["enchant"] < 10) {
				playSfx("enchant_fail", [
					"enchant_progress"
				]);
			//10 이상
			} else {
				playSfx("enchant_zero", [
					"enchant_progress"
				]);
			}
			//강화 인터페이스 출력
			$("#enchant_text").className = "";
			$("#enchant_text").innerHTML = "+" + (target["enchant"]+1).toString() +
				"단계 강화 <span class='red'>실패!</span> (+" + target["enchant"].toString() +
				" -> +" + (target["enchant"]+enchantList["drop"][target["enchant"]]).toString() + ")";
			$("#enchant_progress_bar").style.width = "0px";
			//강화 단계 증가
			target["enchant"] += enchantList["drop"][target["enchant"]];
			//장착 창 갱신
			setEquip(part, target["name"], "noSound");
			//게임 저장
			saveData();

			break;
	}
	//강화 종료 기억
	enchantList["enchanting"] = 0;
	//버튼 정상화
	for (var i=1;i<=5;i++) {
		(function(i) {
			$("#shift" + i.toString()).disabled = "";
		})(i)
	}
	if (playMode === "normal") {
		$("#shift_chance").disabled = "";
	}
	//모든 강화 버튼 활성화
	for (var i=0;i<partList.length;i++) {
		(function(i) {
			$("#list_" + partList[i] + "_enchant_run").disabled = "";
		})(i)
	}
}


//항아리 개봉 버튼 세팅
function setPotOpen(type) {
	switch (type) {
		case "tradable":
			//세팅 가능
			$("#pot_type").disabled = "";
			//일반 버전 외엔 변경 불가
			if (playMode === "normal") {
				$("#pot_tradable").disabled = "";
			} else {
				$("#pot_tradable").disabled = "disabled";
			}


			$("#pot_open").className = "";
			$("#pot_open").value = "개봉 (∞)"
			if (runningState === "") {
				$("#pot_open").disabled = "";
			}

			break;
		case "notTradable":
			//세팅 가능
			$("#pot_type").disabled = "";
			//일반 버전 외엔 변경 불가
			if (playMode === "normal") {
				$("#pot_tradable").disabled = "";
			} else {
				$("#pot_tradable").disabled = "disabled";
			}

			$("#pot_open").className = "";
			$("#pot_open").value = "개봉 (" + tower.toString() + ")"
			if (tower > 0 && runningState === "") {
				$("#pot_open").disabled = "";
			} else {
				$("#pot_open").disabled = "disabled";
			}

			break;
		case "cancel":
			//세팅 봉인
			$("#pot_type").disabled = "disabled";
			$("#pot_tradable").disabled = "disabled";

			$("#pot_open").className = "cancel";
			$("#pot_open").value = "개봉 취소"

			break;
	}
}

//항아리 개봉
function openPot(type, tradable, step) {
	switch (step) {
		//최초 - 실행
		case 0:
			//개봉 창 오픈
			$("#popup_pot").style.display = "block";
			//실행 불가
			onoff("pot");
			//문구 세팅
			var tempText = "";
			if (tradable === "tradable") {
				tempText = "교환 가능";
			} else {
				tempText = "교환 불가";
			}
			$("#popup_pot_message").innerHTML = "영웅의 " + type +
				" 항아리 (" + tempText + ") : " + setWon(potList["cost"][tradable]) + " Gold";
			//사운드 출력
			playSfx("pot_opening");

			//게이지 증가
			$("#popup_pot_progress_bar").style.width = ($("#popup_pot_progress_bar").offsetWidth + 3).toString() + "px";

			//다음 단계로
			requestTimeout(function() {
				openPot(type, tradable, 1);
			}, 16);
			break;
		//나머지
		case 1:
			//중단 신호 -> 중단
			if (potList["opening"] === 0) {
				//게이지 초기화
				$("#popup_pot_progress_bar").style.width = "0px";
				//실행 가능
				onoff(0);
				//개봉 창 닫기
				$("#popup_pot").style.display = "none";
				//사운드 중단
				if (!sfxList["pot_opening"].paused) {
					sfxList["pot_opening"].pause();
					sfxList["pot_opening"].currentTime = 0;
				}
				//버튼 세팅
				setPotOpen($("#pot_tradable").value);
				//끝
				return;
			}
			//게이지 길이 측정
			if ($("#popup_pot_progress_bar").offsetWidth + 3 < $("#popup_pot_progress").offsetWidth) {
				$("#popup_pot_progress_bar").style.width = ($("#popup_pot_progress_bar").offsetWidth + 3).toString() + "px"
				requestTimeout(function() {
					openPot(type, tradable, 1);
				}, 16);
			} else {
				openPot(type, tradable, 2);
			}

			break;
		//장비 지정 후 드랍
		case 2:
			//비용 차감
			cost["gold"] += potList["cost"][tradable];
			cost["gold_real"] += potList["cost"][tradable];
			$("#cost_gold").innerHTML = setWon(cost["invite"]*gold + cost["gold"]);
			$("#cost_gold_real").innerHTML = setWon(cost["invite_real"]*gold + cost["gold_real"]);
				//교환 불가 : 100일 등정 차감
				if (tradable === "notTradable") {
					tower -= 1;
				}

			//대상 아이템 수집
			var arr = [];
			var arrLevel = [];
			var arrLevel_num = [];
			switch (type) {
				case "무기":
					for (var i=0;i<itemList.length;i++) {
						if (itemList[i]["sort1"] === "무기" && itemList[i]["class"].indexOf(myCharacter) >= 0 && itemList[i]["goyu"] === "") {
							arr.push(itemList[i]);
							if (arrLevel.indexOf(itemList[i]["level"]) < 0) {
								arrLevel.push(itemList[i]["level"]);
								arrLevel_num[arrLevel.indexOf(itemList[i]["level"])] = 0;
							}
							arrLevel_num[arrLevel.indexOf(itemList[i]["level"])] += 1;
						}
					}
					break;
				default:
					for (var i=0;i<itemList.length;i++) {
						if (itemList[i]["sort3"] === type && itemList[i]["goyu"] === "") {
							arr.push(itemList[i]);
							if (arrLevel.indexOf(itemList[i]["level"]) < 0) {
								arrLevel.push(itemList[i]["level"]);
								arrLevel_num[arrLevel.indexOf(itemList[i]["level"])] = 0;
							}
							arrLevel_num[arrLevel.indexOf(itemList[i]["level"])] += 1;
						}
					}
					break;
			}
			//가중치 감안해서 아이템 레벨 선정
			for (var i=0;i<arrLevel.length;i++) {
				for (var j=0;j<potList[type]["name"].length;j++) {
					if (potList[type]["name"][j].indexOf(arrLevel[i]) >= 0) {
						arrLevel_num[i] *= potList[type]["num"][j];
					}
				}
			}
			var level = arrLevel[rand(arrLevel_num)];
			//해당 아이템만 추출 후 거기서 무작위로 가져옴
			var tempList = [];
			for (var i=0;i<arr.length;i++) {
				if (arr[i]["level"] === level) {
					tempList.push(arr[i]);
				}
			}
			var target = tempList[Math.floor(Math.random() * tempList.length)];

			//선택 완료 -> 창 닫기
				//중단 상태 기억
				potList["opening"] = 0;
				//게이지 초기화
				$("#popup_pot_progress_bar").style.width = "0px";
				//실행 가능
				onoff(0);
				//개봉 창 닫기
				$("#popup_pot").style.display = "none";
				//사운드 중단
				if (!sfxList["pot_opening"].paused) {
					sfxList["pot_opening"].pause();
					sfxList["pot_opening"].currentTime = 0;
				}
				//버튼 세팅
				setPotOpen($("#pot_tradable").value);

			//아이템 드랍
				//A. 필드 아이템 정리
				for (var i=0;i<maxQuantity;i++) {
					//아이템 루팅 시작 위치로 이동
					coordinate[i-1] = [0,0];
					$("#item" + i.toString()).style.msTransform = "translate(0px,0px)";
					$("#item" + i.toString()).style.webkitTransform = "translate(0px,0px)";
					$("#item" + i.toString()).style.transform = "translate(0px,0px)";

					//아이템 이름 숨기기&이동, 이미지 숨기기
					$("#item_name" + i.toString()).classList.remove("type_normal","type_jogak");
					$("#item_name" + i.toString()).classList.remove("rare","unique","epic","jogak");
					$("#item_name" + i.toString()).style.visibility = "hidden";
					$("#item_img" + i.toString()).style.visibility = "hidden";

					//에픽 이펙트 숨기기
					$("#effect_appear" + i.toString()).style.visibility = "hidden";
					$("#effect_land" + i.toString()).style.visibility = "hidden";
					$("#effect_wait" + i.toString()).style.visibility = "hidden";

					//애니메이션 정지
					clearRequestTimeout(autoLooting[i-1]);
					clearRequestTimeout(autoEffect["appear"][i-1]);
					clearRequestTimeout(autoEffect["land"][i-1]);
					clearRequestTimeout(autoEffect["wait"][i-1]);
					$("#item_img"+ i.toString()).classList.remove("rotate");
				}
				//B. 아이템 드롭
				var point = Math.floor(Math.random() * coopList[input["dungeon"]].length);
				var list = coopList[input["dungeon"]];
				getItem("항아리",target,point,list);
				//게임 저장
				saveData();

			break;
	}
}

//=================================================================================================================
//※ 함수 - 게임 엔딩
//=================================================================================================================
function ending(step) {
	switch (step) {
		case 0:
			//베히모스 활성화
			playSfx("anton_scream");

			//가림막 준비
			$("#frame_cover").style.opacity = "0.1";
			$("#frame_cover").style.display = "block";

			requestTimeout(function() {
				ending(step+1);
			}, 250);

			break;
		case 10:
			if (!sfxList["anton_scream"].paused)
				sfxList["anton_scream"].pause();

			//엔딩창 세팅
			$("#ending_character").innerHTML = characterList[myCharacter]["name"];
			$("#ending_count").innerHTML = thousand(count) + "회";
			$("#ending_date").innerHTML = thousand(dateState["date"]) + "일";
			$("#ending_invite").innerHTML = thousand(cost["invite_real"]) + "장";
			$("#ending_gold").innerHTML = setWon(cost["invite_real"]*gold + cost["gold_real"]) + " Gold";
			$("#ending_power").innerHTML = thousand(power);

			//가림막 제거
			$("#frame_cover").style.opacity = "0";
			$("#frame_cover").style.display = "none";

			//베키 모드
			if (myCharacter === "beckey") {
				//베키엔딩창 실행
				$("#wrapper").style.display = "none";
				$("#beckey_ending").style.display = "block";
				playBGM("beckey");
				//베키엔딩창 설정
				beckeyEnding(0);
			//RPG 모드
			} else {
				//엔딩창 실행
				$("#wrapper").style.display = "none";
				$("#ending").style.display = "block";
				playBGM("rpg_clear");
					requestTimeout(function() {
						//잠시 후 엔딩 창 닫을 수 있게
						$("#ending_confirm").className = "able";
						$("#ending_confirm").disabled = "";
						$("#ending_confirm").onclick = function() {
							//버튼 클릭 : 엔딩창 닫기
							$("#ending_confirm").className = "";
							$("#ending_confirm").disabled = "disabled";
							$("#ending").style.display = "none";
							$("#wrapper").style.display = "block";
							//브금 실행
							playBGM($("#bgm_type").value);
						}
					}, 2000);
			}

			break;
		default:
			$("#frame_cover").style.opacity = ((step+1)/10).toString();

			requestTimeout(function() {
				ending(step+1);
			}, 250);

			break;
	}
}

//베키 엔딩컷
function beckeyEnding(step) {
	//사진 표시
	$("#beckey_ending_picture").style.backgroundImage = "url('./images/epic/beckey_ending/beckey_ending_" + step.toString() + ".jpg')";
	//사진 클릭 - 다음 사진 (스텝이 12 미만이라면)
	if (step < 12) {
		$("#beckey_ending_picture").onclick = function() {
			beckeyEnding(step + 1);
		}
	}
	//첫 사진으로
	$("#beckey_ending_button_first").onclick = function() {
		beckeyEnding(0);
	}
	//12이상 : 엔딩 확인
	if (step < 12) {
		$("#beckey_ending_button_end").disabled = "disabled";
		$("#beckey_ending_button_end").value = "사진을 클릭하세요 (" + (step+1).toString() + "/13)";
	} else {
		$("#beckey_ending_button_end").disabled = "";
		$("#beckey_ending_button_end").value = "플레이 결과 정산";
		$("#beckey_ending_button_end").onclick = function() {
			//엔딩창 실행
			$("#beckey_ending").style.display = "none";
			$("#ending").style.display = "block";
			playBGM("rpg_clear");
				requestTimeout(function() {
					//잠시 후 엔딩 창 닫을 수 있게
					$("#ending_confirm").className = "able";
					$("#ending_confirm").disabled = "";
					$("#ending_confirm").onclick = function() {
						//버튼 클릭 : 엔딩창 닫기
						$("#ending_confirm").className = "";
						$("#ending_confirm").disabled = "disabled";
						$("#ending").style.display = "none";
						$("#wrapper").style.display = "block";
						//브금 실행
						playBGM($("#bgm_type").value);
					}
				}, 2000);
		}
	}

}
//=================================================================================================================
//※ 함수 - 기타 (브금 실행, 버튼 변경, 창 변경, 확률 변경)
//=================================================================================================================
//브금 정지
function stopBGM() {
	switch (bgm) {
		case "beckey":
			if (!bgmList["beckey"].paused) {
				bgmList["beckey"].currentTime = 0;
				bgmList["beckey"].pause();
			}

			break;
		case "hell":
			if (!bgmList["hell"].paused) {
				bgmList["hell"].currentTime = 0;
				bgmList["hell"].pause();
			}

			break;
		case "rpg_clear":
			if (!bgmList["rpg_clear"].paused) {
				bgmList["rpg_clear"].currentTime = 0;
				bgmList["rpg_clear"].pause();
			}

			break;
		default:
			if (!bgmList[bgm.toString()].paused) {
				bgmList[bgm.toString()].currentTime = 0;
				bgmList[bgm.toString()].pause();
			}

			break;
	}
}

//효과음 실행
function playSfx(toPlay, notToPlayList) {
	//재생할 음악
	if (toPlay) {
		if ($("#option_sound").checked) {
			if (sfxList[toPlay].paused){
				sfxList[toPlay].play();
			} else {
				sfxList[toPlay].currentTime = 0;
			}
		}
	}
	//정지할 음악들
	if (notToPlayList) {
		if (!$("#option_sound").disabled && $("#option_sound").checked) {
			for (var i=0;i<notToPlayList.length;i++) {
				if (!sfxList[notToPlayList[i]].paused) {
					sfxList[notToPlayList[i]].pause();
					sfxList[notToPlayList[i]].currentTime = 0;
				}
			}
		}
	}
	//끝
}
//브금 실행
function playBGM(type) {
	//IF(기존 브금 실행중) 해당 브금 종료
	if (bgm !== "none") {
		switch (bgm) {
			case "beckey":
				if (!bgmList["beckey"].paused) {
					bgmList["beckey"].currentTime = 0;
					bgmList["beckey"].pause();
				}

				break;
			case "hell":
				if (!bgmList["hell"].paused) {
					bgmList["hell"].currentTime = 0;
					bgmList["hell"].pause();
				}

				break;
			case "rpg_clear":
				if (!bgmList["rpg_clear"].paused) {
					bgmList["rpg_clear"].currentTime = 0;
					bgmList["rpg_clear"].pause();
				}

				break;
			default:
				if (!bgmList[bgm.toString()].paused) {
					bgmList[bgm.toString()].currentTime = 0;
					bgmList[bgm.toString()].pause();
				}

				break;
		}
	}

	//신규 브금 실행 or 브금 정지
	if ($("#option_bgm").checked === false) {
		bgm = "none";
	} else if (type !== "") {
		switch (type) {
			case "dungeon":
				bgmList[input["dungeon"].toString()].play();
				bgm = input["dungeon"];

				break;
			case "hell":
				bgmList["hell"].play();
				bgm = "hell";

				break;
			case "beckey":
				bgmList["beckey"].play();
				bgm = "beckey";

				break;
			case "rpg_clear":
				bgmList["rpg_clear"].play();
				bgm = "rpg_clear";

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
			if (playMode === "normal") {
				$("#difficulty").disabled = "";
			}
			$("#channel_random").disabled = "";
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
			$("#start1").disabled = "";
			$("#start2").disabled = "disabled";

			$("#start1").value = "실행 중지";
			$("#start2").value = "탐색 실시";

			$("#dungeon").disabled = "disabled";
			$("#channel_random").disabled = "disabled";
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
			$("#channel_random").disabled = "disabled";
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

			$("#start1").value = "확인 중";
			$("#start2").value = "확인 중";

			//창
			$("#popup_gabriel").style.display = "none";

			break;
		//항아리 개봉 중
		case "pot":
			//버튼
			$("#start1").disabled = "disabled";
			$("#start2").disabled = "disabled";

			$("#start1").value = "항아리 개봉";
			$("#start2").value = "항아리 개봉";

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

	//equip
	if (target === "equip")  {
		//1. 열렸다고 기록
		temp = 1;
		right_display = "equip";

		//2. 제목 표시
		$("#popup_title").className = "title_equip";//클래스 설정 이유 : 배경이미지 변경
		$("#popup_title").innerHTML = "장비 장착";

		//3. 필터링, 본문, 체크박스 표시
		$("#equip_state").style.display = "block";
			//3-1. 캐릭터를 선택했을 때만 본문 표시
			if (myCharacter === "") {
				$("#equip_notice").style.display = "table";
				$("#equip_list").style.display = "none";
			} else {
				$("#equip_notice").style.display = "none";
				$("#equip_list").style.display = "block";
			}
		$("#equip_enchant").style.display = "block";
		$("#equip_character").style.display = "block";

		//4. 버튼 변경
		$("#shift5").classList.add("selected");
		$("#shift5").classList.remove("ready");//색상 변화 효과 제거
		$("#shift5").value = "닫기";
	} else {
		//1. 필터링, 본문, 체크박스 미표시
		$("#equip_state").style.display = "none";
		$("#equip_notice").style.display = "none";
		$("#equip_list").style.display = "none";
		$("#equip_enchant").style.display = "none";
		$("#equip_character").style.display = "none";

		//2. 버튼 초기화
		$("#shift5").classList.remove("selected");
		$("#shift5").value = "장착";
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

		//(record라면) 흭득기록 창 내리기 (popup div가 열려있을 때만 스크롤 효과 가능함)
		if (target === "record") {
			$("#record").scrollTop = $("#record").scrollHeight;
		}
	} else {
		//(chance 빼고) 열린 게 없다면
		$("#popup").style.display = "none";
		$("#checkbox").style.display = "none";
		right_display = "none";
	}

	//열었음 : 열기 효과음
	if (temp > 0) {
		playSfx("open");
	//닫았음 : 닫기 효과음
	} else {
		playSfx("close");
	}
}

//확률 변경
function setChance(cmd) {
	/*기초 변수 준비*/
	var chanceList = [
		["어려움","매우어려움"],
		["노멀","익스퍼트","마스터","킹","슬레이어"],
		["에픽 아이템","에픽 소울","지옥 구슬"]
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
				//각 난이도별 확률
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
					//에픽 소울
					chanceList_num[1][i-1][j-1][2] = fixed(parseFloat($("#chance_text_" + i.toString() + j.toString() + "2").value),0.01);
					//지옥 구슬
					chanceList_num[1][i-1][j-1][3] = fixed(parseFloat($("#chance_text_" + i.toString() + j.toString() + "3").value),0.01);

					break;
			}
		}
	}
	//합산 확률 표시
	for (var j=1;j<=chanceList[1].length;j++) {
		for (var k=1;k<=chanceList[2].length;k++) {
			$("#chance_text_3" + j.toString() + k.toString()).value = ((1 - Math.pow(1 - chanceList_num[1][1][j-1][k],6))*100).toFixed(2).toString();
		}
	}

	//안내 메시지
	switch (cmd) {
		case "reset":
			alert("드랍 확률이 초기화되었습니다.");
			//게임 저장
			saveData();

			break;
		case "perfect":
			alert("에픽 드랍률이 100%가 되었습니다.");
			//게임 저장
			saveData();

			break;
		case "apply":
			alert("드랍 확률이 정상적으로 적용되었습니다.");
			//게임 저장
			saveData();

			break;
	}
}
