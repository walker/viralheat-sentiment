exports = module.exports = (api_key) ->
	
	######
	# Module dependencies
	######
	core = require('./core')(api_key)
	
	get = (text) ->
		core.callApi(
			'sentiment',
			'review',
			params,
			null,
			(err, data, status) ->
				if(status=='200')
					callback(null, data, 200)
				else
					callback({code:status, msg: err})
		)
	
	train = (text, mood) ->
		core.callApi(
			'sentiment',
			'train',
			params,
			null,
			(err, data, status) ->
				if(status=='200')
					callback(null, data, 200)
				else
					callback({code:status, msg: err})
		)
	
	quota = () ->
		core.callApi(
			'sentiment',
			'quota',
			params,
			null,
			(err, data, status) ->
				if(status=='200')
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
