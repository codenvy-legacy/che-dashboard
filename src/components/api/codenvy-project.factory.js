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
 * This class is handling the projects retrieval
 * It sets to the array projects for any workspace that is not temporary
 * @author Florent Benoit
 */
class CodenvyProject {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor ($resource) {

    // keep resource
    this.$resource = $resource;

    // projects per workspace id
    this.projectsPerWorkspace = {};

    // projects per workspace id
    this.projectsPerWorkspaceMap = new Map();


    // workspaces used to retrieve projects
    this.workspaces = [];

    // projects on all workspaces
    this.projects = [];

    // remote call
    this.remoteProjectsAPI = this.$resource('/api/project/:workspaceId',  {workspaceId:'@id'});
  }


  /**
   * Notified when workspaces are updated
   * @param workspaces the array of workspaces that are now used
   */
  onChangeWorkspaces(workspaces) {

    // well we need to clear globally the current projects
    this.projectsPerWorkspaceMap.clear();
    for (var member in this.projectsPerWorkspace) {
      delete this.projectsPerWorkspace[member];
    }
    this.workspaces.length = 0;
    // for each workspace
    workspaces.forEach((workspace) => {

      // update the current workspaces (replacing old one)
      this.workspaces.push(workspace);

      // fetch projects for this workspace
      this.fetchProjectsForWorkspace(workspace);
    });


  }

  /**
   * Fetch the projects for the given workspace
   * @param workspace
   */
  fetchProjectsForWorkspace(workspace) {

    let promise = this.remoteProjectsAPI.query({workspaceId: workspace.workspaceReference.id}).$promise;
    promise.then((projectReferences) => {

      var remoteProjects = [];
      projectReferences.forEach((projectReference) => {
        remoteProjects.push(projectReference);
      });

      // add the map key
      this.projectsPerWorkspaceMap.set(workspace.workspaceReference.id, remoteProjects);
      this.projectsPerWorkspace[workspace.workspaceReference.id] = remoteProjects;

      // refresh global projects list
      this.projects.length = 0;


      for (var member in this.projectsPerWorkspace) {
        let projects = this.projectsPerWorkspace[member];
        projects.forEach((project) => {

          this.projects.push(project);
        });

      }

    });
  }


  /**
   * Gets all projects that are currently monitored
   * @returns {Array}
   */
  getAllProjects() {
    return this.projects;
  }

  /**
   * The projects per workspace id
   * @returns {CodenvyProject.projectsPerWorkspace|*}
   */
  getProjectsByWorkspace() {
    return this.projectsPerWorkspace;
  }

  /**
   * The projects per workspace id
   * @returns {Map}
   */
  getProjectsByWorkspaceMap() {
    return this.projectsPerWorkspaceMap;
  }

}

// Register this factory
Register.getInstance().factory('codenvyProject', CodenvyProject);
