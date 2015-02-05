/*******************************************************************************
 * Copyright (c) 2015 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 *******************************************************************************/

'use strict';

import Register from '../utils/register.js';

/**
 * This class is handling the workspace retrieval
 * It sets to the array workspaces the current workspaces which are not temporary
 * @author Florent Benoit
 */
class CodenvyWorkspace {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor ($resource) {

    // keep resource
    this.$resource = $resource;

    // current list of workspaces
    this.workspaces = [];

    // listeners if workspaces are changed/updated
    this.listeners = [];

    // remote call
    this.remoteWorkspaceAPI = this.$resource('/api/workspace/all');
  }

  /**
   * Add a listener that need to have the onChangeWorkspaces(workspaces: Array) method
   * @param listener a changing listener
   */
  addListener(listener) {
    this.listeners.push(listener);
  }


  /**
   * Gets the workspaces of this remote
   * @returns {Array}
   */
  getWorkspaces() {
    return this.workspaces;
  }

  /**
   * Ask for loading the workspaces in asynchronous way
   * If there are no changes, it's not updated
   */
  fetchWorkspaces() {
    let promise = this.remoteWorkspaceAPI.query().$promise;
    promise.then((data) => {
      var remoteWorkspaces = [];
      this.workspaces.length = 0;
      // add workspace if not temporary
      data.forEach((workspace) => {
        if (!workspace.workspaceReference.temporary) {
          remoteWorkspaces.push(workspace);
          this.workspaces.push(workspace);
        }
      });

      this.listeners.forEach((listener) => {
        listener.onChangeWorkspaces(this.workspaces);
      });
    });
  }

}

// Register this factory
Register.getInstance().factory('codenvyWorkspace', CodenvyWorkspace);
