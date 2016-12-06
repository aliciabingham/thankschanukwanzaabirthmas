 'use strict';

app.controller("PeopleListCtrl", function($scope, $location, $rootScope, PeopleFactory){
  $scope.welcome = "hello";
  $scope.people = [];


let getPeople = function(){
  PeopleFactory.getPeopleList($rootScope.user.uid).then(function(fbPeople){
    $scope.people = fbPeople;
  });
};

getPeople();

  $scope.showNewPersonPage = function(){
    $location.url("/people/new");
    console.log("show new person click working");
  };

  $scope.allPeople = function(){
    console.log("you clicked all people");
    $scope.showListView = true;
  };

  $scope.newPerson = function(){
    console.log("you clicked new person");
    $scope.showListView = false;
  };


$scope.deletePerson = function(personId){
  console.log("you deleted me", personId);
  PeopleFactory.deletePerson(personId).then(function(response){
    getPeople();
  });
};

$scope.inputChange = function(thingy){
  PeopleFactory.editPerson(thingy).then(function(response){
    console.log("ctrl inputChange response", response);
  });
};


});