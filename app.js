
/*
 * Module dependencies.
 */

var beige = require('./lib/beige.js');

//console.log(beige.getTwoRandom());
//console.log(beige.generate100Randoms());
//beige.importBeigesToDB();

var express = require('express')
  , routes = require('./routes')
  , gzippo = require('gzippo')
  , passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy
  , usersdb = require('./db/usersdb.js')
  , TWITTER_KEYS = require('./private.js')
  , io = require('socket.io').listen(3001)
  , twitter = require('./lib/twitter');

twitter.addSocketIO(io);

io.sockets.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
});


var TWITTER_CONSUMER_KEY = TWITTER_KEYS.TWITTER_CONSUMER_KEY;
var TWITTER_CONSUMER_SECRET = TWITTER_KEYS.TWITTER_CONSUMER_SECRET;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Twitter profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Twitter account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.set('view options', { layout: false });
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'greedy beige hogger' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(gzippo.staticGzip(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.dynamicHelpers({
  user: function (req, res) {
    return req.user || undefined;
  },
  current: function (req, res) {
    return req.url;
  },
  redir: function (req, res) {
    return req.session.redir || undefined;
  }
})

// Routes
// Index - {}
app.get('/', routes.index);
app.post('/', routes.postIndex);

//TESTING - reset votes and appeared numbers.
//app.get('/reset', routes.resetVotes);

app.get('/vote', routes.vote.index);
app.post('/vote', routes.vote.postVote);

app.get('/beiged', routes.vote.done);

app.get('/claim-a-beige', routes.claim.index);
app.post('/claim-a-beige', routes.claim.claimBeige);

app.get('/hall-of-beige', routes.hallofbeige.index);

app.get('/beigewatch', routes.beigewatch.index);

app.get('/auth/twitter',
  passport.authenticate('twitter'),
  function(req, res){}
);

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    req.session.user_id = req.user.id;
    res.redirect('/');
  }
);

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);