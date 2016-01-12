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
 * Defines a directive for the stack library selecter.
 * @author Florent Benoit
 */
class CodenvyStackLibrarySelecter {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.templateUrl = 'app/projects/create-project/stack-library/stack-library-selecter/cdvy-stack-library-selecter.html';

    // we require ngModel as we want to use it inside our directive
    this.require = ['ngModel'];


    this.controller = 'CodenvyStackLibrarySelecterCtrl';
    this.controllerAs = 'codenvyStackLibrarySelecterCtrl';
    this.bindToController = true;


    // scope values
    this.scope = {
      valueModel : '=ngModel',
      isFirst : '=cdvyIsFirst',
      stack: '=cdvyStack',
      title: '@cdvyTitle',
      toggleChoice: '=cdvyToggleChoice',
      name: '@cdvyName',
      text: '@cdvyText',
      extraText: '@cdvyExtraText',
      callbackController: '=cdvyCallbackController' /* object with a cdvyStackLibrarySelecter(name) function, called when the selecter is selector or the select value changes */
    };


  }


  link($scope, element, attrs) {
    // defines property name
    $scope.selectName = attrs.cdvyName;


    // defines the first element as selected
    if ($scope.$parent.$first) {
      $scope.$parent.$parent[attrs.cdvyName + '.stackLibrarySelecterSelected'] = attrs.cdvyTitle;
    }


  }


}

export default CodenvyStackLibrarySelecter;

