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
 * @ngdoc controller
 * @name projects.details.directive:ProjectDetailsDevelopersCtrl
 * @description This class is handling the controller for details of projects : section developers
 * @author Florent Benoit
 */
class ProjectDetailsDevelopersCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($route, codenvyAPI, $mdDialog, codenvyNotificationService, $q) {
    this.codenvyAPI = codenvyAPI;
    this.$mdDialog = $mdDialog;
    this.codenvyNotificationService = codenvyNotificationService;
    this.$q = $q;

    this.workspaceId = $route.current.params.workspaceId;
    this.projectName = $route.current.params.projectName;
    this.requirePermissions = false;


    // fetch project permissions
    let promisePermissions = codenvyAPI.getProject().fetchPermissions(this.workspaceId, this.projectName);

    // update permissions
    promisePermissions.then(() => {
        this.updatePermissions();
      },
      (error) => {
        if (error.status === 403) {
          // not access
          this.requirePermissions = true;
          return;
        }
         this.updatePermissions();
      });

  }

  /**
   * Update the project permissions. (Callback of a promise)
   */
  updatePermissions() {
    this.permissions = this.codenvyAPI.getProject().getPermissions(this.workspaceId, this.projectName);
  }


  /**
   * User clicked on the + button to add a new developer. Show the dialog
   * @param $event
   */
  showAdd($event) {
    this.$mdDialog.show({
      targetEvent: $event,
      controller: 'ProjectDetailsDevelopersDialogAddCtrl',
      controllerAs: 'projectDetailsDevelopersDialogAddCtrl',
      bindToController:true,
      locals: { callbackController: this},
      templateUrl: 'app/projects/project-details/developers/project-details-developers-dialog-add.html'
    });
  }

  /**
   * Callback by the dialog that is prompting for users to add
   * @param userEmailToAdd the user to add
   * @param permissionsToSet the roles to add
   */
  callbackUserAdd(userEmailToAdd, permissionsToSet) {
    if (!userEmailToAdd || !permissionsToSet) {
      return;
    }

    // build roles
    var roles = [];
    var keys = Object.keys(permissionsToSet);
    keys.forEach((key) =>  {
      if (permissionsToSet[key]) {
        roles.push(key);
      }
    });


    // convert user email into user id
    let promiseSearchUserEmail = this.codenvyAPI.getUser().fetchUserEmail(userEmailToAdd);

    let updatePermissionPromise = promiseSearchUserEmail.then(() => {
      return this.setPermissionsForUserEmail(userEmailToAdd, roles);
    }, (error) => {
      if (error.status === 304) {
        return this.setPermissionsForUserEmail(userEmailToAdd, roles);
      } else {
        return this.$q.reject('Email address does not exists.');
      }
    });

    updatePermissionPromise.then(() => {
      this.codenvyNotificationService.showInfo('Permissions added for ' + userEmailToAdd);
    }, (error) => {
      this.codenvyNotificationService.showError('Unable to add permissions for ' + userEmailToAdd + ':' + error);
    });
  }

  /**
   * Sets permission for the given email address
   * @param userEmailToAdd the email address to use
   * @param roles the roles to set
   * @returns {*|webdriver.promise.Promise}
   */
  setPermissionsForUserEmail(userEmailToAdd, roles) {
    var user = this.codenvyAPI.getUser().getUserFromEmail(userEmailToAdd);
    var userID = user.id;
    return this.setPermission(userID, roles);
  }


  /**
   * Sets the permission for the given user id and with the associated roles
   * @param userId
   * @param roles
   * @returns {*|webdriver.promise.Promise}
   */
  setPermission(userId, roles) {
    var data = [
      {
        principal: {
          name: userId,
          type: 'USER'
        },
        permissions: roles
      }
    ];
    let promise = this.codenvyAPI.getProject().updatePermissions(this.workspaceId, this.projectName, data);

    let updatePromise = promise.then(() => {
      let promisePermissions = this.codenvyAPI.getProject().fetchPermissions(this.workspaceId, this.projectName);
      promisePermissions.then(() => {
          this.updatePermissions();
        },
        (error) => {
          if (error.status === 304) {
            // ok
            this.updatePermissions();
          }
        });
      return promisePermissions;
    });
    return updatePromise;
  }


  /**
   * Change mode.
   */
  resetMode() {
    this.mode = '';
  }



  /**
   * Remove the given permission
   * @param permission
   */
  remove(permission) {
    this.mode = 'REMOVE_PERMISSIONS';

    if (permission == null) {
      return;
    }
    if (!permission.principal.name) {
      return;
    }

    // we set empty permissions
    let promise = this.setPermission(permission.principal.name, []);
    promise.then(() => {
        this.codenvyNotificationService.showInfo('Remove permissions for ' + permission.principal.email);
      }
    );


    return promise;
  }

  /**
   * Edit the current permission
   * @param permission
   */
  edit(permission) {
    this.currentEditingUserPermission = permission;
    this.mode = 'EDIT_PERMISSIONS';

    // transform current permissions
    this.currentEditingUserPermissionModel = {};
    this.currentEditingUserPermissionModel['read'] = false;
    this.currentEditingUserPermissionModel['write'] = false;
    this.currentEditingUserPermissionModel['build'] = false;
    this.currentEditingUserPermissionModel['run'] = false;
    this.currentEditingUserPermissionModel['update_acl'] = false;

    // report user permission to the model
    for (let role in this.currentEditingUserPermission.permissions) {
      this.currentEditingUserPermissionModel[this.currentEditingUserPermission.permissions[role]] = true;
    }

  }

  /**
   * User is asking to update permissions for the selected highlighted user.
   */
  updatePanelPermission() {
    // build roles
    var roles = [];
    var keys = Object.keys(this.currentEditingUserPermissionModel);
    keys.forEach((key) =>  {
      if (this.currentEditingUserPermissionModel[key]) {
        roles.push(key);
      }
    });


    // principal
    var userID = this.currentEditingUserPermission.principal.name;
    var email = this.currentEditingUserPermission.principal.email;

    let promise = this.setPermission(userID, roles);
    promise.then(() => {
      this.resetMode();
      this.codenvyNotificationService.showInfo('Permissions updated for ' + email);
      this.currentEditingUserPermission = null;
    }, (error) => {
      this.codenvyNotificationService.showError('Unable to update permissions: ' + error);
    });


  }


}

export default ProjectDetailsDevelopersCtrl;
