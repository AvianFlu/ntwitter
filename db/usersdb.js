/* votedb.js */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beige');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var usersSchema = new Schema({
	_id: String,
	twitterID: Number,
	twitterName: String,
	twitterDisplay: String,
	firstLoginDtm: Date,
	lastLoginDtm: Date,
	loginCount: Number
});

var usersModel = mongoose.model('users', usersSchema);

exports.getTwitterName = function (twitterID, i, callback) {
	usersModel.find({ twitterID: twitterID}, function (err, doc) {
		console.log('getTwitterName:',doc, doc[0].twitterName);
		doc.i = i;
		callback(err, doc);
	});
}

exports.userLogin = function (twitterObj, callback) {

	_accountExists(twitterObj, function(err, exists) {
		if(err) { callback(err);}
		else {

			if(exists === false) { 

				var currentDtm = new Date();

				var inst = new usersModel();
				inst.twitterID = twitterObj.id;
				inst.twitterName = twitterObj.name;
				inst.twitterDisplay = twitterObj.display;
				inst.lastLoginDtm = currentDtm;
				inst.firstLoginDtm = currentDtm;
				inst.loginCount = 1;

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
			else { //Does exist


				var condition = {twitterID: twitterObj.id}
				, 	update = {lastLoginDtm: new Date(), $inc: {loginCount: 1}}
				, 	options = {multi: false};

				usersModel.update(condition, update, options, function (err, numberAffected) {
					if(err) {
						callback(err);
					}
					else {
						callback(null, true);//, {'Number Affected ': numberAffected});
					}
				});

			}
		}
	})
}

function _accountExists (twitterObj, callback) {

	usersModel.find({twitterID: twitterObj.id}, function (err, doc) {
		if(err) { 
			console.error('Find user (mongodb) err:', err);
			callback(err);
		}
		else {
			console.log('doc', doc);
			if(doc.length === 0) {
				callback(null, false);
			}
			else{
				callback(null, true);	
			}
			
		}
	});

}