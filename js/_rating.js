(function() {
    loader._rating= {
        data:"", //Optional
        version: 0, //Must be 0
        getData:null,
        loadData: null,
    };
    var _rating = 0;
    var r1 = $('#rating-1'), r2 = $('#rating-2'), r3 = $('#rating-3'), r4 = $('#rating-4'), r5 = $('#rating-5');
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

    $('#rate-user').click(function () {
        if (_rating !== 0) {
            sendToServer();
        }
    });

    function sendToServer() {
        var info_to_send = {};
        info_to_send.id = $('#user-name').data('id');
        info_to_send.rating = _rating;
        info_to_send.type = "send";

        //Simulation (alert or console.log to check for yourself)
        alert(JSON.stringify(info_to_send));

        //Actual
        $.ajax({
            type: "POST",
            url: "/_rating",
            data: info_to_send,
            success: function (data) {
                //data is the object sent back on success (could also just be string)
                alert("Congrats!");
            },
            fail: function (data) {
                //data is the object send back on fail (could also just be string)
            }
        });
    }


    $('#simulate-load-user').click(function () {
        //Actual:
        //loadFromServer();

        //Simulation:
        var simulated_user = {
            id: 1234567,
            name: "Bob",
            "profile-picture": null
        };
        displayLoadedData(simulated_user);
    });

    function loadFromServer() {
        var request = {
            "type": "get",
            "userId": "asdf18273624",
            "data": null
        };

        $.ajax({
            type: "POST",
            url: "/_rating",
            data: request,
            success: function (data) {
                //data is the object sent back on success (could also just be string)
                displayLoadedData(data);
            },
            error: function (data) {
                //data is the object send back on fail (could also just be string)
            }
        });
    }

    function displayLoadedData(data) {
        $('#user-name').text(data.name).data('id', data.id);
        if (data["profile-picture"] !== null) {
            $('#user-image').data('src', data["profile-picture"]);
        }
    }
})();
