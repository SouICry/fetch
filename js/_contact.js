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
        alert(JSON.stringify(contact_infoToSend));
        contactSite();
        
        if ($('#contact_name, #contact_email, #contact_comment').val() != '') {
            goToPage("_homePage");
        }
            
        else {
            $("#contact_warning").show();
        }
    });

    function contactSite() {
        $.ajax({
            type: "POST",
            url: "/_contact",
            data: contact_infoToSend,
            success: function (data) {
                //data is the object sent back on success (could also just be string)
            },
            error: function (data) {
                //data is the object send back on fail (could also just be string)
            }
        });
    }
})();
