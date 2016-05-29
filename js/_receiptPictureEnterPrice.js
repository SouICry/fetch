/**
 * Created by juneruijiang on 5/26/16.
 */
(function() {
    loader._receiptPictureEnterPrice = {
        // onPageLoad: function(){
            // function beforeTake() {
            //     canvas.height = vid.offsetHeight;
            //     canvas.width = canvas.height;
            // }
            // enableCameraImage(vid, canvas,
            //     document.getElementById("takeReceiptButton1"),
            //     document.getElementById("redoReceiptButton1"),
            //     document.getElementById('uploadReceipt1'),
            //     0, beforeTake); //0 front cam, 1 back cam if available


        // },
        // onPageLeave: function(){
        //     disableCamera(vid);
        // }
    };

    var vid = document.getElementById("receipt_video1");
    var canvas = document.getElementById("receipt_canvas1");

    // jQuery.fn.extend({
    //     disable: function(state) {
    //         return this.each(function() {
    //             this.disabled = state;
    //         });
    //     }
    // });
    $('#uploadReceiptButton1').prop('disabled', true);

    $('#uploadReceiptButton1').click(function(){
        // disableCamera(vid);
        uploadFromCanvas();
        goToPage("_congrats_driver_finish_shopping");
    });

    // if($("#enter_price").val() >= 0){
    //     // $("#uploadReceiptButton1").disable(false);
    //     $('#uploadReceiptButton1').prop('disabled', false);
    // }

    function uploadFromCanvas(){
        $.ajax({
            type: "POST",
            url: "/savePhoto",
            data: canvas.toDataURL("image/png"),
            success: function(){
                alert("uploader");
            }
        });
    }
})();