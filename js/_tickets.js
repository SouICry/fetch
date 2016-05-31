(function () {
    var interval;
    loader._tickets = {
        data: ''/*[
         {name: "wholeFoods", time: "12:00 pm", id: "123"}, {name: "ralphs", time: "5:00 pm", id: "344"},
         {name: "tjs", time: "6:00 pm", id: "653"}, {name: "ralphs", time: "7:00 pm", id: "098"},
         {name: "vons", time: "7:00 pm", id: "897"}]*/,
        version: 0,
        onPageLoad: function () {
            getQueueTickets();
            // interval = setInterval(getQueueTickets, 1000);
        },
        onPageLeave: function(){
            //clearInterval(interval);
        },
        getData: function () {

        },
        loadData: function (data) {

            $("#tickets_content").html("");
            if (data == null || data.length == 0) {
                $("#tickets_content").append('<li id="ticket_not " class = "ticket"' +
                    '>No tickets available</li>');
            }
            else {
                function toName(nameString) {
                    var name = {};
                    name['wholeFoods'] = "WholeFoods";
                    name['ralphs'] = "Ralph's";
                    name['tjs'] = "Trader Joe's";
                    name['vons'] = "Vons";

                    return name[nameString];
                }

                $("#tickets_content").append('<li id="ticket_not" class = "ticket"' +
                    '>No tickets available</li>');

                for (var i = 0; i < data.length; i++) {
                    $("#tickets_content").append('<li data-ticketId="' + data[i]._id +
                        '" class = "' + data[i].store_name + ' ticket" ' +
                        ' ><div id =' + data[i].store_name + ' >' + toName(data[i].store_name) +
                        ' <br> Estimate Deliver Time: ' + (data[i].time_created) + '</div></li>'); // TODO: UPDATE TO ESTIMATED TIME
                }
                if (data.length > 0) {
                    $('#ticket_not').addClass("hide_ticket_not");
                }

                $('#tickets_content li').click(function () {
                    if ($(this).attr("data-ticketId") != null) {
                        // Find the ticket with that id
                        var ticket = null;
                        for (var j = 0; j < data.length; j++) {
                            if (data[j]._id == $(this).attr('data-ticketId')) {
                                ticket = data[j];
                                break;
                            }
                        }
                        loader.ticketId = $(this).data('ticketId');
                        loader._viewTicket.loadData(ticket);
                        goToPage('_viewTicket');
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

    var selectedCount = 0;


    $(".ticket-check").off('click').click(function () {
        if ($(this).parent().hasClass("selected")) {
            $(this).parent().removeClass("selected");
            selectedCount--;
            console.log(selectedCount);
            if (selectedCount == 0) {
                $('#tickets li').removeClass("hidden");
            }
            else {
                $('.' + $(this).data("name")).each(function () {
                    $(this).addClass("hidden");
                })
            }
        }
        else {
            $(this).parent().addClass("selected");
            selectedCount++;
            console.log(selectedCount);
            if (selectedCount == 1) {
                $('#tickets li').addClass("hidden");
                $('.' + $(this).data("name")).each(function () {
                    $(this).removeClass("hidden");
                })
            }
            else {
                $('.' + $(this).data("name")).each(function () {
                    $(this).removeClass("hidden");
                })
            }
        }
    });


    function getQueueTickets() {
        $.ajax({
            type: "POST",
            url: "/_tickets",
            contentType: "application/json",
            dataType: "json",
            data: null,
            success: function (data) {
                //data is the object sent back on success (could also just be string)
                loader._tickets.loadData(data);
            },
            error: function (data) {
                //data is the object send back on fail (could also just be string)
            }
        });
    }
})
();


