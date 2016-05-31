(function () {
    loader._viewTicket = {
        data: null,
        version: 0,
        getData: null,
        loadData: function (data) {
            ticketId = data._id;
            //populate driver list
            var numItems = $("#_viewTicket_numItems");
            $("#listName").text(" ");
            $("#_viewTicket ul").html("");
            var array = data.shopping_list;
            var separatedNames = data.shopper.full_name;

            for (var i = 0; i < array.length; i++) {
                // item count
                count = array.length;
                //create the contact info(where should I got this, is there a flied relates to contact?
                document.getElementById("listName").innerHTML = separatedNames + "'s Shopping List";
                document.getElementById("phone").innerHTML = "Phone: " + data.shopper.phone_number;
                // Create the list item:
                var newItem = document.createElement('li');
                newItem.innerHTML = array[i];
                newItem.className = 'viewTicketItem';
                $('#_viewTicket_list').prepend(newItem);

                if (count == 1) {
                    $(numItems).text("1 item left");
                }
                else {
                    $(numItems).text(count + " items left");
                }

                if (count != 0) {
                    $("#_viewTicket_footerInfo").show();
                }
                else {
                    $("#_viewTicket_footerInfo").hide();
                }
            }
        }
    };

    var ticketId = null;
    
    $('#_viewTicket_submit_list').click(function () {
        assholes39();
        goToPage("_yourDeliveries");
    });

    function assholes39() {
        var info_to_send = {};
        info_to_send.id = $('#user-name').data('id');
        info_to_send.ticketId = ticketId;
        info_to_send.type = "get";

        //Actual
        $.ajax({
                type: "POST",
                url: "/_viewTicket",
                data: info_to_send,
                success: function (data) {
                    //data is the object sent back on success (could also just be string)
                    //loader._viewTicket.loadData(data);
                },
                error: function (data) {
                    console.log("view ticket failed");
                    //data is the object send back on fail (could also just be string)
                }
            }
        );
    }

})();

