(function () {
    loader._viewTicket = {
        data:{full_name: "Jen", items:["green eggs", "ham"], id: 3054},
        version: 0,
        getData: function () {
            return data.id;
        },
        loadData: function (data) {
            //populate driver list
            $("#listName").text(" ");
            $("ul").empty();
            $("#_viewTicket_numItems").text(" ");
            fullName = data.full_name;
            array = data.items;
            var separatedNames = data.full_name.split(" ");
            for (var i = 0; i < array.length; i++) {

                // item count
                count = array.length;
                //create the contact info(where should I got this, is there a flied relates to contact?
                document.getElementById("listName").innerHTML = separatedNames[0] + "'s Shopping List";
                document.getElementById("phone").innerHTML = "Phone: " + data.contact;
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
    });

})();

