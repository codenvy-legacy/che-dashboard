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
  }

  /**
   * Update current full name and email
   */
  updateData() {
    this.fullName = this.codenvyAPI.getProfile().getFullName();
    if(this.profile.attributes) {
      this.email = this.profile.attributes.email;
    }
  }

  /**
   * Toggle the left menu
   */
  toggleLeftMenu() {
    this.mdSidenav('left').toggle();
  }



}

export default NavBarCtrl;
