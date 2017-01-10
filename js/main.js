var video = document.querySelector('video');
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.oGetUserMedia || navigator.msGetUserMedia;

if(navigator.getUserMedia){
	navigator.getUserMedia({video:true}, streamWebCam, throwError);
}

function streamWebCam (stream) {
	video.src = window.URL.createObjectURL(stream);
	video.play();
}

function throwError (error) {
	alert(error.name);
}

function snap () {
	canvas.width = video.clientWidth;
	canvas.height = video.clientHeight;
	context.drawImage(video, 0, 0);
}
