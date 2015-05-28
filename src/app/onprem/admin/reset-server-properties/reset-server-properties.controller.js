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

class ResetServerPropsCtrl {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor(imsPropertiesApi, $q) {
    this.imsPropertiesApi = imsPropertiesApi;
    this.$q = $q;
    this.messages = [];
    let deletePromise = this.imsPropertiesApi.getAllProperties().then(resource => this._deleteProperties(resource));
    deletePromise.then(() => this._finished(), () => this._finished());
  }

  _deleteProperties(resource) {
    this.oldProperties = this._filter(resource);
    let promises = [];
    for (let property of Object.keys(this.oldProperties)) {
      let promise = this.imsPropertiesApi.deleteProperty(property).$promise
            .then(() => this.messages.push('Deleted property ' + property))
            .catch(error => this.messages.push('Property ' + property + ' not deleted: ' + JSON.stringify(error)));
      promises.push(promise);
    }
    if (promises) {
      return this.$q.all(promises);
    } else {
      return this.$q.resolve(true);
    }
  }

  _finished() {
    this.imsPropertiesApi.getAllProperties().then(resource => this.newProperties = this._filter(resource));
  }

  _filter(resource) {
    let result = {};
    for (let property of Object.keys(resource)) {
      if (property !== '$promise' && property !== '$resolved') {
        result[property] = resource[property];
      }
    }
    return result;
  }
}

export default ResetServerPropsCtrl;
