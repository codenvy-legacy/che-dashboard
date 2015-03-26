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
 * @name projects.list.controller:ListProjectsCtrl
 * @description This class is handling the controller for listing the projects
 * @author Florent Benoit
 */
class ListProjectsCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor (codenvyAPI) {
    this.codenvyAPI = codenvyAPI;
    this.workspace = codenvyAPI.getWorkspace();

    this.state = 'loading';

    this.filtersWorkspaceSelected = {};

    // fetch workspaces when initializing
    let promise = this.workspace.fetchWorkspaces();

    promise.then(() => {
        this.updateData();
      },
      (error) => {
        if (error.status === 304) {
          // ok
          this.updateData();
          return;
        }
        this.state = 'error';
      });


    this.dropDownOptionsList = [
      /*{
        name: 'Bulk Edit'
      },*/ {
        name: 'Filter Workspace', id: 'workspaceFilter'
      }/*, {
        name: 'Favorited Projects'
      }*/
    ];

    // by default, the workspace filter is hidden
    this.displayWorkspaceFilter = false;

  }

  updateData() {
    this.workspacesById = this.workspace.getWorkspacesById();
    this.workspaces = this.workspace.getWorkspaces();

    // init the filters of workspaces
    this.workspaces.forEach((workspace) => {
      this.filtersWorkspaceSelected[workspace.workspaceReference.id] = true;
    });

    this.projectsPerWorkspace = this.codenvyAPI.getProject().getProjectsByWorkspace();
    this.state = 'loaded';
  }

  /**
   * Gets the name of the workspace based on its ID
   * @param workspaceId
   * @returns {CodenvyWorkspaceReferenceBuilder.workspaceReference.name|*}
   */
  getWorkspaceName(workspaceId) {
    return this.workspacesById.get(workspaceId).workspaceReference.name;
  }

  /**
   * Callback called when the dropdown on the list projects is called
   * @param selected the selected element
   */
  dropDownSelected(selected) {
    // hit the workspace filter
    if ('workspaceFilter' === selected.id) {
        this.displayWorkspaceFilter = true;
    }
  }


  /**
   * Hide the workspace filter menu
   */
  hideWorkspaceFilter() {
    this.displayWorkspaceFilter = false;
  }

  /**
   * All workspaces should be selected
   */
  resetWorkspaceFilter() {
    var keys = Object.keys(this.filtersWorkspaceSelected);
    keys.forEach((key) => {
      this.filtersWorkspaceSelected[key] = true;
    });
  }


}

export default ListProjectsCtrl;
