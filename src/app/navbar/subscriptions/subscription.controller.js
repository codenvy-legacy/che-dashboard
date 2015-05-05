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

import {subscriptionOffers, subscriptionDetails} from '../subscriptions/subscriptions';

class SubscriptionCtrl {
  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor (codenvyAPI, $location, $window) {
      this.codenvyAPI = codenvyAPI;
      this.$location = $location;
      this.$window = $window;
      this.proposals = [];
      this.subscriptions = [];

      if (this.codenvyAPI.getAccount().getAccounts().length > 0) {
        this.fetchSubscriptions();
      } else {
        this.codenvyAPI.getAccount().fetchAccounts().then(() => {
          this.fetchSubscriptions;
        });
      }
  }

  fetchSubscriptions() {
    let currentAccount = this.codenvyAPI.getAccount().getCurrentAccount();
    this.codenvyAPI.getAccount().fetchSubscriptions(currentAccount.id).then(() => {
      this.processSubscriptions(this.codenvyAPI.getAccount().getSubscriptions(currentAccount.id));
    }, (error) => {
      if (error.status === 304) {
        this.processSubscriptions(this.codenvyAPI.getAccount().getSubscriptions(currentAccount.id));
      }
    });
  }

  /**
   * Checks the list of subscriptions, if subscription exists - prepares it's display info,
   * if not adds new proposals. There two types of subscriptions : on-premises and saas(pay-as-you-go).
  */
  processSubscriptions(subscriptions) {
    let services = _.pluck(subscriptions, 'serviceId');
    let hasOnPremises = services.indexOf(this.codenvyAPI.getAccount().getOnPremServiceId()) >= 0;
    let saasServiceId = this.codenvyAPI.getAccount().getSaasServiceId();
    let onPremServiceId = this.codenvyAPI.getAccount().getOnPremServiceId();

    let saasSubscription = _.find(subscriptions, function (subscription) {
      return subscription.serviceId === saasServiceId;
    });

    let onPremSubscription = _.find(subscriptions, function (subscription) {
      return subscription.serviceId === onPremServiceId;
    });

    if (saasSubscription) {
      if (saasSubscription.properties && saasSubscription.properties['Package'] && saasSubscription.properties['Package'] === 'Community'){
        this.proposals.push(this.getPayAsYouGoProposal());
      } else if (saasSubscription.planId === this.codenvyAPI.getAccount().getPayAsYouGoPlanId()) {
        this.fillPayAsYouGoDetails(saasSubscription);
        this.subscriptions.push(saasSubscription);
      } else if (saasSubscription.planId === this.codenvyAPI.getAccount().getPrepaidPlanId()) {
        this.fillPrePaidDetails(saasSubscription);
        this.subscriptions.push(saasSubscription);
      }
    } else {
      this.proposals.push(this.getPayAsYouGoProposal());
    }

    if (hasOnPremises) {
      this.fillOnPremDetails(onPremSubscription);
      this.subscriptions.push(onPremSubscription);
    } else {
      this.proposals.push(this.getOnPremProposal());
    }
  }

  fillPayAsYouGoDetails(saasSubscription) {
    var ctrl = this;

    let details = _.find(subscriptionDetails, function (detail) {
      return detail.type === 'pay-as-you-go';
    });

    saasSubscription.title = details.title;
    saasSubscription.description = details.description;
    saasSubscription.icon = details.icon;
    saasSubscription.buttonTitle = details.buttonTitle;
    saasSubscription.cancel = function() {
      ctrl.cancelPayAsYouGo(ctrl.$location);
    };
  }

  fillPrePaidDetails(prepaidSubscription) {
    var ctrl = this;
    let details = _.find(subscriptionDetails, function (detail) {
      return detail.type === 'prepaid';
    });

    let prepaid = prepaidSubscription.properties.PrepaidGbH;
    prepaidSubscription.title = details.title;
    prepaidSubscription.description = prepaid + details.description;
    prepaidSubscription.icon = details.icon;
    prepaidSubscription.buttonTitle = details.buttonTitle;
    prepaidSubscription.cancel = function() {
      ctrl.cancelPrePaid(ctrl.$window);
    };
  }

  fillOnPremDetails(onPremSubscription) {
    var ctrl = this;
    let details = _.find(subscriptionDetails, function (detail) {
      return detail.type === 'on-prem';
    });

    onPremSubscription.title = details.title;
    onPremSubscription.description = details.description;
    onPremSubscription.icon = details.icon;
    onPremSubscription.buttonTitle = details.buttonTitle;
    onPremSubscription.cancel = function() {
      ctrl.cancelOnPrem(ctrl.$window);
    };
  }

  getPayAsYouGoProposal() {
    var ctrl = this;
    let payAsYouGoOffer = _.find(subscriptionOffers, function (offer) {
      return offer.type === 'pay-as-you-go';
    });

    payAsYouGoOffer.buy = function() {
        ctrl.onPayAsYouGoChoosen(ctrl.$location);
      }
    };
    return payAsYouGoOffer;
  }

  onPayAsYouGoChoosen($location) {
    $location.path('billing');
  }

  onPremChoosen($window) {
    $window.open('https://codenvy.com/products/onprem', '_blank');
  }

  cancelPayAsYouGo(location) {
    location.path('billing');
  }

  cancelPrePaid($window) {
    $window.location.href =  'mailto:sales@codenvy.com?subject=' + escape('Cancellation of Pre-Paid Subscription');
  }

  cancelOnPrem($window) {
    $window.location.href =  'mailto:sales@codenvy.com?subject=' + escape('Cancellation of On-Prem Subscription');
  }


  getOnPremProposal() {
    var ctrl = this;
    let onPremOffer = _.find(subscriptionOffers, function (offer) {
      return offer.type === 'on-prem';
    });
    onPremOffer.buy = function() {
      ctrl.onPremChoosen(ctrl.$window);
    };
    return onPremOffer;
  }
}

export default SubscriptionCtrl;
