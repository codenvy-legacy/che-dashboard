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

import Register from '../utils/register.js';

/**
 * This class is handling the runner API retrieval
 * @author Florent Benoit
 */
class CodenvyRunner {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor ($resource) {

    // keep resource
    this.$resource = $resource;

    // remote call
    this.remoteRunnerAPI = this.$resource('/api/runner',{}, {
      getProcesses: {method: 'GET', url: '/api/runner/processes', isArray: true},
      getProcessesInWorkspace: {method: 'GET', url: '/api/runner/:workspaceId/processes', isArray: true}
    });

    // number of processes
    this.processesNumber = 0;

    // running processes per Workspace
    this.processesPerWorkspaceMap = new Map();
  }


  getProcessesNumber() {
    return this.processesNumber;
  }

  /**
   * Gets the processes
   */
  fetchProcesses() {
    this.processes = this.remoteRunnerAPI.getProcesses();


    let promise = this.processes.$promise;
    promise.then((data) => {

      let nb = 0;
      data.forEach((process) => {
        if ('RUNNING' === process.status) {
          nb++;
        }
      });
      this.processesNumber = nb;

    });

    return promise;
  }

  /**
   * Gets running processes in workspace
   */
  fetchRunningProcesses(workspaceId) {
    this.workspaceProcesses = this.remoteRunnerAPI.getProcessesInWorkspace({workspaceId: workspaceId});

    let promise = this.workspaceProcesses.$promise;
    promise.then((data) => {

      let list = [];
      data.forEach((process) => {
        if ('RUNNING' === process.status && workspaceId === process.workspace) {
          list.push(process);
        }
      });
      this.processesPerWorkspaceMap.set(workspaceId, list);
    });

    return promise;
  }

  /**
   * Returns running processes list for specified workspace
   */
  getRunningProcesses(workspaceId) {
    return this.processesPerWorkspaceMap.get(workspaceId);
  }

}

// Register this factory
Register.getInstance().factory('codenvyRunner', CodenvyRunner);
