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

class LoginCtrl {
  /*@ngInject*/
  constructor($scope, $http, $cookies, $window, $location) {

    $scope.username = 'test';
    $scope.password = 'test';
    $scope.submit = function () {
      $http({
        url: '/api/auth/login',
        method: 'POST',
        data: { 'username': $scope.username, 'password': $scope.password}
      }).then(function (response) {
        $cookies.token = response.data.value;
        $cookies.refreshStatus = 'DISABLED';
        $location.path('#/');

      }, function (response) {
        console.log('error on login');
        $window.alert('error');
        console.log(response);
      });
    };
  }
}


export default LoginCtrl;



