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
 * Test of the CodenvyProfile
 */
describe('CodenvyProfile', function () {

  /**
   * Profile Factory for the test
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
  beforeEach(angular.mock.module('userDashboard'));

  /**
   * Inject factory and http backend
   */
  beforeEach(inject(function (codenvyProfile, codenvyAPIBuilder, codenvyHttpBackend) {
    factory = codenvyProfile;
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
   * Check that we're able to fetch profile
   */
  it('Fetch profile', function () {
      // setup tests objects
      var profileId = 'idDefaultUser';
      var email = 'testUser@codenvy.com';
      var firstName = 'FirstName';
      var lastName = 'LastName';

      var defaultProfile = apiBuilder.getProfileBuilder().withId(profileId).withEmail(email).withFirstName(firstName).withLastName(lastName).build();

      // providing request
      // add defaultProfile on Http backend
      codenvyBackend.addDefaultProfile(defaultProfile);

      // setup backend
      codenvyBackend.setup();

      // fetch profile
      factory.fetchProfile();

      // expecting GETs
      httpBackend.expectGET('/api/profile');
      httpBackend.expectGET('/api/profile/prefs');

      // flush command
      httpBackend.flush();

      // now, check profile
      var profile = factory.getProfile();

      // check id, email, firstName and lastName in profile attributes
      expect(profile.id).toEqual(profileId);
      expect(profile.attributes.email).toEqual(email);
      expect(profile.attributes.firstName).toEqual(firstName);
      expect(profile.attributes.lastName).toEqual(lastName);
    }
  );

  /**
   * Check that we're able to set attributes into profile
   */
  it('Set attributes', function () {
      // setup tests object
      var testAttributes = {lastName: '<none>', email: 'newTestUser@codenvy.com'};

      // setup backend
      codenvyBackend.setup();
      codenvyBackend.setAttributes(testAttributes);

      // fetch profile
      factory.setAttributes(testAttributes);

      // expecting a POST
      httpBackend.expectPOST('/api/profile');

      // flush command
      httpBackend.flush();

      // now, check profile
      var profile = factory.getProfile();

      // check profile new attributes
      expect(profile.attributes).toEqual(testAttributes);

    }
  );

});
