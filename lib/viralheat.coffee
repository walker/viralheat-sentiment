exports = module.exports = (api_key) ->
	
	return {
		api_key: api_key,
		sentiment: require('./sentiment')(api_key),
		# social_trends: require('./social_trends')(api_key),
		# profiles: require('./profiles')(api_key),
		# statistics: require('./statistics')(api_key),
		# data: require('./data')(api_key),
	};
