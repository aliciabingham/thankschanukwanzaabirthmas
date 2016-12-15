'use strict';

app.controller("GroupEditCtrl", function($scope, $location, $routeParams, GroupFactory){
  $scope.newGroup = {};
  let groupId = $routeParams.id;

  GroupFactory.getSingleGroup(groupId).then(function(oneGroup){
      oneGroup.id = groupId;
      $scope.newGroup = oneGroup;
  });

    $scope.addNewGroup = function(){
      GroupFactory.editGroup($scope.newGroup).then(function(response){
        $scope.newGroup = {};
        $location.url("/groups/list");
      });
    };
});