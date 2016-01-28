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
 * @ngdoc controller
 * @name workspace.details.controller:WorkspaceDetailsResourcesCtrl
 * @description This class is handling the controller for details of workspace : section resources
 * @author Ann Shumilova
 */
export class WorkspaceDetailsResourcesCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($route, codenvyAPI, cheWorkspace, cheNotification) {
    this.codenvyAPI = codenvyAPI;
    this.cheWorkspace = cheWorkspace;
    this.cheNotification = cheNotification;

    this.workspaceId = $route.current.params.workspaceId;

    let workspace = this.cheWorkspace.getWorkspacesById().get(this.workspaceId);
    if (workspace && workspace.accountId) {
      this.getWorkspaceInfo();
    } else {
      let promise = this.cheWorkspace.fetchWorkspaceDetails(this.workspaceId);
      promise.then(() => {
        this.getWorkspaceInfo();
      }, (error) => {
        if (error.status === 304) {
          this.getWorkspaceInfo();
        } else {
          this.loading = false;
          this.invalidWorkspace = error.statusText;
        }
      });
    }
  }

  getWorkspaceInfo() {
    this.workspace = this.cheWorkspace.getWorkspacesById().get(this.workspaceId);

    let usedResourcesPromise = this.codenvyAPI.getAccount().fetchUsedResources(this.workspace.accountId);
    usedResourcesPromise.then(() => {
      let resources = this.codenvyAPI.getAccount().getUsedResources(this.workspace.accountId);
      resources.forEach((resource) => {
        if (resource.workspaceId === this.workspaceId) {
          this.workspace.usedResources = resource.memory.toFixed(2);
        }
        this.updateWorkspaceData();
      });
    });
  }

  //Update the workspace data to be displayed.
  updateWorkspaceData() {
    this.loading = false;

    this.workspace.isLocked = this.cheWorkspace.isWorkspaceResourcesLocked(this.workspace);

    this.workspace.providedResources = this.cheWorkspace.getWorkspaceResourcesUsageLimit(this.workspace);

    if (this.workspace.providedResources) {
      this.newLimit = angular.copy(this.workspace.providedResources);
    }
    if (!this.workspace.isLocked) {
      let promiseResources = this.cheWorkspace.fetchRAMResources(this.workspace.id);
      promiseResources.then(() => {
        let ramResources = this.cheWorkspace.getRAMResources(this.workspace.id);
        this.workspace.usedRAM = ramResources.usedMemory;
        this.workspace.allocatedRAM = ramResources.totalMemory;
        this.newRAM = angular.copy(ramResources.totalMemory);
      });
    }
  }

  isProvidedResources() {
    return angular.isDefined(this.workspace.providedResources);
  }

  isResourcesChanged() {
    if (!this.workspace) {
      return false;
    }

    return (this.newRAM !== this.workspace.allocatedRAM || this.newLimit !== this.workspace.providedResources);
  }


  checkLimit(active) {
    this.newLimit = active ? angular.copy(this.workspace.providedResources) : undefined;
  }

  updateResources(isValidForm) {
    if (!isValidForm) {
      return;
    }

    this.isLoading = true;
    let resources = {};
    if (this.newRAM !== this.workspace.allocatedRAM) {
      resources.runnerRam = this.newRAM;
    }

    if (this.newLimit !== this.workspace.providedResources) {
      resources.resourcesUsageLimit = this.newLimit ? this.newLimit : -1;
    }

    let promise = this.codenvyAPI.getAccount().redistributeResources(this.workspace.accountId, this.workspaceId, resources);
    promise.then(() => {
      this.cheNotification.showInfo('Workspace resources is successfully updated.');
      this.workspace.allocatedRAM = angular.copy(this.newRAM);
      this.workspace.providedResources = angular.copy(this.newLimit);
    }, (error) => {
      let errorMessage = error.data.message ? error.data.message : 'Update workspace resources failed.';
      errorMessage = errorMessage.replace(this.workspaceId, this.workspace.name);
      this.cheNotification.showError(errorMessage);
      console.log('error', error);
    });
  }

}
