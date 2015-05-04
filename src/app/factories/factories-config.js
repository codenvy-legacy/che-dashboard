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

/* exported FactoriesCtrl, FactoryCtrl */

import FactoriesCtrl from './list-factories/factories.controller';
import FactoryCtrl from './list-factories/factory.controller';

class FactoryConfig {

  constructor(register) {
    register.controller('FactoriesCtrl', FactoriesCtrl);
    register.controller('FactoryCtrl', FactoryCtrl);

    // config routes
    register.app.config(function ($routeProvider) {
      $routeProvider.when('/factories', {
        templateUrl: 'app/factories/list-factories/factories.html',
        controller: 'FactoriesCtrl'
      })
        .when('/factory/:id', {
          templateUrl: 'app/factories/list-factories/factory.html',
          controller: 'FactoryCtrl'
        });


    })
    ;
  }
}


export default FactoryConfig;
