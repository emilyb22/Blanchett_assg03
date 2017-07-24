
	var hockeyAppRoute = angular.module('hockeyAppRoute', ['ngRoute']);

	// configure our routes
	hockeyApp.config(function($routeProvider) {
		$routeProvider
			.when('/about/:itemID', {
				templateUrl : 'pages/about.html',
				controller  : 'PlayersCtrl'
			})
        .when('/', {
				templateUrl : 'pages/placeholder.html',
				
			})

	})
 