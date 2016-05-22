(function () {
    loader._tickets = {
        data: "",
        version: 0,
        getData: function () {
            return selected;
        },
        loadData: function (data) {
            if (data != "none") {
                var tickets = [];
                tickets = data.tickets;

                function toName(nameString) {
                    var name = {};
                    name['wholeFoods'] = "WholeFoods";
                    name['ralphs'] = "Ralph's";
                    name['tjs'] = "Trader Joe's";
                    name['vons'] = "Vons";

                    return name[nameString];
                }

                if (tickets.length == 0){
                    $("#tickets_content").append('<li id="ticket_not" class = "ticket"' +
                        '>No tickets available</li>');
                }

                for (var i = 0; i < tickets.length; i++) {
                    $("#tickets_content").append('<li data-ticketId="' + tickets[i].id + '" class = "' + tickets[i].name + ' ticket" ' +
                        ' ><div id =' + tickets[i].name + ' >' + toName(tickets[i].name) +
                        ' <br> Estimate Deliver Time: ' + tickets[i].time + '</div></li>');
                }

                $('#tickets_content li').click(function () {
                    if ($(this).attr("id") != 'ticket_not') {
                        alert( 'hi' );
                        loader.getTicket($(this).data("ticketId"));
                    }
                });

            }
        }
    };

    var selected = {
        ralphs: true,
        wholeFoods: true,
        tjs: true,
        vons: true
    };


    //Simulation:
    var simulated_user = {
        tickets: [{name: "wholeFoods", time: "12:00 pm", id: "123"}, {name: "ralphs", time: "5:00 pm", id: "344"},
            {name: "tjs", time: "6:00 pm", id: "653"}, {name: "ralphs", time: "7:00 pm", id: "098"},
            {name: "vons", time: "7:00 pm", id: "897"}]
    };
    var simulated_user2 = {
        tickets: []
    };

    loader._tickets.loadData(simulated_user);


        $(".store").each(function () {

            $(this).click(function () {
                for (var x in selected) {
                    selected[x] = false;
                }

                $(this).toggleClass("selected");

                $('.store.selected').each(function () {
                    selected[$(this).data("name")] = true;
                });


                for (var x in selected) {
                    var a = "." + x;
                    //console.log(selected[x]);
                    if (selected[x] == true) {
                        if ($(a).hasClass("hidden")) {
                            $(a).removeClass("hidden");
                        }
                        $(a).addClass("show");
                    }
                    else {
                        //console.log("hide");
                        if ($(a).hasClass("show")) {
                            $(a).removeClass("show");
                        }
                        $(a).addClass("hidden");
                    }
                }
            });
        });

})();

