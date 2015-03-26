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


import Register from '../../utils/register';

/**
 * This class is providing helper methods for simulating a fake HTTP backend simulating
 * @author Florent Benoit
 */
class CodenvyHttpBackend {

  /**
   * Constructor to use
   */
  constructor ($httpBackend, codenvyAPIBuilder) {
    this.httpBackend = $httpBackend;
    this.projectsPerWorkspace = new Map();
    this.workspaces = [];
    this.usersMap = new Map();
    this.profilesMap = new Map();
    this.projectDetailsMap = new Map();
    this.projectPermissionsMap = new Map();


    this.defaultUser = codenvyAPIBuilder.getUserBuilder().withId('idDefaultUser').withEmail('defaultuser@codenvy.com').build();
    this.defaultProfile = codenvyAPIBuilder.getProfileBuilder().withId('idDefaultUser').withEmail('defaultuser@codenvy.com').withFirstName('FirstName').withLastName('LastName').build();

  }


  /**
   * Setup all data that should be retrieved on calls
   */
  setup() {
    // add the remote call
    this.httpBackend.when('GET', '/api/workspace/all').respond(this.workspaces);
    this.httpBackend.when('GET', '/api/project-type').respond(this.projectTypes);


    //users
    this.httpBackend.when('GET', '/api/user').respond(this.defaultUser);
    var userKeys = this.usersMap.keys();
    for (let key of userKeys) {
      this.httpBackend.when('GET', '/api/user/' + key).respond(this.usersMap.get(key));
    }

    //profiles
    this.httpBackend.when('GET', '/api/profile').respond(this.defaultProfile);
    var profileKeys = this.profilesMap.keys();
    for (let key of profileKeys) {
      this.httpBackend.when('GET', '/api/profile/' + key).respond(this.profilesMap.get(key));
    }

    /// project details
    var projectDetailsKeys = this.projectDetailsMap.keys();
    for (let projectKey of projectDetailsKeys) {
      this.httpBackend.when('GET', '/api/project/' + projectKey).respond(this.projectDetailsMap.get(projectKey));
    }

    // permissions
    var projectPermissionsKeys = this.projectPermissionsMap.keys();
    for (let key of projectPermissionsKeys) {
      this.httpBackend.when('GET', '/api/project/' + key.workspaceId + '/permissions/' + key.projectName).respond(this.projectPermissionsMap.get(key));
    }


  }


  /**
   * Add the given workspaces on this backend
   * @param workspaces an array of workspaces
   */
  addWorkspaces(workspaces) {
    workspaces.forEach((workspace) => {

      // if there is a workspace ID, add empty projects
      if (workspace.workspaceReference.id) {
        this.projectsPerWorkspace.set(workspace.workspaceReference.id, []);
      }

      this.workspaces.push(workspace);
    });

  }


  /**
   * Adds the given projects for the given workspace
   * @param workspace the workspace to use for adding projects
   * @param projects the projects to add
   */
  addProjects(workspace, projects) {
    // we need the workspaceReference ID
    if (!workspace.workspaceReference.id) {
      throw 'no workspace id set';
    }

    // empty array if not yet defined
    if (!this.projectsPerWorkspace.get(workspace.workspaceReference.id)) {
      this.projectsPerWorkspace.set(workspace.workspaceReference.id, []);
    }

    // add each project
    projects.forEach((project) => {
        this.projectsPerWorkspace.get(workspace.workspaceReference.id).push(project);
      }
    );

    // add call to the backend
    this.httpBackend.when('GET', '/api/project/' + workspace.workspaceReference.id).respond(this.projectsPerWorkspace.get(workspace.workspaceReference.id));

  }

  /**
   * Add the given project types
   * @param projectTypes
   */
  addProjectTypes(projectTypes) {
    this.projectTypes = projectTypes;
  }

  /**
   * Add the given user
   * @param user
   */
  setDefaultUser(user) {
    this.defaultUser = user;
  }

  /**
   * Add the given user
   * @param user
   */
  addUserId(user) {
    this.usersMap.put(user.id, user);
  }

  /**
   * Add the given profile
   * @param profile
   */
  addDefaultProfile(profile) {
    this.defaultProfile = profile;
  }

  /**
   * Add the given profile
   * @param profile
   */
  addProfileId(profile) {
    this.profilesMap.put(profile.id, profile);
  }

  /**
   * Add the given project templates
   * @param projectTemplates
   */
  addProjectTemplates(projectTemplates) {
    this.httpBackend.when('GET', '/api/project-template').respond(projectTemplates);
  }

  /**
   * Gets the internal http backend used
   * @returns {CodenvyHttpBackend.httpBackend|*}
   */
  getHttpBackend() {
    return this.httpBackend;
  }

  /**
   * Add the project details
   * @param projectDetails the project details
   */
  addProjectDetails(projectDetails) {
    this.projectDetailsMap.set(projectDetails.workspaceId + '/' + projectDetails.name, projectDetails);
  }

  /**
   * Add the updated project details
   * @param workspaceId the id of project workspace
   * @param projectName the new project name
   * @param projectDetails the new project details
   */
  addUpdatedProjectDetails(workspaceId, projectName, projectDetails) {
    this.httpBackend.when('PUT', '/api/project/' + workspaceId + '/' + projectName).respond(projectDetails);
  }

  /**
   * Add the updated project name
   * @param workspaceId the id of project workspace
   * @param projectName the project name
   * @param newProjectName the new project name
   */
  addUpdatedProjectName(workspaceId, projectName, newProjectName) {
    this.httpBackend.when('POST', '/api/project/' + workspaceId + '/rename/' + projectName + '?name=' + newProjectName).respond(newProjectName);
  }

  /**
   * Add the switch visibility
   * @param workspaceId the id of project workspace
   * @param projectName the project name
   * @param newVisibility the new project visibility
   */
  addSwitchVisibility(workspaceId, projectName, newVisibility) {
    this.httpBackend.when('POST', '/api/project/' + workspaceId + '/switch_visibility/' + projectName + '?visibility=' + newVisibility).respond(newVisibility);
  }

  addPermissions(workspaceId, projectName, permissions) {
    var key = {workspaceId: workspaceId, projectName:projectName};
    this.projectPermissionsMap.set(key, permissions);
  }


}

export default CodenvyHttpBackend;

// Register this factory
Register.getInstance().factory('codenvyHttpBackend', CodenvyHttpBackend);
