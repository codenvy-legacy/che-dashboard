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
 * This class is handling the controller for listing the projects
 * @author Florent Benoit
 */
class ListProjectsCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor (codenvyAPI) {
    this.codenvyAPI = codenvyAPI;
    var workspace = codenvyAPI.getWorkspace();

    this.state = 'loading';

    // fetch workspaces when initializing
    let promise = codenvyAPI.getWorkspace().fetchWorkspaces();

    promise.then(() => {
        this.workspacesById = workspace.getWorkspacesById();
        this.projectsPerWorkspace = codenvyAPI.getProject().getProjectsByWorkspace();
        this.state = 'loaded';
      },
      () => {
        this.state = 'error';
      });


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

export default ListProjectsCtrl;
