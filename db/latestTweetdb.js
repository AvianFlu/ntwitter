/* latestTweetdb.js */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beige');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var tweetSchema = new Schema({
	_id: String,
	name: String,
	text: String,
	profile_pic: String 
});

var tweetModel = mongoose.model('latestTweets', tweetSchema);

exports.setLatest = function (latestTweet) {
	tweetModel.update({},
	{
		name: latestTweet.name, 
		text: latestTweet.text, 
		profile_pic: latestTweet.profile_pic
	},
	{
		upsert: true
	}, 
	function (err) {
		console.error(err);
	});
}

exports.getLatest = function (callback) {
	tweetModel.find({}, function (err, doc) {
		callback(err, doc);
	});
}

exports.testLatestdb = function () {
	var latestTweet = {
		name: 'MRdNk',
		text: 'TEST2',
		profile_pic: 'https://twimg0-a.akamaihd.net/profile_images/1999398423/angusapps_logo_transparant_small_normal.png'
	}
	exports.setLatest(latestTweet)
}