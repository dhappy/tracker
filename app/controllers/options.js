app.controller('OptionsController', function($scope, $controller, $mdDialog, elem, Event) {
  $controller('DialogController', { $scope: $scope })

  $scope.elem = elem
  $scope.name = elem.name

  this.edit = (elem) => {
    if(elem.type === 'activity') {
      $mdDialog.show({
        controller: 'SubstanceController as ctrl',
        templateUrl: 'app/views/activity.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: true, // Only for -xs, -sm breakpoints.
        locals: {
          activity: elem
        },
      })
    } else if(elem.type === 'term') {
      $mdDialog.show({
        controller: 'TermController as ctrl',
        templateUrl: 'app/views/term.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: true, // Only for -xs, -sm breakpoints.
        locals: {
          term: elem
        },
      })
    }
  }

  this.delete = (elem) => {
    elem.destroy()
    if(elem.type === 'activity') {
      Event.destroyAll({ where: { activity_id: { '==': elem.id } } }).then(() => {
        $mdDialog.hide()
      })
    } else if(elem.type === 'term') {
      Event.destroyAll({ where: { term_id: { '==': elem.id } } }).then(() => {
        $mdDialog.hide()
      })
    }
  }
})
