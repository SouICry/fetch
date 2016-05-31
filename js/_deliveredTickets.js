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
    loader._deliveredTickets = {
        version: 0,
        getData: function () { //NOT SURE WHAT TO SEND -JEN
            var packData = null;

            return packData;
        },
        onPageLoad: function () {
            assholes666();
        },
        loadData: function (data) {
            //populate driver list
            $("#listName_deliveredTickets").text(" ");
            $("#phone_deliveredTickets").text(" ");
            $("ul").empty();
            $("#deliveredTickets_numItems").text(" ");
            $("#deliveredTickets_note").val(" ");

            fullName = data.full_name;
            array = data.items;
            var name = data.full_name;

            //create the contact info(where should I got this, is there a flied relates to contact?
            document.getElementById("listName_deliveredTickets").innerHTML = name + "'s Shopping List";
            document.getElementById("phone_deliveredTickets").innerHTML = "Phone: " + data.contact;
            $("#deliveredTickets_note").val(data.special_note).siblings().addClass("active");
            document.getElementById("deliveredTickets-img").src = "images/profiles/" + data.shopperId + ".png";
            $("#deliveredTickets_location").text("Delivery Location: " + data.shopping_location);
            $("#deliveredTicketsTicketsCalendar").append(data.time);

            for (var i = 0; i < array.length; i++) {
                // item count
                count = array.length;

                // Create the list item:
                var newItem = document.createElement('li');
                newItem.innerHTML = array[i];
                newItem.className = 'driverItem';
                //newItem.id = array[i];
                $('#deliveredTickets_list').prepend(newItem);

                if (count == 1) {
                    $("#deliveredTickets_numItems").text("1 item");
                }
                else {
                    $("#deliveredTickets_numItems").text(count + " items");
                }
            }
        }
    };

    var count = 0;
    //var count = data.items.length - arrayCheckedOff.length;
    var fullName = "";
    var array = [];

    $("#deliveredTickets-back").click(function() {
        goToPage("_yourDeliveries");
    });

    assholes666();

    // Used after click submit, update the grocery ticket for the users
    function assholes61323355() {
        var info_to_send = {};
        info_to_send.ticketId = loader._deliveredTickets.data;
        //alert(info_to_send.ticketId);
        info_to_send.type = 'send';

        $.ajax({
            type: "POST",
            url: "/_deliveredTickets",
            data: info_to_send,
            success: function (data) {
                alert('success!!!!!');
                //data is the object sent back on success (could also just be string)
                //loader._driverList.loadData(data);
            },
            error: function (data) {
                //data is the object send back on fail (could also just be string)
            }
        });
    }

    // Used to get data from db
    function assholes666() {
        var info_to_send = {};
        info_to_send.ticketId = loader._deliveredTickets.data;
        //alert(info_to_send.ticketId);
        info_to_send.type = 'send';

        $.ajax({
            type: "POST",
            url: "/deliveredTicketsUpdate",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(info_to_send),
            success: function (data) {
                //data is the object sent back on success (could also just be string)
                loader._deliveredTickets.loadData(data);
            },
            error: function (data) {
                //data is the object send back on fail (could also just be string)
            }
        });
    }
})();