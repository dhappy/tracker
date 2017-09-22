app.controller('HomeController',
  function($scope, $mdDialog, ActivitiesUpdater, TermsUpdater, $transitions) {
    $transitions.onSuccess({},
      function(transition) {
        var $state = transition.router.stateService
        var currentTab = $state.$current.data.tabIndex
        $scope.selectedTab = currentTab
      }
    )

    this.conditionalAdd = function(event) {
      switch($scope.selectedTab) {
        case 0:
        $mdDialog.show({
          controller: 'SubstanceController as ctrl',
          templateUrl: 'app/views/activity.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: true,
          fullscreen: true, // Only for -xs, -sm breakpoints.
          locals: {
            activity: undefined
          },
        })
        .then(
          (activity) => { 
            ActivitiesUpdater.update()
            console.log(ActivitiesUpdater)
          },
          () => {}
        )
        break
        case 1:
        $mdDialog.show({
          controller: 'TermController as ctrl',
          templateUrl: 'app/views/term.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: true,
          fullscreen: true,
          locals: {
            term: undefined
          },
        })
        .then((term) => {
          TermsUpdater.update()
        })
        break
        case 2:
        break
      }
    }
  }
)
