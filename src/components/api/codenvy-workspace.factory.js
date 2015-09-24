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
 * This class is handling the workspace retrieval
 * It sets to the array workspaces the current workspaces which are not temporary
 * @author Florent Benoit
 */
class CodenvyWorkspace {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor ($resource, $q, codenvyAnalytics, codenvyUser) {
    this.RESOURCES_LOCKED_PROPERTY = 'codenvy:resources_locked';
    this.RESOURCES_USAGE_LIMIT = 'codenvy:resources_usage_limit';

    // keep resource
    this.$resource = $resource;

    this.$q = $q;

    this.codenvyAnalytics = codenvyAnalytics;

    this.codenvyUser = codenvyUser;

    // current list of workspaces
    this.workspaces = [];

    // per Id
    this.workspacesById = new Map();

    // per account
    this.workspacesPerAccount = new Map();

    // per workspace
    this.ramResourcesById = new Map();
    // per workspace
    this.membersById = new Map();

    // listeners if workspaces are changed/updated
    this.listeners = [];

    // remote call
    this.remoteWorkspaceAPI = this.$resource('/api/workspace/all', {}, {
        listByAccountId: {method: 'GET', url: '/api/workspace/find/account?id=:accountId', isArray: true},
        getDetails: {method: 'GET', url: '/api/workspace/:workspaceId'},
        addMember: {method: 'POST', url: '/api/workspace/:workspaceId/members'},
        deleteMember: {method: 'DELETE', url: '/api/workspace/:workspaceId/members/:userId'},
        getMembers: {method: 'GET', url: '/api/workspace/:workspaceId/members', isArray: true},
        getRAM: {method: 'GET', url: '/api/runner/:workspaceId/resources'},
        create: {method: 'POST', url: '/api/workspace'},
        delete: {method: 'DELETE', url: '/api/workspace/:workspaceId'},
        update: {method: 'POST', url : '/api/workspace/:workspaceId'}
      }
    );
  }

  /**
   * Add a listener that need to have the onChangeWorkspaces(workspaces: Array) method
   * @param listener a changing listener
   */
  addListener(listener) {
    this.listeners.push(listener);
  }


  /**
   * Gets the workspaces of this remote
   * @returns {Array}
   */
  getWorkspaces() {
    return this.workspaces;
  }

  /**
   * Gets the workspaces per id
   * @returns {Map}
   */
  getWorkspacesById() {
    return this.workspacesById;
  }

  /**
   * Gets the workspaces per account id
   * @returns {Array}
   */
  getWorkspacesByAccountId(accountId) {
    return this.workspacesPerAccount.get(accountId);
  }

  /**
   * Ask for loading the workspaces in asynchronous way
   * If there are no changes, it's not updated
   */
  fetchWorkspaces() {
    let query = this.remoteWorkspaceAPI.query();
    let promise = query.$promise;
    let updatedPromise = promise.then((data) => {
      var remoteWorkspaces = [];
      this.workspaces.length = 0;
      //TODO It's a fix used not to loose account ID of the workspace.
      //Can be removed, when API will return accountId in the list of user workspaces response:
      var copyWorkspaceById = new Map();
      angular.copy(this.workspacesById, copyWorkspaceById);

      this.workspacesById.clear();
      // add workspace if not temporary
      data.forEach((workspace) => {
        if (!workspace.workspaceReference.temporary) {
          remoteWorkspaces.push(workspace);
          this.workspaces.push(workspace);
          workspace.workspaceReference.accountId = copyWorkspaceById.get(workspace.workspaceReference.id) ?
            copyWorkspaceById.get(workspace.workspaceReference.id).accountId : undefined;
          this.workspacesById.set(workspace.workspaceReference.id, workspace.workspaceReference);
        }
      });
      return this.workspaces;
    });

    let callbackPromises = updatedPromise.then((data) => {
      var promises = [];
      promises.push(updatedPromise);

      this.listeners.forEach((listener) => {
        let promise = listener.onChangeWorkspaces(data);
        promises.push(promise);
      });
      return this.$q.all(promises);
    });

    return callbackPromises;
  }

  fetchWorkspaceDetails(workspaceId) {
    var defer = this.$q.defer();

    let promise = this.remoteWorkspaceAPI.getDetails({workspaceId : workspaceId}).$promise;
    promise.then((data) => {
      this.workspacesById.set(workspaceId, data);
      defer.resolve();
    }, (error) => {
      if (error.status !== 304) {
        defer.reject(error);
      } else {
        defer.resolve();
      }
    });

    return defer.promise;
  }

  createWorkspace(accountId, workspaceName) {
    let data = {accountId: accountId, name: workspaceName};

    let promise = this.remoteWorkspaceAPI.create(data).$promise;
    return promise;
  }

  /**
   * Ask for loading the workspaces by account id in asynchronous way
   * If there are no changes, it's not updated
   */
  fetchAccountWorkspaces(accountId) {
    let query = this.remoteWorkspaceAPI.listByAccountId({accountId : accountId});
    let promise = query.$promise;
    let updatedPromise = promise.then((data) => {
      this.workspacesPerAccount.set(accountId, data);
    }, (error) => {
      if (error.status !== 304) {
        console.log(error);
      }
    });
    return updatedPromise;
  }

  /**
   * Performs workspace rename by the given workspaceId and new name.
   * @param workspaceId the workspace ID
   * @param newName the new workspace name
   * @returns {*|promise|n|N}
   */
  renameWorkspace(workspaceId, newName) {
    let data = {name : newName};
    let promise = this.remoteWorkspaceAPI.update({workspaceId : workspaceId}, data).$promise;
    return promise;
  }

  /**
   * Performs workspace deleting by the given workspaceId.
   * @param workspaceId the workspace ID
   * @returns {*|promise|n|N}
   */
  deleteWorkspace(workspaceId) {
    var defer = this.$q.defer();
    let promise = this.remoteWorkspaceAPI.delete({workspaceId : workspaceId}).$promise;
    promise.then(() => {
      this.listeners.forEach((listener) => {
        listener.onDeleteWorkspace(workspaceId);
      });
      defer.resolve();
    }, (error) => {
        defer.reject(error);
      });

    return defer.promise;
  }

  /**
   * Adds for the given workspaceId the given role for the userId
   * @param workspaceId the workspace ID
   * @param userId the user ID
   * @param roles the array of roles to add
   * @returns {*|promise|n|N}
   */
  addMember(workspaceId, userId, roles) {
    let data = {};
    data.userId = userId;
    data.roles = roles;
    let user  = this.codenvyUser.getUserFromId(userId);
    if(user && user.email) {
      this.codenvyAnalytics.userInviteAction(workspaceId, user.email);
    }
    return this.remoteWorkspaceAPI.addMember({workspaceId: workspaceId}, data).$promise;
  }

  /**
   * Gets the  for the given workspaceId the given role for the userId
   * @param workspaceId the workspace ID
   * @param userId the user ID
   * @param roles the array of roles to add
   * @returns {*|promise|n|N}
   */
  fetchMembers(workspaceId) {
    let promise = this.remoteWorkspaceAPI.getMembers({workspaceId: workspaceId}).$promise;
    let updatedPromise = promise.then((data) => {
      this.membersById.set(workspaceId, data);
    }, (error) => {
      if (error.status !== 304) {
        console.log(error);
      }
    });
    return updatedPromise;
  }

  /**
   * Performs workspace's member deleting by the given workspaceId and userId.
   * @param workspaceId the workspace ID
   * @param workspaceId the user ID
   * @returns {*|promise|n|N}
   */
  deleteMember(workspaceId, userId) {
    let promise = this.remoteWorkspaceAPI.deleteMember({workspaceId : workspaceId, userId: userId}).$promise;
    return promise;
  }

  /**
   * Get RAM resources of a workspace: used and free RAM.
   * @param workspaceId the workspace ID
   * @returns {*|promise|n|N}
   */
  fetchRAMResources(workspaceId) {
    let promise = this.remoteWorkspaceAPI.getRAM({workspaceId: workspaceId}).$promise;
    let updatedPromise = promise.then((data) => {
      this.ramResourcesById.set(workspaceId, data);
    }, (error) => {
      if (error.status !== 304) {
        console.log(error);
      }
    });
    return updatedPromise;
  }

  /**
   * Get RAM resources of a workspace: used and free RAM.
   * @param workspaceId the workspace ID
   * @returns {Object}
   */
  getRAMResources(workspaceId) {
    return this.ramResourcesById.get(workspaceId);
  }

  /**
   * Get workspace members.
   * @param workspaceId the workspace ID
   * @returns {Array}
   */
  getMembers(workspaceId) {
    return this.membersById.get(workspaceId);
  }

  /**
   * Returns given workspace's resources locked state.
   * @returns {Boolean}
   */
  isWorkspaceResourcesLocked(workspace) {
    return !!(workspace.attributes && workspace.attributes[this.RESOURCES_LOCKED_PROPERTY] && workspace.attributes[this.RESOURCES_LOCKED_PROPERTY] === 'true');
  }

  /**
   * Returns given workspace's resources usage limit.
   * @returns {Number}
   */
  getWorkspaceResourcesUsageLimit(workspace) {
    return (workspace.attributes && workspace.attributes[this.RESOURCES_USAGE_LIMIT]) ? workspace.attributes[this.RESOURCES_USAGE_LIMIT] : undefined;
  }
}

// Register this factory
Register.getInstance().factory('codenvyWorkspace', CodenvyWorkspace);
