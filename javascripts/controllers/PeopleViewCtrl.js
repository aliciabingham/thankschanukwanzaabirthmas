'use strict';

app.controller("PeopleViewCtrl", function($scope, $routeParams, PeopleFactory){
  $scope.selectedPerson = {};
  var personId = $routeParams.id;
  console.log("$routeParams", personId);
  console.log("controller working");

  PeopleFactory.getSinglePerson(personId).then(function(onePerson){
    onePerson.id = personId;
    $scope.selectedPerson = onePerson;
    console.log("onePerson", onePerson);
  });
});