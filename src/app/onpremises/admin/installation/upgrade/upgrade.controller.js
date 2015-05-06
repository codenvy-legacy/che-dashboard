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

class UpgradeInstallationCtrl {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor(imsUpdateApi) {
    this.imsUpdateApi = imsUpdateApi;
  }

  install() {
    this.imsUpdateApi.update();
  }

  saveSchedule() {
    // Not implemented yet
  }
}

export default UpgradeInstallationCtrl;
