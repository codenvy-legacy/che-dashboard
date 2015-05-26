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
    this.loginError = false;

    this.forgotPasswordUrl = 'https://codenvy.com/site/recover-password';
    this.signUpUrl = 'https://codenvy.com/site/create-account';
    this.upgradeSubscriptionUrl = 'https://codenvy.com/buy';
  }

  loginDisabled() {
    return (!(this.userName) || !(this.password));
  }

  login() {
    if (this.loginDisabled()) {
      return;
    }
    if (this.credentialsChanged) {
      this.imsSaasAuthApi.resetLogin();
    }
    let loginPromise = this.imsSaasAuthApi.logOnSaas(this.userName, this.password);
    loginPromise.then(() => this.loginSuccess());
    // do not catch exceptions that may happen in subscription codepath
    loginPromise.catch(_ => this.loginFailed(_));
    this.resetCredentialsChanged();
  }

  loginFailed(error) {
    this.hideAllMessages(error);
    this.loginError = true;
  }

  loginSuccess() {
    this.requestSubscriptions();
    this.loginError = false;
  }

  hideAllMessages(error) {
      this.showSubscribedMessage = false;
      this.showNotSubscribedMessage = false;
      this.onpremSubscriptionExpiration = undefined;
    }

  requestSubscriptions() {
    let subscriptionPromise = this.imsSubscriptionApi.checkOnPremisesSubscription();
    subscriptionPromise.then((response) => { this.receiveSubscriptionResponse(response); },
                             (error) => { this.hideAllMessages(error); });
  }

  receiveSubscriptionResponse(response) {
    if (response && response.state && response.state === 'ACTIVE') {
      this.showSubscribedMessage = true;
      this.showNotSubscribedMessage = false;
      this.onpremSubscriptionExpiration = response.endDate || 'unknown';
    } else {
      this.showSubscribedMessage = false;
      this.showNotSubscribedMessage = true;
      this.onpremSubscriptionExpiration = undefined;
    }
  }

  get userName() {
    return this._username;
  }

  set userName(newName) {
    this._username = newName;
    this.setCredentialsChanged();
  }

  get password() {
    return this._password;
  }

  set password(newPassword) {
    this._password = newPassword;
    this.setCredentialsChanged();
  }

  setCredentialsChanged() {
    this.credentialsChanged = true;
  }

  resetCredentialsChanged() {
    this.credentialsChanged = false;
  }
}

export default OnPremisesAdminBridgeCodenvyAccountCtrl;
