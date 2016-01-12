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

import DeleteFactoryCtrl from '../information-tab/delete-factory/delete-factory.controller';
import DeleteFactory from '../information-tab/delete-factory/delete-factory.directive';
import FactoryInformationCtrl from '../information-tab/factory-information/factory-information.controller';
import FactoryInformation from '../information-tab/factory-information/factory-information.directive';
import FactoryRoutingCtrl from '../information-tab/factory-routing/factory-routing.controller';
import FactoryRouting from '../information-tab/factory-routing/factory-routing.directive';


class InformationTabConfig {

  constructor(register) {
    register.controller('DeleteFactoryCtrl', DeleteFactoryCtrl);
    register.directive('cdvyDeleteFactory', DeleteFactory);

    register.controller('FactoryInformationCtrl', FactoryInformationCtrl);
    register.directive('cdvyFactoryInformation', FactoryInformation);

    register.controller('FactoryRoutingCtrl', FactoryRoutingCtrl);
    register.directive('cdvyFactoryRouting', FactoryRouting);

  }
}

export default InformationTabConfig;
