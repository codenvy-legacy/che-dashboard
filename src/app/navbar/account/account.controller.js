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

export class AccountCtrl {

  /**
   * Controller for a account details
   * @ngInject for Dependency injection
   * @author Oleksii Orel
   */
  constructor($routeParams, $location, cheAPI, codenvyAPI, cheNotification) {
    this.cheAPI = cheAPI;
    this.codenvyAPI = codenvyAPI;
    this.cheNotification = cheNotification;

    this.profile = this.cheAPI.getProfile().getProfile();

    this.profileAttributes = {};

    //copy the profile attribute if it exist
    if (this.profile.attributes) {
      this.profileAttributes = angular.copy(this.profile.attributes);
    } else {
      this.profile.$promise.then(() => {
        this.profileAttributes = angular.copy(this.profile.attributes);
      });
    }

    //search the selected tab
    let routeParams = $routeParams.tabName;
    if (!routeParams) {
      this.selectedTabIndex = 0;
    } else {
      switch (routeParams) {
        case 'profile':
          this.selectedTabIndex = 0;
          break;
        case 'billing':
          this.selectedTabIndex = 1;
          break;
        case 'security':
          this.selectedTabIndex = 2;
          break;
        default:
          $location.path('/account');
      }
    }

    this.resetPasswordForm = false;
    this.isCreditCardServiceAvailable = this.cheAPI.getService().isServiceAvailable(codenvyAPI.getPayment().getCreditCardServicePath());
  }

  /**
   * Check if profile attributes have changed
   * @returns {boolean}
   */
  isAttributesChanged() {
    return !angular.equals(this.profile.attributes, this.profileAttributes);
  }

  /**
   * Set profile attributes
   */
  setProfileAttributes() {

    if (this.isAttributesChanged()) {
      let promise = this.cheAPI.getProfile().setAttributes(this.profileAttributes);

      promise.then(() => {
        this.cheNotification.showInfo('Profile successfully updated.');
        this.profile.attributes = angular.copy(this.profileAttributes);
      }, (error) => {
        if (error.status === 304) {
          this.profile.attributes = angular.copy(this.profileAttributes);
        } else {
          this.profileAttributes = angular.copy(this.profile.attributes);
          this.cheNotification.showError(error.data.message ? error.data.message : 'Profile update failed.');
          console.log('error', error);
        }
      });

    }
  }

  /**
   * Set new password
   */
  setPassword(password) {
    if (!password) {
      return;
    }

    let promise = this.cheAPI.getUser().setPassword(password);

    promise.then(() => {
      this.cheNotification.showInfo('Password successfully updated.');
      this.resetPasswordForm = true;
    }, (error) => {
      this.cheNotification.showError(error.data.message ? error.data.message : 'Password updated failed.');
      console.log('error', error);
    });
  }

}
