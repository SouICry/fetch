(function () {
    loader._tickets = {
        data: ''/*[
         {name: "wholeFoods", time: "12:00 pm", id: "123"}, {name: "ralphs", time: "5:00 pm", id: "344"},
         {name: "tjs", time: "6:00 pm", id: "653"}, {name: "ralphs", time: "7:00 pm", id: "098"},
         {name: "vons", time: "7:00 pm", id: "897"}]*/,
        version: 0,
        // onPageLoad: function () {
        //     $.ajax({
        //         type: "POST",
        //         url: "/_tickets",
        //         contentType: "application/json",
        //         dataType: "json",
        //         data: null,
        //         success: function (data) {
        //             //data is the object sent back on success (could also just be string)
        //             loader._tickets.loadData(data);
        //         },
        //         error: function (data) {
        //             //data is the object send back on fail (could also just be string)
        //         }
        //     });
        // },
        getData: function () {
            return selected;
        },
        loadData: function (data) {

            alert('hello');
            $("#tickets_content").empty();
            if (data == null || data.length == 0) {
                $("#ticket_not").addClass("hide_ticket_not");
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

    $(".store").each(function () {

        $(this).off('click').click(function () {

            for (var x in selected) {
                selected[x] = false;
            }

            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            }
            else {
                $(this).addClass("selected");
            }

            $('.store.selected').each(function () {
                selected[$(this).data("name")] = true;
            });

            for (var x in selected) {
                var a = "." + x;
                if (selected[x] == false) {
                    $(a).addClass("hidden");
                }
                else {
                    $(a).removeClass("hidden");
                }
            }

            alert($("#tickets_content li").length)
            alert($("#tickets_content li.hidden").length)
            if ($("#tickets_content li").length-1 == $("#tickets_content li.hidden").length) {
                $("#ticket_not").removeClass("hide_ticket_not");
            }
            else {
                $("#ticket_not").addClass("hide_ticket_not");
            }
        });

    });

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
})();


