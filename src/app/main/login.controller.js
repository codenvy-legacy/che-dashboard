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
  constructor($http, $cookies, $window, codenvyAPI, $timeout, $location) {

    this.username = '';
    this.password = '';
    this.usermode = 'User';


    this.$http = $http;
    this.$cookies = $cookies;
    this.$window = $window;
    this.$timeout = $timeout
    this.codenvyAPI = codenvyAPI;
    this.location = $location;

    // hide the navbar
    angular.element('#codenvynavbar').hide();

  }


    submit() {
      // reset error message
      this.error = null;
      this.loginInProgress = true;

      var loginData;
      if (this.usermode === 'Admin') {
        loginData = {'username': this.username, 'password': this.password, 'realm': 'sysldap'};
      } else {
        loginData = {'username': this.username, 'password': this.password};
      }
      this.$http({
        url: '/api/auth/login',
        method: 'POST',
        data: loginData
      }).then((response) => {

        this.$cookies.token = response.data.value;
        this.$window.sessionStorage["codenvyToken"] = response.data.value;
        this.$cookies.refreshStatus = 'DISABLED';

        // update user
        let promise = this.codenvyAPI.getUser().refetchUser();
        promise.then(() => this.refresh() , () => this.refresh());
      },  (response) => {
        this.loginInProgress = false;
        console.log('error on login', response);
        this.error = response.statusText;

      });
    }

  refresh() {

    // refresh the home page
    this.$location = "/"
    this.$window.location = '/';
    this.$timeout(() =>  this.$window.location.reload(), 500);

  }

}


export default LoginCtrl;



