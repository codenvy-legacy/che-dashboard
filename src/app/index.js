/*
 * Copyright (c) 2015 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 */
'use strict';
/*exported CodenvyAPI, CodeMirror, GitHub */

var DEV = true;

// init module
let module = angular.module('userDashboard', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.codemirror', 'ngMaterial', 'ngMessages']);

import Register from '../components/utils/register';

// import custom codemirror
import CodeMirror from './codemirror/codemirror';

// import factories
import CodenvyAPI from '../components/api/codenvy-api.factory';

// import GitHub services
import GitHub from '../components/github/github-service';


// import controllers
import DashboardCtrl from './dashboard/dashboard.controller';
import LoginCtrl from './main/login.controller';
import NavbarCtrl from '../components/navbar/navbar.controller';
import FactoriesCtrl from './factories/factories.controller';
import FactoryCtrl from './factories/factory.controller';

import CodenvySelecterCtrl from '../components/widget/selecter/cdvy-selecter.controller';
import CodenvyToggleCtrl from '../components/widget/toggle-button/cdvy-toggle.controller';
import DemoComponentsCtrl from './demo-components/demo-components.controller';
import ProjectsConfig from './projects/projects-config';

var instanceRegister = Register.getInstance();

new ProjectsConfig(instanceRegister);

// import directives
import CodenvyToolbar from '../components/widget/toolbar/toolbar.directive';
import CodenvyInput from '../components/widget/input/cdvy-input.directive';
import CodenvyPanel from '../components/widget/panel/cdvy-panel.directive';
import CodenvyButtonPrimary from '../components/widget/button/cdvy-button-primary.directive';
import CodenvySelecter from '../components/widget/selecter/cdvy-selecter.directive';
import CodenvyHtmlSource from '../components/widget/html-source/cdvy-html-source.directive';
import CodenvyToggleButton from '../components/widget/toggle-button/cdvy-toggle-button.directive';
import CodenvyToggle from '../components/widget/toggle-button/cdvy-toggle.directive';

// and setup controllers
module.controller('DashboardCtrl', DashboardCtrl)
  .controller('NavbarCtrl', NavbarCtrl)
  .controller('LoginCtrl', LoginCtrl)
  .controller('FactoriesCtrl', FactoriesCtrl)
  .controller('FactoryCtrl', FactoryCtrl)
  .controller('DemoComponentsCtrl', DemoComponentsCtrl)
  .controller('CodenvySelecterCtrl', CodenvySelecterCtrl)
  .controller('CodenvyToggleCtrl', CodenvyToggleCtrl);



// config routes
module.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'DashboardCtrl'
    })
    .when('/projects', {
      templateUrl: 'app/projects/list-projects/list-projects.html',
      controller: 'ListProjectsCtrl',
      controllerAs: 'listProjectsCtrl'
    })
    .when('/project/:workspaceId/:projectName', {
      templateUrl: 'app/projects/project-details/project-details.html',
      controller: 'ProjectDetailsCtrl',
      controllerAs: 'projectDetailsCtrl'
    })
    .when('/create-project', {
      templateUrl: 'app/projects/create-project/create-project.html',
      controller: 'CreateProjectCtrl',
      controllerAs: 'createProjectCtrl'
    })
    .when('/factories', {
      templateUrl: 'app/factories/factories.html',
      controller: 'FactoriesCtrl'
    })
    .when('/factory/:id', {
      templateUrl: 'app/factories/factory.html',
      controller: 'FactoryCtrl'
    })
    .when('/login', {
      templateUrl: 'app/main/login.html',
      controller: 'LoginCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });


  // add demo page
  if (DEV) {
    $routeProvider.when('/demo-components', {
      templateUrl: 'app/demo-components/demo-components.html',
      controller: 'DemoComponentsCtrl',
      controllerAs: 'demoComponentsCtrl'
    });

  }

})
;


// add interceptors
module.factory('AuthInterceptor', function ($window, $cookies, $q, $location, $log) {
  return {
    request: function(config) {
      //remove prefix url
      if (config.url.indexOf('https://codenvy.com/api') === 0) {
        config.url = config.url.substring('https://codenvy.com'.length);
      }

      //Do not add token on auth login
      if (config.url.indexOf('/api/auth/login') === -1 && config.url.indexOf('api/') !== -1 && $cookies.token) {
        config.params = config.params || {};
        angular.extend(config.params, {token: $cookies.token});
      }
      return config || $q.when(config);
    },
    response: function(response) {
      console.log('response', response);

      return response || $q.when(response);
    },
    responseError: function (rejection) {
      if (rejection.status === 401 || rejection.status === 403) {
        $log.info('Redirect to login page.');
        $location.path('/login');

      }
      return $q.reject(rejection);
    }
  };
});

// add interceptors
module.factory('ETagInterceptor', function ($window, $cookies, $q) {

  var etagMap = {};

  return {
    request: function(config) {
      // add IfNoneMatch request on the codenvy api if there is an existing eTag
      if ('GET' === config.method) {
        if (config.url.indexOf('/api') === 0) {
          let eTagURI = etagMap[config.url];
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
      if ('GET' === response.config.method) {
        if (response.status === 200) {
          var responseEtag = response.headers().etag;
          if (responseEtag) {
            if (response.config.url.indexOf('/api') === 0) {

              etagMap[response.config.url] =  responseEtag;
            }
          }
        }

      }
      return response || $q.when(response);
    }
  };
});



// add interceptors
module.factory('LogInterceptor', function ($q) {


  return {
    request: function(config) {
      console.log('RemoteCall:', config.url);
      return config || $q.when(config);
    },
    response: function(response) {
      //console.log('RemoteCall:', response);
      return response || $q.when(response);
    }
  };
});

module.config(function($mdThemingProvider) {

  var codenvyMap = $mdThemingProvider.extendPalette('indigo', {
    '500': '2b333e',
    '300' : 'D0D0D0'
  });
  $mdThemingProvider.definePalette('codenvy', codenvyMap);

  var codenvyAccentMap = $mdThemingProvider.extendPalette('green', {
    '700' : '00897B',
    'A400': '3d8f76',
    'A200': '00897B',
    'contrastDefaultColor': 'light'
  });
  $mdThemingProvider.definePalette('codenvyAccent', codenvyAccentMap);


  var toolbarPrimaryPalette = $mdThemingProvider.extendPalette('purple', {
    '500' : '558daa',
    'contrastDefaultColor': 'light'
  });
  $mdThemingProvider.definePalette('toolbarPrimaryPalette', toolbarPrimaryPalette);

  var toolbarAccentPalette = $mdThemingProvider.extendPalette('purple', {
    'A200' : 'EF6C00',
    '700' : 'E65100',
    'contrastDefaultColor': 'light'
  });
  $mdThemingProvider.definePalette('toolbarAccentPalette', toolbarAccentPalette);


  $mdThemingProvider.theme('default')
    .primaryPalette('codenvy')
    .accentPalette('codenvyAccent');
/*  .backgroundPalette('grey');*/

  $mdThemingProvider.theme('toolbar-theme')
    .primaryPalette('toolbarPrimaryPalette')
    .accentPalette('toolbarAccentPalette');

  $mdThemingProvider.theme('factory-theme')
    .primaryPalette('light-blue')
    .accentPalette('pink')
  .warnPalette('red')
  .backgroundPalette('purple');

  $mdThemingProvider.theme('dashboard-theme')
    .primaryPalette('orange')
    .accentPalette('brown');





});


module.config(function ($routeProvider, $locationProvider, $httpProvider) {

  if (DEV) {
    $httpProvider.interceptors.push('AuthInterceptor');
    $httpProvider.interceptors.push('LogInterceptor');
  }
  // Add the ETag interceptor for Codenvy API
  $httpProvider.interceptors.push('ETagInterceptor');
});


