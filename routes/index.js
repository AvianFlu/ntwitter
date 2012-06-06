
/*
 * GET home page.
 */

var claim = require('./claim.js');
var vote = require('./vote.js');
var hallOfBeige = require('./hallofbeige.js');
var beige = require('../lib/beige.js');
var beigeWatch = require('./beigewatch.js');

exports.index = function(req, res){

  var beiges = beige.getTwoRandom();



  var params = {
    title: 'Subtle Variations of Beige',
    beiges: beiges/*: [
      {
        name: "Blanched Almonds",
        hex: "#ffebcd"
      },
      {
        name: "Coconut Cream Pie",
        hex: "#F1EFDA"
      }
    ]*/
  };

  res.render('index', params);
};

exports.postIndex = function (req, res) {

};

exports.vote = vote;
exports.claim = claim;
exports.hallofbeige = hallOfBeige;
exports.beigewatch = beigeWatch;
