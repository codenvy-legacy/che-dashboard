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
 * Defines a directive for a primary button.
 * @author Florent Benoit
 */
class CodenvyButtonPrimary {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';

    // scope values
    this.scope = {
      title:'@cdvyButtonTitle'
    };

    this.bindToController = true;

  }

  /**
   * Template for the current toolbar
   * @param element
   * @param attrs
   * @returns {string} the template
   */
  template( element, attrs){
    var template = '<md-button md-theme=\"default\" class=\"md-accent md-raised md-hue-2\"'
     if (attrs.href) {
       template = template + ' href=\"' + attrs['href'] + '\"';
     }

    template = template + '>{{title}}</md-button>';

    return template;



}


  /**
   * Re-apply ng-disabled on child
   */
  link($scope, element, attrs) {


    $scope.$parent.$watch(attrs.ngDisabled, function (isDisabled) {
      element.find('button').prop('disabled', isDisabled);
    });
  }

}

export default CodenvyButtonPrimary;

Register.getInstance().directive('cdvyButtonPrimary', CodenvyButtonPrimary);
