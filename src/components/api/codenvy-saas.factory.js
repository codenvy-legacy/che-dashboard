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
 * This class is handling the Saas API retrieval
 * @author Ann Shumilova
 */
class CodenvySaas {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor ($resource) {
    // keep resource
    this.$resource = $resource;
    this.usedResourcesPerAccount = new Map();
    this.providedResourcesPerAccount = new Map();

    // remote call
    this.remoteSaasAPI = this.$resource('/api/saas',{}, {
      getUsedResources: {method: 'GET', url: '/api/resources/:accountId/used', isArray: true},
      getProvidedResources: {method: 'GET', url: '/api/saas/resources/:accountId/provided'}
    });
  }

  fetchUsedResources(accountId) {
    let promise = this.remoteSaasAPI.getUsedResources({accountId : accountId}).$promise;
    // check if if was OK or not
    let parsedResultPromise = promise.then((data) => {
      this.usedResourcesPerAccount.set(accountId, data);
    }, (error) => {
      if (error.status !== 304) {
        console.log(error);
      }
    });
    return parsedResultPromise;
  }

  getUsedResources(accountId) {
    return this.usedResourcesPerAccount.get(accountId);
  }

  fetchProvidedResources(accountId) {
    let promise = this.remoteSaasAPI.getProvidedResources({accountId : accountId}).$promise;
    // check if if was OK or not
    let parsedResultPromise = promise.then((data) => {
      this.providedResourcesPerAccount.set(accountId, data);
    }, (error) => {
      if (error.status !== 304) {
        console.log(error);
      }
    });
    return parsedResultPromise;
  }

  getProvidedResources(accountId) {
    return this.providedResourcesPerAccount.get(accountId);
  }
}

// Register this factory
Register.getInstance().factory('codenvySaas', CodenvySaas);
