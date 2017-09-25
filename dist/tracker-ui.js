/*! tracker-ui 2017-09-24 */
var app =
angular.module('eventTypes', ['ngMaterial', 'chart.js', 'ui.router', 'timer', 'pr.longpress', 'mp.colorPicker'])
.config(['$stateProvider', '$urlRouterProvider',   
  ($stateProvider, $urlRouterProvider) => {
    $stateProvider
    .state('activities', {
      url: "/activities",
      templateUrl: "app/views/activitiesTab.html",
      data: { tabIndex: 0 },
      controller: 'ActivitiesTabController as ctrl',
    })
    .state('moods', {
      url: "/moods",
      templateUrl: "app/views/moodsTab.html",
      data: { tabIndex: 1 },
      controller: 'MoodsTabController as ctrl',
    })
    .state('events', {
      url: "/events",
      templateUrl: "app/views/eventsTab.html",
      data: { tabIndex: 2 },
      controller: 'EventsTabController as ctrl',
    })
    .state('goals', {
      url: "/goals",
      templateUrl: "app/views/goalsTab.html",
      data: { tabIndex: 3 },
      controller: 'GoalsTabController as ctrl',
    })
    .state('stats', {
      url: "/stats",
      templateUrl: "app/views/statsTab.html",
      data: { tabIndex: 4 },
      controller: 'StatsTabController as ctrl',
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'settings.html',
      controller: 'SettingsController as ctrl',
    })
    $urlRouterProvider.otherwise('activitiesTab')
  }
])
;app.controller('ActivitiesTabController',
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
;app.controller('DialogController', function($scope, $mdDialog) {
  $scope.hide = () => { $mdDialog.hide() }
  $scope.cancel = () => { $mdDialog.cancel() }
})
;app.controller('EventsTabController', function($scope, EventsUpdater) {
  $scope.updater = EventsUpdater
})
;app.controller('GoalsTabController', function($scope) {
})
;app.controller('HomeController',
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
            ActivitiesUpdater.update().then(
              () => $scope.$apply(),
              () => {}
            )
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
          TermsUpdater.update().then(
            () => $scope.$apply(),
            () => {}
          )
        })
        break
        case 2:
        break
      }
    }
  }
)
;app.controller('MoodsTabController',
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
;app.controller('OptionsController', function($scope, $controller, $mdDialog, elem, Event) {
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
;app.controller('RecordController', function($scope, $mdDialog, $controller, term, Event) {
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
;app.controller('SettingsController', function($scope) {
})
;app.controller('StatsTabController', function($scope, EventsUpdater) {
  //$scope.labels = []

  // for(var i = 0; i < 24; i++) {
  //   $scope.labels.push(i)
  // }

  function rand(min, max) {
    var seed = 5000
    min = min === undefined ? 0 : min;
    max = max === undefined ? 1 : max;
    this._seed = (seed * 9301 + 49297) % 233280;
    return min + (this._seed / 233280) * (max - min);
  }

  window.randomScalingFactor = function() {
    return Math.round(rand(-100, 100));
  }

  function timeToDecimal(time) {
    var time = new Date(time)
    var decimal = time.getHours()
    decimal += time.getMinutes() / 60
    return decimal
  }

  $scope.series = []
  $scope.data = []

  EventsUpdater.update().then(
    (events) => {
      for(day in events.byDay) {
        var day = events.byDay[day]
        var data = {}
        for(event in day.events) {
          var event = day.events[event]
          var source = event.source
          if(source.type == 'activity') {
            data[source.name] = data[source.name] || []
            console.log(data[source.name])
            data[source.name].push(
              { x: timeToDecimal(event.time), y: 0 }
            )
          } else if(source.type == 'term') {

          } else {
            console.error(`Unknown event type: ${source.type}`, event)
          }
        }
        console.log(data)
        for(type in data) {
          $scope.series.push(type)
          $scope.data.push(data[type])
        }
      }
    },
    () => {}
  )

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
          min: 0,
          max: 23,
        },
      }],
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left',
        }
      ]
    }
  }
})
;app.controller('SubstanceController', function($scope, $controller, store, Activity, $mdDialog, $http, activity) {
  $controller('DialogController', { $scope: $scope })

  if(activity) {
    $scope.name = activity.name
    $scope.color = activity.color
    $scope.activity = activity
    $scope.function = 'Save'
  } else {
    $scope.function = 'Create'
  }

  this.querySearch = function(text) {
    return new Promise(function(resolve, reject) {
      var query =
      'SELECT DISTINCT'
      + ' ?item ?name (REPLACE(STR(?item),".*Q","Q") AS ?qid)'
      + ' WHERE {'
      + '  ?item wdt:P31/wdt:P279* wd:Q8386.'
      + '  ?item rdfs:label ?name.'
      + '  FILTER(LANG(?name) = "en")'
      + `  FILTER(STRSTARTS(lcase(?name), lcase("${text}")))`  
      + '} LIMIT 15'
      var url = `https://query.wikidata.org/sparql?query=${query}`
      $http.get(url).then(function(result) {
        resolve(result.data.results.bindings)
      },
      function() {
        reject()
      })
    })
  }

  this.processReturn = function(activity) {
    if(activity) {
      activity.name = $scope.name
      activity.color = $scope.color
      activity.save()
      $mdDialog.hide(activity)
    } else {
      if($scope.name) {
        var data = {
          name: $scope.name,
          color: $scope.color,
        }

        if($scope.substance) {
          data['qid'] = $scope.substance.qid.value
        }

        Activity.create(data).then(
          (activity) => {
            $mdDialog.hide(activity)
          },
          () => { console.warn('Failed to save activity') }
        )
      }
    }
  }
})
;app.controller('TermController', function($scope, $controller, $mdDialog, Term, term) {
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
;app.factory('ActivitiesUpdater', function(Activity, Event) {
  function ActivitiesUpdater() {
    var self = this

    self.update = () => {
      return new Promise((resolve, reject) => {
        Activity.findAll({}, { with: ['events'] }).then(
          (activities) => {
            self.activities = activities
            resolve(activities)
          },
          () => { reject() }
        )
      })
    }
    self.update()
  }

  return new ActivitiesUpdater()
});app.factory('EventsUpdater', function(Event) {
  function EventsUpdater() {
    var self = this

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

    self.update = () => new Promise(
      (resolve, reject) => {
        Event.findAll({}, { with: ['activity', 'term'] }).then(
          (events) => {
            events.byDay = groupByDay(events)
            self.events = events
            resolve(events)
          },
          () => { reject() }
        )
      }
    )
    self.update()
  }

  return new EventsUpdater()
});app.factory('TermsUpdater', function(Term) {
  function TermsUpdater() {
    var self = this

    self.update = () => {
      return new Promise((resolve, reject) => {
        return Term.findAll().then(
          (terms) => {
            self.terms = terms
            resolve(terms)
          },
          () => {}
        )
      })
    }
    self.update()
  }

  return new TermsUpdater()
});app.service('Activity', function(store) {
  return store.defineMapper('activity', {
    schema: {
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        color: { type: 'string' },
        type: {
          type: 'string',
          get() { return 'activity' },
        },
        lastEvent: {
          type: 'string',
          get() {
            if(this.events.length === 0) {
              return undefined
            }
            function compare(a, b) {
              return b.time.localeCompare(a.time)
            }
            var events = this.events.sort(compare)
            return this.events[0].time
          },
        },
      },
    },
    relations: {
      hasMany: {
        event: {
          localField: 'events',
          foreignKey: 'activity_id',
        }
      }
    }
  })
})
;app.service('Event', function(store) {
  return store.defineMapper('event', {
    schema: {
      properties: {
        id: { type: 'string' },
        time: { type: 'string' },
        activity_id: { type: 'string' },
        term_id: { type: 'string' },
        weight: { type: ['number', 'null'] },
        source: {
          get() {
            return this.activity || this.term
          }
        },
        display_time: {
          get() {
            return moment(this.time).format('H:mm:ss')
          }
        },
      },
    },
    relations: {
      belongsTo: {
        activity: {
          localField: 'activity',
          foreignKey: 'activity_id',
        },
        term: {
          localField: 'term',
          foreignKey: 'term_id',
        },
      },
    },
  })
})
;app.controller('RecordController', function($scope, $mdDialog, $controller, term, Event) {
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
;app.factory('store', () => {
  var store = new JSData.DataStore()
  var adapter = new JSDataLocalStorage.LocalStorageAdapter({
    beforeCreate: function(mapper, props, opts) {
      JSDataLocalStorage.LocalStorageAdapter.prototype.beforeCreate.apply(this, arguments)
      props.created_at = new Date()
    },
  })

  store.registerAdapter('localstorage', adapter, { default: true })

  return store
})
;app.service('Term', function(store) {
  return store.defineMapper('term', {
    schema: {
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        type: {
          type: 'string',
          get() { return 'term' },
        },
        color: { type: 'string' },
        lastEvent: {
          type: 'string',
          get() {
            if(this.events.length === 0) {
              return undefined
            }
            function compare(a, b) {
              return b.time.localeCompare(a.time)
            }
            var events = this.events.sort(compare)
            return this.events[0].time
          },
        },
      },
    },
    relations: {
      hasMany: {
        event: {
          localField: 'events',
          foreignKey: 'term_id',
        },
      },
    }
  })
})
