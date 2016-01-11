/*
 * Copyright (c) 2012-2016 Codenvy, S.A.
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
 * @name account.creditcard.controller:CreditcardCtrl
 * @description This class is handling the controller for managing credit cards (list, add, remove)
 * @author Ann Shumilova
 */
class CreditcardCtrl {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
    constructor(codenvyAPI, $mdDialog, codenvyNotification) {
    this.codenvyAPI = codenvyAPI;
    this.$mdDialog = $mdDialog;
    this.codenvyNotification = codenvyNotification;

    this.creditCards = [];
    this.creditCard = {};
    this.loadedCreditCards = false;


    if (this.codenvyAPI.getAccount().getAccounts().length > 0) {
      this.fetchCreditCards();
    } else {
      this.codenvyAPI.getAccount().fetchAccounts().then(() => {
        this.fetchCreditCards();
      });
    }

  }

  fetchCreditCards() {
    let currentAccount = this.codenvyAPI.getAccount().getCurrentAccount();

    this.codenvyAPI.getPayment().fetchCreditCards(currentAccount.id).then(() => {
      this.loadedCreditCards = true;
      this.creditCards = this.codenvyAPI.getPayment().getCreditCards(currentAccount.id);
    }, (error) => {
      if (error.status === 304) {
        this.loadedCreditCards = true;
        this.creditCards = this.codenvyAPI.getPayment().getCreditCards(currentAccount.id);
      } else {
        this.codenvyNotification.showError(error.data.message !== null ? error.data.message : 'Failed to load credit cards.');
        console.log('error', error);
      }
    });
  }

  addCreditCard() {
    let currentAccount = this.codenvyAPI.getAccount().getCurrentAccount();
    var promise = this.codenvyAPI.getPayment().addCreditCard(currentAccount.id, this.creditCard);
    promise.then(() => {
      if (this.creditCards.length === 0) {
        this.addSubscription(currentAccount.id);
      }
      this.fetchCreditCards();
    }, (error) => {
      this.codenvyNotification.showError(error.data.message !== null ? error.data.message : 'Adding credit card failed.');
      console.log('error', error);
    });
    return promise;
  }

  addSubscription(accountId) {
    this.codenvyAPI.getAccount().addSubscription(accountId, this.codenvyAPI.getAccount().getPayAsYouGoPlanId(), true);
  }

  setCreditCard(card) {
    this.creditCard = card;
  }

  removeCreditCard(card, event) {
    var confirm = this.$mdDialog.confirm()
      .title('Would you like to remove credit card ' + card.number)
      .content('Please confirm for the credit card removal.')
      .ariaLabel('Remove credit card')
      .ok('Ok')
      .cancel('Cancel')
      .clickOutsideToClose(true)
      .targetEvent(event);
    this.$mdDialog.show(confirm).then(() => {
      let promise = this.codenvyAPI.getPayment().removeCreditCard(card.accountId, card.number);
      promise.then(() => {
        console.log('error', 'test');
        this.fetchCreditCards();
      }, (error) => {
        this.codenvyNotification.showError(error.data.message !== null ? error.data.message : 'Removing credit card failed.');
        console.log('error', error);
      });
    });
  }
}

export default CreditcardCtrl;

