/*
 * Copyright (c) 2012-2016 Codenvy, S.A.
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
 * @ngdoc directive
 * @name account.profile.directive:accountProfile
 * @restrict E
 * @element
 *
 * @description
 * <account-profile></account-profile>` for displaying account profile.
 *
 * @usage
 *   <account-profile></account-profile>
 *
 * @author Florent Benoit
 */
class AccountProfile {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
    this.restrict = 'E';
    this.templateUrl = 'app/navbar/account/profile/account-profile.html';
    this.replace = false;

    this.controller = 'AccountProfileCtrl';
    this.controllerAs = 'accountProfileCtrl';

    this.bindToController = true;

    this.scope = true;

  }

}

export default AccountProfile;
