/* claim.js */
var claimdb = require('../db/claimdb.js');


exports.index = function (req, res) {

	var beige = {
		name: ''
	}

	res.render('claim', {
		title: 'Claim-a-beige',
		beige: beige
	});
}

exports.claimBeige = function (req, res) {
	var hex = req.body.hex;
	var name = req.body.name;
	
	if(req.session.user_id !== undefined) {
		claimdb.claimBeige(hex, name, req.session.user_id, function(err, hex) {
			if(err) {
				result(null, res);
			}
			console.log('Beige Claimed!!');
			//result(true, res);
			res.render('claimed', {
				title: 'claimed'
			})

		});		
	}
	else {

		// Ask user to sign in to Twitter.
		//result(true, res, 'notloggedin');
		res.render('notbeige',{
			title: 'notbeige'
		})
	}

}

exports.serviceClaimBeige = function (req, res) {
	//var hex = '#F5F5DC'; //req.param.colorHex;
	//var user_id = '1234567890';
	
	var hex = req.body.hex;
	console.log(hex);
	
	try {

		if(req.session.userid !== undefined) {
			claimdb.claimBeige(hex, req.session.user_id, function(err, hex) {
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
	catch(e) {
		console.error(e);
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