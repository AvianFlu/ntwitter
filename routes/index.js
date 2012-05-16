
/*
 * GET home page.
 */

var claim = require('./claim.js');
var vote = require('./vote.js');


exports.index = function(req, res){
  res.render('index', { 
  	title: 'Shades of Beige', 
  	hex1: '#', 
  	hex2: '#' 
  });
};

exports.postIndex = function (req, res) {

};

exports.vote = vote;
exports.claim = claim;