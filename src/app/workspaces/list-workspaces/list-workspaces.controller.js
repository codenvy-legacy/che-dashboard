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
 * @name workspaces.list.controller:ListWorkspacesCtrl
 * @description This class is handling the controller for listing the workspaces
 * @author Ann Shumilova
 */
class ListWorkspacesCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor (codenvyAPI, $q) {
    this.codenvyAPI = codenvyAPI;
    this.$q = $q;
    this.state = 'loading';
    this.workspaceFilter = {name : ''};

    //List of workspaces grouped by account id:
    this.workspacesPerAccount = {};
    //Map of all workspaces with additional info by id:
    this.workspacesById = new Map();
    //Map of workspaces' used resources (consumed GBH):
    this.workspaceUsedResources = new Map();

    if (this.codenvyAPI.getAccount().getAccounts().length > 0) {
      this.getAccountWorkspaces();
    } else {
      this.codenvyAPI.getAccount().fetchAccounts().then(() => {
        this.getAccountWorkspaces();
      });
    }
  }

  //Fetch workspaces for all user accounts (with account/owner role):
  getAccountWorkspaces() {
    let promise = this.processAccounts(this.codenvyAPI.getAccount().getAccounts());
    promise.then(() => {
      this.updateAccountData();
    });
  }

  //Fetch current user's workspaces (where he is a member):
  getUserWorkspaces() {
    // fetch workspaces when initializing
    let promise = this.codenvyAPI.getWorkspace().fetchWorkspaces();

    promise.then(() => {
        this.updateSharedWorkspaces();
      },
      (error) => {
        if (error.status === 304) {
          // ok
          this.updateSharedWorkspaces();
          return;
        }
        this.state = 'error';
      });
  }

  //Process the list of accounts:
  processAccounts(accounts) {
    let promises = [];
    accounts.forEach((account) => {
      //Retrieving workspaces per account:
      let workspacesPromise = this.codenvyAPI.getWorkspace().fetchAccountWorkspaces(account.id);
      promises.push(workspacesPromise);
      //Retrieving used resources of account's workspaces:
      let usedResourcesPromise = this.codenvyAPI.getAccount().fetchUsedResources(account.id);
      promises.push(usedResourcesPromise);
    });
    return this.$q.all(promises);
  }

  //Update the info of all user workspaces:
  updateSharedWorkspaces() {
    this.userWorkspaces = [];
    let workspaces = this.codenvyAPI.getWorkspace().getWorkspaces();
    workspaces.forEach((workspace) => {
      //First check the list of already received workspace info:
      if (!this.workspacesById.get(workspace.workspaceReference.id)) {
        this.codenvyAPI.getWorkspace().fetchWorkspaceDetails(workspace.workspaceReference.id).then(() => {
          let userWorkspace = this.codenvyAPI.getWorkspace().getWorkspacesById().get(workspace.workspaceReference.id);
          this.getWorkspaceInfo(userWorkspace);
          this.userWorkspaces.push(userWorkspace);
        });
      } else {
        let userWorkspace = this.workspacesById.get(workspace.workspaceReference.id);
        let isShared = !this.workspacesPerAccount[userWorkspace.accountId];
        if (isShared) {
          this.userWorkspaces.push(userWorkspace);
        }
      }
    });

    this.state = 'loaded';
  }

  updateAccountData() {
    this.workspaceUsedResources.clear();
    let accounts = this.codenvyAPI.getAccount().getAccounts();
    accounts.forEach((account) => {
      this.processUsedResources(this.codenvyAPI.getAccount().getUsedResources(account.id));
      let workspaces = this.codenvyAPI.getWorkspace().getWorkspacesByAccountId(account.id);
      workspaces.forEach((workspace) => {
        this.getWorkspaceInfo(workspace);
      });
      this.workspacesPerAccount[account.id] = workspaces;
    });
    this.getUserWorkspaces();
  }

  //Represents given account resources as a map with workspace id as a key.
  processUsedResources(resources) {
    resources.forEach((resource) => {
      this.workspaceUsedResources.set(resource.workspaceId, resource.memory.toFixed(2));
    });
  }

  //Gets all necessary workspace info to be displayed.
  getWorkspaceInfo(workspace) {
    let promises = [];
    this.workspacesById.set(workspace.id, workspace);

    workspace.isLocked = this.codenvyAPI.getWorkspace().isWorkspaceResourcesLocked(workspace);
    workspace.usedResources = this.workspaceUsedResources.get(workspace.id);

    let promiseMembers = this.codenvyAPI.getWorkspace().fetchMembers(workspace.id);
    promises.push(promiseMembers);

    //No access to runner resources if workspace is locked:
    if (!workspace.isLocked) {
      let promiseResources = this.codenvyAPI.getWorkspace().fetchRAMResources(workspace.id);
      promises.push(promiseResources);
    }

    let projectsPerWorkspace = this.codenvyAPI.getProject().getProjectsByWorkspace();
    if (!projectsPerWorkspace || !projectsPerWorkspace[workspace.id]) {
      let promiseProjectsNumber = this.codenvyAPI.getProject().fetchProjectsForWorkspaceId(workspace.id);
      promises.push(promiseProjectsNumber);
    }

    workspace.providedResources = this.codenvyAPI.getWorkspace().getWorkspaceResourcesUsageLimit(workspace);
    this.$q.all(promises).then(() => {
      projectsPerWorkspace = this.codenvyAPI.getProject().getProjectsByWorkspace();

      workspace.projects = projectsPerWorkspace[workspace.id] ? projectsPerWorkspace[workspace.id].length : undefined;
      workspace.members = this.codenvyAPI.getWorkspace().getMembers(workspace.id).length;

      if (!workspace.isLocked) {
        let ramResources = this.codenvyAPI.getWorkspace().getRAMResources(workspace.id);
        workspace.usedRAM = ramResources.usedMemory;
        workspace.allocatedRAM = ramResources.totalMemory;
      }
    }, (error) => {
      console.log(error);
    });
  }
}

export default ListWorkspacesCtrl;
