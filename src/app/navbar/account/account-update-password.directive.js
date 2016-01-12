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

/**
 * Defines a directive for displaying update password widget.
 * @author Oleksii Orel
 */
class AccountUpdatePassword {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
    this.restrict = 'E';
    this.replace = false;
    this.templateUrl = 'app/navbar/account/account-update-password.html';

    // scope values
    this.scope = {
      password: '=cdvyPassword',
      resetPassword: '=cdvyResetPassword'
    };

  }

  /**
   * Keep reference to the model controller
   */
  link($scope) {
    $scope.$watch('changePasswordForm.$pristine', () => {
      $scope.$watch('newPassword', (newVal) => {
        if ($scope.changePasswordForm.$invalid || ($scope.confirmPassword !== newVal)) {
          $scope.password = null;
          return;
        }
        $scope.password = newVal;
      });
      $scope.$watch('confirmPassword', (newVal) => {
        if ($scope.changePasswordForm.newPassword.$invalid || ($scope.newPassword !== newVal)) {
          $scope.password = null;
          return;
        }
        $scope.password = newVal;
      });
      $scope.$watch('resetPassword', (newVal) => {
        if (!newVal) {
          return;
        }
        $scope.newPassword = '';
        $scope.confirmPassword = '';
        $scope.resetPassword = false;
      });
    });

  }

}

export default AccountUpdatePassword;

