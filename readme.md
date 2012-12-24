# node-kinvey-rest
A Kinvey REST API Client for node.js

## Install
Coming Soon <pre>npm install node-kinvey-rest</pre>

Or from source:

``` bash
git clone git://github.com/adrianlee/node-kinvey-rest.git
cd node-kinvey-rest
npm link
```

## Usage
``` js
  var Kinvey = require('node-kinvey-rest');

  var config = {
    appKey: XXXXXXXXXXXX,
    appSecret: XXXXXXXXXXXX,
    masterSecret: XXXXXXXXXXXX
  }

  var kinvey = new Kinvey(config.appKey, config.appSecret, config.masterSecret);

  kinvey.user.signup({username: "bob", password: "secret"}, function (err, res, body, success) {
    console.log(body);
  });
```

## API Coverage
### Implemented
> ##### App
+ Ping

> ##### Users
+ Sign up
+ Retrieve
+ Update
+ Delete
+ Login
+ Logout
+ Email Verification
+ Password Reset

> ##### Data Store
+ Entities (Create, Retrieve, Update, Delete)

### Not Implemented
> + Social Identities
+ User Discovery
+ User Group (Create, Retrieve, Update, Delete)
+ Querying (Filter, Modifiers, Compounded Queries, Couting, Aggregation, Location Querying)
+ Relational Data (Setup, Retrieve, Limitation)
+ Sequences (Create, Retrieve, Update, Remove, _sequences)
+ File (Upload, Download, Delete)

## Run Tests
``` bash
make mocha
```