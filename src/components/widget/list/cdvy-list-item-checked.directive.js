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

import Register from '../../utils/register';

/**
 * Defines a directive for creating List Items that can be checked.
 * @author Ann Shumilova
 */
class CodenvyListItemChecked {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
    this.restrict = 'E';
    this.replace = true;
    this.transclude = true;
    this.templateUrl = 'components/widget/list/cdvy-list-item-checked.html';

    // we require ngModel as we want to use it inside our directive
    this.require = ['ngModel'];

    // scope values
    this.scope = {
      valueModel: '=?ngModel',
      icon: '@cdvyIcon',
      ariaLabel: '@cdvyAriaLabelCheckbox'
    };
  }

}

export default CodenvyListItemChecked;

Register.getInstance().directive('cdvyListItemChecked', CodenvyListItemChecked);
