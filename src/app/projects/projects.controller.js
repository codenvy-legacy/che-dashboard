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
 * This class is handling the controller for the projects
 * @author Florent Benoit
 */
class ProjectsCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor (codenvyAPI, $timeout) {

    var workspace = codenvyAPI.getWorkspace();

    // fetch workspaces when initializing
    codenvyAPI.getWorkspace().fetchWorkspaces();

    // keep references on workspaces and projects
    this.workspaces = workspace.getWorkspaces();
    this.workspacesById = workspace.getWorkspacesById();

    this.projects = codenvyAPI.getProject().getAllProjects();
    this.projectsPerWorkspace = codenvyAPI.getProject().getProjectsByWorkspace();


    // perform another fetch
    /*$timeout(() => (codenvyAPI.getWorkspace().fetchWorkspaces(true)), 5000);*/


  }

  /**
   * Gets the name of the workspace based on its ID
   * @param workspaceId
   * @returns {CodenvyWorkspaceReferenceBuilder.workspaceReference.name|*}
   */
  getWorkspaceName(workspaceId) {
    return this.workspacesById.get(workspaceId).workspaceReference.name;
  }


}

export default ProjectsCtrl;
