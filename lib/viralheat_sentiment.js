(function() {
  var exports;
  exports = module.exports = function(api_key) {
    var core, get, quota, train;
    core = require('./core')(api_key);
    get = function(text, callback) {
      return core.callApi('sentiment', 'review', params, null, function(err, data, status) {
        if (status === '200') {
          return callback(null, data, 200);
        } else {
          return callback({
            code: status,
            msg: err
          });
        }
      });
    };
    train = function(text, mood, callback) {
      return core.callApi('sentiment', 'train', params, null, function(err, data, status) {
        if (status === '200') {
          return callback(null, data, 200);
        } else {
          return callback({
            code: status,
            msg: err
          });
        }
      });
    };
    quota = function(callback) {
      return core.callApi('sentiment', 'quota', params, null, function(err, data, status) {
        if (status === '200') {
          return callback(null, data, 200);
        } else {
          return callback({
            code: status,
            msg: err
          });
        }
      });
    };
    return {
      api_key: api_key,
      train: train,
      get: get,
      quota: quota
    };
  };
}).call(this);
