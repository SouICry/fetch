(function () {
    loader._yourDeliveries = {
        data:
        [{name: "wholeFoods", time: "12:00 pm", id: "123", state: "accepted"},
        {name: "ralphs", time: "1:00 pm", id: "234", state: "accepted"},
        {name: "tjs", time: "2:00 pm", id: "234", state: "accepted"},
        {name: "ralphs", time: "3:00 pm", id: "345", state: "shopped"},
        {name: "vons", time: "4:00 pm", id: "665", state: "shopped"},
        {name: "wholeFoods", time: "5:00 pm", id: "342", state: "shopped"},
        {name: "ralphs", time: "6:00 pm", id: "352", state: "shopped"},
        {name: "tjs", time: "7:00 pm", id: "525", state: "delivered"},
        {name: "ralphs", time: "8:00 pm", id: "532", state: "delivered"},
        {name: "vons", time: "9:00 pm", id: "864", state: "delivered"},
        {name: "vons", time: "10:00 pm", id: "864", state: "draft"}],
        version: 0,
        loadData: function (data) {
            $("#yourDeliveries__accepted_tickets").empty();
            $("#yourDeliveries_shopped_tickets").empty();
            $("#yourDeliveries_delivered_tickets").empty();

            if (data == "none" || data.length == 0) {
                $("#yourDeliveries_accepted_tickets").append('<li id="yourDeliveries_ticket_not" class = "ticket"' +
                    '>No deliveries</li>');
                $("#yourDeliveries_shopped_tickets").append('<li id="yourDeliveries_ticket_not" class = "ticket"' +
                    '>No deliveries</li>');
                $("#yourDeliveries_delivered_tickets").append('<li id="yourDeliveries_ticket_not" class = "ticket"' +
                    '>No deliveries</li>');
                return;
            }

            var tickets = [];
            tickets = data;

            var accepted_tickets = [];
            var shopped_tickets = [];
            var delivered_tickets = [];
            var extra = [];

            for (var i = 0; i < tickets.length; i++) {
                if (tickets[i].state == 'accepted') {
                    accepted_tickets.push(tickets[i]);
                }
                else if (tickets[i].state == 'shopped') {
                    shopped_tickets.push(tickets[i]);
                }
                else if (tickets[i].state == 'delivered') {
                    delivered_tickets.push(tickets[i]);
                }
                else {
                    extra.push(tickets[i]);
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

            if (accepted_tickets.length = 0) {
                $("#yourDeliveries_accepted_tickets").append('<li id="yourDeliveries_ticket_not" class = "ticket"' +
                    '>No deliveries</li>');
            }
            if (shopped_tickets.length = 0) {
                $("#yourDeliveries_shopped_tickets").append('<li id="yourDeliveries_ticket_not" class = "ticket"' +
                    '>No deliveries</li>');
            }
            if (delivered_tickets.length = 0) {
                $("#yourDeliveries_delivered_tickets").append('<li id="yourDeliveries_ticket_not" class = "ticket"' +
                    '>No deliveries</li>');
            }

            $('li.yourDeliveries1').each(function () {
                $(this).click(function () {
                    loader.getTicket($(this).data("id"), $(this).data("state"))
                });
            });

        }

    };

    $('li.yourDeliveries1').each(function () {
        $(this).click(function () {
            loader.getTicket($(this).data("id"), $(this).data("state"))
        });
    });

    $('#_viewTicket_submit_list').click(function () {
        goToPage("_yourDeliveries");
        assholes40();
    });

    function assholes40() {
        var info_to_send = {};
        info_to_send.id = $('#user-name').data('id');
        info_to_send.type = "get";

        //Actual
        $.ajax({
                type: "POST",
                url: "/_yourDeliveries",
                data: info_to_send,
                success: function (data) {
                    //data is the object sent back on success (could also just be string)

                    loader._viewTicket.loadData(data);
                },
                error: function (data) {
                    alert("fail");
                    //data is the object send back on fail (could also just be string)
                }
            }
        );
    }
})();

