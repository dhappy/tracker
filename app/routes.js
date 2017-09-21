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
