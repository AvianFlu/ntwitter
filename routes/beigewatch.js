var request = require('../node_modules/request/'),
    url = 'http://search.twitter.com/search.json?q=',
    username = 'bristolwebfolk';

exports.index = function (req, res) {
  request.get({json: true, url: url + '@' + username}, function (error, response, body) {
    if (!error && response.statusCode == 200) {

        var results = body.results,
            len = results.length,
            i;

        if (len) {
          for (i = 0; i < len; i += 1) {
            /*
            if (results[i].text.match(/^RT /)) {
              results.splice(i, 1);
              len -= len;
              i -= 1;
              continue;
            }*/

            if (results[i].text.match(/https?:\/\//)) {
              results[i].text = results[i].text.replace(/(https?:\/\/[^\s]+)/gi, '<a href="$1">$1</a>');
              console.log(results[i].text);
            }
          }
        }

        res.render('beigewatch', {
          title: 'Beige Watch',
          tweets: body.results
        });
      }
    });
};