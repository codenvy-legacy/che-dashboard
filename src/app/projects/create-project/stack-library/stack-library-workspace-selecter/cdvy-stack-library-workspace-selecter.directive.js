/*
 * Copyright (c) 2015-2016 Codenvy, S.A.
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
 * Defines a directive for the stack library of existing workspace selecter.
 * @author Florent Benoit
 */
class CodenvyStackLibraryWorkspaceSelecter {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.templateUrl = 'app/projects/create-project/stack-library/stack-library-workspace-selecter/cdvy-stack-library-workspace-selecter.html';

    // we require ngModel as we want to use it inside our directive
    this.require = ['ngModel'];


    this.controller = 'CodenvyStackLibraryWorkspaceSelecterCtrl';
    this.controllerAs = 'codenvyStackLibraryWorkspaceSelecterCtrl';
    this.bindToController = true;


    // scope values
    this.scope = {
      valueModel : '=ngModel',
      workspace: '=cdvyWorkspace',
      isFirst : '=cdvyIsFirst',
      toggleChoice: '=cdvyToggleChoice',
      title: '@cdvyTitle',
      name: '@cdvyName',
      callbackController: '=cdvyCallbackController' /* object with a cdvyStackLibraryWorkspaceSelecter(name) function, called when the selecter is selector or the select value changes */
    };


  }


  link($scope, element, attrs) {
    // defines property name
    $scope.selectName = attrs.cdvyName;


    // defines the first element as selected
    if ($scope.$parent.$first) {
      $scope.$parent.$parent[attrs.cdvyName + '.workspaceSelecterSelected'] = attrs.cdvyTitle;
    }


  }


}

export default CodenvyStackLibraryWorkspaceSelecter;

