Support for the [Viralheat](http://www.viralheat.com/) API.

Sentiment analysis only (look for viralheat module for support for entire module & method set).

Reuire the module:

```
var sentiment = require('viralheat-sentiment')('[API Key Here]');
```

Make a sentiment request:

```
sentiment.get('[text you would like analyzed]', function(err, data, status) {
	if(err) {
		// Error
	} else {
		res.send(data);
	}
});
```

Data will look something like this:

```
{"prob":0.838018305485215,"mood":"positive","text":"[The text you had analyzed]"}
```

Train the sentiment analyzer:

```
sentiment.train('[text you would like analyzed]', [sentiment value like 0.43565432], function(err, data, status) {
	if(err) {
		// Error
	} else {
		res.send(data);
	}
});
```

Standard response from a train request:

```
{"status":"ok"}
```

Also, check your quota:

```
sentiment.quota(function(err, data, status) {
	if(err) {
		// Error
	} else {
		res.send(data.quota_remaining);
	}
});
```