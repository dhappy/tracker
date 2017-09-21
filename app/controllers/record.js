app.controller('RecordController', function($scope, $mdDialog, $controller, term, Event) {
  $controller('DialogController', { $scope: $scope })

  $scope.weight = 0

  $scope.name = term.name

  this.returnNew = function() {
    var params = {
      term: term,
      weight: $scope.weight,
      time: new Date().toISOString()
    }
    Event.create(params).then((event) => {
      event.save()
      $mdDialog.hide(event)
    })
  }
})
