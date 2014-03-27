var express = require('express'),
    http    = require('http'),
    https   = require('https');

var app = express();

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
});

app.configure('development', function(){
   	console.log('in the development configuration');
   	app.set('port', 8000);
   	app.use('/analytics',express.static(__dirname + '/public'));
   	app.use(express.errorHandler());
});

app.get('/analytics/v1', function(req, res){
  res.render('v1.html',{});
});

app.get('/analytics/v2', function(req, res){
  res.render('v2.html',{});
});

app.get('/analytics/v3', function(req, res){
  res.render('v3.html',{});
});

app.get('/analytics/v4', function(req, res){
  res.render('v4.html',{});
});

app.get('/analytics/v5', function(req, res){
  res.render('v5.html',{});
});

app.get('/analytics/v6', function(req, res){
  res.render('v6.html',{});
});

app.get('/analytics/v7', function(req, res){
  res.render('v7.html',{});
});

app.get('/analytics/drilldown', function(req, res){
  res.render('drilldown.html',{});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});