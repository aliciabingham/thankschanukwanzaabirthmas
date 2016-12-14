"use strict";

let isAuth = (AuthFactory) => new Promise((resolve, reject) => {
  if(AuthFactory.isAuthenticated()){
    resolve();
  } else {
    reject();
  }
});


app.run(function($rootScope, $location, FIREBASE_CONFIG, AuthFactory){
  firebase.initializeApp(FIREBASE_CONFIG);
  // $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){

  //   let logged = AuthFactory.isAuthenticated();

  //   let appTo;

  //   if(currRoute.originalPath){
  //     appTo = currRoute.originalPath.indexOf('/auth') !== -1;
  //  }

  //   if (!appTo && !logged) {
  //     event.preventDefault();
  //     $location.path('/Register');
  //   }

  // });
});

app.config(function($routeProvider){
  $routeProvider
    .when('/Register', {
      templateUrl: 'partials/authRegister.html',
      controller: 'AuthCtrl'
    })
    .when('/Login', {
      templateUrl: 'partials/authLogin.html',
      controller: 'AuthCtrl'
    })
    .when('/events/list', {
      templateUrl: 'partials/events-list.html',
      controller: 'EventListCtrl',
      resolve: {isAuth}
    })
    .when('/events/new', {
      templateUrl: 'partials/events-new.html',
      controller: 'EventNewCtrl',
      resolve: {isAuth}
    })
    .when('/events/view/:id', {
      templateUrl: 'partials/events-view.html',
      controller: 'EventViewCtrl',
      resolve: {isAuth}
    })
    .when('/events/edit/:id', {
      templateUrl: 'partials/events-new.html',
      controller: 'EventEditCtrl',
      resolve: {isAuth}
    })
    .when('/groups/list', {
      templateUrl: 'partials/groups-list.html',
      controller: 'GroupListCtrl',
      resolve: {isAuth}
    })
    .when('/groups/new', {
      templateUrl: 'partials/groups-new.html',
      controller: 'GroupNewCtrl',
      resolve: {isAuth}
    })
    .when('/groups/view/:id', {
      templateUrl: 'partials/groups-view.html',
      controller: 'GroupViewCtrl',
      resolve: {isAuth}
    })
    .when('/groups/edit/:id', {
      templateUrl: 'partials/groups-new.html',
      controller: 'GroupEditCtrl',
      resolve: {isAuth}
    })
    .when('/people/list', {
      templateUrl: 'partials/people-list.html',
      controller: 'PeopleListCtrl',
      resolve: {isAuth}
    })
    .when('/people/new', {
      templateUrl: 'partials/people-new.html',
      controller: 'PeopleNewCtrl',
      resolve: {isAuth}
    })
    .when('/people/view/:id', {
      templateUrl: 'partials/people-view.html',
      controller: 'PeopleViewCtrl',
      resolve: {isAuth}
    })
    .when('/people/edit/:id', {
      templateUrl: 'partials/people-new.html',
      controller: 'PeopleEditCtrl',
      resolve: {isAuth}
    })
    .when('/Logout', {
      templateUrl: 'partials/authLogout.html',
      controller: 'AuthCtrl',
      resolve: {isAuth}
    })
   .otherwise('/Login');
});