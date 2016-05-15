function _checkout() {

    var _checkout = {
        special_notes:"",
        time1:"",
        time2:""
    };

    $('#submitcheckout').click(function () {

        temp = document.getElementById("#time1");
        _checkout.time1 = temp.options[temp.options[temp.selectedIndex].value];

        if (_checkout != {
                special_notes:"",
                time1:"",
                time2:""
            }) {
            sendToServer();
        }

        loader.next();
    });

    function sendToServer(){
        var info_to_send = {};
        info_to_send.id = $('#user-name').data('id');
        info_to_send.notesTime = _checkout;
        info_to_send.type = "send";

        //Simulation (alert or console.log to check for yourself)
        alert(JSON.stringify(info_to_send));

        //Actual
        $.ajax({
            type: "POST",
            url: "/_checkout",
            data: info_to_send,
            success: function(data){
                //data is the object sent back on success (could also just be string)
                alert("Congrats!");
            },
            fail: function(data){
                //data is the object send back on fail (could also just be string)
            }
        });
    }
}

checkout();