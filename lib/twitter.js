/* twitter.js */

var twitter = require('ntwitter');
var latestTweetdb = require('../db/latestTweetdb.js');
// var EventEmitter = require('events').EventEmitter;

var twit = new twitter({
	consumer_key: 'kgsXUQFZA2p5UPvBpPylVw',
	consumer_secret: 'gUkQJxYWZTxuZhPPDX7qb2id7vL7Uv9AkSgOPlido',
	access_token_key: '582157795-IMJmWpv4tqPi4gBljaa1R6kHU72Z7uszuDwLtwJV',
	access_token_secret: 'oE4betNg1e5eUeOPFAIPTn9NwRtkIMnaZaDyXvC3Y'
});

var latestTweet = null;

function getLatest (callback) {
	if(latestTweet) {
		callback(null, latestTweet);
		//return latestTweet;
	}
	else {
		latestTweetdb.getLatest( function (err, doc) {
			console.log('latestTweetdb.getLatest',err, doc);
			latestTweet = {
				text: doc[0].text,
				name: doc[0].name,
				profile_pic: doc[0].profile_pic
			}
			callback(err, latestTweet);
		})

	}
}

function setLatest (tweet, callback) {
	latestTweetdb.setLatest(tweet);
}

exports.getLatest = getLatest;

exports.addSocketIO = function (io) {
	//console.log(io.sockets);

	io.sockets.on('connection', function (socket) {
		console.log('socket connection:', socket);
		if(latestTweet) {
			io.sockets.emit('latestTweet', latestTweet);
		}
		else {
			latestTweetdb.getLatest(function (err, doc) {
				latestTweet = {
					text: doc[0].text,
					name: doc[0].name,
					profile_pic: doc[0].profile_pic
				}
				io.sockets.emit('latestTweet', latestTweet);
			});
		}
	});

	twit.stream('user', {track: 'beigewatch'}, function (stream) {
			
		stream.on('data', function (data) {
			
			if(data.text) {
				
				latestTweet = {
					text: data.text,
					name: data.user.name,
					profile_pic: data.user.profile_image_url_https
				}

				setLatest(latestTweet);
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