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
 * Defines a directive for logging user UI events.
 * @author Ann Shumilova
 */
class CodenvyEventLogger {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor (codenvyAPI) {
    this.restrict = 'A';
    this.codenvyAPI = codenvyAPI;
  }

  link($scope, element, attr) {
    element.on('click', () => {
      this.codenvyAPI.getAnalytics().logAction(attr.cdvyEventLogger);
    });
  }
}

export default CodenvyEventLogger;

Register.getInstance().directive('cdvyEventLogger', CodenvyEventLogger);
