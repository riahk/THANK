// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
.controller('ThankCtrl', function($scope, $ionicModal) {
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
      $scope.thanks.push({body: body});
    }
    $scope.closeModal();
  }
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
