"use strict";

app.factory("GroupFactory", function($q, $http, FIREBASE_CONFIG, PeopleFactory, UserFactory){


 
  var getGroupList = function(userId){
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/groups.json?orderBy="uid"&equalTo="${userId}"`)
      .success(function(response){
        let groups = [];
        Object.keys(response).forEach(function(key){
          var group = response[key];
          group.id = key;
          var members = [];
          console.log("first console", members);
          function addMember (jackass) {
            members.push(jackass);
          } 
          if (group.members) {
          for(var i=0; i < group.members.length; i++) {
            PeopleFactory.getSinglePerson(group.members[i]).then(addMember);
          //loop through group.members and get user info
          group.resolvedMembers = members;
          console.log("second console", group.members.length);
        }
          } else {
          group.members = [];
         }
          groups.push(group);
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
          members: newGroup.members, 
          uid: newGroup.uid,
          giftRequired: newGroup.giftRequired,
          giftType: newGroup.giftType
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
  .success(function(group){
    let members = [];
    group.id = groupId;
    function addMember (jackass) {
      members.push(jackass);
    }
    if (group.members) {
    for(var i=0; i < group.members.length; i++) {
      PeopleFactory.getSinglePerson(group.members[i]).then(addMember);
    }
    //loop through group.members and get user info
    group.resolvedMembers = members;
  }
    else {
      group.members = [];
    }
    resolve(group); 
  })
  .error(function(getSingleError){
  reject(getSingleError);
  });
  });
};

  var editGroup = function(editGroup){
    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/groups/${editGroup.id}.json`,
        JSON.stringify({
          name: editGroup.name,
          usualLocation: editGroup.usualLocation,
          uid: editGroup.uid,
          members: editGroup.members,
          giftRequired: editGroup.giftRequired,
          giftType: editGroup.giftType
        })
        )
      .success(function(editResponse){
        resolve(editResponse);
        console.log("group factory edit group", editGroup);
        console.log("group factory edit response", editResponse);
      })
      .error(function(editError){
        reject(editError);
      });
    });
  };




return {getGroupList:getGroupList, postNewGroup:postNewGroup, deleteGroup:deleteGroup, getSingleGroup:getSingleGroup, editGroup:editGroup};
});