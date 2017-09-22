app.controller('MoodsTabController',
  function($scope, TermsUpdater, EventsUpdater, $mdDialog, $location) {
    $scope.updater = TermsUpdater

    this.moodSelected = function(term) {
      $mdDialog.show({
        controller: 'RecordController as ctrl',
        templateUrl: 'app/views/recordMood.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: true,
        locals: {
          term: term
        }
      })
      .then(
        (value) => {
          EventsUpdater.update().then(
            () => { $location.url('/events') },
            () => {}
          )
        },
        () => {}
      )
    }

    this.termOptions = function(term) {
      $mdDialog.show({
        controller: 'OptionsController as ctrl',
        templateUrl: 'app/views/options.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: true,
        locals: {
          elem: term,
        },
      })
      .then(
        (term) => {
          TermsUpdater.update()
          EventsUpdater.update()
        },
        () => {}
      )
    }
  }
)
