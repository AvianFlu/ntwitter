/* twitter.js */

var twitter = require('ntwitter');
// var EventEmitter = require('events').EventEmitter;

var twit = new twitter({
	consumer_key: 'kgsXUQFZA2p5UPvBpPylVw',
	consumer_secret: 'gUkQJxYWZTxuZhPPDX7qb2id7vL7Uv9AkSgOPlido',
	access_token_key: '582157795-IMJmWpv4tqPi4gBljaa1R6kHU72Z7uszuDwLtwJV',
	access_token_secret: 'oE4betNg1e5eUeOPFAIPTn9NwRtkIMnaZaDyXvC3Y'
});

var latestTweet = null;

exports.addSocketIO = function (io) {
	//console.log(io.sockets);

	io.sockets.on('connection', function (socket) {
		console.log('socket connection:', socket);
		if(latestTweet) {
			io.sockets.emit('latestTweet', latestTweet);
		}
	});

	twit.stream('user', {track: 'beigewatch'}, function (stream) {
			
		stream.on('data', function (data) {
			// console.log('data',data);
			// console.log('io',io);
			
			if(data.text) {
				
				latestTweet = {
					text: data.text,
					name: data.user.name,
					profile_pic: data.user.profile_image_url_https
				}

				io.sockets.emit('latestTweet', latestTweet);
			}
		});

		stream.on('end', function (res) {
			console.log('disconnect:',res);
		});
		stream.on('destroy', function (res) {
			console.log('silent disconnect:', res);
		});

	});

}