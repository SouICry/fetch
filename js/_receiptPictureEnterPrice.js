/**
 * Created by juneruijiang on 5/26/16.
 */
(function() {
    loader._receiptPictureEnterPrice = {

        onPageLoad: function(){
            enableImageUpload(null, canvas, null, null, document.getElementById('uploadReceipt1'));
        },
        onPageLeave: function(){
            disableImageUpload(document.getElementById('uploadReceipt1'));
        }
    };

    var vid = document.getElementById("receipt_video1");
    var canvas = document.getElementById("receipt_canvas1");

    var upload = document.getElementById('submitReceiptButton1');
    upload.style.display = "none";
    $('#uploadReceipt1').click(function(){
        upload.style.display = "block";
    });
    
    // jQuery.fn.extend({
    //     disable: function(state) {
    //         return this.each(function() {
    //             this.disabled = state;
    //         });
    //     }
    // });

    $('#submitReceiptButton1').click(function(){
        uploadPriceReceipt();
        goToPage("_congrats_driver_finish_shopping");
    });
    $('#cancelRecButton1').click(function(){
        goToPage("_congrats_driver_finish_shopping");
    });

    $("#enter_price_receipt").keyup(function(){

        if(!isNaN($("#enter_price_receipt").val()) && $("#enter_price_receipt").val() != "" ){

            if($("#submitReceiptButton1").hasClass('disabled')) {
                $("#submitReceiptButton1").removeClass("disabled");
            }
        }
        else{
            $("#submitReceiptButton1").addClass('disabled');
        }
    });
    // if(!isNAN($("#enter_price_receipt").val()) ){
    //
    //     $('#submitReceiptButton1').prop('disabled', false);
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
            },
            error: function (data) {
            //data is the object send back on fail (could also just be string)
        }
        });
    }
})();