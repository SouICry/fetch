(function () {
    loader._history = {
        data:
            [/*{name: "wholeFoods", time: "12:00 pm", id: "222", state: "pending"},
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
            {name: "vons", time: "10:00 pm", id: "864", state: "draft"}*/],
        version: 0,
        onPageLoad: function() {
            $.ajax({
                type: "POST",
                url: "/_history",
                contentType: "application/json",
                dataType: "json",
                data: null,
                success: function (data) {
                    //data is the object sent back on success (could also just be string)
                    loader._history.loadData(data);
                },
                error: function (data) {
                    //data is the object send back on fail (could also just be string)
                }
            });
        },
        loadData: function (data) {
            $("#yourOrders_pending_tickets").empty();
            $("#yourOrders_accepted_tickets").empty();
            $("#yourOrders_shopped_tickets").empty();
            $("#yourOrders_delivered_tickets").empty();


            if (data == "none" || data.user_history.length == 0 || data.pending_list.length == 0) {

                $("#yourOrders_pending_tickets").append('<li class = "ticket"' +
                    '>No orders</li>');
                $("#yourOrders_accepted_tickets").append('<li class = "ticket"' +
                    '>No orders</li>');
                $("#yourOrders_shopped_tickets").append('<li class = "ticket"' +
                    '>No orders</li>');
                $("#yourOrders_delivered_tickets").append('<li class = "ticket"' +
                    '>No orders</li>');
                return;
            }

            var tickets = data;
            var pending_tickets  = [];
            var accepted_tickets = [];
            var shopped_tickets = [];
            var delivered_tickets = [];
            var extra = [];

            for (var i = 0; i < tickets.user_history.length; i++) {
                alert(tickets.user_history[i]);

                if (tickets.user_history[i].state == 'pending') {
                    pending_tickets.push(tickets.user_history[i]);
                }
                else if (tickets.user_history[i].state == 'accepted') {
                    accepted_tickets.push(tickets.user_history[i]);
                }
                else if (tickets.user_history[i].state == 'shopped') {
                    shopped_tickets.push(tickets.user_history[i]);
                }
                else if (tickets.user_history[i].state == 'delivered') {
                    delivered_tickets.push(tickets.user_history[i]);
                }
                else {
                    extra.push(tickets.user_history[i]);
                }
            }

            for (var i = 0; i < tickets.pending_list.length; i++) {
                alert(tickets.pending_list[i]);
                if (tickets.pending_list[i].state == 'pending') {
                    pending_tickets.push(tickets.pending_list[i]);
                }
                else if (tickets.pending_list[i].state == 'accepted') {
                    accepted_tickets.push(tickets.pending_list[i]);
                }
                else if (tickets.pending_list[i].state == 'shopped') {
                    shopped_tickets.push(tickets.pending_list[i]);
                }
                else if (tickets.pending_list[i].state == 'delivered') {
                    delivered_tickets.push(tickets.pending_list[i]);
                }
                else {
                    extra.push(tickets.pending_list[i]);
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
                $("#yourOrders_pending_tickets").append('<li  data-id="' + ticket._id + '" class = "yourOrders1 ' + ticket.store_name + ' ticket" ' + ' ><div  >'
                    + toName(ticket.store_name) + ' <br> Estimate Deliver Time: ' + ticket.time_created +
                    '</div></li>');
            }

            for (var i = 0; i < accepted_tickets.length; i++) {
                ticket = accepted_tickets[i];
                $("#yourOrders_accepted_tickets").append('<li  data-id="' + ticket._id + '" class = "yourOrders1 ' + ticket.store_name + ' ticket" ' + ' ><div  >'
                    + toName(ticket.store_name) + ' <br> Estimate Deliver Time: ' + ticket.time_created +
                    '</div></li>');
            }

            for (var i = 0; i < shopped_tickets.length; i++) {
                ticket = shopped_tickets[i];
                $("#yourOrders_shopped_tickets").append('<li  data-id="' + ticket._id + '" class = "yourOrders1 ' + ticket.store_name + ' ticket" ' + ' ><div  >'
                    + toName(ticket.store_name) + ' <br> Estimate Deliver Time: ' + ticket.time_created +
                    '</div></li>');
            }

            for (var i = 0; i < delivered_tickets.length; i++) {
                ticket = delivered_tickets[i];
                $("#yourOrders_delivered_tickets").append('<li  data-id="' + ticket._id + '" class = "yourOrders1 ' + ticket.store_name + ' ticket" ' + ' ><div  >'
                    + toName(ticket.store_name) + ' <br> Estimate Deliver Time: ' + ticket.time_created +
                    '</div></li>');
            }

            if (delivered_tickets.length = 0) {
                $("#yourOrders_pending_tickets").append('<li class = "ticket"' +
                    '>No orders</li>');
            }
            if (delivered_tickets.length = 0) {
                $("#yourOrders_accepted_tickets").append('<li class = "ticket"' +
                    '>No orders</li>');
            }
            if (delivered_tickets.length = 0) {
                $("#yourOrders_shopped_tickets").append('<li class = "ticket"' +
                    '>No orders</li>');
            }
            if (delivered_tickets.length = 0) {
                $("#yourOrders_completed_tickets").append('<li class = "ticket"' +
                    '>No orders</li>');
            }

            $('li.yourOrders1').each(function () {
                $(this).click(function () {
                    
                    // alert($(this).data("id"));
                    // loader.getTicket($(this).data("id"), $(this).data("state"));
                });
            });
        }
    };

    $('li.yourOrders1').each(function () {
        $(this).click(function () {
            alert($(this).data("id"));
            loader.getTicket($(this).data("id"), $(this).data("state"));
        });
    });

    $.ajax({
        type: "POST",
        url: "/_history",
        contentType: "application/json",
        dataType: "json",
        data: null,
        success: function (data) {
            //data is the object sent back on success (could also just be string)
            loader._history.loadData(data);
        },
        error: function (data) {
            //data is the object send back on fail (could also just be string)
        }
    });
})();

