/**
 * Created by juneruijiang on 5/17/16.
 */
function history(){
    $('#Driver').hide();

    $('.nav-tabs a').on('click', function (e) {
        $('li').removeClass('active');
    });

    e.preventDefault();
    $('#Driver').hide();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');

    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();

    $(target).fadeIn(600);s

};

function _historyLoad() {
    //Actual:
    //loadFromServer();

    //Simulation:
    var simulated_user = {
        order626: ["green eggs", "ham", "cheese"],
        order604: ["noodles", "ketchup", "egg", "cabbage", "chicken soup base"],
        order452: ["rice", "chicken"]
    };
    displayLoadedData(simulated_user);

    function loadFromServer() {
        var request = {
            "type": "get",
            "data": null
        };
    }

    function displayLoadedData(data) {
        var arr = [];
        var items1 = data.order626;
        var items2 = data.order604;
        var items3 = data.order452;

        for (var i = 0; i < items1.length; i++) {
            $("#driver-items1").append('<div class="driveritem" id="item' + i + '" class="btn">' + items1[i] + '</div>');
        }
        for (var i = 0; i < items2.length; i++) {
            $("#driver-items2").append('<div class="driveritem" id="item' + i + '" class="btn">' + items2[i] + '</div>');
        }
        for (var i = 0; i < items3.length; i++) {
            $("#driver-items3").append('<div class="driveritem" id="item' + i + '" class="btn">' + items3[i] + '</div>');
        }

    }
}

_historyLoad();
