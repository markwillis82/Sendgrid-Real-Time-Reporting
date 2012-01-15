Highcharts.setOptions({
   global: {
      useUTC: false
   }
});
   
var chart;
var series;

var staticData = (function() {
            // generate an array of random data
            var data = [],
               time = (new Date()).getTime(),
               i;
            
            for (i = -19; i <= 0; i++) {
               data.push({
                  x: time + i * 1000,
                  y: Math.random()
               });
            }
            return data;
         })();

var trafficData = [];
var startTime = (new Date()).getTime();
startTime.setSeconds(0,0);

trafficData.push({x : startTime, y : 1});
console.log(trafficData);

$(document).ready(function() {
   chart = new Highcharts.Chart({
      chart: {
         renderTo: 'container',
         defaultSeriesType: 'spline',
         marginRight: 10,
         events: {
            load: function() {
   
               // set up the updating of the chart each second
               series = this.series[0];
               /*setInterval(function() {
                  var x = (new Date()).getTime(), // current time
                     y = Math.random()*10;
                  series.addPoint([x, y], true, true);
               }, 1000);*/
            }
         }
      },
      title: {
         text: 'Live random data'
      },
      xAxis: {
         type: 'datetime',
         tickPixelInterval: 150
      },
      yAxis: {
         title: {
            text: 'Value'
         },
         plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
         }]
      },
      tooltip: {
         formatter: function() {
                   return '<b>'+ this.series.name +'</b><br/>'+
               Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+Highcharts.numberFormat(this.y, 2);
         }
      },
      legend: {
         enabled: false
      },
      exporting: {
         enabled: false
      },
      series: [{
         name: 'Random data',
         data: trafficData
      }]
   });
   
   
});
