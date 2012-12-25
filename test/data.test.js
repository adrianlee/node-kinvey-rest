var config = require('./config'),
    should = require('should'),
    async = require('async'),
    Kinvey = require('../index');

var kinvey = new Kinvey(config.appKey, config.appSecret, config.masterSecret);


describe('Data Store', function () {
  var user = {
    username: "johndoe",
    password: "secret"
  };

  var _authToken;

  before(function (done) {
    kinvey.user.signup(user, function (err, res, body, success) {
      kinvey.user.login(user, function (err, res, body, success) {
        success.should.be.true;
        _authToken = "Kinvey " + body._kmd.authtoken;
        done();
      });
    });
  });

  describe('Entities', function () {
    var collectionName = "transactions",
        _transactionId1,
        _transactionId2;

    it('can create entity1', function (done) {
      var data = {
          amount: 100,
          date: new Date().toUTCString()
      };

      kinvey.data.create(collectionName, undefined, data, _authToken, function (err, res, body, success) {
        success.should.be.true;
        res.statusCode.should.equal(201); // Created
        body.amount.should.equal(100);
        _transactionId1 = body._id;
        done();
      });
    });

    it('can create entity2', function (done) {
      var data = {
          amount: 100,
          date: new Date().toUTCString()
      };

      kinvey.data.create(collectionName, undefined, data, _authToken, function (err, res, body, success) {
        success.should.be.true;
        res.statusCode.should.equal(201); // Created
        body.amount.should.equal(100);
        _transactionId2 = body._id;
        done();
      });
    });

    it('can update entity1', function (done) {
      var data = {
        amount: 200,
        date: new Date().toUTCString()
      };

      kinvey.data.update(collectionName, _transactionId1, data, _authToken, function (err, res, body, success) {
        success.should.be.true;
        res.statusCode.should.equal(200); // OK
        done();
      });
    });

    it('can retrieve entity1', function (done) {
      kinvey.data.retrieve(collectionName, _transactionId1, _authToken, function (err, res, body, success) {
        success.should.be.true;
        res.statusCode.should.equal(200); // OK
        body.amount.should.equal(200);
        done();
      });
    });

    it('can delete entity field using query parameter', function (done) {
      var params = {
        query: {
          amount: 100
        }
      };

      kinvey.data.delete(collectionName, null, params, _authToken, function (err, res, body, success) {
        success.should.be.true;
        res.statusCode.should.equal(200); // OK
        body.count.should.equal(1);
        done();
      });
    });

    it('can delete all entities in collection', function (done) {
      var params = {
        query: {} // deletes all
      };

      kinvey.data.delete(collectionName, null, params, _authToken, function (err, res, body, success) {
        success.should.be.true;
        res.statusCode.should.equal(200); // OK
        body.count.should.equal(1);
        done();
      });
    });
  });

  describe('Querying', function () {
    var collectionName = "items";

    it('can count', function (done) {
      var data = {
        price: 100,
        name: "item"
      };

      // Make two entities, count, then delete.
      async.waterfall([
        function (callback) {
          kinvey.data.create(collectionName, undefined, data, _authToken, function (err, res, body, success) {
            success.should.be.true;
            res.statusCode.should.equal(201); // Created
            callback();
          });
        },
        function (callback) {
          kinvey.data.create(collectionName, undefined, data, _authToken, function (err, res, body, success) {
            success.should.be.true;
            res.statusCode.should.equal(201); // Created
            callback();
          });
        },
        function (callback) {
          kinvey.data.count(collectionName, _authToken, function (err, res, body, success) {
            success.should.be.true;
            res.statusCode.should.equal(200); // OK
            body.count.should.equal(2);
            callback();
          });
        },
        function (callback) {
          var params = {
            query: {} // deletes all
          };

          kinvey.data.delete(collectionName, null, params, _authToken, function (err, res, body, success) {
            success.should.be.true;
            res.statusCode.should.equal(200); // OK
            body.count.should.equal(2);
            done();
          });
        }
      ], function (err) {
        done(err);
      });
    });
  });
});