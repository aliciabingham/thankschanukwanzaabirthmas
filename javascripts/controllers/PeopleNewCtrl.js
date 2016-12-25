'use strict';

app.controller("PeopleNewCtrl", function($scope, $rootScope, $routeParams, $location, PeopleFactory){
  $scope.newPerson = {};
	let personId = $routeParams.id;

  $scope.addNewPerson = function(){
    $scope.newPerson.uid = $rootScope.user.uid;
    PeopleFactory.postNewPerson($scope.newPerson).then(function(personId){
      $location.url("/people/list");
      $scope.newPerson = {};
      $scope.showListView = true;
    });
  };

  $scope.cancelPersonEdit = function() {
    $location.url("/people/list");
  };

});