'use strict';

var DEV = true;

// init module
var module = angular.module('userDashboard', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ngMaterial']);

// import factories
import CodenvyAPI from '../components/api/codenvy.factory.js';

// import controllers
import MainCtrl from './main/main.controller';
import LoginCtrl from './main/login.controller';
import NavbarCtrl from '../components/navbar/navbar.controller';
import ProjectsCtrl from './projects/projects.controller';

// and setup controllers
module.controller('MainCtrl', MainCtrl)
.controller('NavbarCtrl', NavbarCtrl)
.controller('ProjectsCtrl', ProjectsCtrl)
.controller('LoginCtrl', LoginCtrl);


// config routes
module.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl'
    })
    .when('/projects', {
      templateUrl: 'app/projects/projects.html',
      controller: 'ProjectsCtrl'
    })
    .when('/login', {
      templateUrl: 'app/main/login.html',
      controller: 'LoginCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
})
;


// add interceptors
module.factory('AuthInterceptor', function ($window, $cookies, $q) {
  return {
    request: function(config) {
      //remove prefix url
      if (config.url.indexOf("https://codenvy.com/api") == 0) {
        config.url = config.url.substring("https://codenvy.com".length);
      }

      //Do not add token on auth login
      if (config.url.indexOf("/api/auth/login") == -1 && config.url.indexOf("api/") != -1 && $cookies.token) {
        config.params = config.params || {};
        angular.extend(config.params, {token: $cookies.token});
      }
      return config || $q.when(config);
    },
    response: function(response) {
      if (response.status === 401 || response.status == 403) {
        $log.info('Redirect to login page.')
        $location.path('/login');
      }
      return response || $q.when(response);
    }
  };
})

// add interceptors
module.factory('ETagInterceptor', function ($window, $cookies, $q) {

  var etagMap = new Map();

  return {
    request: function(config) {
      // add IfNoneMatch request on the codenvy api if there is an existing eTag
      if ("GET" == config.method) {
        if (config.url.indexOf("/api") == 0) {
          let eTagURI = etagMap.get(config.url);
          if (eTagURI) {
            config.headers = config.headers || {};
            angular.extend(config.headers, {'If-None-Match': eTagURI});
          }
        }
      }
      return config || $q.when(config);
    },
    response: function(response) {

      // if response is ok, keep ETag
      if ("GET" == response.config.method) {
        if (response.status === 200) {
          var responseEtag = response.headers().etag;
          if (responseEtag) {
            if (response.config.url.indexOf("/api") == 0) {

              etagMap.set(response.config.url, responseEtag);
            }
          }
        }

      }
      return response || $q.when(response);
    }
  };
})


  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    if (DEV) {
      $httpProvider.interceptors.push('AuthInterceptor');
    }
    // Add the ETag interceptor for Codenvy API
    $httpProvider.interceptors.push('ETagInterceptor');
  });
