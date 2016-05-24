$.ajax({
    type: "POST",
    url: "/_accSettings", //TODO is this should be accountSetting post,
    data: {type: 'request_data'},
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