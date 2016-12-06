'use strict';

app.controller("PeopleNewCtrl", function($scope, $rootScope, $location, PeopleFactory){
  $scope.newPerson = {};

  $scope.addNewPerson = function(){
    $scope.newPerson.uid = $rootScope.user.uid;
    PeopleFactory.postNewPerson($scope.newPerson).then(function(personId){
      $location.url("/people/list");
      $scope.newPerson = {};
      $scope.showListView = true;

    });
  };

});