(function() {
    loader._signUp = {
        data: ["greenEggs", "ham"], //Optional
        version: 0, //Must be 0
        getData:null,
        loadData: null,
    };
    $('#signup_butt').prop('disabled', true);
    $('#signup_user_email,#signup_user_name,#signup_phone,#signup_user_pass,#signup_re_pass,#signup_address').keyup(function () {
        if ($('#signup_user_name').val() && $('#signup_user_pass').val() && $('#signup_address').val()&& $('#signup_user_email').val() && $('#signup_re_pass').val() && $('#signup_phone').val() && ($('#signup_user_pass').val() == $('#signup_re_pass').val())) {
            $('#signup_butt').prop('disabled', false);
        }
        else {
            $('#signup_butt').prop('disabled', true);
        }
    });

    $('#signup_butt').click(function () {
        assholes2();
    });

    function assholes2() {
        var info_to_send = {};
        info_to_send.email = $('#signup_user_email').val();
        info_to_send.full_name = $('#signup_user_name').val();
        info_to_send.password = $('#signup_user_pass').val();
        info_to_send.phone_number = $('#signup_phone').val();
        info_to_send.address = $('#signup_address').val();
        info_to_send.type = "get";

        //Simulation (alert or console.log to check for yourself)
        //alert(JSON.stringify(info_to_send));

        //Actual
        $.ajax({
            type: "POST",
            url: "/_signUp",
            data: info_to_send,
            success: function (data) {
                //data is the object sent back on success (could also just be string)
                loader.login(data);
            },
            error: function (data) {
                alert('error');
                //data is the object send back on fail (could also just be string)
            }
        });
    }
})();


