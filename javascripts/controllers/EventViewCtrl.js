'use strict';

app.controller("EventViewCtrl", function($scope, $routeParams, $rootScope, EventFactory, GroupFactory){
  $scope.selectedEvent = {};
  var eventId = $routeParams.id;


  EventFactory.getSingleEvent(eventId).then(function(oneEvent){
    $scope.selectedEvent = oneEvent;
  });

  $scope.getGroups = function(groupId){
  GroupFactory.getSingleGroup(groupId).then(function(oneGroup){
    $scope.selectedGroup = oneGroup;
    $scope.giftRequired = groupId.giftRequired;
    });
  };



  $scope.saveEventData = function(editEvent) {
    EventFactory.editEvent(editEvent).then(function(oneEvent){
      $scope.selectedEvent = oneEvent;
      oneEvent.id = eventId;
      console.log("selectedEvent", editEvent);
    });
  };

  $scope.saveData = function(editGroup) {
  GroupFactory.editGroup(editGroup).then(function(oneMember){
    $scope.selectedGroup = oneMember;
    });
  };

GroupFactory.getGroupList($rootScope.user.uid).then(function(results){
	$scope.groups=results;
});

$scope.groups=[];

});