(function () {
    var sync;
    loader._confirmTicket = {
        data: {driver_full_name: "John Doe", driverId: 123, items: ["aa", "bb", "cc", "dd"], price: 56.7, ticketId: 234, status: "delivered"},
        version: 0,
        getData: function () {
            var sendBackData = {
                new_driver_full_name: data.driver_full_name,
                new_driverId: data.driverId,
                new_items: data.items,
                new_price: data.price,
                new_ticketId: data.ticketId,
                new_status: status
            }
            return sendBackData;
        },
        loadData: function (data) {
            var numItems = $("#_confirm_numItems");
            $("#driver_icon").html("");
            $("#driverName").html("");
            $("#_confirmTicket ul").html("");
            numItems.html("");
            $("#_confirm_price").html("");
            $("#receipt").html("");

            status = data.status;
            var array = data.items;
            var separatedNames = (data.driver_full_name).split(" ");
            

            //show the driver name and create the profile pic
            document.getElementById("driverName").innerHTML = "Driver Name: " + separatedNames[0];

            // var image = document.createElement('img');
            // image.src = "Images/users/" + data.driverId + ".png";
            // $("#driver_icon").append(image);

            // var receipt = document.createElement('img');
            // receipt.src = "Images/tickets/" + data.ticketId + ".png";
            // $("#receipt").append(receipt);

            document.getElementById("_confirm_price").innerHTML = "Price: " + data.price;
            document.getElementById("_confirm_total_price").innerHTML = "Total Price including the service fee: " + data.price*1.15;





            for (var i = 0; i < array.length; i++) {

                // item count
                var count = array.length;
                
                // Create the list item:
                var newItem = document.createElement('li');
                newItem.innerHTML = array[i];
                newItem.className = 'driverItem';
                $('#_confirm_list').prepend(newItem);

                if (count == 1) {
                    numItems.text("1 item");
                }
                else {
                    numItems.text(count + " items");
                }

                if (count != 0) {
                    $("#_confirm_footerInfo").show();
                }
                else {
                    $("#_confirm_footerInfo").hide();
                }
            }
        }
    };

    var status;
    $("#confirm_button").click(function(){
        status = "completed";
        //goToPage("_congratsTicketClosed");
        goToPage("_rateDriver");  //Trivi added
    });

})();/**
 * Created by juneruijiang on 5/23/16.
 */
