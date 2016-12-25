'use strict';

app.controller("PeopleViewCtrl", function($scope, $location, $rootScope, $routeParams, PeopleFactory, GroupFactory){
  $scope.selectedPerson = {};
  var personId = $routeParams.id;

  PeopleFactory.getSinglePerson(personId).then(function(onePerson){
    onePerson.id = personId;
    $scope.selectedPerson = onePerson;
  });




  $scope.addPersonToGroup = function(groupId){

    GroupFactory.getSingleGroup(groupId).then(function(group){
      group.members.push(personId);
      GroupFactory.editGroup(group);
    });

    
  };

  GroupFactory.getGroupList($rootScope.user.uid).then(function(results){
  	$scope.groups=results;
  });

  $scope.moveToGroupPage = function(){
    $location.url('/groups/list');
  };

   $scope.groups=[];
});
