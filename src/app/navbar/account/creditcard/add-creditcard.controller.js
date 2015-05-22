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

  getCard() {
    new Card({
      form: '#creditCardInformationForm',
      container: '.card-wrapper',

      formSelectors: {
        numberInput: 'input[id=cardNumber]', // optional — default input[name="number"]
        expiryInput: 'input[id=expires]', // optional — default input[name="expiry"]
        cvcInput: 'input[id=cvv]', // optional — default input[name="cvc"]
        nameInput: 'input[id=cardholderName]' // optional - defaults input[name="name"]
      },
      formatting: true, // optional - default true
      messages: {
        validDate: 'valid\ndate', // optional - default 'valid\nthru'
        monthYear: 'mm/yyyy' // optional - default 'month/year'
      },
      values: {
        number: '•••• •••• •••• ••••',
        name: 'Full Name',
        expiry: '••/••',
        cvc: '•••'
      },
      debug: false // optional - default false
    });
  }
}

export default AddCreditcardCtrl;
