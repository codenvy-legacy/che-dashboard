'use strict';

class ProjectsCtrl {
  /*@ngInject*/
  constructor ($scope, codenvyAPI, $timeout) {

    var workspace = codenvyAPI.getWorkspace();

    // fetch workspaces when initializing
    codenvyAPI.getWorkspace().fetchWorkspaces(true);

    // keep references on workspaces and projects
    $scope.workspaces = workspace.getWorkspaces();
    $scope.projects = codenvyAPI.getProject().getAllProjects();
    $scope.projectsPerWorkspace = codenvyAPI.getProject().getProjectsByWorkspace();


    // perform another fetch
    $timeout(() => (codenvyAPI.getWorkspace().fetchWorkspaces(true)), 5000);

  }
}

export default ProjectsCtrl;
