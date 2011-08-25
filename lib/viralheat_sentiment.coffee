exports = module.exports = (api_key) ->
	
	######
	# Module dependencies
	######
	core = require('./core')(api_key)
	
	get = (text, callback) ->
		params =
			text: text
		
		core.callApi(
			'sentiment',
			'review',
			params,
			(err, data, status) ->
				if(status==200)
					callback(null, data, 200)
				else
					callback({code:status, msg: err})
		)
	
	train = (text, mood, callback) ->
		params =
			text: text
			mood: mood
		
		core.callApi(
			'sentiment',
			'train',
			params,
			(err, data, status) ->
				if(status==200)
					callback(null, data, 200)
				else
					callback({code:status, msg: err})
		)
	
	quota = (callback) ->
		core.callApi(
			'sentiment',
			'quota',
			null,
			(err, data, status) ->
				if(status==200)
					callback(null, data, 200)
				else
					callback({code:status, msg: err})
		)

	return {
		api_key: api_key,
		train: train,
		get: get,
		quota: quota
	};
