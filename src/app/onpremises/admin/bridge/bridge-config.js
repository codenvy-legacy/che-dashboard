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

import OnPremisesAdminBridgeCtrl from './bridge.controller';
import OnPremisesAdminBridgeCodenvyAccountCtrl from './account/account.controller';
import CodenvyAccountPanel from './account/account.directive';
import OnPremisesAdminBridgeAvailableSoftwareCtrl from './software/software.controller';
import AvailableSoftwarePanel from './software/software.directive';

class OnPremisesAdminBridgeConfig {

  constructor(register) {

    register.directive('cdvyCodenvyAccount', CodenvyAccountPanel);
    register.directive('cdvyAvailableSoftware', AvailableSoftwarePanel);
    register.controller('OnPremisesAdminBridgeCtrl', OnPremisesAdminBridgeCtrl);
    register.controller('OnPremisesAdminBridgeCodenvyAccountCtrl', OnPremisesAdminBridgeCodenvyAccountCtrl);
    register.controller('OnPremisesAdminBridgeAvailableSoftwareCtrl', OnPremisesAdminBridgeAvailableSoftwareCtrl);

    // configure routes
    register.app.config(function ($routeProvider) {
      $routeProvider.when('/onpremises/admin/bridge', {
        templateUrl: 'app/onpremises/admin/bridge/bridge.html',
        controller: 'OnPremisesAdminBridgeCtrl',
        controllerAs: 'onPremisesAdminBridgeCtrl'
      });
    });
  }
}

export default OnPremisesAdminBridgeConfig;
