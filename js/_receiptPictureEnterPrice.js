/**
 * Created by juneruijiang on 5/26/16.
 */
(function() {
    loader._receiptPictureEnterPrice = {

        onPageLoad: function(){
            upload.style.display = "none";
            enableImageUpload(null, canvas, null, null, document.getElementById('uploadReceipt1'));
        },
        onPageLeave: function(){
            disableImageUpload(document.getElementById('uploadReceipt1'));
        }
    };
    
    //var vid = document.getElementById("receipt_video1");
    var canvas = document.getElementById("receipt_canvas1");

    var upload = document.getElementById('submitReceiptButton1');
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
        var price = $("#enter_price_receipt").val();
        var subButton = $("#submitReceiptButton1");
        if(!isNaN(price) && price != "" ){

            if(subButton.hasClass('disabled')) {
                subButton.removeClass("disabled");
            }
        }
        else{
            subButton.addClass('disabled');
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
        };
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