
// function _tickets_load() {
//     //Actual:
//     //loadFromServer();
//
//     //Simulation:
//     var simulated_user = {
//         pending_tickets: [{name: "wholeFoods", time: "12:00 pm", id: "123", state: "pending"}, {
//             name: "ralphs",
//             time: "5:00 pm",
//             state: "pending"
//         },
//             {name: "tjs", time: "6:00 pm", state: "pending"}, {
//                 name: "ralphs",
//                 time: "7:00 pm",
//                 state: "pending"
//             }, {name: "vons", time: "7:00 pm", state: "pending"},
//             {name: "wholeFoods", time: "1:00 pm", state: "pending"}, {
//                 name: "ralphs",
//                 time: "2:00 pm",
//                 state: "pending"
//             },
//             {name: "tjs", time: "3:00 pm", state: "pending"}, {
//                 name: "ralphs",
//                 time: "4:00 pm",
//                 state: "pending"
//             }, {name: "vons", time: "5:00 pm", state: "pending"}]
//     };
//     displayLoadedData(simulated_user);
//
//     loader._yourDeliveries.loadData = function displayLoadedData(data) {
//         var pending_tickets = [];
//         pending_tickets = data.pending_tickets;
//
//         var completed_tickets = [];
//         completed_tickets = data.completed_tickets;
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
//
//         for (var i = 0; i < pending_tickets.length; i++) {
//             var ticket = pending_tickets[i];
//
//             $("#pending_tickets").append('<li data-id =' + pending_tickets[i].name + ' data-state="' +
//                 pending_tickets[i].state + '" class = "yourDeliveries1 ' + pending_tickets[i].name + ' ticket" ' +
//                 ' ><div  >' + toName(pending_tickets[i].name) +
//                 ' <br> Estimate Deliver Time: ' + pending_tickets[i].time + '</div></li>');
//         }
//
//         for (var i = 0; i < completed_tickets.length; i++) {
//             $("#completed_tickets").append('<li class = "' + completed_tickets[i].name + ' ticket" ' +
//                 ' ><div id =' + completed_tickets[i].name + ' >' + toName(completed_tickets[i].name) +
//                 ' <br> Estimate Deliver Time: ' + completed_tickets[i].time + '</div></li>');
//         }
//
//
//         $('li.yourDeliveries').each(function () {
//             $(this).click(loader.loadTicket($(this).data("id"), $(this).data("state")));
//         });
//
//     }
// }
//
// _tickets_load();
// /**
//  * Created by juneruijiang on 5/17/16.
//  */
