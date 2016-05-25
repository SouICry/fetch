(function () {
    var cancelTicket_ticketState = {};

    loader._cancelTicket  = {
        data:{ticket_id: 3054},
        version: 0,
        getData: function () {
            return cancelTicket_ticketState;
        },
        loadData: function (data) {
            cancelTicket_ticketState = {
                ticket_id: data.id,
                  state: "canceled"
            }
        }
    };

    $('#submit_cancelTicket').click(function () {
        goToPage("_homePage");
    });

})();
