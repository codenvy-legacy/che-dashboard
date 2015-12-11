'use strict';

/**
 * @ngdoc controller
 * @name workspace.details.controller:WorkspaceDetailsProcessesCtrl
 * @description This class handling the controller for running processes of workspace
 */
class WorkspaceDetailsProcessesCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($route, codenvyAPI, codenvyRunner) {
    this.codenvyAPI = codenvyAPI;
    this.codenvyRunner = codenvyRunner;

    this.workspaceId = $route.current.params.workspaceId;

    this.runningProcesses = [];
    let promiseProcesses = this.codenvyRunner.fetchRunningProcesses(this.workspaceId);
    promiseProcesses.then(() => {
      this.updateRunningProcesses();
    });
  }

  updateRunningProcesses() {
    this.runningProcesses = this.codenvyRunner.getRunningProcesses(this.workspaceId);
    for (var i=0; i<this.runningProcesses.length; i++) {
      var process = this.runningProcesses[i];
      process.projectName = process.project.substr(1, process.project.length);
    }
  }

}

export default WorkspaceDetailsProcessesCtrl;
