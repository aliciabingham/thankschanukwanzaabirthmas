 'use strict';

app.controller("EventNewCtrl", function($scope, $rootScope, $location, EventFactory){
  $scope.newEvent = {};
  $scope.newEvent.isFuture = false;

  $scope.addNewEvent = function(){
    $scope.newEvent.uid = $rootScope.user.uid;
    EventFactory.postNewEvent($scope.newEvent).then(function(eventId){
      $location.url("/events/list");
      $scope.newEvent = {};
      $scope.showListView = true;
    });
  };

  $scope.cancelEditEvent = function(){
    $location.url('/events/list');
  };

});