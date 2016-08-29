/*jshint -W069 */

//==============================================================================
//※ 1. 주요 변수
//==============================================================================
var auto;//1초마다 자동실행되는 함수 통제
var player = {
    lat0:0,
        lat1:0,
    long0:0,
        long1:0,

    antonnium:0,
    soul:0
};
var weapon = [];
//장비 정보는 'selfish.js'에서 list_selfish 배열 활용


//==============================================================================
//※ 2. 각종 함수
//==============================================================================
//초기치 설정
function init(cmd) {
    //로컬스토리지 초기 세팅(없으면 만들기)
    if(!localStorage["beckeygo_antonium"]) localStorage["beckeygo_antonium"] = "0";
    if(!localStorage["beckeygo_soul"]) localStorage["beckeygo_soul"] = "0";
    if(!localStorage["beckeygo_epic"]) localStorage["beckeygo_epic"] = "[]";

    //플레이어 데이터 세팅
    switch (cmd) {
        case "load":
            //플레이어 데이터 불러오기(없으면 '0'으로)
            player["antonium"] = parseInt(localStorage["beckeygo_antonium"]);
            player["soul"] = parseInt(localStorage["beckeygo_soul"]);
            player["epic"] = localGet("beckeygo_epic");

            break;
        case "reset":
            //플레이어 데이터 초기화
            player["antonium"] = 0;
            player["soul"] = 0;
            player["epic"] = 0;
            player["invite"] = 0;
            player["ganggi"] = 0;
            for (var j=0;j<player["equip"].length;j++) {
                player["equip"][j] = 0;
            }

            break;
    }

    //플레이어 데이터 출력
    $("#antonium_num").innerHTML = thousand(player["antonium"]);
    $("#soul_num").innerHTML = thousand(player["soul"]);
    //영조 1개 이상 : 버튼 활성화
    if (player["soul"] > 0) {
        $("#open").disabled = "false";
    }
}

//위치 분석
function getLocation() {
    if (navigator.geolocation) {
        //위치 분석
        navigator.geolocation.getCurrentPosition(showPosition);
        //속도 출력
        speed();
    } else {
        $("#status").innerHTML = "ERROR";
    }
}
//위치 정보 받기
function showPosition(position) {
    player.lat0 = player.lat1;
    player.long0 = player.long1;
    player.lat1 = position.coords.latitude;
    player.long1 = position.coords.longitude;
}
//속도 분석, 출력 (출처 : http://www.ridgesolutions.ie/index.php/2013/11/14/algorithm-to-calculate-speed-from-two-gps-latitude-and-longitude-points-and-time-difference/)
function speed() {
    // Convert degrees to radians
    var c_lat0 = player.lat0 * Math.PI / 180.0;
    var c_long0 = player.long0 * Math.PI / 180.0;

    var c_lat1 = player.lat1 * Math.PI / 180.0;
    var c_long1 = player.long1 * Math.PI / 180.0;

    // radius of earth in metres
    var r = 6378100;

    // P
    var rho1 = r * Math.cos(c_lat0);
    var z1 = r * Math.sin(c_lat0);
    var x1 = rho1 * Math.cos(c_long0);
    var y1 = rho1 * Math.sin(c_long0);

    // Q
    var rho2 = r * Math.cos(c_lat1);
    var z2 = r * Math.sin(c_lat1);
    var x2 = rho2 * Math.cos(c_long1);
    var y2 = rho2 * Math.sin(c_long1);

    // Dot product
    var dot = (x1 * x2 + y1 * y2 + z1 * z2);
    var cos_theta = dot / (r * r);

    var theta = Math.acos(cos_theta);

    // Distance in Metres
    var distance = r * theta;
    var spd = Math.round(distance * 3.6,3);

    //속도 출력
    switch (spd) {
        case 0:
            $("#status").innerHTML = "STOP";
            break;
        default:
            $("#status").innerHTML = "GO";
            $("#speed_num").innerHTML = thousand(spd);
            break;
    }
}

window.onload = function() {
    //공지사항 : alert (귀찮으니까)
    alert("베키와 함께 움직이며 안토니움과 영혼조각을 모으시고, 그걸로 항아리를 개봉하시면 됩니다.");
    alert("베키GO는 GPS 기반으로 작동합니다. 지금 GPS가 꺼져있다면 활성화시킨 후 다시 시작해주세요.");

    auto = requestInterval(function() {
        getLocation();
    }, 1000);
};
