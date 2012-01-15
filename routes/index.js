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

			// insert into processed table - and increment local table counts
			queryEngine.query().
			insert('eventLogProcessed',
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



		break;
		case "click":
			sqlTable = "eventLogClick";
		break;
		default:
	}

  res.send(req.body);
};