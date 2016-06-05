(function () {
    loader._checkout = {
        data: "", //Optional
        version: 0, //Must be 0
        getData: function () { //must be null if not needed
            var checkout_isSelected = $('input[name="special_notes"]:checked', '#checkout_notes').val();
            _checkout.checkout_notes = checkout_isSelected;
            _checkout.checkout_id = $('#checkout_notes').find(':checked').attr("id");
            return _checkout;
        },
        loadData: function (data) {
            if (data == null) {
                $('input[name=special_notes]').prop('checked', false);
                $("#checkout_warning").hide();
            }
            else {

                // NO NEED BCAUSE NEVER HAS TO LOAD DATA FROM PREV 
                // $('input[name="specialnotes"]:checked', '#checkout_notes').val(data.checkout_notes);
                // $("#checkout_time1").val(data.checkout_range1);
                // $("#checkout_time2").val(data.checkout_range2);

                //NEEDED FOR SYNC
                $('input[name="specialnotes"]:checked', '#checkout_notes').val(data.checkout_notes);
                document.getElementById(data.checkout_id).click();

            }
        }
    };
    $("#checkout_warning").hide();


    var _checkout = {
        checkout_id: "",
        checkout_notes: ""
    };


    //loader._checkout.loadData(_checkout);

    $('#checkout_submitcheckout').click(function () {
        goToPage('_deliveryTime');
    });

    $('#checkout-back').click(function() {
        $("#checkout_warning").hide();
        goToPage('_shopping');
    });


    $('#checkout_close').click(function () {
      //  loader.payment.simulateCancelPayment();

        loader._checkout.loadData(null);
        loader._deliveryTime.loadData(null);
        loader._shopping.loadData(null);

        goToPage("_homePage");
    });

    $('#checkout_notes').click(function (event) {

        loader._checkout.version++;
    });
})();

