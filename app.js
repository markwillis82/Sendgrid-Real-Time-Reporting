/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var mysql = require('db-mysql');

var queryEngine;

new mysql.Database({
	hostname: 'localhost',
	user: '',
	password: '',
	database: ''
}).connect(function(error) {
	if (error) {
		return console.log('CONNECTION error: ' + error);
	}
	queryEngine = this;
	startServer();
});


var app = module.exports = express.createServer();

var io = require('socket.io').listen(app);

// Configuration
function startServer() {
	app.configure(function(){
		app.set('views', __dirname + '/views');
		app.set('view engine', 'jade');
		app.use(express.bodyParser());
		app.use(express.methodOverride());
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
	app.post('/events', function(req,res) {
		routes.events(req,res,queryEngine,io);
	});

	io.sockets.on('connection', function (socket) {
//		socket.emit('news', { hello: 'world' });
//		socket.on('my other event', function (data) {
//			console.log(data);
//		});
	});

	app.listen(3000);
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}