angular.module('eventTypes', ['ngMaterial', 'ui.router', 'timer'])
    .config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
	    $stateProvider
	        .state('home', {
		    url: '/home',
		    templateUrl: 'home.html',
		    controller: 'HomeController as ctrl'
		})

	    $urlRouterProvider.otherwise('home')
	}])
    .controller('HomeController', function($scope, $mdDialog, $location) {
	$scope.activities = [{ name: 'Testing', id: 1, lastEvent: new Date() },
			     { name: 'Number Two', id: 2, lastEvent: new Date() },
			     { name: 'Index Two', id: 3, lastEvent: new Date() }]

	$scope.conditionalAdd = function(event) {
	    var nextPage
	    switch($scope.selectedIndex) {
	    case 0:
		$mdDialog.show({
		    controller: DialogController,
		    templateUrl: 'addActivity.html',
		    parent: angular.element(document.body),
		    targetEvent: event,
		    clickOutsideToClose: true,
		    fullscreen: true // Only for -xs, -sm breakpoints.
		})
		    .then(function(value) {
			if(value.name) {
			    $scope.activities.push(value)
			}
		    },
			  function() {})
		break
	    case 1:
		break
	    case 2:
		break
	    }
	}

	$scope.activitySelected = function(id) {
	    for(i in $scope.activities) {
		var activity = $scope.activities[i]
		if(activity.id == id) {
		    console.log(activity.lastEvent)
		    activity.lastEvent = new Date()
		}
	    }
	}
	
	function DialogController($scope, $mdDialog) {
	    $scope.hide = function() {
		$mdDialog.hide()
	    }

	    $scope.cancel = function() {
		$mdDialog.cancel()
	    }

	    $scope.returnNew = function() {
		$mdDialog.hide({ name: $scope.name, color: $scope.color })
	    }
	}
    })
