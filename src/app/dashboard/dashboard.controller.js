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
 * @name dashboard.controller:DashboardCtrl
 * @description This class is handling the controller of the dashboard
 * @author Florent Benoit
 */
class DashboardCtrl {


  /**
   * Default constructor
   * @ngInject for Dependency injection
   */
  constructor(codenvyAPI, codenvyUser, imsPropertiesApi, imsEventLoggingApi) {
    this.isSaasServiceAvailable = codenvyAPI.getService().isServiceAvailable(codenvyAPI.getSaas().getSaasServicePath());
    this.imsPropertiesApi = imsPropertiesApi;
    this.imsEventLoggingApi = imsEventLoggingApi;
    this.codenvyUser = codenvyUser;

    this.logEventOnAdminFirstLogin();
  }

  /**
   * Log specific event if it is first admin login.
   */
  logEventOnAdminFirstLogin() {
    if (this.codenvyUser.isAdmin()) {
      let property = this.imsPropertiesApi.getProperty('firstAdminLoginDone');
      if (!property || property !== 'true') {
        let promise = this.imsEventLoggingApi.logSaasCdecFirstLoginEvent();
        promise.then(() => {
          this.imsPropertiesApi.storeProperty('firstAdminLoginDone', 'true');
        }, (error) => {
            console.log('error', error);
        });
      }
    }
  }
}

export default DashboardCtrl;

