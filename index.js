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
	$scope.events = [
	    { activity_id: 1, time: new Date() }
	]

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

	$scope.getActivityById = function(id) {
	    console.log(id)
	    return $scope.activities.find(x => x.id === id)
	}
	
	$scope.activitySelected = function(id) {
	    var activity = $scope.getActivityById(id)
	    var now = new Date()
	    activity.lastEvent = now
	    $scope.events.push({ activity_id: activity.id,
				 time: now })
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
