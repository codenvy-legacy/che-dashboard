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
 * Defines a directive for a toggle button.
 * @author Florent Benoit
 */
class CodenvyToggleButton {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.templateUrl = 'components/widget/toggle-button/cdvy-toggle-button.html';

    // scope values
    this.scope = {
      title:'@cdvyTitle',
      fontIcon: '@cdvyFontIcon',
      ngDisabled: '@ngDisabled'
    };



  }

  link($scope) {
    $scope.controller = $scope.$parent.$parent.codenvyToggleCtrl;
  }


}

export default CodenvyToggleButton;

Register.getInstance().directive('cdvyToggleButton', CodenvyToggleButton);
