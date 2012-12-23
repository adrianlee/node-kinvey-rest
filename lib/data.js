var path = require('path');

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

Data.prototype.retrieve = function(collectionName, id, authtoken, callback) {
  return this.client.request({
    method: "GET",
    url: path.join('appdata', this.client.appKey, collectionName, id),
    headers: {
      Authorization: authtoken
    },
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
  // Stringify nested objects of depth 2+
  try {
    for (var i in qs) {
      qs[i] = JSON.stringify(qs[i]);
    }
  } catch(e) {
    throw new Error(e);
  }

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