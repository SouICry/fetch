(function () {
    var sync = -99999;
    loader._confirmTicket = {
        data: {
            driver_full_name: "John Doe",
            driverId: 123,
            items: ["aa", "bb", "cc", "dd"],
            price: 56.7,
            ticketId: 234,
            status: "delivered",
            pos: {lat: 25, lng: -139},
            time: "<table class='calendar calendar0'> <thead> <tr class='calendar-head'  cellpadding='0' cellspacing='0'> </tr> </thead> </table> <table class='calendar calendar1' cellpadding='0' cellspacing='0'> <tbody> <tr><td>6</td> <td>6</td> <td>6</td> <td>6</td> <td>6</td> <td>6</td> <td>6</td> </tr> <tr> <td>7</td> <td>7</td> <td>7</td> <td>7</td> <td>7</td> <td>7</td> <td>7</td> </tr> <tr> <td>8</td> <td>8</td> <td>8</td> <td>8</td> <td>8</td> <td>8</td> <td>8</td> </tr> <tr> <td>9</td> <td>9</td> <td>9</td> <td>9</td> <td>9</td> <td>9</td> <td>9</td> </tr> <tr> <td>10</td> <td>10</td> <td>10</td> <td>10</td> <td>10</td> <td>10</td> <td>10</td> </tr> <tr> <td>11</td> <td>11</td> <td>11</td> <td>11</td> <td>11</td> <td>11</td> <td>11</td> </tr> </tbody> </table> <table class='calendar calendar2'> <tbody> <tr> <td>12</td> <td>12</td> <td>12</td> <td>12</td> <td>12</td> <td>12</td> <td>12</td> </tr> <tr> <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td> </tr> <tr> <td>2</td> <td>2</td> <td>2</td> <td>2</td> <td>2</td> <td>2</td> <td>2</td> </tr> <tr> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> </tr> <tr> <td>4</td> <td>4</td> <td>4</td> <td>4</td> <td>4</td> <td>4</td> <td>4</td> </tr> <tr> <td>5</td> <td>5</td> <td>5</td> <td>5</td> <td>5</td> <td>5</td> </tr> </tbody> </table> <table class='calendar calendar3'> <tbody> <tr> <td>6</td> <td>6</td> <td>6</td> <td>6</td> <td>6</td> <td>6</td> <td>6</td> </tr> <tr> <td>7</td> <td>7</td> <td>7</td> <td>7</td> <td>7</td> <td>7</td> <td>7</td> </tr> <tr> <td>8</td> <td>8</td> <td>8</td> <td>8</td> <td>8</td> <td>8</td> <td>8</td> </tr> <tr> <td>9</td> <td>9</td> <td>9</td> <td>9</td> <td>9</td> <td>9</td> </tr> <tr> <td>10</td> <td>10</td> <td>10</td> <td>10</td> <td>10</td> <td>10</td> <td>10</td> </tr> <tr> <td>11</td> <td>11</td> <td>11</td> <td>11</td> <td>11</td> <td>11</td> <td>11</td> </tr> </tbody> </table> <table class='calendar calendar4'> <tbody> <tr> <td>12</td> <td>12</td> <td>12</td> <td>12</td> <td>12</td> <td>12</td> <td>12</td> </tr> <tr> <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td> </tr> <tr> <td>2</td> <td>2</td> <td>2</td> <td>2</td> <td>2</td> <td>2</td> <td>2</td> </tr> <tr> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> </tr> <tr> <td>4</td> <td>4</td> <td>4</td> <td>4</td> <td>4</td> <td>4</td> <td>4</td> </tr> <tr> <td>5</td> <td>5</td> <td>5</td> <td>5</td> <td>5</td> <td>5</td> <td>5</td> </tr> </tbody> </table>"
        },
        version: 0,
        getData: function () {
            var sendBackData = {
                new_driver_full_name: data.driver_full_name,
                new_driverId: data.driverId,
                new_items: data.items,
                new_price: data.price,
                new_ticketId: data.ticketId,
                new_status: data.status
            };
            return sendBackData;
        },
        loadData: function (data) {
            var numItems = $("#confirmTicket_numItems");
            $("#confirmTicket_icon").html("");
            $("#confirmTicket_driverName").html("");
            $("#_confirmTicket ul").html("");
            numItems.html("");
            $("#confirmTicket_total_price").html("");
            $("#confirmTicket_receipt").html("");
            $("confirmTicketCalendar").html("");
            loader.loadMap("confirmTicket_Map",{lat:32, lng:-150});

            status = data.status;
            var array = data.items;
            var separatedNames = data.driver_full_name;


            //show the driver name and create the profile pic
            document.getElementById("confirmTicket_driverName").innerHTML = "Driver Name: " + separatedNames;

            // var image = document.createElement('img');
            // image.src = "Images/users/" + data.driverId + ".png";
            // $("#driver_icon").append(image);

            // var receipt = document.createElement('img');
            // receipt.src = "Images/tickets/" + data.ticketId + ".png";
            // $("#receipt").append(receipt);
            document.getElementById("confirmTicket_price").innerHTML = "Price: $" + (data.price).toFixed(2);
            document.getElementById("confirmTicket_total_price").innerHTML = "Total Price including the service fee: $" + (data.price * 1.15).toFixed(2);
            document.getElementById("confirmTicket_img").src = "images/profiles/" + data.driverId + ".png";
            $("#confirmTicket_location").text("Delivery Location: ");
            $("#confirmTicketCalendar").append(loader.parseCalendar(data.calendar));

            //  $("#confirmTicket_Calendar").append(data.time);

            for (var i = 0; i < array.length; i++) {

                // item count
                var count = array.length;

                // Create the list item:
                var newItem = document.createElement('li');
                newItem.innerHTML = array[i];
                newItem.className = 'driverItem';
                $('#confirmTicket_list').prepend(newItem);

                if (count == 1) {
                    numItems.text("1 item");
                }
                else {
                    numItems.text(count + " items");
                }

                if (count != 0) {
                    $("#confirmTicket_footerInfo").show();
                }
                else {
                    $("#confirmTicket_footerInfo").hide();
                }
            }
        }
    };

    $("#confirmTicket_button").click(function () {
        $(this).addClass('disabled');
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            url: "/userConfirm",
            data: JSON.stringify({
                ticketId: loader.ticketId
            })
        });
        if (sync == -99999) {
            sync = setInterval(function () {
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    url: "/checkConfirm",
                    data: JSON.stringify({
                        ticketId: loader.ticketId
                    }),
                    success: function (data) {
                        if (data == true) {
                            clearInterval(sync);
                            sync = -99999;
                            $("#confirmTicket_button").removeClass("disabled");
                            goToPage("_rateDriver");
                        }
                    }
                });
            }, 500);
        }
    });

})();
/**
 * Created by juneruijiang on 5/23/16.
 */
