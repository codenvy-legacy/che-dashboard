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
import CodenvyNotificationController from '../../components/notification/codenvy-notification.controller.js';

/**
 * Provides custom notifications
 * @author Oleksii Orel
 */
class CodenvyNotificationService {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor($mdToast) {
    this.$mdToast = $mdToast;
    this.text = '';
  }

  showInfo(text) {
    this.$mdToast.hide();
    this.text = text;
    this.$mdToast.show({
      templateUrl: 'components/notification/codenvy-notification-info.html',
      controller: 'codenvyNotificationController',
      hideDelay: 3000
    });
  }

  showError(text) {
    this.$mdToast.hide();
    this.text = text;
    this.$mdToast.show({
      templateUrl: 'components/notification/codenvy-notification-error.html',
      controller: 'codenvyNotificationController',
      hideDelay: 20000
    });
  }

  getNotificationText() {
    return this.text;
  }

  closeToast() {
    this.$mdToast.hide();
  }

}

export default CodenvyNotificationService;

// Register this factory
Register.getInstance().factory('codenvyNotificationService', CodenvyNotificationService);
