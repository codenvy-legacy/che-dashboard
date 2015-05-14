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

/**
 * @ngdoc controller
 * @name account.profile.controller:AccountProfileCtrl
 * @description This class is handling the controller for the account's profile
 * @author Florent Benoit
 * @author Oleksii Orel
 */
class AccountProfileCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor(codenvyAPI, jsonCountries) {
    this.countries = [];
    this.profile = codenvyAPI.getProfile().getProfile();


    var fromJsonCountries = angular.fromJson(jsonCountries);

    var that = this;
    if (fromJsonCountries.all) {
      angular.forEach(fromJsonCountries.all, function(fromJsonCountry) {
        that.countries.push({name: fromJsonCountry.name});
      });
    }
  }
}

export default AccountProfileCtrl;
