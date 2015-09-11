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
 */
class DashboardCtrl {


  /**
   * Default constructor
   * @ngInject for Dependency injection
   */
  constructor(codenvyAPI) {
    this.isSaasServiceAvailable = codenvyAPI.getService().isServiceAvailable(codenvyAPI.getSaas().getSaasServicePath());
  }


}

export default DashboardCtrl;

