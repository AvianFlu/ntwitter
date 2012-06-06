
/*
 * GET home page.
 */

var claim = require('./claim.js');
var vote = require('./vote.js');

exports.index = function(req, res){
  var params = { 
    title: 'Subtle Variations of Beige', 
    beiges: [
      {
        name: "Blanched Almonds",
        hex: "#ffebcd"
      },
      {
        name: "Coconut Cream Pie",
        hex: "#F1EFDA"
      }
    ]
  };

  res.render('index', params);
};

exports.postIndex = function (req, res) {

};

exports.vote = vote;
exports.claim = claim;