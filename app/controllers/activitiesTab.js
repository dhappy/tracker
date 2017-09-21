app.controller('ActivitiesTabController', function($scope, Activity) {
  Activity.findAll({}, { with: ['events'] }).then((activities) => {
    $scope.activities = activities
  })
})
