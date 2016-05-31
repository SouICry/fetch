(function () {
    loader._cancelTicket = {
        data: {
            items: ["aa","bb","cc","dd"],
            shopping_location: {lat:32, lng:-150},
            special_note: "cheap",
            //time: "<table class='calendar calendar0'> <thead> <tr class='calendar-head'  cellpadding='0' cellspacing='0'> </tr> </thead> </table> <table class='calendar calendar1' cellpadding='0' cellspacing='0'> <tbody> <tr><td>6</td> <td>6</td> <td>6</td> <td>6</td> <td>6</td> <td>6</td> <td>6</td> </tr> <tr> <td>7</td> <td>7</td> <td>7</td> <td>7</td> <td>7</td> <td>7</td> <td>7</td> </tr> <tr> <td>8</td> <td>8</td> <td>8</td> <td>8</td> <td>8</td> <td>8</td> <td>8</td> </tr> <tr> <td>9</td> <td>9</td> <td>9</td> <td>9</td> <td>9</td> <td>9</td> <td>9</td> </tr> <tr> <td>10</td> <td>10</td> <td>10</td> <td>10</td> <td>10</td> <td>10</td> <td>10</td> </tr> <tr> <td>11</td> <td>11</td> <td>11</td> <td>11</td> <td>11</td> <td>11</td> <td>11</td> </tr> </tbody> </table> <table class='calendar calendar2'> <tbody> <tr> <td>12</td> <td>12</td> <td>12</td> <td>12</td> <td>12</td> <td>12</td> <td>12</td> </tr> <tr> <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td> </tr> <tr> <td>2</td> <td>2</td> <td>2</td> <td>2</td> <td>2</td> <td>2</td> <td>2</td> </tr> <tr> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> </tr> <tr> <td>4</td> <td>4</td> <td>4</td> <td>4</td> <td>4</td> <td>4</td> <td>4</td> </tr> <tr> <td>5</td> <td>5</td> <td>5</td> <td>5</td> <td>5</td> <td>5</td> </tr> </tbody> </table> <table class='calendar calendar3'> <tbody> <tr> <td>6</td> <td>6</td> <td>6</td> <td>6</td> <td>6</td> <td>6</td> <td>6</td> </tr> <tr> <td>7</td> <td>7</td> <td>7</td> <td>7</td> <td>7</td> <td>7</td> <td>7</td> </tr> <tr> <td>8</td> <td>8</td> <td>8</td> <td>8</td> <td>8</td> <td>8</td> <td>8</td> </tr> <tr> <td>9</td> <td>9</td> <td>9</td> <td>9</td> <td>9</td> <td>9</td> </tr> <tr> <td>10</td> <td>10</td> <td>10</td> <td>10</td> <td>10</td> <td>10</td> <td>10</td> </tr> <tr> <td>11</td> <td>11</td> <td>11</td> <td>11</td> <td>11</td> <td>11</td> <td>11</td> </tr> </tbody> </table> <table class='calendar calendar4'> <tbody> <tr> <td>12</td> <td>12</td> <td>12</td> <td>12</td> <td>12</td> <td>12</td> <td>12</td> </tr> <tr> <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td> </tr> <tr> <td>2</td> <td>2</td> <td>2</td> <td>2</td> <td>2</td> <td>2</td> <td>2</td> </tr> <tr> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> </tr> <tr> <td>4</td> <td>4</td> <td>4</td> <td>4</td> <td>4</td> <td>4</td> <td>4</td> </tr> <tr> <td>5</td> <td>5</td> <td>5</td> <td>5</td> <td>5</td> <td>5</td> <td>5</td> </tr> </tbody> </table>"
            calendar:loader._deliveryTime.getData()
        },
        version: 0, //Must be 0 
        getData: null,
        loadData: function (data) {
            if (data == "none" || data.length == 0) {
                data = [];
            }

            else {
                $("#_cancelTicket_numItems").text("");
                loader.loadMap("cancelTicketMap",data.shopping_location);
                $("#cancelTicketCalendar").append(loader.parseCalendar(data.calendar));
                $("#_cancelTicket ul").html("");
                $("#cancelTicket_note").val("");

                var fullName = data.full_name;
                var array = data.items;
                var numItems = $("#_cancelTicket_numItems");

                //create the contact info(where should I got this, is there a flied relates to contact?
                // document.getElementById("cancelTicket-img").src = "images/profiles/" + data.driverId + ".png";
                // document.getElementById("listName_cancelTicket").innerHTML = data.driver_full_name + " took your ticket";
                document.getElementById("cancelTicket_note").innerHTML = "Special Notes: " + data.special_note;
                // $("#cancelTicket_location").text("Delivery Location: " + data.shopping_location);
                //$("#cancelTicketCalendar").append(data.time);

                for (var i = 0; i < array.length; i++) {
                    // item count
                    count = array.length;

                    // Create the list item:
                    var newItem = document.createElement('li');
                    newItem.innerHTML = array[i];
                    newItem.className = 'cancelTicketItem';
                    //newItem.id = array[i];
                    $('#_cancelTicket_list').prepend(newItem);

                    if (count == 1) {
                        numItems.text("1 item");
                    }
                    else {
                        numItems.text(count + " items");
                    }

                    if (count != 0) {
                        $("#_cancelTicket_footerInfo").show();
                    }
                    else {
                        $("#_cancelTicket_footerInfo").hide();
                    }
                }

            }
        },
        onPageLoad: function() {
            loadCancelTicket();
        }
    };


    $('#cancelTicket_list_btn').click(function () {
        goToPage("_history");
    });

    $('#cancelTicket_cancel_btn').click(function () {
        cancelTicket();
        goToPage("_history");
    });

})();

function loadCancelTicket() {
    $.ajax({
        type: "POST",
        url: "/_cancelTicket",
        data: {ticketId: loader.ticketId},
        success: function (data) {
            //data is the object sent back on success (could also just be string)
            loader._cancelTicket.loadData(data);

            // var str= data.email;
            // var nameParts = str.split("@");
            // var name = nameParts.length==2 ? nameParts[0] : null;
            // if(UrlExists('images/profiles/' + name + '.png'))
            //     document.getElementById("accSettingAbove-img").src = 'images/profiles/' + name + '.png';
            // else
            //     document.getElementById("accSettingAbove-img").src = 'placeholder/person4.png';
        },
        error: function (data) {
        }
    });
}

function cancelTicket() {
    $.ajax({
        type: "POST",
        url: "/_cancelTicket",
        data: {ticketId: loader.ticketId, type: 'cancel'},
        success: function (data) {
            //data is the object sent back on success (could also just be string)
            // var str= data.email;
            // var nameParts = str.split("@");
            // var name = nameParts.length==2 ? nameParts[0] : null;
            // if(UrlExists('images/profiles/' + name + '.png'))
            //     document.getElementById("accSettingAbove-img").src = 'images/profiles/' + name + '.png';
            // else
            //     document.getElementById("accSettingAbove-img").src = 'placeholder/person4.png';
        },
        error: function (data) {

        }
    });
}

