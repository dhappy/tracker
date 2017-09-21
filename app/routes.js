angular.module('eventTypes', ['ngMaterial', 'chart.js', 'ui.router', 'timer', 'pr.longpress', 'mp.colorPicker'])
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
  