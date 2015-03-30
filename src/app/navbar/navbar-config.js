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

import NavBarCtrl from '../navbar/navbar.controller';
import NavBar from '../navbar/navbar.directive.js';
import AccountCtrl from '../navbar/account/account.controller';
import BillingCtrl from '../navbar/billing/billing.controller';
import SubscriptionCtrl from '../navbar/subscriptions/subscription.controller';

class NavbarConfig {

  constructor(register) {
    register.directive('cdvyNavBar', NavBar);

    register.controller('NavbarCtrl', NavBarCtrl);
    register.controller('AccountCtrl', AccountCtrl);
    register.controller('BillingCtrl', BillingCtrl);
    register.controller('SubscriptionCtrl', SubscriptionCtrl);


    // config routes
    register.app.config(function ($routeProvider) {
      $routeProvider.when('/account', {
        templateUrl: 'app/navbar/account/account.html',
        controller: 'AccountCtrl',
        controllerAs: 'accountCtrl'
      })
        .when('/billing', {
          templateUrl: 'app/navbar/billing/billing.html',
          controller: 'BillingCtrl',
          controllerAs: 'billingCtrl'
        })
        .when('/subscriptions', {
          templateUrl: 'app/navbar/subscriptions/subscription.html',
          controller: 'SubscriptionCtrl',
          controllerAs: 'subscriptionCtrl'
        });

    });

  }
}


export default NavbarConfig;
