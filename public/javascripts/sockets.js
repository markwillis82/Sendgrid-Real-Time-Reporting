
var mainChartPointCount = [];

//var theStatus = {};

var socket = io.connect('http://localhost');
	socket.on('Add Processed', function (data) {
		var date = new Date();
		date.setSeconds(0,0);
		var x = date.getTime();

		var score = data;
		if(trafficData[x] ) {
			score += trafficData[x];
		}

		var scoreUpdated = false;
		trafficData.forEach(function(e) {
			console.log(e.x,x);
			if(e.x == x) {
				e.y = e.y + data;
				scoreUpdated = true;
			}
			console.log(e);
		});

		if(!scoreUpdated) {
			trafficData.push({x : x , y : 1});
		}

//		trafficData[x] = score;
console.log(x);
console.log(trafficData);

		series.setData(trafficData);

//		series.addPoint([x, score], true, true);
	});