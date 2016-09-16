
//=================================================================================================================
//※ 첫 화면
//=================================================================================================================
window.onload = function() {
	//IE 로컬에서는 로컬스토리지 실행 금지
	if (localStorage !== undefined) {
		//데이터 초기화
		initData();
			//(저장된 데이터 있으면) 데이터 불러오기
			if (localStorage["hell2_init"] === "true") {
				//1. 불러온 데이터 작성
				var tempObj = localGet("hell2");
				switch (tempObj["playMode"]) {
					case "normal":
						$("#continue_mode").innerHTML = "일반";
						break;
					case "rpg":
						$("#continue_mode").innerHTML = "RPG";
						break;
					case "beckey":
						$("#continue_mode").innerHTML = "베키";
						break;
				}
				$("#continue_count").innerHTML = thousand(tempObj["count"]);
				$("#continue_dayCount").innerHTML = thousand(tempObj["dateState"]["date"]);
				if (tempObj["myCharacter"] === "") $("#continue_character").innerHTML = "없음";
					else $("#continue_character").innerHTML = characterList[tempObj["myCharacter"]]["name"];
				$("#continue_power").innerHTML = thousand(parseInt(tempObj["power"]));
				//2. 데이터 현황 출력
				$("#continue_no").style.display = "none";
				$("#continue_yes").style.display = "block";
			//(불러올 데이터가 없으면)
			} else {
				//1. 데이터 현황 출력
				$("#continue_no").style.display = "block";
				$("#continue_yes").style.display = "none";
			}
	}
	//버튼에 마우스 올리면 모드 설명
	seriesOnOff(
		//base
		$("#titleScreen_description_notice"),//base
		//option
		{
			"trigger":"mouseover",//event trigger
			"event":"display",//visibility or display or checked
			"after":0,
		},
		//series
		[
			[$("#titleScreen_continue"), $("#titleScreen_description_continue")],
			[$("#titleScreen_normal"), $("#titleScreen_description_normal")],
			[$("#titleScreen_rpg"), $("#titleScreen_description_rpg")],
			[$("#titleScreen_blog"), $("#titleScreen_description_blog")],
			[$("#titleScreen_beckey"), $("#titleScreen_description_beckey")],
			[$("#titleScreen_file"), $("#titleScreen_description_file")]
		]
	);

	//버튼 활성화
	$("#titleScreen_continue").innerHTML = "이어서 하기";
		$("#titleScreen_continue").disabled = false;
		//불러올 수 없으면 -> 색상 표시
		if (localStorage === undefined || localStorage["hell2_init"] !== "true") {
			$("#titleScreen_continue").style.color = "gray";
		}
	$("#titleScreen_normal").innerHTML = "일반 모드 시작";
		$("#titleScreen_normal").disabled = false;
	$("#titleScreen_rpg").innerHTML = "RPG 모드 시작";
		$("#titleScreen_rpg").disabled = false;
	$("#titleScreen_blog").innerHTML = "Blog";
		$("#titleScreen_blog").disabled = false;
	$("#titleScreen_beckey").innerHTML = "베키";
		$("#titleScreen_beckey").disabled = false;
	$("#titleScreen_file").innerHTML = "파일<br/>불러오기";
		$("#titleScreen_file").disabled = false;

	//버튼 클릭
	$("#titleScreen_continue").onclick = function() {
		if (localStorage["hell2_init"] === "true") {
			//데이터 적용
			loadData();
			//화면 전환
			$("#titleScreen_main").style.display = "none";
			$("#titleScreen_loading").style.display = "block";
			main("continue");
		}
	};
		//RPG모드
		$("#titleScreen_rpg").onclick = function() {
			$("#titleScreen_main").style.display = "none";
			$("#titleScreen_startOption").style.display = "block";
		};

		var tempArr = deepCopy(Object.keys(characterList));
		for (var i=tempArr.length-1;i>=0;i--) {
			if (tempArr[i] === "beckey") {
				tempArr.splice(i,1);
				break;
			}
		}
		for (var i=0;i<tempArr.length;i++) {
			(function(i) {
				//마우스 올리기
				$("#startPption_select_" + tempArr[i]).onmouseover = function() {
					if (tempArr[i] !== myCharacter) {
						//캐릭터 선택버튼 변경
						$("#startPption_select_" + tempArr[i]).classList.remove("off");
						$("#startPption_select_" + tempArr[i]).classList.add("on");
					}
				};
			})(i);
		}
		for (var i=0;i<tempArr.length;i++) {
			(function(i) {
				//마우스 치우기
				$("#startPption_select_" + tempArr[i]).onmouseout = function() {
					if (tempArr[i] !== myCharacter) {
						//캐릭터 선택버튼 변경
						$("#startPption_select_" + tempArr[i]).classList.remove("on");
						$("#startPption_select_" + tempArr[i]).classList.add("off");
					}
				};
			})(i);
		}
		for (var i=0;i<tempArr.length;i++) {
			(function(i) {
				//마우스 클릭
				$("#startPption_select_" + tempArr[i]).onclick = function() {
					if (tempArr[i] !== myCharacter) {
						//캐릭터 선택버튼 변경
						for (var j=0;j<tempArr.length;j++) {
							$("#startPption_select_" + tempArr[j]).classList.remove("on");
							$("#startPption_select_" + tempArr[j]).classList.add("off");
						}
						$("#startPption_select_" + tempArr[i]).classList.remove("off");
						$("#startPption_select_" + tempArr[i]).classList.add("on");
						//캐릭터 선택했다고 표시
						myCharacter = tempArr[i];
						$("#startOption_description_sprite").className = tempArr[i];
						$("#startPption_selected_text").innerHTML = characterList[tempArr[i]]["name"];
						//시작버튼 활성화
						$("#startOption_start").classList.add("able");
						$("#startOption_start").disabled = false;
					}
				};
			})(i);
		}

		$("#startOption_cancel").onclick = function() {
			$("#titleScreen_startOption").style.display = "none";
			$("#titleScreen_main").style.display = "block";
		};
		$("#startOption_start").onclick = function() {
			playMode = "rpg";
			//RPG모드 : 직업 표시
				setCharacter(myCharacter);
			//RPG모드 : 일부 기능 표시
				//모드 표시
				$("#mode").innerHTML = "RPG";
				//전투력 표시
				$("#power_area").style.display = "block";
			//RPG모드 : 일부 기능 막음
				//던전 난이도
				$("#difficulty").selectedIndex = 4;
				$("#difficulty").disabled = "disabled";
				//교환가능 항아리
				$("#pot_tradable").disabled = "disabled";
				//기본 장비 획득
				$("#func_basicItem").disabled = "disabled";
				$("#option_basicItem").disabled = "disabled";
				//드랍 확률 조절
				$("#shift_chance").disabled = "disabled";
				//도전장 가격 = 20,000 Gold
				$("#cost_set_gold").disabled = "disabled";
				$("#cost_set_gold").value = "도전장 = 20,000 Gold";
					gold = 20000;
			//화면 전환
			$("#titleScreen_startOption").style.display = "none";
			$("#titleScreen_loading").style.display = "block";
			main();
		};
		//일반 모드
		$("#titleScreen_normal").onclick = function() {
			playMode = "normal";
			//일반 모드 : 무작위 직업 설정
				setRandomCharacter();
			//일반모드 : 표시만 해줌
				$("#mode").innerHTML = "일반";
			//일반모드 : 안톤 던전 봉인
				$("#final_area").parentNode.removeChild($("#final_area"));
			$("#titleScreen_main").style.display = "none";
			$("#titleScreen_loading").style.display = "block";
			//화면 전환
			main();
		};
		//베키모드
		$("#titleScreen_beckey").onclick = function() {
			playMode = "beckey";
			//베키모드 : 직업 표시
				myCharacter = "beckey";
				setCharacter(myCharacter);
				//베키 전용 브금
				$("#bgm_type").selectedIndex = indexSelectByValue($("#bgm_type"), "beckey");
				//베키 전용 장비 준비
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
			//베키모드 : 일부 기능 표시
				//모드 표시
				$("#mode").innerHTML = "베키";
				//전투력 표시
				$("#power_area").style.display = "block";
			//베키모드 : 일부 기능 막음
				//던전 난이도
				$("#difficulty").selectedIndex = 4;
				$("#difficulty").disabled = "disabled";
				//교환가능 항아리
				$("#pot_tradable").disabled = "disabled";
				//기본 장비 획득
				$("#func_basicItem").disabled = "disabled";
				$("#option_basicItem").disabled = "disabled";
				//드랍 확률 조절
				$("#shift_chance").disabled = "disabled";
				//도전장 가격 = 20,000 Gold
				$("#cost_set_gold").disabled = "disabled";
				$("#cost_set_gold").value = "도전장 = 20,000 Gold";
					gold = 20000;
			//화면 전환
			$("#titleScreen_main").style.display = "none";
			$("#titleScreen_loading").style.display = "block";
			main();
		};
		//블로그 방문
		$("#titleScreen_blog").onclick = function() {
			var move = window.open("http://blog.naver.com/ansewo/220622642452");
			if (!move || move.closed || typeof move.closed === 'undefined') {
				swal({
					text:"현재 브라우저에서 새 창 열기를 차단하였습니다.\n현재 페이지에서 링크를 여시겠습니까?",
					type:"warning",
					showCancelButton:true
				}).then(function(isConfirm) {
					if (isConfirm) {
						window.location.href = "http://blog.naver.com/ansewo/220622642452";
					}
				});
			}
		};
		//세이브 파일 불러오기
		$("#titleScreen_file").onclick = function() {$("#titleScreen_input_file").click();};
		//불러온 파일 확인
		$("#titleScreen_input_file").onchange = function() {
			if (!window.FileReader || !window.ArrayBuffer) {
				swal({
					text:"현재 브라우저는 파일 불러오기를 지원하지 않습니다.",
					type:"warning"
				});
				return;
			}
			var file = $("#titleScreen_input_file").files[0];
			var reader = new FileReader();
			reader.onload = function() {
				//압축파일 분석
				JSZip.loadAsync(file)
				.then(function(zip) {
					try {
						var tempTime = "";
						zip.file("hell2_date").async("string").then(function(dataTime) {
							tempTime = dataTime;
						});
						zip.file("hell2_init").async("string").then(function(data) {
							if (data === "true") {
								swal({
									html:"<b>세이브 파일 확인!</b><br/>(저장 날짜 : " + tempTime + ")<br/><br/>불러오기를 실시합니다.",
									type:"info"
								}).then(function() {
									try {
										zip.file("hell2").async("string").then(function(data2) {
											//암호화 파일 분석
											var loader  = CryptoJS.AES.decrypt(data2, passwordKey).toString(CryptoJS.enc.Utf8);

											//데이터 적용
											dataObj= JSON.parse(loader);
											loadData("file");
											//화면 전환
											$("#titleScreen_main").style.display = "none";
											$("#titleScreen_loading").style.display = "block";
											main("continue");
										});
									} catch(err) {
										//압축파일 분석 중 문제 발생
										swal({
											html:"<b>오류 발생!</b><br/>세이브파일을 잘못 불러왔거나, 손상된 파일입니다.",
											type:"warning"
										});
									}
								});
							} else {
								//압축파일 분석 중 문제 발생
								swal({
									html:"<b>오류 발생!</b><br/>세이브파일을 잘못 불러왔거나, 손상된 파일입니다.",
									type:"warning"
								});
							}
						});
					} catch(err) {
						//압축파일 분석 중 문제 발생
						swal({
							html:"<b>오류 발생!</b><br/>세이브파일을 잘못 불러왔거나, 손상된 파일입니다.",
							type:"warning"
						});
					}
				});
			};
			reader.readAsDataURL(file);
		};

};


//=================================================================================================================
//※ 본격적인 실행
//=================================================================================================================
function main(cmd) {
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
			for (j=0;j<levelList[playMode][tempList[i]].length;j++) {
				if (tempList2.indexOf(levelList[playMode][tempList[i]][j]) === -1) {
					tempList2.push(levelList[playMode][tempList[i]][j]);
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
		slot.innerHTML = "" +
				"<div id='effect_appear" + i.toString() + "' class='effect_appear'></div>" +
				"<div id='effect_land" + i.toString() + "' class='effect_land'></div>" +
				"<div id='effect_wait" + i.toString() + "' class='effect_wait'></div>" +
				"" +
				"<div id='item_name" + i.toString() + "' class='item_name'></div>" +
				"<div id='item_img" + i.toString() + "' class='item_img'></div>";
		$("#frame_top").appendChild(slot);
	}
	//최대 드랍 가능 아이템 수량만큼 좌표 정보 생성
	for (var i=0;i<maxQuantity;i++) {
		coordinate.push([0,0]);
	}

	//(불러오는 게 아니면)
	if (cmd != "continue") {
		//확률 수치 default에 맞추기
		chanceList_num = deepCopy(chanceList_num_default);
	}

	//날짜 최초 계산
	setDate();

	//전투력 최초 계산
	setPower();

	//======================
	//※ 선로딩 실시
	//======================
	//audio 파일 선로딩
	try {

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
			"17":new Audio("./sound/bgm_17.mp3"),
			"18":new Audio("./sound/bgm_18.mp3"),
			"19":new Audio("./sound/bgm_19.mp3"),
			"20":new Audio("./sound/bgm_20.mp3"),
			"21":new Audio("./sound/bgm_21.mp3"),
			"22":new Audio("./sound/bgm_22.mp3"),
			"23":new Audio("./sound/bgm_23.mp3"),
			"hell":new Audio("./sound/bgm_hell.mp3"),
			"beckey":new Audio("./sound/beckey_bgm.mp3"),
			"rpg_clear":new Audio("./sound/hell_rpg_clear.mp3")
		};
			//BGM 공통 설정
			for (var key in bgmList) {
				if (bgmList.hasOwnProperty(key)) {
					bgmList[key].volume = 0.2;
					bgmList[key].loop = true;
				}
			}
			//특정 BGM 설정
			bgmList["hell"].volume = 0.1;//너무 시끄러움
			bgmList["rpg_clear"].loop = false;//일회성 브금

		//각종 효과음 준비
		sfxList = {
			"hell_selectdungeon":new Audio("./sound/hell_selectdungeon.mp3"),
			"open":new Audio("./sound/win_open.mp3"),
			"close":new Audio("./sound/win_close.mp3"),

			"hit_hit":new Audio("./sound/hell_hit_hit.mp3"),
			"hit_slash":new Audio("./sound/hell_hit_slash.mp3"),
			"hit_gun":new Audio("./sound/hell_hit_gun.mp3"),
			"hit_magic":new Audio("./sound/hell_hit_magic.mp3"),
			"hit_beckey":new Audio("./sound/hell_hit_beckey.mp3"),

			"item_drop":new Audio("./sound/hell_item_drop.mp3"),
			"epic_appear":new Audio("./sound/epic_appear.mp3"),
			"epic_land":new Audio("./sound/epic_land.mp3"),

			"hell_gabriel_yes":new Audio("./sound/hell_gabriel_yes.mp3"),
			"hell_gabriel_no":new Audio("./sound/hell_gabriel_no.mp3"),

			"wearing":new Audio("./sound/hell_wearing.mp3"),
			"enchant_progress":new Audio("./sound/enchant_progress.mp3"),
			"enchant_success":new Audio("./sound/enchant_success.mp3"),
			"enchant_fail":new Audio("./sound/enchant_fail.mp3"),
			"enchant_zero":new Audio("./sound/enchant_zero.mp3"),
			"pot_opening":new Audio("./sound/pot_opening.mp3"),

			"anton_scream":new Audio("./sound/hell_anton_scream.mp3"),
			"beckey_start":new Audio("./sound/beckey_start.mp3"),
			"beckey_epic":new Audio("./sound/beckey_get.mp3")
		};
			//효과음 공통 설정
			for (var key in sfxList) {
				if (sfxList.hasOwnProperty(key)) {
					sfxList[key].volume = 0.4;
				}
			}
			//특정 효과음 설정
			sfxList["hit_hit"].volume = 0.1;
			sfxList["hit_slash"].volume = 0.1;
			sfxList["hit_gun"].volume = 0.3;
			sfxList["hit_magic"].volume = 0.4;
			sfxList["hit_beckey"].volume = 0.2;

			sfxList["epic_appear"].volume = 0.2;
			sfxList["epic_land"].volume = 0.2;

	} catch(e) {
		//audio 태그를 지원하지 않을 시
		$("#option_sound").disabled = "disabled";
		$("#label_sound").innerHTML = "사운드 미지원";
		$("#option_hitsound").style.display = "none";
			$("#label_hitsound").style.display = "none";
		$("#option_bgm").disabled = "disabled";
			$("#label_bgm").innerHTML = "BGM 미지원";
			$("#bgm_type").style.display = "none";
			$("#bgm_type").disabled = "disabled";
		$("#bgm_type").style.width = "40px";
	}

	//이미지 선로딩
	//1. 아이템 스프라이트
	imageList.push("./sprite/images/sprite_hell.png");
	imageList.push("./sprite/images/sprite_item.png");
	//2. 뒷배경 - 1
	for (var i=0;i<=23;i++) {
		imageList.push("./images/epic/background/background_" + i.toString() + ".jpg");
	}
	imageList.push("./images/epic/background/background_ending.png");
	//3. 뒷배경 - 2
	imageList.push("./images/epic/menu_background.png");
	imageList.push("./images/epic/ending_info_background.png");
	imageList.push("./images/epic/wrap_title.png");
	imageList.push("./images/epic/pot_opening.gif");
	imageList.push("./images/epic/gabriel.png");
	//4. 각종 아이콘, 아이템 아이콘
		//창 아이콘
		imageList.push("./images/epic/popup_record.png");
		imageList.push("./images/epic/popup_inventory.png");
		imageList.push("./images/epic/popup_set.png");
		imageList.push("./images/epic/popup_craft.png");
		imageList.push("./images/epic/popup_equip.png");
		imageList.push("./images/epic/icon_option.png");
		imageList.push("./images/epic/icon_gabriel.png");
		imageList.push("./images/epic/icon_freepass.png");
		//아이템 아이콘
		imageList.push("./images/epic/soul.png");
		imageList.push("./images/epic/beed.png");
		imageList.push("./images/epic/cost.png");
		imageList.push("./images/epic/heroPot.png");
	//5. 에픽 이펙트
	imageList.push("./images/epic/epic_appear.png");
	imageList.push("./images/epic/epic_land.png");
	imageList.push("./images/epic/epic_wait.png");
	//6. 캐릭터 스프라이트
	imageList.push("./images/epic/character_sprite/character_swordman_m.png");
	imageList.push("./images/epic/character_sprite/character_swordman_f.png");
	imageList.push("./images/epic/character_sprite/character_darkknight_m.png");
	imageList.push("./images/epic/character_sprite/character_fighter_m.png");
	imageList.push("./images/epic/character_sprite/character_fighter_f.png");
	imageList.push("./images/epic/character_sprite/character_gunner_m.png");
	imageList.push("./images/epic/character_sprite/character_gunner_f.png");
	imageList.push("./images/epic/character_sprite/character_mage_m.png");
	imageList.push("./images/epic/character_sprite/character_mage_f.png");
	imageList.push("./images/epic/character_sprite/character_creator_f.png");
	imageList.push("./images/epic/character_sprite/character_priest_m.png");
	imageList.push("./images/epic/character_sprite/character_thief_f.png");
	imageList.push("./images/epic/character_sprite/character_knight_f.png");
	imageList.push("./images/epic/character_sprite/character_lancer_m.png");
		//번외 캐릭터 스프라이트
		imageList.push("./images/epic/character_sprite/character_beckey.png");
	//7. 베키 엔딩
	imageList.push("./images/epic/beckey_ending/beckey_ending_0.jpg");
	imageList.push("./images/epic/beckey_ending/beckey_ending_1.jpg");
	imageList.push("./images/epic/beckey_ending/beckey_ending_2.jpg");
	imageList.push("./images/epic/beckey_ending/beckey_ending_3.jpg");
	imageList.push("./images/epic/beckey_ending/beckey_ending_4.jpg");
	imageList.push("./images/epic/beckey_ending/beckey_ending_5.jpg");
	imageList.push("./images/epic/beckey_ending/beckey_ending_6.jpg");
	imageList.push("./images/epic/beckey_ending/beckey_ending_7.jpg");
	imageList.push("./images/epic/beckey_ending/beckey_ending_8.jpg");
	imageList.push("./images/epic/beckey_ending/beckey_ending_9.jpg");
	imageList.push("./images/epic/beckey_ending/beckey_ending_10.jpg");
	imageList.push("./images/epic/beckey_ending/beckey_ending_11.jpg");
	imageList.push("./images/epic/beckey_ending/beckey_ending_12.jpg");

	//5단게 : 컨텐츠 선로딩 실시
	loadContents(function(){
		//=================================================================================================================
		//※ 선로딩 끝, 본격적 실행 시작
		//=================================================================================================================
		//로딩 화면 제거
		$("#titleScreen_loading").style.display = "none";
		$("#titleScreen").style.display = "none";
		//wrapper 개봉
		$("#wrapper").style.display = "block";

		//2. 일부 값 미리 입력
		if (cmd === "continue") {
			dungeon_select(dataObj["dungeon"]);//2-1. 던전 선택
			$("#difficulty").selectedIndex = indexSelectByValue($("#difficulty"), dataObj["difficulty"]);//2-2. 난이도 적용
			$("#channel").selectedIndex = dataObj["channel"];//2-3. 채널 적용
		} else {
			dungeon_select();//2-1. 던전 선택
		}

		//3. 팝업창 구성 : 로드하지 않았을 경우에만
		if (cmd !== "continue") {
			//3-1. 인벤토리 구성 (만들어둔 첫 줄 아래로 생성)
			generateInventory();
			//3-2. 세트 아이템 구성 (만들어둔 첫 줄 아래로 생성)
			generateSet();
			//3-3. 에픽 도감 구성 (만들어둔 첫 줄 아래로 생성)
			generateCraft();
		}

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
				//레벨 정렬
				tempArr[1].sort();
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
				checkObjective("setting");
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
				checkObjective("setting");
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
				checkObjective("setting");
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
				checkObjective("setting");
			}

			$("#objective_item_name").onchange = function() {
				//선택한 아이템 수집현황 출력
				checkObjective("setting");
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
				checkObjective("setting");
			}

			$("#objective_set_name").onchange = function() {
				//선택한 세트 소집상황 출력
				checkObjective("setting");
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
					var sheet = $("#style_" + i + "_filter_third");
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
			$("#craft_check_have").onclick = function() {
				var sheet1 = $("#style_craft_check_available");
				var sheet2 = $("#style_craft_check_all");
				try {
					sheet1.innerHTML = "";
					sheet2.innerHTML = "";
				} catch(e) {
					alert("＊경고 : \"조각 보유 아이템만 보기\" 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
					$("#craft_check_available").checked = false;
				}
			}
			$("#craft_check_available").onclick = function() {
				var sheet1 = $("#style_craft_check_available");
				var sheet2 = $("#style_craft_check_all");
				try {
					sheet1.innerHTML = "#craft_display table tr:not(.available) {\
						display:none;}";
					sheet2.innerHTML = "";
				} catch(e) {
					alert("＊경고 : \"제작 가능 아이템만 보기\" 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
					$("#craft_check_available").checked = false;
				}
			}
			$("#craft_check_all").onclick = function() {
				var sheet1 = $("#style_craft_check_available");
				var sheet2 = $("#style_craft_check_all");
				try {
					sheet1.innerHTML = "";
					sheet2.innerHTML = "#craft_display table tr.not_show {\
						display:inline;}";
				} catch(e) {
					alert("＊경고 : \"모든 아이템 보기\" 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
					$("#craft_check_all").checked = false;
				}
			}
				//기본적으로 모든 조각 보이도록 설정
				$("#craft_check_all").click();


			//1-1-2-5. equip관련 기능
			$("#character_type").onchange = function() {
				swal({
					text:"한번 정한 캐릭터 직업은 초기화하기 전엔 바꿀 수 없습니다.\
	\n\n<strong>\"" + characterList[$("#character_type").value]["name"] + "\"</strong>\n\n이걸로 캐릭터 직업을 정하시겠습니까?",
					type:"warning",
					showCancelButton:true
				}).then(function(isConfirm) {
					if(isConfirm) {
						//캐릭터 변경 못하게 설정
						$("#character_type").disabled = "disabled";
						//내 캐릭터 저장, 이미지 수정
						myCharacter = $("#character_type").value;
							clearCharacterClass();
							$("#character_sprite").classList.add($("#character_type").value);
						//내 장비 설정
						setEquip();
						//창 열기
						shift("equip");
						//게임 저장
						saveData();
					} else {
						$("#character_type").selectedIndex = 0;
					}
				})
			}
			for (var i=0;i<partList.length;i++) {
				(function(i) {
					//마우스 올리기 : 강화비용 & 확률 출력
					$("#list_" + partList[i] + "_enchant_run").onmouseover = function() {
						if (enchantList["enchanting"] === 0 && wearingList[partList[i]] !== null) {
							//강화정보 계산
								var enName = wearingList[partList[i]]["name"];
								var enIcon = wearingList[partList[i]]["icon"];
								//단계
								var enLevel = wearingList[partList[i]]["enchant"];
								//비용
								var enCost = enchantList["cost"][enLevel];
								//확률
								var enChance = enchantList["chance"][enLevel];
							//아이콘 표시
							$("#enchant_icon").className = "";
							$("#enchant_icon").style.backgroundPosition = spritePosition(enIcon,1);
							//강화정보 표시
							$("#enchant_text").innerHTML = "+" + (enLevel+1).toString() + "단계 강화 - 비용 : " + setWon(enCost) +
															" Gold, 확률 : " + (enChance * 100).toString() + "%";
						}
					}
					//마우스 빼기 : 원래대로 되돌리기
					$("#list_" + partList[i] + "_enchant_run").onmouseout = function() {
						if (enchantList["enchanting"] === 0) {
							//강화 표시 초기화
							$("#enchant_icon").className = "init";
							$("#enchant_icon").style.backgroundPosition = "0px 0px";
							//강화정보 초기화
							$("#enchant_text").innerHTML = "강화기 대기 중"
						}
					}
					$("#list_" + partList[i] + "_enchant_run").onclick = function() {
						//기본 장비 - 강화 불가
						if (!wearingList[partList[i]]) {
							swal({
								text:"기본 장비는 강화할 수 없습니다.",
								type:'error'
							})
							return;
						}
						//현재 20강 : 강화 불가
						if (wearingList[partList[i]]["enchant"] === 20) {
							swal({
								text:"이미 최대치(+20)까지 강화하였습니다",
								type:'error'
							})
							return;
						}
						//실행 중 - 강화 불가
						if (runningState !== "") {
							swal({
								text:"시뮬레이터 실행 중에는 강화할 수 없습니다.",
								type:'error'
							})
							return;
						}
						//강화 변수 확인
							var enName = wearingList[partList[i]]["name"];
							var enIcon = wearingList[partList[i]]["icon"];
							//단계
							var enLevel = wearingList[partList[i]]["enchant"];
							//비용
							var enCost = enchantList["cost"][enLevel];
							//확률
							var enChance = enchantList["chance"][enLevel];
						//의사 물어보리
						if ($("#equip_check_enchant").checked === false) {
							swal({
								text:"+" + enLevel + " " + enName + "을(를) 강화하시겠습니까?",
								type:"warning",
								showCancelButton:true
							}).then(function(isConfirm){
								if (isConfirm) {
									//강화 실시
									doEnchant(wearingList[partList[i]], partList[i], 0);
								} else {
									return;
								}
							});
						//의사 묻지않고 강화
						} else {
							doEnchant(wearingList[partList[i]], partList[i], 0);
						}
					}
				})(i)
			}


			//번외-1. 획득 기록 초기화 버튼
			$("#record_check_reset").onclick = function() {
				swal({
					text:"획득 기록을 초기화하시겠습니까?\
						\n˙(각종 아이템 획득 및 소모 도전장 수치, 인벤토리, 세트 아이템 창은 초기화되지 않습니다)",
					type:"warning",
					showCancelButton:true
				}).then(function(isConfirm) {
					if (isConfirm) {
						$("#record").innerHTML = "";
							//번외-1-1. 획득 기록 내부정보 초기화
							content_text[0] = "";
					}
				});
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
			//번외-3. 중복 에픽 일괄 해체 & 타캐릭터 장비 일괄 해체
			$("#disassemble_1").onclick = function() {
				var temp = 0;
				for (i=0;i<itemList.length;i++) {
					if (itemList[i]["have"] > 1) {//2개 이상 보유 시
						temp += itemList[i]["have"] - 1;
					}
				}
				if (temp === 0) {
					swal({
						text:"현재 중복 에픽 아이템이 없습니다",
						type:'error'
					})
					return;
				} else {
					swal({
						text:"중복 에픽 아이템을 각각 하나씩만 남기고 모두 해체하시겠습니까?\
	\n(총 " + temp.toString() + "개의 에픽 아이템이 해체됩니다.)\
	\n\n※ 설정창에서 \"에픽 소울 자동 해체\" 여부\
	\n　- 자동 해체 ON : 실질 초대장 소모량 감소\
	\n　- 자동 해체 OFF : 에픽 소울 보유량 증가",
						type:"warning",
						showCancelButton:true
					}).then(function(isConfirm) {
						if (isConfirm) {
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
									if ($("#option_soul").checked) {
										//체크 ON - 결과물 : 초대장
										output += disCount("초대장",itemList[i]["level"]) * target_amount;
									} else {
										//체크 OFF - 결과물 : 에픽 소울
										output += disCount("에픽 소울",itemList[i]["level"]) * target_amount;
									}
								}
							}
							//꺼둔 "해체 경고창 출력여부 체크박스" 다시 켜기
							if (not_checked === 1) {
								$("#set_check_confirm").checked = false;
								$("#inventory_check_confirm").checked = false;
							}
							//최종 결과 메세지 출력
							if ($("#option_soul").checked) {
								var text = "\"중복 에픽 아이템 일괄 해체\"가 완료되었습니다.\
	\n(실질 소모 초대장 감소 : " + thousand(output) + "장)\
	\n(실질 골드 환산 감소 : " + setWon(output*gold) + " Gold)";
							} else {
								var text = "\"중복 에픽 아이템 일괄 해체\"가 완료되었습니다.\
	\n(에픽 소울 보유량 증가 : " + thousand(output) + "개)";
							}
							swal({
								text:text,
								type:'success'
							});
						}
					})
				}
			}
			$("#disassemble_other").onclick = function() {
				//내 캐릭터가 지정되었을 때만 이용 가능
				if (myCharacter === "") {
					swal({
						text:"내 캐릭터 직업이 지정되지 않았습니다.\n'장착' 메뉴에서 캐릭터 직업을 먼저 지정해주세요.",
						type:'error'
					});
					return;
				}
				var temp = [];
				for (i=0;i<itemList.length;i++) {
					//1개 이상 보유 시 && 장착 불과
					if (itemList[i]["have"] > 0 &&
					(itemList[i]["class"] !== "" &&
					itemList[i]["class"].indexOf(myCharacter) < 0)) {
						temp.push(itemList[i]["name"]);
					}
				}
				if (temp.length === 0) {
					swal({
						text:"현재 타직업 장비가 없습니다",
						type:'error'
					});
					return;
				} else {
					swal({
						text:"타직업 장비를 모두 해체하시겠습니까?\
							\n(총 " + (temp.length).toString() + "개의 에픽 아이템이 해체됩니다.)\
							\n\n※ 설정창에서 \"에픽 소울 자동 해체\" 여부\
							\n　- 자동 해체 ON : 실질 초대장 소모량 감소\
							\n　- 자동 해체 OFF : 에픽 소울 보유량 증가",
						type:"warning",
						showCancelButton:true
					}).then(function(isConfirm) {
						if (isConfirm) {
							var not_checked = 0;
							if (! $("#inventory_check_confirm").checked || ! $("#set_check_confirm").checked) {
								not_checked = 1;//"해체 경고창 출력여부 체크박스" 상태 저장(1 : 켜져있었음)
								$("#set_check_confirm").checked = true;
								$("#inventory_check_confirm").checked = true;
							}
							//해체 실시 & 결과물 수량 체크
							var output = 0;
							for (i=0;i<itemList.length;i++) {
								if (temp.indexOf(itemList[i]["name"]) >= 0) {
									//몽땅 해체
									var target_amount = itemList[i]["have"];
									recycle(i,target_amount);
									if ($("#option_soul").checked) {
										//체크 ON - 결과물 : 초대장
										output += disCount("초대장",itemList[i]["level"]) * target_amount;
									} else {
										//체크 OFF - 결과물 : 에픽 소울
										output += disCount("에픽 소울",itemList[i]["level"]) * target_amount;
									}
								}
							}
							//꺼둔 "해체 경고창 출력여부 체크박스" 다시 켜기
							if (not_checked === 1) {
								$("#set_check_confirm").checked = false;
								$("#inventory_check_confirm").checked = false;
							}
							//최종 결과 메세지 출력
							if ($("#option_soul").checked) {
								var text = "\"타직업 장비 일괄 해체\"가 완료되었습니다.\
									\n(실질 소모 초대장 감소 : " + thousand(output) + "장)\
									\n(실질 골드 환산 감소 : " + setWon(output*gold) + " Gold)";
							} else {
								var text = "\"타직업 장비 일괄 해체\"가 완료되었습니다.\
									\n(에픽 소울 보유량 증가 : " + thousand(output) + "개)";
							}
							swal({
								text:text,
								type:'success'
							});
						}
					});
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
					swal({
						text:"현재 중복 세트 아이템이 없습니다",
						type:'error'
					});
					return;
				} else {
					swal({
						text:"중복 세트 아이템들을 각각 하나씩만 남기고 모두 해체하시겠습니까?\
						\n(총 " + temp.toString() + "개의 세트 아이템이 해체됩니다.)\
						\n\n※ 설정창에서 \"에픽 소울 자동 해체\" 여부\
						\n　- 자동 해체 ON : 실질 초대장 소모량 감소\
						\n　- 자동 해체 OFF : 에픽 소울 보유량 증가",
						type:"warning",
						showCancelButton:true
					}).then(function(isConfirm) {
						if (isConfirm) {
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
									if ($("#option_soul").checked) {
										//체크 ON - 결과물 : 초대장
										output += disCount("초대장",itemList[i]["level"]) * target_amount;
									} else {
										//체크 OFF - 결과물 : 에픽 소울
										output += disCount("에픽 소울",itemList[i]["level"]) * target_amount;
									}
								}
							}
							//꺼둔 "해체 경고창 출력여부 체크박스" 다시 켜기
							if (not_checked === 1) {
								$("#set_check_confirm").checked = false;
								$("#inventory_check_confirm").checked = false;
							}
							//최종 결과 메세지 출력
							if ($("#option_soul").checked) {
								var text = "\"중복 에픽 아이템 일괄 해체\"가 완료되었습니다.\
	\n(실질 소모 초대장 감소 : " + thousand(output) + "장)\
	\n(실질 골드 환산 감소 : " + setWon(output*gold) + " Gold)";
							} else {
								var text = "\"중복 에픽 아이템 일괄 해체\"가 완료되었습니다.\
	\n(에픽 소울 보유량 증가 : " + thousand(output) + "개)";
							}
							swal({
								text:text,
								type:'success'
							});
						}
					});
				}
			}


		//2. 버튼 세팅
		//1. frame_left
		//1-1. 던전 선택
		$("#dungeon").onchange = function() {
			playSfx("hell_selectdungeon");
			dungeon_select();
		};
		$("#channel_random").onclick = function() {
			var _arr = $("#channel").options;
			$("#channel").selectedIndex = Math.floor(Math.random() * _arr.length);
		}
		//1-2. 실행
		$("#start1").onclick = function() {
			if (runningState === "") {//0 : 정지상태
				//베키모드 : 효과음 실행
				if (myCharacter === "beckey") {
					playSfx("beckey_start");
				}
				//'자동 실행 변수' ON
				runningState = "trigger";
					$("#character_sprite").classList.remove("wait");
					$("#character_sprite").classList.add("attack");
				onoff(1);
				getEpicList();//에픽 리스트 구축
				trigger(1, 0);
			} else {
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
				objective = []//목표 초기화
				onoff(0);//잠긴 버튼 복구
			}
		}
		$("#start2").onclick = function() {
			if (runningState === "") {//0 : 정지상태
				//베키모드 : 효과음 실행
				if (myCharacter === "beckey") {
					playSfx("beckey_start");
				}
				//목표 입력
				if (setObjective("run") === true) {
					runningState = "trigger";//'자동 실행 변수' ON
						$("#character_sprite").classList.remove("wait");
						$("#character_sprite").classList.add("attack");
					onoff(2);//버튼 잠그기
					getEpicList();//에픽 리스트 구축
					trigger(2, 0);
				}
			} else {
				//메세지 출력
			var tempText = "<span class='system'>====================&lt;탐색 종료&gt;====================";
				tempText += "<br/>※ 종료 조건 : 수동 정지"
				tempText += "<br/>================================================</span>";
			content_text[0] += tempText;
			$("#record").innerHTML = content_text[0];
				//final. 스크롤바 이동 (종료 메세지가 보이도록)
				if ($("#record").style.display === "block") {
					$("#record").scrollTop = $("#record").scrollHeight;
				}
			//뒷처리
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
				objective = []//목표 초기화
				//잠긴 버튼 복구
				switch (runningState) {
					case "trigger":
						runningState = "";
						onoff(0);
						break;
					case "simulate":
						runningState = "";
						onoff("drop");
						break;
				}
			}
		}

		$("#result_button_epicDisassemble").onclick = function() {
			swal({
				text:"에픽 해체는 인벤토리 항목에서 이용하실 수 있습니다.\n(각 아이템별마다 개별적으로 실시)",
				type:'info'
			})
			shift("inventory");
		}

		$("#result_button_soulDisassemble").onclick = function() {
			var input = prompt("해체하실 에픽 소울 개수를 입력하세요.\n(현재 보유량 : " + thousand(get["soul_have"]) + " 개)\n\n※ 보유량 이상의 수치를 입력하면, 모든 에픽 소울을 해체합니다.");
			if (! isNumber(input)) {
				swal({
					type:"숫자를 입력하지 않았거나, 취소를 누르셨습니다.\n다시 시도해주세요.",
					type:'error'
				})
			} else {
				var amount = Math.min(input,get["soul_have"]);
				get["soul_have"] -= amount;
				$("#result_soul_have").innerHTML = thousand(get["soul_have"]);
				//실질 초대장 감소
				cost["invite_real"] -= cutList[0]*amount;
				$("#cost_real").innerHTML = thousand(cost["invite_real"]);
				$("#cost_gold_real").innerHTML = setWon(cost["invite_real"]*gold + cost["gold_real"]);
				//보유량이 0 이하가 되면 - 해체 버튼 비활성화
				if (get["soul_have"] <= 0) {
					$("#result_button_soulDisassemble").disabled = "disabled";
					$("#result_button_soulDisassemble").value = "없음";
				}
			}
		}

		$("#pot_tradable").onchange = function() {
			setPotOpen($("#pot_tradable").value);
		}
		$("#pot_open").onclick = function() {
			if (runningState !== "") {
				swal({
					text:"시뮬레이터 실행 중에는 항아리를 개봉할 수 없습니다.",
					type:'error'
				})
				return;
			}
			if (potList["opening"] === 0) {
				//()무기 항아리 & 캐릭터 미지정) 취소
				if ($("#pot_type").value === "무기" && myCharacter === "") {
					swal({
						text:"무기 항아리를 개봉하려면 캐릭터 직업을 지정해야 합니다." +
							"\n캐릭터 직업은 <strong>\"장착\"</strong> 탭에서 지정할 수 있습니다.",
						type:'error'
					})

					return;
				}
				//개봉 상태 기억
				potList["opening"] = 1;
				//버튼 세팅
				setPotOpen("cancel");
				//항아리 개봉 개시
				openPot($("#pot_type").value, $("#pot_tradable").value, 0);
			} else {
				//개봉 상태 기억
				potList["opening"] = 0;
				//버튼 복구
				setPotOpen($("#pot_tradable").value);
			}
		}

		$("#cost_set_gold").onclick = function() {
			var challenge = prompt("도전장 골드 가격을 입력하세요.\n(현재 가격 : " + thousand(gold) + " Gold)");
			if (! isNumber(challenge)) {
				swal({
					text:"숫자를 입력하지 않았거나, 취소를 누르셨습니다.\n다시 시도해주세요.",
					type:'error'
				});
			} else {
				gold = challenge;
				$("#cost_gold").innerHTML = setWon(cost["invite"]*gold + cost["gold"]);
				$("#cost_gold_real").innerHTML = setWon(cost["invite_real"]*gold + cost["gold_real"]);
			}
		}
		$("#cost_compare").onclick = function() {
			if (gold <= 0) {
				swal({
					text:"도전장 골드 가격이 제대로 입력되지 않았습니다.\n(도전장 골드 가격이 입력되어야 현금 시세 계산이 가능함)'",
					type:'error'
				});

				return;
			}
			var market = prompt("던파 골드당 현금 시세를 입력해주세요.\n(1,000만골드 기준, 현재 도전장 골드 가격 : " + thousand(gold) + " Gold)");
			if (! isNumber(market)) {
				swal({
					text:"숫자를 입력하지 않았거나, 취소를 누르셨습니다.\n다시 시도해주세요.",
					type:'error'
				});
			} else {
				swal({
					text:"현재 쓴 돈으로 총 " + Math.floor(cost["invite"] * gold / 10000000 * market / 15000).toString() + "마리의 치킨을 사먹을 수 있습니다.\n\
	(현금 환산 : " + setWon(Math.floor(cost["invite"] * gold / 10000000 * market)) + "원)\n\
	(치킨 1마리 당 15,000원 기준)",
					type:'info'
				});
			}
		}

		$("#reset").onclick = function() {
			//0. 기본장비 초기화 방지여부 확인
			var temp = "";
			if ($("#option_basicItem").checked === true) {
				temp += "\n\n(입력해둔 기본장비는 초기화되지 않습니다. - 옵션 참고)"
			}

			swal({
				text:'초기화를 하면 모든 기록이 사라집니다.\n<strong>\'정말로\'</strong> 초기화하시겠습니까?' + temp,
				type:'warning',
				showCancelButton:true
			}).then(function(isConfirm) {
				if (isConfirm) {
					//1. 필드 - 아이템 정리
					for (var i=0;i<maxQuantity;i++) {
						coordinate[i-1] = [0,0];
						$("#item" + i.toString()).style.msTransform = "translate(0px,0px)";
						$("#item" + i.toString()).style.webkitTransform = "translate(0px,0px)";
						$("#item" + i.toString()).style.transform = "translate(0px,0px)";

						$("#item_name" + i.toString()).classList.remove("rare","unique","epic","jogak");
						$("#item_name" + i.toString()).style.visibility = "hidden";
						$("#item_img" + i.toString()).style.visibility = "hidden";

						$("#effect_appear" + i.toString()).style.visibility = "hidden";
						$("#effect_land" + i.toString()).style.visibility = "hidden";
						$("#effect_wait" + i.toString()).style.visibility = "hidden";

						//애니메이션 정지
						clearRequestTimeout(autoLooting[i-1]);
						clearRequestTimeout(autoEffect[i-1]);
						$("#item_img"+ i.toString()).classList.remove("rotate");
					}
					//2. 회차 & 난이도 초기화
					count = 0;
					dateCount = 0;//일차도 초기화
					$("#round_count").innerHTML = 0;
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
					get = {
						"epic_get":0,//획득 에픽
						"epic_have":0,//보유 에픽
						"soul_get":0,//획득 코소
						"soul_have":0,//보유 코소
						"invite_get":0,//획득 초대장
						"beed_get":0//획득 지옥구슬
					};
					$("#result_epic_get").innerHTML = "0";
					$("#result_epic_have").innerHTML = "0";
					$("#result_soul_get").innerHTML = "0";
					$("#result_soul_have").innerHTML = "0";
					$("#result_cost_get").innerHTML = "0";
					$("#result_beed_get").innerHTML = "0";

					//6. 우측 하단 - 비용 초기화
					cost = {
						"invite":0,//초대정 전체
						"invite_real":0,//초대장 실질
						"gold":0,//골드 전체
						"gold_real":0//골드 실질
					};
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
						itemList[i]["enchant"] = 0;//강화 단계
					}
						//7-1. 습득현황 갱신
						checkObjective("setting");
						//7-2. 상단 - 장비 장착 초기화
							//캐릭터 초기화 (일반 모드 한정)
							if (playMode === "normal") {
								myCharacter = "";
									$("#character_type").selectedIndex = 0;
									$("#character_type").disabled = "";
							}
							//잔투력 재계산 (보유장비가 달라졌으니)
							setPower();
							//항아리
							tower = 0;
								//"교환 불가" 항아리 지정해놨으면
								setPotOpen($("#pot_tradable").value);
							//장착 장비 초기화
							for (var k in wearingList) {
								if (wearingList.hasOwnProperty(k)) {
									wearingList[k] = null;
								}
							};
							//장착 창 초기화
							setEquip();
							for (var i=0;i<partList.length;i++) {
								setEquip(partList[i],"")
							}

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
					swal({
						text:"모든 기록이 초기화되었습니다." + text2,
						type:'success'
					});
					//게임 저장
					saveData();
				}
			});
		}

		//========================================================
		// ※ 각종 옵션 설정
		//========================================================
		//불러온 데이터가 있다면 적용
		if (cmd === "continue") {
		    opt_name_normal("on");
		    opt_name_jogak("on");
		    opt_character("on");
		    opt_bgm_type("on");
		}

		//2-2. 아이템 명칭 출력 여부
		$("#option_name_normal").onclick = function() {
			//게임 저장
			saveData();
			optionList["name_normal"] = $("#option_name_normal").checked;

			opt_name_normal();
		};

		//2-3. 에픽 조각 명칭 출력 여부
		$("#option_name_jogak").onclick = function() {
			//게임 저장
			saveData();

			optionList["name_jogak"] = $("#option_name_jogak").checked;
			opt_name_jogak();
		};

		//2. 캐릭터 이미지 출력
		$("#option_character").onclick = function() {
			//게임 저장
			saveData();

			optionList["character"] = $("#option_character").checked;
			opt_character();
		};

		//2-4. BGM 출력
			//2-4-1. BGM 체크박스
			$("#option_bgm").onclick = function() {
				optionList["bgm"] = $("#option_bgm").checked;
				opt_bgm_type();

				//게임 저장
				saveData();
			}
			//2-4-2. BGM 타입 드롭다운 메뉴
			$("#bgm_type").onchange = function() {
				optionList["bgm_type"] = $("#bgm_type").value;
				opt_bgm_type();

				//게임 저장
				saveData();
			}

		//2-5. 기타 옵션(체크)
		$("#option_sound").onclick = function() {
			optionList["sound"] = $("#option_sound").checked;
			//게임 저장
			saveData();
		}
		$("#option_hitsound").onclick = function() {
			optionList["hitsound"] = $("#option_hitsound").checked;
			//게임 저장
			saveData();
		}
		$("#option_gabriel").onclick = function() {
			optionList["gabriel"] = $("#option_gabriel").checked;
			//아이콘 표시여부
			if ($("#option_gabriel").checked) {
				$("#status_gabriel_img").style.display = "block";
				swal(
					"'에픽 조각 교환' 기능 활성화","일정 확률로 가브리엘이 출현하여 에픽 조각을 교환합니다.",
					"success"
				);
			} else {
				$("#status_gabriel_img").style.display = "none";
			}
			//게임 저장
			saveData();
		}
		/*  (※ 프리패스 기능 무효화)
		$("#option_freepass").onclick = function() {
			optionList["freepass"] = $("#option_freepass").checked;
			//아이콘 표시여부
			if ($("#option_freepass").checked) {
				$("#status_freepass_img").style.display = "block";
				swal(
					"'지옥파티 프리패스' 기능 활성화","모든 던전에서 초대장 43장을 소모하며, '매우 어려움' 난이도만 등장합니다.",
					"success"
				);
			} else {
				$("#status_freepass_img").style.display = "none";
			}
			//게임 저장
			saveData();
		}
		*/
		$("#gabriel_type").onchange = function() {
			optionList["gabriel_type"] = $("#gabriel_type").value;
			//게임 저장
			saveData();
		}
		$("#option_soul").onclick = function() {
			optionList["soul"] = $("#option_soul").checked;
			//게임 저장
			saveData();
		}

		//2-6. 옵션 버튼
		$("#option_button").onclick = function() {
			if ($("#option").style.display !== "none") {
				$("#option").style.display = "none";
				$("#option_button").className = "";
				//닫기 효과음
				playSfx("close");
			} else {
				$("#option").style.display = "block";
				$("#option_button").className = "selected";
				//열기 효과음
				playSfx("open");
			}
		}
			//옵션 바깥 클릭 시 알아서 숨기기
			$("html").addEventListener("click",function(event) {
				if ($("#option").style.display !== "none") {
					if (
						//창 기준
						event.target !== $("#option") &&
						event.target.parentNode !== $("#option") &&
						event.target.parentNode.parentNode !== $("#option") &&
						event.target.parentNode.parentNode.parentNode !== $("#option") &&
						event.target !== $("#option_button") &&
						//sweetAlert 기준
						event.target !== $$(".swal2-overlay")[0] &&
						event.target !== $$(".swal2-modal")[0] &&
						event.target.parentNode !== $$(".swal2-modal")[0] &&
						event.target.parentNode.parentNode !== $$(".swal2-modal")[0]
					) {
						$("#option").style.display = "none";
						$("#option_button").className = "";
						//닫기 효과음
						playSfx("close");
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
		$("#shift5").onclick = function() {
			if (right_display !== "equip") {
				shift("equip");
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
				swal({
					text:"※ 해당 장비를 찾지 못했습니다.\n\n\"" + input + "\"",
					type:"error"
				});

				return;
			//장비를 찾았으면
			} else {
				//장비 업데이트
				update("에픽",found);
				//출현 사운드 출력
				playSfx("epic_appear");
				//기본장비 수집
				var tempText = "";
				for (var i=0;i<itemList.length;i++) {
					if (itemList[i]["init"] === 1) {
						tempText += "　" + itemList[i]["name"] + "\n"
					}
				}

				//메세지 출력
				swal({
					text:"<span class='bold'>해당 장비를 인벤토리에 등록하였습니다.</span>\n\"" + input + "\"\n\n<span class='bold'>현재 등록된 기본장비 리스트</span>\n" + tempText,
					type:"success"
				});
				//게임 저장
				saveData();

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
			$("#popup_chance_help").onclick = function() {
				swal({
					title:"아이템 개별 드랍률?",
					html:"지옥파티에서는 최대 아이템 드랍 수량이 정해져있고, 각 아이템마다 드랍률이 따로따로 계산됩니다.\
						일반적으로 알려진 드랍률은 <b>\"지옥파티 1회 실행 시 드랍률\"</b>이기 때문에, 아이템 개별 드랍률은 알려진 확률보다 더 낮습니다.\
						<br/><br/>\
						아이템 개별 드랍률을 설정하면 이를 합산하여 전체 드랍률을 자동으로 계산해줍니다. \
						합산 드랍률은 <b>(100% - \"해당 아이템이 단 하나도 나오지 않을 확률\")</b>로 계산합니다.",
					type:'info'
				})
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
		//2-8. 세이브 파일 저장
		$("#func_save").onclick = function() {
			swal({
				html:"<b>현재 상태를 파일로 저장하시겠습니까?</b><br/>* 다운로드 폴더에 저장됩니다('.sav' 형식)<br/>* 저장된 파일을 이메일 등을 통해 보관하세요",
				type:"info",
				showCancelButton:true
			}).then(function(isConfirm) {
				if (isConfirm) {
					//날짜 기록
					var today = new Date();
					var dd = today.getDate();
					var mm = today.getMonth()+1;
					var yyyy = today.getFullYear();
					if(dd<10)dd='0'+dd;
					if(mm<10)mm='0'+mm;
					today = yyyy + mm + dd;
					today2 = yyyy + "/" + mm + "/" + dd;
					//게임 저장 (혹시나 해서)
					saveData();
					var plainContext = JSON.stringify(dataObj);
					//파일 암호화
					var saveContext = CryptoJS.AES.encrypt(plainContext, passwordKey).toString();

					//파일 압축
					var tempZip = new JSZip();
					tempZip.file("hell2_date", today2);
					tempZip.file("hell2_init", "true");
					tempZip.file("hell2", saveContext);
					//파일 저장
					tempZip.generateAsync({type:"blob"})
					.then(function(content) {
					    // see FileSaver.js
					    saveAs(content, "HellSimulatorSaved_" + today + ".sav");
					});
				}
			});
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
				//일반 모드에서만 설정 가능 (이유 : 공정한 플레이)
				if (playMode !== "normal") {
					swal({
						text:"RPG 모드, 베키 모드에서는 피로도 설정을 할 수 없습니다.",
						type:"error"
					});
					return;
				}
				//첫 실행 이전에만 설정 가능 (이유 : 영웅의 항아리)
				if (count > 0) {
					swal({
						text:"피로도 설정은 첫 실행 이전에만 가능합니다.\
\n\"모두 초기화\"를 클릭하신 후 설정을 해주세요.",
						type:'error'
					});
					return;
				}
				//창 여닫기
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
							swal({
								text:"날짜 환산 설정창 - \"" + dateSettingName[i-1] + "\" 값이 입력되었습니다.",
								type:'error'
							});
							return;
						}
					}
					//피로도 1회 소모량이 0인지 체크(0 나누기 오류 방지)
					if (parseInt($("#date_setting_3").value) === 0) {
						swal({
							text:"1회 피로도 소모치는 \"0\"이 될 수 없습니다.",
							type:'error'
						});
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
					swal({
						text:"날짜 전환 설정이 정상적으로 변경되었습니다.",
						type:'success'
					});
				//c. 설정창 닫기
				$("#date_config").className = "";
				$("#date_config").value = "피로도 설정";
				$("#date_setting").style.display = "none";
				//게임 저장
				saveData();
			}
			//날짜환산 - 취소
			$("#date_cancel").onclick = function() {
				//b. 설정창 닫기
				$("#date_config").className = "";
				$("#date_config").value = "피로도 설정";
				$("#date_setting").style.display = "none";
			}



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
