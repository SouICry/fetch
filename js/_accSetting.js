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
                email: $("#accsetting_email").val(),
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
            
            $("#accsetting_full_name").val(data.full_name).siblings().addClass("active");
            $("#accsetting_email").val(data.email).siblings().addClass("active");
            $("#accsetting_phone").val(data.phone).siblings().addClass("active");
            $("#accsetting_street").val(data.street).siblings().addClass("active");
            $("#accsetting_city").val(data.city).siblings().addClass("active");
            $("#accsetting_state").val(data.state).siblings().addClass("active");
            $("#accsetting_zip").val(data.zip).siblings().addClass("active");
            var str = data.full_name.split(" ", 1);
            document.getElementById("index_user-name").innerHTML = str;

        },
        onPageLoad: function(data) {
            loadAccountData();
        }
    };

    $("#accsetting_warning").hide();

    // when user is typing, hides warning
    $('#accsetting_full_name, #accsetting_email, #accsetting_phone, #accsetting_street, ' +
        '#accsetting_city, #accsetting_state, #accsetting_zip').keypress(function () {
        $("#accsetting_warning").hide();
    });

    // when user clicks, sends data and takes user to homepage
    // if any field is empty, warning shows up
    $("#accsetting_submit_info").click(function () {
        var fullName = $('#accsetting_full_name').val();
        var email = $('#accsetting_email').val();
        var phone = $('#accsetting_phone').val();
        var street = $('#accsetting_street').val();
        var city =$('#accsetting_city').val() ;
        var state = $('#accsetting_state').val();
        var zip = $('#accsetting_zip').val();
        if ((fullName == '') || (email == '') || (phone == '')
            || (street == '') || (city == '') || (state == '')
            || (zip == '')){
            $("#accsetting_warning").show();
            if (($('#accsetting_full_name').val() == '')){
                $("#accsetting_full_name_parent").addClass("has-error");
            }
            else {
                $("#accsetting_full_name_parent").removeClass("has-error");
            }
            if (($('#accsetting_email').val() == '')){
                $("#accsetting_email_parent").addClass("has-error");
            }
            else {
                $("#accsetting_email_parent").removeClass("has-error");
            }
            if (($('#accsetting_phone').val() == '')){
                $("#accsetting_phone_parent").addClass("has-error");
            }
            else {
                $("#accsetting_phone_parent").removeClass("has-error");
            }
            if (($('#accsetting_street').val() == '')){
                $("#accsetting_street_parent").addClass("has-error");
            }
            else {
                $("#accsetting_street_parent").removeClass("has-error");
            }
            if (($('#accsetting_city').val() == '')){
                $("#accsetting_city_parent").addClass("has-error");
            }
            else {
                $("#accsetting_city_parent").removeClass("has-error");
            }
            if (($('#accsetting_state').val() == '')){
                $("#accsetting_state_parent").addClass("has-error");
            }
            else {
                $("#accsetting_state_parent").removeClass("has-error");
            }
            if ((zip == '')){
                $("#accsetting_zip_parent").addClass("has-error");
            }
            else {
                $("#accsetting_zip_parent").removeClass("has-error");
            }
        }
        else {
            $("#accsetting_full_name_parent").removeClass("has-error");
            $("#accsetting_email_parent").removeClass("has-error");
            $("#accsetting_phone_parent").removeClass("has-error");
            $("#accsetting_street_parent").removeClass("has-error");
            $("#accsetting_city_parent").removeClass("has-error");
            $("#accsetting_state_parent").removeClass("has-error");
            $("#accsetting_zip_parent").removeClass("has-error");

            goToPage("_homePage");
            sendAccountData();

        }
    });
})();

//loadAccountData();
function sendAccountData() {

    var info_to_send = loader._accSetting.getData();
    info_to_send.type = "send";

    //Simulation (alert or console.log to check for yourself)

    //Actual
    $.ajax({
        type: "POST",
        url: "/_accSetting",
        data: info_to_send,
        success: function (data) {
            //data is the object sent back on success (could also just be string)
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

            var str= data.email;
            var nameParts = str.split("@");
            var name = nameParts.length==2 ? nameParts[0] : null;
            if(UrlExists('images/profiles/' + name + '.png')) {
                document.getElementById("accSettingAbove-img").src = 'images/profiles/' + name + '.png';
                document.getElementById("index-image-user").src = 'images/profiles/' + name + '.png';
            }
            else {
                document.getElementById("accSettingAbove-img").src = 'placeholder/person4.png';
                document.getElementById("index-image-user").src = 'placeholder/person4.png';
            }
        },
        error: function (data) {
            //data is the object send back on fail (could also just be string)
        }
    });

}



