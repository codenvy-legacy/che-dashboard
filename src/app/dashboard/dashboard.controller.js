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

/**
 * @ngdoc controller
 * @name dashboard.controller:DashboardCtrl
 * @description This class is handling the controller of the dashboard
 * @author Florent Benoit
 * @author Oleksii Orel
 */
class DashboardCtrl {


  /**
   * Default constructor
   * @ngInject for Dependency injection
   */
  constructor($rootScope, codenvyAPI, $timeout) {
    this.isSaasServiceAvailable = codenvyAPI.getService().isServiceAvailable(codenvyAPI.getSaas().getSaasServicePath());
    this.isContentDisplayed = true;

    var isFirstLoad = true;

    $rootScope.$on('dashboard-button:clicked', () => {
      if(!isFirstLoad){
        //Update some including widgets if second time clicked
        this.isContentDisplayed = false;
        $timeout( () => {
          this.isContentDisplayed = true;
        }, 100);
      }
      isFirstLoad=false;
    });

  }


}

export default DashboardCtrl;

