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
  constructor ($resource, $q, codenvyUser, codenvyProfile) {

    // keep resource
    this.$resource = $resource;

    this.codenvyUser = codenvyUser;

    this.codenvyProfile = codenvyProfile;

    this.$q = $q;

    // projects per workspace id
    this.projectsPerWorkspace = {};

    // projects per workspace id
    this.projectsPerWorkspaceMap = new Map();

    // projects per workspace id
    this.projectsDetailsPerWorkspaceMap = new Map();

    // map containing map (first map is workspace with key = workspaceId, inner map is key = project, value = permissions
    this.permissionsPerWorkspaceMap = new Map();

    // workspaces used to retrieve projects
    this.workspaces = [];

    // projects on all workspaces
    this.projects = [];

    // remote call
    this.remoteProjectsAPI = this.$resource('/api/project/:workspaceId', {workspaceId: '@id'}, {
      import: {method: 'POST', url: '/api/project/:workspaceId/import/:path'},
      create: {method: 'POST', url: '/api/project/:workspaceId?name=:path'},
      details: {method: 'GET', url: '/api/project/:workspaceId/:path'},
      getPermissions: { method: 'GET', url: '/api/project/:workspaceId/permissions/:path', isArray: true},
      updatePermissions: { method: 'POST', url: '/api/project/:workspaceId/permissions/:path', isArray: true},
      rename: {method: 'POST', url: '/api/project/:workspaceId/rename/:path?name=:name'},
      remove: {method: 'DELETE', url: '/api/project/:workspaceId/:path'},
      update: {method: 'PUT', url: '/api/project/:workspaceId/:path'},
      setVisibility: {method: 'POST', url: '/api/project/:workspaceId/switch_visibility/:path?visibility=:visibility'}
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

  /**
   * Import a project based located on the given workspace id and path
   * @param workspaceId the workspace ID to use
   * @param path the path of the project
   * @param data the project body description
   * @returns {$promise|*|T.$promise}
   */
  importProject(workspaceId, path, data) {
    let promise = this.remoteProjectsAPI.import({workspaceId: workspaceId, path: path}, data).$promise;
    // update projects as well
    promise.then(this.fetchProjectsForWorkspaceId(workspaceId));
    return promise;
  }


  /**
   * Create a project based located on the given workspace id and path
   * @param workspaceId the workspace ID to use
   * @param path the path of the project
   * @param data the project body description
   * @returns {$promise|*|T.$promise}
   */
  createProject(workspaceId, path, data) {
    let promise = this.remoteProjectsAPI.create({workspaceId: workspaceId, path: path}, data).$promise;
    // update projects as well
    promise.then(this.fetchProjectsForWorkspaceId(workspaceId));
    return promise;
  }

  /**
   * Fetch permissions for a project based located on the given workspace id and path
   * @param workspaceId the workspace ID to use
   * @param path the path of the project
   * @param data the project body description
   * @returns {$promise|*|T.$promise}
   */
  fetchPermissions(workspaceId, path) {
    let promise = this.remoteProjectsAPI.getPermissions({workspaceId: workspaceId, path: path}).$promise;

    let storePermissionsPromise = promise.then((permissions) => {

      var workspaceMap = this.permissionsPerWorkspaceMap.get(workspaceId);
      if (!workspaceMap) {
        workspaceMap = new Map();
        this.permissionsPerWorkspaceMap.set(workspaceId, workspaceMap);
      }

      var projectMap = workspaceMap.get(path);
      if (!projectMap) {
        projectMap = new Map();
        workspaceMap.set(path, projectMap);
      }
      projectMap.set(path, permissions);

      return permissions;
    });

    // update permissions with users

    let updateUsersPromise = storePermissionsPromise.then((permissions) => {
      var allpromises = [];
      //allpromises.push(storePermissionsPromise);

      permissions.forEach((permission)=> {
        if (permission.principal.type === 'USER' && permission.principal.name === 'any') {
          permission.principal.email = 'Any user';
          permission.principal.fullname = 'Public project sharing';
        } else if (permission.principal.type === 'USER') {
          var principalId = permission.principal.name;
          let userPromise = this.codenvyUser.fetchUserId(principalId);
          let profilePromise = this.codenvyProfile.fetchProfileId(principalId);
          let updateProfilePromise = profilePromise.then(() => {
            var profile = this.codenvyProfile.getProfileFromId(principalId);
            permission.principal.fullname = this.getFullName(profile);

          }, (error) => {
            if (error.status === 304) {
              // get from cache
              var profile = this.codenvyProfile.getProfileFromId(principalId);
              permission.principal.fullname = this.getFullName(profile);

            } else {
              // unable to get user
              permission.principal.fullname = permission.principal.name;
            }
          });


          let updatedUserPromise = userPromise.then(() => {
            var user = this.codenvyUser.getUserFromId(principalId);
            permission.principal.email = user.email;

          }, (error) => {
            if (error.status === 304) {
              // get from cache
              var user = this.codenvyUser.getUserFromId(principalId);
              permission.principal.email = user.email;

            } else {
              // unable to get user
              permission.principal.email = permission.principal.name;
            }
          });


          allpromises.push(updatedUserPromise);
          allpromises.push(updateProfilePromise);
        }
      });
      return this.$q.all(allpromises);
    });





    return updateUsersPromise;

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



  updatePermissions(workspaceId, path, data) {
    let promise = this.remoteProjectsAPI.updatePermissions({workspaceId: workspaceId, path: path}, data).$promise;
    return promise;

  }

  /**
   * Return last retrieved permissions
   * @param workspaceId
   * @param path
   * @returns {*}
   */
  getPermissions(workspaceId, path) {
    var workspaceMap = this.permissionsPerWorkspaceMap.get(workspaceId);
    if (!workspaceMap) {
      return [];
    }
    var projectMap = workspaceMap.get(path);
    if (!projectMap) {
      return [];
    }
    return projectMap.get(path);

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

  updateProjectDetails(projectDetails) {
    let promise = this.remoteProjectsAPI.update({
      workspaceId: projectDetails.workspaceId,
      path: projectDetails.name
    }, projectDetails).$promise;

    return promise;
  }

  rename(workspaceId, projectName, newProjectName) {
    let promise = this.remoteProjectsAPI.rename({workspaceId: workspaceId, path: projectName, name: newProjectName}, null).$promise;

    return promise;
  }

  setVisibility(workspaceId, projectName, visibility) {
    let promise = this.remoteProjectsAPI.setVisibility({
      workspaceId: workspaceId,
      path: projectName,
      visibility: visibility
    }, null).$promise;

    return promise;
  }

  remove(workspaceId, projectName) {
  let promise = this.remoteProjectsAPI.remove({workspaceId: workspaceId, path: projectName}).$promise;

    return promise;
}

}

// Register this factory
Register.getInstance().factory('codenvyProject', CodenvyProject);
