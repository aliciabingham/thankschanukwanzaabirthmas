'use strict';

app.controller("PeopleEditCtrl", function($scope, $location, $routeParams, PeopleFactory){
  $scope.newPerson = {};
  let personId = $routeParams.id;

  PeopleFactory.getSinglePerson(personId).then(function(onePerson){
      onePerson.id = personId;
      $scope.newPerson = onePerson;
      console.log("onePerson", onePerson);  
  });

    $scope.addNewPerson = function(){
      PeopleFactory.editPerson($scope.newPerson).then(function(response){
        $scope.newPerson = {};
        $location.url("/people/list");
        console.log("onePerson", personId);
      });
    };
});