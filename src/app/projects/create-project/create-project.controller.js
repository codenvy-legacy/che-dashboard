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
  constructor (codenvyAPI, $filter, $timeout, $location, $anchorScroll) {
    this.codenvyAPI = codenvyAPI;
    this.$timeout = $timeout;
    this.$location = $location;
    this.$anchorScroll = $anchorScroll;

    var workspace = codenvyAPI.getWorkspace();

    // fetch workspaces when initializing
    let promise = codenvyAPI.getWorkspace().fetchWorkspaces();

    // keep references on workspaces and projects
    this.workspaces = workspace.getWorkspaces();

    promise.then(() => {
      this.workspaceSelected = this.workspaces[0];
    });


    this.currentTab = '';

    this.forms = new Map();

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

    this.importProjectData.source.project.type = 'git';

    codenvyAPI.getProjectType().fetchTypes();
    this.typesByCategory = codenvyAPI.getProjectType().getTypesByCategory();


    this.jsonConfig = {};
    this.jsonConfig.content = '{}';
    try {
      this.jsonConfig.content = $filter('json')(angular.fromJson(this.importProjectData), 2);
    } catch (e) {
      // ignore the error
    }
  }


  initCodeMirrorInstance(editorInstance) {
    this.codeMirrorInstance = editorInstance;
  }

  refreshCM() {
    // hack to make a refresh of the zone
    this.importProjectData.cm = 'aaa';
    this.$timeout(() => { delete this.importProjectData.cm;}, 500);
  }

  update() {
    try {
      this.importProjectData = angular.fromJson(this.jsonConfig.content);
    } catch (e) {
      // invalid JSON, ignore
    }

  }



  selectGitHubRepository(gitHubRepository) {
    this.importProjectData.project.name = gitHubRepository.name;
    this.importProjectData.project.description = gitHubRepository.description;
    this.importProjectData.source.project.location = gitHubRepository.clone_url;

   /* this.$timeout(() => {
      this.$location.hash('create-project-button-import');
      this.$anchorScroll();
    }, 500);*/

  }


  checkValidFormState() {
    // check project information form and selected tab form
    return true;


    /*var currentForm = this.forms.get(this.currentTab);
    if (currentForm) {
      return this.projectInformationForm.$valid && currentForm.$valid;
    } else {
      return this.projectInformationForm.$valid;
    }*/
  }

  setProjectInformationForm(form) {
    this.projectInformationForm = form;
  }


  setForm(form, mode) {
    this.forms.set(mode, form);
  }

  setCurrentTab(tab) {
    this.currentTab = tab;
    if ('zip' === tab) {
      this.importProjectData.source.project.type = 'zip';
    } else if ('git' === tab) {
      this.importProjectData.source.project.type = 'git';
    }
  }


  import() {
    if (this.currentTab === 'blank') {
      // no source, data is .project subpart
      let promise = this.codenvyAPI.getProject().createProject(this.workspaceSelected.workspaceReference.id, this.importProjectData.project.name, this.importProjectData.project);
      promise.then((data) => {console.log('success with data', data);}, (error) => {console.log('error with error', error);});


    } else {
      let promise = this.codenvyAPI.getProject().importProject(this.workspaceSelected.workspaceReference.id, this.importProjectData.project.name, this.importProjectData);
      promise.then((data) => {console.log('success with data', data);}, (error) => {console.log('error with error', error);});

    }


  }

  cdvySelecter(name, valueSelected) {
    this.importProjectData.project.type = valueSelected.type;
  }


}

export default CreateProjectCtrl;
