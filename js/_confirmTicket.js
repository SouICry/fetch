(function () {
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
            $("#driver_icon").empty();
            $("#driverName").empty();
            $("ul").empty();
            $("#_confirm_numItems").empty();
            $("#_confirm_price").empty();
            $("#receipt").empty();

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
                    $("#_confirm_numItems").text("1 item");
                }
                else {
                    $("#_confirm_numItems").text(count + " items");
                }

                if (count != 0) {
                    $("#_confirm_footerInfo, .footerBars").show();
                }
                else {
                    $("#_confirm_footerInfo,.footerBars").hide();
                }
            }
        }
    };

    var status;
    $("#confirm_button").click(function(){
        status = "completed";
        goToPage("_congratsTicketClosed");
    });

})();/**
 * Created by juneruijiang on 5/23/16.
 */
