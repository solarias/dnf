
//=================================================================================================================
//※ 실행
//=================================================================================================================
window.onload = function() {
	//======================
	//※ 데이터 정리
	//======================
	//아이템 정리 작업 1 : 드랍되지 않는 아이템 제외
		//1. 던전 수집
		var tempList = [];
		for (i=0;i<$("#dungeon").options.length;i++) {
			if (tempList.indexOf($("#dungeon").options[i].value) === -1) {
				tempList.push($("#dungeon").options[i].value);
			}
		}
		//2. 던전 리스트를 통한 지역&레벨 수집
		var tempList2 = [];//레벨
		var tempList3 = [];//지역
		tempList3.push("");//"비 고유에픽"
		for (i=0;i<tempList.length;i++) {
			//레벨
			for (j=0;j<levelList[tempList[i]].length;j++) {
				if (tempList2.indexOf(levelList[tempList[i]][j]) === -1) {
					tempList2.push(levelList[tempList[i]][j]);
				}
			}
			//지역
			if (tempList3.indexOf(areaList[tempList[i]]) === -1) {
				tempList3.push(areaList[tempList[i]]);
			}
		}
		//3. 레벨&지역 해당하지 않는 것들만 입력
		var tempList4 = [];//제외시킬 리스트
		for (i=0;i<itemList.length;i++) {
			if (tempList2.indexOf(itemList[i]["level"]) === -1 || tempList3.indexOf(itemList[i]["goyu"]) === -1) {
				tempList4.push(i);
			}
		}
		//4. itemList에서 제외대상을 역순으로 제외 (순서 꼬임 방지)
		for (i=tempList4.length-1;i>=0;i--) {
			itemList.splice(tempList4[i],1);
		}

	//아이템 정리 작업 2 : 일부 아이템리스트 세팅
	for (i=0;i<itemList.length;i++) {
		//고유 에픽
		if (itemList[i]["goyu"] !== "") {
			goyuList.push(itemList[i]);
		}
	}

	//아이템 정리 작업 3 : 모든 아이템 종류 구분
	for (var i=0;i<itemList.length;i++) {
		switch (itemList[i]["sort1"]) {
			case "방어구":
				if (equipList.indexOf(itemList[i]["sort2"]) < 0) {
					equipList.push(itemList[i]["sort2"]);
				}

				break;
			case "":
				break;
			default:
				if (equipList.indexOf(itemList[i]["sort3"]) < 0) {
					equipList.push(itemList[i]["sort3"]);
				}

				break;
		}
	}

	//(실행 전) 최대 드랍가능 아이템 수량 조사
	maxQuantity = 0;
	//일반 장비 드랍 수량
	var temp = 0;
	for (var i=0;i<dropQuantityList[0].length;i++) {
		if (temp < dropQuantityList[0][i]) {
			temp = dropQuantityList[0][i];
		}
	}
	maxQuantity += temp;
	//에픽 조각 드랍 수량
	temp = 0;
	for (var i=0;i<dropQuantityList[1].length;i++) {
		if (temp < dropQuantityList[1][i]) {
			temp = dropQuantityList[1][i];
		}
	}
	maxQuantity += temp;
	//초대장 드랍 수량
	temp = 0;
	for (var i=0;i<dropQuantityList[2].length;i++) {
		for (var j=0;j<dropQuantityList[2][i].length;j++) {
			if (temp < dropQuantityList[2][i][j]) {
				temp = dropQuantityList[2][i][j];
			}
		}
	}
	maxQuantity += temp;
	//최대 드랍 가능 아이템 수량만큼 칸 생성
	for (var i=0;i<maxQuantity;i++) {
		var slot = document.createElement("div");
		slot.id = "item" + i.toString();
		slot.className = "item";
		slot.innerHTML = "\
				<div id='description" + i.toString() + "' class='description'>\
					<p id='item_name" + i.toString() + "' class='item_name'></p>\
				</div>\
				<div id='item_img" + i.toString() + "' class='item_img'></div>\
				\
				<div id='effect_appear" + i.toString() + "' class='effect_appear'></div>\
				<div id='effect_land" + i.toString() + "' class='effect_land'></div>\
				<div id='effect_wait" + i.toString() + "' class='effect_wait'></div>";
		$("#frame_top").appendChild(slot);
	}

	//확률 수치 default에 맞추기
	chanceList_num = deepCopy(chanceList_num_default);

	//날짜 최초 계산
	setDate();

	//======================
	//※ 선로딩 실시
	//======================
	//audio 파일 선로딩
	try {
		//음악파일 업로드 위치 : 다음 블로그
		sound_appear = new Audio;
			sound_appear.volume = 0.3;
		sound_land = new Audio;
			sound_land.volume = 0.3;

		if (sound_appear.canPlayType("audio/mpeg") !== "") {
			//mp3 출력 가능
			sound_appear.src = "http://cfile206.uf.daum.net/attach/26393B3B559DCAF43351BB";
			sound_land.src = "http://cfile237.uf.daum.net/attach/220E343D559CD61C10451E";
		} else {
			//mp3 출력 불가 - ogg로 대체
			sound_appear.src = "http://cfile225.uf.daum.net/attach/221A6F44559DD6D31E0F30";
			sound_land.src = "http://cfile226.uf.daum.net/attach/2722E144559DD6D41A932A";
		}

		//BGM 준비
		bgmList = {
			"0":new Audio("./sound/bgm_0.mp3"),
			"1":new Audio("./sound/bgm_1.mp3"),
			"2":new Audio("./sound/bgm_2.mp3"),
			"3":new Audio("./sound/bgm_3.mp3"),
			"4":new Audio("./sound/bgm_4.mp3"),
			"5":new Audio("./sound/bgm_5.mp3"),
			"6":new Audio("./sound/bgm_6.mp3"),
			"7":new Audio("./sound/bgm_7.mp3"),
			"8":new Audio("./sound/bgm_8.mp3"),
			"9":new Audio("./sound/bgm_9.mp3"),
			"10":new Audio("./sound/bgm_10.mp3"),
			"11":new Audio("./sound/bgm_11.mp3"),
			"12":new Audio("./sound/bgm_12.mp3"),
			"13":new Audio("./sound/bgm_13.mp3"),
			"14":new Audio("./sound/bgm_14.mp3"),
			"15":new Audio("./sound/bgm_15.mp3"),
			"16":new Audio("./sound/bgm_16.mp3"),
			"hell":new Audio("./sound/bgm_hell.mp3")
		};
			//BGM 반복여부 & 볼륨 조절
			for (var key in bgmList) {
				if (bgmList.hasOwnProperty(key)) {
					bgmList[key].loop = true;
					bgmList[key].volume = 0.3;
				}
			}
			//특정 브금 볼륨 조절 (너무 시끄러움)
			bgmList["hell"].volume = 0.2;

		//창 열기/닫기 효과음 준비
		sfxList = {
			"open":new Audio("./sound/win_open.mp3"),
			"close":new Audio("./sound/win_close.mp3"),
			"hell_gabriel_yes":new Audio("./sound/hell_gabriel_yes.mp3"),
			"hell_gabriel_no":new Audio("./sound/hell_gabriel_no.mp3")
		};
			//사운드 반복여부
			sfxList["open"].volume = 0.5;
			sfxList["close"].volume = 0.5;
			sfxList["hell_gabriel_yes"].volume = 0.5;
			sfxList["hell_gabriel_no"].volume = 0.5;
	} catch(e) {
		//audio 태그를 지원하지 않을 시
		$("#option_sound").disabled = "disabled";
		$("#label_sound").innerHTML = "사운드 미지원"
		$("#option_bgm").disabled = "disabled";
		$("#label_bgm").innerHTML = "BGM 미지원"
		$("#bgm_type").disabled = "disabled";
		$("#bgm_type").style.width = "40px";
	}

	//이미지 선로딩
	//1. 아이템 스프라이트
	imageList.push("./sprite/images/sprite_hell.png");
	imageList.push("./sprite/images/sprite_item.png");
	//2. 뒷배경 - 1
	for (var i=0;i<=16;i++) {
		imageList.push("./images/epic/background_" + i.toString() + ".jpg");
	}
	//3. 뒷배경 - 2
	imageList.push("./images/epic/menu_background.png");
	imageList.push("./images/epic/wrap_title.png");
	//4. 획득창 아이콘, 초대장
	imageList.push("./images/epic/soul.png");
	imageList.push("./images/epic/beed.png");
	imageList.push("./images/epic/cost.png");
	//5. 에픽 이펙트
	imageList.push("./images/epic/epic_appear.png");
	imageList.push("./images/epic/epic_land.png");
	imageList.push("./images/epic/epic_wait.png");
	//5. 기타
	imageList.push("./images/epic/popup_record.png");
	imageList.push("./images/epic/popup_inventory.png");
	imageList.push("./images/epic/popup_set.png");
	imageList.push("./images/epic/popup_craft.png");
	imageList.push("./images/epic/icon_option.png");
	imageList.push("./images/epic/gabriel.png");

	//5단게 : 이미지 선로딩 실시
	loadImages(imageList,function(){
		//=================================================================================================================
		//※ 선로딩 끝, 본격적 실행 시작
		//=================================================================================================================
		//로딩 커버 제거
		$("#cover").style.display = "none";

		//2. 일부 값 미리 입력
		dungeon_select();//2-1. 던전 선택

		//3-1. 인벤토리 구성 (만들어둔 첫 줄 아래로 생성)
		generateInventory();
		//3-2. 세트 아이템 구성 (만들어둔 첫 줄 아래로 생성)
		generateSet();
		//3-3. 에픽 도감 구성 (만들어둔 첫 줄 아래로 생성)
		generateCraft();

		//4. 조건부 실행 - 아이템 탐색 구성
		var tempArr = [];//[0] : 일반 1차 분류,
		for (i=0;i<itemList.length;i++) {
			if (tempArr.indexOf(itemList[i]["sort1"]) === -1 && itemList[i]["sort1"] !== "") {
				//일반 1차 분류
				tempArr.push(itemList[i]["sort1"]);
			}
		}
			//4-1. 일반 1차 분류 추가
			for (i=0;i<tempArr.length;i++) {
				var option = document.createElement("option");
				option.value = tempArr[i];
				option.text = tempArr[i];
				$("#objective_item_first").add(option);
			}
			//4-2.
		//5. 조건부 실행 - 세트 완성 구성
		var tempArr = [];//[0] : 일반 1차 분류,
		for (i=0;i<itemList.length;i++) {
			if (itemList[i]["set"] !== "") {
				if (tempArr.indexOf(itemList[i]["sort2"]) === -1 && itemList[i]["sort2"] !== "") {
					//일반 1차 분류
					tempArr.push(itemList[i]["sort2"]);
				}
			}
		}
			//5-1. 일반 1차 분류 추가
			for (i=0;i<tempArr.length;i++) {
				var option = document.createElement("option");
				option.value = tempArr[i];
				option.text = tempArr[i];
				$("#objective_set_first").add(option);
			}

		//6. 필터 구성
		var tempArr = [[],[],[],[]];//[0] : 일반 1차 분류, [1] : 일반 레벨, [2] : 세트 1차 분류, [3] : 세트 레벨
		for (i=0;i<itemList.length;i++) {
			//세트 아이템
			if (itemList[i]["set"] !== "") {
				if (tempArr[2].indexOf(itemList[i]["sort1"]) === -1 && itemList[i]["sort1"] !== "") {
					//세트 1차 분류
					tempArr[2].push(itemList[i]["sort1"]);
				}
				if (tempArr[3].indexOf(itemList[i]["level"]) === -1 && typeof itemList[i]["level"] !== "undefined") {
					//세트 레벨
					tempArr[3].push(itemList[i]["level"]);
				}
			}
			//(세트 아이템을 포함한) 일반 아이템
			if (tempArr[0].indexOf(itemList[i]["sort1"]) === -1 && itemList[i]["sort1"] !== "") {
				//일반 1차 분류
				tempArr[0].push(itemList[i]["sort1"]);
			}
			if (tempArr[1].indexOf(itemList[i]["level"]) === -1 && typeof itemList[i]["level"] !== "undefined") {
				//일반 레벨
				tempArr[1].push(itemList[i]["level"]);
			}
		}
			//6-1. 일반 1차 분류 추가
			for (i=0;i<tempArr[0].length;i++) {
				var option1 = document.createElement("option");
				option1.value = tempArr[0][i];
				option1.text = tempArr[0][i];
				$("#record_filter_first").add(option1);

				var option2 = document.createElement("option");
				option2.value = tempArr[0][i];
				option2.text = tempArr[0][i];
				$("#inventory_filter_first").add(option2);

				var option3 = document.createElement("option");
				option3.value = tempArr[0][i];
				option3.text = tempArr[0][i];
				$("#craft_filter_first").add(option3);
			}
			//6-2. 일반 레벨 추가
			for (i=0;i<tempArr[1].length;i++) {
				var option1 = document.createElement("option");
				option1.value = tempArr[1][i].toString();
				option1.text = "Lv." + tempArr[1][i].toString();
				$("#record_filter_level").add(option1);

				var option2 = document.createElement("option");
				option2.value = tempArr[1][i].toString();
				option2.text = "Lv." + tempArr[1][i].toString();
				$("#inventory_filter_level").add(option2);

				var option3 = document.createElement("option");
				option3.value = tempArr[1][i].toString();
				option3.text = "Lv." + tempArr[1][i].toString();
				$("#craft_filter_level").add(option3);
			}
			//6-3. 세트 1차 분류 추가
			for (i=0;i<tempArr[2].length;i++) {
				var option = document.createElement("option");
				option.value = tempArr[2][i];
				option.text = tempArr[2][i];
				$("#set_filter_first").add(option);
			}
			//6-4. 세트 레벨 추가
			for (i=0;i<tempArr[3].length;i++) {
				var option = document.createElement("option");
				option.value = tempArr[3][i].toString();
				option.text = "Lv." + tempArr[3][i].toString();
				$("#set_filter_level").add(option);
			}

		//final. 조건부 실행, 필터, 체크박스, 버튼 세팅
			//final-1. 조건부 실행, 필터링, 체크박스
			//final-1-1. 조건부 실행, 필터링
			//final-1-1-0. 조건부 실행

			//final-1-1-0-1. 조건부 실행 - 목표 리스트
			$("#objective_list").onchange = function() {
				//1. 설정창 변경
				for (i=0;i<$("#objective_list").options.length;i++) {
					if($("#objective_list").options[i].value !== "") {//구분선 제외
						if ($("#objective_list").options[i].value === $("#objective_list").value) {
							$("#objective_" + $("#objective_list").options[i].value).style.display = "block";
						} else {
							$("#objective_" + $("#objective_list").options[i].value).style.display = "none";
						}
					}
				}
				//2. 리스트 색상 변경
				if ($("#objective_list").value !== "none") {
					$("#objective_list").style.background = "#F4FA58";
				} else {
					$("#objective_list").style.background = "";
				}

				//3. 수집현황 업데이트
				checkObjective();
			};

			//final-1-1-0-1. 조건부 실행 - 에픽 아이템 탐색
			$("#objective_item_first").onchange = function() {
				var value = $("#objective_item_first").value;
				//1. 두번째, 세번째, 네번째 '무조건' 초기화
					//나머지 탐색 선택지 초기화
					$("#objective_item_second").selectedIndex = 0;
					$("#objective_item_third").selectedIndex = 0;
					$("#objective_item_name").selectedIndex = 0;
					//나머지 필더링 비활성화
					$("#objective_item_second").disabled = "disabled";
					$("#objective_item_third").disabled = "disabled";
					$("#objective_item_name").disabled = "disabled";
					//select 배경색 변경
					$("#objective_item_second").style.backgroundColor = "white";
					$("#objective_item_third").style.backgroundColor = "white";
					$("#objective_item_name").style.backgroundColor = "white";
					//두번째 탐색 비우고 새로 입력
					var dropdown = $("#objective_item_second");
					clearSelect(dropdown);

					var option = document.createElement("option");
					option.value = "";
					option.text = "모든 에픽 아이템";
					dropdown.add(option);
					//세번째 탐색 비우고 새로 입력
					var dropdown = $("#objective_item_third");
					clearSelect(dropdown);

					var option = document.createElement("option");
					option.value = "";
					option.text = "모든 에픽 아이템";
					dropdown.add(option);
					//네번째 탐색 비우고 새로 입력
					var dropdown = $("#objective_item_name");
					clearSelect(dropdown);

					var option = document.createElement("option");
					option.value = "";
					option.text = "모든 에픽 아이템";
					dropdown.add(option);
				//2. 첫번째 값이 있으면 두번째 생성
				if (value !== "") {
					//두번째 탐색 배경색 변경
					$("#objective_item_second").style.backgroundColor = "#F4FA58";
					//두번째 탐색 활성화
					$("#objective_item_second").disabled = "";
					//첫번째 탐색을 기준으로 두번째 탐색 구성
					var tempArr = [];
					for (i=0;i<itemList.length;i++) {
						//2차 기준 (1차 선택지가 있어야, 텅빈 건 제외)
						if (tempArr.indexOf(itemList[i]["sort2"]) === -1 && itemList[i]["sort1"] === value && itemList[i]["sort2"] !== "") {
							tempArr.push(itemList[i]["sort2"]);
						}
					}
						//두번째 탐색 비우고 새로 입력
						var dropdown = $("#objective_item_second");
						clearSelect(dropdown);

						var option = document.createElement("option");
						option.value = "";
						option.text = "모든 " + value + " 아이템";
						dropdown.add(option);

						var option = document.createElement("option");
						option.value = "";
						option.disabled = "disabled";
						option.text = "===============";
						dropdown.add(option);

						for (i=0;i<tempArr.length;i++) {
							var option = document.createElement("option");
							option.value = tempArr[i];
							option.text = tempArr[i];
							dropdown.add(option);
						}
				}

				//3. 수집현황 비우기
				checkObjective();
			}

			$("#objective_item_second").onchange = function() {
				var value = $("#objective_item_second").value;
				//1. 세번째, 네번째 '무조건' 초기화
					//나머지 탐색 선택지 초기화
					$("#objective_item_third").selectedIndex = 0;
					$("#objective_item_name").selectedIndex = 0;
					//나머지 필더링 비활성화
					$("#objective_item_third").disabled = "disabled";
					$("#objective_item_name").disabled = "disabled";
					//select 배경색 변경
					$("#objective_item_third").style.backgroundColor = "white";
					$("#objective_item_name").style.backgroundColor = "white";
					//세번째 탐색 비우고 새로 입력
					var dropdown = $("#objective_item_third");
					clearSelect(dropdown);

					var option = document.createElement("option");
					option.value = "";
					option.text = "모든 에픽 아이템";
					dropdown.add(option);
					//네번째 탐색 비우고 새로 입력
					var dropdown = $("#objective_item_name");
					clearSelect(dropdown);

					var option = document.createElement("option");
					option.value = "";
					option.text = "모든 에픽 아이템";
					dropdown.add(option);
				//2. 두번째 값이 있으면 세번째 생성
				if (value !== "") {
					//두번째 탐색 배경색 변경
					$("#objective_item_third").style.backgroundColor = "#F4FA58";
					//두번째 탐색 활성화
					$("#objective_item_third").disabled = "";
					//첫번째 탐색을 기준으로 두번째 탐색 구성
					var tempArr = [];
					for (i=0;i<itemList.length;i++) {
						//2차 기준 (1차 선택지가 있어야, 텅빈 건 제외)
						if (tempArr.indexOf(itemList[i]["sort3"]) === -1 && itemList[i]["sort2"] === value && itemList[i]["sort1"] === $("#objective_item_first").value && itemList[i]["sort3"] !== "") {
							tempArr.push(itemList[i]["sort3"]);
						}
					}
						//두번째 탐색 비우고 새로 입력
						var dropdown = $("#objective_item_third");
						clearSelect(dropdown);

						var option = document.createElement("option");
						option.value = "";
						option.text = "모든 " + value + " 아이템";
						dropdown.add(option);

						var option = document.createElement("option");
						option.value = "";
						option.disabled = "disabled";
						option.text = "===============";
						dropdown.add(option);

						for (i=0;i<tempArr.length;i++) {
							var option = document.createElement("option");
							option.value = tempArr[i];
							option.text = tempArr[i];
							dropdown.add(option);
						}
				}

				//3. 수집현황 비우기
				checkObjective();
			}

			$("#objective_item_third").onchange = function() {
				var value = $("#objective_item_third").value;
				//1. 네번째 '무조건' 초기화
					//나머지 탐색 선택지 초기화
					$("#objective_item_name").selectedIndex = 0;
					//나머지 필더링 비활성화
					$("#objective_item_name").disabled = "disabled";
					//select 배경색 변경
					$("#objective_item_name").style.backgroundColor = "white";
					//네번째 탐색 비우고 새로 입력
					var dropdown = $("#objective_item_name");
					clearSelect(dropdown);

					var option = document.createElement("option");
					option.value = "";
					option.text = "모든 에픽 아이템";
					dropdown.add(option);
				//2. 첫번째 값이 있으면 두번째 생성
				if (value !== "") {
					//두번째 탐색 배경색 변경
					$("#objective_item_name").style.backgroundColor = "#F4FA58";
					//두번째 탐색 활성화
					$("#objective_item_name").disabled = "";
					//첫번째 탐색을 기준으로 두번째 탐색 구성
					var tempArr = [[],[],[]];//[0] : 명칭, [1] : 레벨, [2] : 세트
					for (i=0;i<itemList.length;i++) {
						//이름 기준 (나머지 선택지가 있어야, 텅빈 건 제외)
						if (tempArr[0].indexOf(itemList[i]["name"]) === -1 && itemList[i]["sort3"] === value && itemList[i]["sort2"] === $("#objective_item_second").value && itemList[i]["sort1"] === $("#objective_item_first").value && itemList[i]["name"] !== "") {
							tempArr[0].push(itemList[i]["name"]);
							tempArr[1].push(itemList[i]["level"]);
							tempArr[2].push(itemList[i]["set"]);
						}
					}
						//두번째 탐색 비우고 새로 입력
						var dropdown = $("#objective_item_name");
						clearSelect(dropdown);

						var option = document.createElement("option");
						option.value = "";
						option.text = "모든 " + value + " 아이템";
						dropdown.add(option);

						var option = document.createElement("option");
						option.value = "";
						option.disabled = "disabled";
						option.text = "===============";
						dropdown.add(option);

						for (i=0;i<tempArr[0].length;i++) {
							var option = document.createElement("option");
							option.value = tempArr[0][i];
							if (tempArr[2][i] !== "") {
								option.text = "Lv." + tempArr[1][i] + " | " + tempArr[0][i] + " (" + tempArr[2][i] + ")";
							} else {
								option.text = "Lv." + tempArr[1][i] + " | " + tempArr[0][i];
							}
							dropdown.add(option);
						}
				}

				//3. 수집현황 비우기
				checkObjective();
			}

			$("#objective_item_name").onchange = function() {
				//선택한 아이템 수집현황 출력
				checkObjective();
			}


			//final-1-1-0-2. 조건부 실행 - 세트 완성
			$("#objective_set_first").onchange = function() {
				var value = $("#objective_set_first").value;
				//1. 두번째 '무조건' 초기화
					//두번째 탐색 선택지 초기화
					$("#objective_set_name").selectedIndex = 0;
					//두번째 비활성화
					$("#objective_set_name").disabled = "disabled";
					//select 배경색 변경
					$("#objective_set_name").style.backgroundColor = "white";
					//두번째 탐색 비우고 새로 입력
					var dropdown = $("#objective_set_name");
					clearSelect(dropdown);

					var option = document.createElement("option");
					option.value = "";
					option.text = "모든 세트";
					dropdown.add(option);
				//2. 첫번째 값이 있으면 두번째 생성
				if (value !== "") {
					//두번째 배경색 변경
					$("#objective_set_name").style.backgroundColor = "#F4FA58";
					//두번째 활성화
					$("#objective_set_name").disabled = "";
					//첫번째를 기준으로 두번째 구성
					var tempArr = [[],[]];//[0] : 세트 명칭, [1] : 레벨
					for (i=0;i<itemList.length;i++) {
						//이름 기준 (나머지 선택지가 있어야, 텅빈 건 제외)
						if (tempArr[0].indexOf(itemList[i]["set"]) === -1 && itemList[i]["sort2"] === value && itemList[i]["set"] !== "") {
							tempArr[0].push(itemList[i]["set"]);
							tempArr[1].push(itemList[i]["level"]);
						}
					}
						//두번째 탐색 비우고 새로 입력
						var dropdown = $("#objective_set_name");
						clearSelect(dropdown);

						var option = document.createElement("option");
						option.value = "";
						option.text = "모든 " + value + " 세트";
						dropdown.add(option);

						var option = document.createElement("option");
						option.value = "";
						option.disabled = "disabled";
						option.text = "===============";
						dropdown.add(option);

						for (i=0;i<tempArr[0].length;i++) {
							var option = document.createElement("option");
							option.value = tempArr[0][i];
							option.text = "Lv." + tempArr[1][i] + " | " + tempArr[0][i];
							dropdown.add(option);
						}
				}

				//3. 수집현황 비우기
				checkObjective();
			}

			$("#objective_set_name").onchange = function() {
				//선택한 세트 소집상황 출력
				checkObjective();
			}

		//record, inventory, set, craft 필터링
		var tempFilter = ["record", "inventory", "set", "craft"];
		for (var i=0;i<tempFilter.length;i++) {
			(function(i){
				//a. 1차 분류 필터링
				$("#" + i + "_filter_first").onchange = (function(i) {
					return function() {
						filter_1(i);
					}
				})(i);
				function filter_1(i) {
					var sheet = $("#style_" + i + "_filter_first");
					var value = $("#" + i + "_filter_first").value;
					try {
						//1. 모든 필터링 해제 후 두번째, 세번째 '무조건' 초기화
							//필터링 해체
							$("#style_" + i + "_filter_first").innerHTML = "";
							$("#style_" + i + "_filter_second").innerHTML = "";
							$("#style_" + i + "_filter_third").innerHTML = "";
							//나머지 필터링 선택지 초기화
							$("#" + i + "_filter_second").selectedIndex = 0;
							$("#" + i + "_filter_third").selectedIndex = 0;
							//나머지 필더링 비활성화
							$("#" + i + "_filter_second").disabled = "disabled";
							$("#" + i + "_filter_third").disabled = "disabled";
							//select 배경색 변경
							$("#" + i + "_filter_first").style.backgroundColor = "white";
							$("#" + i + "_filter_second").style.backgroundColor = "white";
							$("#" + i + "_filter_third").style.backgroundColor = "white";
							//두번째 필터링 비우고 새로 입력
							var dropdown = $("#" + i + "_filter_second");
							clearSelect(dropdown);

							var option = document.createElement("option");
							option.value = "";
							option.text = "2차 분류 (전체 보기)";
							dropdown.add(option);
							//세번째 필터링 비우고 새로 입력
							var dropdown = $("#" + i + "_filter_third");
							clearSelect(dropdown);

							var option = document.createElement("option");
							option.value = "";
							option.text = "3차 분류 (전체 보기)";
							dropdown.add(option);
						//2. 첫번째 값이 있으면 (필터링 후) 두번째 생성
						if ($("#" + i + "_filter_first").value !== "") {
							//필터링 적용
							sheet.innerHTML = "\
							#" + i + " span.equip:not(." + value + ") {\
								display:none;\
							}\
							#" + i + " span.run:not(." + value + ") {\
								display:none;\
							}\
							#" + i + " span.get:not(." + value + ") {\
								display:none;\
							}\
							\
							#" + i + " tr.equip:not(." + value + ") {\
								display:none;\
							}\
							#" + i + " tr.run:not(." + value + ") {\
								display:none;\
							}\
							#" + i + " tr.get:not(." + value + ") {\
								display:none;\
							}";
							//select 배경색 변경
							$("#" + i + "_filter_first").style.backgroundColor = "#F4FA58";
							//두번째 필터링 활성화
							$("#" + i + "_filter_second").disabled = "";
							//첫번째 필터를 기준으로 두번째 필터링 구성
							var tempArr = [];
							for (var j=0;j<itemList.length;j++) {
								//2차 기준 (1차 선택지가 있어야, 텅빈 건 제외)
								if (tempArr.indexOf(itemList[j]["sort2"]) === -1 && itemList[j]["sort1"] === value && itemList[j]["sort2"] !== "") {
									tempArr.push(itemList[j]["sort2"]);
								}
							}
							//두번째 필터링 비우고 새로 입력
							var dropdown = $("#" + i + "_filter_second");
							clearSelect(dropdown);

							var option = document.createElement("option");
							option.value = "";
							option.text = "2차 분류 (전체 보기)";
							dropdown.add(option);

							var option = document.createElement("option");
							option.value = "";
							option.disabled = "disabled";
							option.text = "===============";
							dropdown.add(option);

							for (i=0;i<tempArr.length;i++) {
								var option = document.createElement("option");
								option.value = tempArr[i];
								option.text = tempArr[i];
								dropdown.add(option);
							}
						}
					} catch(e) {
						alert("＊경고 : \"1차 분류\" 필터링을 사용할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						$("#" + i + "_filter_first").selectedIndex = 0;
					}
				}

				//b. 2차 분류 필터링
				$("#" + i + "_filter_second").onchange = (function(i) {
					return function() {
						filter_2(i);
					};
				})(i)
				function filter_2(i) {
					var sheet = $("#style_" + i + "_filter_second");
					var value = $("#" + i + "_filter_second").value;
					try {
						//1. 모든 필터링 해제 후 세번째 '무조건' 초기화
							//필터링 해체
							$("#style_" + i + "_filter_second").innerHTML = "";
							$("#style_" + i + "_filter_third").innerHTML = "";
							//나머지 필터링 선택지 초기화
							$("#" + i + "_filter_third").selectedIndex = 0;
							//두번째 필더링 비활성화
							$("#" + i + "_filter_third").disabled = "disabled";
							//select 배경색 복구
							$("#" + i + "_filter_second").style.backgroundColor = "white";
							$("#" + i + "_filter_third").style.backgroundColor = "white";
							//세번째 필터링 비우고 새로 입력
							var dropdown = $("#" + i + "_filter_third");
							clearSelect(dropdown);

							var option = document.createElement("option");
							option.value = "";
							option.text = "3차 분류 (전체 보기)";
							dropdown.add(option);

						//2. 두번째 값이 있으면 (필터링 후) 세번째 생성
						if ($("#" + i + "_filter_second").value !== "") {
							//필터링 적용
							sheet.innerHTML = "\
							#" + i + " span.equip:not(." + value + ") {\
								display:none;\
							}\
							#" + i + " span.run:not(." + value + ") {\
								display:none;\
							}\
							#" + i + " span.get:not(." + value + ") {\
								display:none;\
							}\
							\
							#" + i + " tr.equip:not(." + value + ") {\
								display:none;\
							}\
							#" + i + " tr.run:not(." + value + ") {\
								display:none;\
							}\
							#" + i + " tr.get:not(." + value + ") {\
								display:none;\
							}";
							//select 배경색 변경
							$("#" + i + "_filter_second").style.backgroundColor = "#F4FA58";
							//두번째 필터링 활성화
							$("#" + i + "_filter_third").disabled = "";
							//두번째 필터를 기준으로 세번째 필터링 구성
							var tempArr = [];
							for (var j=0;j<itemList.length;j++) {
								//3차 기준 (2차 선택지가 있어야, 텅빈 건 제외)
								if (tempArr.indexOf(itemList[j]["sort3"]) === -1 && itemList[j]["sort2"] === value && itemList[j]["sort3"] !== "") {
									tempArr.push(itemList[j]["sort3"]);
								}
							}
							//세번째 필터링 비우고 새로 입력
							var dropdown = $("#" + i + "_filter_third");
							clearSelect(dropdown);

							var option = document.createElement("option");
							option.value = "";
							option.text = "3차 분류 (전체 보기)";
							dropdown.add(option);

							var option = document.createElement("option");
							option.value = "";
							option.disabled = "disabled";
							option.text = "===============";
							dropdown.add(option);

							for (i=0;i<tempArr.length;i++) {
								var option = document.createElement("option");
								option.value = tempArr[i];
								option.text = tempArr[i];
								dropdown.add(option);
							}
						}

					} catch(e) {
						alert("＊경고 : \"2차 분류\" 필터링을 사용할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						$("#" + i + "_filter_second").selectedIndex = 0;
					}
				}

				//c. 3차 분류 필터링
				$("#" + i + "_filter_third").onchange = (function(i) {
					return function() {
						filter_3(i);
					}
				})(i)
				function filter_3(i) {
					var sheet = $("#style_" + i + "_filter_second");
					var value = $("#" + i + "_filter_third").value;
					try {
						if ($("#" + i + "_filter_third").value !== "") {
							//필터링 적용
							sheet.innerHTML = "\
							#" + i + " span.equip:not(." + value + ") {\
								display:none;\
							}\
							#" + i + " span.run:not(." + value + ") {\
								display:none;\
							}\
							#" + i + " span.get:not(." + value + ") {\
								display:none;\
							}\
							\
							#" + i + " tr.equip:not(." + value + ") {\
								display:none;\
							}\
							#" + i + " tr.run:not(." + value + ") {\
								display:none;\
							}\
							#" + i + " tr.get:not(." + value + ") {\
								display:none;\
							}";
							//select 배경색 변경
							$("#" + i + "_filter_third").style.backgroundColor = "#F4FA58";
						} else {
							//필터링 해제
							sheet.innerHTML = "";
							//select 배경색 복구
							$("#" + i + "_filter_third").style.backgroundColor = "white";
						}

					} catch(e) {
						alert("＊경고 : \"3차 분류\" 필터링을 사용할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						$("#" + i + "_filter_second").selectedIndex = 0;
					}
				}

				//d. 레벨 필터링
				$("#" + i + "_filter_level").onchange = (function(i) {
					return function() {
						filter_level(i);
					}
				})(i)
				function filter_level(i) {
					var sheet = $("#style_" + i + "_filter_level");
					var value = "lv" + $("#" + i + "_filter_level").value;
					try {
						//필터링 적용
						if ($("#" + i + "_filter_level").value !== "") {
							sheet.innerHTML = "\
							#" + i + " span.equip:not(." + value + ") {\
								display:none;\
							}\
							\
							#" + i + " tr.equip:not(." + value + ") {\
								display:none;\
							}";
							//select 배경색 변경
							$("#" + i + "_filter_level").style.backgroundColor = "#F4FA58";
						} else {
							sheet.innerHTML = "";
							//select 배경색 복구
							$("#" + i + "_filter_level").style.backgroundColor = "white";
						}
					} catch(e) {
						alert("＊경고 : \"레벨 분류\" 필터링을 사용할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						$("#" + i + "_filter_level").selectedIndex = 0;
					}
				}

				//e. 필터링 초기화
				$("#" + i + "_filter_clear").onclick = (function(i) {
					return function() {
						filter_clear(i);
					}
				})(i)
				function filter_clear(i) {
					//필터링 해제
					$("#style_" + i + "_filter_first").innerHTML = "";
					$("#style_" + i + "_filter_second").innerHTML = "";
					$("#style_" + i + "_filter_third").innerHTML = "";
					$("#style_" + i + "_filter_level").innerHTML = "";
					//필터링 선택지 복구
					$("#" + i + "_filter_first").selectedIndex = 0;
					$("#" + i + "_filter_second").selectedIndex = 0;
					$("#" + i + "_filter_third").selectedIndex = 0;
					$("#" + i + "_filter_level").selectedIndex = 0;
					//select 배경색 복구
					$("#" + i + "_filter_first").style.backgroundColor = "white";
					$("#" + i + "_filter_second").style.backgroundColor = "white";
					$("#" + i + "_filter_third").style.backgroundColor = "white";
					$("#" + i + "_filter_level").style.backgroundColor = "white";
					//첫번째, 레벨을 제외한 나머지 select 비활성화
					$("#" + i + "_filter_second").disabled = "disabled";
					$("#" + i + "_filter_third").disabled = "disabled";
				}
			})(tempFilter[i]);
		}


			//1-1-2. 체크박스
			//1-1-2-1. record 체크박스
			$("#record_check_cost").setAttribute('checked', 'checked');//수동 체크 설정 : IE8용
			$("#record_check_cost").onclick = function() {
				var sheet = $("#style_record_check_cost");
				try {
					if ($("#record_check_cost").checked) {
						sheet.innerHTML = "\
						#record span.cost {\
							display:inline;\
						}";
					} else {
						sheet.innerHTML = "";
					}
				} catch(e) {
					alert("＊경고 : \"소모 초대장\" 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
					$("#record_check_cost").checked = false;
				}
			}
			$("#record_check_difficulty").setAttribute('checked', 'checked');//수동 체크 설정 : IE8용
			$("#record_check_difficulty").onclick = function() {
				var sheet = $("#style_record_check_difficulty");
				try {
					if ($("#record_check_difficulty").checked) {
						sheet.innerHTML = "#record span.difficulty_0, #record span.difficulty_1 {\
							display:inline;\
						}";
					} else {
						sheet.innerHTML = "";
					}
				} catch(e) {
					alert("＊경고 : \"획득 난이도\" 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
					$("#record_check_difficulty").checked = false;
				}
			}
			$("#record_check_quantity").setAttribute('checked', 'checked');//수동 체크 설정 : IE8용
			$("#record_check_quantity").onclick = function() {

				var sheet = $("#style_record_check_quantity");
				try {
					if ($("#record_check_quantity").checked) {
						sheet.innerHTML = "#record span.quantity {\
							display:inline;\
						}";
					} else {
						sheet.innerHTML = "";
					}
				} catch(e) {
					alert("＊경고 : \"중복 횟수\" 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
					$("#record_check_quantity").checked = false;
				}
			}

			//1-1-2-2. inventory 체크박스
			$("#inventory_check_cost").onclick = function() {
				var sheet = $("#style_inventory_check_cost");
				try {
					if ($("#inventory_check_cost").checked) {
						sheet.innerHTML = "#inventory_display table .col_6 span.cost {\
							display:inline;\
						}";
					} else {
						sheet.innerHTML = "";
					}
				} catch(e) {
					alert("＊경고 : \"첫 획득시 소모 초대장\" 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
					$("#inventory_check_cost").checked = false;
				}
			}
			$("#inventory_check_all").onclick = function() {
				var sheet = $("#style_inventory_check_all");
				try {
					if ($("#inventory_check_all").checked) {
						sheet.innerHTML = "#inventory_display table tr.not_show {\
							display:inline;\
						}";
					} else {
						sheet.innerHTML = "";
					}
				} catch(e) {
					alert("＊경고 : \"모든 아이템 보기\" 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
					$("#inventory_check_all").checked = false;
				}
			}

			//1-1-2-3. set 체크박스
			$("#set_check_cost").onclick = function() {
				var sheet = $("#style_set_check_cost");
				try {
					if ($("#set_check_cost").checked) {
						sheet.innerHTML = "#set_display table .col_6 span.cost {\
							display:inline;\
						}";
					} else {
						sheet.innerHTML = "";
					}
				} catch(e) {
					alert("＊경고 : \"첫 획득시 소모 초대장\" 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
					$("#set_check_cost").checked = false;
				}
			}
			$("#set_check_all").onclick = function() {
				var sheet = $("#style_set_check_all");
				try {
					if ($("#set_check_all").checked) {
						sheet.innerHTML = "#set_display table tr.not_show {\
							display:inline;\
						}";
					} else {
						sheet.innerHTML = "";
					}
				} catch(e) {
					alert("＊경고 : \"모든 아이템&세트\" 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
					$("#set_check_all").checked = false;
				}
			}
			$("#set_check_only").onclick = function() {
				var sheet = $("#style_set_check_only");
				try {
					if ($("#set_check_only").checked) {
						sheet.innerHTML = "#set_display table tr:not(.hap) {\
							display:none;\
						}";
					} else {
						sheet.innerHTML = "";
					}
				} catch(e) {
					alert("＊경고 : \"세트만 보기\" 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
					$("#set_check_only").checked = false;
				}
			}

			//1-1-2-4. craft 체크박스
			$("#craft_check_available").onclick = function() {
				var sheet = $("#style_craft_check_available");
				try {
					if ($("#craft_check_available").checked) {
						sheet.innerHTML = "#craft_display table tr:not(.available) {\
							display:none;\
						}";
						if ($("#craft_check_all").checked) {
							sheet = $("#style_craft_check_all");
							sheet.innerHTML = "";
							$("#craft_check_all").checked = false;
						}
					} else {
						sheet.innerHTML = "";
					}
				} catch(e) {
					alert("＊경고 : \"제작 가능 아이템만 보기\" 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
					$("#craft_check_available").checked = false;
				}
			}
			$("#craft_check_all").onclick = function() {
				var sheet = $("#style_craft_check_all");
				try {
					if ($("#craft_check_all").checked) {
						sheet.innerHTML = "#craft_display table tr.not_show {\
							display:inline;\
						}";
						if ($("#craft_check_available").checked) {
							sheet = $("#style_craft_check_available");
							sheet.innerHTML = "";
							$("#craft_check_available").checked = false;
						}
					} else {
						sheet.innerHTML = "";
					}
				} catch(e) {
					alert("＊경고 : \"모든 아이템 보기\" 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
					$("#craft_check_all").checked = false;
				}
			}


			//번외-1. 획득 기록 초기화 버튼
			$("#record_check_reset").onclick = function() {
				if (confirm("\n획득 기록을 초기화하시겠습니까?\
					\n˙(각종 아이템 획득 및 소모 도전장 수치, 인벤토리, 세트 아이템 창은 초기화되지 않습니다)")) {
					$("#record").innerHTML = "";
						//번외-1-1. 획득 기록 내부정보 초기화
						content_text[0] = "";
				}
			}
			//번외-2. 해체 경고창 관련 체크박스
			$("#inventory_check_confirm").onclick = function() {
				if ($("#inventory_check_confirm").checked) {
					$("#set_check_confirm").checked = true;
				} else {
					$("#set_check_confirm").checked = false;
				}
			}
			$("#set_check_confirm").onclick = function() {
				if ($("#set_check_confirm").checked) {
					$("#inventory_check_confirm").checked = true;
				} else {
					$("#inventory_check_confirm").checked = false;
				}
			}
			//번외-3. 중복 에픽 일괄 해체
			$("#disassemble_1").onclick = function() {
				var temp = 0;
				for (i=0;i<itemList.length;i++) {
					if (itemList[i]["have"] > 1) {//2개 이상 보유 시
						temp += itemList[i]["have"] - 1;
					}
				}
				if (temp === 0) {
					alert("※ 경고 : 현재 중복 에픽 아이템이 없습니다.");
					return;
				} else {
					if (confirm("\n중복 에픽 아이템을 각각 하나씩만 남기고 모두 해체하시겠습니까?\
\n(총 " + temp.toString() + "개의 에픽 아이템이 해체됩니다.)")) {
						var not_checked = 0;
						if (! $("#inventory_check_confirm").checked || ! $("#set_check_confirm").checked) {
							not_checked = 1;//"해체 경고창 출력여부 체크박스" 상태 저장(1 : 켜져있었음)
							$("#set_check_confirm").checked = true;
							$("#inventory_check_confirm").checked = true;
						}
						//해체 실시 & 결과물 수량 체크
						var output = 0;
						for (i=0;i<itemList.length;i++) {
							if (itemList[i]["have"] > 1) {//2개 이상 보유 시
								var target_amount = itemList[i]["have"] - 1;//1개만 남기고 모조리 해체
								recycle(i,target_amount);
								//해체 결과물 : 초대장
								output += disCount("초대장",itemList[i]["level"]) * target_amount;
							}
						}
						//꺼둔 "해체 경고창 출력여부 체크박스" 다시 켜기
						if (not_checked === 1) {
							$("#set_check_confirm").checked = false;
							$("#inventory_check_confirm").checked = false;
						}
						//최종 결과 메세지 출력
						var text = "\"중복 에픽 아이템 일괄 해체\"가 완료되었습니다.\
\n(실질 소모 초대장 감소 : " + thousand(output) + "장)\
\n(실질 골드 환산 감소 : " + setWon(output*gold) + " Gold)";
						alert(text);
					}
				}
			}
			$("#disassemble_2").onclick = function() {
				var temp = 0;
				for (i=0;i<itemList.length;i++) {
					if (itemList[i]["set"] !== "" && itemList[i]["have"] > 1) {//2개 이상 보유 시
						temp += itemList[i]["have"] - 1;
					}
				}
				if (temp === 0) {
					alert("※ 경고 : 현재 중복 세트 아이템이 없습니다.");
					return;
				} else {
					if (confirm("\n중복 세트 아이템들을 각각 하나씩만 남기고 모두 해체하시겠습니까?\
\n(총 " + temp.toString() + "개의 세트 아이템이 해체됩니다.)")) {
						var not_checked = 0;
						if (! $("#inventory_check_confirm").checked || ! $("#set_check_confirm").checked) {
							not_checked = 1;//"해체 경고창 출력여부 체크박스" 상태 저장(1 : 켜져있었음)
							$("#set_check_confirm").checked = true;
							$("#inventory_check_confirm").checked = true;
						}
						//해체 실시 & 결과물 수량 체크
						var output = 0;
						for (i=0;i<itemList.length;i++) {
							if (itemList[i]["set"] !== "" && itemList[i]["have"] > 1) {//2개 이상 보유 시
								var target_amount = itemList[i]["have"] - 1;//1개만 남기고 모조리 해체
								recycle(i,target_amount);
								//해체 결과물 : 초대장
								output += disCount("초대장",itemList[i]["level"]) * target_amount;
							}
						}
						//꺼둔 "해체 경고창 출력여부 체크박스" 다시 켜기
						if (not_checked === 1) {
							$("#set_check_confirm").checked = false;
							$("#inventory_check_confirm").checked = false;
						}
						//최종 결과 메세지 출력
						var text = "\"중복 에픽 아이템 일괄 해체\"가 완료되었습니다.\
\n(실질 소모 초대장 감소 : " + thousand(output) + "장)\
\n(실질 골드 환산 감소 : " + setWon(output*gold) + " Gold)";
						alert(text);
					}
				}
			}


		//2. 버튼 세팅
		//1. frame_left
		//1-1. 던전 선택
		$("#dungeon").onchange = function() {
			dungeon_select();
		};
		//1-2. 실행
		$("#start1").onclick = function() {
			onoff(1);
			getEpicList();//에픽 리스트 구축
			simulate(1);
		}
		$("#start2").onclick = function() {
			if (running !== 1) {//0 : 정지상태
				//목표 입력
				if (setObjective("run") === true) {
					running = 1;//'자동 실행 변수' ON
					onoff(2);//버튼 잠그기
					getEpicList();//에픽 리스트 구축
					simulate(2);//실행
				}
			} else {
				//메세지 출력
			var tempText = "<span class='system'>====================&lt;탐색 종료&gt;====================";
				tempText += "<br/>※ 종료 조건 : 수동 정지"
				tempText += "<br/>================================================</span>";
			$("#record").innerHTML += tempText;
				//final. 스크롤바 이동 (종료 메세지가 보이도록)
				if ($("#record").style.display === "block") {
					$("#record").scrollTop = $("#record").scrollHeight;
				}
				//뒷처리
				clearTimeout(autoRun);//자동실행 해제
				running = 0;//'자동 실행 변수' OFF
				objective = []//목표 초기화
				onoff("drop");//잠긴 버튼 복구
			}
		}

		$("#result_button_epicDisassemble").onclick = function() {
			alert("※ 에픽 해체는 인벤토리 항목에서 이용하실 수 있습니다.\n\n(각 아이템별마다 개별적으로 실시)");
			shift("inventory");
		}

		$("#result_button_soulDisassemble").onclick = function() {
			var input = prompt("해체하실 코스모소울 개수를 입력하세요.\n(현재 보유량 : " + thousand(get[3]) + " 개)\n\n※ 보유량 이상의 수치를 입력하면, 모든 코스모소울을 해체합니다.");
			if (! isNumber(input)) {
				alert("※ 경고 : 숫자를 입력하지 않았거나, 취소를 누르셨습니다.\n다시 시도해주세요.");
			} else {
				var amount = Math.min(input,get[3]);
				get[3] -= amount;
				$("#result_soul_have").innerHTML = thousand(get[3]);
				//실질 초대장 감소
				cost[1] -= cutList[0]*amount;
				$("#cost_real").innerHTML = thousand(cost[1]);
				$("#cost_gold_real").innerHTML = setWon(cost[1]*gold);
				//보유량이 0이 되면 - 해체 버튼 비활성화
				if (get[3] === 0) {
					$("#result_button_soulDisassemble").disabled = "disabled";
					$("#result_button_soulDisassemble").value = "없음";
				}
			}
		}

		$("#cost_set_gold").onclick = function() {
			var challenge = prompt("도전장 골드 가격을 입력하세요.\n(현재 가격 : " + thousand(gold) + " Gold)");
			if (! isNumber(challenge)) {
				alert("※ 경고 : 숫자를 입력하지 않았거나, 취소를 누르셨습니다.\n다시 시도해주세요.");
			} else {
				gold = challenge;
				$("#cost_gold").innerHTML = setWon(cost[0]*gold);
				$("#cost_gold_real").innerHTML = setWon(cost[1]*gold);
			}
		}
		$("#cost_compare").onclick = function() {
			if (gold <= 0) {
				alert('※ 경고 : 도전장 골드 가격이 제대로 입력되지 않았습니다.\n(도전장 골드 가격이 입력되어야 현금 시세 계산이 가능함)');

				return;
			}
			var market = prompt("던파 골드당 현금 시세를 입력해주세요.\n(1,000만골드 기준, 현재 도전장 골드 가격 : " + thousand(gold) + " Gold)");
			if (! isNumber(market)) {
				alert("※ 경고 : 숫자를 입력하지 않았거나, 취소를 누르셨습니다.\n다시 시도해주세요.");
			} else {
				alert("현재 쓴 돈으로 총 " + Math.floor(cost[0] * gold / 10000000 * market / 15000).toString() + "마리의 치킨을 사먹을 수 있습니다.\n\
(현금 환산 : " + setWon(Math.floor(cost[0] * gold / 10000000 * market)) + "원)\n\
(치킨 1마리 당 15,000원 기준)");
			}
		}

		$("#reset").onclick = function() {
			//0. 기본장비 초기화 방지여부 확인
			var temp = "";
			if ($("#option_basicItem").checked === true) {
				temp += "\n\n(입력해둔 기본장비는 초기화되지 않습니다. - 옵션 참고)"
			}

			if (confirm("초기화를 하면 모든 기록이 사라집니다.\n'정말로' 초기화하시겠습니까?" + temp)) {
				//1. 필드 - 아이템 정리
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
					clearTimeout(autoEffect[i-1]);
					$("#item_img"+ i.toString()).className = "item_img";
				}
				//2. 회차 & 난이도 초기화
				count = 0;
				$("#round_count").innerHTML = 0;
				$("#round_difficulty").innerHTML = "";
					//회차에 따른 날짜 재계산
					dateState["changed"] = 1;
					setDate();

				//3. 메뉴 - 연속실행 관련 설정 초기화
				objective = [];

				//4-1. 상단 - 획득기록 초기화
				$("#record").innerHTML = "";
					//4-1-1. 획득기록 내부정보 초기화
					content_text[0] = "";
				//4-2. 상단 - 인벤토리 초기화
				$("#inventory_table").innerHTML = "";
				generateInventory();
				//4-3. 상단 - 세트 아이템 초기화
				$("#set_table").innerHTML = "";
				generateSet();
				//4-4. 상단 - 에픽 도감 초기화
				$("#craft_table").innerHTML = "";
				generateCraft();
				//4-5. 상단 - 수집률 초기화
				collect = 0;
				$("#inventory_check_collect").innerHTML = "0";

				//5. 좌측 하단 - 획득 정보 초기화
				get = [0,0,0,0,0,0];
				$("#result_epic_get").innerHTML = "0";
				$("#result_epic_have").innerHTML = "0";
				$("#result_soul_get").innerHTML = "0";
				$("#result_soul_have").innerHTML = "0";
				$("#result_cost_get").innerHTML = "0";
				$("#result_beed_get").innerHTML = "0";

				//6. 우측 하단 - 비용 초기화
				cost = [0,0];
				$("#cost_invitation").innerHTML = "0";
				$("#cost_real").innerHTML = "0";
				$("#cost_gold").innerHTML = "0";
				$("#cost_gold_real").innerHTML = "0";

				//7. 내부 - itemList 초기화
				for (i=0;i<itemList.length;i++) {
					itemList[i]["get"] = 0;//획득 수
					itemList[i]["have"] = 0;//보우 수
					itemList[i]["firstCount"] = 0;//첫 : 회차
					itemList[i]["firstInvite"] = 0;//첫 : 초대장
					itemList[i]["firstReal"] = 0;//첫 : 실질
					itemList[i]["jogak"] = 0;//조각 수
					//'기본' 여부
					if ($("#option_basicItem").checked === true && itemList[i]["init"] === 1) {
						//기본장비 초기화
						itemList[i]["init"] = 1;
					} else  {
						//일반 초기화
						itemList[i]["init"] = 0;
					}
				}
					//7-1. 습득현황 갱신
					checkObjective();

				//8. 필터링 초기화
					//8-1. 초기화 대상 : record, inventory, set, craft
					var tempClear = ["record", "inventory", "set", "craft"];
					for (var i = 0;i<tempClear.length;i++) {
						//필터링 해제
						$("#style_" + tempClear[i] + "_filter_first").innerHTML = "";
						$("#style_" + tempClear[i] + "_filter_second").innerHTML = "";
						$("#style_" + tempClear[i] + "_filter_third").innerHTML = "";
						$("#style_" + tempClear[i] + "_filter_level").innerHTML = "";
						//필터링 선택지 복구
						$("#" + tempClear[i] + "_filter_first").selectedIndex = 0;
						$("#" + tempClear[i] + "_filter_second").selectedIndex = 0;
						$("#" + tempClear[i] + "_filter_third").selectedIndex = 0;
						$("#" + tempClear[i] + "_filter_level").selectedIndex = 0;
						//select 배경색 복구
						$("#" + tempClear[i] + "_filter_first").style.backgroundColor = "white";
						$("#" + tempClear[i] + "_filter_second").style.backgroundColor = "white";
						$("#" + tempClear[i] + "_filter_third").style.backgroundColor = "white";
						$("#" + tempClear[i] + "_filter_level").style.backgroundColor = "white";
						//첫번째, 레벨을 제외한 나머지 select 비활성화
						$("#" + tempClear[i] + "_filter_second").disabled = "disabled";
						$("#" + tempClear[i] + "_filter_third").disabled = "disabled";
					}
				//8. 버튼 정상화
				onoff(0);

				//9. 알람
					//9-1. 기본장비 초기화 방지
					var text2 = "";
					if ($("#option_basicItem").checked === true) {
						text2 += "\n\n(일부 장비들은 기본장비로서 수량이 1로 조정되었습니다)\n";
						for (var i=0;i<itemList.length;i++) {
							if (itemList[i]["init"] === 1) {
								text2 += "　" + itemList[i]["name"] + "\n";
								update("에픽",itemList[i])
							}
						}
					}
				alert("모든 기록이 초기화되었습니다." + text2);
			}
		}

		//2-2. 아이템 명칭 출력 여부
		$("#option_name_normal").onclick = function() {
			var sheet = $("#style_name_normal");
			try {
				//필터링 적용
				if ($("#option_name_normal").checked) {
					sheet.innerHTML = "\
					.description.normal {\
						display:inline-block;\
					}";
					//필드 아이템 이름 재배치
					for (var i=0;i<maxQuantity;i++) {
						$("#description" + i.toString()).style.left = (-$("#item_name" + i.toString()).offsetWidth/2).toString() + "px";
					}
				} else {
					//필터링 해제
					sheet.innerHTML = "";
				}
			} catch(e) {
				alert("＊경고 : \"아이템 명칭\" 필터링을 사용할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
				$("#option_name_normal").checked = true;
			}
		}

		//2-3. 에픽 조각 명칭 출력 여부
		$("#option_name_jogak").onclick = function() {
			var sheet = $("#style_name_jogak");
			try {
				//필터링 적용
				if ($("#option_name_jogak").checked) {
					sheet.innerHTML = "\
					.description.jogak {\
						display:inline-block;\
					}";
					//필드 아이템 이름 재배치
					for (var i=0;i<maxQuantity;i++) {
						$("#description" + i.toString()).style.left = (-$("#item_name" + i.toString()).offsetWidth/2).toString() + "px";
					}
				} else {
					//필터링 해제
					sheet.innerHTML = "";
				}

			} catch(e) {
				alert("＊경고 : \"에픽 조각 명칭\" 필터링을 사용할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
				$("#option_name_jogak").checked = false;
			}
		}

		//2-4. BGM 출력
			//2-4-1. BGM 체크박스
			$("#option_bgm").onclick = function() {
				play($("#bgm_type").value);
			}
			//2-4-2. BGM 타입 드롭다운 메뉴
			$("#bgm_type").onchange = function() {
				play($("#bgm_type").value);
			}
		//2-5. 옵션 버튼
		$("#option_button").onclick = function() {
			if ($("#option").style.display !== "none") {
				$("#option").style.display = "none";
				$("#option_button").className = "";
				//닫기 효과음
				if ($("#option_sound").checked === true) {
					sfxList["close"].play();
				}
			} else {
				$("#option").style.display = "block";
				$("#option_button").className = "selected";
				//열기 효과음
				if ($("#option_sound").checked === true) {
					sfxList["open"].play();
				}
			}
		}
			//옵션 바깥 클릭 시 알아서 숨기기
			$("html").addEventListener("click",function() {
				if ($("#option").style.display !== "none") {
					if (event.target !== $("#option") &&
						event.target.parentNode !== $("#option") &&
						event.target.parentNode.parentNode !== $("#option") &&
						event.target.parentNode.parentNode.parentNode !== $("#option") && 
						event.target !== $("#option_button")) {
						$("#option").style.display = "none";
						$("#option_button").className = "";
						//닫기 효과음
						if ($("#option_sound").checked === true) {
							sfxList["close"].play();
						}
					}
				}
			});

		//2-5. shift1 ~ 4
		$("#shift1").onclick = function() {
			if (right_display !== "record") {
				shift("record");
			} else {
				shift("");
			}
		}
		$("#shift2").onclick = function() {
			if (right_display !== "inventory") {
				shift("inventory");
			} else {
				shift("");
			}
		}
		$("#shift3").onclick = function() {
			if (right_display !== "set") {
				shift("set");
			} else {
				shift("");
			}
		}
		$("#shift4").onclick = function() {
			if (right_display !== "craft") {
				shift("craft");
			} else {
				shift("");
			}
		}

		//2-6. func_basicItem, shift_chance
		$("#func_basicItem").onclick = function() {
			var tempItem = "";
			var input = prompt("※ 기본장비로 설정하려는 장비 이름을 \"정확히\" 입력하세요.\n(인벤토리에서 '모든 아이템 보기' 설정 후 이름 확인가능)\n");
			//아무것도 입력하지 않음
			if (!input) {
				//입력창 닫기
				return;
			}
			//장비 이름 찾아보기
			var found = null;
			for (var i=0;i<itemList.length;i++) {
				if (input === itemList[i]["name"]) {
					//(장비를 찾았으면) 해당 장비 '기본'으로 등록
					itemList[i]["init"] = 1;
					//해당 장비 기억
					found = itemList[i];
				}
			}
			//장비를 찾지 못했으면
			if (!found) {
				alert("※ 해당 장비를 찾지 못했습니다.\n\n\"" + input + "\"");

				return;
			//장비를 찾았으면
			} else {
				//장비 업데이트
				update("에픽",found);
				//출현 사운드 출력
				try {
					if ($("#option_sound").checked) {
						sound_appear.pause();
						sound_appear.currentTime = 0;
						sound_appear.play();
					}
				} catch(e) {
				}
				//기본장비 수집
				var tempText = "";
				for (var i=0;i<itemList.length;i++) {
					if (itemList[i]["init"] === 1) {
						tempText += "　" + itemList[i]["name"] + "\n"
					}
				}

				//메세지 출력
				alert("※ 해당 장비를 인벤토리에 등록하였습니다.\n\n\"" + input + "\"\n\n현재 등록된 기본장비 리스트 : \n" + tempText);

				return;
			}
		};
		$("#shift_chance").onclick = function() {
			if (right_display !== "chance") {
				//옵션창 닫기
				$("#option").style.display = "none";
				$("#option_button").className = "";
				$("#option_button").innerHTML = $("#option_button").innerHTML.replace("닫기","설정");
				//확률 변경창 열기
				shift("chance");
				//확률 공개
				setChance("show");
			} else {
				shift("");
			}
		}

		//2-7. 드랍 확률 설정창
			//1. text창 포커스 & 클릭 시 자동 드래그
			var tempArr = $$("#popup_chance_main input[type='text']");
			for (var i=0;i<tempArr.length;i++) {
				//포커스 시
				tempArr[i].onfocus = function() {
					this.select();
				}
				//클릭 시 (모바일 감안)
				tempArr[i].onclick = function() {
					this.select();
				}
			}
			//2. 적용
			$("#popup_chance_apply").onclick = function() {
				setChance("apply");
			}
			//3. 취소
			$("#popup_chance_cancel").onclick = function() {
				setChance("show");
				shift("");
			}
			//4. 초기화
			$("#popup_chance_reset").onclick = function() {
				setChance("reset");
			}
			//5. 퍼펙트
			$("#popup_chance_perfect").onclick = function() {
				setChance("perfect");
			}

		//3. 날짜 환산
			//3-0. 날짜 계산 함수
				//hell2_function -> 372번째 줄 참고

			//3-1. 날짜환산 - 초기치 설정
			for (var i = 0;i < dateSettingList.length;i++) {
				dateSettingList[i] = dateSettingDefault[i];
			}
			//3-2. 날짜환산 - 설정창 클릭
			$("#date_config").onclick = function() {
				switch ($("#date_config").className) {
					case "":
						//a. 설정창 열기
						$("#date_config").className = "cancel";
						$("#date_config").value = "설정 취소";
						$("#date_setting").style.display = "block";

						break;
					case "cancel":
						//a. 설정값 복구
						for (var i = 1;i <= 7;i++) {
							$("#date_setting_" + i.toString()).value = dateSettingDefault[i-1].toString();
						}

						//b. 설정창 닫기
						$("#date_config").className = "";
						$("#date_config").value = "피로도 설정";
						$("#date_setting").style.display = "none";

						break;
				}
			}
			//날짜환산 - focus 시 값 전체 선택
			for (var i = 1;i <= dateSettingList.length;i++) {
				$("#date_setting_" + i.toString()).onfocus = function() {
					this.select();
				}
			}
			//날짜환산 - 설정 적용
			$("#date_apply").onclick = function() {
				//a. 설정값 적용
					//a-1. 값이 제대로 입력되었는지 체크
					for (var i = 1;i <= dateSettingList.length;i++) {
						//a-1-1. 제대로 입력되지 않음 -> 중단
						if (! isNumber($("#date_setting_" + i.toString()).value)) {
							alert("※ 경고 : 날짜 환산 설정창 - \"" + dateSettingName[i-1] + "\" 값이 입력되었습니다.");
							return;
						}
					}
					//피로도 1회 소모량이 0인지 체크(0 나누기 오류 방지)
					if (parseInt($("#date_setting_3").value) === 0) {
						alert("※ 경고 : 1회 피로도 소모치는 \"0\"이 될 수 없습니다.");
						return;
					}
					//a-2. 제대로 입력됨 -> 적용
					for (var i = 1;i <= dateSettingList.length;i++) {
						dateSettingList[i-1] = parseInt($("#date_setting_" + i.toString()).value);
					}
					dateSettingWeek = $("#date_setting_week").value.split(",");

					//a-3. 설정에 따라 날짜 재계산
					dateState["changed"] = 1;//재계산 필요함을 알림
					setDate();
				//b. 안내 메세지
				alert("※ 날짜 전환 설정이 정상적으로 변경되었습니다.");
				//c. 설정창 닫기
				$("#date_config").className = "";
				$("#date_config").value = "피로도 설정";
				$("#date_setting").style.display = "none";
			}
			//날짜환산 - 취소
			$("#date_cancel").onclick = function() {
				//b. 설정창 닫기
				$("#date_config").className = "";
				$("#date_config").value = "피로도 설정";
				$("#date_setting").style.display = "none";
			}
				//옵션 외각 클릭 시 - (열려있다면)취소
				$("html").addEventListener("click",function() {
					if (event.target !== $("#date_setting") &&
					event.target.parentNode !== $("#date_setting") &&
					event.target.parentNode.parentNode !== $("#date_setting") &&
					event.target !== $("#date_config")) {
						if ($("#date_config").className === "cancel") {
							//b. 설정창 닫기
							$("#date_config").className = "";
							$("#date_config").value = "피로도 설정";
							$("#date_setting").style.display = "none";
						}
					}
				});



		//단축키
		shortcut.add("Page_up",function() {
			if ($("#channel").selectedIndex !== 0) {
				$("#channel").selectedIndex -= 1;
			}
		});
		shortcut.add("Page_down",function() {
			if ($("#channel").selectedIndex !== $("#channel").length - 1) {
				$("#channel").selectedIndex += 1;
			}
		});

		//안내창 출력
		$("#dungeon").onmouseover = function() {
			$("#notice_dungeon").style.display = "block";
		}
		$("#dungeon").onmouseout = function() {
			$("#notice_dungeon").style.display = "none";
		}

		$("#difficulty").onmouseover = function() {
			$("#notice_difficulty").style.display = "block";
		}
		$("#difficulty").onmouseout = function() {
			$("#notice_difficulty").style.display = "none";
		}

		$("#channel").onmouseover = function() {
			$("#notice_channel").style.display = "block";
		}
		$("#channel").onmouseout = function() {
			$("#notice_channel").style.display = "none";
		}


	});
}
