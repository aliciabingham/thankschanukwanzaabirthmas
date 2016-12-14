'use strict';

app.controller("EventViewCtrl", function($scope, $routeParams, $rootScope, EventFactory, GroupFactory){
  $scope.selectedEvent = {};
  var eventId = $routeParams.id;

  // GroupFactory.getSingleGroup(groupId).then(function(oneGroup){
  //   oneGroup.id = groupId;
  //   $scope.selectedGroup = oneGroup;
  //   console.log("oneGroup", oneGroup);
  // });

 	

  EventFactory.getSingleEvent(eventId).then(function(oneEvent){
    oneEvent.id = eventId;
    $scope.selectedEvent = oneEvent;
    console.log("oneEvent", oneEvent);
    // Make another ajax call with the selectedEvents data
  });

  $scope.getGroups = function(groupId){
  GroupFactory.getSingleGroup(groupId).then(function(group){
      console.log("group", group);
    });
  };
	$scope.getGroups("group0");

GroupFactory.getGroupList($rootScope.user.uid).then(function(results){
	$scope.groups=results;
});

$scope.groups=[];

});