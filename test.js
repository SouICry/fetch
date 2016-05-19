var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongodb_url = 'mongodb://test_user:test@ds013221.mlab.com:13221/insanely_creatives_db';

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(__dirname));


app.post('/loadPage', function (req, res) {
    try {
        fs.readFile(__dirname + "/" + req.body.name + ".html", 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            }
            res.send(data);
        });
    }
    catch (e) {
        res.send("");
    }
});

//
//
// app.post('/loadPages', function (req, res) {
//     var allPages = [{
//         isDone: 0,
//         name: "abovePages",
//         data: ["_accSetting", "_contact", "_history", "_passwordRecovery", "_passwordReset", "_signUp", "_login"],
//         done: [0,0,0,0,0,0,0]
//     },
//         {
//             isDone: 0,
//             name: "createTicket",
//             data: ["_homePage", "_shopping", "_checkout", "_submitted"],
//             done: [0,0,0,0]
//         },
//         {
//             isDone: 0,
//             name: "acceptTicket",
//             data: ['_acceptTicket', '_paid'],
//             done: [0,0]
//         },
//         {
//             isDone: 0,
//             name: "confirmTicket",
//             data: ['_confirmTicket', "_rating", '_congrats'],
//             done: [0,0,0]
//         },
//         {
//             isDone: 0,
//             name: "driverFlow",
//             data: ['_tickets', '_driverList', '_confirmCompletion', '_completeTicket', '_rating', '_congrats'],
//             done: [0,0,0,0,0,0]
//         }
//     ];
//
//     var start = "";
//
//     function getFileRecur(){
//
//     }
//
//
//     function getFile(flow, j, resp) {
//         var dat = flow.data[j];
//         try {
//
//             fs.readFile(__dirname + "/" + dat + ".html", 'utf8', function (err, data) {
//                 if (err) {
//                     console.log(err);
//                 }
//                 flow.data[j] = "<div id='" + dat + "'>" + data + "</div>";
//                 console.log(flow.data[j]);
//                 flow.done[j] = 1;
//                 for (var i = 0; i < flow.done.length; i++){
//                     if (!flow.done[i]){
//                         return;
//                     }
//                 }
//                 flow.isDone = 1;
//             });
//         }
//         catch (e) {
//             if (e.code === 'ENOENT') {
//                 console.log(dat + ' not found!');
//             } else {
//                 throw e;
//             }
//             flow.data[j] = "<div id='" + dat + "'></div>";
//             flow.done[j] = 1;
//             for (var i = 0; i < flow.done.length; i++){
//                 if (!flow.done[i]){
//                     return;
//                 }
//             }
//             flow.isDone = 1;
//         }
//
//         //Check if all done
//         for (var k = 0; k < allPages.length; k++){
//             if (!allPages[k].isDone){
//                 return;
//             }
//         }
//
//
//         //If all done,
//         for (var l = 0; l < allPages.length; l++) {
//             var flow1 = allPages[l];
//             start += "<div id='" + flow1.name + "'>";
//             for (var m = 0; m < flow1.data.length; m++) {
//                 start += flow1.data[m];
//             }
//             start += "</div>";
//         }
//
//         //console.log(start);
//         resp.send(start);
//     }
//
//
//     for (var i = 0; i < allPages.length; i++) {
//         var flow = allPages[i];
//         for (var j = 0; j < flow.data.length; j++) {
//             getFile(flow, j, res);
//         }
//     }
// });


var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});
