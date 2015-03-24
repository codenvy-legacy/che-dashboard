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
  constructor ($resource) {

    // keep resource
    this.$resource = $resource;

    // remote call
    this.remoteProfileAPI = this.$resource('/api/profile',{}, {
      getById: {method: 'GET', url: '/api/profile/:userId'}
    });


    this.profileIdMap = new Map();

    // fetch the profile when we're initialized
    this.fetchProfile();
  }


  /**
   * Gets the profile
   * @return profile
   */
  getProfile() {
    return this.profile;
  }

  /**
   * Gets the profile data
   */
  fetchProfile() {
    this.profile = this.remoteProfileAPI.get();
    let promise = this.profile.$promise;
    return promise;
  }


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
