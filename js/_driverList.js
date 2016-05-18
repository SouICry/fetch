function _driverList_load() {
    //Actual:
    //loadFromServer();

    //Simulation:
    var simulated_user = {
        id: 1234567,
        name: "Bob",
        items: ["aa", "bb", "cc", "dd"],
        contact: 1234567890,
        note: "none"
    };
    displayLoadedData(simulated_user);

    function loadFromServer() {
        var request = {
            "type": "get",
            "data": null
        };

        $.ajax({
            type: "POST",
            url: "/_driverList",
            data: request,
            success: function (data) {
                //data is the object sent back on success (could also just be string)
                displayLoadedData(data);
            },
            fail: function (data) {
                //data is the object send back on fail (could also just be string)
            }
        });
    }

    function displayLoadedData(data) {
        var arr = [];
        var items = data.items;
        var note = "#" + data.note;
        document.getElementById("listName").innerHTML = data.name + "'s Shopping List";
        document.getElementById("phone").innerHTML = "Phone: " + data.contact;
        $(note).prop('checked', true);
        for (var i = 0; i < items.length; i++) {
            $("#driver-items").append('<div class="driveritem" id="item' + i + '" class="btn">' + items[i] + '</div>');
        }

        $(".driveritem").click(function () {
            $(this).toggleClass("selected");

            arr = [];
            $('.driveritem.selected').each(function () {
                arr.push($(this).text());
            });

            if ((items.length - arr.length) === 1) {
                document.getElementById("left").innerHTML = (items.length - arr.length) + " item left";
            }
            else {
                document.getElementById("left").innerHTML = (items.length - arr.length) + " items left";
            }
        });

        $(document).ready(function () {

            document.getElementById("left").innerHTML = (items.length - arr.length) + " items left";

            $("#ready").click(function () {
                arr = [];
                $('.driveritem.selected').each(function () {
                    arr.push($(this).text());
                });

                if (arr.length != items.length) {
                    if ((items.length - arr.length) === 1) {
                        var flag = confirm("You still have " + (items.length - arr.length) + " item left in the" +
                            " shopping list, Are you sure to finish shopping now?");
                    }
                    else {
                        var flag = confirm("You still have " + (items.length - arr.length) + " items left in the" +
                            " shopping list, Are you sure to finish shopping now?");
                    }
                }

                if (arr.length === items.length || flag === true) {
                    alert("Succeed! Your customer will be notified soon.");
                }
            });
        });

    }
}

_driverList_load();/**
 * Created by juneruijiang on 5/17/16.
 */
