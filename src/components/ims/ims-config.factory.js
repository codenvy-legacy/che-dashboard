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
 * This class is handling the interface with Installation Manager Server (IMS) configuration.
 */
class ImsConfigApi {

  /**
   * Default constructorfor the config API.
   * @ngInject for Dependency injection
   */
  constructor($resource) {

    // remote call
    this.remoteImsAPI = $resource('/im', {}, {
      getIMConfig: { method: 'GET', url: '/im/config' },
    });
  }

  /**
   * Returns Installation Manager Server configuration
   */
  getIMConfig() {
    let request = this.remoteImsAPI.getIMConfig();
    return request.$promise;
  }
}

// Register this factory
Register.getInstance().factory('imsConfigApi', ImsConfigApi);
