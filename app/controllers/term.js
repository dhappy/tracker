app.controller('TermController', function($scope, $controller, $mdDialog, Term, term) {
  $controller('DialogController', { $scope: $scope })

  if(term) {
    $scope.name = term.name
    $scope.color = term.color
    $scope.term = term
    $scope.function = 'Save'
  } else {
    $scope.function = 'Create'
  }

  this.processReturn = function(term) {
    if(term) {
      term.name = $scope.name
      term.color = $scope.color
      term.save()
      $mdDialog.hide(term)
    } else {
      if($scope.name) {
        Term.create({ name: $scope.name, color: $scope.color }).then(
          (term) => { $mdDialog.hide(term) },
          () => {}
        )
      }
    }
  }
})
