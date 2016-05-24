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
app.use(session({resave: true, saveUninitialized: true, secret: 'williamiscool'}));
app.use(passport.initialize());
app.use(passport.session());
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


// ------------------------ USER SCHEMA/MODEL -------------------------

// Set up schema for users
var userSchema = new mongoose.Schema(
    {
        _id: {type: String, required: true, unique: true},
        full_name: {type: String, required: true, unique: false},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        phone_number: {type: String, required: true},
        address: //{type: String, required: true, unique: false}
        // ^^^^^ TEMPORARY IMPLEMENTATION BY FRONTEND

        //THIS SHOULD BE IMPLEMENTED BY FRONT END
        {
            street: '',
            city: '',
            state: '',
            zip: ''
        },
        // Not currently used
        payment_info: {
            card_holder_name: {type: String, required: false, unique: false},
            card_number: {type: String, required: false, unique: false},
            exp_month: {type: String, required: false, unique: false},
            exp_year: {type: String, required: false, unique: false},
            cvv: {type: String, required: false, unique: false}
        },
        avg_rating: {type: Number, required: false, unique: false},
        total_rating: {type: Number, required: false, unique: false},
        num_times_rated: {type: Number, required: false, unique: false},
        time_created: {type: String, required: false, unique: false},

        // Grcoery list holds tickets(?) (no longer grocery_list objs). May change.
        grocery_list: {type: [], required: false, unique: false},
        delivery_list: {type: [], required: false, unique: false},
        user_history: {type: [], required: false, unique: false},
        delivery_history: {type: [], required: false, unique: false},
        is_driver: {type: Boolean, required: false, unique: false},
        resetPasswordToken: String,
        resetPasswordExpires: Date
    }
);

// Hash password prior to saving user to db
userSchema.pre('save', function (next) {
    var user = this;
    var SALT_FACTOR = 15;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

// Compare input password to hashed password
userSchema.methods.comparePassword = function (password) {
    console.log('comparing: ' + password + ' and ' + this.password);

    return bcrypt.compareSync(password, this.password);
};

// User model
var User = mongoose.model('User', userSchema, 'users');

// Connect to db
mongoose.connect(mongodb_url);
// -------------------------------------------------------------------


var ViewController = function (userId, valueF) {
    this._userId = userId;
    this._valueF = valueF;
    this.time = 0;

};

ViewController.prototype = {
    updateValue: function (value, time) {
        if (time > this.time) {
            this._valueF = value;
            this.time = time;
        }
    },
    getValue: function (currentData, time) {
        return (time > this.time) ? this._valueF : currentData;
    }
};

// app.get('/_shopping', function (req, res){
//     console.log('LIne 456, list in session is', req.session.list);
//     if(req.session.passport && req.session.passport.user) {
//         var key = req.session.passport.user;
//     }
//     else
//         key = 'undefined';
//     if(req.session.paasport) {
//         if (req.session.passport.user != null) {
//             if ((hashTable.get(key)) != null) {
//                 var working = hashTable.get(key);
//                 var currentTime = new Date().getTime();
//                 //data is list of shopping items
//                 res.send(working.getValue(req.body.list, currentTime));
//             }
//         }
//     }
//     else if(typeof(req.session.list) != 'undefined'){
//         res.send(req.session.list);
//     }
//     else
//         res.send();
//
//     /*var VCObject = hashTable.get(email);
//      res.send(VCObject.getValue(currentTime, req.query['list']));*/
// });


// ------------------- SIGNUP//LOGOUT -----------------------

// Used to check if valid email format (@ucsd.edu)
var validEmail = function (email) {
    var email_regex = /.*@ucsd.edu/;

    if (!email_regex.test(email)) {
        console.log('invalid email format');
        return false;
    }
    return true;
};

// Used to check if valid phone number format
var validPhoneNumber = function (phone_number) {
    // Strip non-digit chars from phone #
    phone_number = phone_number.replace(/\D/g, '');
    console.log('stripped phone#: ' + phone_number);

    if (phone_number.length != 10) {
        console.log('invalid phone format');
        return null;
    }
    return phone_number;
};


// To check for login
passport.use('login', new LocalStrategy(
    {
        usernameField: 'email', // Change username field to email
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) {
        process.nextTick(function () {
            User.findOne({email: email.toLowerCase()}, function (err, user) {
                if (err)
                    return done(err);

                // User with email passed in not found
                if (!user)
                    return done(null, false, {message: 'User with email \'' + email + '\' not found.'});

                // Passwords do not match
                if (!user.comparePassword(password))
                    return done(null, false, {message: 'Incorrect password.'});

                // Successful login
                return done(null, user, {message: 'successful login'});
            });
        });
    }
));

// Strategy for signup
passport.use('signup', new LocalStrategy(
    {
        usernameField: 'email', // Change username field to email
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) { // all other input fields are in req.body
        if (password.length === 0) {
            console.log('Password has length 0');
            return done(null, false);
        }

        if (!validEmail(email))
            return done(null, false, {message: 'invalid email format'});

        if (!validPhoneNumber(req.body.phone_number))
            return done(null, false, {message: 'invalid phone number format'});

        console.log('signup email: ' + email);

        process.nextTick(function () {
            User.findOne({'email': email}, function (err, user) {

                if (err) {
                    console.log('Error: ', err);
                    return done(err);
                }
                // If user exists, dont make new user
                if (user) {
                    return done(null, false, {message: 'user already exists'});
                }
                else {
                    var date = new Date();

                    var newUser = new User({
                        _id: email.substring(0, email.indexOf('@')),
                        full_name: req.body.full_name,
                        email: email,
                        password: password,
                        phone_number: req.body.phone_number,
                        address: req.body.address/*{
                         street: '',
                         city: '',
                         state: '',
                         zip: ''
                         }*/,
                        payment_info: {
                            card_holder_name: '',
                            card_number: '',
                            exp_month: '',
                            exp_year: '',
                            cvv: ''
                        },
                        avg_rating: 0,
                        total_rating: 0.0,
                        num_times_rated: 0,
                        time_created: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
                        grocery_list: [],
                        delivery_list: [],
                        user_history: [],
                        delivery_history: [],
                        is_driver: false
                    });

                    // Adding new user to database
                    newUser.save(function (err) {
                        if (err) {
                            console.log('could not save user err: ' + err);
                            return done(null, false);
                        }
                    });
                    console.log('success');
                    return done(null, newUser, {message: 'successful signup'});
                }
            });
        });
    }
));

// Serialize user for storing to session
// Saved to req.session.passport.user
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Deserialize user for storing to session
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

app.post('/_logout', function (req, res, next) {
    // If 'logout' button pressed, log user out. Passportjs will
    // call deserialize to remove user from session.
    //req.logout();
    var userId = req.session.userId;
    delete masters[userId];
    req.session.destroy();
    console.log('logged out');
    console.log(req.session);

    res.send();
});

app.post('/_signUp', function (req, res, next) {
    passport.authenticate('signup', function (err, user, info) {
        console.log(info.message);

        if (!user) {
            res.status(500);
            res.send(info.message);
        }
        else {
            user.save(function (err) {
                if (err) {
                    console.log('Could not save user to DB after signup');
                    res.status(500);
                }
                req.login(user, function (err) {
                    if (err) {
                        //return next(err);
                        console.log('login failed: ', err);
                        res.status(500);
                    }
                    else {
                        var userId = req.session.passport.user;
                        req.session.userId = userId;
                        if (!masters.hasOwnProperty(userId)){
                            masters[userId] = {
                                isDriver: false,
                                isLoggedIn: true,
                                userId: userId,
                                currentPage: ""
                            };
                            masters[userId].userId = userId;
                            res.setHeader('Content-Type', 'application/json');
                            res.send(JSON.stringify({
                                userId: userId,
                                isLoggedIn: false
                            }));
                        }
                        else {
                            res.setHeader('Content-Type', 'application/json');
                            res.send(JSON.stringify({
                                userId: masters[userId].userId,
                                currentPage: masters[userId].currentPage,
                                isLoggedIn: true,
                                ticketId: masters[userId].ticketId,
                                isDriver: masters[userId].isDriver
                            }));
                        }
                        console.log('login success!');
                    }
                });
            });
        }
    })(req, res, next);
});

// For user login. Authenticates user and serializes user to session
// if successful login
app.post('/_login', function (req, res, next) {
    passport.authenticate('login', function (err, user, info) {
        // Check if user was successfully authenticated, send error otherwise
        if (!user) {
            res.status(500);
            res.send(info.message);
        }
        else {
            req.login(user, function (err) {
                if (err) {
                    console.log('failed login: ', err);
                    res.status(500);
                    res.send(err);
                }
            });

            //req.session.userId = req.body.email; //TODO set userId once login
            var userId = req.session.passport.user;
          
            req.session.userId = userId;
         


            if (!masters.hasOwnProperty(userId)){
                masters[userId] = {
                    isDriver: false,
                    isLoggedIn: true,
                    userId: userId,
                    currentPage: ""
                };
                masters[userId].userId = userId;
                // res.setHeader('Content-Type', 'application/json');

                console.log(userId);
                console.log(JSON.stringify({

                    isLoggedIn: false,
                    userId: userId
                }));
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    isLoggedIn: false,
                    userId: userId
                }));
            }
            else {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    userId: userId,
                    currentPage: masters[userId].currentPage,
                    isLoggedIn: true,
                    ticketId: masters[userId].ticketId,
                    isDriver: masters[userId].isDriver
                }));
            }
            console.log('successful login');
            // // If everything was successful, send user back to frontend
            // res.send(user);
        }
    })(req, res, next);
});
// -------------------------------------------------------------


// ----------- PASSWORD RECOVERY/RESET --------------------


// TODO: need to fix pwrecovery. does not work atm
app.post('/_passwordRecovery', function (req, res, next) {
    var email = req.body.email;

    if (!validEmail(email)) {
        console.log("invalid email format");
        req.flash('error', 'Invalid email format your_ucsd_email@ucsd.edu');
        res.status(500);
        return;
    }

    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            User.findOne({email: req.body.email}, function (err, user) {
                if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                    res.status(500);
                    return;
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var Transport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'fetchtestuser',
                    pass: 'insanelycreatives'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'fetchtestuser@gmail.com',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            console.log('Sending Mail');
            Transport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log('Error occurred');
                    console.log(err.message);
                    res.status(500);
                    return;
                }
                req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
        //res.redirect('/forgot');
    });
});

app.post('/reset/:token', function (req, res) {
    async.waterfall([
        function (done) {
            User.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: {$gt: Date.now()}
            }, function (err, user) {
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    res.status(500);
                    return;
                    //return res.redirect('back');
                }

                user.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function (err) {
                    req.login(user, function (err) {
                        done(err, user);
                    });
                });
            });
        },
        function (user, done) {
            var Transport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'fetchtestuser',
                    pass: 'insanelycreatives'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'passwordreset@demo.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            Transport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log('Error occurred');
                    console.log(err.message);
                    res.status(500);
                    return;
                }
                req.flash('success', 'Success! Your password has been changed.');
                done(err);
            });
        }
    ], function (err) {
        res.status(500);
    });
});

//userId =req.session.userId
//masters[userId]["_homepage"].data
//TODO---------------------------------------------------------------------------------
var defaultO = {
    isDriver: false,
    isLoggedIn: false,
    userId: "",
    currentPage: ""

};
var masters = {};

//TODO -------------------------------------------------------------------------

//------------------shopping route----------------------


//TODO ---------------------------------DATA-LOADER-------------------------


app.post('/sendData', function (req, res, next) {
    var pageName = req.body.name;
    var userId = req.session.userId;
    if (req.body.version >= masters[userId][pageName].version) {
        masters[userId][pageName].data = req.body.data;
        masters[userId][pageName].version = req.body.version + 1;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(req.body.version + 1));

});

app.post('/loadData', function (req, res, next) {
    var version = req.body.version;
    var userId = req.session.userId;
    var pageName = req.body.name;
    var object = {};
    object.data = masters[userId][pageName].data;
    object.version = masters[userId][pageName].version;
    if (version <= masters[userId][pageName].version) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(object));
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(""));

});


app.post('/changePage', function (req, res) {
    if(!req.session.hasOwnProperty("userId"))
        res.send();
    else {
        var newPage = req.body.newPage;
        //save it to master current page field
        var userId = req.session.userId;
        masters[userId].currentPage = newPage;
    }
});

//----------------------------------getTicket--------------------------------------------------------------------------
app.post('/getTicket', function (req, res) {

    var ticketId = req.body.id;
    var store = req.body.store;
    var userId = req.session.userId;
    var user;

    MongoClient.connect(mongodb_url, function(err, db) {
        if (err) {
            console.log('Error: get ticket. ' + err);
            res.send(err);
        }
        else {
            user = db.collection('grocery_queue').findOne({_id: ticketId}, function(err) {
                if (err){
                    res.send(err);
                }
            });

        }
    });
    if(user) {
        masters[userId]["_driverList"].data = user;

    }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(user.state));
});

// app.post('/_getQueue', function(req, res){
//     var request = req.body.getQueue;
//     var userId = req.session.userId;
//     var ticketQ
//     if(request) {
//         masters[userId].isQueue = true;
//         master[userId]._isUserTicket = false;
//         masters[userId].isDriverTicket = false;
//         ticketQueue = getQueueFromDB();
//         masters[userId].ticketqueue = ticketQueue;
//         res.send("success");
//     }
//
// });
// app.post('/_getUserTicket', function(req, res){
//
// });
// app.post.('/_getDriverTicket', function(req,res){
//
// });


//----------------------------------getTicket----------------------------------------------------------------
app.post('/switch', function(req, res) {
    var userId = req.session.userId;
    masters[userId].isDriver = req.body.isDriver;
    res.send();
});

//----------------------------------getUpdate--------------------------------------------------------------------------
//run every second
app.post('/getUpdates', function (req, res, next) {
   // var object = {};
    //send back JSON object to update current Page once the user is login on another device
    var userId = req.session.userId;

    if(masters.hasOwnProperty(userId) && masters[userId] != null){

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            currentPage: masters[userId].currentPage,
            ticketId: masters[userId].ticketId,
            isLoggedIn: masters[userId].isLoggedIn,
            isDriver: masters[userId].isDriver
        }));
    }
    else {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringnify({
            isLoggedIn: masters[userId].isLoggedIn
        }));
    }
});


app.post('/init', function (req, res) {
    var userId = req.body.userId;
    req.session.userId = userId;
   // var userId = req.session.userId;


    if (!masters.hasOwnProperty(userId)) {
        masters[userId] = {
            isDriver: false,
            isLoggedIn: true,
            userId: userId,
            currentPage: "_homePage"
        };
        masters[userId].userId = userId;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            userId: userId,
            isLoggedIn: false
        }));
    }
    else {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            userId: masters[userId].userId,
            currentPage: masters[userId].currentPage,
            isLoggedIn: true,
            ticketId: masters[userId].ticketId,
            isDriver: masters[userId].isDriver
        }));
    }
});
    // var userId = req.body.userId;
    //
    // if (masters.hasOwnProperty(userId)) {
    //     //Exists user
    //     if (masters[userId] != null) {
    //         //is logged in, return master existing data
    //     }
    //     else {
    //         //initialize master with user data and empty objects
    //     }
    // }
    // else {
    //
    //     var id = new Date().getMilliseconds();
    //     req.session.userId = id;
    //     console.log(id);
    //     console.log(req.session.userId);
    //     var masterInit = {
    //         //loader
    //         isDriver: false,
    //         isLoggedIn: false,
    //         userId: id,
    //         pageCount: 0,
    //         previousPage: "_homePage",
    //         currentPage: "_homePage",
    //         currentPageObject: {
    //             getData: null,
    //             loadData: null,
    //             data: null
    //         },
    //
    //         userTickets: null,
    //         driverTickets: null,
    //         ticketQueue: null
    //     };
    //     //Initialize each page
    //     var allPages = [
    //         "_accSetting", "_contact", "_history", "_passwordRecovery", "_passwordReset", "_signUp", "_login",
    //         "_yourDeliveries", "_homePage", "_shopping", "_checkout"/*, "_submitted"*/,
    //         /*'_confirmTicket',*/ "_rating" /*,'_ticketClosed'*/,
    //         '_tickets', '_driverList2', "_congrats_driver_finish_shopping", /*'_confirmCompletion', '_completeTicket', '_rating',*/ '_congrats'
    //     ];
    //
    //     for (var i = 0; i < allPages.length; i++){
    //         masterInit[allPages[i]] = {
    //             data: null,
    //             version: 0
    //         }
    //     }
    //
    //     masters[id] = masterInit;
    //
    //
    //
    //
    //     //new user
    //
    //
    //     res.setHeader('Content-Type', 'application/json');
    //     res.send(JSON.stringify({
    //         isLoggedIn: false,
    //         userId: id
    //     }));
    //
    // }
//});

//TODO ---------------------------------DATA-LOADER-------------------------


// ------------------------------------------------ ACCOUNT SETTING ------------------------------------------------

app.post('/_accSetting', function (req, res) {
    // if (!req.session.passport || !res.session.passport.user) {
    var userId = req.session.userId;
    var object = {};
    if (!req.session.userId) {
        res.status(500);
        res.send({message: 'no user logged in'});
    }
        // might need to pull data from database first depending on how we are doing it
    else if (req.body.type === "request_data") {
        object.full_name = masters[userId]["_accSetting"].data.full_name;
        object.email = masters[userId]["_accSetting"].data.email;
        object.phone =  masters[userId]["_accSetting"].data.phone;
        object.address.street = masters[userId]["_accSetting"].data.address.street;
        object.address.city = masters[userId]["_accSetting"].data.address.city;
        object.address.state= masters[userId]["_accSetting"].data.address.state;
        object.address.zip = masters[userId]["_accSetting"].data.address.zip;
        
        res.send(object);
    }
    else {
        // update session
        masters[userId]["_accSetting"].data.full_name = req.body.user.full_name;
        masters[userId]["_accSetting"].data.email = req.body.user.email;
        masters[userId]["_accSetting"].data.phone = req.body.user.phone;
        masters[userId]["_accSetting"].data.address.street = req.body.user.street;
        masters[userId]["_accSetting"].data.address.city = req.body.user.city;
        masters[userId]["_accSetting"].data.address.state = req.body.user.state;
        masters[userId]["_accSetting"].data.address.zip = req.body.user.zip;

        // Update user document from users collection with the new info
        MongoClient.connect(mongodb_url, function (err, db) {
            if (err) {
                console.log('Error: ' + err);
                res.send(err);
            }
            else {
                user = db.collection('users').updateOne({_id: master.userId}, {$push: {tickets: ticket}},
                    function (err) {
                        if (err) return err;
                    });
            }
        });
    }
});
//TODO ------------------------------------------------------------------------------------------------------------------


// ---------------------------------------------------- SHOPPING/SAVE GROCERY LIST ----------------------------------

// Saves user's grocery list to session
// app.post('/_shopping', function(req, res) {
//
//     //TODO keep this, this will parse data string to JSON object, list is an array
//     //   var list = JSON.parse(req.body.data).list;
//     var userId = req.sessions.userId;
//
//     // req.session.list = list;
//     //
//     // if (masters[userId].list == null) {
//     //     console.log('line 517, Creating a new ViewCOntroller for this user');
//     //             //working = new ViewController(key, list);
//     //     masters[userId]["_shopping"].data.list = list;
//     //
//     //     }
//     // else {
//     //
//     // }
//
// //     if(userId) {
// //         res.setHeader('Content-Type', 'application/json');
// //         res.send(JSON.stringify({
// //         full_name : masters[userId]["accSetting"].data.full_name,
// //         email : masters[userId]["accSetting"].data.email,
// //         phone : masters[userId]["accSetting"].data.phone,
// //         address.street : masters[userId]["accSetting"].data.address.street,
// //         address.city : masters[userId]["accSetting"].data.address.city,
// //         address.zip : masters[userId]["_accSetting"].data.address.zip,
// //         address.state : masters[userId]["accSetting"].data.address.state
// //         )};
// //     }
// // //
//     //want page name for shopping route
//     var shopping = req.body.page;
//     res.setHeader('Content-Type', 'application/json');
//     res.send(JSON.stringify(masters[userId][shopping].data));
// });
//    // var date = new Date();
//
//     // store all items into session
//
//
//
// });
// app.post('/_shopping', function(req, res) {
//
//     //TODO keep this, this will parse data string to JSON object, list is an array
//     // var list = JSON.parse(req.body.data).list;
//
//     var userId = req.session.userId;
//
//     // req.session.list = list;
//     //
//     // if (masters[userId].list == null) {
//     //     console.log('line 517, Creating a new ViewCOntroller for this user');
//     //             //working = new ViewController(key, list);
//     //     masters[userId]["_shopping"].data.list = list;
//     //
//     //     }
//     // else {
//     //
//     // }
//
//
//     var object = {};
//     address = {};
//     object.full_name = masters[userId]["_accSetting"].data.full_name;
//     object.email = masters[userId]["_accSetting"].data.email;
//     object.phone =masters[userId]["_accSetting"].data.phone;
//     object.address.street =masters[userId]["_accSetting"].data.address.street;
//     object.address.city = masters[userId]["_accSetting"].data.address.city;
//     object.address.zip = masters[userId]["_accSetting"].data.address.zip;
//     object.address.state = masters[userId]["_accSetting"].data.address.state;
//     res.send(object);
//
//
//
//    // var date = new Date();
//
//     // store all items into session
//
//
//
// });
//TODO -------------------------------------------------------------------------


// ---------------------------------------------------- TICKETS/GROCERY QUEUE ---------------------------------------
app.post('/_tickets', function (req, res) {

});
//TODO -------------------------------------------------------------------------


//------------------------------------------------------------checkout---------------------------------------------
//may be update database in checkout,???
app.post('/_checkout', function (req, res, next) {
    var userId = req.session.userId;
    // if(req.body.notesTime) {
    //     masters[userId]["_checkout"].data.list_id = req.body.notesTime.id;
    //     masters[userId]["_checkout"].data.special_options = req.body.notesTime.notes;
    //     masters[userId]["_checkout"].data.available_time_start = req.body.notesTime.range1;
    //     masters[userId]["_checkout"].data.available_time_end = req.body.notesTime.range2;


    // Model for grocery list
    var glist = {
        _id: masters[userId]["_checkout"].data.list_id,
        store_name: masters[userId]["_homePage"].data.store_name, // ?????? Need to communicate with geo/trivi for store name session
        shopping_list: masters[userId]["_shopping"].data.list,
        timestamp: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
        special_options: masters[userId]["_accSetting"].data.special_options,
        available_time_start: masters[userId]["_accSetting"].data.available_time_start,
        available_time_end: masters[userId]["_accSetting"].data.available_time_end
    };

    // Check that empty list was not sent
    if (glist.length === 0) {
        res.status(500);
        res.send({message: 'Submitted empty list'});
        return;
    }

    // Check that user is logged in
    if (!req.session.passport || !req.session.passport.user) {
        console.log('user is not logged in');
        res.status(500);
        res.send({message: 'user is not logged in'});
    }
    else {
        var updateGroceryListAndQueue = function (db) {
            var grocery_list = null;

            // Update user to hold grocery list submitted
            grocery_list = db.collection('users').updateOne({_id: req.session.passport.user}, {$push: {grocery_list: glist}},
                function (err, doc) {
                    if (err) {
                        console.log('error updating user grocery list');
                        res.status(500);
                        res.send(err);
                    }
                }
            );

            // If grocery list successfully added to user's grocery list, add list to queue
            if (!grocery_list) {
                db.collection('grocery_queue').insert(grocery_list, function (err, doc) {
                    if (err) {
                        console.log('error adding list to queue: ' + err);
                        res.status(500);
                        res.send(err);
                    }
                });
            }
        };

        MongoClient.connect(mongodb_url, function (err, db) {
            if (err) {
                console.log('Error: ' + err);
                res.send(err);
            }
            else {
                updateGroceryListAndQueue(db);
            }
        });
    }
    res.send("Successful");

    // }
    res.send("Fail");

});
//TODO -------------------------------------------------------------------------

app.post('_homePage', function (req, res, next) {

});


//-----------------------------------------------------DRIVER LIST -----------------------------------------
app.post('/_driverList', function (req, res, next) {
    var object = {};
    var userId = req.session.userId;

    if (userId) {
        object.notes = masters[userId]["_checkout"].data.special_options;
        object.items = masters[userId]["_"].data.items;   //TODO where is items located?
        object.name = masters[userId].name;
        object.contact = masters[userId].phone;
        res.send(object);

        //TODO maybe get from database or from session
    }
    res.send('Fail, not login');

});


//--------------------------DRIVER LIST 2---------------------
app.post('/_DriverList2', function (req, res, next) {

});


//----------------------------HISTORY----------------------
app.post('/_history', function (req, res, next) {

});


//----------------------PAYMENT--------------------
app.get('/complete-payment', function(req, res){
    var userId = req.query.user;
    //actually submit and redirect to fetchgrocery.com#_submitted
});
app.get('/cancel-payment', function(req, res){
    var userId = req.query.user;
    //actually submit and redirect to fetchgrocery.com#_cancelled
});


var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});
// -------------------------------------------------------------
