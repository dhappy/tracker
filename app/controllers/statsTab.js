app.controller('StatsTabController', function($scope, EventsUpdater) {
  //$scope.labels = []

  // for(var i = 0; i < 24; i++) {
  //   $scope.labels.push(i)
  // }

  function rand(min, max) {
    var seed = 5000
    min = min === undefined ? 0 : min;
    max = max === undefined ? 1 : max;
    this._seed = (seed * 9301 + 49297) % 233280;
    return min + (this._seed / 233280) * (max - min);
  }

  window.randomScalingFactor = function() {
    return Math.round(rand(-100, 100));
  }

  function timeToDecimal(time) {
    var time = new Date(time)
    var decimal = time.getHours()
    decimal += time.getMinutes() / 60
    return decimal
  }

  $scope.graphs = []

  EventsUpdater.update().then(
    (events) => {
      for(day in events.byDay) {
        var day = events.byDay[day]
        var records = {}
        for(event in day.events) {
          var event = day.events[event]
          var source = event.source
          if(source.type == 'activity') {
            records[source.name] = records[source.name] || []
            records[source.name].push(
              { x: timeToDecimal(event.time), y: 0 }
            )
          } else if(source.type == 'term') {

          } else {
            console.error(`Unknown event type: ${source.type}`, event)
          }
        }
        var series = []
        var data = []
               
        for(type in records) {
          series.push(type)
          data.push(records[type])
        }

        $scope.graphs.push(
          {
            display_text: day.display_text,
            series: series,
            data: data,
          }
        )
        console.log($scope.graphs)
      }
    },
    () => {}
  )

  $scope.options = {
    responsive: true, 
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom',
        ticks: {
          callback: function(value, index, values) {
            return `${value}:00`
          },
          autoSkip: true,
          maxTicksLimit: 24,
          stepSize: 1,
          min: 0,
          max: 23,
        },
      }],
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left',
        }
      ]
    }
  }
})
