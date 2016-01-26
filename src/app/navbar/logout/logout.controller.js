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
 * @ngdoc controller
 * @name logout.controller:LogoutCtrl
 * @description This class is handling the controller of the logout
 * @author Florent Benoit
 */
export class LogoutCtrl {


  /**
   * Default constructor
   * @ngInject for Dependency injection
   */
  constructor($resource, $cookies, $window) {
    this.$resource = $resource;
    this.$cookies = $cookies;
    this.$window = $window;
    this.logoutAPI = this.$resource('/api/auth/logout', {});

  }

  /**
   * Logout current user
   */
  logout() {
    let data = {token: this.$cookies['session-access-key']};
    let promise = this.logoutAPI.save(data).$promise;
    promise.then(() => {
      this.$window.location.href = '/site/login';
    });

  }



}
