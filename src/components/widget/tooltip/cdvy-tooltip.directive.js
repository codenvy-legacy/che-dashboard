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
 * Defines a directive for creating tooltip container.
 * @author Oleksii Orel
 */
class CodenvyTooltip {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
    this.restrict = 'E';
    this.replace = false;
    this.transclude = true;
    this.templateUrl = 'components/widget/tooltip/cdvy-tooltip.html';

    // scope values
    this.scope = {
      tooltipTitle: '@cdvyTitle'
    };

  }

}

export default CodenvyTooltip;

Register.getInstance().directive('cdvyTooltip', CodenvyTooltip);
