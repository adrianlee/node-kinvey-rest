var config = require('./config'),
    should = require('should'),
    async = require('async'),
    KinveyRest = require('../index');


var kinvey = new KinveyRest(config.appKey, config.appSecret);

var users = [
  {
    username: "irok",
    password: "secret"
  },
  {
    username: "johndoe",
    password: "secret"
  }
];

describe('users', function () {
  var _authToken;

  it('can delete user object', function (done) {
    kinvey.login(users[0], function (err, res, body, success) {
      var authToken,
          userId;

      // If user exists then delete else next spec.
      if (success) {
        userId = body._id;
        authToken = "Kinvey " + body._kmd.authtoken;
        kinvey.delete(userId, true, authToken, function (err, res, body, success) {
          res.statusCode.should.equal(204);
          success.should.be.true;
          done();
        });
      } else {
        done();
      }
    });
  });

  it('user should not exist', function (done) {
    kinvey.login(users[0], function (err, res, body, success) {
      res.statusCode.should.equal(401);
      success.should.be.false;
      done();
    });
  });

  it('can sign up new user', function (done) {
    kinvey.signup(users[0], function (err, res, body, success) {
      res.statusCode.should.equal(201);
      success.should.be.true;
      done();
    });
  });

  it('can not sign up existing user', function (done) {
    kinvey.signup(users[0], function (err, res, body, success) {
      res.statusCode.should.equal(409);
      body.error.should.be.equal(config.constants.USER_ALREADY_EXISTS)
      success.should.be.false;
      done();
    });
  });

  it('can retrieve user object by id');

  it('can update user object by id');

  it('can login with credentials', function (done) {
    kinvey.login(users[0], function (err, res, body, success) {
      res.statusCode.should.equal(200);
      body._kmd.should.be.a('object');
      body._kmd.should.have.property('authtoken');
      _authToken = "Kinvey " + body._kmd.authtoken;
      success.should.be.true;
      done();
    });
  });

  it('can logout w/o authtoken', function (done) {
    kinvey.logout(null , function (err, res, body, success) {
      res.statusCode.should.equal(401);
      success.should.be.false;
      done();
    });
  });

  it('can logout w/ invalid authtoken', function (done) {
    var invalid = "Kinvey beac6af1-023e-42e6-9f32-0b04a46447b9.227hguyYX3YDrQCwjwZT16VJThUGwRCBcH2/3cPtCoE=";

    kinvey.logout(invalid, function (err, res, body, success) {
      res.statusCode.should.equal(401);
      success.should.be.false;
      done();
    });
  });

  it('can logout w/ valid authtoken', function (done) {
    kinvey.logout(_authToken, function (err, res, body, success) {
      res.statusCode.should.equal(204);
      success.should.be.true;
      done();
    });
  });

});
