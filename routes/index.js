
/*
 * GET home page.
 */

var claim = require('/claim.js');
var vote = require('/vote.js');


exports.index = function(req, res){
  res.render('index', { title: 'Shades of Beige' })
};

exports.postIndex = function (req, res) {

};