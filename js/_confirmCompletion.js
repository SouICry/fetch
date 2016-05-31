(function () {
    loader._confirmCompletion = {
        data: {shopper_full_name: "Jane Doe", shopperId: 555, items: ["aa", "bb", "cc", "dd"], price: 56.7, ticketId: 234, status: "delivered"},
        version: 0,
        getData: function () {
            var sendBackData = {
                new_shopper_full_name: data.shopper_full_name,
                new_shopperId: data.shopperId,
                new_items: data.items,
                new_price: data.price,
                new_ticketId: data.ticketId,
                new_status: status
            };
            return sendBackData;
        },
        loadData: function (data) {
            $("#shopper_icon").html("");
            $("#shopperName").html("");
            $("#_confirmCompletion ul").html("");
            $("#_confirm_numItems").html("");
            $("#_confirm_price").html("");
            $("#receipt").html("");

            status = data.status;
            var array = data.items;
            var separatedNames = (data.shopper_full_name).split(" ");


            //show the driver name and create the profile pic
            document.getElementById("shopperName").innerHTML = "Shopper Name: " + separatedNames[0];

            // var image = document.createElement('img');
            // image.src = "Images/users/" + data.shopperId + ".png";
            // $("#shopper_icon").append(image);

            // var receipt = document.createElement('img');
            // receipt.src = "Images/tickets/" + data.ticketId + ".png";
            // $("#receipt").append(receipt);

            document.getElementById("_driver_confirm_price").innerHTML = "Price: " + data.price;
            document.getElementById("_driver_confirm_total_price").innerHTML = "Total Price including the service fee: " + data.price*1.15;





            for (var i = 0; i < array.length; i++) {

                // item count
                var count = array.length;

                // Create the list item:
                var newItem = document.createElement('li');
                newItem.innerHTML = array[i];
                newItem.className = 'driverItem';
                $('#_driver_confirm_list').prepend(newItem);

                if (count == 1) {
                    $("#_driver_confirm_numItems").text("1 item");
                }
                else {
                    $("#_driver_confirm_numItems").text(count + " items");
                }

                if (count != 0) {
                    $("#_driver_confirm_footerInfo").show();
                }
                else {
                    $("#_driver_confirm_footerInfo").hide();

                }
            }
        }
    };

    var status;
    $("#driver_confirm_button").click(function(){
        status = "completed";
        changeTicketState();

        // TODO: FIX THIS. CURRENTLY DOESN'T GO TO RATEUSER FOR SOME REASON?
        goToPage("/_rateUser");
    });

    function changeTicketState() {
        $.ajax({
            type: "POST",
            url: "/_purchasedTickets",
            data: {
                ticketId: loader.ticketId,
                type: 'send'
            },
            success: function (data) {
                goToPage("/_rateDriver");
                console.log('Successfully changed ticket state to delivered');
            },
            error: function (data) {
                console.log('GOT IN ERROR IN PURCHASEDDDAG');
                //data is the object send back on fail (could also just be string)
            }
        });
    }
    
})();