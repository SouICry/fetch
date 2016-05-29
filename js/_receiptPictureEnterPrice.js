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

    $('#uploadReceiptButton1').click(function(){
        uploadPriceReceipt();
        goToPage("_congrats_driver_finish_shopping");
    });

    $("#enter_price_receipt").keyup(function(){

        if(!isNaN($("#enter_price_receipt").val()) && $("#enter_price_receipt").val() != "" ){

            if($("#uploadReceiptButton1").hasClass('disabled')) {
                $("#uploadReceiptButton1").removeClass("disabled");
            }
        }
        else{
            $("#uploadReceiptButton1").addClass('disabled');
        }
    });
    // if(!isNAN($("#enter_price_receipt").val()) ){
    //
    //     $('#uploadReceiptButton1').prop('disabled', false);
    // }

    function uploadPriceReceipt(){
        var data_to_send = {
            image: canvas.toDataURL("image/png"),
            price: $("enter_price").val,
            ticket: loader.ticketId
        }
        alert(JSON.stringify(data_to_send));
        $.ajax({
            type: "POST",
            url: "/_receiptPictureEnterPrice",
            data: JSON.stringify(data_to_send),
            success: function(){
                alert("uploader");
            }
        });
    }
})();