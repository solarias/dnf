//================================================================================================
//※ 변수 관리
//================================================================================================
//반복자
var i,j,k,l,m,n;

//저장용 데이터
var game = {
    //옵션
    fullScreen:0,
    music:0,
    sound:0,
    //선택 사항
    server:null,//이름 기억
    area:null,//이름 기억
    character:null,//관련 데이터(행렬) 기억
    wish:null,//
    //출력 결과물
    date:"",
    result:"",
    //진행 상태
    state:"",
    dialog:[]
};

//setTimeout 관리
var autoText;//텍스트 출력 관리
var autoCast;//캐스팅 관리
var autoResult;//결과 출력 관리

//사운드
var sfx = {
    typing:new Audio("./sound/text_typing.mp3"),
    reading:new Audio("./sound/text_reading.mp3")
};
    sfx.typing.volume = 0.5;
    sfx.reading.volume = 0.5;

//기타 변수
var textSpeed = {//텍스트 출력속도
    address:(1000/60) * 8,
    intro:(1000/60) * 3,
    casting:(1000/60) * 3,
    result:(1000/60) * 3
};
var stateList = ["address","intro","casting","result"];//텍스트 순서 리스트
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
var imageStorage = [];
var imageList = [];


//================================================================================================
//※ 함수 관리
//================================================================================================
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
                if (characterList[i]["area"] !== "" && arr.indexOf(characterList[i]["area"] < 0)) {
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
                $("#select_character").add(option);
            }
            break;
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
            //캐릭터, 배경, 도와주신분 조성
            $("#show_character_1").style.backgroundImage = "url('./images/fortune/character/" + game.character.img + "')";
            $("#frame_top").style.backgroundImage = "url('./images/fortune/background/" + game.character.back + "')";
            if (game.character.contributor !== "") {
                $("#show_contributor_name").innerHTML = game.character.contributor;
            } else {
                $("#show_contributor_name").innerHTML = "없음";
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
            } else {
                //이동 종료 시 : 대화 출력 준비
                setDialog("address");
            }
            break;
    }
}

//대화창 준비
function setDialog(state) {
    //대화창 표시
    $("#show_dialog_content").style.visibility = "visible";

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
            //취소 버튼 표시
            $("#bottom_back").style.visibility = "visible";
            $("#bottom_back").disabled = false;
            //취소 버튼 설정
            $("#bottom_back").onclick = function() {
                //취소 버튼 비활성화
                $("#bottom_back").disabled = true;
                //쇼 종료
                finishShow(0);
            };

            break;
        case "intro":
            //텍스트 다듬기 : 소망 입력
            tmpText = tmpText.replaceAll("%x","<span class='color_orange'>" + wishList[game.wish] + "</span>");
            //캐릭터 명 표시
            $("#show_dialog_name").innerHTML = game.character.name;
            $("#show_dialog_name").style.visibility = "visible";

            break;
        case "casting":
            //캐스팅바 출현
            $("#show_loading").style.visibility = "visible";
            //캐스팅 실시 (완료 후 자동으로 돌아옴)
            setCasting(0);

            break;
        case "result":
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
                $("#bottom_progress").className = "wait";
                $("#bottom_progress").disabled = true;

                break;
            //나머지 : 대화 스킵 가능
            default:
                //버튼 : Skip 기능
                $("#bottom_progress").className = "skip";
                $("#bottom_progress").disabled = false;
                $("#bottom_progress").onclick = function() {
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
                    sfx.typing.pause();
                    sfx.typing.currentTime = 0;
                    sfx.typing.play();

                    break;
                default:
                    sfx.reading.pause();
                    sfx.reading.currentTime = 0;
                    sfx.reading.play();

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
        $("#bottom_progress").className = "next";
        $("#bottom_progress").disabled = false;
            //다음 대화 출력 유도
            $("#show_dialog_content").className = "next";
        //버튼 클릭
        $("#bottom_progress").onclick = function() {
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
                    $("#bottom_progress").className = "wait";
                    $("#bottom_progress").disabled = true;

                    break;
                //나머지 : 다음으로 넘기기 가능
                default:
                    //버튼 변경
                    $("#bottom_progress").className = "next";
                    $("#bottom_progress").disabled = false;
                        //다음 대화 출력 유도
                        $("#show_dialog_content").className = "next";
                    //버튼 클릭
                    $("#bottom_progress").onclick = function() {
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
            $("#bottom_progress").className = "end";
            $("#bottom_progress").disabled = true;
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

        //1초 뒤 다음 단계
        autoResult = setTimeout(function() {
            showDialog("result", game.dialog[0], 0);
        }, 1000);
    }
}

//쇼 종료
function finishShow(step) {
    //0단계 : 버튼 봉쇄만 할 것
    if (step === 0) {
        //버튼 봉쇄
        $("#bottom_progress").className = "end";
        $("#bottom_progress").disabled = true;

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
        //필요없는 창 닫기
            //뒤로 창
            $("#bottom_back").style.visibility = "hidden";
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
        //메인 창 표시
        $("#main_title").style.visibility = "visible";
        $("#main_content").style.visibility = "visible";
        //메인 함수 가동
        setMain();
    }
}


//메인 창 관리
function setMain() {
    //랜덤 시드 초기화
    Math.seedrandom();

    //버튼 설정
    $("#bottom_progress").className = "start";
    $("#bottom_progress").disabled = false;

    //초기 : 지역 완성 (지역이나 캐릭터가 없다면)
    if (!game.area || !game.character)
        setSelect();

    //각 항목 선택 -> 항목 입력
    $("#select_server").onchange = function() {
        game.server = $("#select_server").value;
        $("#list_dot_server").classList.add("checked");
    };
    $("#select_area").onchange = function() {
        game.area = $("#select_area").value;
        $("#list_dot_character").classList.remove("checked");
        //캐릭터 완성
        setSelect($("#select_area").value);
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
        $("#list_dot_wish").classList.add("checked");
    };

    //시작 버튼
    $("#bottom_progress").onclick = function() {
        //설정 체크여부 확인
        if (game.server === null) {
            swal({type:"warning",title:"서버를 선택해주세요."});
        } else if (game.character === null) {
            swal({type:"warning",title:"캐릭터를 선택해주세요."});
        } else if (game.wish === null) {
            swal({type:"warning",title:"의뢰를 선택해주세요."});
        } else {
            //결과물 준비
                //랜덤 시드 설정
                Math.seedrandom(game.server + game.area + game.character + (new Date().getTime()));

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
                $("#bottom_progress").className = "loading";
                $("#bottom_progress").disabled = true;
                //2. 로딩 이미지 수집
                imageList = [];
                if (imageStorage.indexOf(game.character.img) < 0)
                    imageList.push("./images/fortune/character/" + game.character.img);
                    imageStorage.push("./images/fortune/character/" + game.character.img);
                if (imageStorage.indexOf(game.character.back) < 0)
                    imageList.push("./images/fortune/background/" + game.character.back);
                    imageStorage.push("./images/fortune/background/" + game.character.back);
                //3. 로딩 개시
                loadImages(imageList,function() {
                    //쇼 설치
                    setShow("prepare");
                });
        }
    };
}
//================================================================================================
//※ 실행 관리
//================================================================================================
window.onload = function() {
    //메인 창 관리
    setMain();
};
