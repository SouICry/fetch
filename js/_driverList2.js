/**
 * Created by tylercuddy on 5/17/16.
 */
/**
 * Created by tylercuddy on 5/17/16.
 */




_driving();

function _driving() {
    // item count
    var count = 0;
    
    var simulated_user = {
        id: 1234567,
        name: "Gary",
        items: ["aa", "bb", "cc", "dd"],
        contact: 1234567890
    };

    displayLoadedData(simulated_user);

    function displayLoadedData(data) {
        document.getElementById("listName").innerHTML = data.name + "'s Shopping List";
        document.getElementById("phone").innerHTML = data.contact;
    }

    $("#footerInfo, #footerBars").show();

    makeList(simulated_user.items);

    function makeList(array) {
        //populate driver list
        for (var i = 0; i < array.length; i++) {
            // Create the list item:
            var newItem = document.createElement('li');
            newItem.innerHTML = array[i];
            newItem.className = 'item';
            $('#list').prepend(newItem);
            count++;
            if (count == 1) {
                $("#numItems").text("1 item left");
            }
            else {
                $("#numItems").text(count + " items left");
            }

            if (count != 0) {
                $("#footerInfo, #footerBars").show();
            }
            else {
                $("#footerInfo,#footerBars").hide();
            }
        }
    }

    $(document).on('click', '.item',function () {

        $(this).toggleClass("selected");

        arr = [];
        $('.item.selected').each(function () {
            arr.push($(this).text());
        });

        if ((count - arr.length) === 1) {
            $("#numItems").text("1 item left");
        }
        else {
            $("#numItems").text((count - arr.length) + " items left");
        }
    });

    $("#submit_list").click(function () {
        arr = [];
        $('.item.selected').each(function () {
            arr.push($(this).text());
        });

        if (arr.length != count) {
            if ((count - arr.length) === 1) {
                var flag = confirm("You still have " + (count - arr.length) + " item left in the" +
                    " shopping list, Are you sure to finish shopping now?");
            }
            else {
                var flag = confirm("You still have " + (count - arr.length) + " items left in the" +
                    " shopping list, Are you sure to finish shopping now?");
            }
        }

        if (arr.length === count || flag === true) {
            alert("Success! Your customer will be notified soon.");
        //     sendToServer();
        }
    });

}

function sendToServer(){
    var info_to_send = {};
    // info_to_send.id = $('#user-name').data('id');
    info_to_send.list = _shopping;
    info_to_send.type = "send";

    //Simulation (alert or console.log to check for yourself)
    alert(JSON.stringify(simulated_user));


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

