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

class AccountCtrl {

  /**
   * Controller for a account details
   * @ngInject for Dependency injection
   * @author Oleksii Orel
   */
  constructor($routeParams, $location, codenvyAPI, codenvyNotification) {
    this.codenvyAPI = codenvyAPI;
    this.codenvyNotification = codenvyNotification;

    this.profile = this.codenvyAPI.getProfile().getProfile();

    this.profileAttributes = {};

    //copy the profile attribute if it exist
    if (this.profile.attributes) {
      this.profileAttributes = angular.copy(this.profile.attributes);
    } else {
      this.updateProfile();
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

  }


  /**
   * Check if profile attributes have changed
   * @returns {boolean}
   */
  isAttributesChanged() {
    return !angular.equals(this.profile.attributes, this.profileAttributes);
  }

  /**
   * Update current profile
   */
  updateProfile() {
    let promises = this.codenvyAPI.getProfile().fetchProfile();

    promises.then(() => {
      let temp = angular.copy(this.profile.attributes);
      this.profileAttributes = temp;
    });
  }

  /**
   * Set profile attributes
   */
  setProfileAttributes(isInputFormValid) {
    if (!isInputFormValid) {
      return;
    }

    if (this.isAttributesChanged()) {
      let promise = this.codenvyAPI.getProfile().setAttributes(this.profileAttributes);

      promise.then(() => {
        this.codenvyNotification.showInfo('Profile successfully updated.');
        this.profile.attributes = angular.copy(this.profileAttributes);
      }, (error) => {
        if (error.status === 304) {
          this.profile.attributes = angular.copy(this.profileAttributes);
        } else {
          this.profileAttributes = angular.copy(this.profile.attributes);
          this.codenvyNotification.showError(error.data.message ? error.data.message : 'Profile update failed.');
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

    let promise = this.codenvyAPI.getUser().setPassword(password);

    promise.then(() => {
      this.codenvyNotification.showInfo('Password successfully updated.');
      this.resetPasswordForm = true;
    }, (error) => {
      this.codenvyNotification.showError(error.data.message ? error.data.message : 'Password updated failed.');
      console.log('error', error);
    });
  }

}

export default AccountCtrl;
