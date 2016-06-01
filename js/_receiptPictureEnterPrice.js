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
        goToPage('_driverList');
    });

    var price;

    $("#enter_price_receipt").keyup(function(){
        price = $("#enter_price_receipt").val();
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

    // TODO: Backend implementation of this. Everything in app.post(updatePurchasedTickets) should be
    // moved to app.post(uploadPriceReceipt).
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
                // alert("uploader");
            },
            error: function (data) {
            //data is the object send back on fail (could also just be string)
        }
        });
    }

    $('#submitReceiptButton1').click(function() {
        loader.price = price;
        assholes61323355();
        goToPage("_congrats_driver_finish_shopping");
    });

    // Used after click submit, update the grocery ticket in the users collection for shopper and driver
    function assholes61323355() {
        var info_to_send = {};
        info_to_send.ticketId = loader._driverList.data;
        //alert(info_to_send.ticketId);
        info_to_send.type = 'send';

        $.ajax({
            type: "POST",
            url: "/_driverList",
            data: info_to_send,
            success: function (data) {
                //data is the object sent back on success (could also just be string)
                //loader._driverList.loadData(data);
            },
            error: function (data) {
                //data is the object send back on fail (could also just be string)
            }
        });
    }
})();