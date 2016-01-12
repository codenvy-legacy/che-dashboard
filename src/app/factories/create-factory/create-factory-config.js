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


import CreateFactoryCtrl from '../create-factory/create-factory.controller';

import FactoryFromWorkspaceCtrl from '../create-factory/workspaces-tab/factory-from-workpsace.controller.js';
import FactoryFromWorkspace from '../create-factory/workspaces-tab/factory-from-workspace.directive.js';
import FactoryFromFileCtrl from '../create-factory/config-file-tab/factory-from-file.controller';
import FactoryFromFile from '../create-factory/config-file-tab/factory-from-file.directive';
import FactoryFromTemplateCtrl from '../create-factory/template-tab/factory-from-template.controller';
import FactoryFromTemplate from '../create-factory/template-tab/factory-from-template.directive';

class CreateFactoryConfig {

  constructor(register) {

    register.controller('CreateFactoryCtrl', CreateFactoryCtrl);

    register.controller('FactoryFromWorkspaceCtrl', FactoryFromWorkspaceCtrl);
    register.directive('cdvyFactoryFromWorkspace', FactoryFromWorkspace);

    register.controller('FactoryFromFileCtrl', FactoryFromFileCtrl);
    register.directive('cdvyFactoryFromFile', FactoryFromFile);

    register.controller('FactoryFromTemplateCtrl', FactoryFromTemplateCtrl);
    register.directive('cdvyFactoryFromTemplate', FactoryFromTemplate);

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
