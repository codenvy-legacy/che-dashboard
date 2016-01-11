/*
 * Copyright (c) 2012-2016 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 */
'use strict';

/**
 * @ngdoc directive
 * @name dashboard.directive:DashboardLearnMoreCtrl
 * @description This class is handling the directive of the learn-more widget to display in the dashboard
 * @author Florent Benoit
 */
class DashboardLearnMore {


  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
    this.restrict = 'E';
    this.templateUrl = 'app/dashboard/learn-more/dashboard-learn-more.html';

    this.controller = 'DashboardLearnMoreCtrl';
    this.controllerAs = 'dashboardLearnMoreCtrl';
    this.bindToController = true;
  }

}

export default DashboardLearnMore;

