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

import DashboardCtrl from './dashboard.controller';
import DashboardLearnMoreCtrl from './learn-more/dashboard-learn-more.controller';
import DashboardLearnMore from './learn-more/dashboard-learn-more.directive';
import DashboardLastProjectsCtrl from './last-projects/last-projects.controller';
import DashboardLastProjects from './last-projects/last-projects.directive';
import DashboardOverviewCtrl from './overview/overview.controller';
import DashboardOverview from './overview/overview.directive';

class DashboardConfig {

  constructor(register) {

    // overview
    register.controller('DashboardOverviewCtrl', DashboardOverviewCtrl);
    register.directive('dashboardOverview', DashboardOverview);


    // last projects
    register.controller('DashboardLastProjectsCtrl', DashboardLastProjectsCtrl);
    register.directive('dashboardLastProjects', DashboardLastProjects);

    // learn-more
    register.controller('DashboardLearnMoreCtrl', DashboardLearnMoreCtrl);
    register.directive('dashboardLearnMore', DashboardLearnMore);

    // controller
    register.controller('DashboardCtrl', DashboardCtrl);

    // config routes
    register.app.config(function ($routeProvider) {
      $routeProvider.accessWhen('/', {
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboardCtrl'
      });
    })
    ;
  }
}


export default DashboardConfig;
