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
  constructor(imsSaasAuthApi, imsSubscriptionApi, $rootScope) {
    this.imsSaasAuthApi = imsSaasAuthApi;
    this.imsSubscriptionApi = imsSubscriptionApi;

    this.hideAllMessages();
    this.loginError = false;
    if (this.imsSaasAuthApi.promise) {
      this.imsSaasAuthApi.promise.then(() => this.loginSuccess(), () => this.loginError());
    } else {
      this.show30DaysAdvertisement = true;
    }

    this.forgotPasswordUrl = 'https://codenvy.com/site/recover-password';
    this.signUpUrl = 'https://codenvy.com/site/create-account';
    this.upgradeSubscriptionUrl = 'https://codenvy.com/buy';

    $rootScope.$watch(() => imsSaasAuthApi.promise, (newValue, oldValue) => this._authChanged(newValue, oldValue));
    $rootScope.$watch(() => imsSubscriptionApi.promise, (newValue, oldValue) => this._subscriptionChanged(newValue, oldValue));
  }

  login(form) {
    if (form.$invalid) {
      return;
    }
    if (this.credentialsChanged) {
      this.imsSaasAuthApi.resetLogin();
    }
    this.imsSaasAuthApi.logOnSaas(this.userName, this.password);

    this.resetCredentialsChanged();
  }

  loginFailed(error) {
    console.log('loginFailed', error);
    this.hideAllMessages(error);
    if (this.imsSaasAuthApi.isAuthFailedError(error)) {
      this.loginError = 'The authentication failed. Please check your login and password.';
    } else {
      this.loginError = 'There was a server error during authentication. Please try again later.';
    }
    this.loggedIn = false;
    this.show30DaysAdvertisement = true;
  }

  loginSuccess() {
    this.requestSubscriptions();
    this.loginError = false;
    this.loggedIn = true;
    this.show30DaysAdvertisement = false;
  }

  hideAllMessages(error) {
      this.showSubscribedMessage = false;
      this.showNotSubscribedMessage = false;
      this.onpremSubscriptionExpiration = undefined;
    }

  requestSubscriptions() {
    let subscriptionPromise = this.imsSubscriptionApi.checkOnPremisesSubscription();
    this._handleSubscriptionPromise(subscriptionPromise);
  }

  _handleAuthPromise(promise) {
    promise.then(() => this.loginSuccess(), _ => this.loginFailed(_));
  }

  _handleSubscriptionPromise(promise) {
    promise.then(response => this.receiveSubscriptionResponse(response),
                 error => this.hideAllMessages(error));
  }

  receiveSubscriptionResponse(response) {
    if (this.imsSubscriptionApi.isActive(response)) {
      this.showSubscribedMessage = true;
      this.showNotSubscribedMessage = false;
      this.onpremSubscriptionExpiration = new Date(response.endDate) || 'unknown';
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

  _authChanged(newValue, oldValue) {
    if (newValue === oldValue) {
      return;
    }
    if (newValue) {
      this._handleAuthPromise(newValue);
    } else {
      this.hideAllMessages();
      this.loginError = false;
      this.loggedIn = false;
    }
  }

  _subscriptionChanged(newValue, oldValue) {
    if (!newValue) {
      this.hideAllMessages();
    } else {
      this._handleSubscriptionPromise(newValue);
    }
  }
}

export default OnPremisesAdminBridgeCodenvyAccountCtrl;
