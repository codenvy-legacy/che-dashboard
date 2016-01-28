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
 * This class is handling the controller for the create user widget
 * @author Oleksii Orel
 */
export class OnPremisesAdminCreateUserCtrl {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor(cheAPI, cheNotification) {
    this.cheAPI = cheAPI;
    this.cheNotification = cheNotification;

    this.newUserEmail = null;
    this.newUserPassword = null;
  }

  /**
   * Create new user callback
   */
  createUser() {
    //TODO should add user name in future
    let promise = this.cheAPI.getUser().createUser(this.newUserEmail, null, this.newUserPassword);

    promise.then(() => {
      this.newUserName = null;
      this.newUserEmail = null;
      this.newUserPassword = null;
      this.cheNotification.showInfo('User successfully created.');
    }, (error) => {
      this.cheNotification.showError(error.data.message ? error.data.message : '.');
    });
  }

}
