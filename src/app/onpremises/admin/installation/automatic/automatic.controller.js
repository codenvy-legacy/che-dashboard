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
      (newValue, oldValue) => { this.updateSubscriptionStatus(newValue); }
    );
    // by default, false, until login and subscription check
    this.subscriptionOk = false;

    this.usageData = false;

    this.imsPropertiesApi.fetchProperty(anonUsageDataPropertyName).then(_ => this._propertiesReceived(this.imsPropertiesApi.getProperty(anonUsageDataPropertyName)));
  }

  updateSubscriptionStatus(value) {
    if (value) {
      this.subscriptionOk = true;
    } else {
      this.subscriptionOk = false;
    }
    this.$rootScope.$broadcast('cdvyPanel:disabled', {id: 'usage-data-and-automatic-install', disabled: this.isSectionDisabled()});
  }

  isSectionDisabled() {
    return !this.subscriptionOk;
  }

  usageDataChanged() {
    this._dataChanged(anonUsageDataPropertyName, this.usageData);
  }

  _dataChanged(prop, value) {
    this.imsPropertiesApi.storeProperty(prop, value).then(() => this._saveOk(prop)).catch(error => this._saveFailed(error, prop));
  }

  _propertiesReceived(value) {
    if (value) {
      this.usageData = true;
    } else {
      this.usageData = false;
    }
  }

  _setDisabledProps(disabled) {
    this.usageDataDisabled = disabled;
  }

  _saveOk(prop) {
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
}

export default AutomaticUpdatesCtrl;
