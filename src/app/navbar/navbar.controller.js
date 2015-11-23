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
  constructor($mdSidenav, userDashboardConfig, codenvyAPI, onBoarding, $route, imsArtifactApi) {
    this.mdSidenav = $mdSidenav;
    this.$route = $route;
    this.codenvyAPI = codenvyAPI;
    this.onBoarding = onBoarding;
    this.imsArtifactApi = imsArtifactApi;
    this.codenvyUser = codenvyAPI.getUser();
    this.links = [{href: '#/projects', name: 'List Projects'}];

    this.displayLoginItem = userDashboardConfig.developmentMode;

    let promiseService = this.codenvyAPI.getService().fetchServices();
    promiseService.then(() => {
      this.isInvoiceServiceAvailable = codenvyAPI.getService().isServiceAvailable(codenvyAPI.getPayment().getInvoiceServicePath());
      this.isSubscriptionServiceAvailable = codenvyAPI.getService().isServiceAvailable(codenvyAPI.getAccount().getSubscriptionServicePath());
      this.isAccountServiceAvailable = codenvyAPI.getService().isServiceAvailable(codenvyAPI.getAccount().getAccountServicePath());
      this.isFactoryServiceAvailable = codenvyAPI.getService().isServiceAvailable(codenvyAPI.getFactory().getFactoryServicePath());
    });

    let promiseAdminService = this.codenvyAPI.getAdminService().fetchServices();
    promiseAdminService.then(() => {
      this.isAdminServiceAvailable = codenvyAPI.getAdminService().isAdminServiceAvailable();
      this.isAdminPluginServiceAvailable = codenvyAPI.getAdminService().isServiceAvailable(codenvyAPI.getAdminPlugins().getPluginsServicePath());
    });

    this.profile = codenvyAPI.getProfile().getProfile();
    if (this.profile.attributes) {
      this.email = this.profile.attributes.email;
    } else {
      this.profile.$promise.then(() => {
        this.email = this.profile.attributes.email ? this.profile.attributes.email : 'N/A ';
      }, () => {
        this.email = 'N/A ';
      });
    }
    this.onpremAdminExpanded = true;

    this.codenvyUser.fetchUser();
  }

  isImsAvailable() {
    return this.imsArtifactApi.isImsAvailable();
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

  isUser() {
    return this.codenvyUser.isUser();
  }
}

export default NavBarCtrl;
