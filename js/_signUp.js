

$('#signup').prop('disabled',true);
$('#Email,#user-name,#pass,#re-pass').keyup(function(){
    if($('#user-name').val()&& $('#pass').val()&& $('#Email').val()&& $('#re-pass').val() && $('#phone').val() && ($('#pass').val() == $('#re-pass').val())) {
        $('#signup').prop('disabled',false);

    }
    else{
        $('#signup').prop('disabled',true);
    }
});
$('#signup').click(function () {
    sendToServer();
});

function sendToServer(){
    var info_to_send = {};
    info_to_send.email= $('#Email').val()
    info_to_send.full_name = $('#user-name').val();
    info_to_send.password = $('#pass').val();
    info_to_send.phone_number = $('#phone').val();
    info_to_send.type = "get";

    //Simulation (alert or console.log to check for yourself)
    //alert(JSON.stringify(info_to_send));

    //Actual
    $.ajax({
        type: "POST",
        url: "/_signUp",
        data: info_to_send,
        success: function(data){
            //data is the object sent back on success (could also just be string)
            alert(JSON.stringify(data));
            window.location.href = "/_homePage.html";
        },
        error: function(data){
            alert('error');
            //data is the object send back on fail (could also just be string)
        }
    });
}



