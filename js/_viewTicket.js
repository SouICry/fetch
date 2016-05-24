/**
 * Created by Jeanette on 5/24/16.
 */
var test_data = {
    full_name: "Donkey",
    items: ["aa", "bb", "cc", "dd"],
    contact: 1234567890,
    id: 1234
};

(function () {
    loader._viewTicket = {
        version: 0,
        getData: function () {
            var packData = {
                contact: $("#phone").substring(8),
                full_name: fullName,
                items: array
            };

            return packData;
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
    var count = 0;
    var fullName = "";
    var array = [];

    // $(document).on('click', '.viewTicketItem',function () {
    //
    //     $(this).toggleClass("selected");
    //
    //     var arr = [];
    //     $('.driverItem.selected').each(function () {
    //         arr.push($(this).text());
    //     });
    //
    //     if ((count - arr.length) === 1) {
    //         $("#_viewTicket_numItems").text("1 item left");
    //     }
    //     else {
    //         $("#_viewTicket_numItems").text((count - arr.length) + " items left");
    //     }
    // });

    $("#_viewTicket_submit_list").click(function () {
        var arr = [];
        $('.viewTicketItem.selected').each(function () {
            arr.push($(this).text());
        });

        // var flag;
        // if (arr.length != count) {
        //     if ((count - arr.length) === 1) {
        //         flag = confirm("You still have " + (count - arr.length) + " item left in the" +
        //             " shopping list, Are you sure to finish shopping now?");
        //     }
        //     else {
        //         flag = confirm("You still have " + (count - arr.length) + " items left in the" +
        //             " shopping list, Are you sure to finish shopping now?");
        //     }
        // }

        // if (arr.length === count || flag === true) {
        //     goToPage("_congrats_driver_finish_shopping");
        // }
    });

})();

