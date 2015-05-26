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

import Register from '../utils/register.js';

/**
 * This class is handling the interface with Installation Manager Server (IMS) part of the API that relates to subscriptions.
 */
class ImsSubscriptionApi {

  /**
   * Default constructor for the subscription API.
   * @ngInject for Dependency injection
   */
  constructor($resource) {

    // remote call
    this.remoteImsAPI = {
      addTrialSubscription: () => $http.post('/im/subscription'),
      checkSubscription: () => $http.get('/im/subscription')
    };
  }

  /**
   * Checks if the user logged on SaaS has an active on-prem subscription.
   */
  checkOnPremisesSubscription() {
    let serverPromise = this.remoteImsAPI.checkSubscription();
    this.promise =  serverPromise.then(response => this._gotSubscription(response)).catch(response => this._failedSubscription(response));
    return this.promise;
  }

  _gotSubscription(response) {
    return response.data;
  }

  _failedSubscription(response) {
    switch (response.status) {
      case 404:// Subscription not found
        return { state: 'NO_SUBSCRIPTION' };
      case 403:// SaaS User is not authenticated or authentication token is expired
      case 500:// server error
      default:// unspecified error
        throw response.status;
    }
  }
}

// Register this factory
Register.getInstance().factory('imsSubscriptionApi', ImsSubscriptionApi);
