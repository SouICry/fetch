(function () {
    loader._rateUser = {
        data: {user_full_name: "Jane Doe", userId: 133},
        getData: null,
        loadData: function (data) {
            //var usImage = $('#rateUser-img');
            $("#user-name_rateUser").html("");
            $('#rateUser-img').src = "/placeholder/person4.png";

            document.getElementById("user-name_rateUser").innerHTML = "Shopper name: " + data.user_full_name;
            
            var imageSrc = "images/profiles/" + data.userId + ".png";

            if (imageSrc !== null) {
                $('#rateUser-img').attr('src', imageSrc);
            }
        },
        onPageLoad: function(data) {
            if(UrlExists('images/profiles/' + loader.userId + '.png')) {
                document.getElementById("rateUser-img").src = 'images/profiles/' + loader.userId + '.png';
            }
            document.getElementById("user-name_rateUser").innerHTML = "Shopper name:" + loader.shopperFullName;
        }
    };


    $(".userRate_button").click(function(){
        changeTicketState();
        goToPage("_congratsTicketClosed");
    });

    var _rating = 0;
    var r1 = $('#user_rating-1'), r2 = $('#user_rating-2'), r3 = $('#user_rating-3'), r4 = $('#user_rating-4'), r5 = $('#user_rating-5');
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

