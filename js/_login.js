(function() {
    loader._login = {
        data: "", //Optional
        version: 0, //Must be 0
        getData:null,
        loadData: null
    };
    var data;
    var errMessage = $("#message");
    var loginButt = $('#login_butt');
    console.log(errMessage);
    loginButt.prop('disabled', true);
    $('#login_user_email, #login_user_pass').keyup(function () {
        errMessage.html('');
        if ($('#login_user_email').val() && $('#login_user_pass').val()) {
            loginButt.prop('disabled', false);
        }
        else {
            loginButt.prop('disabled', true);
        }
    });

    loginButt.click(function () {
        assholes();
    });

    function assholes() {
        var info_to_send = {};
        info_to_send.email = $('#login_user_email').val();
        info_to_send.password = $('#login_user_pass').val();
        info_to_send.type = "get";

        //Simulation (alert or console.log to check for yourself)
        // alert(JSON.stringify(info_to_send));

        //Actual
        $.ajax({
                type: "POST",
                url: "/_login",
                data: info_to_send,
                success: function (data) {
                    //data is the object sent back on success (could also just be string)

                    loader.login(data);

                    //alert('data after login: ' + data.full_name);
                },
                error: function (data) {
                    //$(".input-field").effect("shake");
                    errMessage.html("***Invalid email or password***");
                    console.log("login failed");
                    //data is the object send back on fail (could also just be string)
                }
            }
        );
    }
})();




