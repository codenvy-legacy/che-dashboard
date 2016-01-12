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
 * Defines a directive for creating the configuration panel.
 */
class ConfigurationPanel {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict = 'E';
    this.replace = false;
    this.bindToController = true;
    this.templateUrl = 'app/onpremises/admin/installation/configuration/configuration.html';
    this.controller = 'OnPremConfigurationCtrl';
    this.controllerAs = 'onPremConfigurationCtrl';
  }

}

export default ConfigurationPanel;
