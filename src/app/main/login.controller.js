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
  constructor($http, $cookies, $window, codenvyAPI) {

    this.username = '';
    this.password = '';
    this.realm = '';

    this.submit = function() {
      var loginData;
      if (this.realm !== '') {
        loginData = {'username': this.username, 'password': this.password, 'realm': this.realm};
      } else {
        loginData = {'username': this.username, 'password': this.password};
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
          // refresh the home page
          $window.location = '#/';
          $window.location.reload();
        }, () => {
          // refresh the home page
          $window.location = '#/';
          $window.location.reload();
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



