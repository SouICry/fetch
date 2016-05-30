var test_data = {
    full_name: "Donkey Punch",
    items: ["aa", "bb", "cc", "dd"],
    contact: 1234567890
};

<<<<<<< HEAD
=======
//var arrayCheckedOff = ['dd','cc'];
>>>>>>> 593b141b9b48c0f67bcb5a901473278f805e9bc4

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
        onPageLoad: function() {
            assholes61323355();
        },
        loadData: function (data) {
            //populate driver list
            $("#listName").text(" ");
            $("#phone").text(" ");
            $("ul").empty();
            $("#_driver_numItems").text(" ");

            fullName = data.full_name;
            array = data.items;
            var name = data.full_name.split(" ");

            //create the contact info(where should I got this, is there a flied relates to contact?
            document.getElementById("listName_driverList").innerHTML = name[0] + "'s Shopping List";
            document.getElementById("phone").innerHTML = "Phone: " + data.contact;

            for (var i = 0; i < array.length; i++) {
                // item count
                count = array.length;

                // Create the list item:
                var newItem = document.createElement('li');
                newItem.innerHTML = array[i];
                newItem.className = 'driverItem';
                //newItem.id = array[i];
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

            for(var j = 0; j < arrayCheckedOff.length; j++){
                var selector =  "#" + arrayCheckedOff[j];
                $(selector).toggleClass("selected");
            }
        }
    };

    var count = 0;
    //var count = data.items.length - arrayCheckedOff.length;
    var fullName = "";
    var array = [];

    $(document).on('click', '.driverItem',function () {

        $(this).toggleClass("selected");

        var arr = [];
        //arrayCheckedOff = [];
        $('.driverItem.selected').each(function () {
            arr.push($(this).text());
            //arrayCheckedOff.push($(this).text());
        });

        if ((count - arr.length) === 1) {
            $("#_driver_numItems").text("1 item left");
        }
        else {
            $("#_driver_numItems").text((array.length - arr.length) + " items left");
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
            assholes666();
            goToPage("_congrats_driver_finish_shopping");
        }
    });

    assholes61323355();

    // Used to get data from db
    function assholes61323355() {
        var info_to_send = {};
        info_to_send.ticketId = loader._driverList.data;
        //alert(info_to_send.ticketId);
        info_to_send.type = 'get';

        $.ajax({
            type: "POST",
            url: "/_driverList",
            contentType: "application/json",
            dataType: "json",
            data: null,
            success: function (data) {
                //data is the object sent back on success (could also just be string)
                loader._driverList.loadData(data);
            },
            error: function (data) {
                //data is the object send back on fail (could also just be string)
            }
        });
    }

    // Used after click submit, update the grocery ticket for the users
    function assholes666() {
        var info_to_send = {};
        info_to_send.ticketId = loader._driverList.data;
        //alert(info_to_send.ticketId);
        info_to_send.type = 'get';

        $.ajax({
            type: "POST",
            url: "/driverListUpdate",
            contentType: "application/json",
            dataType: "json",
            data: null,
            success: function (data) {
                //data is the object sent back on success (could also just be string)
            },
            error: function (data) {
                //data is the object send back on fail (could also just be string)
            }
        });
    }
})();

