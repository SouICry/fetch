(function () {
    var driverId;
    loader._rateDriver = {
        data: {driver_full_name: "Jane Doe", driverId: 133},
        getData: null,
        loadData: function (data) {
            var drImage = $('#rateDriver-img');
            $("#driver-name_rateDriver").html("");
            drImage.data('src', "/placeholder/person4.png");
            
            document.getElementById("driver-name_rateUser").innerHTML = "Driver Name: " + data.driver_full_name;
            driverId = data.driverId;
            var imageSrc = "images/profiles/" + data.driverId + ".png";


            if (imageSrc !== null) {
                drImage.data('src', imageSrc);
            }
        },
        onPageLoad: function(data) {

            if(UrlExists('images/profiles/' + driverId + '.png')) {
                document.getElementById("rateDriver-img").src = 'images/profiles/' + driverId + '.png';
            }
            else
                document.getElementById("rateDriver-img").src = 'placeholder/person4.png';

        }
    };


    $(".driverRate_button").click(function(){
        changeTicketState();
        goToPage("_congratsTicketClosed");
    });



    var _rating = 0;
    var r1 = $('#driver_rating-1'), r2 = $('#driver_rating-2'), r3 = $('#driver_rating-3'), r4 = $('#driver_rating-4'), r5 = $('#driver_rating-5');
    r1.hover(function () {
        r1.addClass("selected");
        r2.removeClass("selected");
        r3.removeClass("selected");
        r4.removeClass("selected");
        r5.removeClass("selected");
        _rating = 1;
    });
    r2.hover(function () {
        r1.addClass("selected");
        r2.addClass("selected");
        r3.removeClass("selected");
        r4.removeClass("selected");
        r5.removeClass("selected");
        _rating = 2;
    });
    r3.hover(function () {
        r1.addClass("selected");
        r2.addClass("selected");
        r3.addClass("selected");
        r4.removeClass("selected");
        r5.removeClass("selected");
        _rating = 3;
    });
    r4.hover(function () {
        r1.addClass("selected");
        r2.addClass("selected");
        r3.addClass("selected");
        r4.addClass("selected");
        r5.removeClass("selected");
        _rating = 4;
    });
    r5.hover(function () {
        r1.addClass("selected");
        r2.addClass("selected");
        r3.addClass("selected");
        r4.addClass("selected");
        r5.addClass("selected");
        _rating = 5;
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
                console.log('Successfully changed ticket state to delivered');
            },
            error: function (data) {
                console.log('GOT IN ERROR IN PURCHASEDDDAG');
                //data is the object send back on fail (could also just be string)
            }
        });
    }

})();

