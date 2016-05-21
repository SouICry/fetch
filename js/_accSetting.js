var user_data = null;

function accSetting() {
    $('#address').hide();
    $('#payment').hide();
    $('#delete').hide();

    $('.nav-tabs a').on('click', function (e) {
        $('li').removeClass('active');

        e.preventDefault();
        $('#delete').hide();
        $('#address').hide();
        $('#payment').hide();
        $('#home').hide();
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');

        target = $(this).attr('href');

        $('.tab-content > div').not(target).hide();

        $(target).fadeIn(600);

    });

    var _account = {
        full_name: "",
        email: "",
        phone_number: "",
        address: {
            street: "",
            city: "",
            state: "",
            zip: ""
        },
        payment_info: {
            card_holder_name: '',
            card_number: '',
            exp_month: '',
            exp_year: '',
            cvv: ''
        }
    };

    $('#submit_accInfo').click(function () {
        _account.full_name= $('#usr').val();
        _account.email= $('#email').val();
        _account.phone= $('#phone').val();

        asshole3();
    });

    $('#submit_address').click(function () {
        _account.street= $('#street').val();
        _account.city= $('#city').val();
        _account.state= $('#state').val();
        _account.zip= $('#zip').val();

        asshole3();
    });

    $('#submit_card').click(function () {
        _account.cardName= $('#cardName').val();
        _account.cardNumber= $('#card').val();
        _account.cardMonth= $('#month').val();
        _account.cardYear= $('#year').val();
        _account.cardCVV= $('#cvv').val();

        asshole3();
    });

    $('#submit_delete').click(function () {
        asshole3();
    });

    function asshole3() {
        var info_to_send = {};
        info_to_send.user = _account;
        info_to_send.type = "send";

        //Simulation (alert or console.log to check for yourself)
        alert(JSON.stringify(info_to_send));

        //Actual
        $.ajax({
            type: "POST",
            url: "/_shopping",
            data: info_to_send,
            success: function(data){
                //data is the object sent back on success (could also just be string)
                alert("Congrats!");

                // For updating the input fields with the user data
                $('#accsetting_full_name').val(data.full_name);
                $('#accsetting_email').val(data.email);
                $('#accsetting_phone').val(data.phone);

                $('#street').val(data.address.street);
                $('#city').val(data.address.city);
                $('#state').val(data.address.state);
                $('#zip').val(data.address.zip);

                $('#cardName').val(data.payment_info.card_holder_name);
                $('#card').val(data.payment_info.card_number);
                $('#month').val(data.payment_info.exp_month);
                $('#year').val(data.payment_info.exp_year);
                $('#cvv').val(data.payment_info.cvv);
            },
            error: function(data){
                //data is the object send back on fail (could also just be string)
            }
        });
    }
}

accSetting();