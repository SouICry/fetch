(function() {
    loader._takeProfilePicture = {
        data: "", //Optional
        version: 0, //Must be 0
        getData:null,
        loadData: null,
        onPageLoad: function(){
            function beforeTake() {
                canvas.height = vid.offsetHeight;
                canvas.width = canvas.height;
            }
            enableCameraImage(vid, canvas,
                document.getElementById("takeButton1"),
                document.getElementById("redoButton1"),
                document.getElementById('uploadImage1'),
                0, beforeTake); //0 front cam, 1 back cam if available
            
        },
        onPageLeave: function(){
            disableCamera(vid,
                document.getElementById("takeButton1"),
                document.getElementById("redoButton1"),
                document.getElementById('uploadImage1'));
        }
    };

    var vid = document.getElementById("video1");
    var canvas = document.getElementById("canvas1");
    
    var upload = document.getElementById('uploadButton1');
    upload.style.display = "none";
    $('#takeButton1').click(function(){
        upload.style.display = "block";
    });
    $('#uploadImage1').click(function(){
        upload.style.display = "block";
    });

    $('#uploadButton1').click(function(){
        uploadFromCanvas();
        disableCamera(vid,
            document.getElementById("takeButton1"),
            document.getElementById("redoButton1"),
            document.getElementById('uploadImage1'));
        goToPreviousPage();
    });
    $('#cancelButton1').click(function(){
        disableCamera(vid,
            document.getElementById("takeButton1"),
            document.getElementById("redoButton1"),
            document.getElementById('uploadImage1'));
        goToPreviousPage();
    });
    


    function uploadFromCanvas(){
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            url: "/savePhoto",
            data: JSON.stringify({image: canvas.toDataURL("image/png")}),
            success: function(){
                
                alert("uploader");
            }
        });
    }
})();