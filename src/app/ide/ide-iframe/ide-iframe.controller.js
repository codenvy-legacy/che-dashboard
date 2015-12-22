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
 * This class is handling the controller for the IDE iFrame
 * @author Florent Benoit
 */
class IdeIFrameCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($location, routeHistory) {
    this.$location = $location;
    this.routeHistory = routeHistory;
  }


  /**
   * Redirect user to the last page in history or to dashboard if user came into IDE page directly
   */
  restoreHistory() {
    let paths = this.routeHistory.getPaths();
    let redirectPath;
    // do we have at least two history in the path ?
    if (paths.length > 2) {
      redirectPath = paths[paths.length - 2];
    } else {
      // redirect to dashboard if user was coming directly on this IDE page
      redirectPath = '/';
    }
    this.$location.path(redirectPath);
  }
}


export default IdeIFrameCtrl;
