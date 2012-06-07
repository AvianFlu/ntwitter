var claimdb = require('../db/claimdb.js');

exports.index = function(req, res){

	claimdb.getTop10(function (err, docs) {
		res.render('hallofbeige', {
	    title: 'The Hall of Beige',
	    top10: docs
	  });
	});

};