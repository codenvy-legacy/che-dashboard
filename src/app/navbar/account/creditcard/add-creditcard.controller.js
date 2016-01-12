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

/**
 * @ngdoc controller
 * @name account.creditcard.controller:AddCreditcardCtrl
 * @description This class is handling the controller for the adding credit card
 * @author Ann Shumilova
 */
class AddCreditcardCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor(codenvyAPI, jsonCountries) {
    this.creditCard = {};
    this.values = {
      number: '•••• •••• •••• ••••',
      name: 'Full Name',
      expiry: '••/••',
      cvc: '•••'
    };

    this.messages = {
      validDate: 'valid\ndate', // optional - default 'valid\nthru'
      monthYear: 'mm/yyyy' // optional - default 'month/year'
    };

    this.options = {
      debug: false,
      formatting: true
    };

    this.countries = [];
    this.profile = codenvyAPI.getProfile().getProfile();

    let allCountries = angular.fromJson(jsonCountries).all;
    allCountries.forEach((country) => {
      this.countries.push({name: country.name});
    });

    //Select the country from user's profile attributes if exists:
    if (this.profile && this.profile.attributes && this.profile.attributes.country) {
      this.creditCard.country = this.profile.attributes.country;
    } else {
      //TODO remove this when bug with billingAddress NullPointerException is fixed
      this.creditCard.country = 'United States';
    }
  }

  getCard(element) {
    var cardContainer = element.find('#card-container');
    if (cardContainer && cardContainer.children().length > 0) {
      cardContainer.empty();
    }

    var card = {
      container: '#card-container',

      numberInput: 'input#cardNumber',
      expiryInput: 'input#expires',
      cvcInput: 'input#cvv',
      nameInput: 'input#cardholderName',

      width: 350,
      // Strings for translation - optional
      messages: {
        validDate: this.messages.validDate,
        monthYear: this.messages.monthYear
      },
      // Default values for rendered fields - options
      values: {
        number: this.values.number,
        name: this.values.name,
        expiry: this.values.expiry,
        cvc: this.values.cvc
      },

      formatting: this.options.formatting,
      debug: this.options.debug
    };
    $(element).card(card); // jshint ignore:line
  }
}

export default AddCreditcardCtrl;
