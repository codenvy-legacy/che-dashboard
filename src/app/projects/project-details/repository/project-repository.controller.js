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

class ProjectRepositoryCtrl {

  /**
   * Controller for the project local repository and remote repositories details
   * @ngInject for Dependency injection
   * @author Oleksii Orel
   */
  constructor($route, codenvyAPI) {
    this.codenvyAPI = codenvyAPI;

    this.remoteRepositories = [];
    this.localRepository = '';

    var workspaceId = $route.current.params.workspaceId;
    var projectPath = '/' + $route.current.params.projectName;

    if (!this.codenvyAPI.getGit().getLocalUrlByKey(workspaceId, projectPath)) {
      let promise = this.codenvyAPI.getGit().fetchLocalUrl(workspaceId, projectPath);

      promise.then(() => {
        this.localRepository = this.codenvyAPI.getGit().getLocalUrlByKey(workspaceId, projectPath);
      });
    } else {
      this.localRepository = this.codenvyAPI.getGit().getLocalUrlByKey(workspaceId, projectPath);
    }

    if (!this.codenvyAPI.getGit().getRemoteUrlArrayByKey(workspaceId, projectPath)) {
      let promise = this.codenvyAPI.getGit().fetchRemoteUrlArray(workspaceId, projectPath);

      promise.then(() => {
        this.remoteRepositories = this.codenvyAPI.getGit().getRemoteUrlArrayByKey(workspaceId, projectPath);
      });
    } else {
      this.remoteRepositories = this.codenvyAPI.getGit().getRemoteUrlArrayByKey(workspaceId, projectPath);
    }

  }

}

export default ProjectRepositoryCtrl;
