
/*변수*/
//변수-플레이어
var player = {
    lat:[0,0],
    lng:[0,0],
    fatigue:1000,
        fatigue_init:1000,
    searchCool:0,
        searchCool_init:100,
        searchCool_time:5,
    address:[]
};
//변수-기본
var game = {
    gpsOn:true,
    mapOn:false
};
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


/*함수 - 기타*/


/*함수 - 실행*/
function main() {

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
                        //사각형 그리기
                        try {
                            mapPoly = new google.maps.Rectangle({
                                map: map,
                                bounds: {
                                    north:results[0].geometry.viewport.northest.lat,
                                    south:results[0].geometry.viewport.southest.lat,
                                    east:results[0].geometry.viewport.southest.lng,
                                    west:results[0].geometry.viewport.northest.lng
                                }
                            });
                        } catch (err) {
                            alert("error : " + e);
                        }
                        p.innerHTML = results[0].formatted_address.replace("대한민국 ","");
                        parent.appendChild(p);
                    } else {
                        p.className = 'text_error';
                        p.innerHTML = "위치 알 수 없음 (GPS 상태를 확인해보세요)";
                        parent.appendChild(p);
                    }
                } else {
                    p.className = 'text_error';
                    p.innerHTML = "에러 : " + status;
                    parent.appendChild(p);
                }
            });
            //피로도 증가
            player.fatigue -= 1;
            $("#trip_fatigue_bar").style.width = ((player.fatigue/player.fatigue_init)*100).toString() + "%";
        }
    },player.searchCool_time);
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
