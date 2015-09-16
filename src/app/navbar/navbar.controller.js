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
  constructor($mdSidenav, userDashboardConfig, codenvyAPI, onBoarding, $route) {
    this.mdSidenav = $mdSidenav;
    this.$route = $route;
    this.codenvyAPI = codenvyAPI;
    this.onBoarding = onBoarding;
    this.codenvyUser = codenvyAPI.getUser();
    this.links = [{href: '#/projects', name: 'List Projects'}];

    this.displayLoginItem = userDashboardConfig.developmentMode;

    let promiseUser = this.codenvyUser.fetchUser();
    promiseUser.then(() => {
      this.updateAdminRole();
    });

    let promiseService = this.codenvyAPI.getService().fetchServices();
    promiseService.then(() => {
      this.isInvoiceServiceAvailable = codenvyAPI.getService().isServiceAvailable(codenvyAPI.getPayment().getInvoiceServicePath());
      this.isSubscriptionServiceAvailable = codenvyAPI.getService().isServiceAvailable(codenvyAPI.getAccount().getSubscriptionServicePath());
    });


    this.profile = codenvyAPI.getProfile().getProfile();
    if (this.profile.attributes) {
      this.email = this.profile.attributes.email;
    } else {
      this.profile.$promise.then(() => {
        this.email = this.profile.attributes ? this.profile.attributes.email : null;
      });
    }
    this.onpremAdminExpanded = true;
  }

  updateAdminRole() {
    this.admin = this.codenvyUser.isAdmin();
  }

  reload() {
    this.$route.reload();
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
