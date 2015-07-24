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

/* exported ListFactoriesCtrl, FactoryCtrl, CodenvyFactoryItem */

import ListFactoriesCtrl from './list-factories/list-factories.controller';
import FactoryDetailsCtrl from './factory-details/factory-details.controller';
import CodenvyFactoryItem from './list-factories/factory-item/factory-item.directive';

class FactoryConfig {

  constructor(register) {
    register.controller('ListFactoriesCtrl', ListFactoriesCtrl);

    register.controller('FactoryDetailsCtrl', FactoryDetailsCtrl);

    register.directive('cdvyFactoryItem', CodenvyFactoryItem);

    // config routes
    register.app.config(function ($routeProvider) {
      $routeProvider.accessWhen('/factories', {
        templateUrl: 'app/factories/list-factories/list-factories.html',
        controller: 'ListFactoriesCtrl',
        controllerAs: 'listFactoriesCtrl'
      })
        .accessWhen('/factory/:id', {
          templateUrl: 'app/factories/factory-details/factory-details.html',
          controller: 'FactoryDetailsCtrl',
          controllerAs: 'factoryDetailsCtrl'
        });

    })
    ;
  }
}


export default FactoryConfig;
