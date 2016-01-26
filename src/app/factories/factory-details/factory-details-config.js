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

import {FactoryDetailsCtrl} from '../factory-details/factory-details.controller';
import {InformationTabConfig} from './information-tab/information-tab-config';
import {ConfigurationTabConfig} from './configuration-tab/configuration-tab-config';


export class FactoryDetailsConfig {

  constructor(register) {
    register.controller('FactoryDetailsCtrl', FactoryDetailsCtrl);

    // config routes
    register.app.config(function ($routeProvider) {
      $routeProvider.accessWhen('/factory/:id', {
        templateUrl: 'app/factories/factory-details/factory-details.html',
        controller: 'FactoryDetailsCtrl',
        controllerAs: 'factoryDetailsCtrl'
      });

    });

    // config files
    new InformationTabConfig(register);
    new ConfigurationTabConfig(register);

  }
}
