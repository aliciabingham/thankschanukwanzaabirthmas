'use strict';

app.controller("GroupNewCtrl", function($scope, $rootScope, $location, GroupFactory){
  $scope.newGroup = {};

  $scope.addNewGroup = function(){
    $scope.newGroup.uid = $rootScope.user.uid;
    GroupFactory.postNewGroup($scope.newGroup).then(function(groupId){
      $location.url("/groups/list");
      $scope.newGroup = {};
      $scope.showListView = true;

    });
  };

});