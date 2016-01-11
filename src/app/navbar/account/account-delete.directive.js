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
 * Defines a directive for displaying account-delete widget.
 * @author Oleksii Orel
 */
class AccountDelete {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.templateUrl = 'app/navbar/account/account-delete.html';
    this.replace = false;
    this.controller = 'AccountDeleteCtrl';
    this.controllerAs = 'accountDeleteCtrl';

  }

}

export default AccountDelete;
