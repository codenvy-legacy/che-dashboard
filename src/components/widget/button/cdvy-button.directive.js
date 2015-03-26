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
 * Defines the super class for for all buttons
 * @author Florent Benoit
 */
class CodenvyButton {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.bindToController = true;
  }

  /**
   * Template for the current toolbar
   * @param element
   * @param attrs
   * @returns {string} the template
   */
  template( element, attrs){
    var template = this.getTemplateStart();

    if (attrs.href) {
      template = template + ' href=\"' + attrs['href'] + '\"';
    }
    template = template + '>';

    if (attrs.cdvyButtonIcon) {
      template = template + '<md-icon md-font-icon=\"' + attrs['cdvyButtonIcon'] + '\" flex layout=\"column\" layout-align=\"start center\"></md-icon>';
    }


    template = template + attrs['cdvyButtonTitle'] + '</md-button>';
    return template;
  }


  /**
   * Re-apply ng-disabled on child
   */
  link($scope, element, attrs) {
    $scope.$watch(attrs.ngDisabled, function (isDisabled) {
      element.find('button').prop('disabled', isDisabled);
    });

  }

}

export default CodenvyButton;
