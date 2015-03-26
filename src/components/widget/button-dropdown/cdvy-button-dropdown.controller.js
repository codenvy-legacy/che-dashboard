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
 * This class is handling the controller for the dropdown
 * @author Florent Benoit
 */
class CodenvyButtonDropdownCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($scope, $timeout) {
    this.$timeout = $timeout;
    this.showDropdown = false;
  }

  toggleDropDown() {
    this.showDropdown = !this.showDropdown;
  }

  disableDropDown() {
    this.$timeout(() => {
      this.showDropdown = false;
      });

  }


}



export default CodenvyButtonDropdownCtrl;

Register.getInstance().controller('CodenvyButtonDropdownCtrl', CodenvyButtonDropdownCtrl);
