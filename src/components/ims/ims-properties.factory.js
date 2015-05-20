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
 * This class is handling server-wide properties load/store.
 */
class ImsPropertiesApi {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor($resource) {

    // remote call
    this.remoteImsAPI = $resource('/im/property', {}, {
      getProperty: { method: 'GET', url:'/im/property?name=:propertyName' },
      storeProperty: { method: 'POST' }
    });

    this.propertiesMap = new Map();
  }


  fetchProperty(propertyName) {
    let propertyRetrieval = this.remoteImsAPI.getProperty({propertyName: propertyName});
    let updatedPromise = propertyRetrieval.$promise.then((data) => {
      if (data[propertyName]) {
        this.propertiesMap.set(propertyName, data[propertyName]);
      } else {
        this.propertiesMap.set(propertyName, '');
      }
    });
    return updatedPromise;
  }

  /**
   * Returns the value of the property.
   * @param propertyName the name of the desired property
   * @returns a promise on the property value
   */
  getProperty(propertyName) {
    return this.propertiesMap.get(propertyName);
  }

  /**
   * Returns the given properties.
   * @param properties an array containing the names of the desired properties
   * @returns a promise on the map of the properties
   */
  getProperties(properties) {
    let param = { name: properties };
    return this.remoteImsAPI.getProperty(param);
  }

  /**
   * Stores the given properties.
   * @param properties an object which properties will be used as key:value property pairs
   * @returns a promise (value is not defined)
   */
  storeProperties(properties) {
    return this.remoteImsAPI.storeProperty({}, properties).$promise;
  }

  storeProperty(key, value) {
    let param = {};
    param[key] = value;
    return this.remoteImsAPI.storeProperty(param).$promise;
  }
}

// Register this factory
Register.getInstance().factory('imsPropertiesApi', ImsPropertiesApi);
