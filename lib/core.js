(function() {
  var http, i, path, qs, urlParser;
  http = require('http');
  urlParser = require('url');
  path = require('path');
  qs = require('querystring');
  i = require('util').inspect;
  module.exports = function(api_key) {
    var api_url, callApi, get, _is;
    api_url = 'http://www.viralheat.com/api/';
    _is = function(type, module, method) {
      if (type === 'get') {
        switch (module) {
          case 'sentiment':
            return true;
          default:
            return false;
        }
      }
    };
    get = function(url, callback) {
      var parsedUrl, pathstr, request, result;
      parsedUrl = urlParser.parse(url, true);
      result = "";
      if (parsedUrl.query === void 0) {
        parsedUrl.query = {};
      }
      pathstr = parsedUrl.pathname + "?" + qs.stringify(parsedUrl.query);
      request = http.request({
        "host": parsedUrl.hostname,
        "port": parsedUrl.port,
        "path": pathstr,
        "method": "GET",
        "headers": {
          "Content-Length": 0
        }
      }, function(res) {
        res.on("data", function(chunk) {
          return result += chunk;
        });
        return res.on("end", function() {
          result = result;
          return callback(null, result, res.statusCode);
        });
      });
      request.on("error", function(err) {
        return callback(err);
      });
      return request.end();
    };
    callApi = function(module, method, params, callback) {
      var baseUrl, fullUrl, parsedParams;
      if (typeof callback !== 'function') {
        callback = function(err, data, status) {
          return console.log('No callback was set for ' + module + '.' + 'method');
        };
      }
      if (!module || !method) {
        new Error('viralheat.callAPI: Module and Method are required.');
        return;
      }
      if (_is('get', module, method)) {
        if (!params) {
          params = {};
        }
        params.api_key = api_key;
      } else {
        console.log('Method, ' + method + ', not supported.');
        new Error('Viralheat.callAPI: Method, ' + method + ', not supported.');
        return;
      }
      baseUrl = api_url;
      parsedParams = qs.stringify(params).replace(/\%2c/ig, ',');
      fullUrl = baseUrl + path.join(module, method) + '.json';
      if (_is('get', module, method) && typeof token === 'string') {
        return get(fullUrl + '?' + parsedParams + '&api_key=' + api_key, callback);
      } else {
                console.log('Method not supported.');
        new Error('Viralheat.callAPI: Method not supported.');;
      }
    };
    return {
      api_key: api_key,
      api_url: api_url,
      get: get,
      callApi: callApi
    };
  };
}).call(this);
