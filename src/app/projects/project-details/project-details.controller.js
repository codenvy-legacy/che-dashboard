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
  constructor ($route, codenvyAPI, $mdDialog) {
    this.codenvyAPI = codenvyAPI;
    this.$mdDialog = $mdDialog;

    this.askedWorkspaceId = $route.current.params.workspaceId;
    this.askedProjectName = $route.current.params.projectName;
    this.loading = true;

    this.projectDeleted = false;

    let promise = codenvyAPI.getProject().getProjectDetails(this.askedWorkspaceId, this.askedProjectName);

    promise.then((projectDetails) => {
      this.projectDetails = projectDetails;
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.invalidProject = error.statusText;
    });

  }



  deleteProject(event) {
    var confirm = this.$mdDialog.confirm()
      .title('Would you like to delete the project ' + this.projectDetails.name)
      .content('Please confirm for the project removal.')
      .ariaLabel('Remove project')
      .ok('Delete it!')
      .cancel('Cancel')
      .targetEvent(event);
    this.$mdDialog.show(confirm).then(() => {
      // remove it !
      let promise = this.codenvyAPI.getProject().remove(this.projectDetails.workspaceId, this.projectDetails.name);
      promise.then(() => {
        this.projectDeleted = true;
      }, (error) => {
        console.log('error', error);
      });
    });
  }

}

export default ProjectDetailsCtrl;

