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

class OnPremisesAdminBridgeCodenvyAccountCtrl {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor(imsSaasAuthApi, imsSubscriptionApi) {
    this.imsSaasAuthApi = imsSaasAuthApi;
    this.imsSubscriptionApi = imsSubscriptionApi;

    this.hideAllMessages();
  }

  loginDisabled() {
    return (!(this.userName) || !(this.password));
  }

  login() {
    if (this.credentialsChanged) {
      this.imsSaasAuthApi.resetLogin();
    }
    let loginPromise = this.imsSaasAuthApi.logOnSaas(this.userName, this.password);
    loginPromise.then(() => { this.requestSubscriptions(); },
                      () => { this.hideAllMessages(); });
    this.credentialsChanged = false;
  }

  hideAllMessages() {
      this.showSubscribedMessage = false;
      this.showNotSubscribedMessage = false;
      this.onpremSubscriptionExpiration = undefined;
    }

  requestSubscriptions() {
    let subscriptionPromise = this.imsSubscriptionApi.checkOnPremisesSubscription();
    subscriptionPromise.then((response) => { this.receiveSubscriptionResponse(response); },
                             (error) => { this.hideAllMessages(); });
  }

  receiveSubscriptionResponse(response) {
    if (response && response.status && response.status === 'OK') {
      this.showSubscribedMessage = true;
      this.showNotSubscribedMessage = false;
      this.onpremSubscriptionExpiration = response.expirationDate;
    } else {
      this.showSubscribedMessage = false;
      this.showNotSubscribedMessage = true;
      this.onpremSubscriptionExpiration = undefined;
    }
  }

  credentialsChanged() {
    this.credentialsChanged = true;
  }
}

export default OnPremisesAdminBridgeCodenvyAccountCtrl;
