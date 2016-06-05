(function(){
    loader._congratsDriverFinishShopping = {
        data: null
    };

    $("#congrats_end_shopping_to_delivery").click(function(){
        updateTicketToDelivered();
        goToPage("_yourDeliveries");
    });

    function updateTicketToDelivered() {
        $.ajax({
            type: "POST",
            url: "/_driverList",
            data: {
                ticketId: loader.ticketId
            },
            success: function () {
            },
            error: function (data) {
                //data is the object send back on fail (could also just be string)
            }
        });
    }
})();