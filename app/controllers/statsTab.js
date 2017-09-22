app.controller('StatsTabController', function($scope) {
  $scope.labels = []

  for(var i = 0; i < 24; i++) {
    $scope.labels.push(i)
  }

  $scope.series = ['Series A', 'Series B']
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 25, 86, 27, 90]
  ]
  $scope.datasetOverride = [
    { yAxisID: 'y-axis-1' },
    { yAxisID: 'y-axis-2' },
  ]
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
        },
        min: 0,
        max: 23,
      }],
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left',
          min: -100,
          max: 100,
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right',
          min: -100,
          max: 100,
        }
      ]
    }
  }
})
