app.controller('MoodsTabController', function($scope, Term) {
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
        EventsUpdater.update().then(() => { $scope.selectedTab = 2 })
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
        TermUpdater.update()
        EventsUpdater.update()
      }
    )
  }
})
