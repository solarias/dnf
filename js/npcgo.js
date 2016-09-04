
$("#camera").style.width = "100%";
$("#camera").style.height = "100%";

var cameraElement =  $("#camera");
var cameraList = [];

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
  var videoSource = cameraList[0].deviceId;
  var constraints = {
    video: {
      optional: [{
        sourceId: videoSource
      }]
    }
  };
  navigator.getUserMedia(constraints, successCallback, errorCallback);
}

setTimeout(function() {
    cameraList.forEach(function(device) {
        alert(device.deviceId);
    });
    start();
},1000);
