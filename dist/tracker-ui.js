/*! tracker-ui 2017-09-21 */
angular.module('eventTypes', ['ngMaterial', 'chart.js', 'ui.router', 'timer', 'pr.longpress', 'mp.colorPicker'])
.controller('ActivitiesTabController', function() {
  console.log('h')
  Activity.findAll({}, { with: ['events'] }).then((activities) => {
    $scope.activities = activities
  })
})
;angular.module('eventTypes', ['ngMaterial', 'chart.js', 'ui.router', 'timer', 'pr.longpress', 'mp.colorPicker'])
.service('Activity', function(store) {
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
;angular.module('eventTypes', ['ngMaterial', 'chart.js', 'ui.router', 'timer', 'pr.longpress', 'mp.colorPicker'])
.factory('store', () => {
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
;angular.module('eventTypes', ['ngMaterial', 'chart.js', 'ui.router', 'timer', 'pr.longpress', 'mp.colorPicker'])
.config([
  '$stateProvider',
  '$urlRouterProvider',   
  ($stateProvider, $urlRouterProvider) => {
    $stateProvider
    .state('activities', {
      url: "/activities",
      templateUrl: "app/views/activitiesTab.html",
      controller: 'ActivitiesTabController as ctrl',
    })
    .state('moodsTab', {
      url: "/moods",
      templateUrl: "app/views/moodsTab.html",
    })
    .state('eventsTab', {
      url: "/events",
      templateUrl: "eventsTab.html",
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'settings.html',
      controller: 'SettingsController as ctrl',
    })
    $urlRouterProvider.otherwise('activitiesTab')
  }
])
