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

class NavBarCtrl {

  /**
   * Default constructor
   * @ngInject for Dependency injection
   */
  constructor($mdSidenav, userDashboardConfig, codenvyAPI) {
    this.mdSidenav = $mdSidenav;
    this.codenvyAPI = codenvyAPI;
    this.links =[{href:'#/projects', name:'List Projects'}
    ];

    this.displayLoginItem = userDashboardConfig.developmentMode;
    this.profile = codenvyAPI.getProfile().getProfile();
    this.fullName = '';
    this.email = '';

    // on-prem admin section
    this.admin = false;
    this.onpremAdminExpanded = true;
  }

  /**
   * Update current full name and email
   */
  updateData() {
    this.fullName = this.codenvyAPI.getProfile().getFullName();
    if(this.profile.attributes) {
      this.email = this.profile.attributes.email;
    }
    this.admin = true // hardcoded until we know how to check it
  }

  /**
   * Toggle the left menu
   */
  toggleLeftMenu() {
    this.mdSidenav('left').toggle();
  }

  userIsAdmin() {
    return this.admin;
  }

  flipOnpremAdminExpanded() {
    this.onpremAdminExpanded = !this.onpremAdminExpanded;
  }
}

export default NavBarCtrl;
