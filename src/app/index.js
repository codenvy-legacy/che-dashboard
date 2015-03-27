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
let module = angular.module('userDashboard', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngRoute', 'angular-websocket', 'ui.bootstrap', 'ui.codemirror', 'ngMaterial', 'ngMessages', 'angularMoment', 'angular.filter', 'ngDropdowns', 'ui.gravatar']);

import Register from '../components/utils/register';

// colors
import Colors from './colors/codenvy-color.constant.js';

// import components
import ComponentsConfig from '../components/components-config';

// import dashboard
import DashboardCtrl from './dashboard/dashboard.controller';

//
import DemoComponentsCtrl from './demo-components/demo-components.controller';



// import login
import LoginCtrl from './main/login.controller';

// import navabr
import NavBarCtrl from './navbar/navbar.controller';
import NavBar from './navbar/navbar.directive.js';

var instanceRegister = Register.getInstance();
instanceRegister.directive('cdvyNavBar', NavBar);
instanceRegister.controller('NavbarCtrl', NavBarCtrl);

// import projects
import FactoryConfig from './factories/factories-config';
new FactoryConfig(instanceRegister);

// import projects
import ProjectsConfig from './projects/projects-config';
new ProjectsConfig(instanceRegister);



// and setup controllers
module.controller('DashboardCtrl', DashboardCtrl)
  .controller('LoginCtrl', LoginCtrl)
  .controller('DemoComponentsCtrl', DemoComponentsCtrl);



// config routes
module.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'DashboardCtrl'
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
      return response || $q.when(response);
    },
    responseError: function (rejection) {

      // handle only api call
      if (rejection.config.url.indexOf('localhost') > 0 || rejection.config.url.indexOf('/api/user') > 0) {
        if (rejection.status === 401 || rejection.status === 403) {
          $log.info('Redirect to login page.');
          $location.path('/login');

        }
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
      console.log('RemoteCall:', config.url, config.method);
      return config || $q.when(config);
    },
    response: function(response) {
      //console.log('RemoteCall:', response);
      return response || $q.when(response);
    }
  };
});


module.config(function($mdThemingProvider, jsonColors) {

  var codenvyColors = angular.fromJson(jsonColors);
  var getColor = function(key) {
    var color = codenvyColors[key];
    if (!color) {
      // return a flashy red color if color is undefined
      console.log('error, the color' + key + 'is undefined');
      return '#ff0000';
    }
    if (color.indexOf('$') == 0) {
      color = getColor(color);
    }
    return color;

  }


  var codenvyMap = $mdThemingProvider.extendPalette('indigo', {
    '500': getColor('$dark-menu-color'),
    '300' : 'D0D0D0'
  });
  $mdThemingProvider.definePalette('codenvy', codenvyMap);

  var codenvyDangerMap = $mdThemingProvider.extendPalette('red', {
  });
  $mdThemingProvider.definePalette('codenvyDanger', codenvyDangerMap);

  var codenvyDefaultMap = $mdThemingProvider.extendPalette('blue', {
    'A400'  : '538DAB'/*,
     '700': '538DAB'*/
  });
  $mdThemingProvider.definePalette('codenvyDefault', codenvyDefaultMap);


  var codenvyAccentMap = $mdThemingProvider.extendPalette('green', {
    '700' : getColor('$codenvy-green-color'),
    'A400': getColor('$codenvy-green-color'),
    'A200': getColor('$codenvy-green-color'),
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

  var codenvyGreyPalette = $mdThemingProvider.extendPalette('grey', {
    'A100' : 'efefef',
    'contrastDefaultColor': 'light'
  });
  $mdThemingProvider.definePalette('codenvyGrey', codenvyGreyPalette);

  $mdThemingProvider.theme('danger')
    .primaryPalette('codenvy')
    .accentPalette('codenvyDanger')
    .backgroundPalette('grey');


  $mdThemingProvider.theme('cdvydefault')
    .primaryPalette('codenvy')
    .accentPalette('codenvyDefault')
    .backgroundPalette('grey');

  $mdThemingProvider.theme('default')
    .primaryPalette('codenvy')
    .accentPalette('codenvyAccent')
    .backgroundPalette('grey');

  $mdThemingProvider.theme('toolbar-theme')
    .primaryPalette('toolbarPrimaryPalette')
    .accentPalette('toolbarAccentPalette');

  $mdThemingProvider.theme('factory-theme')
    .primaryPalette('light-blue')
    .accentPalette('pink')
    .warnPalette('red')
    .backgroundPalette('purple');

  $mdThemingProvider.theme('maincontent-theme')
    .primaryPalette('codenvy')
    .accentPalette('codenvyAccent')
    .backgroundPalette('codenvyGrey');


});

module.constant('userDashboardConfig', {
  developmentMode: DEV
});

module.config(function ($routeProvider, $locationProvider, $httpProvider) {

  if (DEV) {
    $httpProvider.interceptors.push('AuthInterceptor');
    $httpProvider.interceptors.push('LogInterceptor');
  }
  // Add the ETag interceptor for Codenvy API
  $httpProvider.interceptors.push('ETagInterceptor');
});


angular.module('ui.gravatar').config(['gravatarServiceProvider', function(gravatarServiceProvider) {
    gravatarServiceProvider.defaults = {
      size     : 43,
      "default": 'mm'  // Mystery man as default for missing avatars
    };

    // Use https endpoint
    gravatarServiceProvider.secure = true;

  }
]);
