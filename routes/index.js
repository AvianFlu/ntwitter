
/*
 * GET home page.
 */

var claimdb = require('../db/claimdb.js');

var claim = require('./claim.js');
var vote = require('./vote.js');
var hallOfBeige = require('./hallofbeige.js');
var beige = require('../lib/beige.js');
var beigeWatch = require('./beigewatch.js');

exports.index = function(req, res){

  var beiges = req.session.beiges || beige.getTwoRandom();
  req.session.beiges = beiges;

  var params = {
    title: 'Subtle Variations of Beige',
    beiges: beiges
  };

  res.render('index', params);
};

exports.postIndex = function (req, res) {

};

//Current for testing purposes only, could be integrated into an admin area if necessary.
exports.resetVotes = function (req, res) {
  claimdb.resetVotes(function(err) {
    res.render('reset', {
      title: 'RESET votes and appeared numbers'
    });
  });
};

exports.vote = vote;
exports.claim = claim;
exports.hallofbeige = hallOfBeige;
exports.beigewatch = beigeWatch;
