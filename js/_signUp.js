

$('#signUp-email').prop('disabled',true);
$('#User-Email,#signUp-user-name,#User-pass,#re-pass').keyup(function(){
    if($('#signUp-user-name').val()&& $('#pass').val()&& $('#User-Email').val()&& $('#re-pass').val() && $('#phone').val() && ($('#User-pass').val() == $('#re-pass').val())) {
        $('#signup').prop('disabled',false);

    }
    else{
        $('#signUp').prop('disabled',true);
    }
});

$('#signUp').click(function () {
    assholes2();
});

function assholes2() {
    var info_to_send = {};
    info_to_send.email= $('#User-Email').val()
    info_to_send.full_name = $('#signUp-user-nameuser').val();
    info_to_send.password = $('#User-pass').val();
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
        },
        error: function(data){
            alert('error');
            //data is the object send back on fail (could also just be string)
        }
    });
}



