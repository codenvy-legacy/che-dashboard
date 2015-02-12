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
/*jshint esnext: true */

class NavbarCtrl {

  /**
   * Default constructor
   * @ngInject for Dependency injection
   */
  constructor ($mdSidenav) {
  this.mdSidenav = $mdSidenav;
  }


  /**
   * Toggle the left menu
   */
  toggleLeftMenu() {
    this.mdSidenav('left').toggle();
  }

}

export default NavbarCtrl;
