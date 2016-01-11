/*
 * Copyright (c) 2012-2016 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 */
'use strict';

import {gitMixinId, subversionMixinId} from '../repository/project-repository-data';

class ProjectRepositoryCtrl {

  /**
   * Controller for the project local repository and remote repositories details
   * @ngInject for Dependency injection
   * @author Oleksii Orel
   */
  constructor($route, codenvyAPI, lodash) {
    this.codenvyAPI = codenvyAPI;
    this.lodash = lodash;

    this.remoteGitRepositories = [];
    this.localGitRepository = null;
    this.remoteSvnRepository = null;
    this.isEmptyState = false;

    var workspaceId = $route.current.params.workspaceId;
    var projectPath = '/' + $route.current.params.projectName;

    if (!this.codenvyAPI.getProject().getProjectDetailsByKey(workspaceId, projectPath)) {
      let promise = this.codenvyAPI.getProject().fetchProjectDetails(workspaceId, projectPath);

      promise.then(() => {
        var projectDetails = this.codenvyAPI.getProject().getProjectDetailsByKey(workspaceId, projectPath);
        this.updateRepositories(projectDetails);
      });
    } else {
      var projectDetails = this.codenvyAPI.getProject().getProjectDetailsByKey(workspaceId, projectPath);
      this.updateRepositories(projectDetails);
    }

  }

  updateRepositories(projectDetails) {
    if (!projectDetails.mixins || !projectDetails.mixins.length) {
      this.isEmptyState = true;
      return;
    }

    if (projectDetails.mixins.indexOf(subversionMixinId) !== -1) {
      //update remote svn url
      if (!this.codenvyAPI.getSvn().getRemoteUrlByKey(projectDetails.workspaceId, projectDetails.path)) {
        let promise = this.codenvyAPI.getSvn().fetchRemoteUrl(projectDetails.workspaceId, projectDetails.path);

        promise.then(() => {
          this.remoteSvnRepository = this.codenvyAPI.getSvn().getRemoteUrlByKey(projectDetails.workspaceId, projectDetails.path);
        });
      } else {
        this.remoteSvnRepository = this.codenvyAPI.getSvn().getRemoteUrlByKey(projectDetails.workspaceId, projectDetails.path);
      }
    }

    if (projectDetails.mixins.indexOf(gitMixinId) !== -1) {
      //update git local url
      if (!this.codenvyAPI.getGit().getLocalUrlByKey(projectDetails.workspaceId, projectDetails.path)) {
        let promise = this.codenvyAPI.getGit().fetchLocalUrl(projectDetails.workspaceId, projectDetails.path);

        promise.then(() => {
          this.localGitRepository = this.codenvyAPI.getGit().getLocalUrlByKey(projectDetails.workspaceId, projectDetails.path);
        });
      } else {
        this.localGitRepository = this.codenvyAPI.getGit().getLocalUrlByKey(projectDetails.workspaceId, projectDetails.path);
      }

      //update git remote urls
      if (!this.codenvyAPI.getGit().getRemoteUrlArrayByKey(projectDetails.workspaceId, projectDetails.path)) {
        let promise = this.codenvyAPI.getGit().fetchRemoteUrlArray(projectDetails.workspaceId, projectDetails.path);

        promise.then(() => {
          this.remoteGitRepositories = this.codenvyAPI.getGit().getRemoteUrlArrayByKey(projectDetails.workspaceId, projectDetails.path);
        });
      } else {
        this.remoteGitRepositories = this.codenvyAPI.getGit().getRemoteUrlArrayByKey(projectDetails.workspaceId, projectDetails.path);
      }
    }

  }

}

export default ProjectRepositoryCtrl;
