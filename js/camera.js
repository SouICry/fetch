/*
 https://davidwalsh.name/browser-camera
 https://stackoverflow.com/questions/18483160/which-camera-will-open-getusermedia-api-in-mobile-device-front-or-rear
 https://codeforgeek.com/2014/11/file-uploads-using-node-js/




 */

'use strict';

var videoSelect = document.getElementById('videoSource');

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

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

function enableCamera(vid, canvas, takeButton, redoButton, source, onTakePic) {

    if (typeof MediaStreamTrack === 'undefined' ||
        typeof MediaStreamTrack.getSources === 'undefined') {
        alert('Your browser doesnt support using the camera :( Try uploading or use Chrome instead');
    } else {
        MediaStreamTrack.getSources(gotSources);
    }

    takeButton.style.display = "block";
    redoButton.style.display = "none";
    canvas.style.display = "none";
    vid.style.display = "block";

    if (source >= videoSelect.length) {
        source = videoSelect.length - 1;
    }
    videoSelect.selectedIndex = source;
    var videoSource = videoSelect.value;
    var constraints = {
        video: {
            optional: [{
                sourceId: videoSource
            }]
        }
    };

    function successCallback(stream) {
        canvas.style.display = "none";
        vid.style.display = "block";
        takeButton.style.display = "block";
        redoButton.style.display = "none";
        window.stream = stream; // make stream available to console
        vid.src = window.URL.createObjectURL(stream);
        vid.play();
    }

    function errorCallback(error) {
        console.log('navigator.getUserMedia error: ', error);
        alert('Something went wrong with the camera :( Try uploading or use Chrome instead');
    }

    navigator.getUserMedia(constraints, successCallback, errorCallback);

    takeButton.addEventListener("click", function () {
        onTakePic();
        var context = canvas.getContext("2d");
        context.drawImage(vid, 0, 0, vid.offsetWidth, canvas.height);
        canvas.style.display = "block";
        vid.style.display = "none";
        takeButton.style.display = "none";
        redoButton.style.display = "block";
    });

    redoButton.addEventListener("click", function () {
        navigator.getUserMedia(constraints, successCallback, errorCallback);
    });
}

function disableCamera(vid) {
    if (window.stream) {
        //vid.src = null;
        window.stream.getTracks().forEach(function (track) {
            track.stop();
        });
        window.stream = null;
    }
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