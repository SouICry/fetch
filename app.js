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

var db;
var app = express();
app.use(favicon());
app.use(logger('dev'));
app.use(flash());
//app.use(bodyParser());
app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({resave: true, saveUninitialized: true, secret: 'williamiscool'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname));

var masters = {};

function createNotification(userId, text, page, icon) {
    var onClick = "loader.closeNotification('" + page + "', this);";

    masters[userId].notification.push('<div class="notification-inner" data-changePage="true" onclick="' + onClick + '"><div class="icon"><i class="material-icons">'
        + icon + '</i></div><div class="text">' + text + '</div></div>');
}


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
        address: //{type: String, required: true, unique: false},
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

        // Grocery list holds tickets(?) (no longer grocery_list objs). May change.
        grocery_list: {type: [], required: false, unique: false},
        delivery_list: {type: [], required: false, unique: false},
        user_history: {type: [], required: false, unique: false},
        delivery_history: {type: [], required: false, unique: false},
        is_driver: {type: Boolean, required: false, unique: false},
        resetPasswordToken: String,
        resetPasswordExpires: Date
        // TODO: add image (research how to do it)
    }
);

// Hash password prior to saving user to db
userSchema.pre('save', function (next) {
    var user = this;
    var SALT_FACTOR = 8;

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
//mongoose.connect(mongodb_url);
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


app.post("/_shopping", function (req, res) {
    //use pageCount or version
    var userId = req.session.userId;
    var list = req.body.list;
    var checkout = req.body.checkout;
    //TODO initialize verion in login, init, sign up
    if (!masters.hasOwnProperty(userId) || masters[userId].shoppingVersion == 'undefined') {
        res.send("");
    }
    else if (masters[userId].shoppingVersion < req.body.shoppingVersion) {
        masters[userId].shoppingVersion = req.body.shoppingVersion;
        masters[userId].list = list;
        res.send("");
    }
    else if (masters[userId].shoppingVersion > req.body.shoppingVersion) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            //version: masters[userId].version,
            list: masters[userId].list,
            shoppingVersion: masters[userId].shoppingVersion,
            currentPage: masters[userId].currentPage
        }));
    }
    else if (masters[userId].checkoutVersion < req.body.checkoutVersion) {
        console.log("version update");
        masters[userId].checkoutVersion = req.body.checkoutVersion;
        masters[userId].checkout = checkout;
        res.send("");
    }
    else if (masters[userId].checkoutVersion > req.body.checkoutVersion) {
        console.log("send back data");
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            checkout: masters[userId].checkout,
            checkoutVersion: masters[userId].checkoutVersion,
            currentPage: masters[userId].currentPage
        }));
    }
    else {
        res.send("");
    }

});
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
                        address: {
                            street: req.body.street,
                            city: req.body.city,
                            state: req.body.state,
                            zip: req.body.zip
                        },
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

//Save profile picture to server
app.post('/savePhoto', function (req, res) {

    var img = (req.body.image);
    var data = img.replace(/^data:image\/\w+;base64,/, "");

    var buf = new Buffer(data, 'base64');
    //noinspection JSUnresolvedFunction
    if (req.session.userId === 'undefined')
        fs.writeFile('images/profiles/image.png', buf, function (err) {
            if (err)
                throw err;
            console.log("Photo saved");
        });
    else
        fs.writeFile('images/profiles/' + req.session.userId + '.png', buf, function (err) {
            if (err)
                throw err;
            console.log("Photo saved");
        });
    //console.log(img);
    //console.log(typeof(img));
    console.log("Photo Saved: " + data.substring(0, 10));
    /*fs.writeFile("images/profiles/" + req.session.userId + ".png", req.body.image,"base64", function (err, data ) {
     if (err) {
     return console.log("Error");
     }
     console.log("Photo saved. Success!");}
     );*/
    res.send("");
});

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

app.post('/logout', function (req, res, next) {
    // If 'logout' button pressed, log user out. Passportjs will
    // call deserialize to remove user from session.
    //req.logout();
    var userId = req.session.userId;
    delete masters[userId];
    req.session.destroy();
    console.log('logged out');
    console.log(req.session);

    res.send("");
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
                        if (!masters.hasOwnProperty(userId)) {
                            masters[userId] = {
                                isDriver: false,
                                isLoggedIn: true,
                                userId: userId,
                                notification: [],
                                chat: {
                                    messages: []
                                },
                                shoppingVersion: 0,
                                checkoutVersion: 0,
                                currentPage: ""
                            };
                            db.collection('users').findOne({_id: userId},
                                function (err, user) {
                                    if (err) {
                                        console.log('Error in accSetting: ' + err);
                                        res.status(500);
                                        res.setHeader('Content-Type', 'application/json');
                                        res.send({message: 'cannot access collection to find user '})
                                        return;
                                    }
                                    //console.log('user = ' + JSON.stringify(user));
                                    if (user == null) {
                                        console.log('Could not find user with userId ' + userId + ' in _accSetting');
                                        console.log(JSON.stringify(user));
                                        res.status(500);
                                        res.send('');
                                        return;
                                    }
                                    if (user.full_name == null) {
                                        console.log('Could not find users fullname in _accSetting');
                                        res.status(500);
                                        res.send('');
                                        return;
                                    }
                                    else {
                                        console.log(JSON.stringify(user));
                                        masters[userId].full_name = user.full_name;
                                    }
                                });
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


            if (!masters.hasOwnProperty(userId)) {
                masters[userId] = {
                    isDriver: false,
                    isLoggedIn: true,
                    userId: userId,
                    notification: [],
                    chat: {
                        messages: []
                    },
                    shoppingVersion: 0,
                    checkoutVersion: 0,
                    currentPage: ""
                };
                db.collection('users').findOne({_id: userId},
                    function (err, user) {
                        if (err) {
                            console.log('Error in accSetting: ' + err);
                            res.status(500);
                            res.setHeader('Content-Type', 'application/json');
                            res.send({message: 'cannot access collection to find user '})
                            return;
                        }
                        //console.log('user = ' + JSON.stringify(user));
                        if (user == null) {
                            console.log('Could not find user with userId ' + userId + ' in _accSetting');
                            console.log(JSON.stringify(user));
                            res.status(500);
                            res.send('');
                            return;
                        }
                        if (user.full_name == null) {
                            console.log('Could not find users fullname in _accSetting');
                            res.status(500);
                            res.send('');
                            return;
                        }
                        else {
                            console.log(JSON.stringify(user));
                            masters[userId].full_name = user.full_name;
                        }
                    });
                masters[userId].userId = userId;

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
        res.status(500);
        return;
    }

    async.waterfall([
        function (done) {
            crypto.randomBytes(6, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            User.findOne({email: req.body.email}, function (err, user) {
                if (!user) {
                    console.log('error', 'No account with that email address exists.');
                    res.status(500);
                    return;
                }

                user.password = token;


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
                'Your password has been changed to the following:\n\n' +
                token + '\n\n' +
                'Please log-in with the changed password now.\n'
            };
            console.log('Sending Mail');
            Transport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log('Error occurred while sending mail');
                    console.log(err.message);
                    res.status(500);
                    return;
                }
                console.log('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
        //res.redirect('/forgot');
    });
});
app.post('/_passwordReset', function (req, res) {
    var userId = req.session.userId;

    if (userId == null) {
        res.status();
        console.log('ERROR IS HERE');
        console.log(userId)
        res.setHeader('Content-Type', 'application/json');
        res.send({message: 'no user logged in'});
    }
    else {
        User.findOne({_id: userId}, function (err, user) {
            if (!user) {
                console.log('error', 'No account with ID ' + userId + ' exists.');
                res.status(500);
                return;
            }
            user.password = req.body.password;
            user.save(function (err) {
                if (err) {
                    console.log('Could not save new password to db in passwordReset');
                    res.status(500);
                }
            });
            console.log('New password saved!');
        });
    }
});


// app.post('/reset/:token', function (req, res) {
//     async.waterfall([
//         function (done) {
//             User.findOne({
//                 resetPasswordToken: req.params.token,
//                 resetPasswordExpires: {$gt: Date.now()}
//             }, function (err, user) {
//                 if (!user) {
//                     req.flash('error', 'Password reset token is invalid or has expired.');
//                     res.status(500);
//                     return;
//                     //return res.redirect('back');
//                 }
//
//                 user.password = req.body.password;
//                 user.resetPasswordToken = undefined;
//                 user.resetPasswordExpires = undefined;
//
//                 user.save(function (err) {
//                     req.login(user, function (err) {
//                         done(err, user);
//                     });
//                 });
//             });
//         },
//         function (user, done) {
//             var Transport = nodemailer.createTransport({
//                 service: 'Gmail',
//                 auth: {
//                     user: 'fetchtestuser',
//                     pass: 'insanelycreatives'
//                 }
//             });
//             var mailOptions = {
//                 to: user.email,
//                 from: 'passwordreset@demo.com',
//                 subject: 'Your password has been changed',
//                 text: 'Hello,\n\n' +
//                 'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
//             };
//             Transport.sendMail(mailOptions, function (err, info) {
//                 if (err) {
//                     console.log('Error occurred');
//                     console.log(err.message);
//                     res.status(500);
//                     return;
//                 }
//                 req.flash('success', 'Success! Your password has been changed.');
//                 done(err);
//             });
//         }
//     ], function (err) {
//         res.status(500);
//     });
// });

//userId =req.session.userId
//masters[userId]["_homepage"].data
//TODO---------------------------------------------------------------------------------
var defaultO = {
    isDriver: false,
    isLoggedIn: false,
    userId: "",
    currentPage: ""

};


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
    if (!req.session.hasOwnProperty("userId"))
        res.send("");
    else {
        var newPage = req.body.newPage;

        //createNotification(req.session.userId, "Change Page "+ newPage, "_homePage", "add_alert");
        //save it to master current page field
        var userId = req.session.userId;
        masters[userId].currentPage = newPage;
        res.send("");
    }
});

//----------------------------------getTicket--------------------------------------------------------------------------
app.post('/getTicket', function (req, res) {

    var ticketId = req.body.id;
    var store = req.body.store;
    var userId = req.session.userId;

    var user = db.collection('grocery_queue').findOne({_id: ticketId}, function (err) {
        if (err)
            res.send(err);
    });

    if (user) {
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
app.post('/switchRole', function (req, res) {
    if (masters.hasOwnProperty(userId) && masters[userId] != null) {
        var userId = req.session.userId;
        masters[userId].isDriver = req.body.isDriver;
        res.send();
    }
});


app.post('/chat', function (req, res) {
    var userId = req.session.userId;

    if (!masters[userId].chat.hasOwnProperty(req.body.userIdToChat)) {
        masters[userId].chat[req.body.userIdToChat] = {
            messages: []
        };
        masters[userId].chat[req.body.userIdToChat].messages.push("<div class='ours'><div>" + req.body.message + "</div></div>");
    }

    if (!masters.hasOwnProperty(req.body.userIdToChat)) {
        masters[req.body.userIdToChat] = {
            isDriver: false,
            isLoggedIn: true,
            userId: req.body.userIdToChat,
            notification: [],
            chat: {
                messages: []
            },
            shoppingVersion: 0,
            checkoutVersion: 0,
            currentPage: "_homePage"
        };

    }
    if (!masters[req.body.userIdToChat].chat.hasOwnProperty(userId)) {
        masters[req.body.userIdToChat].chat[userId] = {
            messages: []
        };
        masters[req.body.userIdToChat].chat[userId].messages.push("<div class='theirs'><div>" + req.body.message + "</div></div>");
    }
    else {
        masters[userId].chat[req.body.userIdToChat].messages.push("<div class='ours'><div>" + req.body.message + "</div></div>");
        masters[req.body.userIdToChat].chat[userId].messages.push("<div class='theirs'><div>" + req.body.message + "</div></div>");
    }

    res.send("");
});


//----------------------------------getUpdate--------------------------------------------------------------------------
//run every second
app.post('/getUpdates', function (req, res, next) {
    // var object = {};
    //send back JSON object to update current Page once the user is login on another device
    var userId = req.session.userId;
    var chatRecieve = req.body.chat;
    var chat = {};
    var notificationToSendBack = [];
    var lengthRecieve = req.body.notification;

    if (masters.hasOwnProperty(userId) && masters[userId] != null) {

        // //send chat
        for (var personToChat in masters[userId].chat) {
            if (masters[userId].chat.hasOwnProperty(personToChat)) {
                if (masters[userId].chat[personToChat].messages != null) {
                    if (chatRecieve[personToChat] != null) {

                        if (masters[userId].chat[personToChat].messages.length > chatRecieve[personToChat]) {
                            chat[personToChat] = [];
                            for (var k = chatRecieve[personToChat]; k < masters[userId].chat[personToChat].messages.length; k++) {
                                chat[personToChat].push(masters[userId].chat[personToChat].messages[k]);
                            }
                        }
                    }
                    else {
                        chat[0] = masters[personToChat].full_name;
                        console.log("User full name is ", chat[0], "user Id is", personToChat);
                        chat[personToChat] = masters[userId].chat[personToChat].messages;
                        console.log("Chat messages are ", chat[personToChat]);
                    }
                }
            }

        }


        //send notification back if masters has new notification
        if (masters[userId].notification.length > lengthRecieve) {
            for (var i = lengthRecieve; i < masters[userId].notification.length; i++) {
                notificationToSendBack.push(masters[userId].notification[i]);
            }

        }

        res.setHeader('Content-Type', 'application/json');

        //send all to update when inactive
        if (req.body.isInactive) {
            res.send(JSON.stringify({
                isInactive: req.body.isInactive,
                currentPage: masters[userId].currentPage,
                ticketId: masters[userId].ticketId,
                isLoggedIn: masters[userId].isLoggedIn,
                isDriver: masters[userId].isDriver,
                chat: chat,
                notification: notificationToSendBack

            }));
        } else {
            res.send(JSON.stringify({
                isInactive: req.body.isInactive,
                chat: chat,
                notification: notificationToSendBack

            }));

        }
    }
    else {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            isLoggedIn: true
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
            notification: [],
            chat: {
                messages: []
            },
            shoppingVersion: 0,
            checkoutVersion: 0,
            currentPage: "_homePage"
        };
        db.collection('users').findOne({_id: userId},
            function (err, user) {
                if (err) {
                    console.log('Error in init: ' + err);
                    res.status(500);
                    //res.setHeader('Content-Type', 'application/json');
                    res.send('cannot access collection to find user ');
                    return;
                }
                //console.log('user = ' + JSON.stringify(user));
                if (user == null) {
                    console.log('Could not find user with userId ' + userId + ' in _init');
                    console.log(JSON.stringify(user));
                    res.status(500);
                    //res.send('');
                    return;
                }
                if (user.full_name == null) {
                    console.log('Could not find users fullname in _init');
                    res.status(500);
                    //res.send('');
                    return;
                }
                else {
                    console.log(JSON.stringify(user));
                    masters[userId].full_name = user.full_name;
                    masters[userId].userId = userId;
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({
                        userId: userId,
                        isLoggedIn: false
                    }));
                    return;
                }
            });

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
        return;
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

    if (userId == null) {
        res.status(420);
        console.log('ERROR IS HERE');
        console.log(userId)
        res.setHeader('Content-Type', 'application/json');
        res.send({message: 'no user logged in'});
    }

    else if (req.body.type === "loadAccSetting") {
        console.log('LOADING ACCOUNT');
        db.collection('users').findOne({_id: userId},
            function (err, user) {
                if (err) {
                    console.log('Error in accSetting: ' + err);
                    res.status(500);
                    res.setHeader('Content-Type', 'application/json');
                    res.send({message: 'cannot access collection to find user '})
                    return;
                }
                //console.log('user = ' + JSON.stringify(user));
                if (user == null) {
                    console.log('Could not find user with userId ' + userId + ' in _accSetting');
                    console.log(JSON.stringify(user));
                    res.status(500);
                    res.send('');
                    return;
                }
                if (user.full_name == null) {
                    console.log('Could not find users fullname in _accSetting');
                    res.status(500);
                    res.send('');
                    return;
                }
                else {
                    console.log(JSON.stringify(user));
                    object.full_name = user.full_name;
                    object.email = user.email;
                    object.phone = user.phone_number;
                    object.street = user.address.street;
                    object.city = user.address.city;
                    object.state = user.address.state;
                    object.zip = user.address.zip;

                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(object));
                }
            });
    }

    else {
        if (!req.body) {
            console.log('user didnt transfer');
            res.send();
            return '';
        }
        var userData = req.body;
        if (userData === null) {
            console.log('U ARENT GETTING ANYTHING');
            res.send();
            return '';
        }
        // Update user document from users collection with the new info
        db.collection('users').updateOne({_id: userId},
            {
                $set: {
                    full_name: userData.full_name,
                    email: userData.email,
                    phone_number: userData.phone,
                    "address.street": userData.street,
                    "address.city": userData.city,
                    "address.state": userData.state,
                    "address.zip": userData.zip
                }
            },
            function (err) {
                if (err) return err;
            });
    }

});
//TODO ------------------------------------------------------------------------------------------------------------------


// ---------------------------- DELIVERY TIME ------------------------------
// app.post('/_deliveryTime', function(req, res) {
//     var userId = req.session.userId;
//     var ticketId = masters[userId].ticketId;
//     console.log('IN DELIVERY TIME: ' + req.body.available_time);
//
//     if (!userId) {
//         console.log('err in _DeliverTime, no user');
//         res.status(500);
//         res.send('');
//     }
//     else if (!ticketId) {
//         console.log('err in _DeliverTime, no ticketId');
//         res.status(500);
//         res.send('');
//     }
//     else {
//         db.collection('users').update({'grocery_list._id': ticketId},
//             {
//                 $set: {
//                     'available_time': req.body.available_time
//                 }
//             },
//             {multi: true},
//             function(err) {
//                 if (err) {
//                         console.log('error updating db in _deliveryTime: ' + err);
//                         res.status(500);
//                         res.send('');
//                     }
//                     else {
//                         db.collection('grocery_queue').update({_id: ticketId},
//                             {
//                                 $set: {
//                                     available_time: req.body.available_time
//                                 }
//                             }, function(err) {
//                                 if (err) {
//                                     console.log('Error updating db in _deliveryTime: ' + err);
//                                     res.status(500);
//                                     res.send('');
//                                 }
//                             });
//                     }
//             }
//         );
//     }
//     res.send('success');
// });
// -----------------------------------------------------------------------

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


//------------------------------------------------------------checkout---------------------------------------------
//may be update database in checkout,???
app.post('/_checkout', function (req, res, next) {
    var date = new Date();
    var userId = req.session.userId;

    db.collection('users').findOne({_id: userId}, function (err, user) {
        // Model for grocery list
        if (err) {
            console.log('Err in _checkout: ' + err);
            res.status(500);
            res.send('');
        }

        if (user === null) {
            console.log('Error: cannot find user with id: ' + userId);
            res.status(500);
            res.send('');
            return;
        }

        console.log('USER ID = ' + user._id);
        var listId = user._id + date.getTime();
        console.log('Setting masters[userId].ticketId!');
        masters[userId].ticketId = listId;

        var shoppingcart = req.body.list;
        var checkofflist = {};

        for (var i = 0; i < shoppingcart; i++)
            checkofflist[shoppingcart[i]] = false;

        var gticket = {
            _id: listId,
            // May need to fix how fields are loaded from master for these new attributes
            shopper: {
                _id: user._id,
                full_name: user.full_name,
                phone_number: user.phone_number,
                address: {
                    street: user.address.street,
                    city: user.address.city,
                    state: user.address.state,
                    zip: user.address.zip
                },
                rating: user.avg_rating
            },
            driver: {
                _id: '',
                full_name: '',
                phone_number: ''
            },
            store_name: req.body.store_name,
            shopping_list: shoppingcart,
            /*checkoff_list: checkofflist,*/
            time_created: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
            time_accepted: '',
            // Why are these from ['_accSetting'] ?
            special_options: req.body.options.checkout_notes,
            // May not use start/end time
            available_time_start: req.body.options.checkout_range1,
            available_time_end: req.body.options.checkout_range2,
            available_time: "req.body.available_time",
            state: 'pending',
            price: '',
            geolocation: {
                lat: req.body.geo_location.lat,
                lng: req.body.geo_location.lng
            }
        };

        masters[userId].ticket = gticket;
        //res.setHeader('Content-Type', 'application/json');
        res.send("Successful");
    });

});
//TODO -------------------------------------------------------------------------

app.post('_homePage', function (req, res, next) {

});

app.post('/driverListUpdate', function (req, res) {

    var ticketId = req.body.ticketId;

    if (!ticketId) {
        console.log('In driverListUpdate err');
        res.status(500);
        res.send('');

    } else {
        db.collection('users').findOne({'grocery_list._id': ticketId}, function (err, user) {

            if (err) {
                console.log('Err in driverListUpdate: ' + err);
                res.status(500);
                res.send('');
            } else if (!user) {
                console.log('User cannot be found in driverListUpdate: ' + user);
                res.status(500);
                res.send('');
            } else {
                var index = -1;
                for (var i = 0; i < user.grocery_list.length; i++) {
                    if (user.grocery_list[i]._id == ticketId) {
                        index = i;
                        break;
                    }
                }

                if (index == -1) {
                    console.log('could not find ticket with id: ' + ticketId + ' in driverListUpdate');
                    res.status(500);
                    res.send('');
                }
                else {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({
                        full_name: user.grocery_list[i].shopper.full_name,
                        items: user.grocery_list[i].shopping_list,
                        contact: user.phone_number,
                        special_notes: user.grocery_list[i].special_notes
                    }));
                }
            }
        });
    }
});

//-----------------------------------------------------DRIVER LIST -----------------------------------------
app.post('/_driverList', function (req, res, next) {
    var object = {};
    var ticketId = req.body.ticketId;
    console.log('ticketId = ' + ticketId);

    if (ticketId) {
        // object.notes = masters[userId]["_checkout"].data.special_options;
        // object.items = masters[userId]["_"].data.items;   //TODO where is items located?
        // object.name = masters[userId].name;
        // object.contact = masters[userId].phone;
        //res.send(object);

        db.collection('users').update({
                'grocery_list._id': ticketId
            },
            {
                $set: {
                    'grocery_list.$.state': 'purchased'
                }
            },
            {
                multi: true

            }, function (err) {

                if (err) {
                    console.log('Error in _driverList: ' + err);
                    res.status(500);
                    res.send('');
                }
            });

        console.log('Successfully updated tickets in user db');
        res.send('');
    }
});


//--------------------------DRIVER LIST 2---------------------
app.post('/_DriverList2', function (req, res, next) {

});


//----------------------------HISTORY----------------------
app.post('/_history', function (req, res, next) {
    var userId = req.session.userId;

    // No user is logged in, no information should be loaded/sent to page

    if (!userId) {
        console.log('In _history: No user currently logged in');
        res.status(500);
        res.send('');
    }
    else {
        db.collection('users').findOne({_id: userId}, function (err, doc) {
            if (err) {
                console.log('Error in _history findOne()');
                res.status(500);
                res.send('');
            }
            else if (!doc) {
                console.log('Could not find user with userId ' + userId + ' in _history');
                res.status(500);
                res.send('');
            }
            else {
                //res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    user_history: doc.user_history,
                    pending_list: doc.grocery_list
                }));
            }
        });
    }
});


// ---------------------------- YOUR DELIVERIES -------------------------------
app.post('/_yourDeliveries', function (req, res) {
    var userId = req.session.userId;

    if (!userId) {
        console.log('In _yourDeliveries: User is not logged in.');
        res.status(500);
        res.send('');
    }
    else {
        db.collection('users').findOne({_id: userId}, function (err, doc) {
            if (err) {
                console.log('Error in _history findOne()');
                res.status(500);
                res.send('');
            }
            else if (doc == null) {
                console.log('Could not find user with userId: ' + userId + ' in _yourDeliveries');
                res.status(500);
                res.send('');
            }
            else {
                console.log('Sending data back to _yourDeliveries.js');
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    user_history: doc.user_history,
                    pending_list: doc.delivery_list
                }));
            }
        });
    }
});

// ----------------------------------------------------------------------


// ---------------------------- VIEW TICKET -------------------------------
// Update status of ticket
app.post('/_viewTicket', function (req, res) {
    // This is the driver
    var userId = req.session.userId;

    // Id of the ticket
    var ticketId = req.body.ticketId;

    if (!userId) {
        console.log('In _viewTicket: userId is null');
        res.status(500);
        res.send('');
    }
    else if (!ticketId) {
        console.log('In _viewTicket: masters[userId].ticketId is null');
        res.status(500);
        res.send('');
    }
    else {
        db.collection('users').update(
            {
                'grocery_list._id': ticketId
            },
            {
                $set: {
                    'grocery_list.$.state': 'accepted'
                }
            }, function (err) {
                if (err) {
                    console.log('Error: ' + err);
                    res.status(500);
                    res.send('');
                }
                else {
                    // Get the user that we just modified
                    db.collection('users').findOne({'grocery_list._id': ticketId}, function (err, user) {
                        if (err) {
                            console.log('error');
                            res.status(500);
                            res.send('');
                        }
                        else if (!user) {
                            console.log('In _viewTicket: could not find user with corresponding ticketId: ' + ticketId);
                            res.status(500);
                            res.send('');
                        }
                        else {
                            var ticketToSend = null;

                            for (var i = 0; i < user.grocery_list.length; i++) {
                                if (user.grocery_list[i]._id == ticketId) {
                                    ticketToSend = user.grocery_list[i];
                                    break;
                                }
                            }

                            if (ticketToSend == null) {
                                console.log('In _viewTicket: could not find user with corresponding ticketId: ' + ticketId);
                                res.status(500);
                                res.send('');
                                return;
                            }

                            console.log('Updated ticket state: ' + ticketToSend.state);

                            db.collection('users').update({_id: userId}, {$push: {'delivery_list': ticketToSend}}, function (err) {
                                if (err) {
                                    console.log('error');
                                    res.status(500);
                                    res.send('');
                                }
                                else {
                                    db.collection('grocery_queue').remove({_id: ticketId}, function (err) {
                                        if (err) {
                                            console.log('In _viewTicket: could not remove ticket from queue: ' + ticketId);
                                            res.status(500);
                                            res.send('');
                                            return;
                                        }

                                        console.log('Successfully removed ticket from queue with id: ' + ticketId);
                                    });
                                }
                            });
                        }
                    });
                }
            }
        );
    }
});

// --------------------------------------------------------------------------


// ---------------------------- TICKETS/QUEUE -------------------------------
// Queue page
app.post('/_tickets', function (req, res) {
    var userId = req.session.userId;

    if (!userId) {
        console.log('In _tickets: userId is null');
        res.status(500);
        res.send('');
    }
    else {
        db.collection('grocery_queue').find().toArray(function (err, docs) {
            if (err) {
                console.log('Error in _tickets: ' + err);
                res.status(500);
                res.send('');
            }

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(docs));
        });
    }
});
// --------------------------------------------------------------------------


//------------------------------ PAYMENT ------------------------------------
app.get('/complete-payment', function (req, res) {
    var userId = req.query.user;
    console.log(userId);
    //
    var gticket = masters[userId].ticket;

    for (var i = 0; i < gticket.shopping_list.length; i++) {
        console.log(gticket.shopping_list[i]);
    }
    console.log('GTICKET = ' + JSON.stringify(gticket));
    // Check that empty list was not sent
    if (gticket.shopping_list.length == 0) {
        console.log('Grocery ticket submitted has no items');
        res.status(500);
        res.send('');
        return;
    }


    // Update user to hold grocery list submitted
    db.collection('users').updateOne({_id: userId}, {$push: {'grocery_list': gticket}},
        function (err) {
            if (err) {
                console.log('error updating user grocery list: ' + err);
                res.status(500);
                //res.setHeader('Content-Type', 'application/json');
                res.send('');
            }
            else {
                // If grocery list successfully added to user's grocery list, add list to queue
                db.collection('grocery_queue').insert(gticket, function (err) {
                    if (err) {
                        console.log('error adding list to queue: ' + err);
                        res.status(500);
                        //res.setHeader('Content-Type', 'application/json');
                        res.send('');
                    }
                    else {
                        res.redirect('/submittedRedirect.html');
                    }
                });
            }
        }
    );
});

app.get('/cancel-payment', function (req, res) {
    var userId = req.query.user;
    res.redirect('/cancelRedirect.html');
});




//---------------------------- Cancel Ticket ----------------------------------
app.post('/_cancelTicket', function (req, res) {
    var ticketId = req.body.ticketId;
    var object = {};
    if (ticketId == null) {
        res.status(420);
        console.log('ERROR IS HERE');
        console.log(ticketId);
        res.setHeader('Content-Type', 'application/json');
        res.send({message: 'no ticket ID!'});
    }

    else if(req.body.type == 'cancel') {
        db.collection('users').updateOne({"grocery_list._id": ticketId},
            {
                $set: {
                    state: 'cancelled'
                }
            }, 
            function(err) {
                if (err) {
                    console.log('In _cancelTicket: could not update ticket to cancelled: ' + ticketId);
                    res.status(500);
                    res.send('');
                    return;
                }
            }

        );
        db.collection('grocery_queue').remove({_id: ticketId}, function (err) {
            if (err) {
                console.log('In _cancelTicket: could not remove ticket from queue: ' + ticketId);
                res.status(500);
                res.send('');
                return;
            }

            console.log('Successfully removed ticket from queue with id: ' + ticketId);
        });
    }
    else {
        console.log('LOADING ACCOUNT');
        db.collection('users').findOne({"grocery_list._id": ticketId},
            function (err, ticket) {
                if (err) {
                    console.log('Error in : ' + err);
                    res.status(500);
                    res.setHeader('Content-Type', 'application/json');
                    res.send({message: 'cannot access collection to find ticket '});
                    return;
                }
                if (ticket == null) {
                    console.log('Could not find user with ticket ' + ticketId + ' in _shoppingStatus');
                    console.log(JSON.stringify(ticket));
                    res.status(500);
                    res.send('');
                }
                else {
                    //console.log(JSON.stringify(ticket));
                    object.items = ticket.shopping_list;
                    object.special_note = ticket.special_options;
                    object.time = ticket.available_time;
                    object.shopping_location = ticket.geolocation;

                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(object));
                }
            });
    }
});


//---------------------------- shopping status ---------------------------------
app.post('/_shoppingStatus', function (req, res) {
    var ticketId = req.body.ticketId;
    var object = {};
    if (ticketId == null) {
        res.status(420);
        console.log('ERROR IS HERE');
        console.log(ticketId);
        res.setHeader('Content-Type', 'application/json');
        res.send({message: 'no user logged in'});
    }


    console.log('LOADING ACCOUNT');
    db.collection('users').findOne({"grocery_list._id": ticketId},
        function (err, ticket) {
            if (err) {
                console.log('Error in : ' + err);
                res.status(500);
                res.setHeader('Content-Type', 'application/json');
                res.send({message: 'cannot access collection to find ticket '});
                return;
            }
            if (ticket == null) {
                console.log('Could not find user with ticket ' + ticketId + ' in _shoppingStatus');
                console.log(JSON.stringify(ticket));
                res.status(500);
                res.send('');
            }
            else {
                //console.log(JSON.stringify(ticket));
                object.items = ticket.shopping_list;
                object.driverId = ticket.driver._id;
                object.driver_full_name = ticket.driver.full_name;
                object.special_note = ticket.special_options;
                object.time = ticket.available_time;
                object.shopping_location = ticket.geolocation;

                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(object));
            }
        });

});


//---------------------------- Price and Receipt Photo ------------------------
app.post('/_receiptPictureEnterPrice', function (req, res) {
    //send price and receipt to the database
    var price = req.body.price;
    var ticketId = req.body.ticket;
    //update shopper's grocery list
    db.collection('users').updateOne({'grocery_list._id': ticketId},
        {
            $set: {
                price: price
            }
        },
        function (err) {
            if (err) return err;
        }
    );

    var img = (req.body.image);
    var data = img.replace(/^data:image\/\w+;base64,/, "");

    var buf = new Buffer(data, 'base64');
    //noinspection JSUnresolvedFunction
    if (req.session.userId === 'undefined')
        fs.writeFile('images/receipts/image.png', buf, function (err) {
            if (err)
                throw err;
            console.log("Photo saved");
        });
    else
        fs.writeFile('images/receipts/' + ticketId + '.png', buf, function (err) {
            if (err)
                throw err;
            console.log("Photo saved");
        });

    console.log("Photo Saved: " + data.substring(0, 10));
    /*fs.writeFile("images/profiles/" + req.session.userId + ".png", req.body.image,"base64", function (err, data ) {
     if (err) {
     return console.log("Error");
     }
     console.log("Photo saved. Success!");}
     );*/
    res.send("");

});


//-------------------------- Contact -----------------------------------
app.post('/_contact', function (req, res) {
    var Transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'fetchtestuser',
            pass: 'insanelycreatives'
        }
    });
    var mailOptions = {
        to: 'allen@fetchgrocery.com',
        from: 'fetchtestuser@gmail.com',
        subject: 'User Contact from ' + req.body.email + ', ' + req.body.name,
        text: req.body.comment
    };
    console.log('Sending Mail');
    Transport.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log('Error occurred');
            console.log(err.message);
            res.status(500);
            return;
        }
    });
});


//------------------------------ MAP --------------------------------------------
app.post('/_map', function (req, res) {
    if (!req.body) {
        console.log('geoloc was not sent');
        res.status(500);
        return;
    }
    var lat = req.body.lat;
    var lng = req.body.lng;

    var ticketId = req.body.ticket;

    db.collection('users').updateOne({'grocery_list._id': ticketId},
        {
            $set: {
                'geolocation.lng': lng,
                'geolocation.lat': lat
            }
        },
        function (err) {
            if (err) return err;
        }
    );
});

app.post('/_driverMap', function (req, res) {
    var geolocation = {};
    db.collection('users').findOne({'grocery_list._id': ticketId},
        function (err, ticket) {
            if (err) {
                console.log('Error in accSetting: ' + err);
                res.status(500);
                res.setHeader('Content-Type', 'application/json');
                res.send({message: 'cannot access collection to find user '})
                return;
            }
            //console.log('user = ' + JSON.stringify(user));
            if (ticket == null) {
                console.log('Could not find user with userId ' + userId + ' in _accSetting');
                console.log(JSON.stringify(ticket));
                res.status(500);
                res.send('');
                return;
            }
            else {
                geolocation.lat = ticket.geolocation.lat;
                geolocation.lng = ticket.geolocation.lng;
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(geolocation));
            }
        }
    );
});


MongoClient.connect(mongodb_url, function (err, database) {
    if (err)
        throw err;
    mongoose.connect(mongodb_url);
    db = database;
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)
});

// -------------------------------------------------------------
