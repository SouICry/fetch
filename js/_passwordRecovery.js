/**
 * 
 * Created by tylercuddy on 5/15/16.
 */

(function() {
    loader._passwordRecovery= {
        data:"", //Optional
        version: 0, //Must be 0
        getData:null,
        loadData: null,
    };

    $("#passRecovery_submit_email ").prop("disabled", true);


    $("#passRecovery_email").keyup(function () {

        if ($('#passRecovery_email').val()) {
            $("#passRecovery_submit_email ").prop("disabled", false);
        }
        if (!$('#passRecovery_email').val()) {
            $("#passRecovery_submit_email ").prop("disabled", true);
        }
    });

    $('#passRecovery_submit_email').click(function () {
        passRecovery_sendToServer();
    });


    function passRecovery_sendToServer() {
        var info_to_send = {};
        info_to_send.email = $('#passRecovery_email').val();
        ;
        info_to_send.type = "send";

        //Simulation (alert or console.log to check for yourself)
        alert(JSON.stringify(info_to_send));

        //Actual
        $.ajax({
            type: "POST",
            url: "/_passwordRecovery",
            data: info_to_send,
            success: function (data) {
                //data is the object sent back on success (could also just be string)

            },
            error: function (data) {
                //data is the object send back on fail (could also just be string)
            }
        });
    }
})();