######
# Viralheat Profiles module
######

exports = module.exports = (api_key) ->
	######
	# Module dependencies
	######
	core = require('./core')(api_key)
	# libxmljs = require('libxmljs')