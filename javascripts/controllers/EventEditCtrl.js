'use strict';

app.controller("EventEditCtrl", function($scope, $location, $routeParams, EventFactory){
  $scope.newEvent = {};
  let eventId = $routeParams.id;

  EventFactory.getSingleEvent(eventId).then(function(oneEvent){
      oneEvent.id = eventId;
      $scope.newEvent = oneEvent;
  });

    $scope.addNewEvent = function(){
      EventFactory.editEvent($scope.newEvent).then(function(response){
        $scope.newEvent = {};
        $location.url("/events/list");
      });
    };
});