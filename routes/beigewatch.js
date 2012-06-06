var request = require('../node_modules/request/'),
    url = 'http://search.twitter.com/search.json?q=',
    username = 'beigewatch';

exports.index = function (req, res) {
  request.get({json: true, url: url + '@' + username}, function (error, response, body) {
    if (!error && response.statusCode == 200) {

        console.log(body.results);

        res.render('beigewatch', {
          title: 'Beige Watch',
          tweets: body.results
        });
      }
    });
};