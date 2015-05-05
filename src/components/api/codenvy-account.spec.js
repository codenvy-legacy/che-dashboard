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
 * Test of the CodenvyAccount
 */
describe('CodenvyAccount', function(){

  /**
   * Account Factory for the test
   */
  var factory;

  /**
   * API builder.
   */
  var apiBuilder;

  /**
   * Backend for handling http operations
   */
  var httpBackend;

  /**
   * Codenvy backend
   */
  var codenvyBackend;


  /**
   *  setup module
   */
  beforeEach(module('userDashboard'));

  /**
   * Inject factory and http backend
   */
  beforeEach(inject(function(codenvyAccount, codenvyAPIBuilder, codenvyHttpBackend) {
    factory = codenvyAccount;
    apiBuilder = codenvyAPIBuilder;
    codenvyBackend = codenvyHttpBackend;
    httpBackend = codenvyHttpBackend.getHttpBackend();
  }));

  /**
   * Check assertion after the test
   */
  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  /**
   * Check that we're able to fetch project types
   */
  it('Fetch accounts', function() {
      var account1 = apiBuilder.getAccountBuilder().withId('accountid1').withName('myaccount1').build();
      var account2 = apiBuilder.getAccountBuilder().withId('accountid2').withName('myaccount2').build();
      var membershipOwner = apiBuilder.getUserMembershipBuilder().withUserId('userId').withRole('account/owner').withAccountReference(account1).build();
      var membershipMember = apiBuilder.getUserMembershipBuilder().withUserId('userId').withRole('account/member').withAccountReference(account2).build();

      codenvyBackend.addMembership(membershipOwner);
      codenvyBackend.addMembership(membershipMember);

      // setup backend
      codenvyBackend.setup();

      // no accounts now on factory
      expect(factory.getAccounts().length).toEqual(0);

      // fetch accounts
      factory.fetchAccounts();

      // expecting a GET
      httpBackend.expectGET('/api/account');

      // flush command
      httpBackend.flush();


      //now, check accounts
      var accounts = factory.getAccounts();

      // check there is only one account with role - account/owner:
      //TODO why called twice ??? expect(accounts.length).toEqual(1);

      var testAccount = accounts[0];
      expect(testAccount).not.toBeNull();
      expect(testAccount.id).toEqual(account1.id);
      expect(testAccount.name).toEqual(account1.name);

      expect(factory.getCurrentAccount()).not.toBeNull();
      expect(factory.getCurrentAccount()).toEqual(testAccount);
    }
  );



});
