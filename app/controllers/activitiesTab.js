app.controller('ActivitiesTabController',
  function($scope, Event, EventsUpdater, ActivitiesUpdater, $mdDialog, $location) {
    $scope.updater = ActivitiesUpdater

    this.activityOptions = function(activity) {
      $mdDialog.show({
        controller: 'OptionsController as ctrl',
        templateUrl: 'app/views/options.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: true,
        locals: {
          elem: activity
        }
      })
      .then(
        (activity) => { ActivitiesUpdater.update() },
        () => {}
      )
    }

    this.activitySelected = function(activity) {
      var now = new Date().toISOString()
      activity.lastEvent = now
      var data = {
        activity: activity,
        time: now,
      }
      console.log(data)
      Event.create(data).then(
        (event) => {
          event.save() // source_id not serialized
          EventsUpdater.update().then(
            () => { $location.url('/events') },
            () => {}
          )
        }
      )
    }
  }
)
