app.controller('DialogController', function($scope, $mdDialog) {
  $scope.hide = () => { $mdDialog.hide() }
  $scope.cancel = () => { $mdDialog.cancel() }
})
