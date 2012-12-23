var path = require('path');

var User = exports.User = function (client) {
  this.client = client;
};

User.prototype.login = function(data, callback) {
  return this.client.request({
    method: "POST",
    url: path.join('user', this.client.appKey, 'login'),
    headers: {
      Authorization: this.client.appAuthorization
    },
    json: {
      username: data.username,
      password: data.password
    },
    callback: callback
  });
};

User.prototype.logout = function(authtoken, callback) {
  return this.client.request({
    method: "POST",
    url: path.join('user', this.client.appKey, '_logout'),
    headers: {
      Authorization: authtoken
    },
    callback: callback
  });
};

/*
  Basic User Operations
*/
User.prototype.signup = function(data, callback) {
  return this.client.request({
    method: "POST",
    url: path.join('user', this.client.appKey),
    headers: {
      Authorization: this.client.appAuthorization
    },
    json: data,
    callback: callback
  });
};

User.prototype.retrieve = function(id, authtoken, callback) {
  // if no authtoken param defined
  if (typeof callback === 'undefined') {
    callback = authtoken;
    authtoken = null;
  }

  return this.client.request({
    url: path.join('user', this.client.appKey, id),
    headers: {
      Authorization: authtoken
    },
    callback: callback
  });
};

User.prototype.update = function(id, data, authtoken, callback) {
  // if no authtoken param defined
  if (typeof callback === 'undefined') {
    callback = authtoken;
    authtoken = null;
  }

  return this.client.request({
    method: "PUT",
    url: path.join('user', this.client.appKey, id),
    headers: {
      Authorization: authtoken
    },
    json: data,
    callback: callback
  });
};

User.prototype.delete = function(id, hard, authtoken, callback) {
  // if no authtoken param defined
  if (typeof callback === 'undefined') {
    callback = authtoken;
    authtoken = null;
  }

  return this.client.request({
    method: "DELETE",
    url: path.join('user', this.client.appKey, id),
    headers: {
      "Authorization": authtoken || this.client.masterAuthorization,
      "X-Kinvey-API-Version": 1
    },
    qs: {
      soft: !hard,
      hard: hard
    },
    callback: callback
  });
};

User.prototype.verifyEmail = function(username, callback) {
  return this.client.request({
    method: "POST",
    url: path.join('rpc', this.client.appKey, username, 'user-email-verification-initiate'),
    headers: {
      "Authorization": this.client.appAuthorization,
    },
    callback: callback
  });
};

User.prototype.resetPass = function(username, callback) {
  return this.client.request({
    method: "POST",
    url: path.join('rpc', this.client.appKey, username, 'user-password-reset-initiate'),
    headers: {
      "Authorization": this.client.appAuthorization,
    },
    callback: callback
  });
};