// $('#tickets_content div').click(function () {
//     window.location.href = $(this).data("link");
// });
//
// function _tickets_load() {
//     //Actual:
//     //loadFromServer();
//
//     //Simulation:
//     var simulated_user = {
//         id: 1234567,
//         tickets: [{name: "wholeFoods", time: "12:00 pm"}, {name: "ralphs", time: "5:00 pm"}, {name: "tjs", time: "6:00 pm"},
//             {name: "ralphs", time: "7:00 pm"}, {name: "vons", time: "7:00 pm"}]
//     };
//     displayLoadedData(simulated_user);
//
//     loader._tickets.loadData = function displayLoadedData(data) {
//         var tickets = [];
//         tickets = data.tickets;
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
//         var selected = {
//             ralphs: true,
//             wholeFoods: true,
//             tjs: true,
//             vons: true
//         };
//
//         for (var i = 0; i < tickets.length; i++) {
//             $("#tickets_content").append('<li class = "' + tickets[i].name + ' ticket" ' +
//                 ' ><div id =' + tickets[i].name + ' >' + toName(tickets[i].name) +
//                 ' <br> Estimate Deliver Time: ' + tickets[i].time + '</div></li>');
//         }
//
//         $(document).ready(function () {
//             $(".store").each(function () {
//
//                 $(this).click(function () {
//                     for (var x in selected) {
//                         selected[x] = false;
//                     }
//
//                     $(this).toggleClass("selected");
//
//                     $('.store.selected').each(function () {
//                         selected[$(this).data("name")] = true;
//                     });
//
//
//                     for (var x in selected) {
//                         var a = "." + x;
//                         //console.log(selected[x]);
//                         if (selected[x] == true) {
//                             if ($(a).hasClass("hidden")) {
//                                 $(a).removeClass("hidden");
//                             }
//                             $(a).addClass("show");
//                         }
//                         else {
//                             //console.log("hide");
//                             if ($(a).hasClass("show")) {
//                                 $(a).removeClass("show");
//                             }
//                             $(a).addClass("hidden");
//                         }
//                     }
//                 });
//             });
//
//         });
//     }
// }
// _tickets_load();/**
//  * Created by juneruijiang on 5/17/16.
//  */
