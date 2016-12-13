'use strict';

app.controller("PeopleViewCtrl", function($scope, $location, $rootScope, $routeParams, PeopleFactory, GroupFactory){
  $scope.selectedPerson = {};
  var personId = $routeParams.id;
  console.log("$routeParams", personId);
  console.log("controller working");

  PeopleFactory.getSinglePerson(personId).then(function(onePerson){
    onePerson.id = personId;
    $scope.selectedPerson = onePerson;
    console.log("onePerson", onePerson);
  });




  $scope.addPersonToGroup = function(groupId){

  	console.log("what is the current value of this group id?");
    console.log(groupId);
    console.log(personId);
    GroupFactory.getSingleGroup(groupId).then(function(group){
      group.members.push(personId);
      GroupFactory.editGroup(group);
    });
  };

  GroupFactory.getGroupList($rootScope.user.uid).then(function(results){
  	$scope.groups=results;
  });


   $scope.groups=[];
});
