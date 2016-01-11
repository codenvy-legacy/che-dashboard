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
 * This class is handling server-wide properties load/store.
 */
class ImsPropertiesApi {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor($resource, $q) {
    this.$q = $q;
    // remote call
    this.remoteImsAPI = $resource('/im/storage/properties/:name', {}, {
      getAllProperties: { method: 'GET', url: '/im/storage/properties/'},
      getProperty: { method: 'GET', transformResponse: function(data) {
        // wrap answer in a content
        return {content: data};
      }},
      storeProperty: { method: 'POST' },
      putProperty: { method: 'PUT', url: '/im/storage/properties/', headers: { 'Content-Type': 'text/plain;charset=utf-8' } },
      deleteProperty: { method: 'DELETE' }
    });

    this.propertiesMap = new Map();
  }


  fetchProperty(propertyName) {
    let propertyRetrieval = this.remoteImsAPI.getProperty({ name: propertyName });
    let updatedPromise = propertyRetrieval.$promise.then((data) => {
      if (data.content) {
        this.propertiesMap.set(propertyName, data.content);
      } else {
        this.propertiesMap.set(propertyName, '');
      }
    }, () => {
      // if not found, set empty value
      this.propertiesMap.set(propertyName, '');
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

  _handleGetError(resource, error) {
    console.log('_handleGetError error', error);
    console.log('_handleGetError resource', resource);
  }

  getAllProperties() {
    let allPropsResource = this.remoteImsAPI.getAllProperties();
    // store all properties
    return allPropsResource.$promise.then(data => this._cacheProperties(data));
  }

  _cacheProperties(data) {
    for (let property of Object.keys(data)) {
      // must ignore $resource-polluted properties
      if (property !== '$promise' && property !== '$resolved') {
        this.propertiesMap.set(property, data[property]);
      }
    }
    return data;
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
    let promiseSet = this.remoteImsAPI.storeProperty({}, param).$promise;
    let updatedGet = promiseSet.then(() => {
      return this.fetchProperty(key);
    });

    return updatedGet;
  }

  deleteProperty(key) {
    let resource = this.remoteImsAPI.deleteProperty({ name: key }, {});
    resource.$promise.then(() => this.propertiesMap.delete(key));
    return resource;
  }
}

// Register this factory
Register.getInstance().factory('imsPropertiesApi', ImsPropertiesApi);
