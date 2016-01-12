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

import DashboardCtrl from './dashboard.controller';
import DashboardLearnMoreCtrl from './learn-more/dashboard-learn-more.controller';
import DashboardLearnMore from './learn-more/dashboard-learn-more.directive';
import DashboardLastProjectsCtrl from './last-projects/last-projects.controller';
import DashboardLastProjects from './last-projects/last-projects.directive';
import DashboardOverviewCtrl from './overview/overview.controller';
import DashboardOverview from './overview/overview.directive';
import WelcomeBackCtrl from './welcome-back/welcome-back.controller';
import WelcomeBack from './welcome-back/welcome-back.directive';

class DashboardConfig {

  constructor(register) {

    // overview
    register.controller('DashboardOverviewCtrl', DashboardOverviewCtrl);
    register.directive('dashboardOverview', DashboardOverview);

    // last projects
    register.controller('DashboardLastProjectsCtrl', DashboardLastProjectsCtrl);
    register.directive('dashboardLastProjects', DashboardLastProjects);

    // welcome back
    register.controller('WelcomeBackCtrl', WelcomeBackCtrl);
    register.directive('welcomeBack', WelcomeBack);

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
        controllerAs: 'dashboardCtrl',
        resolve: {
          check: ['$q', 'codenvyService', 'codenvyAdminService', function ($q, codenvyService, codenvyAdminService) {
            var defer = $q.defer();
            codenvyService.fetchServices().then(() => {
              codenvyAdminService.fetchServices().then(() => {
                defer.resolve();
              }, () => {
                defer.resolve();
              });
            });
            return defer.promise;
          }]
        }
      });
    })
    ;
  }
}



export default DashboardConfig;
