'use strict';

app.controller("GroupViewCtrl", function($scope, $location, $routeParams, $rootScope, GroupFactory, EventFactory){
  $scope.selectedGroup = {};
  var groupId = $routeParams.id;

  GroupFactory.getSingleGroup(groupId).then(function(oneGroup){
    oneGroup.id = groupId;
    $scope.selectedGroup = oneGroup;
  });

    $scope.addGroupToEvent = function(eventId){
    EventFactory.getSingleEvent(eventId).then(function(event){
      event.members.push(groupId);
      EventFactory.editEvent(event);
    });
  };
  EventFactory.getEventList($rootScope.user.uid).then(function(results){
    $scope.events=results;
  });

  $scope.moveToEventPage = function(){
    $location.url('/events/list');
  };

   $scope.events=[];
});
