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

	console.log('hex', req.body.hex);//.hex);

	var user = {
		twitterId: req.session.user_id
	}

	votedb.addVote(req.body.hex, user, function (err, voted) {
		if(err) {
			voteFailed(res);
		}
		else {
			claimdb.addVote(req.body.hex, function (err) {
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

	req.session.beiges = undefined;

}

function voteFailed (res) {
	console.error('Error with Voting: ', err);
		res.writeHead(500, {
		'Content-Type': 'text/json'
	});
	res.end('{"voted": false}');
}

exports.done = function (req, res) {
	
}
