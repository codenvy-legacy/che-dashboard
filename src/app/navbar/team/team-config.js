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

import TeamCtrl from '../team/team.controller';
import TeamMembersDialogAddCtrl from '../team/team-members-dialog-add.controller';

class TeamConfig {

  constructor(register) {
    register.controller('TeamCtrl', TeamCtrl);
    register.controller('TeamMembersDialogAddCtrl', TeamMembersDialogAddCtrl);

    // config routes
    register.app.config(function ($routeProvider) {
      $routeProvider.accessWhen('/team', {
        templateUrl: 'app/navbar/team/team.html',
        controller: 'TeamCtrl',
        controllerAs: 'teamCtrl'
      });
    });
  }
}

export default TeamConfig;
