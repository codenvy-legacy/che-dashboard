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

    this.workspace = codenvyAPI.getWorkspace();
    this.workspacesById = this.workspace.getWorkspacesById();

    this.filtersWorkspaceSelected = {};

    this.projectFilter = {name: ''};

    this.isLoading = true;

    // fetch workspaces when initializing
    let promise = codenvyAPI.getWorkspace().fetchWorkspaces();

    promise.then(() => {
        this.isLoading = false;
        this.workspaces = this.workspace.getWorkspaces();
        this.projectsPerWorkspace = this.codenvyAPI.getProject().getProjectsByWorkspace();
        this.setAllFiltersWorkspaces(true);
        this.isAllWorkspaces = true;
      },
      (error) => {
        this.isLoading = false;
        if (error.status === 304) {
          this.workspaces = this.workspace.getWorkspaces();
          this.projectsPerWorkspace = this.codenvyAPI.getProject().getProjectsByWorkspace();
          this.setAllFiltersWorkspaces(true);
          this.isAllWorkspaces = true;
        }
      });

  }

  /**
   * Get factory content from project
   * @param project is selected project
   */
  getFactoryContentFromProject(project) {
    this.isLoading = true;

    let promise = this.codenvyAPI.getFactory().getFactoryContentFromProject(project);

    promise.then((factoryContent) => {
      this.isLoading = false;
      this.factoryContent = this.$filter('json')(factoryContent, 2);
    }, (error) => {
      this.isLoading = false;
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
   * @returns {CodenvyWorkspaceReferenceBuilder.workspaceReference.name|*}
   */
  getWorkspaceName(workspaceId) {
    return this.workspacesById.get(workspaceId).workspaceReference.name;
  }


}

export default FactoryFromProjectCtrl;
