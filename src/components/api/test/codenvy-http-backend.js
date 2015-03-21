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
  constructor ($httpBackend) {
    this.httpBackend = $httpBackend;
    this.projectsPerWorkspace = new Map();
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
    });

    // add the remote call
    this.httpBackend.when('GET', '/api/workspace/all').respond(workspaces);

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
    this.httpBackend.when('GET', '/api/project-type').respond(projectTypes);
  }

  /**
   * Add the given user
   * @param user
   */
  addUser(user) {
    this.httpBackend.when('GET', '/api/user').respond(user);
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
    this.httpBackend.when('GET', '/api/project/' + projectDetails.workspaceId + '/' + projectDetails.name).respond(projectDetails);
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


}

export default CodenvyHttpBackend;

// Register this factory
Register.getInstance().factory('codenvyHttpBackend', CodenvyHttpBackend);
