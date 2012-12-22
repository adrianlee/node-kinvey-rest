var Users = exports.Users = function (client) {
  this.client = client;
}

Users.prototype.login = function(data, callback) {
  var _this = this;

  // init request
  this.client.request({
    method: "POST",
    url: '/user/' + this.client.appKey + "/login",
    headers: {
      Authorization: this.client.authorization
    },
    json: {
      username: data.username,
      password: data.password
    },
    callback: callback
  });
};

Users.prototype.logout = function(authtoken, callback) {
  var _this = this;

  // init request
  this.client.request({
    method: "POST",
    url: '/user/' + this.client.appKey + "/_logout",
    headers: {
      Authorization: authtoken
    },
    callback: callback
  });
};

/*
  Basic User Operations
*/
Users.prototype.signup = function(data, callback) {
  var _this = this;

  // init request
  this.client.request({
    method: "POST",
    url: '/user/' + this.client.appKey,
    headers: {
      Authorization: this.client.authorization
    },
    json: data,
    callback: callback
  });
};

Users.prototype.retrieve = function(id, authtoken, callback) {
  // if no authtoken param defined
  if (typeof callback === 'undefined') {
    callback = authtoken;
    authtoken = null;
  }

  // init request
  this.client.request({
    url: '/user/' + this.client.appKey + "/" + id,
    headers: {
      Authorization: authtoken || this.client.authorization
    },
    callback: callback
  });
};

Users.prototype.update = function(id, data, authtoken, callback) {
  // if no authtoken param defined
  if (typeof callback === 'undefined') {
    callback = authtoken;
    authtoken = null;
  }

  // init request
  this.client.request({
    method: "PUT",
    url: '/user/' + this.client.appKey + "/" + id,
    headers: {
      Authorization: authtoken || this.client.authorization
    },
    json: data,
    callback: callback
  });
};

Users.prototype.delete = function(id, hard, authtoken, callback) {
  // if no authtoken param defined
  if (typeof callback === 'undefined') {
    callback = authtoken;
    authtoken = null;
  }

  // init request
  this.client.request({
    method: "DELETE",
    url: '/user/' + this.client.appKey + "/" + id,
    headers: {
      "Authorization": authtoken || this.client.authorization,
      "X-Kinvey-API-Version": 1
    },
    qs: {
      soft: !hard,
      hard: hard
    },
    callback: callback
  });
};