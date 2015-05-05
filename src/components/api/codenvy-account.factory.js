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
 * This class is handling the account API retrieval
 * @author Ann Shumilova
 */
class CodenvyAccount {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor ($resource) {
    // keep resource
    this.$resource = $resource;
    this.accounts = [];
    this.subscriptionsPerAccount = new Map();

    // remote call
    this.remoteAccountAPI = this.$resource('/api/account',{}, {
      getByID: {method: 'GET', url: '/api/account/:accountId'},
      getSubscriptions: {method: 'GET', url: '/api/account/:accountId/subscriptions', isArray: true}
    });

    // fetch the accounts when we're initialized
    this.fetchAccounts();
  }

  getSaasServiceId() {
    return 'Saas';
  }

  getOnPremServiceId() {
    return 'OnPremises';
  }

  getPayAsYouGoPlanId() {
    return 'pay-as-you-go';
  }

  getPrepaidPlanId() {
    return 'prepaid';
  }


  /**
   * Gets the user data
   */
  fetchAccounts() {
    let promise = this.remoteAccountAPI.query().$promise;
    this.accounts = [];
    // check if if was OK or not
    let parsedResultPromise = promise.then((data) => {
      data.forEach((membership) => {
        if (membership.roles.indexOf('account/owner') >= 0) {
          this.accounts.push(membership.accountReference);
        }
      });
      //TODO remove this part, when switch between accounts is ready:
      if (this.accounts.length > 0) {
        this.setCurrentAccount(this.accounts[0]);
      }
    });
    return parsedResultPromise;
  }

  /**
   * Gets the accounts, where current user is owner
   * @returns {Array}
   */
  getAccounts() {
    return this.accounts;
  }

  getCurrentAccount() {
    return this.currentAccount;
  }

  setCurrentAccount(account) {
    this.currentAccount = account;
  }

  fetchSubscriptions(accountId) {
    let promise = this.remoteAccountAPI.getSubscriptions({accountId : accountId}).$promise;
    // check if if was OK or not
    let parsedResultPromise = promise.then((data) => {
      this.subscriptionsPerAccount.set(accountId, data);
    });
    return parsedResultPromise;
  }

  getSubscriptions(accountId) {
    return this.subscriptionsPerAccount.get(accountId);
  }
}

// Register this factory
Register.getInstance().factory('codenvyAccount', CodenvyAccount);
