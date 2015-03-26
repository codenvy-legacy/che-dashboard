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
 * This class is handling the user API retrieval
 * @author Florent Benoit
 */
class CodenvyUser {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor ($resource) {

    // keep resource
    this.$resource = $resource;

    // remote call
    this.remoteUserAPI = this.$resource('/api/user',{}, {
      findByID: {method: 'GET', url: '/api/user/:userId'},
      findByEmail: {method: 'GET', url: '/api/user/find?email=:userEmail'}
    });

    // users by ID
    this.useridMap = new Map();

    // users by email
    this.userEmailMap = new Map();

    // fetch the user when we're initialized
    this.fetchUser();

    this.isLogged = false;

  }


  /**
   * Gets the user ID
   * @return user ID
   */
  getUser() {
    // try to refresh if user is not yet logged in
    if (!this.isLogged) {
      this.fetchUser();
    }
    return this.user;
  }

  /**
   * Gets the user data
   */
  fetchUser() {
    this.user = this.remoteUserAPI.get();
    let promise = this.user.$promise;
    // check if if was OK or not
    promise.then(() => {this.isLogged = true;}, () => {this.isLogged = false;});
    return promise;
  }


  fetchUserId(userId) {
    let promise = this.remoteUserAPI.findByID({userId: userId}).$promise;
    let parsedResultPromise = promise.then((user) => {
      this.useridMap.set(userId, user);
    });

    return parsedResultPromise;

  }

  getUserFromId(userId) {
    return this.useridMap.get(userId);
  }

  fetchUserEmail(userEmail) {
    let promise = this.remoteUserAPI.findByEmail({userEmail: userEmail}).$promise;
    let parsedResultPromise = promise.then((user) => {
      this.userEmailMap.set(userEmail, user);
    });

    return parsedResultPromise;

  }

  getUserFromEmail(userEmail) {
    return this.userEmailMap.get(userEmail);
  }

}

// Register this factory
Register.getInstance().factory('codenvyUser', CodenvyUser);
