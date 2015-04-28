// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider
    /*.state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'tabs.html'
    })*/
    .state('thanks', {
      url: '/',
      templateUrl: 'thankView.html',
      controller: 'ThankCtrl'
    })
    .state('welcome', {
      url: '/welcome',
      templateUrl: 'welcome.html'
    })
})
.factory('Thank', function($http) {
  return {
    getThanks: function(scope) {
      console.log('fetching thanks...');
      $http.get('/api/thanks')
        .success(function(data) {
          console.log(data);
          scope.thanks = data;
        });
    },

    postThanks: function(body) {
      console.log('making post request...');
      $http.post('/api/thanks', { 'message': body }, { headers: {'Content-Type':'application/json','Accept':'application/json'}}).success(function(data) { console.log('success!'); })
      .error(function(err) { console.log('error!',err) });
    },

    deleteThanks: function(index, scope) {
      console.log(scope.thanks[index]);
      $http.delete('/api/thanks', { method: 'DELETE', params: scope.thanks[index]})
        .success(function(data) {
          console.log('deleted!');
        })
        .error(function(err) { console.log('error!',err) });
    }
  }
})
.controller('ThankCtrl', function($scope, $ionicModal, Thank) {
  $ionicModal.fromTemplateUrl('thank-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.openModal = function() {
    $scope.modal.show();
  }
  
  $scope.closeModal = function() {
    $scope.modal.hide();
  }
  
  $scope.thanks = [];
  
  $scope.newThank = function(body) {
    console.log('new thank!');
    console.log(body);
    if(body.length > 0) {
      Thank.postThanks(body);
    }
    $scope.closeModal();
  }

  $scope.removeThank = function(index) {
    console.log('deleting thank');
    console.log($scope.thanks[index]);
    Thank.deleteThanks(index, $scope);
  }
  $scope.getThanks = function() {
    Thank.getThanks($scope);
  }
  $scope.getThanks($scope);
})
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
