(function () {
    loader._contact = {
        data: "none",
        version: 0,
        getData: function () {
            return contact_infoToSend;
        },
        loadData: function (data) {
        }
    };

    var contact_infoToSend = {};

    $("#contact_warning").hide();

    $('#contact_name, #contact_email, #contact_comment').keypress(function () {
        $("#contact_warning").hide();
    });

    $('#contact_submit').click(function () {
        contact_infoToSend = {
            name: $("#contact_name").val(),
            email: $("#contact_email").val(),
            comment: $("#contact_comment").val()
        };

        if ($('#contact_name, #contact_email, #contact_comment').val() != '') {
            goToPage("_homePage");
        }
        else {
            $("#contact_warning").show();
        }
    });

})();
