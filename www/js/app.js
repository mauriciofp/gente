// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider)  {
    $stateProvider.state('gente', {
        url: '/gente',
        controller: 'GenteCtrl',
        templateUrl: 'templates/gente.html'
        });    
    $urlRouterProvider.otherwise('/gente');
})

.controller('GenteCtrl', function($scope, gente){
    $scope.gente = gente.list;

})

.factory('gente', function($http, $q){
    var gente = {};
    var n=0;
    gente.list = [];
    gente.add = function(){
       return $http.get('http://api.randomuser.me?q=' + (n++)).then(function(response) {
           gente.list.push(response.data.results[0].user);
       });
    };
    
    gente.ready = $q.all([
    gente.add(),
    gente.add(),
    gente.add()
        ]);
    return gente;
});

