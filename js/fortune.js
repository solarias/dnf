//================================================================================================
//※ 변수 관리
//================================================================================================
//반복자
var i,j,k,l,m,n;

//저장용 데이터
var version = 0.2;//버전이 올라가면 기존 옵션 정보 초기화
var game = {
    //옵션
    startFull:0,
    bgm:0,
    sfx:0,
    high:0,
    skipAll:0,
    //선택 사항
    area:null,//이름 기억
    character:null,//관련 데이터(행렬) 기억
    wish:null,//
    wish_name:"",
    //출력 결과물
    date:"",
    result:"",
    //대화정보
    dialog:[]
};

//진행 상태
var started = 0;//초기 로딩 끝나면 1이 됨

//setTimeout 관리
var autoSetting;//화면 전환 관리
var autoText;//텍스트 출력 관리
var autoCast;//캐스팅 관리
var autoResult;//결과 출력 관리

//컨텐츠 관리
    //텍스트 순서 리스트
    var stateList = ["address","intro","casting","result"];
    //소망 설명
    var wishList = {
        channel:"운이 좋은 채널",
        anton:"운이 좋은 안톤 레이드 채널",
        luke:"운이 좋은 루크 레이드 채널",
        powerstation:"운이 좋은 파워스테이션 지옥파티 던전 & 난이도",
        castleofdeath:"운이 좋은 죽은자의 성 지옥파티 던전 & 난이도",
        metrocenter:"운이 좋은 메트로센터 지옥파티 던전 & 난이도",
        goodbad:"오늘의 길흉점",
        sora:"마법의 소라고둥 조언"
    };

//미디어 관련
    //이미지
    var imageStorage = [];
    var imageList = [];
    //기본 효과음 종류 (차후에 필요하면 링크 자동 생성)
    var sfx = ["typing","talking","suprise"];
    //사운드 스토리지
    var bgmList = {};//브금이 필요하면 저장해서 사용
    var sfxList = {};//효과음이 필요하면 저장해서 사용

//기타 변수
var textSpeed = {//텍스트 출력속도
    address:(1000/60) * 8,
    intro:(1000/60) * 3,
    casting:(1000/60) * 3,
    result:(1000/60) * 3
};


//================================================================================================
//※ 함수 관리
//================================================================================================
//세이브 로드
function loadData() {
    if(!localStorage["fortune_game"]) {
        //없으면 초기치 만들기
        saveData();
    } else {
        if (!localStorage["fortune_version"] || localStorage["fortune_version"] !== version.toString()) {
            //버전 정보가 다름을 설명
            swal({
                type:"info",
                text:"버전 업데이트로 인한 충돌 방지를 위해 기존 옵션 기록을 초기화합니다."
            });
            //없으면 초기치 만들기
            saveData();
        } else {
            game = deepCopy(localGet("fortune_game"));
        }
    }
}
function saveData() {
    localStore("fortune_version",version);
    localStore("fortune_game",game);
}

//이미지 선로딩
function loadImages(arr,callBack){ // 이미지 불러오기
    //출처 : http://stackoverflow.com/questions/8264528/image-preloader-javascript-that-supports-eventNames/8265310#8265310
    var imagesArray = [];
    var img;
    var remaining = arr.length;
    for (var i = 0; i < arr.length; i++) {
        img = new Image();
        img.onload = function() {
            //내부 처리
            --remaining;
            //외부 처리
            $("#middle_loading").style.width = (((arr.length - remaining)/arr.length)*100).toString() + "%";
            //향후
            if (remaining <= 0) {
                $("#middle_loading").style.width = "0%";
                callBack();
            }
        };
        img.onerror = function() {
            //내부 처리
            --remaining;
            //외부 처리
            $("#middle_loading").style.width = (((arr.length - remaining)/arr.length)*100).toString() + "%";
            //향후
            if (remaining <= 0) {
                $("#middle_loading").style.width = "0%";
                callBack();
            }
        };
        img.src = arr[i];
        $("#imagePreloader").innerHTML += "<img src='" + arr[i] + "' />";
        imagesArray.push(img);
    }
}

//리스트 생성
function setSelect(cmd) {
    //변수 준비
    var arr = [];
    var option;
    //cmd에 따른 절차
    switch (cmd) {
        //(공란) : 지역 완성
        case undefined:
            //수집
            for (i=0;i<characterList.length;i++) {
                if (characterList[i]["area"] !== "" && arr.indexOf(characterList[i]["area"]) < 0) {
                    arr.push(characterList[i]["area"]);
                }
            }
            //선 비우기
            clearSelect($("#select_area"));
                //첫 칸 생성
                option = document.createElement("option");
                option.value = "";
                option.innerHTML = "지역을 선택하세요";
                option.disabled = true;
                $("#select_area").add(option);
                //첫 칸 선택
                $("#select_area").options.selectedIndex = 0;
            //적용
            for (i=0;i<arr.length;i++) {
                option = document.createElement("option");
                option.value = arr[i];
                option.innerHTML = arr[i];
                $("#select_area").add(option);
            }
            break;
        //나머지 : 해당 지역 캐릭터 생성
        default:
            //수집
            for (i=0;i<characterList.length;i++) {
                if (characterList[i]["area"] === cmd && arr.indexOf(characterList[i]["name"] < 0)) {
                    arr.push(characterList[i]);
                }
            }
            //선 비우기
            clearSelect($("#select_character"));
                //첫 칸 생성
                option = document.createElement("option");
                option.value = "";
                option.innerHTML = "캐릭터를 선택하세요";
                option.disabled = true;
                $("#select_character").add(option);
                //첫 칸 선택
                $("#select_character").options.selectedIndex = 0;
            //적용
            for (i=0;i<arr.length;i++) {
                option = document.createElement("option");
                option.value = arr[i]["name"];
                option.innerHTML = arr[i]["name"];
                if (arr[i].intro.length + arr[i].casting.length + arr[i].result.length > 0) {
                    option.className = "green";
                } else {
                    option.className = "";
                }
                $("#select_character").add(option);
            }
            break;
    }
}

//옵션 세팅
function setOption(action, step) {
    //타겟 : $("#option_main")
    target = $("#option_main");
    //step이 없으면 2로 사용
    step = (!step) ? 10 : step;
    //action에 따른 기능
    switch (action) {
        case "visible":
            target.style.bottom = (-100+Math.min(100, step)).toString() + "%";

            break;
        case "hidden":
            target.style.bottom = (-Math.min(100, step)).toString() + "%";

            break;
    }
    //모자라면 계속 시행
    if (step < 100) {
        autoSetting = setTimeout(function() {
            setOption(action, step+10);
        },1000/60);
    //종료 : after 상태로 변경
    }
}

//버튼 세팅
function setButton(target, action, after, step) {
    //after 없으면 true로 사용
    if (after === "disabled")
        after = true;
    else
        after = false;

    //step이 없으면 2로 사용
    step = (!step) ? 10 : step;
    if (step < 100)
        target.disabled = true;
    //action에 따른 기능
    switch (action) {
        case "visible":
            target.style.top = -(target.offsetHeight - target.offsetHeight * Math.min(1, step/100)) + "px";

            break;
        case "hidden":
            target.style.top = -(target.offsetHeight * Math.min(1, step/100)) + "px";

            break;
    }
    //모자라면 계속 시행
    if (step < 100) {
        setTimeout(function() {
            setButton(target, action, after, step+10);
        },1000/60);
    //종료 : after 상태로 변경
    } else {
        target.disabled = after;
    }
}

//쇼 설치
function setShow(step) {
    //단계별 실행
    switch (step) {
        case "prepare":
            //메인창 닫기
            $("#main_title").style.visibility = "hidden";
            $("#main_content").style.visibility = "hidden";
            //※ 옵션 적용 - 캐릭터, 배경 조성
            var tempHigh = "_low";
            if (game.high === 1)
                tempHigh = "_high";
            $("#show_character_1").style.backgroundImage = "url('./images/fortune/character" + tempHigh + "/" + game.character.img + ".png')";
            $("#frame_top").style.backgroundImage = "url('./images/fortune/background" + tempHigh + "/" + game.character.back + ".jpg')";
            //소망 표시
            $("#show_wish_name").innerHTML = game.wish_name;
            $("#show_wish").style.visibility = "visible";
            //기여자 표시
            if (game.character.contributor !== "") {
                $("#show_contributor_name").innerHTML = game.character.contributor;
                $("#show_contributor").style.visibility = "visible";
            }

            //문 열기 개시
            setShow(1);
            break;
        default:
            //좌측문 이동
            $("#main_door_l").style.left = (- step).toString() + "%";
            //우측문 이동
            $("#main_door_r").style.left = (50 + step).toString() + "%";
            //이동 안 끝났으면 반복
            if (step < 50) {
                setTimeout(function() {
                    setShow(step + 1);
                },1000/60);
            //이동 종료 시
            } else {
                //취소 버튼 표시
                setButton($("#button_back"),"visible","disabled");
                //취소 버튼 설정
                $("#button_back").onclick = function() {
                    //취소 버튼 가리기
                    setButton($("#button_back"),"hidden");
                    //쇼 종료
                    finishShow(0);
                };
                //대화 출력 준비
                if (game.skipAll === 0) {
                    //전체 스킵 X : 소개
                    setDialog("address");
                } else {
                    //※ 옵션 적용 - (배경음악 = 1 && 고유 배경음악 존재) 배경음악 출력
                    if (game.bgm === 1)
                        if (game.character.bgm !== "")
                            sfxList[game.character.bgm].play();
                    //전체 스킵 o : 결과
                    setDialog("result");
                }
            }
            break;
    }
}

//대화창 준비
function setDialog(state) {
    //대화창 표시
    $("#show_dialog_content").style.visibility = "visible";
    //캐릭터 명 표시
    $("#show_dialog_name").innerHTML = game.character.name;

    //텍스트 준비
    var tmpText = "";
    if (game.character[state] !== "") {
        //기존 텍스트 있으면 그거 활용
        tmpText += game.character[state];
    } else {
        //없으면 default 텍스트 사용
        tmpText += indexArrKey(characterList, "id", "default")[state];
    }

    //공통 텍스트 다듬기 : 캐릭터 명 입력
    tmpText = tmpText.replaceAll("%character","<span class='color_orange'>" + game.character.name + "</span>");

    //텍스트 다듬기 - 상태에 따른 구분
    switch(state) {
        case "address":
            //텍스트 다듬기 : 시간 표시, 색상 변경
            tmpText = "<span class='color_green'>" + game.date + "<br>" + tmpText + "</span>";
            //※ 옵션 적용 - (배경음악 = 1 && 고유 배경음악 존재) 배경음악 출력
            if (game.bgm === 1)
                if (game.character.bgm !== "")
                    bgmList[game.character.bgm].play();

            break;
        case "intro":
            //텍스트 다듬기 : 소망 입력
            tmpText = tmpText.replaceAll("%x","<span class='color_orange'>" + wishList[game.wish] + "</span>");
            //캐릭터 명 표시
            $("#show_dialog_name").style.visibility = "visible";
            //※ 옵션 적용 - (효과음 = 1 && 고유 보이스 존재) 보이스 출력
            if (game.sfx === 1)
                if (game.character.voice !== "")
                    sfxList[game.character.voice].play();

            break;
        case "casting":
            //캐스팅바 출현
            $("#show_loading").style.visibility = "visible";
            //캐스팅 실시 (완료 후 자동으로 돌아옴)
            setCasting(0);

            break;
        case "result":
            //대화창 잠시 가리기
            $("#show_dialog_name").style.visibility = "hidden";
            $("#show_dialog_content").style.visibility = "hidden";
            //결과 출력 실시
            setResult(0);

            break;
    }
    //대화창 (한번 비우고) 적용 ($$로 나눠서 집어넣기)
    game.dialog = [];
    var tmpArr = tmpText.split("$$");
    for (i = 0; i < tmpArr.length; i++) {
        game.dialog.push(deepCopy(tmpArr[i]));
    }
    //대화집 읽기 (result 제외)
    if (state !== "result")
        showDialog(state, game.dialog[0], 0);
}

//대화창 서서히 출력
function showDialog(state, text, num) {
    //0단계 : 버튼 세팅만 할 것
    if (num === 0) {
        switch (state) {
            //캐스팅 : 대화 스킵 불가
            case "casting":
                //버튼 : Skip 기능
                $("#button_progress").className = "wait";
                $("#button_progress").disabled = true;

                break;
            //나머지 : 대화 스킵 가능
            default:
                //버튼 : Skip 기능
                $("#button_progress").className = "skip";
                $("#button_progress").disabled = false;
                $("#button_progress").onclick = function() {
                    clearTimeout(autoText);
                    showDialog(state, text, game.dialog[0].length);
                };

                break;
        }

        //다음 진행
        showDialog(state, text, num + 1);
        //함수 종료
        return;
    }
    //태그 기호 없으면 출력
    if ((text.substr(0, num).match(/</g) || []).length === (text.substr(0, num).match(/>/g) || []).length){
        $("#show_dialog_content").innerHTML = text.substr(0, num);
        //타이핑 사운드 (공백 등 특정 문자 제외)
        if (text.substr(0, num).slice(-1) !== " " && text.substr(0, num).slice(-1) !== ">") {
            switch (state) {
                case "address":
                    if (game.sfx === 1) {
                        sfxList.typing.stop();
                        sfxList.typing.play();
                    }

                    break;
                default:
                    if (game.sfx === 1) {
                        sfxList.talking.stop();
                        sfxList.talking.play();
                    }

                    break;
            }
        }
    //태그 기호 있으면
    } else {
        //태그 기호 다 지나갈 때까지 출력 텍스트 순번 +1
        while ((text.substr(0, num+1).match(/</g) || []).length > (text.substr(0, num+1).match(/>/g) || []).length) {
            num++;
        }
    }
    //텍스트가 남아있음 : 출력 텍스트 순번 +1, 추가 출력
    if (text.length > num) {
        autoText = setTimeout(function() {
            showDialog(state, text, num + 1);
        }, textSpeed[state]);
    //텍스트 출력 완료
    } else {
        //대화 정리
        finishDialog(state);
    }
}

//대화창 정리
function finishDialog(state) {
    //기존 대화창 제거
    game.dialog.shift();
    //그 뒤에 출력할 텍스트가 있다면
    if (game.dialog.length > 0) {
        //버튼 변경
        $("#button_progress").className = "next";
        $("#button_progress").disabled = false;
            //다음 대화 출력 유도
            $("#show_dialog_content").className = "next";
        //버튼 클릭
        $("#button_progress").onclick = function() {
            //화살표 표시 제거
            $("#show_dialog_content").className = "";
            //다음 대화 출력
            showDialog(state, game.dialog[0], 0);
        };
    //없다면
    } else {
        //마지막이 아니라면
        if (stateList.indexOf(state) < stateList.length - 1) {
            switch (state) {
                //캐스팅 : 자동으로 넘어갈 때까지 대기
                case "casting":
                    //버튼 : Skip 기능
                    $("#button_progress").className = "wait";
                    $("#button_progress").disabled = true;

                    break;
                //나머지 : 다음으로 넘기기 가능
                default:
                    //버튼 변경
                    $("#button_progress").className = "next";
                    $("#button_progress").disabled = false;
                        //다음 대화 출력 유도
                        $("#show_dialog_content").className = "next";
                    //버튼 클릭
                    $("#button_progress").onclick = function() {
                        //화살표 표시 제거
                        $("#show_dialog_content").className = "";
                        //다음 단계로
                        setDialog(stateList[stateList.indexOf(state) + 1]);
                    };

                    break;
            }
        //(마지막이라면) 대화 종료
        } else {
            //버튼 봉쇄
            $("#button_progress").className = "end";
            $("#button_progress").disabled = true;
        }
    }
}

//캐스팅
function setCasting(step) {
    //step만큼 캐스팅바 표시
    $("#show_loading_bar").style.width = Math.min(step, 100).toString() + "%";
    //캐스팅 더 필요
    if (step < 100) {
        autoCast = setTimeout(function() {
            setCasting(step + 0.7);
        },1000/60);
    //캐스팅 완료
    } else {
        //대화 강제 중단
        clearTimeout(autoText);
        //캐스팅 바 감추기
        $("#show_loading").style.visibility = "hidden";
        //바로 다음 단계
        setDialog("result");
    }
}

//결과 출력
function setResult(step) {
    //step만큼 결과창 표시
    $("#show_result").style.width = Math.min(step, 100).toString() + "%";
    $("#show_result").style.left = Math.max(50 - step/2, 0).toString() + "%";
    //캐스팅 더 필요
    if (step < 100) {
        autoResult = setTimeout(function() {
            setResult(step + 2);
        },1000/60);
    //캐스팅 완료
    } else {
        //결과 출력
        $("#show_result").innerHTML = game.result;
        //플래시 출력
        $("#show_flash").src = "./images/fortune/flash.gif";
        $("#show_flash").style.display = "block";
        //음악 출력 (분위기 테스트용)
        if (game.sfx === 1)
            sfxList.suprise.play();

        //1초 뒤 다음 단계
        autoResult = setTimeout(function() {
            //잠시 가렸던 대화창 표시
            $("#show_dialog_name").style.visibility = "visible";
            $("#show_dialog_content").style.visibility = "visible";
                $("#show_dialog_content").innerHTML = "";
            //대화 진행
            showDialog("result", game.dialog[0], 0);
        }, 1000);
    }
}

//쇼 종료
function finishShow(step) {
    //0단계 : 버튼 봉쇄만 할 것
    if (step === 0) {
        //버튼 봉쇄
        $("#button_progress").className = "end";
        $("#button_progress").disabled = true;

        //다음 단계
        finishShow(step + 2);
        //함수 종료
        return;
    }
    //좌측문 이동
    $("#main_door_l").style.left = (-50 + step).toString() + "%";
    //우측문 이동
    $("#main_door_r").style.left = (100 - step).toString() + "%";
    //이동 안 끝났으면 반복
    if (step < 50) {
        setTimeout(function() {
            finishShow(step + 2);
        },1000/60);
    //이동 종료 시 : 메인 창 가동
    } else {
        //기존 setTimeout 모조리 종료
        clearTimeout(autoText);
        clearTimeout(autoCast);
        clearTimeout(autoResult);
        //필요없는 창 닫기, 필요한 창 표시
            //뒤로 버튼 : OFF (이미 닫힘)
            //설정 버튼 : ON
            setButton($("#button_option"),"visible");
            //소망
            $("#show_wish").style.visibility = "hidden";
            //기여자
            $("#show_contributor").style.visibility = "hidden";
            //결과창
            $("#show_result").style.width = "0%";
            $("#show_result").style.left = "50%";
                $("#show_result").innerHTML = "";
            //캐스팅
            $("#show_loading").style.visibility = "hidden";
                $("#show_loading_bar").style.width = "0%";
            //대화창
            $("#show_dialog_name").style.visibility = "hidden";
                $("#show_dialog_name").innerHTML = "";
            $("#show_dialog_content").style.visibility = "hidden";
                $("#show_dialog_content").innerHTML = "";
                $("#show_dialog_content").className = "";
        //※ 옵션 적용 - (배경음악 = 1 && 고유 배경음악 존재) 배경음악 종료
        if (game.bgm === 1)
            if (started === 1 && game.character && game.character.bgm !== "")
                bgmList[game.character.bgm].stop();
        //메인 창 표시
        $("#main_title").style.visibility = "visible";
        $("#main_content").style.visibility = "visible";
        //메인 함수 가동
        setMain();
    }
}


//메인 창 관리
function setMain() {
    //시작 선언
    started = 1;

    //랜덤 시드 초기화
    Math.seedrandom();

    //버튼 설정
    $("#button_progress").className = "start";
    $("#button_progress").disabled = false;

    //초기 : 지역 완성 (초기에 선택할 지역이 없다면)
    if ($("#select_area").options.length === 1)
        setSelect();

    //※ 옵션 적용
    if (game.character) {
        $("#select_area").options.selectedIndex = indexSelectByValue($("#select_area"), game.area);
        setSelect($("#select_area").value);
        $("#select_character").options.selectedIndex = indexSelectByValue($("#select_character"), game.character.name);
        $("#list_dot_character").classList.add("checked");
    }
    if (game.wish) {
        $("#select_wish").options.selectedIndex = indexSelectByValue($("#select_wish"), game.wish);
        $("#list_dot_wish").classList.add("checked");
    }

    //각 항목 선택 -> 항목 입력
    $("#select_area").onchange = function() {
        game.area = $("#select_area").value;
        $("#list_dot_character").classList.remove("checked");
        //캐릭터 완성
        setSelect($("#select_area").value);
        //기존 캐릭터 선택했던 거 초기화
        game.character = null;
    };
    $("#select_character").onchange = function() {
        game.character = indexArrKey(characterList,"name",$("#select_character").value);
        $("#list_dot_character").classList.add("checked");
    };
        //랜덤 캐릭터
        $("#content_random").onclick = function() {
            //랜덤 캐릭터 표시
                //characterList 첫번째 칸은 제외 (default 칸이라서)
            var randCha = characterList[Math.floor(Math.random() * (characterList.length - 1) + 1)];
            //지역 표시 & 캐릭터 완성
            $("#select_area").options.selectedIndex = indexSelectByValue($("#select_area"),randCha["area"]);
            setSelect($("#select_area").value);
            //캐릭터 표시
            $("#select_character").options.selectedIndex = indexSelectByValue($("#select_character"),randCha["name"]);
            //지역 & 캐릭터 적용
            game.area = $("#select_area").value;
            game.character = indexArrKey(characterList,"name",$("#select_character").value);
            $("#list_dot_character").classList.add("checked");
        };
    $("#select_wish").onchange = function() {
        game.wish = $("#select_wish").value;
        game.wish_name = $("#select_wish").options[$("#select_wish").selectedIndex].innerHTML;
        $("#list_dot_wish").classList.add("checked");
        //소망 안내문
        switch (game.wish) {
            //마법의 소라고둥
            case "sora":
                swal({
                    type:"info",
                    title:"마법의 소라고둥",
                    text:"자신이 하고싶은 것을 미리 생각해두세요. 선택한 캐릭터가 그것을 해도 되는지 답변해줄 겁니다."
                });

                break;
        }
    };

    //설정 버튼
    $("#button_option").onclick = function() {
        //설정대로 옵션 표시
        $("#option_startFull").checked = (game.startFull === 1) ? true : false;
        $("#option_bgm").checked = (game.bgm === 1) ? true : false;
        $("#option_sfx").checked = (game.sfx === 1) ? true : false;
        $("#option_high").checked = (game.high === 1) ? true : false;
        //옵션 표시
        setOption("visible");
        //옵션 버튼 가리기
        setButton($("#button_option"),"hidden");
        //중앙 버튼 변경
        $("#button_progress").className = "ok";
        $("#button_progress").onclick = function() {
            //설정 저장
            saveData();
            //옵션 올라가는 도중이었으면 중단
            clearTimeout(autoSetting);
            //옵션 내리기
            setOption("hidden");
            //옵션 버튼 표시
            setButton($("#button_option"),"visible");
            //중앙버튼 복권
            $("#button_progress").className = "start";
            $("#button_progress").onclick = function() {
                prepareShow();
            };
        };
        //각종 옵션
            //전체 화면 모드
            $("#option_fullscreen").onclick = function() {
                toggleFullScreen();
            };
            //운세 결과 바로 보기
            $("#option_startFull").onclick = function() {
                game.startFull = ($("#option_startFull").checked) ? 1 : 0;
            };
            //배경음악
            $("#option_bgm").onclick = function() {
                game.bgm = ($("#option_bgm").checked) ? 1 : 0;
            };
            //효과음
            $("#option_sfx").onclick = function() {
                game.sfx = ($("#option_sfx").checked) ? 1 : 0;
            };
            //이미지
            $("#option_high").onclick = function() {
                game.high = ($("#option_high").checked) ? 1 : 0;
            };
    };

    //시작 버튼
    $("#button_progress").onclick = function() {
        //쇼 준비하기
        prepareShow();
    };
}

//쇼 준비
function prepareShow() {
    //설정 체크여부 확인
    if (game.character === null) {
        swal({type:"warning",title:"캐릭터를 선택해주세요."});
    } else if (game.wish === null) {
        swal({type:"warning",title:"소망을 선택해주세요."});
    } else {
        //결과물 준비
            //현 설정 저장
            saveData();

            //랜덤 시드 설정
            Math.seedrandom(game.area + game.character.name + (new Date().getTime()));

            //현재 시간
            var today = new Date();
            var dd = today.getDate().toString();
            var mm = (today.getMonth()+1).toString();
            var yyyy = (today.getFullYear()).toString();
            today = "아라드력 " + yyyy + "년 " + mm + "월 " + dd + "일";
            game.date = today;

            //소망 결과물
            switch (game.wish) {
                case "channel":
                    game.result = resultList.channel[Math.floor(Math.random() * resultList.channel.length)];

                    break;
                case "anton":
                    game.result = resultList.anton[Math.floor(Math.random() * resultList.anton.length)];

                    break;
                case "luke":
                    game.result = resultList.luke[Math.floor(Math.random() * resultList.luke.length)];

                    break;
                case "powerstation":
                    var dun = resultList.powerstation[Math.floor(Math.random() * resultList.powerstation.length)];
                    var diff = resultList.difficulty[Math.floor(Math.random() * resultList.difficulty.length)];
                    game.result = "던전 : " + dun + " / 난이도 : " + diff;

                    break;
                case "castleofdeath":
                    var dun = resultList.castleofdeath[Math.floor(Math.random() * resultList.castleofdeath.length)];
                    var diff = resultList.difficulty[Math.floor(Math.random() * resultList.difficulty.length)];
                    game.result = "던전 : " + dun + " / 난이도 : " + diff;

                    break;
                case "metrocenter":
                    var dun = resultList.metrocenter[Math.floor(Math.random() * resultList.metrocenter.length)];
                    var diff = resultList.difficulty[Math.floor(Math.random() * resultList.difficulty.length)];
                    game.result = "던전 : " + dun + " / 난이도 : " + diff;

                    break;
                case "goodbad":
                    game.result = resultList.goodbad_name[rand(resultList.goodbad_num)];

                    break;
                case "sora":
                    game.result = resultList.sora[Math.floor(Math.random() * resultList.sora.length)];

                    break;
            }

        //로딩 개시
            //1. 버튼 폐쇄
            $("#button_progress").className = "loading";
            $("#button_progress").disabled = true;
            //2. 설정 버튼 폐쇄(action)
            setButton($("#button_option"),"hidden");

            //※ 옵션 적용 - (베경음악 = 1이면) 배경음악 저장
            if (game.bgm === 1)
                //전용 BGM 있으면 그거 사용
                if (game.character.bgm !== "")
                    if (Object.keys(bgmList).indexOf(game.character.bgm) < 0)
                        bgmList[game.character.bgm] = new Howl({
                            src:["./sound/fortune/bgm/" + game.character.bgm + ".mp3"],
                            volume:0.4,
                            loop:true,
                            preload:true
                        });
                //공용 BGM : 차후에 생각해보기

            //※ 옵션 적용 - (효과음 = 1이면) 효과음 저장
            if (game.sfx === 1)
                //기본 효과음
                for (i = 0; i < sfx.length ; i++) {
                    if (Object.keys(sfxList).indexOf(sfx[i]) < 0)
                        sfxList[sfx[i]] = new Howl({
                            src:["./sound/fortune/sfx/" + sfx[i] + ".mp3"],
                            volume:0.3,
                            preload:true
                        });
                }
                //전용 효과음 - 보이스 (있으면 사용)
                if (game.character.voice !== "")
                    if (Object.keys(sfxList).indexOf(game.character.voice) < 0)
                        sfxList[game.character.voice] = new Howl({
                            src:["./sound/fortune/voice/" + game.character.voice + ".mp3"],
                            volume:0.3,
                            preload:true
                        });

            //3. 로딩 이미지 수집 (이미지 출력 허용 시에만)
            var tempHigh = "_low";
            if (game.high === 1) {
                tempHigh = "_high";
            }
            imageList = [];
            if (imageStorage.indexOf(game.character.img) < 0)
                imageList.push("./images/fortune/character" + tempHigh +"/" + game.character.img + ".png");
                imageStorage.push("./images/fortune/character" + tempHigh +"/" + game.character.img + ".png");
            if (imageStorage.indexOf(game.character.back) < 0)
                imageList.push("./images/fortune/background" + tempHigh +"/" + game.character.back + ".jpg");
                imageStorage.push("./images/fortune/background" + tempHigh +"/" + game.character.back + ".jpg");
            //3. 로딩 개시
            loadImages(imageList,function() {
                //쇼 설치
                setShow("prepare");
            });
    }
}
//================================================================================================
//※ 실행 관리
//================================================================================================
window.onload = function() {
    //지난 설정 불러오기
    loadData();

    //버튼 잠금 해제
    $("#button_blog").disabled = false;
    $("#button_blog").onclick = function() {
        //차후 블로그 글 개설 시 추가
        swal({
            type:"warning",
            title:"블로그에 아직 올리지 않았습니다."
        });
    };

    $("#button_progress").className = "start";
    $("#button_progress").disabled = false;
    $("#button_progress").onclick = function() {
        //공지 지우기
        $("#top_notice").style.visibility = "hidden";
        //일부 버튼 치우기
        setButton($("#button_blog"),"hidden");
        //※ 옵션 적용 - (startFull이 있으면) 풀스크린 적용
        if (game.startFull === 1) launchIntoFullscreen();

        //이미지 선 로딩
        imageList = [];
        //메인창
        imageList.push("./images/fortune/door.jpg");
        imageList.push("./images/fortune/content_next.gif");
        imageList.push("./images/fortune/result.png");
        imageList.push("./images/fortune/flash.gif");

        //하단 창
        imageList.push("./images/fortune/door.jpg");

        imageList.push("./images/fortune/progress_loading.png");
        imageList.push("./images/fortune/progress_start.png");
        imageList.push("./images/fortune/progress_ok.png");
        imageList.push("./images/fortune/progress_skip.png");
        imageList.push("./images/fortune/progress_next.png");
        imageList.push("./images/fortune/progress_pause.png");
        imageList.push("./images/fortune/progress_wait.png");
        imageList.push("./images/fortune/progress_end.png");
        loadImages(imageList,function() {
            //문 닫기(후 메인 설치)
            finishShow(0);
        });
    };
};
