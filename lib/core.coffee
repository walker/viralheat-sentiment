######
# Core API functionality for all modules
######

######
# Module dependencies
######
http = require('http')
urlParser = require('url')
path = require('path')
qs = require('querystring')
i = require('util').inspect

module.exports = (api_key) ->
	api_url = 'http://www.viralheat.com/api/'
	
	_is = (type, module, method) ->
		if(type=='get')
			switch module
				when 'sentiment'
					return true
				else
					return false
	
	######
	# Standard get
	#
	# @param {String} url API URL for the endpoint you are calling + params
	######
	get = (url, callback) ->
		parsedUrl = urlParser.parse(url, true)
		result = ""
		
		if (parsedUrl.query == undefined)
			parsedUrl.query = {}
		
		pathstr = parsedUrl.pathname + "?" + qs.stringify(parsedUrl.query)
		
		request = http.request({
				"host" : parsedUrl.hostname,
				"port" : parsedUrl.port,
				"path" : pathstr,
				"method" : "GET",
				"headers" : {
					"Content-Length": 0
				}
			},
			(res) ->
				res.on("data", (chunk) ->
					result += chunk
				)
				res.on("end", () ->
					result = result
					# console.log(result)
					callback(null, result, res.statusCode)
				)
		)
		
		request.on("error", (err) ->
			callback(err)
		)
		
		request.end()
	
	######
	# Call API
	#
	# @param {String} module The Viralheat API module
	# @param {String} method Module method
	# @param {Object} parameters Parameters to pass to the method
	# @param {Function} callback Callback to handle Viralheat response
	# @return {Object} Viralheat response
	######
	callApi = (module, method, params, callback) ->
		if(typeof callback isnt 'function')
			callback = (err, data, status) ->
				console.log('No callback was set for '+module+'.'+'method')
		if (!module || !method)
			new Error('viralheat.callAPI: Module and Method are required.')
			return
			
		if(_is('get', module, method))
			if !params
				params =  {}
			params.api_key = api_key
		else
			console.log('Method, '+method+', not supported.')
			new Error('Viralheat.callAPI: Method, '+method+', not supported.')
			return
		
		baseUrl = api_url
		parsedParams = qs.stringify(params).replace(/\%2c/ig, ',')
		fullUrl = baseUrl + path.join(module, method) + '.json'
		
		if(_is('get', module, method) && typeof token == 'string')
			# console.log('GET: ' + fullUrl + '?' + parsedParams)
			get(fullUrl + '?' + parsedParams + '&api_key=' + api_key, callback)
		else
			console.log('Method not supported.')
			new Error('Viralheat.callAPI: Method not supported.')
			return

	######
	# Expose public
	######
	return {
		api_key: api_key,
		api_url: api_url,
		get: get,
		callApi: callApi
	}