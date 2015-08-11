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
 * @name workspace.details.controller:WorkspaceDetailsMembersCtrl
 * @description This class is handling the controller for details of workspace : section members
 * @author Ann Shumilova
 */
class WorkspaceDetailsMembersCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($route, codenvyAPI, $mdDialog, $mdMedia, $q, codenvyNotification) {
    this.codenvyAPI = codenvyAPI;
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;
    this.$q = $q;
    this.codenvyNotification = codenvyNotification;

    this.workspaceId = $route.current.params.workspaceId;

    this.members = this.codenvyAPI.getWorkspace().getMembers(this.workspaceId);
    if (!this.members) {
      let promise = this.codenvyAPI.getWorkspace().fetchMembers(this.workspaceId);
      promise.then(() => {
        this.members = this.codenvyAPI.getWorkspace().getMembers(this.workspaceId);
        this.updateMembers();
      });
    } else {
      this.updateMembers();
    }
  }

  updateMembers() {
    var promises = [];

    this.members.forEach((member) => {
      member.role = this.getRole(member.roles);

      let user = this.codenvyAPI.getUser().getUserFromId(member.userId);
      if (user) {
        member.email = user.email;
      } else {
        let userPromise = this.codenvyAPI.getUser().fetchUserId(member.userId);
        let updateUserPromise = userPromise.then(() => {
          member.email = this.codenvyAPI.getUser().getUserFromId(member.userId).email;
        });
        promises.push(updateUserPromise);
      }

      let profile = this.codenvyAPI.getProfile().getProfileFromId(member.userId);
      if (profile) {
        member.name = this.getFullName(profile);
      } else {
        let profilePromise = this.codenvyAPI.getProfile().fetchProfileId(member.userId);
        let updateProfilePromise = profilePromise.then(() => {
          member.name = this.getFullName(this.codenvyAPI.getProfile().getProfileFromId(member.userId));
        });
        promises.push(updateProfilePromise);
      }
    });

    this.$q.all(promises);
  }

  /**
   * Gets the fullname from a profile
   * @param profile the profile to analyze
   * @returns {string} a name
   */
  getFullName(profile) {
    var firstName = profile.attributes.firstName;
    if (!firstName) {
      firstName = '';
    }
    var lastName = profile.attributes.lastName;
    if (!lastName) {
      lastName = '';
    }

    return firstName + ' ' + lastName;
  }

  getRole(roles) {
    let str = '';

    roles.forEach((role) => {
      str += role.replace('workspace/', ' ');
    });

    return str;
  }

  widthGtSm() {
    return this.$mdMedia('gt-sm');
  }

  /**
   * User clicked on the + button to add a new member. Show the dialog
   * @param $event
   */
  showAddMemberDialog($event) {
    this.$mdDialog.show({
      targetEvent: $event,
      controller: 'WorkspaceDetailsMembersDialogAddCtrl',
      controllerAs: 'workspaceDetailsMembersDialogAddCtrl',
      bindToController: true,
      clickOutsideToClose: true,
      locals: { callbackController: this},
      templateUrl: 'app/workspaces/workspace-details/members/workspace-details-members-dialog-add.html'
    });
  }

  /**
   * Callback by the dialog that is prompting for users to add
   * @param userEmailToAdd the user to add
   * @param permissionsToSet the roles to add
   */
  callbackMemberAdd(email, role) {
    let roles = [];
    roles.push(role);

    let promiseGetUserByEmail = this.codenvyAPI.getUser().fetchUserEmail(email);
    promiseGetUserByEmail.then(() => {
      var user = this.codenvyAPI.getUser().getUserFromEmail(email);
      if (user) {
        this.addMember(user.id, roles);
      } else {
        this.codenvyNotification.showError('User with email: ' + email + ' not found.');
      }
    }, (error) => {
      this.codenvyNotification.showError(error.data.message !== null ? error.data.message : '.');
    });
  }

  addMember(userId, roles) {
    let promise = this.codenvyAPI.getWorkspace().addMember(this.workspaceId, userId, roles);
    promise.then(() => {
      this.codenvyAPI.getWorkspace().fetchMembers(this.workspaceId).then(() => {
        this.members = this.codenvyAPI.getWorkspace().getMembers(this.workspaceId);
        this.updateMembers();
      });
    }, (error) => {
      this.codenvyNotification.showError(error.data.message !== null ? error.data.message : 'Add member failed.');
      console.log('error', error);
    });
  }

  removeMember(event, member) {
    var confirm = this.$mdDialog.confirm()
      .title('Would you like to remove member ' + member.email + ' from workspace?')
      .content('Please confirm for the member removal.')
      .ariaLabel('Remove member')
      .ok('Remove')
      .cancel('Cancel')
      .clickOutsideToClose(true)
      .targetEvent(event);
    this.$mdDialog.show(confirm).then(() => {
      let promise = this.codenvyAPI.getWorkspace().deleteMember(this.workspaceId, member.userId);
      promise.then(() => {
        this.codenvyAPI.getWorkspace().fetchMembers(this.workspaceId).then(() => {
          this.members = this.codenvyAPI.getWorkspace().getMembers(this.workspaceId);
          this.updateMembers();
        });
      }, (error) => {
        this.codenvyNotification.showError(error.data.message !== null ? error.data.message : 'Delete member failed.');
        console.log('error', error);
      });
    });
  }
}

export default WorkspaceDetailsMembersCtrl;
