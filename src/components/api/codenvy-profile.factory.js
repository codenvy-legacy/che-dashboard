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

import Register from '../utils/register.js';

/**
 * This class is handling the profile API retrieval
 * @author Florent Benoit
 */
class CodenvyProfile {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($resource, $q) {

    // keep resource
    this.$resource = $resource;
    this.$q = $q;

    // remote call
    this.remoteProfileAPI = this.$resource('/api/profile', {}, {
      getById: {method: 'GET', url: '/api/profile/:userId'},
      setAttributes: {method: 'POST', url: '/api/profile'}
    });

    // remote call for preferences
    this.remoteProfilePreferencesAPI = this.$resource('/api/profile/prefs');

    this.profileIdMap = new Map();

    // fetch the profile when we're initialized
    if (!this.profile || !this.profilePreferences) {
      this.fetchProfile();
    }
  }


  /**
   * Gets the profile
   * @return profile
   */
  getProfile() {
    return this.profile;
  }

  /**
   * Gets the preferences
   * @return preferences
   */
  getPreferences() {
    return this.profilePreferences;
  }


  /**
   * Update the preferences
   * @param properties
   */
  updatePreferences(properties) {
    angular.extend(this.profilePreferences, properties);
    this.profilePreferences.$save();
  }

  /**
   * Remove preferences properties
   * @param properties (list of keys)
   */
  removePreferences(properties) {
    this.remoteProfilePreferencesAPI.delete(properties);
  }

  /**
   * Gets the full name if it possible
   * @returns {string} full name
   */
  getFullName(attributes) {
    if (!attributes) {
      return '';
    }
    let firstName = attributes.firstName;
    if (!firstName) {
      firstName = '';
    }
    let lastName = attributes.lastName;
    if (!lastName) {
      lastName = '';
    }

    return firstName + ' ' + lastName;
  }

  /**
   * Gets the profile data
   */
  fetchProfile() {
    let profile = this.remoteProfileAPI.get();
    if (!this.profile) {
      this.profile = profile;
    }

    let profilePromise = profile.$promise;

    profilePromise.then((profile) => {
      this.profile = profile;
      this.profileIdMap.set(profile.userId, profile);
    });
    this.profilePreferences = this.remoteProfilePreferencesAPI.get();
    let profilePrefsPromise = this.profilePreferences.$promise;

    return this.$q.all([profilePromise, profilePrefsPromise]);
  }

  /**
   * Set the profile attributes data
   * @param attributes
   * @returns {$promise|*|T.$promise}
   */
  setAttributes(attributes) {
    let promise = this.remoteProfileAPI.setAttributes(attributes).$promise;

    return promise;
  }

  /**
   * Fetch the profile from the given userId
   * @param userId the user for which we will call remote api and get promise
   * @returns {*} the promise
   */
  fetchProfileId(userId) {
    let promise = this.remoteProfileAPI.getById({userId: userId}).$promise;
    let parsedResultPromise = promise.then((profile) => {
      this.profileIdMap.set(userId, profile);
    });

    return parsedResultPromise;

  }

  getProfileFromId(userId) {
    return this.profileIdMap.get(userId);
  }


}

// Register this factory
Register.getInstance().factory('codenvyProfile', CodenvyProfile);
