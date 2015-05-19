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
 * This class is handling the interface with Installation Manager Server (IMS) SaaS login API.
 */
class ImsSaasAuthApi {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($resource) {

    // remote call
    this.remoteImsAPI = $resource('/im', {}, {
      logOnSaas: { method: 'POST', url: '/im/login' }
    });

  }

  /**
   * Returns a promise for the "logged-in" state.
   */
  logOnSaas(username, password) {
    // try to refresh if user is not yet logged in
    if (!this.promise) {
      this.requestLogin(username, password);
    }
    return this.promise;
  }

  requestLogin(username, password) {
    let credentials = { username: username, password: password };
    let saasAuth = this.remoteImsAPI.logOnSaas(credentials);
    this.promise = saasAuth.$promise;

    // If login failed, reset promise for next try
    this.promise.catch(() => { this.promise = undefined; });
  }

  resetLogin() {
    this.promise = undefined;
  }
}

// Register this factory
Register.getInstance().factory('imsSaasAuthApi', ImsSaasAuthApi);
