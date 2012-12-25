var path = require('path'),
    mixin = require('./mixin');

var Data = exports.Data = function (client) {
  this.client = client;
};


var _id;

Data.prototype.create = function(collectionName, id, data, authtoken, callback) {
  return this.client.request({
    method: "POST",
    url: path.join('appdata', this.client.appKey, collectionName, id),
    headers: {
      Authorization: authtoken
    },
    json: data,
    callback: callback
  });
};

Data.prototype.retrieve = function(collectionName, id, qs, authtoken, callback) {
  // if no qs param defined
  if (typeof callback === 'undefined') {
    callback = authtoken;
    authtoken = qs;
  } else {
    mixin.stringify(qs);
  }

  return this.client.request({
    method: "GET",
    url: path.join('appdata', this.client.appKey, collectionName, id),
    headers: {
      Authorization: authtoken
    },
    qs: qs,
    callback: callback
  });
};

Data.prototype.update = function(collectionName, id, data, authtoken, callback) {
  return this.client.request({
    method: "PUT",
    url: path.join('appdata', this.client.appKey, collectionName, id),
    headers: {
      Authorization: authtoken
    },
    json: data,
    callback: callback
  });
};

Data.prototype.delete = function(collectionName, id, qs, authtoken, callback) {
  mixin.stringify(qs);

  return this.client.request({
    method: "DELETE",
    url: path.join('appdata', this.client.appKey, collectionName, id),
    headers: {
      Authorization: authtoken
    },
    qs: qs,
    callback: callback
  });
};

Data.prototype.count = function(collectionName, authtoken, callback) {
  return this.client.request({
    method: "GET",
    url: path.join('appdata', this.client.appKey, collectionName, '_count'),
    headers: {
      Authorization: authtoken
    },
    callback: callback
  });
};