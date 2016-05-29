/**
 * Created by juneruijiang on 5/26/16.
 */
(function() {
    loader._receiptPictureEnterPrice = {
        getData: null,
        loadData: null,
        onPageLoad: function(){
            function beforeTake() {
                canvas.height = vid.offsetHeight;
                canvas.width = canvas.height;
            }
            enableCameraImage(vid, canvas,
                document.getElementById("takeReceiptButton1"),
                document.getElementById("redoReceiptButton1"),
                document.getElementById('uploadReceipt1'),
                0, beforeTake); //0 front cam, 1 back cam if available


        },
        onPageLeave: function(){
            disableCamera(vid);
        }
    };

    var vid = document.getElementById("receipt_video1");
    var canvas = document.getElementById("receipt_canvas1");

    $('#uploadReceiptButton1').click(function(){
        disableCamera(vid);
        uploadFromCanvas();
        goToPage("_congrats_driver_finish_shopping");
    });


    function uploadFromCanvas(){
        var data_to_send = {
            image: canvas.toDataURL("image/png"),
            price: $("enter_price").val,
            ticket: loader.ticketId
        }
        $.ajax({
            type: "POST",
            url: "/savePhoto",
            data: data_to_send,
            success: function(){
                alert("uploader");
            }
        });
    }
})();