/* votedb.js */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beige');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var claimSchema = new Schema({
	_id: String,
	hexColour: String,
	twitterId: String
});

var claimModel = mongoose.model('claims', claimSchema);

exports.claimBeige = function (hexColour, twitterid, callback) {
	var inst = new claimModel();
	inst.hexColour = hexColour;
	inst.twitterid = twitterid;

	inst.save (function(err) {
		if(err) {
			console.error('db error (claimdb.js):', err);
			callback(err);
		}
		else {
			console.log('Beige Claimed: ', hexColour);
			callback(null, hexColour);
		}
	});
}


/*exports.cl = function (hexColor, userObj, callback) {

	var inst = new voteModel();
	inst.hexColor = hexColor;
	inst.votedDateTime = new Date();

	if(userObj.twitterAccount !== undefined) { inst.twitterAccount = userObj.twitterAccount; }
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

}*/

function voteCouter = function(hexColor) {
	
}

exports.topTwo = function (callback) {
	voteModel.find()
}