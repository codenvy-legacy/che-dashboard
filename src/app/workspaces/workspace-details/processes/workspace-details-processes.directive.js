'use strict';

/**
 * @ngdoc directive
 * @name workspaces.details.directive:workspaceProcessesProcesses
 * @restrict E
 * @element
 *
 * @description
 * <workspace-details-processes></workspace-details-processes>` for displaying workspace processes entry.
 *
 * @usage
 *   <workspace-details-processes></workspace-details-processes>
 *
 * @author
 */
class WorkspaceDetailsProcesses {

  /**
   * Default constructor that is using process
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict = 'E';
    this.templateUrl = 'app/workspaces/workspace-details/processes/workspace-details-processes.html';

    this.controller = 'WorkspaceDetailsProcessesCtrl';
    this.controllerAs = 'workspaceDetailsProcessesCtrl';
    this.bindToController = true;
  }

}

export default WorkspaceDetailsProcesses;

