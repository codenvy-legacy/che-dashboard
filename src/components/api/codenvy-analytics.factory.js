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
 * This class is handling the API for sending data for Codenvy Analytics.
 * @author Ann Shumilova
 */
class CodenvyAnalytics {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor ($resource) {
    this.$resource = $resource;
    // remote call
    this.remoteAnalytisAPI = this.$resource('/api/analytics/log/',{}, {
      log: {method: 'POST', url: '/api/analytics/log/dashboard-usage'}
    });
  }

  logAction(action) {
    let data = {params : {ACTION : action}};
    let promise = this.remoteAnalytisAPI.log(data).$promise;
    promise.then(() => {}, (error) => {console.log(error);});
  }
}

// Register this factory
Register.getInstance().factory('codenvyAnalytics', CodenvyAnalytics);
