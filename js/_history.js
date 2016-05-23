// /**
//  * Created by juneruijiang on 5/17/16.
//  */
//
// function _historyLoad() {
//     //Actual:
//     //loadFromServer();
//
//     //Simulation:
//     var simulated_user = {
//         shoppingOrder626: ["green eggs", "ham", "cheese"],
//         shoppingOrder604: ["noodles", "ketchup", "egg", "cabbage", "chicken soup base"],
//         shoppingOrder452: ["rice", "chicken"],
//         // driverOrder726: ["noodles","egg","cabbage"],
//         // driverOrder704: ["pasta", "sausa" ,]
//     };
//     displayLoadedData(simulated_user);
//
//     function loadFromServer() {
//         var request = {
//             "type": "get",
//             "data": null
//         };
//     }
//
//     function displayLoadedData(data) {
//
//         var driveryGrocery = request driver_grocery_list;
//         var userGrocery = request user_grocery_list;
//
//         var groceryObj1 = {
//                             store: "whole_foods",
//                             items: ['snowbubbles', 'mango', 'pineapple', 'banana'],
//                             time_created: '9/9/16 5:58:00 PM',
//                             list_taken: false
//                         };
//
//         var groceryObj2= {
//             store: "vons",
//             items: ['mango', 'pineapple', 'banana'],
//             time_created: '8/9/16 5:58:00 PM',
//             list_taken: false
//         };
//
//
//         var arr = [groceryObj1, groceryObj2];
//
//         for (var i = 0; i < items1.length; i++) {
//             $("#driver-items1").append('<div class="driveritem" id="item' + i + '" class="btn">' + items1[i] + '</div>');
//         }
//         for (var i = 0; i < items2.length; i++) {
//             $("#driver-items2").append('<div class="driveritem" id="item' + i + '" class="btn">' + items2[i] + '</div>');
//         }
//         for (var i = 0; i < items3.length; i++) {
//             $("#driver-items3").append('<div class="driveritem" id="item' + i + '" class="btn">' + items3[i] + '</div>');
//         }
//
//     }
//
//     // function history(){
//     //     $('#accordionDriver').hide();
//     //
//     //     $('.nav-tabs a').on('click', function (e) {
//     //         $('li').removeClass('active');
//     //
//     //         e.preventDefault();
//     //         $('#accordion').hide();
//     //         $('#accordionDriver').show();
//     //
//     //         $(this).parent().addClass('active');
//     //         $(this).parent().siblings().removeClass('active');
//     //
//     //         target = $(this).attr('href');
//     //
//     //         $('.tab-content > div').not(target).hide();
//     //
//     //         $(target).fadeIn(600);
//     //     });
//     //
//     // };
//     // history();
// }
//
// _historyLoad();
//
//
