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

class ProjectsCtrl {
  /*@ngInject*/
  constructor ($scope, codenvyAPI, $timeout) {

    var workspace = codenvyAPI.getWorkspace();

    // fetch workspaces when initializing
    codenvyAPI.getWorkspace().fetchWorkspaces();

    // keep references on workspaces and projects
    $scope.workspaces = workspace.getWorkspaces();
    $scope.projects = codenvyAPI.getProject().getAllProjects();
    $scope.projectsPerWorkspace = codenvyAPI.getProject().getProjectsByWorkspace();


    // perform another fetch
    $timeout(() => (codenvyAPI.getWorkspace().fetchWorkspaces(true)), 5000);



  }
}

export default ProjectsCtrl;
