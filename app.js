
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', routes.index);
app.post('/', routes.postIndex);

app.get('/vote', routes.vote.index);
app.post('/vote', routes.vote.postVote);

app.get('/beiged', routes.vote.done);

app.get('/claim-a-beige', routes.claim.index);



app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
