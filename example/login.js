var KinveyRest = require("../index"),
    kinvey,
    kinveyCredentials,
    login;

kinveyCredentials = {
    appKey: "kid_VVwbxsyyOf",
    appSecret: "690ca1b830f34149b0058df62a568a28"
};

kinvey = new KinveyRest(kinveyCredentials.appKey, kinveyCredentials.appSecret);

userCredentials = {
    username: "irok",
    password: "secret"
};


// Login and aquire authtoken
kinvey.login(userCredentials, function(err, res, body, success) {
    var auth;

    if (success && body._kmd) {
        auth = "Kinvey " + body._kmd.authtoken;
    }

    // Ping with authtoken
    kinvey.ping(auth, function(e, r, b, s) {
        console.log(b);

        // Logout with authtoken
        kinvey.logout(auth, function(e,r,b,s) {
            console.log(r.statusCode);
            if (r.statusCode == 204) {
                console.log("Logged Out");
            }

            // Ping with expired authtoken
            kinvey.ping(auth, function(e, r, b, s) {
                if (r.statusCode == 401) {
                    console.log("Authtoken Expired")
                }

                // Ping without authtoken
                kinvey.ping(function(e, r, b, s) {
                    console.log(r.statusCode);
                    console.log(b);
                });
            });
        });
    });
});
