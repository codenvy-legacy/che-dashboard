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

class AutomaticUpdatesCtrl {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor($rootScope, imsSaasAuthApi) {
    this.$rootScope = $rootScope;
    this.$rootScope.$watch(
      () => imsSaasAuthApi.promise,
      (newValue, oldValue) => { this.updateSubscriptionStatus(newValue); }
    );
    // by default, false, until login and subscription check
    this.subscriptionOk = false;
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
}

export default AutomaticUpdatesCtrl;
