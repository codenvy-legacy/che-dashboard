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
 * This class is handling the controller for the admins user management
 * @author Oleksii Orel
 */
class AdminsUserManagementCtrl {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor($mdMedia, $mdDialog, codenvyAPI, codenvyNotification) {
    this.$mdMedia = $mdMedia;
    this.$mdDialog = $mdDialog;
    this.codenvyAPI = codenvyAPI;
    this.codenvyNotification = codenvyNotification;

    this.isLoading = false;

    this.maxItems = 15;
    this.skipCount = 0;

    this.users = [];
    this.usersMap = codenvyAPI.getUser().getUsersMap();

    if (this.usersMap && this.usersMap.size === 0) {
      this.isLoading = true;
      codenvyAPI.getUser().fetchUsers(this.maxItems, this.skipCount).then(() => {
        this.isLoading = false;
        this.updateUsers();
      }, (error) => {
        this.isLoading = false;
        this.codenvyNotification.showError(error.data.message ? error.data.message : '.');
      });
    } else {
      this.updateUsers();
    }
  }

  /**
   * Update users array
   */
  updateUsers() {
    //update users array
    this.users.length = 0;
    this.usersMap.forEach((user) => {
      this.users.push(user);
    });
  }

  /**
   * Load more factories, coll this function on list scroll down
   */
  loadNextPage() {
    this.skipCount = this.users.length;

    this.isLoading = true;

    let promise = this.codenvyAPI.getUser().fetchUsers(this.maxItems, this.skipCount);

    promise.then(() => {
      this.isLoading = false;
      this.updateUsers();
    }, (error) => {
      this.isLoading = false;
      if (error.status !== 304) {
        this.codenvyNotification.showError(error.data.message ? error.data.message : 'Update information failed.');
      }
    });
  }

  /**
   * Admin clicked on the + button to add a new user. Show the dialog
   * @param  event - the $event
   */
  showAddUserDialog(event) {
    this.$mdDialog.show({
      targetEvent: event,
      controller: 'AdminsAddUserCtrl',
      controllerAs: 'adminsAddUserCtrl',
      bindToController: true,
      clickOutsideToClose: true,
      locals: {callbackController: this},
      templateUrl: 'app/admin/user-management/add-user/add-user.html'
    });
  }

  /**
   * User clicked on the - button to remove the user. Show the dialog
   * @param  event - the $event
   * @param user - the selected user
   */
  removeUser(event, user) {
    var confirm = this.$mdDialog.confirm()
      .title('Would you like to remove user ' + user.email + ' ?')
      .content('Please confirm for the user removal.')
      .ariaLabel('Remove user')
      .ok('Remove')
      .cancel('Cancel')
      .clickOutsideToClose(true)
      .targetEvent(event);
    this.$mdDialog.show(confirm).then(() => {
      this.isLoading = true;
      let promise = this.codenvyAPI.getUser().deleteUserById(user.id);
      promise.then(() => {
        this.isLoading = false;
        this.updateUsers();
      }, (error) => {
        this.isLoading = false;
        this.codenvyNotification.showError(error.data.message ? error.data.message : 'Delete user failed.');
      });
    });
  }

}

export default AdminsUserManagementCtrl;
