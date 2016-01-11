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

import Register from '../../utils/register';

/**
 * Defines a directive for the selecter.
 * @author Florent Benoit
 */
class CodenvySelecter {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    //this.replace= true;
    //this.transclude= true;
    this.templateUrl = 'components/widget/selecter/cdvy-selecter.html';

    // we require ngModel as we want to use it inside our directive
    this.require = ['ngModel'];


    this.controller = 'CodenvySelecterCtrl';
    this.controllerAs = 'codenvySelecterCtrl';
    //this.bindToController = true;


    // scope values
    this.scope = {
      valueModel : '=ngModel',
      title: '@cdvyTitle',
      options: '@cdvyOptions', /* uses ngOptions syntax */
      values: '=cdvyValues', /* source of the select values _in parent scope_ */
      name: '@cdvyName',
      icon: '@cdvyIcon',
      callbackController: '=cdvyCallbackController' /* object with a cdvySelecter(name, valueSelected) function, called when the selecter is selector or the select value changes */
    };


  }

  link($scope, element) {
    // defines the first element as selected
    if ($scope.$parent.$first) {
        $scope.$parent.$parent[$scope.name + '.selecterSelected'] = $scope.title;
    }

    let selectElement = element.find('select');
    //fixes: first click on select element is not handled as clicked event on whole selected component:
    selectElement.bind('mousedown', function() {
      selectElement.click();
    });
  }


}

export default CodenvySelecter;

Register.getInstance().directive('cdvySelecter', CodenvySelecter);
