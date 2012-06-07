var beige = require('../lib/beige.js');

exports.index = function(req, res){

	beige.getTop10(function (err, docs) {
		console.log('hall of beige:', docs);
		console.log(docs[0].twitterName)

		res.render('hallofbeige', {
	    title: 'The Hall of Beige',
	    top10: docs
	  });
	});

};