'use strict';

app.controller("EventViewCtrl", function($scope, $routeParams, $rootScope, EventFactory, GroupFactory){
  $scope.selectedEvent = {};
  var eventId = $routeParams.id;
  console.log("$routeParams", eventId);
  console.log("controller working");

  EventFactory.getSingleEvent(eventId).then(function(oneEvent){
    oneEvent.id = eventId;
    $scope.selectedEvent = oneEvent;
    console.log("oneEvent", oneEvent);
  });

  $scope.getGroups = function(groupId){
  GroupFactory.getSingleGroup(groupId).then(function(group){
      console.log("group", group);

    });
  };

$scope.getGroups();

GroupFactory.getGroupList($rootScope.user.uid).then(function(results){
	console.log("results from group gift ctrl", results);
	$scope.groups=results;
});

$scope.groups=[];

});