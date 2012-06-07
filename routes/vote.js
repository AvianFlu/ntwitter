/* vote.js */

var votedb = require('../db/votedb.js');
var claimdb = require('../db/claimdb.js');

exports.index = function (req, res) {
	res.writeHead(200, {
		'ContentType': 'text/json'
	});
	res.end('voted');
}

exports.postVote = function (req, res) {

	var winHex = req.body.hex;
	var loseHex = undefined;

	if(winHex === req.session.beiges[0].hex) {
		winHex = winHex;
		loseHex = req.session.beiges[1].hex;
		console.log('win:', winHex, ' loseHex:', loseHex);
	}
	else if (winHex === req.session.beiges[1].hex) {
		winHex = winHex;
		loseHex = req.session.beiges[0].hex;
		console.log('win:', winHex, ' loseHex:', loseHex);
	}
	else
	{
		//voteFailed(res);
		voteInvalid(res);
	}

	console.log('hex', req.body.hex);//.hex);

	var user = {
		twitterId: req.session.user_id
	}

	if(winHex && loseHex) {
		votedb.addVote(winHex, loseHex, user, function (err, voted) {
			if(err) {
				voteFailed(res);
			}
			else {
				claimdb.addVote(winHex, function (err) {
					if (err) { 
						console.log(err);
						voteFailed(res);
					}
					else {
						console.log('Vote success');
						res.writeHead(200, {
							'Content-Type': 'text/json'
						});
						res.end('{"voted": true}');					
					}
				})
			}
		});
	}

	req.session.beiges = undefined;

}

function voteFailed (res) {
	console.error('Error with Voting: ', err);
		res.writeHead(500, {
		'Content-Type': 'text/json'
	});
	res.end('{"voted": false}');
}

function voteInvalid (res) {
	console.log('Attempted to vote for a non options');
	res.writeHead(200, {
		'Content-Type': 'text/json'
	});
	res.end('{"voted": false}');
}

exports.done = function (req, res) {
	
}
