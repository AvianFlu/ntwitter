/* twitter.js */

var twitter = require('ntwitter');
var latestTweetdb = require('../db/latestTweetdb.js');
// var EventEmitter = require('events').EventEmitter;

var twit = new twitter({
	consumer_key: 'kgsXUQFZA2p5UPvBpPylVw',
	consumer_secret: 'gUkQJxYWZTxuZhPPDX7qb2id7vL7Uv9AkSgOPlido',
	access_token_key: '582157795-7u4ruepEyleIsKyXQjGWL6GAnBakRN3n4hXpyd2N',
	access_token_secret: 'SAvmvK23sIDxPmY2g5vST3gtpuXiL83JsXGGvM8'
});

var latestTweet = null;

//Gets the latest tweet
function getLatest (callback) {
	if(latestTweet) {
		callback(null, latestTweet);
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

//Simply sets the latest tweet to the database
function setLatest (tweet, callback) {
	latestTweetdb.setLatest(tweet);
}

exports.getLatest = getLatest;

//adds Socket.io support
exports.addSocketIO = function (io) {
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

exports.sendTweet = function (tweet, callback) {
	twit.updateStatus(tweet, function (err, data) {
		console.log('sendTweet:', err, data);
	})
}