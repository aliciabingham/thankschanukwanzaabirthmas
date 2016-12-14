'use strict';


app.controller("PeopleGiftCtrl", function($scope, $location, $rootScope, $routeParams, EventFactory, GroupFactory, PeopleFactory){
	
  $scope.selectedGroup = {};
  var groupId = $routeParams.id;
  console.log("$routeParams", groupId);
  console.log("controller working");

  GroupFactory.getSingleGroup(groupId).then(function(oneGroup){
    oneGroup.id = groupId;
    $scope.selectedGroup = oneGroup;
    console.log("oneGroup", oneGroup);
  });

  $scope.doYouHaveAGiftForThisPerson = function(people){
    PeopleFactory.editPerson(people).then(function(response){
      console.log("gift checkmark response", response);
      
    });
  };

    $scope.addGroupToEvent = function(eventId){

  	console.log("what is the current value of this group id?");
    console.log(eventId);
    console.log(groupId);
    EventFactory.getSingleEvent(eventId).then(function(event){
      event.members.push(groupId);
      EventFactory.editEvent(event);
    });
  };

    PeopleFactory.getPeopleList($rootScope.user.uid).then(function(results){
    $scope.people=results;
  });

  $scope.people=[];

  GroupFactory.getGroupList($rootScope.user.uid).then(function(results){
    $scope.groups=results;
  });

  $scope.groups=[];

  EventFactory.getEventList($rootScope.user.uid).then(function(results){
    $scope.events=results;
  });
   $scope.events=[];


});