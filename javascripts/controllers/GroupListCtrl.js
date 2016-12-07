'use strict';

app.controller("GroupListCtrl", function($scope, $location, $rootScope, GroupFactory){
  $scope.welcome = "hello";
  $scope.groups = [];


let getGroups = function(){
  GroupFactory.getGroupList($rootScope.user.uid).then(function(fbGroups){
    $scope.groups = fbGroups;
  });
};

getGroups();

  $scope.showNewGroupPage = function(){
    $location.url("/groups/new");
    console.log("show new group click working");
  };


  $scope.allGroups = function(){
    console.log("you clicked all groups");
    $scope.showListView = true;
  };

  $scope.newGroup = function(){
    console.log("you clicked new group");
    $scope.showListView = false;
  };


$scope.deleteGroup = function(groupId){
  console.log("you deleted me", groupId);
  GroupFactory.deleteGroup(groupId).then(function(response){
    getGroups();
  });
};

$scope.inputChange = function(thingy){
  GroupFactory.editGroup(thingy).then(function(response){
    console.log("ctrl inputChange response", response);
  });
};

});