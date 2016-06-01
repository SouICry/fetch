var driver__test_data = {
    full_name: "Tim",
    items: ["aa", "bb", "cc", "dd"],
    contact: 1234567890,
    special_note: "cheap",
    shopper_id: "tpei"
};

(function () {
    loader._driverList = {
        version: 0,
        getData: function () {
            var packData = {
                contact: $("#phone").substring(8),
                full_name: fullName,
                items: array,
                special_note: data.special_note
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
            $("#_driverList ul").html("");
            $("#_driver_numItems").text(" ");
            $("#driver_note").val(" ");
        
            fullName = data.full_name;
            array = data.items;
            var name = data.full_name;
            driverList_shopperid = data.shopper_id;
            alert(driverList_shopperid);
            alert(name);
            loader.shopperid = data.shopper_id;
            loader.shopperFullName = data.full_name;
            
            //create the contact info(where should I got this, is there a flied relates to contact?
            document.getElementById("listName_driverList").innerHTML = name + "'s Shopping List";
            document.getElementById("phone").innerHTML = "Phone: " + data.contact;
            $("#driver_note").text("Special Note: " + data.special_note);

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
    var driverList_shopperid = "";

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
            //assholes61323355();
            //goToPage("_congrats_driver_finish_shopping");
            goToPage('_receiptPictureEnterPrice');
        }
    });

    $("#driverList-location-back").click(function(){
        goToPage("_yourDeliveries");
    });

    $("#driver_messenger").click(function(){
        loader.openChat(driverList_shopperid, fullName);
    });
    // // Used after click submit, update the grocery ticket for the users
    // function assholes61323355() {
    //     var info_to_send = {};
    //     info_to_send.ticketId = loader._driverList.data;
    //     //alert(info_to_send.ticketId);
    //     info_to_send.type = 'send';
    //
    //     $.ajax({
    //         type: "POST",
    //         url: "/_driverList",
    //         data: info_to_send,
    //         success: function (data) {
    //             alert('success!!!!!');
    //             //data is the object sent back on success (could also just be string)
    //             //loader._driverList.loadData(data);
    //         },
    //         error: function (data) {
    //             //data is the object send back on fail (could also just be string)
    //         }
    //     });
    // }

    // Used to get data from db
    function assholes666() {
        var info_to_send = {};
        info_to_send.ticketId = loader.ticketId;
        //alert(info_to_send.ticketId);
        info_to_send.type = 'send';

        $.ajax({
            type: "POST",
            url: "/driverListUpdate",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(info_to_send),
            success: function (data) {
                //data is the object sent back on success (could also just be string)
                loader._driverList.loadData(data);
            },
            error: function (data) {
                //data is the object send back on fail (could also just be string)
            }
        });
    }
})();