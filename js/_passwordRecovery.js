/**
 * 
 * Created by tylercuddy on 5/15/16.
 */



$("#submit_btn ").prop("disabled", true);


$("#eMail").keyup(function(){

    if($('#eMail').val()){
        $("#submit_btn ").prop("disabled", false);
    }
    if(!$('#eMail').val()){
        $("#submit_btn ").prop("disabled", true);
    }
});

$('#submit_btn').click(function () {
        sendToServer();
});


function sendToServer() {
    var info_to_send = {};
    info_to_send.email = $('#eMail').val();;
    info_to_send.type = "send";

    //Simulation (alert or console.log to check for yourself)
    alert(JSON.stringify(info_to_send));

    //Actual
    $.ajax({
        type: "POST",
        url: "/_rating",
        data: info_to_send,
        success: function (data) {
            //data is the object sent back on success (could also just be string)
            alert("congrats!");
        },
        fail: function (data) {
            alert("congrats!");
            //data is the object send back on fail (could also just be string)
        }
    });
}