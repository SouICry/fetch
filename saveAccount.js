// (function () {
//     console.log('saveAccount');
//     loader._accSetting = {
//         data: "", //Optional
//         version: 0, //Must be 0
//         getData: null,  //must be null if not needed
//         loadData: null,  // MUST RESET PAGE AS WELL
//     };
//     $('#accsetting_submit_info').prop('disabled', true);
//     $('#accsetting_email,#accsetting_full_name,#accsetting_phone,#accsetting_street,#accsetting_city,#accsetting_state,#accsetting_zip').keyup(function () {
//         if ($('#accsetting_email').val() && $('#accsetting_full_name').val() && $('#accsetting_phone').val()&& $('#accsetting_street').val() && $('#accsetting_city').val() && $('#accsetting_state').val() && $('#accsetting_zip').val()) {
//             $('#accsetting_submit_info').prop('disabled', false);
//         }
//         else {
//             $('#accSetting_submit_info').prop('disabled', true);
//         }
//     });
//
//
//     $('#submit_info').click(function () {
//         asshole3();
//     });
//
//     function asshole3() {
//         var _account = {
//             full_name: $('#accsetting_full_name').val(),
//             email: $('#accsetting_email').val(),
//             phone: $('#accsetting_phone').val(),
//             address: {
//                 street: $('#accsetting_street_').val(),
//                 city: $('#accsetting_city').val(),
//                 state: $('#accsetting_state').val(),
//                 zip: $('#accsetting_zip').val()
//             }
//     }
//         var info_to_send = {};
//         info_to_send.user = _account;
//         info_to_send.type = "send";
//
//         //Simulation (alert or console.log to check for yourself)
//         alert(JSON.stringify(info_to_send));
//
//         //Actual
//         $.ajax({
//             type: "POST",
//             url: "/_accSetting", //TODO is this should be accountSetting post,
//             data: info_to_send,
//             success: function (data) {
//                 //data is the object sent back on success (could also just be string)
//                 alert("Congrats!");
//
//             },
//             error: function (data) {
//                 //data is the object send back on fail (could also just be string)
//             }
//         });
//     }
// });
//
//
