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
 * @ngdoc controller
 * @name projects.list.controller:ListProjectsCtrl
 * @description This class is handling the controller for listing the projects
 * @author Florent Benoit
 */
class ListProjectsCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($mdDialog, codenvyAPI, codenvyNotification) {
    this.$mdDialog = $mdDialog;
    this.codenvyAPI = codenvyAPI;
    this.codenvyNotification = codenvyNotification;

    this.filtersWorkspaceSelected = {};
    this.projectFilter = {name: ''};
    this.projectsSelectedStatus = {};
    this.workspacesById = codenvyAPI.getWorkspace().getWorkspacesById();



    this.isLoading = true;
    // fetch workspaces when initializing
    let promise = codenvyAPI.getWorkspace().fetchWorkspaces();

    promise.then(() => {
        this.updateData();
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        if (error.status === 304) {
          this.updateData();
        }
      });

    let profilePreferences = codenvyAPI.getProfile().getPreferences();

    this.profileCreationDate = profilePreferences['codenvy:created'];

    this.dropDownOptionsList = [
      {
        name: 'Filter Workspace', id: 'workspaceFilter'
      }, {
        name: 'Delete all selected projects', deleteAll: 'true'
      }/*, {
       name: 'Favorited Projects'
       }*/
    ];

    // by default, the workspace filter is hidden
    this.displayWorkspaceFilter = false;

  }

  updateData() {
    this.workspaces = this.codenvyAPI.getWorkspace().getWorkspaces();
    this.projectsPerWorkspace = this.codenvyAPI.getProject().getProjectsByWorkspace();
    // init the filters of workspaces
    this.workspaces.forEach((workspace) => {
      this.filtersWorkspaceSelected[workspace.workspaceReference.id] = true;
    });
  }

  /**
   * Gets the name of the workspace based on its ID
   * @param workspaceId
   * @returns {CodenvyWorkspaceReferenceBuilder.name|*}
   */
  getWorkspaceName(workspaceId) {
    return this.workspacesById.get(workspaceId).name;
  }

  /**
   * Callback called when the dropdown on the list projects is called
   * @param selected the selected element
   * @param event the $event
   */
  dropDownSelected(selected, event) {
    // hit the workspace filter
    if (selected.deleteAll) {
      this.deleteSelectedFactories(event);
    } else if ('workspaceFilter' === selected.id) {
      this.displayWorkspaceFilter = true;
    }
  }


  /**
   * Hide the workspace filter menu
   */
  hideWorkspaceFilter() {
    this.displayWorkspaceFilter = false;
  }

  /**
   * All workspaces should be selected
   */
  resetWorkspaceFilter() {
    var keys = Object.keys(this.filtersWorkspaceSelected);
    keys.forEach((key) => {
      this.filtersWorkspaceSelected[key] = true;
    });
  }

  /**
   * Delete all selected projects
   * @param event
   */
  deleteSelectedFactories(event) {
    let projectsSelectedStatusKeys = Object.keys(this.projectsSelectedStatus);
    let checkedProjectsKeys = [];

    if (projectsSelectedStatusKeys.length) {

      var ctrl = this;
      projectsSelectedStatusKeys.forEach(function (key) {
        if (ctrl.projectsSelectedStatus[key] === true) {
          checkedProjectsKeys.push(key);
        }
      });
      var queueLenth = checkedProjectsKeys.length;
      if (queueLenth) {
        let confirmTitle = 'Would you like to delete ';
        if (queueLenth > 1) {
          confirmTitle += 'these ' + queueLenth + ' projects?';
        } else {
          confirmTitle += 'this selected project?';
        }
        let confirm = this.$mdDialog.confirm()
          .title(confirmTitle)
          .content('Please confirm for the removal.')
          .ariaLabel('Remove projects')
          .ok('Delete!')
          .cancel('Cancel')
          .clickOutsideToClose(true)
          .targetEvent(event);
        this.$mdDialog.show(confirm).then(() => {
          var isError = false;
          checkedProjectsKeys.forEach((key) => {
            // remove it !
            var partsArray = key.split('/');
            if (partsArray.length === 2) {
              this.projectsSelectedStatus[key] = false;
              let promise = this.codenvyAPI.getProject().remove(partsArray[0], partsArray[1]);
              promise.then(() => {
                queueLenth--;
                if (!queueLenth) {
                  if (isError) {
                    this.codenvyNotification.showError('Delete failed.');
                  } else {
                    this.codenvyNotification.showInfo('Has been successfully removed.');
                  }
                }
              }, (error) => {
                queueLenth--;
                if (!queueLenth) {
                  this.codenvyNotification.showError('Delete failed.');
                }
                console.log('error', error);
              });
            } else {
              this.codenvyNotification.showError('No such project.');
            }
          });
        });
      } else {
        this.codenvyNotification.showError('No selected projects.');
      }
    } else {
      this.codenvyNotification.showError('No selected projects.');
    }
  }
}

export default ListProjectsCtrl;
