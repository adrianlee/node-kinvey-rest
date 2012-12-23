var request = require('request'),
    _ = require('underscore'),
    qs = require('querystring'),
    path = require('path');

var Kinvey = function(appKey, appSecret) {
  var self = this;

  this.appKey = appKey;
  this.appSecret = appSecret;
  this.authorization = "Basic " + new Buffer(this.appKey + ":" + this.appSecret).toString('base64');

  this.user = new (require('./user').User)(self);
};

Kinvey.prototype.host_endpoint = "https://baas.kinvey.com/";

Kinvey.prototype.ping = function(authtoken, callback) {
  // if no authtoken param defined
  if (typeof callback === 'undefined') {
    callback = authtoken;
    authtoken = null;
  }

  // init request
  this.request({
    url: path.join('appdata', this.appKey),
    headers: {
      Authorization: authtoken || this.authorization
    },
    callback: callback
  });
};

Kinvey.prototype.request = function (opts) {
  var reqOpts = {
    method: opts.method,
    headers: opts.headers,
    json: opts.json,
    body: opts.body,
    params: opts.params,
    qs: opts.qs
  };

  request(this.host_endpoint + opts.url, reqOpts, function(err, res, body) {
    var success = !err;

    if (typeof body == 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        throw new Error(e);
      }
    }

    if (body && body.error) {
      success = false;
    }

    opts.callback(err, res, body, success);
  });
};

module.exports = Kinvey;