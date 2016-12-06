'use strict';

app.controller("EventViewCtrl", function($scope, $routeParams, EventFactory){
  $scope.selectedEvent = {};
  var eventId = $routeParams.id;
  console.log("$routeParams", eventId);
  console.log("controller working");

  EventFactory.getSingleEvent(eventId).then(function(oneEvent){
    oneEvent.id = eventId;
    $scope.selectedEvent = oneEvent;
    console.log("oneEvent", oneEvent);
  });
});