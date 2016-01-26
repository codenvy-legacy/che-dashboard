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
 * Defines a directive for creating the your installation panel.
 */
export class YourInstallationPanel {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.replace=false;
    this.templateUrl = 'app/onpremises/admin/installation/yourinstall/yourinstall.html';
    this.controller = 'YourInstallationCtrl';
    this.controllerAs = 'yourInstallationCtrl';
  }

}
