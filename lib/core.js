(function() {
  var http, i, path, qs, urlParser, _is;
  http = require('http');
  urlParser = require('url');
  path = require('path');
  qs = require('querystring');
  i = require('util').inspect;
  module.exports = function(token, url, ver) {
    var api_url, get, process_array;
    api_url = 'http://www.viralheat.com/api/';
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
    process_array = function(items, process) {
      var todo;
      todo = items.concat();
      return setTimeout(function() {
        process(todo.shift);
        if (todo.length > 0) {
          return setTimeout(arguments.callee, 25);
        }
      }, 25);
    };
    return {
      process_array: process_array,
      get: get,
      callApi: function(module, method, params, payload, callback, ver) {
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
          params = null;
        }
        baseUrl = api_url;
        parsedParams = qs.stringify(params).replace(/\%2c/ig, ',');
        switch (module) {
          case 'profiles':
          case 'statistics':
          case 'data':
            fullUrl = baseUrl + path.join(module, method);
            break;
          default:
            fullUrl = baseUrl + path.join(module, method) + '.json';
        }
        if (_is('get', module, method) && typeof token === 'string') {
          console.log('GET: ' + fullUrl + '?' + parsedParams);
          return get(fullUrl + '?' + parsedParams + '&api_key=' + api_key, callback);
        } else {
          return console.log('POST: ' + fullUrl + '?api_key=' + api_key, callback);
        }
      }
    };
  };
  _is = function(type, module, method) {
    if (type === 'get') {
      switch (module) {
        case 'profiles':
          switch (method) {
            case 'list_all':
            case 'details':
            case 'alerts':
              return true;
            default:
              return false;
          }
          break;
        case 'statistics':
        case 'data':
        case 'social_trends':
        case 'sentiment':
        case 'messaging':
          return true;
        default:
          return false;
      }
    } else if (type === 'post') {
      switch (module) {
        case 'profiles':
          switch (method) {
            case 'list_all':
            case 'details':
            case 'alerts':
              return false;
            default:
              return true;
          }
          break;
        default:
          return false;
      }
    }
  };
}).call(this);
