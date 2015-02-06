/*******************************************************************************
 * Copyright (c) 2015 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 *******************************************************************************/

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
    this.remoteUserAPI = this.$resource('/api/user');

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

}

// Register this factory
Register.getInstance().factory('codenvyUser', CodenvyUser);
