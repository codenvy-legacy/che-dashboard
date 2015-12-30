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
/*global $:false, window:false */

/**
 * This class is handling the controller for the projects
 * @author Florent Benoit
 */
class CreateProjectCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor (codenvyAPI, $websocket, $routeParams, $filter, $timeout, $location, $mdDialog, $scope, $rootScope, createProjectSvc) {
    this.codenvyAPI = codenvyAPI;
    this.$websocket = $websocket;
    this.$timeout = $timeout;
    this.$location = $location;
    this.$mdDialog = $mdDialog;
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.messageBus = null;
    this.createProjectSvc = createProjectSvc;



    // subitem not yet completed
    this.projectBlankCompleted = false;

    // keep references on workspaces and projects
    this.workspaces = [];

    // default options
    this.selectSourceOption = 'select-source-new';
    this.selectWorkspaceOption = 'select-workspace-create';

    // default RAM value for workspaces
    this.workspaceRam = 1000;
    this.websocketReconnect = 50;

    this.generateWorkspaceName();

    this.headerSteps = [
      {
        id: '#create-project-source-id',
        name: 'source',
        link: 'create-project-source'
      },
      {
        id: '#create-project-source-stack',
        name: 'stack',
        link: 'create-project-stack'
      },
      {
        id: '#create-project-source-information',
        name: 'information',
        link: 'create-project-information'
      }
    ];


    //search the selected tab
    let routeParams = $routeParams.tabName;
    if (!routeParams) {
      this.selectedTabIndex = 0;
    } else {
      switch (routeParams) {
        case 'blank':
          this.selectedTabIndex = 0;
          break;
        case 'samples':
          this.selectedTabIndex = 1;
          break;
        case 'git':
          this.selectedTabIndex = 2;
          break;
        case 'github':
          this.selectedTabIndex = 3;
          break;
        case 'zip':
          this.selectedTabIndex = 4;
          break;
        case 'config':
          this.selectedTabIndex = 2;
          break;
        default:
          $location.path('/create-project');
      }

    }

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
    this.importProjectData = this.getDefaultProjectJson();

    this.jsonConfig = {};
    this.jsonConfig.content = '{}';
    try {
      this.jsonConfig.content = $filter('json')(angular.fromJson(this.importProjectData), 2);
    } catch (e) {
      // ignore the error
    }

    $rootScope.$on('create-project-blank:initialized', () => {
      this.projectBlankCompleted = true;
    });

    // sets isReady status after selection
    $rootScope.$on('create-project-github:selected', () => {
      if(!this.isReady && this.currentTab === 'github'){
        this.isReady = true;
      }
    });
    $rootScope.$on('create-project-samples:selected', () => {
      if(!this.isReady && this.currentTab === 'samples') {
        this.isReady = true;
      }
    });

    this.isChangeableName = true;
    this.isChangeableDescription = true;

    $scope.$watch('createProjectCtrl.importProjectData.project.name', (newProjectName) => {

      if (newProjectName === '') {
        return;
      }

      if (!this.isChangeableName) {
        return;
      }
      this.projectName = newProjectName;
    });
    $scope.$watch('createProjectCtrl.importProjectData.project.description', (newProjectDescription) => {
      if (!this.isChangeableDescription) {
        return;
      }
      this.projectDescription = newProjectDescription;
    });

  }


  /**
   * Gets default project JSON used for import data
   */
  getDefaultProjectJson() {
    return {
      source: {
          location: '',
          parameters: {}
      },
      project: {
        name: '',
        description: '',
      }
    };
  }

  /**
   * Check changeable status for project name field
   */
  checkChangeableNameStatus() {
    if ('config' === this.currentTab) {
      this.importProjectData.project.name = angular.copy(this.projectName);
      return;
    }
    this.isChangeableName = this.projectName === this.importProjectData.project.name;
  }

  /**
   * Check changeable status for project description field
   */
  checkChangeableDescriptionStatus() {
      if ('config' === this.currentTab) {
        this.importProjectData.project.description = angular.copy(this.projectDescription);
        return;
      }
      this.isChangeableDescription = this.projectDescription === this.importProjectData.project.description;
  }

  /**
   * Fetching operation has been done, so get workspaces and websocket connection
   */
  updateData() {

    this.workspaces = this.codenvyAPI.getWorkspace().getWorkspaces();

    // generate project name
    this.generateProjectName(true);

    // init WS bus
    if (this.workspaces.length > 0) {
      this.messageBus = this.codenvyAPI.getWebsocket().getBus(this.workspaces[0].id);
    }

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
    this.importProjectData.source.location = gitHubRepository.clone_url;
  }


  /**
   * Checks if the current forms are being validated
   * @returns {boolean|FormController.$valid|*|ngModel.NgModelController.$valid|context.ctrl.$valid|Ic.$valid}
   */
  checkValidFormState() {
    // check project information form and selected tab form

    if (this.selectSourceOption === 'select-source-new') {
      return this.projectInformationForm && this.projectInformationForm.$valid;
    } else if (this.selectSourceOption === 'select-source-existing') {
      var currentForm = this.forms.get(this.currentTab);
      if (currentForm) {
        return this.projectInformationForm && this.projectInformationForm.$valid && currentForm.$valid;
      }
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
    this.importProjectData = this.getDefaultProjectJson();

    if ('blank' === tab) {
      this.importProjectData.project.type = 'blank';
    } else if ('git' === tab || 'github' === tab) {
      this.importProjectData.source.type = 'git';
    } else if ('zip' === tab) {
      this.importProjectData.project.type = '';
    } else if ('config' === tab) {
      this.importProjectData.project.type = 'blank';
      this.importProjectData.source.type = 'git';
      // set name and description from input fields into object
      if (!this.isChangeableDescription) {
        this.importProjectData.project.description = angular.copy(this.projectDescription);
      }
      if (!this.isChangeableName) {
        this.importProjectData.project.name = angular.copy(this.projectName);
      }
      this.refreshCM();
    }
    // github and samples tabs have broadcast selection events for isReady status
    this.isReady = !('github' === tab || 'samples' === tab);
  }


  startWorkspace(bus, data) {

    // then we've to start workspace
    this.createProjectSvc.setCurrentProgressStep(1);
    let startWorkspacePromise = this.codenvyAPI.getWorkspace().startWorkspace(data.id, data.name);

    startWorkspacePromise.then((data) => {
      // get channels
      let environments = data.environments;
      let envName = data.name;
      let channels = environments[envName].machineConfigs[0].channels;
      let statusChannel = channels.status;
      let outputChannel = channels.output;
      let agentChannel = 'workspace:' + data.id + ':ext-server:output';


      let workspaceId = data.id;

      // for now, display log of status channel in case of errors
      bus.subscribe(statusChannel, (message) => {
        if (message.eventType === 'DESTROYED' && message.workspaceId === data.id) {
          this.getCreationSteps()[this.getCurrentProgressStep()].hasError = true;

          // need to show the error
          this.$mdDialog.show(
              this.$mdDialog.alert()
                  .title('Unable to start workspace')
                  .content('Unable to start workspace. It may be linked to OutOfMemory or the container has been destroyed')
                  .ariaLabel('Workspace start')
                  .ok('OK')
          );
        }
        if (message.eventType === 'ERROR' && message.workspaceId === data.id) {
          this.getCreationSteps()[this.getCurrentProgressStep()].hasError = true;
          // need to show the error
          this.$mdDialog.show(
              this.$mdDialog.alert()
                  .title('Error when starting workspace')
                  .content('Unable to start workspace. Error when trying to start the workspace: ' + message.error)
                  .ariaLabel('Workspace start')
                  .ok('OK')
          );
        }
        console.log('Status channel of workspaceID', workspaceId, message);
      });

      bus.subscribe(agentChannel, (message) => {
        let agentStep = 2;
        if (this.getCreationSteps()[agentStep].logs.length > 0) {
          this.getCreationSteps()[agentStep].logs = this.getCreationSteps()[agentStep].logs + '\n' + message;
        } else {
          this.getCreationSteps()[agentStep].logs = message;
        }
      });

      bus.subscribe(outputChannel, (message) => {
        if (this.getCreationSteps()[this.getCurrentProgressStep()].logs.length > 0) {
          this.getCreationSteps()[this.getCurrentProgressStep()].logs = this.getCreationSteps()[this.getCurrentProgressStep()].logs + '\n' + message;
        } else {
          this.getCreationSteps()[this.getCurrentProgressStep()].logs = message;
        }
      });

    });
  }

  createProjectInWorkspace(workspaceId, projectName, projectData, bus) {
    this.createProjectSvc.setCurrentProgressStep(3);

    var promise;
    var channel= null;
    // select mode (create or import)
    if (this.selectSourceOption === 'select-source-new') {

      projectData.project.type = 'blank';
      projectData.project.name = this.projectName;

      // no source, data is .project subpart
      promise = this.codenvyAPI.getProject().createProject(workspaceId, projectData.project.name, projectData.project);
    } else {

      // websocket channel
      channel = 'importProject:output:' + workspaceId + ':' + projectName;

      // on import
      bus.subscribe(channel, (message) => {
          this.getCreationSteps()[this.getCurrentProgressStep()].logs = message.line;
      });

      promise = this.codenvyAPI.getProject().importProject(workspaceId, projectName, projectData.source);
    }

    promise.then(() => {
      this.createProjectSvc.setCurrentProgressStep(4);
      // need to redirect to the project details as it has been created !
      //this.$location.path('project/' + workspaceId + '/' + projectName);
      if (channel != null) {
        bus.unsubscribe(channel);
      }

    }, (error) => {
      if (channel != null) {
        bus.unsubscribe(channel);
      }

      this.getCreationSteps()[this.getCurrentProgressStep()].hasError = true;

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



  connectToExtensionServer(websocketURL, workspaceId, projectName, projectData, bus) {

    // try to connect
    let websocketStream = this.$websocket(websocketURL);

    // on success, create project
    websocketStream.onOpen(() => {
      let bus = this.codenvyAPI.getWebsocket().getExistingBus(websocketStream);
      this.createProjectInWorkspace(workspaceId, projectName, projectData, bus);
    });

    // on error, retry to connect or after a delay, abort
    websocketStream.onError((error) => {
      this.websocketReconnect--;
      if (this.websocketReconnect > 0) {
        this.$timeout(() => {this.connectToExtensionServer(websocketURL, workspaceId, projectName, projectData, bus);}, 1000);
      } else {
        this.getCreationSteps()[this.getCurrentProgressStep()].hasError = true;
        console.log('error when starting remote extension', error);
        // need to show the error
        this.$mdDialog.show(
            this.$mdDialog.alert()
                .title('Unable to create project')
                .content('Unable to connect to the remote extension server after workspace creation')
                .ariaLabel('Project creation')
                .ok('OK')
        );
      }
    });
  }


  /**
   * Call the import operation that may create or import a project
   */
  import() {

    // set name and description for imported project
    if (!this.isChangeableDescription) {
      this.importProjectData.project.description = angular.copy(this.projectDescription);
    }
    if (!this.isChangeableName) {
      this.importProjectData.project.name = angular.copy(this.projectName);
    }
    this.createProjectSvc.setProject(this.importProjectData.project.name);

    // reset logs and errors
    this.resetCreateProgress();
    this.setCreateProjectInProgress();

    this.createProjectSvc.createPopup();


    // check workspace is selected
    if (this.selectWorkspaceOption === 'select-workspace-create') {
      this.createProjectSvc.setWorkspaceOfProject(this.workspaceName);
      //TODO: no account in che ? it's null when testing on localhost
      let creationPromise = this.codenvyAPI.getWorkspace().createWorkspace(null, this.workspaceName, this.recipeUrl, this.workspaceRam);
      creationPromise.then((data) => {

        // init message bus if not there
        if (this.workspaces.length === 0) {
          this.messageBus = this.codenvyAPI.getWebsocket().getBus(data.id);
        }

        // recipe url
        let bus = this.codenvyAPI.getWebsocket().getBus(data.id);

        // subscribe to workspace events
        bus.subscribe('workspace:' + data.id, (message) => {

          if (message.eventType === 'RUNNING' && message.workspaceId === data.id) {
            this.createProjectSvc.setCurrentProgressStep(2);

            this.importProjectData.project.type = 'blank';
            this.importProjectData.project.name = this.projectName;

            // Now that the container is started, wait for the extension server. For this, needs to get runtime details
            let promiseRuntime = this.codenvyAPI.getWorkspace().getRuntime(data.id);
            promiseRuntime.then((runtimeData) => {
                // extract the Websocket URL of the runtime
              let servers = runtimeData.devMachine.metadata.servers;

              var extensionServerAddress;
              for (var key in servers) {
                let server = servers[key];
                if ('extensions' === server.ref) {
                  extensionServerAddress = server.address;
                }
              }

              let endpoint = runtimeData.devMachine.metadata.envVariables.CHE_API_ENDPOINT;

              var contextPath;
              if (endpoint.endsWith('/che/api')) {
                contextPath = 'che';
              } else {
                contextPath = 'api';
              }

              // try to connect
              this.websocketReconnect = 50;
              this.connectToExtensionServer('ws://' + extensionServerAddress + '/' + contextPath + '/ext/ws/' + data.id, data.id, this.importProjectData.project.name, this.importProjectData);

            });
          }
        });
        this.$timeout(() => {this.startWorkspace(bus, data);}, 1000);

      }, (error) => {
        if (error.data.message) {
          this.getCreationSteps()[this.getCurrentProgressStep()].logs = error.data.message;
        }
        this.getCreationSteps()[this.getCurrentProgressStep()].hasError = true;

      });

    } else {
      this.createProjectSvc.setWorkspaceOfProject(this.workspaceSelected.name);


      // Get bus
      let bus = this.codenvyAPI.getWebsocket().getBus(this.workspaceSelected.id);

      // mode
      this.createProjectInWorkspace(this.workspaceSelected.id, this.importProjectData.project.name, this.importProjectData, bus);
    }

    // do we have projects ?
    let projects = this.codenvyAPI.getProject().getAllProjects();
    if (projects.length > 1) {
      // we have projects, show notification first and redirect to the list of projects
      this.createProjectSvc.showPopup();
      this.$location.path('/projects');
    }

  }


  /**
   * Generates a default project name only if user has not entered any data
   * @param firstInit on first init, user do not have yet initialized something
   */
  generateProjectName(firstInit) {
    // name has not been modified by the user
    if (firstInit || (this.projectInformationForm['deskname'].$pristine && this.projectInformationForm.name.$pristine)) {
      // generate a name

      // starts with project
      var name = 'project';

      // type selected
      if (this.importProjectData.project.type) {
        name = this.importProjectData.project.type;
      }

      name = name + '-' + (('0000' + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)); // jshint ignore:line

      this.importProjectData.project.name = name;
      this.projectName = name;
    }

  }



  /**
   * Generates a default workspace name
   */
  generateWorkspaceName() {
      // starts with wksp
      var name = 'wksp';
      name = name + '-' + (('0000' + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)); // jshint ignore:line
      this.workspaceName = name;
  }


  /**
   * Callback when selecter has been set
   * @param name
   * @param valueSelected
   */
  cdvySimpleSelecter(name) {
    this.importProjectData.project.type = name;

    // generate name
    this.generateProjectName();

  }

  isImporting() {
    return this.isCreateProjectInProgress();
  }

  isReadyToCreate() {
    return !this.isCreateProjectInProgress() && this.isReady;
  }

  resetCreateProgress() {
    this.createProjectSvc.resetCreateProgress();
  }


  resetCreateNewProject() {
    this.resetCreateProgress();
    this.generateWorkspaceName();
    this.generateProjectName(true);
  }

  showIDE() {
    this.$rootScope.showIDE = !this.$rootScope.showIDE;
  }

  getStepText(stepNumber) {
    return this.createProjectSvc.getStepText(stepNumber);
  }

  getCreationSteps() {
    return this.createProjectSvc.getProjectCreationSteps();
  }

  getCurrentProgressStep() {
    return this.createProjectSvc.getCurrentProgressStep();
  }

  isCreateProjectInProgress() {
    return this.createProjectSvc.isCreateProjectInProgress();
  }

  setCreateProjectInProgress() {
    this.createProjectSvc.setCreateProjectInProgress(true);
  }

  hideCreateProjectPanel() {
    this.createProjectSvc.showPopup();
  }

  getWorkspaceOfProject() {
    return this.createProjectSvc.getWorkspaceOfProject();
  }

  isElementVisible(index) {

    // for each id, check last
    var maxVisibleElement = 0;
    for (var i = 0; i < this.headerSteps.length; i++) {
      var visibleElement = this.isvisible(this.headerSteps[i].id);
      if (visibleElement) {
        maxVisibleElement = i;
      }
    }
    return index <= maxVisibleElement;
  }


  isvisible(elementName) {
    let element = $(elementName);
    var windowElement = $(window);

    var docViewTop = windowElement.scrollTop();
    var docViewBottom = docViewTop + windowElement.height();
    var elemTop = element.offset().top;
    var elemBottom = elemTop + element.height();

    // use elemTop if want to see all div or elemBottom if we see partially it
    /*((elemTop <= docViewBottom) && (elemTop >= docViewTop));*/
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }

}

export default CreateProjectCtrl;
