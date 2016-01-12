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

import Register from '../utils/register.js';

/**
 * This class is handling the API for sending data for Codenvy Analytics.
 * @author Ann Shumilova
 */
class CodenvyAnalytics {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($resource, $cookies) {
    this.$resource = $resource;
    this.$cookies = $cookies;
    // remote call
    this.remoteAnalytisAPI = this.$resource('/api/analytics/log/', {}, {
      log: {method: 'POST', url: '/api/analytics/log/dashboard-usage'},
      user_invite: {method: 'POST', url: '/api/analytics/log/user-invite'},
      factory_used: {
        method: 'GET',
        url: '/api/analytics/public-metric/factory_used?factory_id=:factoryId'
      },
      sessionUsage: {method: 'POST', url: '/api/analytics/log/session-usage'}
    });

  }

  // need to send to analytics an event
  userInviteAction(workspaceId, email) {
    let data = {params: {'WS':workspaceId, 'EMAIL': email}};
    return this.remoteAnalytisAPI.user_invite(data).$promise;
  }

  logAction(action) {
    let data = {params: {ACTION: action}};
    let promise = this.remoteAnalytisAPI.log(data).$promise;
    promise.then(() => {
    }, (error) => {
      console.log(error);
    });
  }

  /**
   * Get the factory used info for the factoryIdgulp serve
   * @param factoryId the factory Id
   * @returns {*|promise|n|N}
   */
  getFactoryUsedFromId(factoryId) {
    return this.remoteAnalytisAPI.factory_used({factoryId: factoryId}).$promise;
  }

  logSession(id) {
    let data = {
      params: {
        'SESSION-ID': id,
        'WINDOW': 'DASHBOARD'
      }
    };
    let promise = this.remoteAnalytisAPI.sessionUsage(data).$promise;
    promise.then(() => {
    }, (error) => {
      console.log(error);
    });
  }

}

// Register this factory
Register.getInstance().factory('codenvyAnalytics', CodenvyAnalytics);
