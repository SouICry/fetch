(function () {
    loader._shoppingStatus = {
        data: {full_name: "Pamela Anderson", id: 91731, avatar: "http://lorempixel.com/100/100/people/9/"},
        version: 0, //Must be 0 
        getData: function () {
            return shoppingStatus_id;
        },
        loadData: function (data) {
            shoppingStatus_id = data.id;

            if (data == "none" || data.length == 0) {
                data = [];
            }

            else {
                $(".shoppingStatus_driver_name").text(data.full_name);

                $(".card-background").prepend('<img class="card-bkimg" src="' + data.avatar + '">');

                $(".useravatar").prepend('<img src="' + data.avatar +'">');
            }
        }
    };

    var shoppingStatus_id = 0;

    $('#shoppingStatus_list_btn').click(function () {
        goToPage("_shopping");
    });

})();

