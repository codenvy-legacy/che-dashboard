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
 * This class is handling the controller for the stack existing workspace selecter
 * @author Florent Benoit
 */
class CodenvyStackLibraryWorkspaceSelecterCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($scope) {
    this.$scope = $scope;
  }


  /**
   * perform sharing state in an upper scope as it may be shared
   */
  select(globalSelecterName, workspace) {
    this.globalSelecterName = globalSelecterName;
    this.$scope.$parent.$parent[globalSelecterName + '.workspaceSelecterSelected'] = workspace.id;
    this.callbackController.cdvyStackLibraryWorkspaceSelecter(workspace);
  }

  /**
   * Gets the selected widget among all widgets of this name
   * @returns {*}
   */
  getSelected() {
    var globalSelecterName = this.$scope.selectName;
    return this.$scope.$parent.$parent[globalSelecterName + '.workspaceSelecterSelected'];
  }

  setChoice() {
    this.toggleChoice = 'existing-workspace';
  }



  getWorkspaceName() {
    return this.workspace.name;
  }

  getWorkspaceStackName() {
    return 'custom';
  }

  getWorkspaceStackDetails(keepFullValue) {
    // return recipe for now
    let environments = this.workspace.environments;
    let defaultEnvName = this.workspace.defaultEnvName;

    let environment = environments[defaultEnvName];
    let machineConfigs = environment.machineConfigs;
    let source = machineConfigs[0].source;
    let location = source.location;

    if (keepFullValue) {
      return location;
    }

    if (location && location.length > 20) {
      return '...' + location.substr(location.length - 20);
    }
    return location;
  }

  getWorkspaceTooltip() {
    return this.getWorkspaceStackDetails(true);
  }

}



export default CodenvyStackLibraryWorkspaceSelecterCtrl;

