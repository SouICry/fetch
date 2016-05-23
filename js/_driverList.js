var test_data = {
    full_name: "Donkey Punch",
    items: ["aa", "bb", "cc", "dd"],
    contact: 1234567890
};

(function () {



    loader._driverList = {
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
            $("#phone").text(" ");
            $("ul").empty();
            $("#_driver_numItems").text(" ");
            fullName = data.full_name;
            array = data.items;

            //create the contact info(where should I got this, is there a flied relates to contact?
            document.getElementById("listName").innerHTML = separatedNames[0] + "'s Shopping List";
            document.getElementById("phone").innerHTML = "Phone: " + data.contact;

            var separatedNames = data.full_name.split(" ");
            for (var i = 0; i < array.length; i++) {

                // item count
                count = array.length;

                // Create the list item:
                var newItem = document.createElement('li');
                newItem.innerHTML = array[i];
                newItem.className = 'driverItem';
                $('#_driverList2_list').prepend(newItem);

                if (count == 1) {
                    $("#_driver_numItems").text("1 item left");
                }
                else {
                    $("#_driver_numItems").text(count + " items left");
                }

                if (count != 0) {
                    $("#_driver_footerInfo, .footerBars").show();
                }
                else {
                    $("#_driver_footerInfo,.footerBars").hide();
                }
            }
        }
    };
    var count = 0;
    var fullName = "";
    var array = [];


    // displayLoadedData(simulated_user);
    //
    // function displayLoadedData(data) {
    //     document.getElementById("listName").innerHTML = data.name + "'s Shopping List";
    //     document.getElementById("phone").innerHTML = "Phone: " + data.contact;
    // }

    // $("#_driver_footerInfo, #footerBars").show();

    // makeList(simulated_user.items);



    $(document).on('click', '.driverItem',function () {
        var arr = [];
        $(this).toggleClass("selected");

        $('.driverItem.selected').each(function () {
            arr.push($(this).text());
        });

        if ((count - arr.length) === 1) {
            $("#_driver_numItems").text("1 item left");
        }
        else {
            $("#_driver_numItems").text((count - arr.length) + " items left");
        }
    });

    $("#_driver_submit_list").click(function () {
        var arr = [];
        $('.driverItem.selected').each(function () {
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
            goToPage("_congrats_driver_finish_shopping");
        }
    });

})();

