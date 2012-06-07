/* votedb.js */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beige');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var voteSchema = new Schema({
	_id: String,
	hexColor: String,
	votedDateTime: Date,
	twitterId: String,
	sessionId: String,
	ipAddress: String,
	userid: Number
});

var voteModel = mongoose.model('votes', voteSchema);

exports.addVote = function (hexColor, userObj, callback) {

	var inst = new voteModel();
	inst.hexColor = hexColor;
	inst.votedDateTime = new Date();

	if(userObj.id !== undefined) { inst.userid = userObj.id;}
	if(userObj.twitterId !== undefined) { inst.twitterId = userObj.twitterId; }
	if(userObj.sessionId !== undefined) { inst.sessionId = userObj.sessionId; }

	inst.save (function (err) {
		if(err) {
			console.error('db error (votedb.js):', err);
			callback(err);
		}
		else {
			console.log('Votedb.js addVote: Voted');
			callback(null, true);
		}
	});

}

function voteCounter (hexColor) {
	
}

exports.topTwo = function (callback) {
	voteModel.find()
}