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
 * Constroller for a project details
 * @author Florent Benoit
 */
class ProjectDetailsCtrl {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor ($route, codenvyAPI) {
    this.codenvyAPI = codenvyAPI;

    this.askedWorkspaceId = $route.current.params.workspaceId;
    this.askedProjectName = $route.current.params.projectName;
    this.loading = true;

    let promise = codenvyAPI.getProject().getProjectDetails(this.askedWorkspaceId, this.askedProjectName);

    promise.then((projectDetails) => {
      this.projectDetails = projectDetails;
      this.loading = false;
    }, (error) => {
      this.loading = false;
      console.log('error is ', error);
      this.invalidProject = error.statusText;
    });

  }



}

export default ProjectDetailsCtrl;

