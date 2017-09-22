app.controller('HomeController',
  function($scope, $mdDialog, $location, Activity, Term, Event, store, $transitions) {

  $transitions.onSuccess({},
    function(transition) {
      var $state = transition.router.stateService
      var currentTab = $state.$current.data.tabIndex
      console.log(currentTab)
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
      .then((activity) => { 
        Activity.findAll().then((activities) => {
          $scope.activities = activities
          $scope.$apply()
        })
      })
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
        Term.findAll().then((terms) => {
          $scope.terms = terms
        })
      })
      break
      case 2:
      break
    }
  }

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
    .then((activity) => {
      Activity.findAll().then((activities) => {
        $scope.activities = activities
      })
      Event.findAll({}, { with: ['activity', 'term'] }).then((events) => {
        $scope.events = events
        $scope.eventsByDay = groupByDay(events)
      })
    })
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
    .then((term) => {
      Term.findAll().then((terms) => {
        $scope.terms = terms
      })
      Event.findAll({}, { with: ['activity', 'term'] }).then((events) => {
        $scope.events = events
        $scope.eventsByDay = groupByDay(events)
      })
    })
  }

  $scope.labels = []

  for(var i = 0; i < 24; i++) {
    $scope.labels.push(i)
  }

  $scope.series = ['Series A', 'Series B']
  $scope.data = [
  [65, 59, 80, 81, 56, 55, 40],
  [28, 48, 40, 25, 86, 27, 90]
  ]
  $scope.datasetOverride = [
    { yAxisID: 'y-axis-1' },
    { yAxisID: 'y-axis-2' },
  ]
  $scope.options = {
    responsive: true, 
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom',
        ticks: {
          callback: function(value, index, values) {
            return `${value}:00`
          },
          autoSkip: true,
          maxTicksLimit: 24,
          stepSize: 1,
        },
        min: 0,
        max: 23,
      }],
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left',
          min: -100,
          max: 100,
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right',
          min: -100,
          max: 100,
        }
      ]
    }
  }

  this.activitySelected = function(activity) {
    var now = new Date().toISOString()
    activity.lastEvent = now
    var data = {
      activity: activity,
      time: now,
    }
    Event.create(data).then((event) => {
      event.save() // source_id not serialized
      Event.findAll({}, { with: ['activity', 'term'] }).then((events) => {
        $scope.events = events
        $scope.eventsByDay = groupByDay(events)
        $scope.selectedTab = 2
      })
    })
  }

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
    .then(function(value) {
      Event.findAll({}, { with: ['activity', 'term'] }).then((events) => {
        $scope.events = events
        $scope.eventsByDay = groupByDay(events)
        $scope.selectedTab = 2
      })
    },
    () => {}
    )
  }

  function groupByDay(events) {
    var byDay = events.reduce((ret, event) => {
      var day = moment(event.time).startOf('day').format()
      ;(ret[day] = ret[day] || []).push(event)
      return ret
    }, {})
    var out = []
    for(date in byDay) {
      out.push({
        display_text: date,
        events: byDay[date],
      })
    }
    return out
  }
})
