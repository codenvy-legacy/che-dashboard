'use strict';
/*jshint esnext: true */

import MainCtrl from './main/main.controller';
import ProjecsCtrl from './projects/projects.controller';
import NavbarCtrl from '../components/navbar/navbar.controller';

angular.module('userDashboard', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ngMaterial'])
  .controller('MainCtrl', MainCtrl)
  .controller('NavbarCtrl', NavbarCtrl)

  .config(function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl'
    })
    .when('/projects', {
      templateUrl: 'app/projects/projects.html',
      controller: 'ProjectsCtrl
    })
    .otherwise({
      redirectTo: '/'
    });
  })
;
