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

const anonUsageDataPropertyName = 'anon-usage-data';

class AutomaticUpdatesCtrl {


  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor($rootScope, imsSaasAuthApi, imsPropertiesApi) {
    this.$rootScope = $rootScope;
    this.imsPropertiesApi = imsPropertiesApi;

    this.$rootScope.$watch(
      () => imsSaasAuthApi.promise,
      (newValue) => { this._updateSubscriptionStatus(newValue); }
    );
    // by default, false, until login and subscription check
    this.subscriptionOk = false;

    /* flag set when property is received */
    this.propertyReceived = false;

    this.usageData = false;

    this.imsPropertiesApi.fetchProperty(anonUsageDataPropertyName).then(() => this._propertiesReceived(this.imsPropertiesApi.getProperty(anonUsageDataPropertyName)));
  }

  _updateSubscriptionStatus(newValue) {
    if (newValue) {
      this.subscriptionOk = true;
    } else {
      this.subscriptionOk = false;
    }
    this.$rootScope.$broadcast('cdvyPanel:disabled', { id: 'usage-data-and-automatic-install', disabled: this.isSectionDisabled() });
  }

  isSectionDisabled() {
    return !this.subscriptionOk;
  }

  usageDataChanged() {
    if (!this.usageDataDisabled) {
      this._dataChanged(anonUsageDataPropertyName, this._usageData);
    }
  }

  _dataChanged(prop, value) {
    this.imsPropertiesApi.storeProperty(prop, value).then(() => this._saveOk(prop)).catch(error => this._saveFailed(error, prop));
  }

  _propertiesReceived(value) {
    this.propertyReceived = true;
    if (typeof(value) === 'undefined') {
      this.usageData = false;
    } else if (typeof(value) === 'string') {
      switch (value) {
        case 'true':
          this.usageData = true;
          break;
        case 'false':
          this.usageData = false;
          break;
        default:
          this.usageData = false;
          this.usageDataChanged();
          break;
      }
    } else if (typeof(value) === 'boolean') {
      this.usageData = value;
    } else {
      this.usageData = false;
      this.usageDataChanged();
    }
  }

  _setDisabledProps(disabled) {
    this.usageDataDisabled = disabled;
  }

  _saveOk() {
    this._setDisabledProps(false);
  }

  _saveFailed(error, prop) {
    switch (prop) {
      case anonUsageDataPropertyName:
        this.usageDataSaveError = true;
        // restore previous value
        this.usageData = !this.usageData;
        break;
      default:
        break;
    }
    this._setDisabledProps(false);
  }

  set usageData(newValue) {
    //console.log('set usageData', newValue);
    this._usageData = newValue;
  }

  get usageData() {
    //console.log('get usageData', this._usageData);
    return this._usageData;
  }
}

export default AutomaticUpdatesCtrl;
