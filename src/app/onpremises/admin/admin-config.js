/*
 * Copyright (c) 2015-2016 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 */
'use strict';

import OnPremisesAdminInstallationConfig from './installation/installation-config';
import OnPremisesAdminAvailableSoftwareCtrl from './software/software.controller';
import AvailableSoftwarePanel from './software/software.directive';
import OnPremisesAdminYourSubscriptionCtrl from './yoursubscription/yoursubscription.controller';
import YourSubscriptionPanel from './yoursubscription/yoursubscription.directive';

class OnPremisesAdminConfig {

  constructor(register) {

    register.directive('cdvyAvailableSoftware', AvailableSoftwarePanel);
    register.directive('cdvyYourSubscription', YourSubscriptionPanel);
    register.controller('OnPremisesAdminAvailableSoftwareCtrl', OnPremisesAdminAvailableSoftwareCtrl);
    register.controller('OnPremisesAdminYourSubscriptionCtrl', OnPremisesAdminYourSubscriptionCtrl);

    // configure routes
    register.app.config(function ($routeProvider) {
      $routeProvider.accessWhen('/onprem/administration', {
        templateUrl: 'app/onpremises/admin/administration.html'
      });
    });

    new OnPremisesAdminInstallationConfig(register);
  }
}

export default OnPremisesAdminConfig;
