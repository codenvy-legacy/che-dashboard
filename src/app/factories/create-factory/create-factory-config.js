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


import CreateFactoryCtrl from '../create-factory/create-factory.controller';


import FactoryFromProjectCtrl from '../create-factory/projects-tab/factory-from-project.controller';
import FactoryFromProject from '../create-factory/projects-tab/factory-from-project.directive';


class CreateFactoryConfig {

  constructor(register) {

    register.controller('CreateFactoryCtrl', CreateFactoryCtrl);

    register.controller('FactoryFromProjectCtrl', FactoryFromProjectCtrl);
    register.directive('cdvyFactoryFromProject', FactoryFromProject);

    // config routes
    register.app.config(function ($routeProvider) {
      $routeProvider.accessWhen('/factories/create-factory', {
        templateUrl: 'app/factories/create-factory/create-factory.html',
        controller: 'CreateFactoryCtrl',
        controllerAs: 'createFactoryCtrl'
      });

    });

  }
}

export default CreateFactoryConfig;
