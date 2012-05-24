/* claim.js */
var claimdb = require('../db/claimdb.js');


exports.index = function (req, res) {

}

exports.claimBeige = function (req, res) {

}

exports.postClaimBeige = function (req, res) {
	//var hex = '#F5F5DC'; //req.param.colorHex;
	//var user_id = '1234567890';
	
	var hex = req.body.hex;

	if(req.session.userid !== undefined) {
		claimdb.claimBeige('#F5F5DC', user_id, function(err, hex) {
			if(err) {
				result(null, res);
			}
			console.log('Beige Claimed!!');
			result(true, res);

		});		
	}
	else {
		// Ask user to sign in to Twitter.
		result(true, res, 'notloggedin');
	}


}

function result (claimed, res, userStatus) {
	var body;
	var statusCode;

	//Probably could improve this, but need real page first.
	if(claimed) {
		if(userStatus === 'notloggedin') {
			body = {"claimed": 'notloggedin'};	
		}
		else {
			body = {"claimed": true};
		}
		
		statusCode = 200;
	}
	else {
		body = {"claimed": false};
		statusCode = 500;
	}

	res.writeHead(statusCode, {
		'Content-Type': 'text/json'
	});
	res.end(body);
}