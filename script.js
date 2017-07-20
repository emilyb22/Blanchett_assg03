
	var hockeyApp = angular.module('hockeyApp', ['ngRoute']);

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
    
    

	 hockeyApp.controller('PlayersCtrl', function($scope, $routeParams, $http) {

    $scope.itemID = $routeParams.itemID

    $http
      .get('/data/players.json')
      .then(function(res){
        $scope.player = res.data.filter(function(row) {
          return row.id === $scope.itemID 
        })[0]
        console.log($scope.player)
      })

  })
