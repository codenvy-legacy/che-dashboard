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

import Register from '../../utils/register';

/**
 * Defines a directive for the simple selecter.
 * @author Florent Benoit
 */
class CodenvySimpleSelecter {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    //this.replace= true;
    //this.transclude= true;
    this.templateUrl = 'components/widget/simple-selecter/cdvy-simple-selecter.html';

    // we require ngModel as we want to use it inside our directive
    this.require = ['ngModel'];


    this.controller = 'CodenvySimpleSelecterCtrl';
    this.controllerAs = 'codenvySimpleSelecterCtrl';
    this.bindToController = true;


    // scope values
    this.scope = {
      valueModel : '=ngModel',
      title: '@cdvyTitle',
      description: '@cdvyDescription',
      isFirst : '=cdvyIsFirst',
      value: '=cdvyValue',
      name: '@cdvyName',
      icon: '@cdvyIcon',
      callbackController: '=cdvyCallbackController' /* object with a cdvySimpleSelecter(name) function, called when the selecter is selector or the select value changes */
    };


  }


  link($scope, element, attrs) {
    // defines property name
    $scope.selectName = attrs.cdvyName;


    // defines the first element as selected
    if ($scope.$parent.$first) {
      $scope.$parent.$parent[attrs.cdvyName + '.selecterSelected'] = attrs.cdvyTitle;
    }


  }


}

export default CodenvySimpleSelecter;

Register.getInstance().directive('cdvySimpleSelecter', CodenvySimpleSelecter);
