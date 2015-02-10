/*******************************************************************************
 * Copyright (c) 2015 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 *******************************************************************************/

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
   * Gets the internal http backend used
   * @returns {CodenvyHttpBackend.httpBackend|*}
   */
  getHttpBackend() {
    return this.httpBackend;
  }


}

export default CodenvyHttpBackend;

// Register this factory
Register.getInstance().factory('codenvyHttpBackend', CodenvyHttpBackend);
