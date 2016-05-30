(function () {
    loader._cancelTicket = {
        data: {full_name: "Pamela Anderson",
            items: ["aa","bb","cc","dd"],
            contact: 1000000000,
            special_note: "cheap"
        },
        version: 0, //Must be 0 
        getData: function () {
            var packedData = {
                full_name: data.full_name,
                items: data.items,
                contact: data.contact,
                special_note: data.special_note
            };
            return packedData;
        },
        loadData: function (data) {
            if (data == "none" || data.length == 0) {
                data = [];
            }

            else {

                $("#listName_cancelTicket").text(" ");
                $("#phone").text(" ");
                $("ul").empty();
                $("#_driver_numItems").text(" ");
                $("#driver_note").val(" ");

                var fullName = data.full_name;
                var array = data.items;

                //create the contact info(where should I got this, is there a flied relates to contact?
                document.getElementById("listName_cancelTicket").innerHTML = fullName + "'s Shopping List";
                document.getElementById("phone_cancelTicket").innerHTML = "Phone: " + data.contact;
                $("#cancelTicket_note").val(data.special_note).siblings().addClass("active");

                for (var i = 0; i < array.length; i++) {
                    // item count
                    count = array.length;

                    // Create the list item:
                    var newItem = document.createElement('li');
                    newItem.innerHTML = array[i];
                    newItem.className = 'cancelTicketItem';
                    //newItem.id = array[i];
                    $('#_cancelTicket_list').prepend(newItem);

                    if (count == 1) {
                        $("#_cancelTicket_numItems").text("1 item left");
                    }
                    else {
                        $("#_cancelTicket_numItems").text(count + " items left");
                    }

                    if (count != 0) {
                        $("#_cancelTicket_footerInfo").show();
                    }
                    else {
                        $("#_cancelTicket_footerInfo").hide();
                    }
                }

            }
        }
    };


    $('#cancelTicket_list_btn').click(function () {
        goToPage("_history");
    });

    $('#cancelTicket_cancel_btn').click(function () {
        goToPage("_history");
    });

})();

