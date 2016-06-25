var express = require('express'),
	app = express().use(express.static(__dirname + '/public')),
	http = require('http').createServer(app),
	io = require('socket.io')(http);
	twitter = require('twitter');

	http.listen(3000, function(){
	console.log('============== listening on port 3000 ==============')
	
});

var twit = new twitter({
	consumer_key: 'your consumer key',
	consumer_secret: 'your consumer secret',
	access_token_key: 'you access token key',
	access_token_secret: 'your access token secret'
});

twit.stream('statuses/filter', { track: '#EURO2016'}, function(stream){
	console.log('====== connecting to twitter, please wait ^_^ ======')
	stream.on('data', function (data){
		console.log(data.user.screen_name + ':' + data.text);

		io.sockets.volatile.emit('tweet', {
			user: data.user.screen_name,
			text: data.text
		});
	});
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});