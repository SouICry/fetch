(function () {
    loader._accSetting = {
        data: "", //Optional
        version: 0, //Must be 0
        getData: function () { //must be null if not needed

            _account.full_name = $('#accsetting_full_name').val();
            _account.email = $('#accsetting_email').val();
            _account.phone = $('#accsetting_phone').val();
            _account.address.street = $('#accsetting_street').val();
            _account.address.city = $('#accsetting_city').val();
            _account.address.state = $('#accsetting_state').val();
            _account.address.zip = $('#accsetting_zip').val();
            return _account;
        },
        loadData: function (data) { // MUST RESET PAGE AS WELL
            // must be null if not needed
            alert('accsetting: ' + data);
            if (data != "none") {
                $('#accsetting_full_name').val(data.full_name);
                $('#accsetting_email').val(data.email);
                $('#accsetting_phone').val(data.phone);

                $('#accsetting_street').val(data.address.street);
                $('#accsetting_city').val(data.address.city);
                $('#accsetting_state').val(data.address.state);
                $('#accsetting_zip').val(data.address.zip);
            }
            else {
                _account = {
                    full_name: "",
                    email: "",
                    phone: "",
                    address: {
                        street: "",
                        city: "",
                        state: "",
                        zip: ""
                    }
                };
            }
        }

    };
    var user_data = null;

    var _account = {
        full_name: "",
        email: "",
        phone: "",
        address: {
            street: "",
            city: "",
            state: "",
            zip: ""
        }
    };

    $('#submit_info').click(function () {
        _account.full_name = $('#accsetting_full_name').val();
        _account.email = $('#accsetting_email').val();
        _account.phone = $('#accsetting_phone').val();

        _account.street = $('#accsetting_street').val();
        _account.city = $('#accsetting_city').val();
        _account.state = $('#accsetting_state').val();
        _account.zip = $('#accsetting_zip').val();

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
            url: "/_shopping", //TODO is this should be accountSetting post, 
            data: info_to_send,
            success: function (data) {
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

            },
            error: function (data) {
                //data is the object send back on fail (could also just be string)
            }
        });
    }

})();