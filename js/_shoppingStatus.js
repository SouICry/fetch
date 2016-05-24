(function () {
    loader._shoppingStatus = {
        // data: "none",
        data: [{full_name: "Pamela Anderson", id: 91731}],
        version: 0, //Must be 0 
        getData: function () {
            return ;
        },
        loadData: function (data) {
            if (data == "none" || data.length == 0) {
                data = [];
            }

            else {
                alert(data[1].full_name);
                $("#shoppingStatus_driver_name").text(data[1].full_name);
                //
                // $(".card-background").prepend('<img class="card-bkimg" src="http://lorempixel.com/100/100/people/9/">');
                // $(".useravatar").prepend('<img src="http://lorempixel.com/100/100/people/9/">');
            }
        }
    };

})();

