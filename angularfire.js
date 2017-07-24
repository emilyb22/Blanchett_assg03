angular
	.module("hockeyApp", ['firebase', 'ngRoute'])
	.config(function ($routeProvider, $locationProvider) {
	$routeProvider
			.when('/about/:itemID', {
				templateUrl : 'pages/about.html',
				controller  : 'hockeyCtrl'
			})
        .when('/', {
				templateUrl : 'pages/placeholder.html',
                controller: 'placeholderCtrl'
				
			})
    
    .when('/show-all', {
        templateUrl: 'pages/all.html',
        controller: 'AllDetailsCtrl'
      })
    
	})

	.controller('AllDetailsCtrl', function($scope, $routeParams) {
    $scope.itemID = $routeParams.itemID
    $scope.showAll = true
	
  }) 

.controller('hockeyCtrl', function ($scope, $routeParams, $firebaseObject) {
const dbRef = firebase.database().ref().child('players')
$scope.player = $firebaseObject(dbRef.child($routeParams.itemID))
})


    .constant('firebaseConfig', {
        apiKey: "AIzaSyDma2d0IC9vGyhu8zTNBHo0M6sMx-Zrs0k",
    authDomain: "hockey-app-f0b7c.firebaseapp.com",
    databaseURL: "https://hockey-app-f0b7c.firebaseio.com",
    projectId: "hockey-app-f0b7c",
    storageBucket: "",
    messagingSenderId: "1017524189091"
})
    
    
.run(firebaseConfig => firebase.initializeApp(firebaseConfig))
    
.controller('hockeyCtrl', function($scope, $firebaseObject, $firebaseArray){
	const dbRef = firebase.database().ref().child('players')
    
    $scope.playersList = $firebaseArray(dbRef)
    
    $scope.player = $firebaseObject(dbRef.child('-KpWOmUzEbd1aaaedlpj'))
    
    this.getBlankPlayer = () => ({
        name:'',
        team: '',
        draft: '',
        birthday: '',
        birthplace: '',
    })
    
    $scope.newPlayer = this.getBlankPlayer()
    
    $scope.addPlayer = () => {
        $scope.playersList.$add($scope.newPlayer)
        $scope.newPlayer = this.getBlankPlayer()
    }
    
    $scope.savePlayer = player => $scope.playersList.$save(player)
    
    $scope.removePlayer = player => {
        if(confirm("Are you sure you want to delete this player?")){
    $scope.playersList.$remove(player)
        }
    }
    
    
})
    
    	


