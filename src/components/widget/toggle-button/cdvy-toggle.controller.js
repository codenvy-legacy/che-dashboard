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
 * Defines a directive for the toggle button.
 * @author Florent Benoit
 */
class CodenvyToggleCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor ($scope) {
    this.$scope = $scope;
  }

  getSelected() {
    return this.$scope.setupModelController.$viewValue;
  }

  getCss(title) {
    if (this.getSelected() !== title) {
      return 'cdvy-toggle-button-disabled';
    }
    return 'cdvy-toggle-button-enabled';
  }

  onClick(selected) {
    this.$scope.setupModelController.$setViewValue(selected);
  }


}

export default CodenvyToggleCtrl;

Register.getInstance().controller('CodenvyToggleCtrl', CodenvyToggleCtrl);
