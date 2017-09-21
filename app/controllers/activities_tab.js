app.controller('ActivitiesTabController', function(Activity) {
  console.log('h')
  Activity.findAll({}, { with: ['events'] }).then((activities) => {
    $scope.activities = activities
  })
})
