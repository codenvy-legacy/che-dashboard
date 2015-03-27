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
 * Defines the super class for for all buttons
 * @author Florent Benoit
 */
class CodenvyButtonDropdown {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.bindToController = true;
    this.templateUrl = 'components/widget/button-dropdown/cdvy-button-dropdown.html';
    this.controller = 'CodenvyButtonDropdownCtrl';
    this.controllerAs = 'codenvyButtonDropdownCtrl';

    // scope values
    this.scope = {
      labelText:'@cdvyButtonDropdownLabel',
      href:'@cdvyButtonDropdownHref',
      ctrl: '=cdvyButtonDropdownController'

    };
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

export default CodenvyButtonDropdown;

Register.getInstance().directive('cdvyButtonDropdown', CodenvyButtonDropdown);
