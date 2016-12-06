'use strict';

app.controller("EventListCtrl", function($scope, $rootScope, EventFactory){
  $scope.welcome = "hello";
  $scope.events = [];


let getEvents = function(){
  EventFactory.getEventList($rootScope.user.uid).then(function(fbEvents){
    $scope.events = fbEvents;
  });
};

getEvents();

  $scope.allItems = function(){
    console.log("you clicked all events");
    $scope.showListView = true;
  };

  $scope.newItem = function(){
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
  EventFactory.editItem(thingy).then(function(response){
    console.log("ctrl inputChange response", response);
  });
};


});