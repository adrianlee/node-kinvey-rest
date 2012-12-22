var KinveyRest = require("../index"),
    kinvey,
    kinveyCredentials,
    userCredentials;

kinveyCredentials = {
    appKey: "kid_VVwbxsyyOf",
    appSecret: "690ca1b830f34149b0058df62a568a28"
};

kinvey = new KinveyRest(kinveyCredentials.appKey, kinveyCredentials.appSecret);

// Required
userCredentials = {
    username: "adrianlee",
    password: "secret"
};

// Login
kinvey.login(userCredentials, function(err, res, body, success) {
    var auth, user_id;

    // Use authtoken from login response
    if (success && body._kmd) {
        auth = "Kinvey " + body._kmd.authtoken;
    }

    user_id = body._id;

    // Retreive self
    kinvey.retrieve(user_id, auth, function(err, res, body, success) {
        var update_fields;

        body = JSON.parse(body);
        console.log(body);

        // Update Age field
        update_fields = {
            age: ++body.age
        };

        kinvey.update(user_id, update_fields, auth, function(err, res, body, success) {
            // Age should increment
            console.log(body);
        });
    });
});
