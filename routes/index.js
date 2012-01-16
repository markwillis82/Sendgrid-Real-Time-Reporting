var crypto = require('crypto');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.events = function(req, res,queryEngine,io){
	var email = crypto.createHash('md5').update(req.body.email).digest("hex");
	var category = crypto.createHash('md5').update(req.body.category).digest("hex");

	switch(req.body.event) {
		case "processed":
			processAction("eventLogProcessed", queryEngine, email, category, io);
		break;
		case "dropped":
			processAction("eventLogDropped", queryEngine, email, category, io);
		break;
		case "delivered":
			processAction("eventLogDelivered", queryEngine, email, category, io);
		break;
		case "deferred":
			processAction("eventLogDeferred", queryEngine, email, category, io);
		break;
		case "bounce":
			processAction("eventLogBounce", queryEngine, email, category, io);
		break;
		case "open":
			processAction("eventLogOpen", queryEngine, email, category, io);
		break;
		case "spamreport":
			processAction("eventLogSpam", queryEngine, email, category, io);
		break;
		case "unsubscribe":
			processAction("eventLogUnsubscribe", queryEngine, email, category, io);
		break;
		default:
	}

  res.send(req.body);
};


var processAction = function(tbl,queryEngine,email,category, io) {
	// insert into processed table - and increment local table counts
	queryEngine.query().
	insert(tbl,
	['email','category'],
	[email, category]).
	execute(function(error, result) {
		if (error) {
				console.log('ERROR: ' + error);
				return;
		}
		console.log('GENERATED id: ' + result.id);
		io.sockets.emit("Add Processed", 2);
	});
};
