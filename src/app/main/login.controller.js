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
  constructor($scope, $http, $cookies, $window, $location, codenvyAPI) {

    $scope.username = 'test';
    $scope.password = 'test';
    $scope.realm = '';
    var loginData;

    $scope.submit = function () {
      if ($scope.realm !== '') {
        loginData = {'username': $scope.username, 'password': $scope.password, 'realm': $scope.realm};
      } else {
        loginData = {'username': $scope.username, 'password': $scope.password};
      }
      $http({
        url: '/api/auth/login',
        method: 'POST',
        data: loginData
      }).then(function (response) {
        $cookies.token = response.data.value;
        $cookies.refreshStatus = 'DISABLED';

        // update user
        let promise = codenvyAPI.getUser().refetchUser();
        promise.then(() => {
          $location.path('#/');
        }, () => {
          $location.path('#/');
        });

      }, function (response) {
        console.log('error on login');
        $window.alert('error');
        console.log(response);
      });
    };
  }
}


export default LoginCtrl;



