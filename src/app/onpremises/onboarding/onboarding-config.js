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

import OnPremisesOnboardWelcomePageCtrl from './welcome/welcome.controller';
import OnPremisesOnboardAgreementPageCtrl from './agreement/agreement.controller';
import OnPremisesOnboardAdminLoginCtrl from './adminlogin/adminlogin.controller';
import OnPremisesOnboardCancelledPageCtrl from './cancelled/cancelled.controller';
import OnPremiseAdminOnboardingSrv from './onboarding.service';

class OnPremisesOnboardingConfig {

  constructor(register) {

    register.controller('OnPremisesOnboardWelcomePageCtrl', OnPremisesOnboardWelcomePageCtrl);
    register.controller('OnPremisesOnboardAgreementPageCtrl', OnPremisesOnboardAgreementPageCtrl);
    register.controller('OnPremisesOnboardAdminLoginCtrl', OnPremisesOnboardAdminLoginCtrl);
    register.controller('OnPremisesOnboardCancelledPageCtrl', OnPremisesOnboardCancelledPageCtrl);
    register.service('OnPremiseAdminOnboardingSrv', OnPremiseAdminOnboardingSrv);

    // config routes
    register.app.config(function ($routeProvider) {
      $routeProvider.when('/onpremises/onboarding/welcome', {
        templateUrl: 'app/onpremises/onboarding/welcome/welcome.html',
        controller: 'OnPremisesOnboardWelcomePageCtrl',
        controllerAs: 'onPremisesOnboardWelcomePageCtrl'
      });
      $routeProvider.when('/onpremises/onboarding/agreement', {
        templateUrl: 'app/onpremises/onboarding/agreement/agreement.html',
        controller: 'OnPremisesOnboardAgreementPageCtrl',
        controllerAs: 'onPremisesOnboardAgreementPageCtrl'
      });
      $routeProvider.when('/onpremises/onboarding/adminlogin', {
        templateUrl: 'app/onpremises/onboarding/adminlogin/adminlogin.html',
        controller: 'OnPremisesOnboardAdminLoginCtrl',
        controllerAs: 'onPremisesOnboardAdminLoginCtrl'
      });
      $routeProvider.when('/onpremises/onboarding/cancelled/:cause?', {
        templateUrl: 'app/onpremises/onboarding/cancelled/cancelled.html',
        controller: 'OnPremisesOnboardCancelledPageCtrl',
        controllerAs: 'onPremisesOnboardCancelledPageCtrl'
      });

    });
  }
}


export default OnPremisesOnboardingConfig;
