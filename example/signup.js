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
    username: "adrianlee9",
    password: "secret",
    email: "adrian@bojap.com",
    gender: "male",
    age: 99
};

// Signup
kinvey.signup(userCredentials, function(err, res, body, success) {
    var auth, user_id;

    // Use authtoken from login response
    if (success && body._kmd) {
        auth = "Kinvey " + body._kmd.authtoken;
    }

    user_id = body._id;
    console.log(body);

    if (success) {
        // soft delete
        kinvey.delete(user_id, false, auth, function(err, res, body, success) {
            console.log(res);
            console.log(body);
            // hards delete
            kinvey.delete(user_id, true, auth, function(err, res, body, success) {
                console.log(res);
                console.log(body);
            });
        });
    }
});
