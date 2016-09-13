
/*변수*/
//변수-플레이어
var terago_save = 0;//1 : 세이브 함
var player = {
    date:20160914,
    lat:[0,0],
    lng:[0,0],
    fatigue:1000,
        fatigue_init:1000,
    searchCool:0,
        searchCool_init:100,
        searchCool_time:5,
    items:[]
};

//변수-기본
var game = {
    gpsOn:true,
    mapOn:false,
    inventory:false,
    search:true
};
//변수 - 드랍률
var rate_type_name = [
    "무기",
    "방어구",
    "악세서리",
    "특수장비"
];
var rate_type_num = [
    45,
    36,
    6,
    13
];
var rate_level_name = [
    [60, 65],
    [70, 75],
    [80, 85],
    [90]
];
var rate_level_num = [
    40,
    30,
    20,
    10
];
//변수-기타
var autoMap;//지도 이동 requestInterval 관리
var autoSearch;//위치 탐색 requestInterval 관리
var underfoot = new Audio('./sound/underfoot.mp3');
    underfoot.volume = 0.2;
    underfoot.loop = true;

//일반
var wi = window.innerWidth;
var wh = window.innerHeight;

//맵
var map;//지도 개체
var mapMarker;//지도 마커
var mapCenter = {lat:0,lng:0};//지도 중심
var mapOption = {//지도 속성
    center:mapCenter,
    zoom: 16,
    disableDoubleClickZoom: false,
    draggable: false,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false
};
var geocoder;//지오코딩
var mapPoly;//현위치 영역

//카메라
var cameraElement =  $("#camera");
var cameraList = [];


/*UI 디자인*/
$("#wrapper").style.width = window.innerWidth + "px";
$("#wrapper").style.height = window.innerHeight + "px";



/*함수 - 세이브 로드*/
function loadData() {
    if(!localStorage["terago_save"]) {
        localStorage["terago_save"] = "0";
        localStore("terago_player",player);
        localStore("terago_itemList",itemList);
    } else {
        player = deepCopy(localGet("terago_player"));
        itemList = deepCopy(localGet("terago_itemList"));
    }
}
function saveData() {
    //플레이어 데이터 불러오기(없으면 '0'으로)
    terago_save = 1;
    localStorage["terago_save"] = "1";
    localStore("terago_player",player);
    localStore("terago_itemList",itemList);
}

/*함수 - 맵*/
//좌표 확인 및 입력
function getGPS() {
    if (game.gpsOn === true) {
        if (navigator.geolocation) {
            //위치 분석
            navigator.geolocation.getCurrentPosition(inputGPS);
            //위치 기억
                mapCenter = {
                    lat:player.lat[0],
                    lng:player.lng[0]
                };
            //위치 반영 - 지도
            mapOption.center = mapCenter;
        } else {
            alert("GPS가 감지되지 않습니다. GPS 기능을 활성화시킨 후 페이지 새로고침을 해주세요.");
            //GPS 끄기
            game.gpsOn = false;
        }
    }
}
function inputGPS(position) {
    player.lat[0] = player.lat[1];
    player.lng[0] = player.lng[1];
    player.lat[1] = position.coords.latitude;
    player.lng[1] = position.coords.longitude;
}

//맵 출력
function initMap() {
    //좌표 확인
    getGPS();
    //지도 출력
    map = new google.maps.Map(
        $("#trip_map"),
        mapOption
    );
    //역지오코딩 준비
    geocoder = new google.maps.Geocoder;
    //맵 활성화 알림
    game.mapOn = true;
}
//맵 이동
function moveMap() {
    if (game.mapOn === true) {
        //좌표 반영
        getGPS();
        //지도 이동
        map.panTo(mapCenter);
    }
}



/*함수 - 카메라*/
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

if (typeof navigator.mediaDevices === 'undefined' ||
    typeof navigator.mediaDevices.enumerateDevices === 'undefined') {
    alert('이 브라우저는 MediaDevices 기능을 지원하지 않습니다.\n\n크롬 브라우저를 이용해보세요.');
} else {
    var tempList = [];
    navigator.mediaDevices.enumerateDevices().then(function(MediaDeviceInfo) {
        for (var i=0;i<MediaDeviceInfo.length;i++) {
            if (MediaDeviceInfo[i].kind == "videoinput") {
                cameraList.push(MediaDeviceInfo[i]);
            }
        }
    });
}

function successCallback(stream) {
    window.stream = stream; // make stream available to console
    cameraElement.src = window.URL.createObjectURL(stream);
    cameraElement.play();
}
function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

function start() {
  if (window.stream) {
    videoElement.src = null;
    window.stream.stop();
  }
  var videoSource = cameraList[cameraList.length - 1].deviceId;
  var constraints = {
    video: {
        optional: [{
            sourceId: videoSource
        }],
        mandatory:{
            maxWidth:wi,
            maxHeight:wh
        }
    }
  };
  navigator.getUserMedia(constraints, successCallback, errorCallback);
}

function searching(cmd) {
    switch (cmd) {
        case "on" :
            game.search = true;
            $("#trip_search_img").src = "./images/terago/trip_search_stop.png";

            autoSearch = setInterval(function() {
                //쿨타임 감소
                player.searchCool += 0.1;
                $("#trip_searchcool_bar").style.width = player.searchCool.toString() + "%";
                if (player.searchCool >= player.searchCool_init) {
                    //쿨타임 초기화
                    player.searchCool = 0;
                    $("#trip_searchcool_bar").style.width = ((player.searchCool/player.searchCool_init)*100).toString() + "%";
                    //주소 추적
                    geocoder.geocode({'location': mapCenter}, function(results, status) {
                        var p = document.createElement('p');
                        var parent = $("#trip_address");
                        while (parent.firstChild) {
                            parent.removeChild(parent.firstChild);
                        }
                        if (status === google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                //사각형 이동
                                /*
                                var NE = new google.maps.LatLng(
                                    results[0].geometry.viewport.northest.lat,
                                    results[0].geometry.viewport.southest.lng);
                                var SW = new google.maps.LatLng(
                                    results[0].geometry.viewport.southest.lat,
                                    results[0].geometry.viewport.northest.lng);
                                var newRect = new google.maps.LatLngBounds(SW,NE);
                                mapPoly.setBounds(newRect);
                                map.fitBounds(newRect);
                                */
                                //주소 표시
                                p.innerHTML = results[0].formatted_address.replace("대한민국 ","");
                                parent.appendChild(p);
                                //아이템 확보
                                getItem(results[0].formatted_address.replace("대한민국 ",""));
                            } else {
                                p.className = 'text_error';
                                p.innerHTML = "위치 알 수 없음 (GPS 상태를 확인해보세요)";
                                parent.appendChild(p);
                            }
                        } else {
                            p.className = 'text_error';
                            p.innerHTML = "에러 : " + status;
                            parent.appendChild(p);
                            getItem("대한민국");
                        }
                    });
                    //피로도 증가
                    player.fatigue -= 1;
                    $("#trip_fatigue_bar").style.width = ((player.fatigue/player.fatigue_init)*100).toString() + "%";

                    //세이브
                    saveData();
                }
            },player.searchCool_time);

            break;
        case "off" :
            game.search = false;
            $("#trip_search_img").src = "./images/terago/trip_search.png";

            clearInterval(autoSearch);
            //쿨타임 초기화
            player.searchCool = 0;
            $("#trip_searchcool_bar").style.width = ((player.searchCool/player.searchCool_init)*100).toString() + "%";

            break;
    }
}

function getItem(address) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd;
    }
    if(mm<10) {
        mm='0'+mm;
    }
    today = yyyy + mm + dd;
    var key = address + today;
    Math.seedrandom(key);
    var temp_type = rate_type_name[rand(rate_type_num)];
    var temp_level = rate_level_name[rand(rate_level_num)];

    var tmpArr = [];
    var itm;
    for (var i=0;i<itemList.length;i++) {
        if ((temp_type === itemList[i]["sort1"] || temp_type === itemList[i]["sort2"]) && temp_level.indexOf(itemList[i]["level"]) >= 0) {
            tmpArr.push(itemList[i]);
        }
    }
    itm = tmpArr[Math.floor(Math.random() * tmpArr.length)];
    $("#trip_item_icon").style.backgroundPosition = spritePosition(itm["icon"]);
    $("#trip_item_name").innerHTML = "Lv." + itm["level"].toString() + " | " + itm["name"];
    itm["have"] = 1;
}

function looking(cmd) {
    switch (cmd) {
        case "on" :
            game.inventory = true;
            $("#trip_inventory_img").src = "./images/terago/trip_inventory_close.png";
            $("#trip_inventory_window").style.display = "block";
            searching("off");

            $("#trip_inventory_window").innerHTML = "";
            var text = "";
            for (var i=0;i<itemList.length;i++) {
                var tmp = itemList[i];
                if (tmp["have"] > 0) {
                    if (tmp["set"] !== "")
                        text += "<span class='set'>Lv." + tmp.level.toString() + " | " + tmp.name + "</span><br/>";
                    else
                        text += "Lv." + tmp.level.toString() + " | " + tmp.name + "<br/>";
                }
            }
            if (text === "") {
                $("#trip_inventory_window").innerHTML = "보유 아이템 없음";
            }
            $("#trip_inventory_window").innerHTML = text;

            break;
        case "off":
            game.inventory = false;
            $("#trip_inventory_img").src = "./images/terago/trip_inventory.png";
            $("#trip_inventory_window").style.display = "none";
            searching("on");

            $("#trip_inventory_window").innerHTML = "";

            break;
    }
}

/*함수 - 기타*/


/*함수 - 실행*/
function main() {
loadData();

//피로도 회복 확인
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10) {
    dd='0'+dd;
}
if(mm<10) {
    mm='0'+mm;
}
today2 = yyyy + mm + dd;
if (player.date < today2) {
    player.date = today2;
    player.fatigue = player.fatigue_init;
}

$("#init_start").onclick = function() {
    underfoot.play();
    $("#frame_init").style.display = "none";
    $("#frame_trip").style.display = "block";
        $("#trip_loading").style.display = "none";
    initMap();
    //2초마다 지도 이동
    autoMap = setInterval(function() {
        moveMap();
    },2000);
    //10초마다 탐색
    searching("on");
};

$("#trip_search").onclick = function() {
    if (game.search === true) {
        searching("off");
    } else {
        searching("on");
    }
};

$("#trip_inventory").onclick = function() {
    if (game.inventory === true) {
        looking("off");
        $("#trip_search").disabled = false;
    } else {
        looking("on");
        $("#trip_search").disabled = true;
    }
};

}

/*실행*/
window.onload = function() {
    main();
};
/*나감 방지*/
window.onbeforeunload = function() {
    return '정말로 테라GO를 그만하시겠습니까?';
};
