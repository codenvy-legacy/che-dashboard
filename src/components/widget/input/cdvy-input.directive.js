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
 * Defines a directive for creating input that are working either on desktop or on mobile devices.
 * It will change upon width of the screen
 * @author Florent Benoit
 */
class CodenvyInput {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.replace= true;
    this.transclude= true;
    this.templateUrl = 'components/widget/input/cdvy-input.html';

    // we require ngModel as we want to use it inside our directive
    this.require = ['ngModel'];

    // scope values
    this.scope = {
      valueModel : '=ngModel',
      inputName:'@cdvyName',
      labelName:'@cdvyLabelName',
      placeHolder:'@cdvyPlaceHolder',
      myForm: '=cdvyForm',
      ctrl: '=cdvyController'

    };

  }


  compile(element, attrs) {
    var keys = Object.keys(attrs);

    // search the input field
    var inputElement = element.find('input');

    keys.forEach((key) => {

      // don't reapply internal properties
      if (key.indexOf('$') === 0) {
        return;
      }
      // don't reapply internal element properties
      if (key.indexOf('cdvy') === 0) {
        return;
      }
      // avoid model
      if (key.indexOf('ngModel') === 0) {
        return;
      }
      var value = attrs[key];

      // handle empty values as boolean
      if (value ==='') {
        value = 'true';
      }

      // set the value of the attribute
      inputElement.attr(attrs.$attr[key], value);


      //add also the material version of max length (only one the first input which is the md-input)
      if ('ngMaxlength' === key) {
        inputElement.eq(0).attr('md-maxlength', value);
      }

      element.removeAttr(attrs.$attr[key]);

    });


  }



  /**
   * Keep reference to the model controller
   */
  link($scope, element, attr) {
    $scope.$watch('myForm.desk' + $scope.inputName + '.$pristine', (isPristine) => {
      if (isPristine) {
        element.addClass('desktop-pristine');
      } else {
        element.removeClass('desktop-pristine');
      }
    });

  }

}

export default CodenvyInput;

Register.getInstance().directive('cdvyInput', CodenvyInput);
