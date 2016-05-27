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
            return {
                full_name: $("#accsetting_full_name").val(),
                email : $("#accsetting_email").val(),
                phone: $("#accsetting_phone").val(),
                street: $("#accsetting_street").val(),
                city: $("#accsetting_city").val(),
                state: $("#accsetting_state").val(),
                zip: $("#accsetting_zip").val()

        };
        },
        loadData: function (data) {
            if (!data) {
                alert('NO DATA TO LOAD');
            }
            // document.getElementById('accsetting_full_name').innerHTML = data.full_name;
            $("#accsetting_full_name").val(data.full_name);
            $("#accsetting_email").val(data.email);
            $("#accsetting_phone").val(data.phone);
            $("#accsetting_street").val(data.street);
            $("#accsetting_city").val(data.city);
            $("#accsetting_state").val(data.state);
            $("#accsetting_zip").val(data.zip);
        }
    };


    //loadAccountData();

    $("#accsetting_warning").hide();

    // when user is typing, hides warning
    $('#accsetting_full_name, #accsetting_email, #accsetting_phone, #accsetting_street, ' +
        '#accsetting_city, #accsetting_state, #accsetting_zip').keypress(function () {
        $("#accsetting_warning").hide();
    });

    // when user clicks, sends data and takes user to homepage
    // if any field is empty, warning shows up
    $("#accsetting_submit_info").click(function () {

        sendAccountData();

        if ($('#accsetting_full_name, #accsetting_email, #accsetting_phone, #accsetting_street, ' +
                '#accsetting_city, #accsetting_state, #accsetting_zip').val() != '') {
            goToPage("_homePage");
        }
        else {
            $("#accsetting_warning").show();
        }
    });
})();

loadAccountData();
function sendAccountData() {

    var info_to_send = {};
    info_to_send.full_name = $('#accsetting_full_name').val();
    info_to_send.email = $('#accsetting_email').val();
    info_to_send.phone = $('#accsetting_phone').val();
    info_to_send.street = $('#accsetting_street').val();
    info_to_send.city = $('#accsetting_city').val();
    info_to_send.state = $('#accsetting_state').val();
    info_to_send.zip = $('#accsetting_zip').val();
    info_to_send.type = "send";

    //Simulation (alert or console.log to check for yourself)
    alert(JSON.stringify(info_to_send));

    //Actual
    $.ajax({
        type: "POST",
        url: "/_accSetting",
        data: info_to_send,
        success: function (data) {
            //data is the object sent back on success (could also just be string)
            alert("Congrats!");


        },
        error: function (data) {
            //data is the object send back on fail (could also just be string)
        }
    });
}
    
function loadAccountData() {
    $.ajax({
        type: "POST",
        url: "/_accSetting",
        data: {type: 'loadAccSetting'},
        success: function (data) {
            //data is the object sent back on success (could also just be string)
            loader._accSetting.loadData(data);
            alert("Congrats!")

        },
        error: function (data) {
            //data is the object send back on fail (could also just be string)
        }
    });
}



