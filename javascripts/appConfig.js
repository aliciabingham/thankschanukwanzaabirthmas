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
   .otherwise('/Register');
});