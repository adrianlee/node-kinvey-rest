var config = require('./config'),
    should = require('should'),
    Kinvey = require('../index');

var kinvey = new Kinvey(config.appKey, config.appSecret, config.masterSecret);

var user = [
  {
    username: "johndoe",
    password: "secret"
  }
];

describe('user', function () {
  var _authToken,
      _userId;

  it('can delete user object', function (done) {
    kinvey.user.login(user[0], function (err, res, body, success) {
      var authToken,
          userId;

      // If user exists then delete else next spec.
      if (success) {
        userId = body._id;
        authToken = "Kinvey " + body._kmd.authtoken;
        kinvey.user.delete(userId, true, authToken, function (err, res, body, success) {
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
    kinvey.user.login(user[0], function (err, res, body, success) {
      res.statusCode.should.equal(401);
      success.should.be.false;
      done();
    });
  });

  it('can sign up new user', function (done) {
    kinvey.user.signup(user[0], function (err, res, body, success) {
      success.should.be.true;
      res.statusCode.should.equal(201);
      done();
    });
  });

  it('can not sign up existing user', function (done) {
    kinvey.user.signup(user[0], function (err, res, body, success) {
      success.should.be.false;
      res.statusCode.should.equal(409);
      body.error.should.be.equal(config.constants.USER_ALREADY_EXISTS);
      done();
    });
  });

  it('can login with credentials', function (done) {
    kinvey.user.login(user[0], function (err, res, body, success) {
      success.should.be.true;
      res.statusCode.should.equal(200);
      body._kmd.should.be.a('object');
      body._kmd.should.have.property('authtoken');
      _authToken = "Kinvey " + body._kmd.authtoken;
      _userId = body._id;
      done();
    });
  });

  it('can retrieve user object by id', function (done) {
    kinvey.user.retrieve(_userId, _authToken, function (err, res, body, success) {
      success.should.be.true;
      res.statusCode.should.equal(200);
      body.username.should.equal(user[0].username);
      done();
    });
  });

  it('can update user object by id', function (done) {
    var newParams = {
      age: 21,
      gender: "male"
    };

    kinvey.user.update(_userId, newParams, _authToken, function (err, res, body, success) {
      success.should.be.true;
      res.statusCode.should.equal(200);
      body.username.should.equal(user[0].username);
      body.age.should.equal(21);
      body.gender.should.equal("male");
      done();
    });
  });

  it('can logout w/o authtoken', function (done) {
    kinvey.user.logout(null , function (err, res, body, success) {
      success.should.be.false;
      res.statusCode.should.equal(401);
      done();
    });
  });

  it('can logout w/ invalid authtoken', function (done) {
    var invalid = "Kinvey beac6af1-023e-42e6-9f32-0b04a46447b9.227hguyYX3YDrQCwjwZT16VJThUGwRCBcH2/3cPtCoE=";

    kinvey.user.logout(invalid, function (err, res, body, success) {
      success.should.be.false;
      res.statusCode.should.equal(401);
      done();
    });
  });

  it('can logout w/ valid authtoken', function (done) {
    kinvey.user.logout(_authToken, function (err, res, body, success) {
      success.should.be.true;
      res.statusCode.should.equal(204);
      done();
    });
  });

  it('can send verification email', function (done) {
    kinvey.user.verifyEmail(user[0].username, function (err, res, body, success) {
      success.should.be.true;
      res.statusCode.should.equal(204);
      done();
    });
  });

  it('can reset password', function (done) {
    kinvey.user.resetPass(user[0].username, function (err, res, body, success) {
      success.should.be.true;
      res.statusCode.should.equal(204);
      done();
    });
  });
});
