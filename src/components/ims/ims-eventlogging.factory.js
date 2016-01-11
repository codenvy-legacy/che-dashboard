/*
 * Copyright (c) 2012-2016 Codenvy, S.A.
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
 * This class is handling the interface with Installation Manager Server (IMS) SaaS logging events API.
 */
class ImsEventLoggingApi {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($resource) {

    // remote call
    this.remoteImsAPI = $resource('/im', {}, {
      logSaasAnalyticsEvent: { method: 'POST', url: '/im/event' }
    });
  }

  /**
   * Returns a promise for the "logged event" state.
   */
  logSaasAnalyticsEvent(event) {
    return this.remoteImsAPI.logSaasAnalyticsEvent(event).$promise;
  }

  /**
   * Returns a promise for the "logged 'CDEC_FIRST_LOGIN' event" state.
   */
  logSaasCdecFirstLoginEvent() {
    let event = { type: 'CDEC_FIRST_LOGIN', parameters: {}};
    return this.logSaasAnalyticsEvent(event);
  }
}

// Register this factory
Register.getInstance().factory('imsEventLoggingApi', ImsEventLoggingApi);
