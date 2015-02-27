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
  constructor ($resource, $q) {

    // keep resource
    this.$resource = $resource;

    this.$q = $q;

    // projects per workspace id
    this.projectsPerWorkspace = {};

    // projects per workspace id
    this.projectsPerWorkspaceMap = new Map();

    // projects per workspace id
    this.projectsDetailsPerWorkspaceMap = new Map();

    // workspaces used to retrieve projects
    this.workspaces = [];

    // projects on all workspaces
    this.projects = [];

    // remote call
    this.remoteProjectsAPI = this.$resource('/api/project/:workspaceId',  {workspaceId:'@id'}, {
      import: { method: 'POST', url: '/api/project/:workspaceId/import/:path'},
      create: { method: 'POST', url: '/api/project/:workspaceId?name=:path'},
      details: { method: 'GET', url: '/api/project/:workspaceId/:path'},
      remove: {method: 'DELETE', url: '/api/project/:workspaceId/:path'}
    });
  }


  /**
   * Notified when workspaces are updated
   * @param workspaces the array of workspaces that are now used
   */
  onChangeWorkspaces(workspaces) {

    var promises = [];

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
      let promise = this.fetchProjectsForWorkspace(workspace);
      promises.push(promise);
    });

    return this.$q.all(promises);

  }


  /**
   * Fetch the projects for the given workspace
   * @param workspace
   */
  fetchProjectsForWorkspaceId(workspaceId) {

    let promise = this.remoteProjectsAPI.query({workspaceId: workspaceId}).$promise;
    let downloadProjectPromise = promise.then((projectReferences) => {

      var remoteProjects = [];
      projectReferences.forEach((projectReference) => {
        remoteProjects.push(projectReference);
      });

      // add the map key
      this.projectsPerWorkspaceMap.set(workspaceId, remoteProjects);
      this.projectsPerWorkspace[workspaceId] = remoteProjects;

      // refresh global projects list
      this.projects.length = 0;


      for (var member in this.projectsPerWorkspace) {
        let projects = this.projectsPerWorkspace[member];
        projects.forEach((project) => {
          this.projects.push(project);
        });

      }
    });

    return downloadProjectPromise;
  }


  /**
   * Fetch the projects for the given workspace
   * @param workspace
   */
  fetchProjectsForWorkspace(workspace) {

    return this.fetchProjectsForWorkspaceId(workspace.workspaceReference.id);
  }

  importProject(workspaceId, path, data) {
    let promise = this.remoteProjectsAPI.import({workspaceId: workspaceId, path: path}, data).$promise;
    promise.then(this.fetchProjectsForWorkspaceId(workspaceId));


    return promise;
  }


  createProject(workspaceId, path, data) {
    let promise = this.remoteProjectsAPI.create({workspaceId: workspaceId, path: path}, data).$promise;
    promise.then(this.fetchProjectsForWorkspaceId(workspaceId));


    return promise;
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


  getProjectDetails(workspaceId, projectName) {
    let promise = this.remoteProjectsAPI.details({workspaceId: workspaceId, path: projectName}).$promise;

    return promise;
  }

  remove(workspaceId, projectName) {
  let promise = this.remoteProjectsAPI.remove({workspaceId: workspaceId, path: projectName}).$promise;

    return promise;
}

}

// Register this factory
Register.getInstance().factory('codenvyProject', CodenvyProject);
