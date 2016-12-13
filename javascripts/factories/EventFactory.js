"use strict";

app.factory("EventFactory", function($q, $http, FIREBASE_CONFIG, GroupFactory){

  var getEventList = function(userId){
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/events.json?orderBy="uid"&equalTo="${userId}"`)
      .success(function(response){
        let events = [];
        Object.keys(response).forEach(function(key){
          response[key].id = key;

          var event = response[key];
          event.id = key;
          let members = [];

          function addMemberToEvent (jackass) {
            members.push(jackass);
          } 

          for(var i=0; i < event.members.length; i++) {
            GroupFactory.getSingleGroup(event.members[i]).then(addMemberToEvent);
          }
          //loop through event.members and get user info
          event.resolvedMembers = members;
          events.push(event);
        });
        resolve(events);
      })
      .error(function(errorResponse){
        reject(errorResponse);
      });
    });
  };

  var postNewEvent = function(newEvent){
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/events.json`,
        JSON.stringify({
          name: newEvent.name,
          date: newEvent.date,
          uid: newEvent.uid
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

var deleteEvent = function(eventID){
  return $q((resolve, reject) => {
    $http.delete(`${FIREBASE_CONFIG.databaseURL}/events/${eventID}.json`)
    .success(function(deleteResponse){
      resolve(deleteResponse);
    })
    .error(function(deleteError){
      reject(deleteError);
    });
  });
};

var getSingleEvent = function(eventId){
  return $q((resolve, reject) => {
  $http.get(`${FIREBASE_CONFIG.databaseURL}/events/${eventId}.json`)
  .success(function(event){
    let members = [];
    event.id = eventId;
    
    function addMemberToEvent (jackass) {
      members.push(jackass);
    }

    for(var i=0; i < event.members.length; i++) {
      GroupFactory.getSingleGroup(event.members[i]).then(addMemberToEvent);
    }
    //loop through event.members and get user info
    event.resolvedMembers = members;
    resolve(event);   
  })
  .error(function(getSingleError){
  reject(getSingleError);
  });
  });
};

  var editEvent = function(editEvent){
    console.log("factory edit response", editEvent);
    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/events/${editEvent.id}.json`,
        JSON.stringify({
          name: editEvent.name,
          date: editEvent.date,
          uid: editEvent.uid,
          members: editEvent.members,
          id: editEvent.id
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


return {getEventList:getEventList, postNewEvent:postNewEvent, deleteEvent:deleteEvent, getSingleEvent:getSingleEvent, editEvent:editEvent};
});