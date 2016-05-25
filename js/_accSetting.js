// User enters account information.
// First, data is loaded into data field if there is data, otherwise input fields are empty
(function () {
    loader._accSetting = {
        data: {
            full_name: "Jeanette Phung", email: "jeanettephung@hotmail.com", phone: "(626)443-5688",
            street: "Gage Ave.", state: "CA", city: "El Monte", zip: 91731
        },
        version: 0, //Must be 0 
        getData: function () {
            return _account;
        },
        loadData: function (data) {
            $("#accsetting_full_name").val(data.full_name);
            $("#accsetting_email").val(data.email);
            $("#accsetting_phone").val(data.phone);
            $("#accsetting_street").val(data.street);
            $("#accsetting_city").val(data.city);
            $("#accsetting_state").val(data.state);
            $("#accsetting_zip").val(data.zip);
        }
    };
    // contains data to send
    var _account;
    $("#accsetting_warning").hide();

    // when user is typing, hides warning
    $('#accsetting_full_name, #accsetting_email, #accsetting_phone, #accsetting_street, ' +
        '#accsetting_city, #accsetting_state, #accsetting_zip').keypress(function () {
        $("#accsetting_warning").hide();
    });

    // when user clicks, sends data and takes user to homepage
    // if any field is empty, warning shows up
    $("#accsetting_submit_info").click(function () {
        _account = {
            full_name: $('#accsetting_full_name').val(),
            email: $('#accsetting_email').val(),
            phone: $('#accsetting_phone').val(),
            street: $('#accsetting_street').val(),
            city: $('#accsetting_city').val(),
            state: $('#accsetting_state').val(),
            zip: $('#accsetting_zip').val()
        };

        if ($('#accsetting_full_name, #accsetting_email, #accsetting_phone, #accsetting_street, ' +
                '#accsetting_city, #accsetting_state, #accsetting_zip').val() != '') {
            goToPage("_homePage");
        }
        else {
            $("#accsetting_warning").show();
        }
    });
})();


// var _account = {};
//
// $('#accsetting_submit_info').click(function () {
//     asshole3();
// });


// function asshole3() {
//     _account = {
//         full_name: $('#accsetting_full_name').val(),
//         email: $('#accsetting_email').val(),
//         phone: $('#accsetting_phone').val(),
//         address: {
//             street: $('#accsetting_street_').val(),
//             city: $('#accsetting_city').val(),
//             state: $('#accsetting_state').val(),
//             zip: $('#accsetting_zip').val()
//         }
//     }
//     var info_to_send = {};
//     info_to_send.user = _account;
//     info_to_send.type = "send";
//
//     //Simulation (alert or console.log to check for yourself)
//     alert(JSON.stringify(info_to_send));
//
//     //Actual
//     $.ajax({
//         type: "POST",
//         url: "/_accSetting", //TODO is this should be accountSetting post,
//         data: info_to_send,
//         success: function (data) {
//             //data is the object sent back on success (could also just be string)
//             alert("Congrats!");
//
//         },
//         error: function (data) {
//             //data is the object send back on fail (could also just be string)
//         }
//     });
// }



