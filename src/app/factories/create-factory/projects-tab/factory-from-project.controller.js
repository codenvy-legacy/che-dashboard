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
 * Controller for creating factory from a project.
 * @author Oleksii Orel
 */
class FactoryFromProjectCtrl {

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
    this.projectsPerWorkspace = codenvyAPI.getProject().getProjectsByWorkspace();

    this.filtersWorkspaceSelected = {};

    this.projectFilter = {name: ''};

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
    this.isAllWorkspaces = true;
  }

  /**
   * Get factory content from project
   * @param project is selected project
   */
  getFactoryContentFromProject(project) {
    this.selectedProject = project;
    let factoryContent = this.codenvyAPI.getFactory().getFactoryContentFromProject(project);
    if (factoryContent) {
      this.factoryContent = this.$filter('json')(factoryContent, 2);
      return;
    }

    this.isImporting = true;

    let promise = this.codenvyAPI.getFactory().fetchFactoryContentFromProject(project);

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
   * Update state for All workspaces checkbox
   */
  updateIsAllWorkspaces() {
    this.workspaces.forEach((workspace) => {
      if (!this.filtersWorkspaceSelected[workspace.workspaceReference.id]) {
        this.isAllWorkspaces = false;
      }
    });
  }

  /**
   * Set all workspaces in the filters of workspaces
   * @param isChecked is setting value
   */
  setAllFiltersWorkspaces(isChecked) {
    this.workspaces.forEach((workspace) => {
      this.filtersWorkspaceSelected[workspace.workspaceReference.id] = isChecked;
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

  /**
   * Check workspace empty state
   * @param workspaceId
   * @param projects
   * @returns {boolean}empty state
   */
  isEmpty(workspaceId, projects) {
    if (projects && projects.length > 0) {
      return false;
    }
    this.filtersWorkspaceSelected[workspaceId] = false;
    this.isAllWorkspaces = false;
    return true;
  }

}

export default FactoryFromProjectCtrl;
