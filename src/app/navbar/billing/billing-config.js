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

import BillingCtrl from '../billing/billing.controller';
import BalanceSimple from '../billing/balance-simple.directive';
import BalanceExtended from '../billing/balance-extended.directive';

class BillingConfig {

  constructor(register) {
    register.controller('BillingCtrl', BillingCtrl);
    register.directive('balanceSimple', BalanceSimple);
    register.directive('balanceExtended', BalanceExtended);

    // config routes
    register.app.config(function ($routeProvider) {
      $routeProvider.accessWhen('/billing', {
          templateUrl: 'app/navbar/billing/billing.html',
          controller: 'BillingCtrl',
          controllerAs: 'billingCtrl',
          resolve: {
            check: ['$q', 'codenvyService', function ($q, codenvyService) {
              var defer = $q.defer();
              codenvyService.fetchServices().then(() => {
                if (codenvyService.isServiceAvailable('saas')) {
                  defer.resolve();
                } else {
                  defer.reject();
                }
              });
              return defer.promise;
            }]
          }
        });
    });
  }
}

export default BillingConfig;
