angular.module('eventTypes', ['ngMaterial', 'chart.js', 'ui.router', 'timer', 'pr.longpress', 'mp.colorPicker'])
.controller('ActivitiesTabController', function() {
  console.log('h')
  Activity.findAll({}, { with: ['events'] }).then((activities) => {
    $scope.activities = activities
  })
})
