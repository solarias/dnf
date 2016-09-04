
$("#camera").style.width = "100%";
$("#camera").style.height = "100%";

var video = $("#camera");
var mediaConfig =  { video: true };
var errBack = function(e) {
	console.log('An error has occurred!', e);
};
var text = "";

navigator.mediaDevices.enumerateDevices()
.then(function(devices) {
  devices.forEach(function(device) {
    console.log(device.kind + ": " + device.label +
                " id = " + device.deviceId);
  });
})
.catch(function(err) {
 console.log(err.name + ": " + err.message);
});
alert(text);

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    });
}
/* Legacy code below! */
else if(navigator.getUserMedia) { // Standard
	navigator.getUserMedia(mediaConfig, function(stream) {
		video.src = stream;
		video.play();
	}, errBack);
} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
	navigator.webkitGetUserMedia(mediaConfig, function(stream){
		video.src = window.URL.createObjectURL(stream);
		video.play();
	}, errBack);
} else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
	navigator.mozGetUserMedia(mediaConfig, function(stream){
		video.src = window.URL.createObjectURL(stream);
		video.play();
	}, errBack);
}
