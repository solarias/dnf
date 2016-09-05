
$("#wrapper").style.width = window.innerWidth + "px";
$("#wrapper").style.height = window.innerHeight + "px";
$("#camera").style.width = window.innerWidth + "px";
$("#camera").style.height = window.innerHeight + "px";

var cameraElement =  $("#camera");
var cameraList = [];
var wi = window.innerWidth;
var wh = window.innerHeight;
var sw = 0;
var music = new Audio("./sound/underfoot.mp3");
    music.volume = 0.3;
    music.loop = true;
var music2 = new Audio("./sound/beckey_bgm.mp3");
    music2.volume = 0.3;
    music2.loop = true;
var shot = new Audio("./sound/shot.mp3");
var miss = new Audio("./sound/miss.mp3");
var out = new Audio("./sound/beckey_fail.mp3");

navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;



if (typeof navigator.mediaDevices === 'undefined' ||
    typeof navigator.mediaDevices.enumerateDevices === 'undefined') {
    alert('This browser does not support MediaDevices.\n\nTry Chrome.');
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

function shoot() {
    if ($("#ball").offsetTop > window.innerHeight * 0.25) {
        $("#ball").style.top = ($("#ball").offsetTop - 8).toString() + "px";
        setTimeout(function() {
            shoot();
        },16);
        return;
    } else {
        if (Math.random() < 0.95) {
            $("#ball").style.top = (window.innerHeight * 0.8).toString() + "px";
            miss.pause();
            miss.currentTime = 0;
            miss.play();
            sw = 0;
            $("#open").disabled = false;
        } else {
            $("#npc").style.visibility = "hidden";
            $("#miss").style.visibility = "hidden";
            out.play();
            $("#open").innerHTML = "포획 완료!";
        }
    }
}

window.onload = function() {
    setTimeout(function() {
        alert("길거리를 돌아다니는 NPC를 탐색합니다.");
        music.play();
        start();
        setTimeout(function() {
            $("#open").disabled = false;
            music.pause();
            music2.play();
            $("#npc").style.visibility = "visible";
            $("#miss").style.visibility = "visible";
            window.navigator.vibrate(500);
            $("#open").onclick = function() {
                if (sw === 0) {
                    sw = 1;
                    $("#open").disabled = true;
                    shot.pause();
                    shot.currentTime = 0;
                    shot.play();
                    shoot();
                }
            };
            $("#open").disbled = false;
            $("#open").innerHTML = "포획하기";
            alert("야생의 황녀 에르제이(가) 나타났다!");
        },20000);
    },100);
};
