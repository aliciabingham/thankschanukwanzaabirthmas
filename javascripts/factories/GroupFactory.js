"use strict";

app.factory("GroupFactory", function($q, $http, FIREBASE_CONFIG){

  var getGroupList = function(userId){
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/groups.json`)
      .success(function(response){
        let groups = [];
        Object.keys(response).forEach(function(key){
          response[key].id = key;
          groups.push(response[key]);
        });
        resolve(groups);
      })
      .error(function(errorResponse){
        reject(errorResponse);
      });
    });
  };

  var postNewGroup = function(newGroup){
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/groups.json`,
        JSON.stringify({
          name: newGroup.name,
          usualLocation: newGroup.usualLocation,
          uid: newGroup.uid
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

var deleteGroup = function(groupId){
  return $q((resolve, reject) => {
    $http.delete(`${FIREBASE_CONFIG.databaseURL}/groups/${groupId}.json`)
    .success(function(deleteResponse){
      resolve(deleteResponse);
    })
    .error(function(deleteError){
      reject(deleteError);
    });
  });
};

var getSingleGroup = function(groupId){
  return $q((resolve, reject) => {
  $http.get(`${FIREBASE_CONFIG.databaseURL}/groups/${groupId}.json`)
  .success(function(getSingleResponse){
    resolve(getSingleResponse);
  })
  .error(function(getSingleError){
  reject(getSingleError);
  });
  });
};

  var editGroup = function(editGroup){
    console.log("factory edit response", editGroup);
    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/groups/${editGroup.id}.json`,
        JSON.stringify({
          name: editGroup.name,
          usualLocation: editGroup.usualLocation,
          uid: editGroup.uid
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


return {getGroupList:getGroupList, postNewGroup:postNewGroup, deleteGroup:deleteGroup, getSingleGroup:getSingleGroup, editGroup:editGroup};
});