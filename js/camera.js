/*
 https://davidwalsh.name/browser-camera
 https://stackoverflow.com/questions/18483160/which-camera-will-open-getusermedia-api-in-mobile-device-front-or-rear
 https://codeforgeek.com/2014/11/file-uploads-using-node-js/




 */

'use strict';


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





function enableCamera(vid, canvas, takeButton, redoButton, source) {
    if (typeof MediaStreamTrack === 'undefined' ||
        typeof MediaStreamTrack.getSources === 'undefined') {
        alert('Your browser doesnt support using the camera :( Try uploading or use Chrome instead');
    } else {
        MediaStreamTrack.getSources(gotSources);
    }

    var videoSelect = document.getElementById('videoSource');
    
    if (source >= videoSelect.length){
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
        window.stream = stream; // make stream available to console
        vid.src = window.URL.createObjectURL(stream);
        vid.play();
    }

    function errorCallback(error) {
        console.log('navigator.getUserMedia error: ', error);
        alert('Something went wrong with the camera :( Try uploading or use Chrome instead');
    }

    function disableCamera() {
        if (window.stream) {
            vid.src = null;
            window.stream.getTracks().forEach(function (track) {
                track.stop();
            });
            window.stream = null;
        }
    }
    
    navigator.getUserMedia(constraints, successCallback, errorCallback);

    takeButton.addEventListener("click", function () {
        var context = canvas.getContext("2d");
        context.drawImage(vid, 0, 0, canvasWidth, canvasHeight);
        disableCamera();
    });

    redoButton.addEventListener("click", function(){
        navigator.getUserMedia(constraints, successCallback, errorCallback);
    });
}


