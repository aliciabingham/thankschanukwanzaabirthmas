'use strict';

app.controller("EventListCtrl", function($scope, $location, $rootScope, EventFactory){
  $scope.welcome = "hello";
  $scope.events = [];


let getEvents = function(){
  EventFactory.getEventList($rootScope.user.uid).then(function(fbEvents){
    $scope.events = fbEvents;
  });
};

getEvents();

  $scope.showNewEventPage = function(){
    $location.url("/events/new");
  };

  $scope.showPeoplePage = function(){
    $location.url("/people/list");
  };

  $scope.showGroupsPage = function(){
  $location.url("/groups/list");
  };

  $scope.allEvents = function(){
    console.log("you clicked all events");
    $scope.showListView = true;
  };

  $scope.newEvent = function(){
    $scope.showListView = false;
  };


$scope.deleteEvent = function(eventID){
  EventFactory.deleteEvent(eventID).then(function(response){
    getEvents();
  });
};

$scope.inputChange = function(thingy){
  EventFactory.editEvent(thingy).then(function(response){
  });
  $location.url('/groups/gifts');
};
});