<<<<<<< HEAD
// /**
//  * Created by juneruijiang on 5/17/16.
//  */
(function () {
    //Actual:
    //loadFromServer();

    //Simulation:
    var simulated_user = {
        tickets: [{name: "wholeFoods", time: "12:00 pm", id: "222", state: "pending"},
            {name: "ralphs", time: "1:00 pm", id: "333", state: "pending"},
            {name: "tjs", time: "2:00 pm", id: "555", state: "pending"},
            {name: "wholeFoods", time: "12:00 pm", id: "123", state: "accepted"},
            {name: "ralphs", time: "1:00 pm", id: "234", state: "accepted"},
            {name: "tjs", time: "2:00 pm", id: "234", state: "accepted"},
            {name: "ralphs", time: "3:00 pm", id: "345", state: "shopped"},
            {name: "vons", time: "4:00 pm", id: "665", state: "shopped"},
            {name: "wholeFoods", time: "5:00 pm", id: "342", state: "shopped"},
            {name: "ralphs", time: "6:00 pm", id: "352", state: "shopped"},
            {name: "tjs", time: "7:00 pm", id: "525", state: "delivered"},
            {name: "ralphs", time: "8:00 pm", id: "532", state: "delivered"},
            {name: "vons", time: "9:00 pm", id: "864", state: "delivered"},
            {name: "vons", time: "10:00 pm", id: "864", state: "draft"}
        ]
    };
    displayLoadedData(simulated_user);

    function displayLoadedData(data) {

        var tickets = [];
        tickets = data.tickets;
        var pending_tickets = [];

        var accepted_tickets = [];

        var shopped_tickets = [];

        var delivered_tickets = [];

        var extra = [];


        for (var i = 0; i < tickets.length; i++) {

            if(tickets[i].state == 'pending'){
                pending_tickets.push(tickets[i]);
                console.log('pending');
            }
            else if (tickets[i].state == 'accepted') {
                accepted_tickets.push(tickets[i]);
                console.log('accept');
            }
            else if (tickets[i].state == 'shopped') {
                shopped_tickets.push(tickets[i]);
                console.log('shop');
            }
            else if (tickets[i].state == 'delivered') {
                delivered_tickets.push(tickets[i]);
                console.log('deliver');
            }
            else {
                extra.push(tickets[i]);
                console.log('extra');

            }
        }

        function toName(nameString) {
            var name = {};
            name['wholeFoods'] = "WholeFoods";
            name['ralphs'] = "Ralph's";
            name['tjs'] = "Trader Joe's";
            name['vons'] = "Vons";

            return name[nameString];
        }

        var ticket;
        for (var i = 0; i < pending_tickets.length; i++) {
            ticket = pending_tickets[i];
            $("#yourDeliveries_pending_tickets").append('<li  data-id="' + ticket.id + '" class = "yourDeliveries1 ' + ticket.name + ' ticket" ' + ' ><div  >'
                + toName(ticket.name) + ' <br> Estimate Deliver Time: ' + ticket.time +
                '</div></li>');
        }

        for (var i = 0; i < accepted_tickets.length; i++) {
            ticket = accepted_tickets[i];
            $("#yourDeliveries_accepted_tickets").append('<li  data-id="' + ticket.id + '" class = "yourDeliveries1 ' + ticket.name + ' ticket" ' + ' ><div  >'
                + toName(ticket.name) + ' <br> Estimate Deliver Time: ' + ticket.time +
                '</div></li>');
        }

        for (var i = 0; i < shopped_tickets.length; i++) {
            ticket = shopped_tickets[i];
            $("#yourDeliveries_shopped_tickets").append('<li  data-id="' + ticket.id + '" class = "yourDeliveries1 ' + ticket.name + ' ticket" ' + ' ><div  >'
                + toName(ticket.name) + ' <br> Estimate Deliver Time: ' + ticket.time +
                '</div></li>');
        }

        for (var i = 0; i < delivered_tickets.length; i++) {
            ticket = delivered_tickets[i];
            $("#yourDeliveries_delivered_tickets").append('<li  data-id="' + ticket.id + '" class = "yourDeliveries1 ' + ticket.name + ' ticket" ' + ' ><div  >'
                + toName(ticket.name) + ' <br> Estimate Deliver Time: ' + ticket.time +
                '</div></li>');
        }

        $('li.yourDeliveries1').each(function () {
            $(this).click(function () {
                alert($(this).data("id"));
                loader.getTicket($(this).data("id"), $(this).data("state"))
            });
        });

    }
})();
=======
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
>>>>>>> 7c906d05326b5403d4c643a4f096c65257f91ab5
