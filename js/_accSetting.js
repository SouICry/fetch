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
        username:"",
        first:"",
        last:"",
        email:"",
        phone:"",
        street:"",
        city:"",
        state:"",
        zip:"",
        cardName:"",
        cardNumber:"",
        cardMonth:"",
        cardYear:"",
        cardCVV:""
    };

    $('#submit_accInfo').click(function () {
        _account.username= $('#usr').val();
        _account.first= $('#fname').val();
        _account.last= $('#lname').val();
        _account.email= $('#email').val();
        _account.phone= $('#phone').val();

        sendToServer();
    });

    $('#submit_address').click(function () {
        _account.street= $('#street').val();
        _account.city= $('#city').val();
        _account.state= $('#state').val();
        _account.zip= $('#zip').val();

        sendToServer();
    });

    $('#submit_card').click(function () {
        _account.cardName= $('#cardName').val();
        _account.cardNumber= $('#card').val();
        _account.cardMonth= $('#month').val();
        _account.cardYear= $('#year').val();
        _account.cardCVV= $('#cvv').val();

        sendToServer();
    });

    window.onload = function() {
        var data = null;
        $.ajax({
            type: 'POST',
            url: '/_accSetting',
            data: data,
            success: function(data) {
                alert('called post to update');

                $('#usr').val(data.username);
                $('#fname').val(data.first);
                $('#lname').val(data.last);
                $('#email').val(data.email);
                $('#phone').val(data.phone);

                $('#street').val(data.street);
                $('#city').val(data.city);
                $('#state').val(data.state);
                $('#zip').val(data.zip);

                $('#cardName').val(data.cardName);
                $('#card').val(data.card);
                $('#month').val(data.month);
                $('#year').val(data.year);
                $('#cvv').val(data.cvv);

        });
    };

    $('#submit_delete').click(function () {
        sendToServer();
    });

    function sendToServer(){
        var info_to_send = {};
        info_to_send.id = $('#user-name').data('id');
        info_to_send.list = _account;
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
            },
            error: function(data){
                //data is the object send back on fail (could also just be string)
            }
        });
    }
}

accSetting();