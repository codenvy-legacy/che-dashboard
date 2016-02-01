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
 * This class is handling the controller for the add user
 * @author Oleksii Orel
 */
class AdminsAddUserCtrl {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor($mdDialog, codenvyAPI, codenvyNotification) {
    this.$mdDialog = $mdDialog;
    this.codenvyAPI = codenvyAPI;
    this.codenvyNotification = codenvyNotification;
  }


  /**
   * Callback of the add button of the dialog(create new user).
   */
  createUser() {
    //TODO should add user name in future
    let promise = this.codenvyAPI.getUser().createUser(this.newUserEmail, null, this.newUserPassword);

    promise.then(() => {
      this.$mdDialog.hide();
      this.callbackController.updateUsers();
      this.codenvyNotification.showInfo('User successfully created.');
    }, (error) => {
      this.codenvyNotification.showError(error.data.message ? error.data.message : '.');
    });
  }


  /**
   * Callback of the cancel button of the dialog.
   */
  abort() {
    this.$mdDialog.hide();
  }


}

export default AdminsAddUserCtrl;
