(function () {
    var congrats_ticketState = {};

    loader._congrats  = {
        data:{ticket_id: 3054},
        version: 0,
        getData: function () {
            return congrats_ticketState;
        },
        loadData: function (data) {
            congrats_ticketState = {
                ticket_id: data.id
            }
        }
    };

    $('#congrats-button').click(function () {

        goToPage("_yourDeliveries");
    });

})();
