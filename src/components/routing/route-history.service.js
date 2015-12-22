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

import Register from '../../components/utils/register.js';

/**
 * Provides a way to know the history of all routes that have been loaded
 * @author Florent Benoit
 */
class RouteHistory {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor($rootScope, $location) {
    this.history = [];
    $rootScope.$on('$routeChangeSuccess', () => {
      this.history.push($location.path());
    });
  }

  getPaths() {
    return this.history;
  }

  getLastPath() {
    if (this.history.length === 0) {
      return '';
    }
    return this.history[this.history.length - 1];
  }

}

export default RouteHistory;

// Register this service
Register.getInstance().service('routeHistory', RouteHistory);
