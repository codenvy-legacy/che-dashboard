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

import Register from '../../components/utils/register.js';

/**
 * Provides custom notifications
 * @author Oleksii Orel
 */
class CodenvyNotification {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor($mdToast) {
    this.$mdToast = $mdToast;
  }

  showInfo(text) {
    this.$mdToast.hide();
    this.$mdToast.show({
      template: '<md-toast class="cdvy-notification-info"><span flex>' + text + '</span></md-toast>',
      hideDelay: 3000
    });
  }

  showError(text) {
    this.$mdToast.hide();
    this.$mdToast.show({
      template: '<md-toast class="cdvy-notification-error">' +
      '<span flex><b>Failed!</b> ' + text + '</span>' +
      '<md-button ng-click="hideNotification()">Close</md-button>' +
      '</md-toast>',
      controller: ['$scope', ($scope) => {
        $scope.hideNotification = this.$mdToast.hide;
      }],
      hideDelay: 20000
    });
  }
}

export default CodenvyNotification;

// Register this factory
Register.getInstance().factory('codenvyNotification', CodenvyNotification);
