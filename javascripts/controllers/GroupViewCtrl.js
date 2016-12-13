'use strict';

app.controller("GroupViewCtrl", function($scope, $routeParams, $rootScope, GroupFactory, EventFactory){
  $scope.selectedGroup = {};
  var groupId = $routeParams.id;
  console.log("$routeParams", groupId);
  console.log("controller working");

  GroupFactory.getSingleGroup(groupId).then(function(oneGroup){
    oneGroup.id = groupId;
    $scope.selectedGroup = oneGroup;
    console.log("oneGroup", oneGroup);
  });

    $scope.addGroupToEvent = function(eventId){

  	console.log("what is the current value of this group id?");
    console.log(eventId);
    console.log(groupId);
    EventFactory.getSingleEvent(eventId).then(function(event){
      event.members.push(groupId);
      EventFactory.editEvent(event);
    });
  };
  EventFactory.getEventList($rootScope.user.uid).then(function(results){
    $scope.events=results;
  });


   $scope.events=[];
});
