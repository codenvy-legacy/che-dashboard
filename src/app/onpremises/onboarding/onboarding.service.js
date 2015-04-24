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

class OnPremiseAdminOnboardingSrv {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor($location) {
      this.nextPageFun = function(current) {
        switch (current) {
          case 'welcome':
            $location.path('/onpremises/onboarding/agreement');
            break;
          case 'agreement':
            $location.path('/onpremises/onboarding/adminlogin');
            break;
          case 'adminCredentials':
            // continue to dashboard admin tab
            $location.path('/onpremises/admin');
            break;
          default:
            // unkown location, go back to welcome
            $location.path('/onpremises/onboarding/welcome');
            break;
        }
      };
      this.cancelFun = function(origin) {
        switch (origin) {
          case 'welcome':
            $location.path('/onpremises/onboarding/cancelled/welcome');
            break;
          case 'agreement':
            $location.path('/onpremises/onboarding/cancelled/agreement');
            break;
          default:
            // unkown location, go back to welcome
            $location.path('/onpremises/onboarding/cancelled');
            break;
        }
      };
      this.backFun = function(origin) {
        switch (origin) {
          case 'welcome':
            $location.path('/onpremises/onboarding/welcome');
            break;
          case 'agreement':
            $location.path('/onpremises/onboarding/agreement');
            break;
          default:
            // unkown location, go back to welcome
            $location.path('/onpremises/onboarding/welcome');
            break;
        }
      };
  }

  nextPage(currentPage) {
    this.nextPageFun(currentPage);
  }

  cancel(origin) {
    this.cancelFun(origin);
  }

  back(origin) {
    this.backFun(origin);
  }
}

export default OnPremiseAdminOnboardingSrv;
