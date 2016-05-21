 // // $('#tickets_content div').click(function () {
// //     window.location.href = $(this).data("link");
// // });
//
// function _tickets_load() {
//     //Actual:
//     //loadFromServer();
//
//     //Simulation:
//     var simulated_user = {
//         id: 1234567,
//         pending_tickets: [{name: "wholeFoods", time: "12:00 pm"}, {name: "ralphs", time: "5:00 pm"}, {name: "tjs", time: "6:00 pm"},
//             {name: "ralphs", time: "7:00 pm"}, {name: "vons", time: "7:00 pm"}]
//         // completed_tickets: [{name: "wholeFoods", time: "1:00 pm"}, {name: "ralphs", time: "2:00 pm"}, {name: "tjs", time: "3:00 pm"},
//         //     {name: "ralphs", time: "4:00 pm"}, {name: "vons", time: "5:00 pm"}]
//     };
//     displayLoadedData(simulated_user);
//
//     function loadFromServer() {
//         var request = {
//             "type": "get",
//             "data": null
//         };
//
//         $.ajax({
//             type: "POST",
//             url: "/_yourDeliveries",
//             data: request,
//             success: function (data) {
//                 //data is the object sent back on success (could also just be string)
//                 displayLoadedData(data);
//             },
//             error: function (data) {
//                 //data is the object send back on fail (could also just be string)
//             }
//         });
//     }
//
//     function displayLoadedData(data) {
//         var pending_tickets = [];
//         pending_tickets = data.pending_tickets;
//
//         // var completed_tickets = [];
//         // completed_tickets = data.completed_tickets;
//
//         function toName(nameString) {
//             var name = {};
//             name['wholeFoods'] = "WholeFoods";
//             name['ralphs'] = "Ralph's";
//             name['tjs'] = "Trader Joe's";
//             name['vons'] = "Vons";
//
//             return name[nameString];
//         }
//
//         for (var i = 0; i < pending_tickets.length; i++) {
//             $("#pending_tickets").append('<li class = "' + tickets[i].name + ' ticket" ' +
//                 ' ><div id =' + tickets[i].name + ' >' + toName(tickets[i].name) +
//                 ' <br> Estimate Deliver Time: ' + tickets[i].time + '</div></li>');
//         }
//
//         // for (var j = 0; j < completed_tickets.length; j++) {
//         //     $("#completed_tickets").append('<li class = "' + tickets[j].name + ' ticket" ' +
//         //         ' ><div id =' + tickets[j].name + ' >' + toName(tickets[j].name) +
//         //         ' <br> Estimate Deliver Time: ' + tickets[j].time + '</div></li>');
//         // }
//     }
// }
// _tickets_load();/**
//  * Created by juneruijiang on 5/17/16.
//  */
