var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var session = require('express-session');
var bodyParser = require('body-parser');
var async = require('async');
var flash = require('express-flash');
var fs = require('fs');
var mongodb_url = 'mongodb://test_user:test@ds013221.mlab.com:13221/insanely_creatives_db';

var app = express();
app.use(favicon());
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('public'));

var db = MongoClient.db(mongodb_url);


// Saves user's grocery list to
app.post('/_shopping', function(req, res) {
    var list_id = req.body.id;
    var glist = {
                    shopping_cart: req.body.list
                };

    // Check that empty list was not sent
    if (gist.length === 0) {
        res.status(500);
        res.send({message: 'Submitted empty list'});
        return;
    }

    // Check that user is logged in
    if (!req.session.passport.user) {
        console.log('user is not logged in!');
        res.status(500);
        res.send({message: 'user is not logged in'});
    }
    else {
        var updateGroceryList = function(db, callback) {
            db.collection('users').update({_id: req.session.passport.user},
                {$push: {grocery_list: glist}}
            );
        };

        MongoClient.connect(mongodb_url, function(err, db) {
            if (err) {
                console.log('Error: ' + err);
                res.send(err);
            }
            else {
                updateGroceryList(db, function() {
                    db.close();
                });
            }
        });
    }
});