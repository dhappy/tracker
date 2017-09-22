app.controller('EventsTabController', function($scope, Event) {
  Event.findAll({}, { with: ['activity', 'term'] }).then((events) => {
    $scope.events = events
    $scope.eventsByDay = groupByDay(events)
  })
})
