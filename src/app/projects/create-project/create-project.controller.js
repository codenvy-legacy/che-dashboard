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
class CreateProjectCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor (codenvyAPI, $filter, $timeout, $location, $mdDialog) {
    this.codenvyAPI = codenvyAPI;
    this.$timeout = $timeout;
    this.$location = $location;
    this.$mdDialog = $mdDialog;


    // keep references on workspaces and projects
    this.workspaces = [];


    // Text that will be used by the websocket processing when performing import
    this.importingData = '';

    // fetch workspaces when initializing
    let promise = codenvyAPI.getWorkspace().fetchWorkspaces();
    promise.then(() => {
        this.updateData();
      },
      (error) => {
        // etag handling so also retrieve last data that were fetched before
        if (error.status === 304) {
          // ok
          this.updateData();
          return;
        }
        this.state = 'error';
      });

    // selected current tab
    this.currentTab = '';


    // all forms that we have
    this.forms = new Map();

    // JSON used for import data
    this.importProjectData = {
      source: {
        project: {
          location: '',
          type: ''
        }
      },
      project: {
        name: '',
        description: '',
        type: 'blank',
        visibility: 'public'
      }
    };

    // by default project type is git
    this.importProjectData.source.project.type = 'git';

    this.jsonConfig = {};
    this.jsonConfig.content = '{}';
    try {
      this.jsonConfig.content = $filter('json')(angular.fromJson(this.importProjectData), 2);
    } catch (e) {
      // ignore the error
    }


    this.importing = false;

  }


  /**
   * Fetching operation has been done, so get workspaces and websocket connection
   */
  updateData() {

    this.workspaces = this.codenvyAPI.getWorkspace().getWorkspaces();
    this.workspaceSelected = this.workspaces[0];

    // generate project name
    this.generateProjectName(true);

    // init WS bus
    this.messageBus = this.codenvyAPI.getWebsocket().getBus(this.workspaceSelected.workspaceReference.id);


  }

  /**
   * Force codemirror editor to be refreshed
   */
  refreshCM() {
    // hack to make a refresh of the zone
    this.importProjectData.cm = 'aaa';
    this.$timeout(() => { delete this.importProjectData.cm;}, 500);
  }

  /**
   * Update internal json data from JSON codemirror editor config file
   */
  update() {
    try {
      this.importProjectData = angular.fromJson(this.jsonConfig.content);
    } catch (e) {
      // invalid JSON, ignore
    }

  }


  /**
   * Select the given github repository
   * @param gitHubRepository the repository selected
   */
  selectGitHubRepository(gitHubRepository) {
    this.importProjectData.project.name = gitHubRepository.name;
    this.importProjectData.project.description = gitHubRepository.description;
    this.importProjectData.source.project.location = gitHubRepository.clone_url;
  }


  /**
   * Checks if the current forms are being validated
   * @returns {boolean|FormController.$valid|*|ngModel.NgModelController.$valid|context.ctrl.$valid|Ic.$valid}
   */
  checkValidFormState() {
    // check project information form and selected tab form
    var currentForm = this.forms.get(this.currentTab);


    if (currentForm) {
      return this.projectInformationForm && this.projectInformationForm.$valid && currentForm.$valid;
    } else {
      return this.projectInformationForm && this.projectInformationForm.$valid;
    }
  }

  /**
   * Defines the project information form
   * @param form
   */
  setProjectInformationForm(form) {
    this.projectInformationForm = form;
  }


  /**
   * Sets the form for a given mode
   * @param form the selected form
   * @param mode the tab selected
   */
  setForm(form, mode) {
    this.forms.set(mode, form);
  }

  /**
   * Sets the current selected tab
   * @param tab the selected tab
   */
  setCurrentTab(tab) {
    this.currentTab = tab;
    if ('zip' === tab) {
      this.importProjectData.source.project.type = 'zip';
    } else if ('git' === tab) {
      this.importProjectData.source.project.type = 'git';
    }
  }

  /**
   * Call the import operation that may create or import a project
   */
  import() {
    var promise;

    // check workspace is selected
    if (!this.workspaceSelected || !this.workspaceSelected.workspaceReference) {
      this.$mdDialog.show(
        this.$mdDialog.alert()
          .title('No workspace selected')
          .content('No workspace is selected')
          .ariaLabel('Project creation')
          .ok('OK')
      );
      return;
    }

    // mode
    this.importing = true;

    var mode = '';

    // websocket channel
    var channel = 'importProject:output:' + this.workspaceSelected.workspaceReference.id + ':' + this.importProjectData.project.name;


    // select mode (create or import)
    if (this.currentTab === 'blank') {
      // no source, data is .project subpart
      promise = this.codenvyAPI.getProject().createProject(this.workspaceSelected.workspaceReference.id, this.importProjectData.project.name, this.importProjectData.project);
      mode = 'createProject';
    } else {
      mode = 'importProject';
      // on import
      this.messageBus.subscribe(channel, (message) => {
        this.importingData = message.line;
      });

      promise = this.codenvyAPI.getProject().importProject(this.workspaceSelected.workspaceReference.id, this.importProjectData.project.name, this.importProjectData);
    }
    promise.then((data) => {
      this.importing = false;
      this.importingData = '';

      if (mode === 'importProject') {
        data = data.projectDescriptor;
      }

      // need to redirect to the project details as it has been created !
      this.$location.path('project/' + data.workspaceId + '/' + data.name);

      this.messageBus.unsubscribe(channel);

    }, (error) => {
      this.messageBus.unsubscribe(channel);
      this.importing = false;
      this.importingData = '';
      // need to show the error
      this.$mdDialog.show(
        this.$mdDialog.alert()
          .title('Error while creating the project')
          .content(error.statusText + ': ' + error.data.message)
          .ariaLabel('Project creation')
          .ok('OK')
      );
    });


  }


  /**
   * Generates a default project name only if user has not entered any data
   * @param firstInit on first init, user do not have yet initialized something
   */
  generateProjectName(firstInit) {

    // name has not been modified by the user
    if (firstInit || (this.projectInformationForm.projectInformationForm.deskname.$pristine && this.projectInformationForm.projectInformationForm.name.$pristine)) {
      // generate a name

      // starts with project
      var name = 'project';

      // type selected
      if (this.importProjectData.project.type) {
        name = this.importProjectData.project.type;
      }

      name = name + '-' + (('0000' + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4));

      this.importProjectData.project.name = name;


    }

  }


  /**
   * Callback when selecter has been set
   * @param name
   * @param valueSelected
   */
  cdvySelecter(name, valueSelected) {
    this.importProjectData.project.type = valueSelected.id;

    // generate name
    this.generateProjectName();

  }

  isImporting() {
    return this.importing;
  }


}

export default CreateProjectCtrl;
