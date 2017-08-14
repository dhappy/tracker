angular.module('eventTypes', ['ngMaterial', 'ui.router'])
    .config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
	    $stateProvider
	        .state('home', {
		    url: '/home',
		    templateUrl: '/home.html',
		    controller: 'ToolsCtrl'
		})
	        .state('addActivity', {
		    url: '/addActivity',
		    templateUrl: '/addActivity.html',
		    controller: 'ActivityCtrl as ctrl'
		})
	    $urlRouterProvider.otherwise('home')
	}])
    .controller('ActivityCtrl', function($scope) {
	this.newActivity = function() {
	    console.log('t')
	}
    })
    .controller('ToolsCtrl', function($scope, $location) {
	$scope.conditionalAdd = function() {
	    var nextPage
	    switch($scope.selectedIndex) {
	    case 0:
		nextPage = 'addActivity'
		break
	    case 1:
		nextPage = 'addMood'
		break
	    case 2:
		nextPage = 'addEvent'
		break
	    }
	    $location.path(nextPage)
	    console.log('A', nextPage)
	}
    })
