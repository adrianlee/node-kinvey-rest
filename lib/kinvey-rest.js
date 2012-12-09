var request = require('request');
var _ = require('underscore');
var qs = require('querystring');

var KinveyRest = function(appKey, appSecret) {
    this.appKey = appKey;
    this.appSecret = appSecret;
    this.authorization = "Basic " + new Buffer(this.appKey + ":" + this.appSecret).toString('base64');
};

KinveyRest.prototype = {
  host_endpoint: "https://baas.kinvey.com",

  ping: function(authtoken, callback) {
    // if no authtoken param defined
    if (typeof callback === 'undefined') {
      callback = authtoken;
      authtoken = null;
    }

    // init request
    this._request({
      url: '/appdata/' + this.appKey,
      headers: {
        Authorization: authtoken || this.authorization
      },
      callback: callback
    });
  },

  login: function(data, authtoken, callback) {
    var _this = this;

    // if no authtoken param defined
    if (typeof callback === 'undefined') {
      callback = authtoken;
      authtoken = null;
    }

    // init request
    this._request({
      method: "POST",
      url: '/user/' + this.appKey + "/login",
      headers: {
        Authorization: authtoken || this.authorization
      },
      json: {
        username: data.username,
        password: data.password
      },
      callback: callback
    });
  },

  logout: function(authtoken, callback) {
    var _this = this;

    // init request
    this._request({
      method: "POST",
      url: '/user/' + this.appKey + "/_logout",
      headers: {
        Authorization: authtoken
      },
      callback: callback
    });
  },

  /*
    Basic User Operations
  */
  signup: function(data, callback) {
    var _this = this;

    // init request
    this._request({
      method: "POST",
      url: '/user/' + this.appKey,
      headers: {
        Authorization: this.authorization
      },
      json: data,
      callback: callback
    });
  },

  retrieve: function(id, authtoken, callback) {
    // if no authtoken param defined
    if (typeof callback === 'undefined') {
      callback = authtoken;
      authtoken = null;
    }

    // init request
    this._request({
      url: '/user/' + this.appKey + "/" + id,
      headers: {
        Authorization: authtoken || this.authorization
      },
      callback: callback
    });
  },

  update: function(id, data, authtoken, callback) {
    // if no authtoken param defined
    if (typeof callback === 'undefined') {
      callback = authtoken;
      authtoken = null;
    }

    // init request
    this._request({
      method: "PUT",
      url: '/user/' + this.appKey + "/" + id,
      headers: {
        Authorization: authtoken || this.authorization
      },
      json: data,
      callback: callback
    });
  },

  delete: function(id, hard, authtoken, callback) {
    // if no authtoken param defined
    if (typeof callback === 'undefined') {
      callback = authtoken;
      authtoken = null;
    }

    // init request
    this._request({
      method: "DELETE",
      url: '/user/' + this.appKey + "/" + id,
      headers: {
        Authorization: authtoken || this.authorization
      },
      qs: {
        soft: !hard,
        hard: hard
      },
      callback: callback
    });
  },

  _request: function(opts) {
    opts = _.extend({
      method: 'GET',
      url: null,
      params: null,
      body: null,
      headers: null,
      callback: null
    }, opts);

    var reqOpts = {
      method: opts.method,
      headers: opts.headers
    };

    if (opts.json) {
      reqOpts.json = opts.json;
    } else if (opts.body) {
      reqOpts.body = opts.body;
    } else if (opts.params) {
      reqOpts.params = opts.params;
    } else if (opts.qs) {
      reqOpts.qs = opts.qs;
    }

    console.log(reqOpts);

    request(this.host_endpoint + opts.url, reqOpts, function(err, res, body) {
      var success = !err && (res.statusCode === 200 || res.statusCode === 201);
      if (body && body.error) {
        success = false;
      }

      opts.callback(err, res, body, success);
    });
  }
};

module.exports = KinveyRest;