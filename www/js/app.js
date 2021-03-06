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
        })
    
    $stateProvider.state('persona', {
        url: '/persona/:index',
        controller: 'PersonaCtrl',
        templateUrl: 'templates/persona.html',
        resolve: {
            persona: function($stateParams, gente){
                return gente.ready.then(function(){
                    return gente.list[+$stateParams.index]
                    });
                }
            }
        });   
    
    $urlRouterProvider.otherwise('/gente');
})

.controller('GenteCtrl', function($scope, gente, $ionicLoading){
    $scope.gente = gente.list;
    
    $scope.addPersona = function(){
        gente.add().then(function(){
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    
    $ionicLoading.show({
        template: '<i class="ion-load-c"></i><br/>Cargando...'
    });
    gente.ready.then(function(){
        $ionicLoading.hide();
    });

})

.controller('PersonaCtrl', function($scope, persona, gente, $ionicActionSheet){
    $scope.persona = persona;
    
    $scope.borrarPersona = function(){
    $ionicActionSheet.show({
        destructiveText: 'Delete ' + persona.name.first,
        cancelText: 'Cancel',
        destructiveButtonClicked: function(){
            gente.list.splice(gente.list.indexOf(persona),1);
            window.history.back();   
        }
    });
    };
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

