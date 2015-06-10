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
  constructor($scope, $mdSidenav, userDashboardConfig, codenvyAPI) {
    this.mdSidenav = $mdSidenav;
    this.codenvyAPI = codenvyAPI;
    this.codenvyUser = codenvyAPI.getUser();
    this.links =[{href:'#/projects', name:'List Projects'}];

    this.displayLoginItem = userDashboardConfig.developmentMode;

    let promiseUser = this.codenvyUser.fetchUser();
    promiseUser.then(() => {
      this.updateAdminRole();
    });

    this.profile = codenvyAPI.getProfile().getProfile();
    this.profile.$promise.then(() => this.updateData(),() => this.updateData());

    this.fullName = '';
    this.email = '';

    this.onpremAdminExpanded = true;
    this.updated = false;

  }

  /**
   * Update current full name and email
   */
  updateData() {
    this.updated = true;
    if(!this.profile.attributes) {
      return;
    }
    this.fullName = this.codenvyAPI.getProfile().getFullName();
    this.email = this.profile.attributes.email;
  }

  updateAdminRole() {
    this.admin = this.codenvyUser.isAdmin();
  }

  /**
   * Toggle the left menu
   */
  toggleLeftMenu() {
    this.mdSidenav('left').toggle();
  }

  userIsAdmin() {
    return this.codenvyUser.isAdmin();
  }

  isSimpleUser() {
    return !this.codenvyUser.isAdmin();
  }

  flipOnpremAdminExpanded() {
    this.onpremAdminExpanded = !this.onpremAdminExpanded;
  }
}

export default NavBarCtrl;
