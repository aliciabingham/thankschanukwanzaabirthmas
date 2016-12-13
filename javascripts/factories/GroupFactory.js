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
          let members = [];

          function addMember (jackass) {
            members.push(jackass);
          } 

          for(var i=0; i < group.members.length; i++) {
            PeopleFactory.getSinglePerson(group.members[i]).then(addMember);
          }
          //loop through group.members and get user info
          group.resolvedMembers = members;
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
          id: newGroup.id,
          members: newGroup.members, 
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
  .success(function(group){
    let members = [];
    group.id = groupId;
    
    function addMember (jackass) {
      members.push(jackass);
    }

    for(var i=0; i < group.members.length; i++) {
      PeopleFactory.getSinglePerson(group.members[i]).then(addMember);
    }
    //loop through group.members and get user info
    group.resolvedMembers = members;
    resolve(group);
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
          uid: editGroup.uid,
          members: editGroup.members,
          id: editGroup.id
        })
        )
      .success(function(editResponse){
        resolve(editResponse);
        console.log("response from groupfactory edit", editResponse);
      })
      .error(function(editError){
        reject(editError);
      });
    });
  };


return {getGroupList:getGroupList, postNewGroup:postNewGroup, deleteGroup:deleteGroup, getSingleGroup:getSingleGroup, editGroup:editGroup};
});