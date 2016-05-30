(function () {
    loader._shoppingStatus = {
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

                $("#listName_shoppingStatus").text(" ");
                $("#phone").text(" ");
                $("ul").empty();
                $("#_driver_numItems").text(" ");
                $("#driver_note").val(" ");

                var fullName = data.full_name;
                var array = data.items;

                //create the contact info(where should I got this, is there a flied relates to contact?
                document.getElementById("listName_shoppingStatus").innerHTML = fullName + "'s Shopping List";
                document.getElementById("phone_shoppingStatus").innerHTML = "Phone: " + data.contact;
                $("#shoppingstatus_note").val(data.special_note).siblings().addClass("active");

                for (var i = 0; i < array.length; i++) {
                    // item count
                    count = array.length;

                    // Create the list item:
                    var newItem = document.createElement('li');
                    newItem.innerHTML = array[i];
                    newItem.className = 'shoppingStatusItem';
                    //newItem.id = array[i];
                    $('#_shoppingStatus_list').prepend(newItem);

                    if (count == 1) {
                        $("#_shoppingStatus_numItems").text("1 item left");
                    }
                    else {
                        $("#_shoppingStatus_numItems").text(count + " items left");
                    }

                    if (count != 0) {
                        $("#_shoppingStatus_footerInfo, .footerBars").show();
                    }
                    else {
                        $("#_shoppingStatus_footerInfo,.footerBars").hide();
                    }
                }

            }
        }
    };

    $('#shoppingStatus_list_btn').click(function () {
        goToPage("_history");
    });

})();

