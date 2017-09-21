app.controller('ActivitiesTabController', function() {
  console.log('h')
  Activity.findAll({}, { with: ['events'] }).then((activities) => {
    $scope.activities = activities
  })
})
