/**
 * Created by allenord on 5/30/16.
 */
var test_data = {
    full_name: "Donkey Punch",
    items: ["aa", "bb", "cc", "dd"],
    contact: 1234567890,
    special_note: "cheap"
};

(function () {
    loader._purchasedTickets = {
        version: 0,
        getData: function () {
            var packData = {
                contact: $("#phone").substring(8),
                full_name: fullName,
                items: array,
                //special_note: data.special_note
            };

            return packData;
        },
        onPageLoad: function() {
            assholes666();
        },
        loadData: function (data) {
            //populate driver list
            $("#listName").text(" ");
            $("#phone").text(" ");
            $("ul").empty();
            $("#purchasedTickets_numItems").text(" ");
            $("#purchasedTickets_note").val(" ");

            fullName = data.full_name;
            array = data.items;
            var name = data.full_name;

            //create the contact info(where should I got this, is there a flied relates to contact?
            document.getElementById("listName_purchasedTickets").innerHTML = name + "'s Shopping List";
            document.getElementById("phone").innerHTML = "Phone: " + data.contact;
            $("#purchasedTickets_note").val(data.special_note).siblings().addClass("active");

            for (var i = 0; i < array.length; i++) {
                // item count
                count = array.length;

                // Create the list item:
                var newItem = document.createElement('li');
                newItem.innerHTML = array[i];
                newItem.className = 'driverItem';
                //newItem.id = array[i];
                $('#purchasedTickets_list').prepend(newItem);

                if (count == 1) {
                    $("#purchasedTickets_numItems").text("1 item left");
                }
                else {
                    $("#purchasedTickets_numItems").text(count + " items left");
                }

                if (count != 0) {
                    $("#purchasedTickets_footerInfo").show();
                }
                else {
                    $("#purchasedTickets_footerInfo").hide();
                }
            }

            // for(var j = 0; j < arrayCheckedOff.length; j++){
            //     var selector =  "#" + arrayCheckedOff[j];
            //     $(selector).toggleClass("selected");
            // }
        }
    };

    var count = 0;
    //var count = data.items.length - arrayCheckedOff.length;
    var fullName = "";
    var array = [];

    $(document).on('click', '.purchasedTicketsItem',function () {

        $(this).toggleClass("selected");

        var arr = [];
        //arrayCheckedOff = [];
        $('.purchasedTicketsItem.selected').each(function () {
            arr.push($(this).text());
            //arrayCheckedOff.push($(this).text());
        });

        if ((count - arr.length) === 1) {
            $("#purchasedTickets_numItems").text("1 item left");
        }
        else {
            $("#purchasedTickets_numItems").text((array.length - arr.length) + " items left");
        }
    });

    $("#purchasedTickets_submit_list").click(function () {
        var arr = [];
        $('.purchasedTicketsItem.selected').each(function () {
            arr.push($(this).text());
        });

        var flag;
        if (arr.length != count) {
            if ((count - arr.length) === 1) {
                flag = confirm("You still have " + (count - arr.length) + " item left in the" +
                    " shopping list, Are you sure to finish shopping now?");
            }
            else {
                flag = confirm("You still have " + (count - arr.length) + " items left in the" +
                    " shopping list, Are you sure to finish shopping now?");
            }
        }

        if (arr.length === count || flag === true) {
            assholes61323355();
            goToPage("_congratsTicketClosed");
        }
    });

    assholes666();

    // Used after click submit, update the grocery ticket for the users
    function assholes61323355() {
        var info_to_send = {};
        info_to_send.ticketId = loader._purchasedTickets.data;
        //alert(info_to_send.ticketId);
        info_to_send.type = 'send';

        $.ajax({
            type: "POST",
            url: "/_purchasedTickets",
            data: info_to_send,
            success: function (data) {
                alert('success!!!!!');
                //data is the object sent back on success (could also just be string)
                //loader._driverList.loadData(data);
            },
            error: function (data) {
                //data is the object send back on fail (could also just be string)
            }
        });
    }

    // Used to get data from db
    function assholes666() {
        var info_to_send = {};
        info_to_send.ticketId = loader._purchasedTickets.data;
        //alert(info_to_send.ticketId);
        info_to_send.type = 'send';

        $.ajax({
            type: "POST",
            url: "/purchasedTicketsUpdate",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(info_to_send),
            success: function (data) {
                //data is the object sent back on success (could also just be string)
                loader._purchasedTickets.loadData(data);
            },
            error: function (data) {
                //data is the object send back on fail (could also just be string)
            }
        });
    }
})();