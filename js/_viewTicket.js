(function () {
    loader._viewTicket = {
        data: /*{full_name: "Jen", items:["green eggs", "ham"], id: 3054}*/'',
        version: 0,
        getData: null,
        loadData: function (data) {
            //populate driver list
            $("#listName").text(" ");
            $("ul").empty();
            $("#_viewTicket_numItems").text(" ");
            alert(JSON.stringify(data));
            var array = data.shopping_list;
            var separatedNames = data.shopper.full_name;

            for (var i = 0; i < array.length; i++) {
                alert(array[i]);
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
                    $("#_viewTicket_numItems").text("1 item left");
                }
                else {
                    $("#_viewTicket_numItems").text(count + " items left");
                }

                if (count != 0) {
                    $("#_viewTicket_footerInfo, .footerBars").show();
                }
                else {
                    $("#_viewTicket_footerInfo,.footerBars").hide();
                }
            }
        }
    };

    $('#_viewTicket_submit_list').click(function () {
        goToPage("_yourDeliveries");
        assholes39();
    });

    function assholes39() {
        var info_to_send = {};
        info_to_send.id = $('#user-name').data('id');
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
                    alert("fail");
                    //data is the object send back on fail (could also just be string)
                }
            }
        );
    }

})();

