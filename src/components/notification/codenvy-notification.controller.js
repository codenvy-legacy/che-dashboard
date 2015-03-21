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


import Register from '../../components/utils/register.js';

/**
 * This class is controller for the custom notification
 * @author Oleksii Orel
 */
class CodenvyNotificationController {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor($scope, codenvyNotificationService) {
    this.$scope = $scope;
    this.codenvyNotificationService = codenvyNotificationService;

    $scope.notificationText = codenvyNotificationService.getNotificationText();

    $scope.closeNotification = function () {
      codenvyNotificationService.closeToast();
    };
  }

}

export default CodenvyNotificationController;

Register.getInstance().controller('codenvyNotificationController', CodenvyNotificationController);
