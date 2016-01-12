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

import SubscriptionCtrl from '../subscriptions/subscription.controller';
import SubscriptionProposal from '../subscriptions/subscription-proposal.directive';
import OnpremSubscriptionInfo from '../subscriptions/onprem-subscription-info.directive';
import SaasSubscriptionInfo from '../subscriptions/saas-subscription-info.directive';

class SubscriptionConfig {

  constructor(register) {
    register.directive('subscriptionProposal', SubscriptionProposal);
    register.directive('onpremSubscriptionInfo', OnpremSubscriptionInfo);
    register.directive('saasSubscriptionInfo', SaasSubscriptionInfo);
    register.controller('SubscriptionCtrl', SubscriptionCtrl);


    // config routes
    register.app.config(function ($routeProvider) {
      $routeProvider.accessWhen('/subscriptions', {
        templateUrl: 'app/navbar/subscriptions/subscription.html',
        controller: 'SubscriptionCtrl',
        controllerAs: 'subscriptionCtrl',
        resolve: {
          check: ['$q', 'codenvyService', function ($q, codenvyService) {
            var defer = $q.defer();
            codenvyService.fetchServices().then(() => {
              if (codenvyService.isServiceAvailable('subscription')) {
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

export default SubscriptionConfig;
