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
 * This class is handling the interface with Installation Manager Server (IMS) configuration.
 */
class ImsConfigApi {

  /**
   * Default constructorfor the config API.
   * @ngInject for Dependency injection
   */
  constructor($resource) {

    // remote call
    this.remoteImsAPI = $resource('/im/codenvy/properties', {}, {
      getIMConfig: { method: 'GET' },
      getIMConfigProperty: { method: 'GET', url: '/im/codenvy/properties/:key' },
      setIMConfig: { method: 'PUT' }
    });
  }

  /**
   * Returns Installation Manager Server configuration
   */
  getIMConfig() {
    return this.remoteImsAPI.getIMConfig();
  }

  getIMConfigProperty(propertyName) {
    let param = { key: propertyName };
    return this.remoteImsAPI.getIMConfigProperty(param);
  }

  /**
   * Add the given values to the codenvy configuration.
   * @param it an iterator for [key, value] arrays
   */
  setIMConfig(it) {
    let payload = {};
    for (let [key, value] of it) {
      payload[key] = value;
    }
    return this.remoteImsAPI.setIMConfig(payload);
  }
}

// Register this factory
Register.getInstance().factory('imsConfigApi', ImsConfigApi);
