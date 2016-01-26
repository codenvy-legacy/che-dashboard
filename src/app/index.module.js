/*
 * Copyright (c) 2015-2016 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 */
'use strict';

import {Register} from '../components/utils/register';

import {ComponentsConfig} from '../components/components-config';

import {AdminsConfig} from './admin/admin-config';
import {CodenvyColorsConfig} from './colors/codenvy-color.constant';
import {CodenvyCountriesConfig} from './countries/codenvy-countries.constant';
import {DashboardConfig} from './dashboard/dashboard-config';
// switch to a config
import {DemoComponentsCtrl} from './demo-components/demo-components.controller';
import {FactoryConfig} from './factories/factories-config';
import {IdeConfig} from './ide/ide-config';
// switch to a config
import {LoginCtrl} from './main/login.controller';
import {NavbarConfig} from './navbar/navbar-config';
import {OnBoardScreenConfig} from './onboard/onboard-screen-config';

//onprem
import {ResetServerPropsCtrl} from './onprem/admin/reset-server-properties/reset-server-properties.controller';
import {OnPremisesConfig} from './onpremises/onpremises-config';

import {ProjectsConfig} from './projects/projects-config';
import {ProxySettingsConfig} from './proxy/proxy-settings.constant';
import {WorkspacesConfig} from './workspaces/workspaces-config';


// init module
let initModule = angular.module('userDashboard', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngRoute',
  'angular-websocket', 'ui.bootstrap', 'ui.codemirror', 'ngMaterial', 'ngMessages', 'angularMoment', 'angular.filter',
  'ngDropdowns', 'ui.gravatar', 'ngLodash', 'braintree-angular', 'angularCharts', 'ngPasswordStrength', 'ngClipboard',
  'gavruk.card', 'uuid4', 'angularFileUpload']);



// add a global resolve flag on all routes (user needs to be resolved first)
initModule.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.accessWhen = function(path, route) {
    route.resolve || (route.resolve = {});
    route.resolve.app = ['cheBranding', '$q', 'codenvyProfile', 'codenvyUser', function (cheBranding, $q, codenvyProfile, codenvyUser) {
      var deferred = $q.defer();

      codenvyUser.fetchUser().then(() => {
        let profilePreferences = codenvyProfile.getPreferences();
        if (profilePreferences && profilePreferences.$resolved) {
          deferred.resolve();
        } else {
          profilePreferences.$promise.then(() => {
            deferred.resolve();
          }, (error) => {
            deferred.reject(error);
          });
        }
      }, (error) => {
        deferred.reject(error);
      });

      return deferred.promise;
    }];

    return $routeProvider.when(path, route);
  };

  $routeProvider.accessOtherWise = function(route) {
    route.resolve || (route.resolve = {});
    route.resolve.app = ['$q', 'codenvyProfile', 'codenvyUser', function ($q, codenvyProfile, codenvyUser) {
      var deferred = $q.defer();

      codenvyUser.fetchUser().then(() => {
        let profilePreferences = codenvyProfile.getPreferences();
        if (profilePreferences && profilePreferences.$resolved) {
          deferred.resolve();
        } else {
          profilePreferences.$promise.then(() => {
            deferred.resolve();
          }, (error) => {
            deferred.reject(error);
          });
        }
      }, (error) => {
        deferred.reject(error);
      });

      return deferred.promise;
    }];
    return $routeProvider.otherwise(route);
  };


}]);

var DEV = true;

// and setup controllers
initModule.controller('LoginCtrl', LoginCtrl);

if (DEV) {
  initModule.controller('DemoComponentsCtrl', DemoComponentsCtrl)
    .controller('ResetServerPropsCtrl', ResetServerPropsCtrl);
}


// config routes
initModule.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .accessWhen('/login', {
      templateUrl: 'app/main/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'loginCtrl'
    })
    .accessOtherWise({
      redirectTo: '/projects'
    });


  // add demo page
  if (DEV) {
    $routeProvider.accessWhen('/demo-components', {
      templateUrl: 'app/demo-components/demo-components.html',
      controller: 'DemoComponentsCtrl',
      controllerAs: 'demoComponentsCtrl'
    });
    $routeProvider.accessWhen('/onprem/admin/reset-server-properties', {
      templateUrl: 'app/onprem/admin/reset-server-properties/reset-server-properties.html',
      controller: 'ResetServerPropsCtrl',
      controllerAs: 'resetServerPropsCtrl'
    });

  }

}]);



/**
 * This module check if we have an authenticated user and if not, redirect it to login page
 */
class CheckLogin {


  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor (codenvyUser) {
    this.codenvyUser = codenvyUser;
  }

  checkPage(path) {
    if ('app/main/login.html' === path) {
      return true;
    }
    return false;
  }


  checkRedirect() {
    let user = this.codenvyUser.getUser();
    // User is not admin and user has no email it needs to be logged in
    if (!this.codenvyUser.isAdmin() && !user.email) {
      return {route:'/login'};
    }

    return {};


  }

}


/**
 * Setup route redirect module
 */
initModule.run(['$rootScope', '$location', 'routingRedirect', 'codenvyUser', '$timeout', 'ideIFrameSvc', 'codenvyIdeFetcher', 'routeHistory',
  function ($rootScope, $location, routingRedirect, codenvyUser, $timeout, ideIFrameSvc, codenvyIdeFetcher, routeHistory) {

    $rootScope.hideLoader = false;
    $rootScope.waitingLoaded = false;
    $rootScope.showIDE = false;

    // here only to create instances of these components
    codenvyIdeFetcher;
    routeHistory;

    /**
     * Add default redirect to login in dev mode
     */
    if (DEV) {
      routingRedirect.addRouteCallback(new CheckLogin(codenvyUser));
    }

    $rootScope.$on('$viewContentLoaded', function() {
      ideIFrameSvc.addIFrame();

      $timeout(function() {
        if (!$rootScope.hideLoader) {
          if (!$rootScope.wantTokeepLoader) {
            $rootScope.hideLoader = true;
          } else {
            $rootScope.hideLoader = false;
          }
        }
        $rootScope.waitingLoaded = true;
      }, 1000);
    });

    $rootScope.$on('$routeChangeStart', (event, next)=> {
      if (DEV) {
        console.log('$routeChangeStart event with route', next);
      }
    });

    // When a route is about to change, notify the routing redirect node
    $rootScope.$on('$routeChangeSuccess', (event, next) => {
      if (next.resolve) {
        if (DEV) {
          console.log('$routeChangeSuccess event with route', next);
        }// check routes
        routingRedirect.check(event, next);
      }
    });

    $rootScope.$on('$routeChangeError', () => {
      $location.path('/');
    });
  }]);


// add interceptors
initModule.factory('AuthInterceptor', function ($window, $cookies, $q, $location, $log) {
  return {
    request: function(config) {
      //remove prefix url
      if (config.url.indexOf('https://codenvy.com/api') === 0) {
        config.url = config.url.substring('https://codenvy.com'.length);
      }

      //Do not add token on auth login
      if (config.url.indexOf('/api/auth/login') === -1 && config.url.indexOf('api/') !== -1 && $window.sessionStorage['codenvyToken']) {
        config.params = config.params || {};
        angular.extend(config.params, {token: $window.sessionStorage['codenvyToken']});
      }
      return config || $q.when(config);
    },
    response: function(response) {
      return response || $q.when(response);
    },
    responseError: function (rejection) {

      // handle only api call
      if (rejection.config) {
        if (rejection.config.url.indexOf('localhost') > 0 || rejection.config.url.indexOf('/api/user') > 0) {
          if (rejection.status === 401 || rejection.status === 403) {
            $log.info('Redirect to login page.');
            $location.path('/login');

          }
        }
      }
      return $q.reject(rejection);
    }
  };
});

// add interceptors
initModule.factory('ETagInterceptor', function ($window, $cookies, $q) {

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
initModule.factory('LogInterceptor', function ($q) {


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


initModule.config(function($mdThemingProvider, jsonColors) {

  var cheColors = angular.fromJson(jsonColors);
  var getColor = function(key) {
    var color = cheColors[key];
    if (!color) {
      // return a flashy red color if color is undefined
      console.log('error, the color' + key + 'is undefined');
      return '#ff0000';
    }
    if (color.indexOf('$') === 0) {
      color = getColor(color);
    }
    return color;

  };


  var cheMap = $mdThemingProvider.extendPalette('indigo', {
    '500': getColor('$dark-menu-color'),
    '300' : 'D0D0D0'
  });
  $mdThemingProvider.definePalette('che', cheMap);

  var cheDangerMap = $mdThemingProvider.extendPalette('red', {
  });
  $mdThemingProvider.definePalette('cheDanger', cheDangerMap);

  var cheWarningMap = $mdThemingProvider.extendPalette('orange', {
    'contrastDefaultColor': 'light'
  });
  $mdThemingProvider.definePalette('cheWarning', cheWarningMap);

  var cheDefaultMap = $mdThemingProvider.extendPalette('blue', {
    'A400'  : getColor('$che-medium-blue-color')
  });
  $mdThemingProvider.definePalette('cheDefault', cheDefaultMap);

  var cheNoticeMap = $mdThemingProvider.extendPalette('blue', {
    'A400'  : getColor('$mouse-gray-color')
  });
  $mdThemingProvider.definePalette('cheNotice', cheNoticeMap);




  var cheAccentMap = $mdThemingProvider.extendPalette('blue', {
    '700' : getColor('$che-medium-blue-color'),
    'A400': getColor('$che-medium-blue-color'),
    'A200': getColor('$che-medium-blue-color'),
    'contrastDefaultColor': 'light'
  });
  $mdThemingProvider.definePalette('cheAccent', cheAccentMap);


  var cheNavyPalette = $mdThemingProvider.extendPalette('purple', {
    '500' : getColor('$che-navy-color'),
    'contrastDefaultColor': 'light'
  });
  $mdThemingProvider.definePalette('cheNavyPalette', cheNavyPalette);


  var toolbarPrimaryPalette = $mdThemingProvider.extendPalette('purple', {
    '500' : getColor('$che-navy-color'),
    'contrastDefaultColor': 'light'
  });
  $mdThemingProvider.definePalette('toolbarPrimaryPalette', toolbarPrimaryPalette);

  var toolbarAccentPalette = $mdThemingProvider.extendPalette('purple', {
    'A200' : 'EF6C00',
    '700' : 'E65100',
    'contrastDefaultColor': 'light'
  });
  $mdThemingProvider.definePalette('toolbarAccentPalette', toolbarAccentPalette);

  var cheGreyPalette = $mdThemingProvider.extendPalette('grey', {
    'A100' : 'efefef',
    'contrastDefaultColor': 'light'
  });
  $mdThemingProvider.definePalette('cheGrey', cheGreyPalette);

  $mdThemingProvider.theme('danger')
    .primaryPalette('che')
    .accentPalette('cheDanger')
    .backgroundPalette('grey');

  $mdThemingProvider.theme('warning')
    .primaryPalette('che')
    .accentPalette('cheWarning')
    .backgroundPalette('grey');


  $mdThemingProvider.theme('cdvydefault')
    .primaryPalette('che')
    .accentPalette('cheDefault')
    .backgroundPalette('grey');


  $mdThemingProvider.theme('cdvynotice')
    .primaryPalette('che')
    .accentPalette('cheNotice')
    .backgroundPalette('grey');

  $mdThemingProvider.theme('default')
    .primaryPalette('che')
    .accentPalette('cheAccent')
    .backgroundPalette('grey');

  $mdThemingProvider.theme('toolbar-theme')
    .primaryPalette('toolbarPrimaryPalette')
    .accentPalette('toolbarAccentPalette');

  $mdThemingProvider.theme('factory-theme')
    .primaryPalette('light-blue')
    .accentPalette('pink')
    .warnPalette('red')
    .backgroundPalette('purple');

  $mdThemingProvider.theme('onboarding-theme')
    .primaryPalette('cheNavyPalette')
    .accentPalette('pink')
    .warnPalette('red')
    .backgroundPalette('purple');

  $mdThemingProvider.theme('dashboard-theme')
    .primaryPalette('cheNavyPalette')
    .accentPalette('pink')
    .warnPalette('red')
    .backgroundPalette('purple');

  $mdThemingProvider.theme('maincontent-theme')
    .primaryPalette('che')
    .accentPalette('cheAccent')
    .backgroundPalette('cheGrey');


});

initModule.constant('userDashboardConfig', {
  developmentMode: DEV
});

initModule.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

  if (DEV) {
    $httpProvider.interceptors.push('AuthInterceptor');
    $httpProvider.interceptors.push('LogInterceptor');
  }
  // Add the ETag interceptor for Codenvy API
  $httpProvider.interceptors.push('ETagInterceptor');
}]);


angular.module('ui.gravatar').config(['gravatarServiceProvider', function(gravatarServiceProvider) {
  gravatarServiceProvider.defaults = {
    size     : 43,
    default: 'mm'  // Mystery man as default for missing avatars
  };

  // Use https endpoint
  gravatarServiceProvider.secure = true;

}
]);

var instanceRegister = new Register(initModule);

new ProxySettingsConfig(instanceRegister);
new CodenvyColorsConfig(instanceRegister);
new CodenvyCountriesConfig(instanceRegister);
new ComponentsConfig(instanceRegister);
new AdminsConfig(instanceRegister);
new IdeConfig(instanceRegister);
new OnPremisesConfig(instanceRegister);

new NavbarConfig(instanceRegister);
new OnBoardScreenConfig(instanceRegister);
new ProjectsConfig(instanceRegister);
new WorkspacesConfig(instanceRegister);
new DashboardConfig(instanceRegister);
new FactoryConfig(instanceRegister);

