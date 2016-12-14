"use strict";

app.factory("PeopleFactory", function($q, $http, FIREBASE_CONFIG){

  var getPeopleList = function(userId){
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/people.json?orderBy="uid"&equalTo="${userId}"`)
      .success(function(response){
        let people = [];
        Object.keys(response).forEach(function(key){
          response[key].id = key;
          people.push(response[key]);
        });
        resolve(people);
      })
      .error(function(errorResponse){
        reject(errorResponse);
      });
    });
  };

  var postNewPerson = function(newPerson){
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/people.json`,
        JSON.stringify({
          firstName: newPerson.firstName,
          lastName: newPerson.lastName,
          phoneNumber: newPerson.phoneNumber,
          address: newPerson.address,
          cityState: newPerson.cityState,
          zipCode: newPerson.zipCode,
          uid: newPerson.uid,
          haveAGift: newPerson.haveAGift,
          giftType: editPerson.giftType
        })
        )
      .success(function(postResponse){
        resolve(postResponse);
      })
      .error(function(postError){
        reject(postError);
      });
    });
  };

var deletePerson = function(personId){
  return $q((resolve, reject) => {
    $http.delete(`${FIREBASE_CONFIG.databaseURL}/people/${personId}.json`)
    .success(function(deleteResponse){
      resolve(deleteResponse);
    })
    .error(function(deleteError){
      reject(deleteError);
    });
  });
};

var getSinglePerson = function(personId){
  return $q((resolve, reject) => {
  $http.get(`${FIREBASE_CONFIG.databaseURL}/people/${personId}.json`)
  .success(function(getSingleResponse){
    resolve(getSingleResponse);
  })
  .error(function(getSingleError){
  reject(getSingleError);
  });
  });
};

  var editPerson = function(editPerson){
    console.log("factory edit response", editPerson);
    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/people/${editPerson.id}.json`,
        JSON.stringify({
          firstName: editPerson.firstName,
          lastName: editPerson.lastName,
          phoneNumber: editPerson.phoneNumber,
          address: editPerson.address,
          cityState: editPerson.cityState,
          zipCode: editPerson.zipCode,
          uid: editPerson.uid,
          haveAGift: editPerson.haveAGift,
          giftType: editPerson.giftType
        })
        )
      .success(function(editResponse){
        resolve(editResponse);
      })
      .error(function(editError){
        reject(editError);
      });
    });
  };


return {getPeopleList:getPeopleList, postNewPerson:postNewPerson, deletePerson:deletePerson, getSinglePerson:getSinglePerson, editPerson:editPerson};
});