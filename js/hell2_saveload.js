
//=================================================================================================================
//※ 데이터 관리
//=================================================================================================================
//데이터 개체 [적용 대상, callBack]
var dataObj = {
    //던전, 난이도, 채널
    "dungeon":null,
    "difficulty":null,
    "channel":null,
    //회차, 비용, 획득
    "count":null,
    "cost":null,
    "gold":0,
    "get":null,
    "collect":null,
    "content_text":null,
    //날짜
    "dateCount":null,
    "dateState":null,
    "dateSettingList":null,
    //옵션
    "optionList":null,
    //모드,내 캐릭터, 항아리
    "playMode":null,
    "myCharacter":null,
    "power":null,
    "hellgate":null,
    "tower":null,
    "wearingList":null,
    //확률
    "chanceList_num":null,
    //아이템
    "itemList":null
};

//=================================================================================================================
//※ 초기화
//=================================================================================================================
function initData() {
    if (!localStorage["hell2_init"]) localStorage["hell2_init"] = "false";
}

//=================================================================================================================
//※ 데이터 불러오기
//=================================================================================================================
function loadData() {
    //========================
    //※ 불러오기
    //========================
    dataObj = localGet("hell2");
    //========================
    //※ 대입
    //========================
    //던전
    input["dungeon"] = deepCopy(dataObj["dungeon"]);
        //던전 실제 선택 : 차후에 변경
        //난이도 : 차후에 변경
        //채널 : 차후에 변경
    //회차, 비용, 획득
    count = deepCopy(dataObj["count"]);
    cost = deepCopy(dataObj["cost"]);
    gold = deepCopy(dataObj["gold"]);
    get = deepCopy(dataObj["get"]);
    collect = deepCopy(dataObj["collect"]);
    content_text = deepCopy(dataObj["content_text"]);
    //날짜
    dateCount = deepCopy(dataObj["dateCount"]);
    dateState = deepCopy(dataObj["dateState"]);
    dateSettingList = deepCopy(dataObj["dateSettingList"]);
    //옵션
    optionList = deepCopy(dataObj["optionList"]);
    //모드,내 캐릭터, 항아리
    playMode = deepCopy(dataObj["playMode"]);
    myCharacter = deepCopy(dataObj["myCharacter"]);
    power = deepCopy(dataObj["power"]);
    hellgate = deepCopy(dataObj["hellgate"]);
    tower = deepCopy(dataObj["tower"]);
    wearingList = deepCopy(dataObj["wearingList"]);
    //확률
    chanceList_num = deepCopy(dataObj["chanceList_num"]);
    //아이템
    itemList = deepCopy(dataObj["itemList"]);
    //========================
    //※ callBack
    //========================
    //던전 반영
    $("#dungeon").selectedIndex = indexSelectByValue($("#dungeon"), input["dungeon"]);
    dungeon_select();
    //회차 반영
    $("#round_count").innerHTML = thousand(count);
    //팝업창 반영
        //기록창 : 의도적으로 지움
        //$("#record").innerHTML = content_text[0];
        content_text[0] = "";
    $("#inventory").innerHTML = content_text[1];
    $("#set").innerHTML = content_text[2];
    $("#craft").innerHTML = content_text[3];
    	//필요 조각수 표시
    	$("#craft_check_max").innerHTML = thousand(maxJogak);
    generateGabriel();
    //옵션 반영
    $("#option_sound").checked = optionList["sound"];
	$("#option_hitsound").checked = optionList["hitsound"];
    $("#bgm_type").selectedIndex = indexSelectByValue($("#bgm_type"), optionList["bgm_type"]);
        if (bgm === "hell" || bgm == "beckey") {
            bgm = optionList["bgm_type"];
        } else {
            bgm = input["dungeon"];
        }
    $("#option_gabriel").checked = optionList["gabriel"];
    $("#gabriel_type").selectedIndex = indexSelectByValue($("#gabriel_type"), optionList["gabriel_type"]);
    $("#option_soul").checked = optionList["soul"];
    $("#option_basicItem").checked = optionList["basicItem"];
    //캐릭터 반영
    if (myCharacter !== "") {
        //(베키 모드를 제외하고) 캐릭터 반영
        if (myCharacter !== "beckey")
            $("#character_type").selectedIndex =  indexSelectByValue($("#character_type"), myCharacter);
        $("#character_type").disabled = "disabled";
        //스프라이트 변경
        $("#character_sprite").classList.add(myCharacter);
    //지정된 캐릭터가 없으면 무작위 캐릭터 지정
    } else {
        setRandomCharacter();
    }
    setEquip();
    //모드 반영
    if (playMode === 'normal') {
        //모드 표시
        $("#mode").innerHTML = "일반";
        //일반모드 : 안톤 심장부 봉인
        $("#final_dungeon").style.display = "none";
    } else if (playMode === 'rpg') {
        //모드 표시
        $("#mode").innerHTML = "RPG";
        //전투력 표시
        $("#power_area").style.display = "block";
        //RPG모드 : 일부 기능 막음
            //던전 난이도
            $("#difficulty").selectedIndex = 4;
            $("#difficulty").disabled = "disabled";
            //피로도 변경
            $("#date_config").disabled = "disabled";
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
    } else if (playMode === 'beckey') {
        //모드 표시
        $("#mode").innerHTML = "베키";
        clearSelect($("#character_type"));
        var option = document.createElement("option");
            option.innerHTML = "베키";
            option.value = "베키";
            $("#character_type").add(option);
        //전투력 표시
        $("#power_area").style.display = "block";
        //베키모드 : 일부 기능 막음
            //던전 난이도
            $("#difficulty").selectedIndex = 4;
            $("#difficulty").disabled = "disabled";
            //피로도 변경
            $("#date_config").disabled = "disabled";
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
    }
    //획득창 반영
    $("#result_epic_get").innerHTML = get["epic_get"];
    $("#result_epic_have").innerHTML = get["epic_have"];
        if (get["epic_have"] > 0) {
            $("#result_button_epicDisassemble").value = "해체";
            $("#result_button_epicDisassemble").disabled = "";
        }
    $("#result_soul_get").innerHTML = get["soul_get"];
    $("#result_soul_have").innerHTML = get["soul_have"];
        if (get["soul_have"] > 0) {
            $("#result_button_epicDisassemble").value = "해체";
            $("#result_button_epicDisassemble").disabled = "";
        } else if (get["soul_have"] < 0) {
            $("#result_soul_have").classList.add("red");
        }
    $("#result_cost_get").innerHTML = get["invite_get"];
    $("#result_beed_get").innerHTML = get["beed_get"];
    //소모창 반영
    $("#cost_invitation").innerHTML = thousand(cost["invite"]);
    $("#cost_real").innerHTML = thousand(cost["invite_real"]);
    $("#cost_gold").innerHTML = setWon(cost["invite"]*gold + cost["gold"]);
    $("#cost_gold_real").innerHTML = setWon(cost["invite_real"]*gold + cost["gold_real"]);
}

//=================================================================================================================
//※ 데이터 저장하기
//=================================================================================================================
function saveData() {
    //========================
    //※ 선 작업
    //========================
    //초기화
    localStorage["hell2_init"] = "true";
    //팝업정보 저장
    content_text[1] = deepCopy($("#inventory").innerHTML);
    content_text[2] = deepCopy($("#set").innerHTML);
    content_text[3] = deepCopy($("#craft").innerHTML);
    //========================
    //※ 저장하기
    //========================
    //던전, 난이도 채널
    dataObj["dungeon"] = deepCopy(input["dungeon"]);
    dataObj["difficulty"] = deepCopy($("#difficulty").value);
    dataObj["channel"] = deepCopy($("#channel").selectedIndex);
    //회차, 비용, 획득
    dataObj["count"] = deepCopy(count);
    dataObj["cost"] = deepCopy(cost);
    dataObj["gold"] = deepCopy(gold);
    dataObj["get"] = deepCopy(get);
    dataObj["collect"] = deepCopy(collect);
    dataObj["content_text"] = deepCopy(content_text);
    //날짜
    dataObj["dateCount"] = deepCopy(dateCount);
    dataObj["dateState"] = deepCopy(dateState);
    dataObj["dateSettingList"] = deepCopy(dateSettingList);
    //옵션
    dataObj["optionList"] = deepCopy(optionList);
    //모드,내 캐릭터, 항아리
    dataObj["playMode"] = deepCopy(playMode);
    dataObj["myCharacter"] = deepCopy(myCharacter);
    dataObj["power"] = deepCopy(power);
    dataObj["hellgate"] = deepCopy(hellgate);
    dataObj["tower"] = deepCopy(tower);
    dataObj["wearingList"] = deepCopy(wearingList);
    //확률
    dataObj["chanceList_num"] = deepCopy(chanceList_num);
    //아이템
    dataObj["itemList"] = deepCopy(itemList);
    //========================
    //※ 대입
    //========================
    localStore("hell2",dataObj);
}
