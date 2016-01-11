/*
 * Copyright (c) 2012-2016 Codenvy, S.A.
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
 * Controller for creating factory from a workspace.
 * @author Oleksii Orel
 * @author Michail Kuznyetsov
 */
class FactoryFromWorkspaceCtrl {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor($filter, codenvyAPI, codenvyNotification) {
    this.$filter = $filter;
    this.codenvyAPI = codenvyAPI;
    this.codenvyNotification = codenvyNotification;

    this.workspaces = codenvyAPI.getWorkspace().getWorkspaces();
    this.workspacesById = codenvyAPI.getWorkspace().getWorkspacesById();

    this.filtersWorkspaceSelected = {};

    this.workspaceFilter = {name: ''};

    this.isLoading = true;

    // fetch workspaces when initializing
    let promise = codenvyAPI.getWorkspace().fetchWorkspaces();

    promise.then(() => {
        this.isLoading = false;
        this.updateData();
      },
      (error) => {
        this.isLoading = false;
        if (error.status === 304) {
          this.updateData();
        }
      });

  }

  updateData() {
    this.setAllFiltersWorkspaces(true);
  }

  /**
   * Get factory content from workspace
   * @param workspace is selected workspace
   */
  getFactoryContentFromWorkspace(workspace) {
    let factoryContent = this.codenvyAPI.getFactory().getFactoryContentFromWorkspace(workspace);
    if (factoryContent) {
      this.factoryContent = this.$filter('json')(factoryContent, 2);
      return;
    }

    this.isImporting = true;

    let promise = this.codenvyAPI.getFactory().fetchFactoryContentFromWorkspace(workspace);

    promise.then((factoryContent) => {
      this.isImporting = false;
      this.factoryContent = this.$filter('json')(factoryContent, 2);
    }, (error) => {
      this.isImporting = false;
      this.factoryContent = null;
      this.codenvyNotification.showError(error.data.message ? error.data.message : 'Get factory configuration failed.');
      console.log('error', error);
    });
  }

  /**
   * Set all workspaces in the filters of workspaces
   * @param isChecked is setting value
   */
  setAllFiltersWorkspaces(isChecked) {
    this.workspaces.forEach((workspace) => {
      this.filtersWorkspaceSelected[workspace.id] = isChecked;
    });
  }

  /**
   * Get the workspace name by ID
   * @param workspaceId
   * @returns {String} workspace name
   */
  getWorkspaceName(workspaceId) {
    let workspace = this.workspacesById.get(workspaceId);
    if (workspace && workspace.name) {
      return workspace.name;
    }
    return '';
  }
}

export default FactoryFromWorkspaceCtrl;
