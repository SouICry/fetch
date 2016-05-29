/*
 https://davidwalsh.name/browser-camera
 https://stackoverflow.com/questions/18483160/which-camera-will-open-getusermedia-api-in-mobile-device-front-or-rear
 https://codeforgeek.com/2014/11/file-uploads-using-node-js/




 */

'use strict';

var videoSelect = document.getElementById('videoSource');

//noinspection JSUnresolvedVariable
navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//console.log(navigator.getUserMedia);
function gotSources(sourceInfos) {
    for (var i = 0; i !== sourceInfos.length; ++i) {
        var sourceInfo = sourceInfos[i];
        var option = document.createElement('option');
        option.value = sourceInfo.id;
        if (sourceInfo.kind === 'audio') {

        } else if (sourceInfo.kind === 'video') {
            option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
            videoSelect.appendChild(option);
        } else {
            console.log('Some other kind of source: ', sourceInfo);
        }
    }
}

var takePhoto;
var reTake;

//var counter =0;
function enableCamera(vid, canvas, takeButton, redoButton, source, onTakePic) {
    if (typeof MediaStreamTrack === 'undefined' ||
        typeof MediaStreamTrack.getSources === 'undefined') {
        alert('Your browser doesnt support using the camera :( Try uploading or use Chrome instead');
    } else {
        //noinspection JSUnresolvedVariable,JSUnresolvedFunction
        navigator.mediaDevices.enumerateDevices(gotSources);//MediaStreamTrack.getSources(gotSources);
    }

    takeButton.style.display = "block";
    redoButton.style.display = "none";
    canvas.style.display = "none";
    vid.style.display = "block";

    if (source >= videoSelect.length) {
        source = videoSelect.length - 1;
    }
    videoSelect.selectedIndex = source;
    //var videoSource = videoSelect.value;
    var constraints = {
        video: {
            optional: [{
                sourceId: ""//videoSource
            }]
        }
    };
    //console.log("Enable con: " + counter);
    //console.log(constraints);
    function successCallback(stream) {
        canvas.style.display = "none";
        vid.style.display = "block";
        //console.log("Video On");
        //console.log(stream);
        //console.log(constraints);
        takeButton.style.display = "block";
        redoButton.style.display = "none";

        if(window.stream){
            window.stream.getTracks().forEach(function (track) {
                //console.log("Camera has been stopped")
                //console.log(track)
                track.stop();
            });
            window.stream = null;
        }

        window.stream = stream; // make stream available to console
        vid.src = window.URL.createObjectURL(stream);
        vid.play();

    }

    function errorCallback(error) {
        console.log('navigator.getUserMedia error: ', error);
        alert('Something went wrong with the camera :( Try uploading or use Chrome instead');
    }
    //console.log("Enable is alive");
    //navigator.mediaDevices.getUserMedia(constraints).then(successCallback(s)).catch(errorCallback(e));
    navigator.getUserMedia(constraints, successCallback, errorCallback);

     takePhoto = function () {
        onTakePic();
        var context = canvas.getContext("2d");
        context.drawImage(vid, 0, 0, vid.offsetWidth, canvas.height);
        console.log("Picture taked");
        canvas.style.display = "block";
        vid.style.display = "none";
        takeButton.style.display = "none";
        redoButton.style.display = "block";

    };
    //console.log(takePhoto);
    //addListenr: function ()

    takeButton.addEventListener("click", takePhoto);
 
    reTake = function () {
        //navigator.mediaDevices.getUserMedia(constraints).then(successCallback).catch(errorCallback);
        navigator.getUserMedia(constraints, successCallback, errorCallback);
        //console.log("Who am I?");
    };
    redoButton.addEventListener("click", reTake);
    
}

function disableCamera(vid, takeButton, redoButton) {
    if (window.stream) {
        vid.pause();
        vid.src = "";
        //noinspection JSUnresolvedFunction
        window.stream.getTracks().forEach(function (track) {
            //console.log("Track " + track + " Camera has been stopped")
            track.stop();
        });
        window.stream = null;
    }
    takeButton.removeEventListener("click", takePhoto);
    redoButton.removeEventListener("click", reTake);
    
}

function enableImageUpload(vid, canvas, takeButton, redoButton, uploadInput) {
    uploadInput.addEventListener('change', handleImageUpload, false);

    var context = canvas.getContext("2d");

    function handleImageUpload(e) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var img = new Image();
            img.onload = function () {
                var canvasWidth = canvas.width;
                var canvasHeight = canvas.height == 0 ? canvas.width : canvas.height;
                var widthScaleFactor = canvasWidth / img.width;
                var heightScaleFactor = canvasHeight / img.height;
                var scaleFactor = widthScaleFactor > heightScaleFactor ? widthScaleFactor : heightScaleFactor;
                var imgWidth = img.width * scaleFactor;
                var imgHeight = img.height * scaleFactor;
                var widthOffset = (imgWidth - canvasWidth) / 2;
                var heightOffset = (imgHeight - canvasHeight) / 2;
                context.drawImage(img, -widthOffset, -heightOffset, imgWidth, imgHeight);
                canvas.style.display = "block";
                vid.style.display = "none";
                takeButton.style.display = "none";
                redoButton.style.display = "block";
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    }
}

function enableCameraImage(vid, canvas, takeButton, redoButton, uploadInput, source, onTakePic) {
    enableImageUpload(vid, canvas, takeButton, redoButton, uploadInput, onTakePic);
    enableCamera(vid, canvas, takeButton, redoButton, source, onTakePic);
}