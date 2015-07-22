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
 * @ngdoc controller
 * @name help.controller:HelpCtrl
 * @description This class is handling the controller of the help
 * @author Florent Benoit
 */
class HelpCtrl {


  /**
   * Default constructor
   * @ngInject for Dependency injection
   */
  constructor($timeout) {
    this.$timeout = $timeout;
    this.showHelp = false;
  }

  /**
   * Toggle the help
   */
  toggleHelp() {
    this.showHelp = !this.showHelp;
  }

  /**
   * Disable the help through a timeout
   */
  disableHelp() {
    this.$timeout(() => this.showHelp = false, 200);
  }


}

export default HelpCtrl;

