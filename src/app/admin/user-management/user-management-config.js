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

import AdminsAddUserCtrl from './add-user/add-user.controller';
import AdminsUserManagementCtrl from './user-management.controller';

class AdminsUserManagementConfig {

  constructor(register) {
    register.controller('AdminsAddUserCtrl', AdminsAddUserCtrl);
    register.controller('AdminsUserManagementCtrl', AdminsUserManagementCtrl);

    // configure routes
    register.app.config(function ($routeProvider) {
      $routeProvider.accessWhen('/admin/usermanagement', {
        templateUrl: 'app/admin/user-management/user-management.html',
        controller: 'AdminsUserManagementCtrl',
        controllerAs: 'adminsUserManagementCtrl'
      });
    });

  }
}

export default AdminsUserManagementConfig;
