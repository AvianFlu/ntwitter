/* vote.js */

var votedb = require('../db/votedb.js');

exports.index = function (req, res) {
	res.writeHead(200, {
		'ContentType': 'text/json'
	});
	res.end('voted');
}

exports.postVote = function (req, res) {

	console.log('hex', req.body.hex);//.hex);

	var user = {
		id: req.session.userid
	}

	votedb.addVote(req.body.hex, user, function (err, voted) {
		if(err) {
			console.error('Error with Voting: ', err);
				res.writeHead(500, {
				'Content-Type': 'text/json'
			});
			res.end('{"voted": false}');
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

exports.done = function (req, res) {
	
}
