'use strict';

app.controller("EventNewCtrl", function($scope, $rootScope, $location, EventFactory){
  $scope.newEvent = {};

  $scope.addNewEvent = function(){
    $scope.newEvent.uid = $rootScope.user.uid;
    EventFactory.postNewEvent($scope.newEvent).then(function(eventId){
      $location.url("/events/list");
      $scope.newEvent = {};
      $scope.showListView = true;
    });
  };

  $scope.eventInFuture =function(){
  	$scope.newEVent.isFuture = true;
  	$scope.addNewEvent();
  };

    $scope.eventInPast =function(){
  	$scope.newEVent.isFuture = false;
  	$scope.addNewEvent();
  };


});