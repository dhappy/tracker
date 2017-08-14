angular.module('eventTypes', ['ngMaterial', 'ui.router'])
    .config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
	    $stateProvider
	        .state('home', {
		    url: '/home',
		    templateUrl: 'home.html',
		    controller: 'HomeController'
		})
	        .state('addActivity', {
		    url: '/addActivity',
		    templateUrl: 'addActivity.html',
		    controller: 'ActivityController as ctrl'
		})
	    $urlRouterProvider.otherwise('home')
	}])
    .controller('HomeController', function($scope, $mdDialog, $location) {
	$scope.activities = [{ name: 'ttt' }]

	this.newActivity = function() {
	    $scope.activities.push({ name: 'test' }) 
	}

	$scope.conditionalAdd = function(event) {
	    var nextPage
	    switch($scope.selectedIndex) {
	    case 0:
		$mdDialog.show({
		    title: 'What would you name your dog?',
		    controller: DialogController,
		    templateUrl: 'addActivity.html',
		    parent: angular.element(document.body),
		    targetEvent: event,
		    clickOutsideToClose: true,
		    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		})
		    .then(function(value) {
			console.log(value)
			$scope.activities.push(value)
		    },
			  function() {
			      $location.path('home')

			  })
		nextPage = 'addActivity'
		break
	    case 1:
		nextPage = 'addMood'
		break
	    case 2:
		nextPage = 'addEvent'
		break
	    }
	    //$location.path(nextPage)
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
