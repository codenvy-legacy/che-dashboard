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
 * @name workspace.details.controller:WorkspaceDetailsProjectsCtrl
 * @description This class is handling the controller for details of workspace : section projects
 * @author Ann Shumilova
 */
class WorkspaceDetailsProjectsCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($route, codenvyAPI, $mdMedia) {
    this.codenvyAPI = codenvyAPI;
    this.$mdMedia = $mdMedia;

    this.workspaceId = $route.current.params.workspaceId;

    let profilePreferences = codenvyAPI.getProfile().getPreferences();

    if (profilePreferences['codenvy:created']) {
      this.profileCreationDate = profilePreferences['codenvy:created'];
    } else {
      this.codenvyAPI.getProfile().fetchProfile().then(() => {
        this.profileCreationDate = profilePreferences['codenvy:created'];
      });
    }

    this.projects = this.codenvyAPI.getProject().getProjectsByWorkspaceMap().get(this.workspaceId);
    if (!this.projects) {
      let promise = this.codenvyAPI.getProject().fetchProjectsForWorkspaceId(this.workspaceId);
      promise.then(() => {
        this.projects = this.codenvyAPI.getProject().getProjectsByWorkspaceMap().get(this.workspaceId);
      });
    }
  }

  widthGtSm() {
    return this.$mdMedia('gt-sm');
  }
}

export default WorkspaceDetailsProjectsCtrl;
