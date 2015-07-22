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

import OnPremisesOnboardingCtrl from './onpremise-onboarding.controller';
import OnPremiseOnBoardingRedirect from './onpremise-onboarding-redirect.factory';
import ScrollValidate from './onpremise-onboarding-scroll-validate.directive';

class OnPremisesOnboardingConfig {

  constructor(register) {

    register.controller('OnPremisesOnboardingCtrl', OnPremisesOnboardingCtrl);
    register.directive('onPremiseOnBoardingRedirectScrollValidate', ScrollValidate);
    register.factory('onPremiseOnBoardingRedirect', OnPremiseOnBoardingRedirect);

    // config routes
    register.app.config(function ($routeProvider) {
      $routeProvider.accessWhen('/onprem/onboarding', {
        templateUrl: 'app/onpremises/onboarding/onboarding.html',
        controller: 'OnPremisesOnboardingCtrl',
        controllerAs: 'onPremisesOnboardingCtrl'
      });
    });

  }
}


export default OnPremisesOnboardingConfig;
