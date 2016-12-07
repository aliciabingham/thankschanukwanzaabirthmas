'use strict';

app.controller("GroupViewCtrl", function($scope, $routeParams, GroupFactory){
  $scope.selectedGroup = {};
  var groupId = $routeParams.id;
  console.log("$routeParams", groupId);
  console.log("controller working");

  GroupFactory.getSingleGroup(groupId).then(function(oneGroup){
    oneGroup.id = groupId;
    $scope.selectedGroup = oneGroup;
    console.log("oneGroup", oneGroup);
  });
});