var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
var flash = require('express-flash');
var fs = require('fs');
var mongodb_url = 'mongodb://test_user:test@ds013221.mlab.com:13221/insanely_creatives_db';

var app = express();
app.use(favicon());
app.use(logger('dev'));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({ resave: true, saveUninitialized: true, secret: 'williamiscool' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname));

var master = {

};



function createTicket(userID) {
    var user = loadUser(userID);

    if (user === null) {
        console.log("User does not exist");
        return;
    }
    
    var ticket = {
        id: userID + 'ticket' + (user.grocery_list.length + 1).toString(),
        state:'pending',

        // For the driver to know the shopper's info
        user: {
            id: user._id,
            contact: {
                phone_number: user.phone_number,
                address: {
                    street: user.address.street,
                    city: user.address.city,
                    state: user.address.state,
                    zip: user.address.zip
                }
            },
            rating: user.avg_rating
        },
        driver: {
            id: "",
            contact: {
                phone_number: ""
            }
        },
        grocery_list: {
            store_name: master.shopping_list.store_name,
            shopping_list: master.shopping_list.list,
            timestamp: master.shopping_list.timestamp
        },
        options: {
            special_instruction: master.checkout.special_instruction,
            ava_time_1: master.checkout.time1,
            ava_time_2: master.checkout.time2
        },
        driver_list: {
            checkoff_list: [],
            time_accepted: ''
        }
    };
    saveTicket(ticket);
    return ticket;
}

function loadTickets(userId) {
    var user = loadUser(userId);
    var tickets = user.tickets;
    return tickets;
}

function saveTicket(ticket) {
    if (!ticket) {
        console.log('null ticket passed into saveTicket');
        return null;
    }

    MongoClient.connect(mongodb_url, function(err, db) {
        if (err) {
            console.log('Error: ' + err + '\nCould not save ticket');
            res.send(err);
        }
        else {
            user = db.collection('users').update({_id: master.userID}, {$push: {tickets: ticket}},
                function(err) {
                    if (err) return err;
            });
        }
    });
}


function loadUser(userId) {
    var user = null;

    if (!userID) {
        console.log('null userID passed into loadUser');
        return null;
    }

    MongoClient.connect(mongodb_url, function(err, db) {
        if (err) {
            console.log('Error: ' + err);
            res.send(err);
            return err;
        }
        else {
            user = db.collection('users').findOne({_id: userID}, function(err) {
                if (err) return err;
            });
        }
    });

    return user;
}

function getQueue() {
    var queue = null;

    MongoClient.connect(mongodb_url, function(err, db) {
        if (err) {
            console.log('Error: ' + err);
            res.send(err);
            return err;
        }
        else {
            user = db.collection('users').findOne({_id: userID}, function(err) {
                if (err) return err;
            });
        }
    });

    return queue;
};

function addToQueue(ticketId) {
    
};

function removeFromQueue(ticketId) {};


