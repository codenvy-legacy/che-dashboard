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
 * @name dashboard.directive:DashboardLastProjects
 * @description This class is handling the directive of the listing last opened projects in the dashboard
 * @author Florent Benoit
 */
class DashboardLastProjects {


  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
    this.restrict = 'E';
    this.templateUrl = 'app/dashboard/last-projects/last-projects.html';

    this.controller = 'DashboardLastProjectsCtrl';
    this.controllerAs = 'dashboardLastProjectsCtrl';
    this.bindToController = true;
  }

}

export default DashboardLastProjects;

