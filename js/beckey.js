/*jshint -W069 */

//==============================================================================
//※ 1. 주요 변수
//==============================================================================
//기본 정보
var game = {
    "sound":1,//이 값이 0이면 사운드 플레이하지 않음
    "speed":{
        "farm":10,
        "hell":3,
        "battle":6,
        "enchant":3,
        "challenge":1
    },
    "farm":50,
    "hell_price":500,
    "hell_get_other":0.4,
    "hell_get_me":0.4,
    "hell_recycle":120,
    "battle_get":80,
    "enchant_price":[
        64,//1재련
        71,//2재련
        77,//3재련
        85,//4재련
        91,//5재련
        98,//6재련
        104,//7재련
        112//8재련
    ],
    "enchant_chance":[
    	0.9,//1재련
    	0.8,//2재련
    	0.7,//3재련
    	0.6,//4재련
    	0.5,//5재련
    	0.4,//6재련
    	0.3,//7재련
    	0.2//8재련
    ],
    "challenge_condition":13400//최대 전투력 달성 시에만 도전 가능
};

//플레이어 정보
var player = {
    "date":1,
    "power":0,
    "enchant":0,
    "invite":0,
    "ganggi":0,
    "equip":[
        0,//무기
        0,//상의
        0,//하의
        0,//어깨
        0,//벨트
        0,//신발
        0,//목걸이
        0,//팔찌
        0,//반지
        0,//보조장비
        0//마법석
    ]
};

//사운드 리스트(차후에 추가)
var soundList = {};

//행동 가능 리스트
var actList = ["farm","hell","battle","enchant","challenge"];

//접두사
var rarityList = [
    "마법의 ",
    "전설의 "
];

//장비 이름
var equipList = [
    "거대 새총",
    "악동 상의",
    "악동 하의",
    "악동 어깨",
    "악동 벨트",
    "악동 신발",
    "엘팅 메모리얼 목걸이",
    "엘팅 메모리얼 팔찌",
    "엘팅 메모리얼 반지",
    "특수 고글",
    "호문쿨루스 정수"
];

//쓸모없는 모험가 에픽
var uselessList = [
    "음검 : 막야",
    "양검 : 간장",
    "별운검",
    "로드 오브 레인저",
    "미완성 인피니티 스피어",
    "샤이닝 인텔리전스",
    "찬란한 여왕의 은장도",
    "다크 고스 벨트",
    "밤의 그림자 상의",
    "택틱컬 커맨더 상의",
    "마법의 대격변",
    "고명한 장군의 전략서",
    "시간 여행자의 은시계",
    "폐왕의 눈물"
];
//==============================================================================
//※ 2. 기초 함수
//==============================================================================
//DOM 선택자
function $(parameter) {
    return document.querySelector(parameter);
}
function $$(parameter) {
    return document.querySelectorAll(parameter);
}

//IE8에 indexOf 적용
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
	var len = this.length >>> 0;

	var from = Number(arguments[1]) || 0;
	from = (from < 0) ? Math.ceil(from)
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
//==============================================================================
//※ 3. 메인 함수
//==============================================================================
//초기치 설정
function init(cmd) {
    //로컬스토리지 초기 세팅(없으면 만들기)
    if(!localStorage["beckey_date"]) localStorage["beckey_date"] = "1";
    if(!localStorage["beckey_power"]) localStorage["beckey_power"] = "0";
    if(!localStorage["beckey_enchant"]) localStorage["beckey_enchant"] = "0";
    if(!localStorage["beckey_invite"]) localStorage["beckey_invite"] = "0";
    if(!localStorage["beckey_ganggi"]) localStorage["beckey_ganggi"] = "0";
    if(!localStorage["beckey_equip"]) {
        localStorage["beckey_equip"] = "";
        for (var h=0;h<player["equip"].length;h++) {
            localStorage["beckey_equip"] += "0";
        }
    }

    //플레이어 데이터 세팅
    switch (cmd) {
        case "load":
            //플레이어 데이터 불러오기(없으면 '0'으로)
            player["date"] = parseInt(localStorage["beckey_date"]);
            player["power"] = parseInt(localStorage["beckey_power"]);
            player["enchant"] = parseInt(localStorage["beckey_enchant"]);
            player["invite"] = parseInt(localStorage["beckey_invite"]);
            player["ganggi"] = parseInt(localStorage["beckey_ganggi"]);
            for (var i=0;i<player["equip"].length;i++) {
                player["equip"][i] = parseInt(localStorage["beckey_equip"][i]);
            }

            break;
        case "reset":
            //플레이어 데이터 초기화
            player["date"] = 1;
            player["power"] = 0;
            player["enchant"] = 0;
            player["invite"] = 0;
            player["ganggi"] = 0;
            for (var j=0;j<player["equip"].length;j++) {
                player["equip"][j] = 0;
            }

            break;
    }

    //플레이어 데이터 출력
    $("#date_num").innerHTML = thousand(player["date"]);
    $("#power").innerHTML = thousand(player["power"]);
    $("#enchant").innerHTML = player["enchant"].toString();
    $("#invite").innerHTML = thousand(player["invite"]);
    $("#ganggi").innerHTML = thousand(player["ganggi"]);
    for (var k=0;k<player["equip"].length;k++) {
        $("#equip" + k.toString()).className = "rarity" + player["equip"][k].toString();
        $("#equip" + k.toString()).innerHTML = rarityList[player["equip"][k]] + equipList[k];
    }

    //BGM 출력
    if(game["sound"] > 0) soundList["BGM"].play();

    //시작 사운드 출력
    if(game["sound"] > 0) soundList["init"].play();

    //화면 전환
    $("#init").style.display = "none";
    $("#main").style.display = "block";
}


//데이터 저장
function save() {
    localStorage["beckey_date"] = player["date"].toString();
    localStorage["beckey_power"] = player["power"].toString();
    localStorage["beckey_enchant"] = player["enchant"].toString();
    localStorage["beckey_invite"] = player["invite"].toString();
    localStorage["beckey_ganggi"] = player["ganggi"].toString();
    localStorage["beckey_equip"] = "";
    for (var i=0;i<player["equip"].length;i++) {
        localStorage["beckey_equip"] += player["equip"][i].toString();
    }
}



//전투력 갱신
function power() {
    var temp = 0;
    //장비 체크(개당 1000점)
    for (var i=0;i<player["equip"].length;i++) {
        if (player["equip"][i] > 0) {
            temp += 1000;
        }
    }
    //재련 체크(단계땅 300점)
    temp += player["enchant"] * 300;

    //전투력 적용
    player["power"] = temp;
    //전투력 가시화
    $("#power").innerHTML = thousand(temp);
}




//행동하기
function run(cmd,step) {
    //실행조건 판단(발굴, 재련)
    switch (cmd) {
        case "hell":
            //초대장 부족
            if (player["invite"] < game["hell_price"]) {
                //진입 실패 사운드 출력
                try {
                    soundList["fail"].pause();
                    soundList["fail"].currentTime = 0;
                } catch(e) {}
                if(game["sound"] === 1)soundList["fail"].play();

                //진입 실패 문구 출력
                alert("발굴을 하려면 초대장 500장이 필요해. 더 모아서 오자구.");

                //진입 취소
                return;
            }

            break;
        case "enchant":
            //1. 마봉 무기
            if (player["equip"][0] === 0) {
                //진입 실패 사운드 출력
                try {
                    soundList["fail"].pause();
                    soundList["fail"].currentTime = 0;
                } catch(e) {}
                if(game["sound"] === 1)soundList["fail"].play();

                //진입 실패 문구 출력
                alert("아직 내 무기는 마봉이야.\n전설의 무기를 구한 다음에 재련을 시도해보자.");

                //진입 취소
                return;
            //2. 재련 단계 최대치
            } else if (player["enchant"] + 1 > game["enchant_price"].length) {
                //진입 실패 사운드 출력
                try {
                    soundList["fail"].pause();
                    soundList["fail"].currentTime = 0;
                } catch(e) {}
                if(game["sound"] === 1)soundList["fail"].play();

                //진입 실패 문구 출력
                alert("이미 내 무기 재련도는 최대치야. 더 재련할 필요는 없어.");

                //진입 취소
                return;
            //3. 재료 부족
            } else if (player["ganggi"] < game["enchant_price"][player["enchant"]]) {
                //진입 실패 사운드 출력
                try {
                    soundList["fail"].pause();
                    soundList["fail"].currentTime = 0;
                } catch(e) {}
                if(game["sound"] === 1)soundList["fail"].play();

                //진입 실패 문구 출력
                alert("강렬한 기운이 부족해. " + game["enchant_price"][player["enchant"]].toString() + "개까지 모아서 다시 오자.");

                //진입 취소
                return;
            }

            break;
    }

    //첫 실행 : 세팅
    if (!step) {
        //모든 버튼 잠금
        for (var i=0;i<actList.length;i++) {
            (function(i){
                $("#run_" + actList[i]).disabled = "disabled";
            })(i);
        }

        //실행 사운드 출력
        try {
            soundList["start"].pause();
            soundList["start"].currentTime = 0;
        } catch(e) {}
        if(game["sound"] === 1)soundList["start"].play();

        //실행창 세팅
            //실행창 제목
            $("#process_type").innerHTML = $("#run_" + cmd.toString()).value;
            //실행창 이미지
            $("#process_image").className = cmd;
            //실행창 바
            $("#process_stick").style.width = "0%";

        //실행창 띄우기
        $("#process").style.display = "block";

        //본격 실행
        run(cmd, 1);

        return;
    }

    //진행바 늘리기
    if (parseInt($("#process_stick").offsetWidth) + game["speed"][cmd] < parseInt($("#process_bar").offsetWidth)) {
        $("#process_stick").style.width = (parseInt($("#process_stick").offsetWidth) + game["speed"][cmd]).toString() + "px";
        setTimeout(function() {
            run(cmd, 1);
        },16);

        return;
    }

    //명령어에 따라 다르게 설정
    switch (cmd) {
        //농사
        case "farm" :
            //초대장 50장 받기
            player["invite"] += game['farm'];
            //초대장 숫자 가시화
            $("#invite").innerHTML = thousand(player["invite"]);
            //획득 사운드 출력
            try {
                soundList["farm"].pause();
                soundList["farm"].currentTime = 0;
            } catch(e) {}
            if(game["sound"] === 1)soundList["farm"].play();

            //시간 경과
            player["date"] += 1;
            //시간 경과 가시화
            $("#date_num").innerHTML = thousand(player["date"]);

            break;
//==============================================================================
        //발굴
        case "hell" :
            //초대장 500장 소모
            player["invite"] -= game['hell_price'];
            //초대장 숫자 가시화
            $("#invite").innerHTML = thousand(player["invite"]);

            //획득 여부 판단
            var get = Math.random();

            //획득 실패
            if (get > game["hell_get_me"] + game["hell_get_other"]) {
                //실패 사운드 출력
                try {
                    soundList["fail"].pause();
                    soundList["fail"].currentTime = 0;
                } catch(e) {}
                if(game["sound"] === 1)soundList["fail"].play();

                //실패 문구 출력
                alert("이런, 오늘은 무득이네.");

            //모험가 장비 득템
            } else if (get < game["hell_get_other"]) {
                //초대장 120장 획득
                player["invite"] += game['hell_recycle'];
                //초대장 숫자 가시화
                $("#invite").innerHTML = thousand(player["invite"]);

                //실패 사운드 출력
                try {
                    soundList["fail"].pause();
                    soundList["fail"].currentTime = 0;
                } catch(e) {}
                if(game["sound"] === 1)soundList["fail"].play();

                //실패 문구 출력
                alert("이런, 아무 쓸모없는 ''" + uselessList[Math.floor(Math.random() * uselessList.length)] + "''이(가) 나왔잖아!\n난 모험가들 장비는 끼지 못한다구.\n\n갈아서 초대장 " + game['hell_recycle'].toString() + "장으로 바꿔야겠다.");
            //자기 장비 득템
            } else {
                //장비부위 선택
                var type = Math.floor(Math.random() * player["equip"].length);

                //장비 보유 체크
                //장비 보유 시
                if (player["equip"][type] > 0) {
                    //초대장 120장 획득
                    player["invite"] += game['hell_recycle'];
                    //초대장 숫자 가시화
                    $("#invite").innerHTML = thousand(player["invite"]);

                    //실패 사운드 출력
                    try {
                        soundList["fail"].pause();
                        soundList["fail"].currentTime = 0;
                    } catch(e) {}
                    if(game["sound"] === 1)soundList["fail"].play();

                    //실패 문구 출력
                    alert("이런 장비를 주웠어.\n\n'전설의 " + equipList[type] + "''\n\n그런데 이미 가지고 있는 거야. 갈아서 초대장 " + game['hell_recycle'].toString() + "장이랑 바꿔야겠다.");
                //장비 미보유 시
                } else {
                    //해당 장비 장착
                    player["equip"][type] = 1;
                    //장비 현황 갱신
                    $("#equip" + type.toString()).className = "rarity1";
                    $("#equip" + type.toString()).innerHTML = "전설의 " + equipList[type];
                    //전투력 갱신
                    power();

                    //성공 사운드 출력
                    try {
                        soundList["get"].pause();
                        soundList["get"].currentTime = 0;
                    } catch(e) {}
                    if(game["sound"] === 1)soundList["get"].play();

                    //성공 문구 출력
                    alert("이런 장비를 주웠어.\n\n'전설의 " + equipList[type] + "''\n\n이걸 낀다면 난 더 강해질 수 있을거야!");
                }
            }


            //시간 경과
            player["date"] += 1;
            //시간 경과 가시화
            $("#date_num").innerHTML = thousand(player["date"]);

            break;
//==============================================================================
        //대련
        case "battle" :
            //강기 80장 받기
            player["ganggi"] += game['battle_get'];
            //초대장 숫자 가시화
            $("#ganggi").innerHTML = thousand(player["ganggi"]);
            //획득 사운드 출력
            try {
                soundList["farm"].pause();
                soundList["farm"].currentTime = 0;
            } catch(e) {}
            if(game["sound"] === 1)soundList["farm"].play();

            //시간 경과
            player["date"] += 1;
            //시간 경과 가시화
            $("#date_num").innerHTML = thousand(player["date"]);

            break;
//==============================================================================
        //재련
        case "enchant" :
            //강기 소모
            player["ganggi"] -= game['enchant_price'][player["enchant"]];
            //초대장 숫자 가시화
            $("#ganggi").innerHTML = thousand(player["ganggi"]);

            //성공 여부 판단
            var success = Math.random();

            //실패 시
            if (success > game["enchant_chance"][player["enchant"]]) {
                //실패 사운드 출력
                try {
                    soundList["fail"].pause();
                    soundList["fail"].currentTime = 0;
                } catch(e) {}
                if(game["sound"] === 1)soundList["fail"].play();

                //실패 문구 출력
                alert((player["enchant"] + 1).toString() + "재련 실패~\n나중에 다시 시도해보자!");
            //성공 시
            } else {
                //재련수치 증가
                player["enchant"] += 1;
                //재련수치 가시화
                $("#enchant").innerHTML = player["enchant"];
                //전투력 갱신
                power();

                //성공 사운드 출력
                try {
                    soundList["get"].pause();
                    soundList["get"].currentTime = 0;
                } catch(e) {}
                if(game["sound"] === 1)soundList["get"].play();

                //성공 문구 출력
                alert((player["enchant"]).toString() + "재련 성공!\n내 무기가 더욱 강력해졌어!");
            }

            break;
//==============================================================================
        //규츌
        case "challenge" :
            if (player["power"] < 13300) {
                //실패 사운드 출력
                try {
                    soundList["fail_anton"].pause();
                    soundList["fail_anton"].currentTime = 0;
                } catch(e) {}
                if(game["sound"] === 1)soundList["fail_anton"].play();

                //실패 문구 출력
                alert("안톤에게 패배해버렸어...\n포기하면 안돼! 힘을 조금 더 모아서 다시 도전하자구!");

                //시간 경과
                player["date"] += 1;
                //시간 경과 가시화
                $("#date_num").innerHTML = thousand(player["date"]);
            } else {
                //BGM 중단
                try {
                    soundList["BGM"].pause();
                    soundList["BGM"].currentTime = 0;
                } catch(e) {}
                //클리어 사운드 출력
                try {
                    soundList["clear"].pause();
                    soundList["clear"].currentTime = 0;
                } catch(e) {}
                if(game["sound"] === 1)soundList["clear"].play();

                //첫 화면 문구 변환
                $("#init_description").innerHTML = "안톤을 무찔렀다! 덕분에 우리 루크 할아범을 무사히 구출할 수 있었어. 정말 고마워!<br/><br/>※ 총 경과할 날짜 : " + thousand(player["date"]) + "일";
                //첫 화면 버튼 변경
                $("#init_start").value = "처음부터 다시";
                $("#init_start").onclick = function() {
                    init("reset");
                };
                //첫 화면 출력
                $("#main").style.display = "none";
                $("#init").style.display = "block";
            }

            break;
    }

    //진행사항 저장
    save();

    //모든 버튼 잠금 해제
    for (var i=0;i<actList.length;i++) {
        (function(i){
            $("#run_" + actList[i]).disabled = "";
        })(i);
    }

    //실행창 닫기
    $("#process").style.display = "none";
}

//==============================================================================
//※ 4. 게임 실행
//==============================================================================
window.onload = function() {
    //사운드 선로딩
    try {
        soundList = {
            "init":new Audio("./sound/beckey_init.mp3"),
            "BGM":new Audio("./sound/beckey_bgm.mp3"),
            "start":new Audio("./sound/beckey_start.mp3"),
            "farm":new Audio("./sound/beckey_farm.mp3"),
            "get":new Audio("./sound/beckey_get.mp3"),
            "fail":new Audio("./sound/beckey_fail.mp3"),
            "fail_anton":new Audio("./sound/beckey_fail_anton.mp3"),
            "clear":new Audio("./sound/snack_month.mp3")
        };
        //볼륨 세팅
        for (var key in soundList) {
            if (soundList.hasOwnProperty(key)) {
                soundList[key].volume = 0.1;
            }
        }
        //개별 세팅
        soundList["BGM"].loop = true;
        soundList["BGM"].volume = 0.1;
    } catch(e) {
        game["sound"] = 0;
    }
    //이미지 선로딩

    //게임 본격 실행
    //시작버튼 활성화
    $("#init_start").value = "물론이지!";
    $("#init_start").disabled = "";

    //시작버튼 클릭
    $("#init_start").onclick = function() {
        //실행
        init("load");
    };

    //행동 버튼 클릭
    for (var i=0;i<actList.length;i++) {
        (function(i){
            $("#run_" + actList[i]).onclick = function() {
                run(actList[i]);
            };
        })(i);
    }
};
