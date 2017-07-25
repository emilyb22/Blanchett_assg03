angular
    .module("hockeyApp", ['firebase', 'ngRoute'])
    .constant('firebaseConfig', {
        apiKey: "AIzaSyDma2d0IC9vGyhu8zTNBHo0M6sMx-Zrs0k"
        , authDomain: "hockey-app-f0b7c.firebaseapp.com"
        , databaseURL: "https://hockey-app-f0b7c.firebaseio.com"
        , projectId: "hockey-app-f0b7c"
        , storageBucket: ""
        , messagingSenderId: "1017524189091"
    }).run(firebaseConfig => firebase.initializeApp(firebaseConfig))
    
    .config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/about/:itemID', {
        templateUrl: 'pages/about.html'
        , controller: 'hockeyCtrl'
    }).when('/', {
        templateUrl: 'pages/placeholder.html'
        , controller: 'hockeyCtrl'
    }).when('/show-all', {
        templateUrl: 'pages/all.html'
        , controller: 'AllPlayersCtrl'
    })
    .when('/createPlayer', {
        templateUrl: 'pages/createPlayer.html'
        , controller: 'hockeyCtrl'
    })
    
}).controller('AllPlayersCtrl', function ($scope, $routeParams) {
    $scope.itemID = $routeParams.itemID
    $scope.showAll = true
})
    
    .controller('hockeyCtrl', function ($scope, $routeParams, $firebaseObject, $firebaseArray) {
    
    const dbRef = firebase.database().ref().child('players')
    const key = $routeParams.itemID 
    $scope.player = key ? $firebaseObject(dbRef.child(key)) : null 
    $scope.playersList = $firebaseArray(dbRef)
    this.getBlankPlayer = () => ({
        name: ''
        , team: ''
        , draft: ''
        , birthday: ''
        , birthplace: ''
    , })

    
    $scope.newPlayer = this.getBlankPlayer()
    
    $scope.addPlayer = () => {
        $scope.playersList 
        .$add($scope.newPlayer) 
        .then(ref => { 
        $scope.newPlayer = this.getBlankPlayer() 
        $location.path('/about/' + ref.key) 
        })
    }
    $scope.removePlayer = player => {
        if (confirm("Are you sure you want to delete this player?")) {
            player.$remove()
            
        }
    }
})