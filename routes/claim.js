/* claim.js */
var claimdb = require('../db/claimdb.js');


exports.index = function (req, res) {

}

exports.claimBeige = function (req, res) {
	
}

exports.postClaimBeige = function (req, res) {
	var hex = '#F5F5DC'; //req.param.colorHex;
	var user_id = '1234567890';
	
	claimdb.claimBeige('#F5F5DC', user_id, function(err, hex) {
		console.log('Beige Claimed!!');
	});

}