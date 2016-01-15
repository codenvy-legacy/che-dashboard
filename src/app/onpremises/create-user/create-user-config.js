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

import OnPremisesAdminCreateUserCtrl from './create-user.controller';

class OnPremisesCreateUserConfig {

  constructor(register) {
    register.controller('OnPremisesAdminCreateUserCtrl', OnPremisesAdminCreateUserCtrl);

    // configure routes
    register.app.config(function ($routeProvider) {
      $routeProvider.accessWhen('/onprem/usermanagement', {
        templateUrl: 'app/onpremises/create-user/create-user.html',
        controller: 'OnPremisesAdminCreateUserCtrl',
        controllerAs: 'onPremisesAdminCreateUserCtrl'
      });
    });

  }
}

export default OnPremisesCreateUserConfig;
