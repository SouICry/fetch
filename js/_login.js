
$('#login').prop('disabled',true);
$('#User-Email, #User-pass').keyup(function(){
    if($('#User-Email').val()&& $('#User-pass').val()) {
        $('#login').prop('disabled',false);
    }
    else{
        $('#login').prop('disabled',true);
    }
});
$('#login').click(function () {
    assholes();
});

function assholes() {
    var info_to_send = {};
    info_to_send.email = $('#User-Email').val();
    info_to_send.password = $('#User-pass').val();
    info_to_send.type = "get";

    //Simulation (alert or console.log to check for yourself)
    alert(JSON.stringify(info_to_send));

    //Actual
    $.ajax({
        type: "POST",
        url: "/_login",
        data: info_to_send,
        success: function(data){
            //data is the object sent back on success (could also just be string)
            goToPage('_homePage');
            alert("Congrats!");
        },
        error: function(data){
            alert("fail");
            //data is the object send back on fail (could also just be string)
        }
    });
}





