(function () {
    var submitted_ticketState = {};

    loader._submitted  = {
        data:{ticket_id: 3054},
        version: 0,
        getData: function () {
            return submitted_ticketState;
        },
        loadData: function (data) {
            submitted_ticketState = {
                ticket_id: data.id,
                state: "pending"
            }
        },
        onPageLoad : function(){
            loader._shopping.loadData(null);
            loader._checkout.loadData(null);
        }

    };

    $('#submit_submitted').click(function () {
        goToPage("_congrats");
    });

})();
