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
    console.log("show new event click working");
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
    console.log("you clicked new item");
    $scope.showListView = false;
  };


$scope.deleteEvent = function(eventID){
  console.log("you deleted me", eventID);
  EventFactory.deleteEvent(eventID).then(function(response){
    getEvents();
  });
};

$scope.inputChange = function(thingy){
  EventFactory.editEvent(thingy).then(function(response){
    console.log("ctrl inputChange response", response);
  });
};


});