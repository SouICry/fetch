var test_data = {
    full_name: "Donkey Punch",
    items: ["aa", "bb", "cc", "dd"],
    contact: 1234567890,
    special_note: "cheap",
    time: "<table class='calendar calendar0'> <thead> <tr class='calendar-head'  cellpadding='0' cellspacing='0'> </tr> </thead> </table> <table class='calendar calendar1' cellpadding='0' cellspacing='0'> <tbody> <tr><td>6</td> <td>6</td> <td>6</td> <td>6</td> <td>6</td> <td>6</td> <td>6</td> </tr> <tr> <td>7</td> <td>7</td> <td>7</td> <td>7</td> <td>7</td> <td>7</td> <td>7</td> </tr> <tr> <td>8</td> <td>8</td> <td>8</td> <td>8</td> <td>8</td> <td>8</td> <td>8</td> </tr> <tr> <td>9</td> <td>9</td> <td>9</td> <td>9</td> <td>9</td> <td>9</td> <td>9</td> </tr> <tr> <td>10</td> <td>10</td> <td>10</td> <td>10</td> <td>10</td> <td>10</td> <td>10</td> </tr> <tr> <td>11</td> <td>11</td> <td>11</td> <td>11</td> <td>11</td> <td>11</td> <td>11</td> </tr> </tbody> </table> <table class='calendar calendar2'> <tbody> <tr> <td>12</td> <td>12</td> <td>12</td> <td>12</td> <td>12</td> <td>12</td> <td>12</td> </tr> <tr> <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td> </tr> <tr> <td>2</td> <td>2</td> <td>2</td> <td>2</td> <td>2</td> <td>2</td> <td>2</td> </tr> <tr> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> </tr> <tr> <td>4</td> <td>4</td> <td>4</td> <td>4</td> <td>4</td> <td>4</td> <td>4</td> </tr> <tr> <td>5</td> <td>5</td> <td>5</td> <td>5</td> <td>5</td> <td>5</td> </tr> </tbody> </table> <table class='calendar calendar3'> <tbody> <tr> <td>6</td> <td>6</td> <td>6</td> <td>6</td> <td>6</td> <td>6</td> <td>6</td> </tr> <tr> <td>7</td> <td>7</td> <td>7</td> <td>7</td> <td>7</td> <td>7</td> <td>7</td> </tr> <tr> <td>8</td> <td>8</td> <td>8</td> <td>8</td> <td>8</td> <td>8</td> <td>8</td> </tr> <tr> <td>9</td> <td>9</td> <td>9</td> <td>9</td> <td>9</td> <td>9</td> </tr> <tr> <td>10</td> <td>10</td> <td>10</td> <td>10</td> <td>10</td> <td>10</td> <td>10</td> </tr> <tr> <td>11</td> <td>11</td> <td>11</td> <td>11</td> <td>11</td> <td>11</td> <td>11</td> </tr> </tbody> </table> <table class='calendar calendar4'> <tbody> <tr> <td>12</td> <td>12</td> <td>12</td> <td>12</td> <td>12</td> <td>12</td> <td>12</td> </tr> <tr> <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td> </tr> <tr> <td>2</td> <td>2</td> <td>2</td> <td>2</td> <td>2</td> <td>2</td> <td>2</td> </tr> <tr> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> </tr> <tr> <td>4</td> <td>4</td> <td>4</td> <td>4</td> <td>4</td> <td>4</td> <td>4</td> </tr> <tr> <td>5</td> <td>5</td> <td>5</td> <td>5</td> <td>5</td> <td>5</td> <td>5</td> </tr> </tbody> </table>",
    pos: {lat:32, lng:-150},
    shopperId: "firstpartofemail"
};

(function () {
    var shopperId;
    var sync = -99999;
    loader._purchasedTickets = {
        version: 0,
        getData: function () { //NOT SURE WHAT TO SEND -JEN
            var packData = null;

            return packData;
        },
        onPageLoad: function () {

            if(UrlExists('images/profiles/' + shopperId + '.png')) {
                document.getElementById("purchasedTickets-img").src = 'images/profiles/' + shopperId + '.png';
            }
            assholes666();
        },
        loadData: function (data) {
            shopperId = data.shopperId;
            //populate driver list
            $("#listName_purchasedTickets").text(" ");
            $("#phone_purchasedTickets").text(" ");
            $("#_purchasedTickets ul").html("");
            $("#purchasedTickets_numItems").text(" ");
            $("#purchasedTickets_note").val(" ");
            $("#purchasedTicketsCalendar").html("");

            fullName = data.full_name;
            array = data.items;
            var name = data.full_name;

            //create the contact info(where should I got this, is there a flied relates to contact?
            document.getElementById("listName_purchasedTickets").innerHTML = name + "'s Shopping List";
            document.getElementById("phone_purchasedTickets").innerHTML = "Phone: " + data.phone_number;
            $("#purchasedTickets_note").val(data.special_note).siblings().addClass("active");
            document.getElementById("purchasedTickets-img").src = "images/profiles/" + data.shopperId + ".png";
            $("#purchasedTickets_location").text("Delivery Location: ");
            $("#purchasedTicketsCalendar").append(loader.parseCalendar(data.calendar));
            loader.loadMap("purchasedTicketsMap",data.shopping_location);

            // $("#purchasedTicketsCalendar").append(data.time);

            for (var i = 0; i < array.length; i++) {
                // item count
                count = array.length;

                // Create the list item:
                var newItem = document.createElement('li');
                newItem.innerHTML = array[i];
                newItem.className = 'driverItem';
                //newItem.id = array[i];
                $('#purchasedTickets_list').prepend(newItem);

                if (count == 1) {
                    $("#purchasedTickets_numItems").text("1 item");
                }
                else {
                    $("#purchasedTickets_numItems").text(count + " items");
                }
            }
        }
    };

    var count = 0;
    //var count = data.items.length - arrayCheckedOff.length;
    var fullName = "";
    var array = [];

    $("#purchasedTickets_submit_list").click(function () {
        $(this).addClass('disabled');

        assholes6155();
        if(result) {
            goToPage("_rateUser");
        }
    });

    $("#purchasedTickets-back").click(function() {
        goToPage("_yourDeliveries");
    });

    // Used after click submit, update the grocery ticket for the users
    function assholes6155() {
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
                        if (data == "true") {
                            var info_to_send = {};
                            info_to_send.ticketId = loader.ticketId;
                            //alert(info_to_send.ticketId);
                            info_to_send.type = 'send';
                            clearInterval(sync);
                            sync = -99999;
                            $("#purchasedTickets_submit_list").removeClass("disabled");
                            $.ajax({
                                type: "POST",
                                url: "/_purchasedTickets",
                                data: info_to_send,
                                success: function (data) {

                                    //alert('success!!!!!');
                                },
                                error: function (data) {
                                    //data is the object send back on fail (could also just be string)
                                }
                            });
                            goToPage("/_rateUser");
                        }
                    }
                });
            }, 500);
        }

    }

    // Used to get data from db
    function assholes666() {
        var info_to_send = {};
        info_to_send.ticketId = loader.ticketId;
        //alert(info_to_send.ticketId);
        info_to_send.type = 'send';

        $.ajax({
            type: "POST",
            url: "/_loadPurchasedTickets",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(info_to_send),
            success: function (data) {
                //data is the object sent back on success (could also just be string)
                loader._purchasedTickets.loadData(data);
            },
            error: function (data) {
                //data is the object send back on fail (could also just be string)
            }
        });
    }
})();