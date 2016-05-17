function _shopping() {
    // item count
    var count = 0;

    var _shopping = [];

    $("#footerInfo, #footerBars").hide();

    //press enter
    $('#add-shopping-item').submit(function () {
        if ($('input[name=checkListItem]').val() !== '') {
            toAdd = $('input[name=checkListItem]').val();
            var newItem = document.createElement('li');
            newItem.innerHTML = toAdd;
            newItem.className = 'item'

            $('#list').prepend(newItem);
            count++;
            if (count == 1) {
                $("#numItems").text("1 item");
            }
            else {
                $("#numItems").text(count + " items");
            }

            if (count != 0) {
                $("#footerInfo, #footerBars").show();
            }
            else {
                $("#footerInfo,#footerBars").hide();
            }
        }
        ;
        $('input[name=checkListItem]').val('');
        $('#input').focus();

        _shopping.push(toAdd);

        return false;
    });

    // remove item
    $(document).on('click', '.item', function () {
        $(this).remove();

        count--;
        if (count == 1) {
            $("#numItems").text("1 item");
        }
        else if (count == 0) {
            $("#numItems").text("");
        }
        else {
            $("#numItems").text(count + " items");
        }

        if (count != 0) {
            $("#footerInfo, #footerBars").show();
        }
        else {
            $("#footerInfo, #footerBars").hide();
        }

        var index = _shopping.indexOf($(this).text());

        if (index > -1) {
            _shopping.splice(index, 1);
        }

        console.log($(this).text());
    });


    $('#submit_list').click(function () {
        if (_shopping != []) {
            sendToServer();
        }
        loader.next();
    });

    function sendToServer(){
        var info_to_send = {};
        info_to_send.id = $('#user-name').data('id');
        info_to_send.list = _shopping;
        info_to_send.type = "send";

        //Simulation (alert or console.log to check for yourself)
        alert(JSON.stringify(info_to_send));

        //Actual
        $.ajax({
            type: "POST",
            url: "/_shopping",
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

_shopping();


