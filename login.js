// For user login
app.post('login',function(req, res) {
    req.body = {
        email: "someemail@ucsd.edu",
        password: "somepassword"
    };

    var email=req.body.email;
    var password=req.body.password;

    var findDoc = function(db, callback) {
        var x = db.collection('users').findOne({email: email}, function(err, item) {
            assert.equal(null, err);
            if (item !== null) {
                bcrypt.compare(password, item.password_hash, function(err, result) {
                    assert(null, err);

                    // TODO: what to do after successful/bad login
                    if (result) {
                        res.send("success");
                        //
                    }
                    else {
                        res.status(500).send("incorrect password");
                    }
                });
            }
            // Check returning error
            else {
                res.status(500).send("invalid email");
            }
        });
    };

    MongoClient.connect(mongodb_url, function (err, db) {
        assert.equal(null, err);
        findDoc(db, function() {
            db.close();
        });
    });
});