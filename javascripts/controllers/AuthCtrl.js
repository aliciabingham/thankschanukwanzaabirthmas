'use strict';

app.controller("AuthCtrl", function($rootScope, $scope, $location, AuthFactory, UserFactory){
$scope.login = {
   email: "a@a.com",
   password:"123123"
 };


  if($location.path() === "/logout"){
    AuthFactory.logout();
    $rootScope.user = {};
    $location.url("/auth");
  }

  let logMeIn = function(loginStuff){
      console.log("why isn't this working");
        AuthFactory.authenticate(loginStuff).then(function(didLogin){
          console.log(loginStuff, "login Stuff");
        console.log("didLogin", didLogin);
        return UserFactory.getUser(didLogin.uid);
      }).then(function(userCreds){
        $rootScope.user = userCreds;
        $scope.login = {};
        $scope.register = {};
        $location.url("/events/list");
      });
  };

  $scope.loginFunction = function(){
    $location.url("/Login");
  };

  $scope.registerFunction = function(){
    $location.url("/Register");
  };

  $scope.registerUser = function(registerNewUser){
    AuthFactory.registerWithEmail(registerNewUser).then(function(didRegister){
      registerNewUser.uid = didRegister.uid;
      return UserFactory.addUser(registerNewUser);
    }).then(function(registerComplete){
      logMeIn(registerNewUser);
    });
  };

  $scope.loginUser = function(loginNewUser){
    logMeIn(loginNewUser);
  };

  $scope.logout = function(logout){
    AuthFactory.logout();
    $location.url('/Login');
  };
});