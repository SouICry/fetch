(function () {
    loader._checkout = {
        data: "", //Optional
        version: 0, //Must be 0
        getData: function () { //must be null if not needed
            _checkout.checkout_notes = $('input[name="specialnotes"]:checked', '#checkout_notes').val();
            _checkout.checkout_range1 = $("#checkout_time1").val();
            _checkout.checkout_range2 = $("#checkout_time2").val();
            return _checkout;
        },
        loadData: function (data) {
            if (data != "none") {
                $('input[name="specialnotes"]:checked', '#checkout_notes').val(data.checkout_notes);
                $("#checkout_time1").val(data.checkout_range1);
                $("#checkout_time2").val(data.checkout_range2);
            }
            else {
                $('input[name="specialnotes"]:checked', '#checkout_notes').val("");
                $("#checkout_time1").val("");
                $("#checkout_time2").val("");
            }
        }
    };


    var _checkout = {
        checkout_notes: "",
        checkout_range1: "",
        checkout_range2: ""
    };

    loader._checkout.loadData(_checkout);

    $('#checkout_submitcheckout').click(function () {

        var valid = false;

        _checkout.checkout_notes = $('input[name="specialnotes"]:checked', '#checkout_notes').val();
        _checkout.checkout_range1 = $("#checkout_time1").val();
        _checkout.checkout_range2 = $("#checkout_time2").val();

        index1 = $("#checkout_time1").prop('selectedIndex');

        if ($("#checkout_time1").prop('selectedIndex') < $("#checkout_time2").prop('selectedIndex')) {
            valid = true;
        }


        if (valid == true) {
            // var info_to_send = {};
            // info_to_send.ticketId: _checkout.checkout_range;
            // info_to_send.available_time_end: _checkout.checkout_range1;
            // info_to_send.available_time_end: _checkout.checkout_range2;
            // info
            // info_to_send.type = "send";

            //Simulation (alert or console.log to check for yourself)
            //alert(JSON.stringify(info_to_send));

            //Actual
            $.ajax({
                type: "POST",
                url: "/_checkout",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    list: loader._shopping.getData(),
                    store_name: loader.store,
                    options: loader._checkout.getData()
                }),
                success: function (data) {
                    //data is the object sent back on success (could also just be string)
                    alert("Congrats!");
                },
                error: function (data) {
                    //data is the object send back on fail (could also just be string)
                }
            });
            //goToPage("_pendingPayment");

        }
        else {
            confirm("Enter a valid valid time range.");
        }
        // go to paypal to set up payment
        // on successful payment, goes to _submitted
        // unsuccessful goes to _cancelled

        //loader.payment.triggerPayment();
    });


    $('#checkout_close').click(function () {
        goToPage("_homePage");
    });


})();
