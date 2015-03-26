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
 * @author Oleksii Orel
 */
class ProjectDetailsCtrl {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor($route, $location, codenvyAPI, $mdDialog, codenvyNotificationService) {
    this.codenvyNotificationService = codenvyNotificationService;
    this.codenvyAPI = codenvyAPI;
    this.$mdDialog = $mdDialog;
    this.$location = $location;

    this.askedWorkspaceId = $route.current.params.workspaceId;
    this.askedProjectName = $route.current.params.projectName;
    this.loading = true;

    this.projectDeleted = false;

    this.oldName = null;
    this.oldDescription = null;
    this.oldVisibility = null;

    let promise = codenvyAPI.getProject().getProjectDetails(this.askedWorkspaceId, this.askedProjectName);

    promise.then((projectDetails) => {
      this.oldName = projectDetails.name;
      this.oldDescription = projectDetails.description;
      this.oldVisibility = projectDetails.visibility;
      this.projectDetails = projectDetails;
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.invalidProject = error.statusText;
    });


    this.toolbarIcons = [{name:'favorite', font:'material-design icon-ic_star_24px'},
      {name:'share', font:'material-design icon-ic_share_24px'}
    ];
  }


  updateLocation() {
    if (this.$location.path().endsWith(this.projectDetails.name)) {
      return;
    }
    this.$location.path('/project/' + this.projectDetails.workspaceId + '/' + this.projectDetails.name);
  }

  setProjectDetails(projectDetails) {

    let promise = this.codenvyAPI.getProject().updateProjectDetails(projectDetails);

    promise.then(() => {
      this.oldDescription = projectDetails.description;
      this.codenvyNotificationService.showInfo('Profile successfully updated.');
      this.updateLocation();
    }, (error) => {
      this.projectDetails.description = this.oldDescription;
      this.codenvyNotificationService.showError(error.data.message !== null ? error.data.message : 'Update information failed.');
      console.log('error', error);
    });

  }

  updateInfo(isDisabled) {
    if (isDisabled) {
      return;
    }

    if (this.oldName === this.projectDetails.name) {
      this.setProjectDetails(this.projectDetails);
    } else {

      let promise = this.codenvyAPI.getProject().rename(this.projectDetails.workspaceId, this.oldName, this.projectDetails.name);

      promise.then(() => {
        this.oldName = this.projectDetails.name;
        if (this.oldDescription === this.projectDetails.description) {
          this.codenvyNotificationService.showInfo('Profile successfully updated.');
          this.updateLocation();
        } else {
          this.setProjectDetails(this.projectDetails);
        }
      }, (error) => {
        this.projectDetails.name = this.oldName;
        this.codenvyNotificationService.showError(error.data.message !== null ? error.data.message : 'Update information failed.');
        console.log('error', error);
      });
    }

  }

  updateVisibility() {
    if (this.oldVisibility === this.projectDetails.visibility) {
      return;
    }

    let promise = this.codenvyAPI.getProject().setVisibility(this.projectDetails.workspaceId, this.projectDetails.name, this.projectDetails.visibility);

    promise.then(() => {
      this.oldVisibility = this.projectDetails.visibility;
      this.codenvyNotificationService.showInfo('Update visibility completed.');
    }, (error) => {
      this.projectDetails.visibility = this.oldVisibility;
      this.codenvyNotificationService.showError(error.data.message !== null ? error.data.message : 'Update visibility failed.');
      console.log('error', error);
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

