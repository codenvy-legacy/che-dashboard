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
import FactoryItemCtrl from './list-factories/factory-item/factory-item.controller';
import CodenvyFactoryItem from './list-factories/factory-item/factory-item.directive';
import FactoryDetailsConfig from './factory-details/factory-details-config';
import CreateFactoryConfig from './create-factory/create-factory-config';

class FactoryConfig {

  constructor(register) {
    register.controller('ListFactoriesCtrl', ListFactoriesCtrl);

    register.controller('FactoryItemCtrl', FactoryItemCtrl);
    register.directive('cdvyFactoryItem', CodenvyFactoryItem);

    // config routes
    register.app.config(function ($routeProvider) {
      $routeProvider.accessWhen('/factories', {
        templateUrl: 'app/factories/list-factories/list-factories.html',
        controller: 'ListFactoriesCtrl',
        controllerAs: 'listFactoriesCtrl'
      });

    });

    // config files
    new FactoryDetailsConfig(register);
    new CreateFactoryConfig(register);

  }
}


export default FactoryConfig;
