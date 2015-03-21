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
 * Defines a directive for creating label container.
 * @author Oleksii Orel
 */
class CodenvyLabel {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
    this.restrict = 'E';
    this.replace = true;
    this.transclude = false;
    this.templateUrl = 'components/widget/label/cdvy-label.html';

    // scope values
    this.scope = {
      labelText:'@cdvyLabelText'
    };

  }

}

export default CodenvyLabel;

Register.getInstance().directive('cdvyLabel', CodenvyLabel);
