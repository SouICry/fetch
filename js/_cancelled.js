(function () {
    var cancelled_ticketState = {};

    loader._cancelled  = {
        data:{ticket_id: 3054},
        version: 0,
        getData: function () {
            return cancelled_ticketState;
        },
        loadData: function (data) {
            cancelled_ticketState = {
                ticket_id: data.id
              //  state: "canceled"
            }
        }
    };

    $('#submit_cancelled').click(function () {
        goToPage("_homePage");
    });

})();
