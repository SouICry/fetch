_shopping();

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
            newItem.className = 'item';

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
            error: function(data){
                //data is the object send back on fail (could also just be string)
            }


        });
    }

    //Simulation:
    var simulated_user = {
        id: 1234567,
        name: "Bob",
        items: ["green eggs", "ham"],
    };
  //  displayLoadedData(simulated_user);

    function loadFromServer() {
        var request = {
            "type": "get",
            "data": null
        };

        $.ajax({
            type: "POST",
            url: "/_shopping",
            data: request,
            success: function (data) {
                //data is the object sent back on success (could also just be string)
                displayLoadedData(data);
            },
            error: function (data) {
                //data is the object send back on fail (could also just be string)
            }
        });
    }

    function displayLoadedData(data) {
        var arr = [];
        var items = data.items;
        for (var i = 0; i < items.length; i++) {
            toAdd = data.items[i];
            var newItem = document.createElement('li');
            newItem.innerHTML = toAdd;
            newItem.className = 'item';
            $("#list").append(newItem);

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
    }
}



