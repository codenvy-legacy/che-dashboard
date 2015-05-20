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

class YourInstallationCtrl {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor(imsNodesApi) {
    this.imsNodesApi = imsNodesApi;
    this.customerName = 'Toto inc.';
    this.installedVersion = '1.0.0';
    this.downloadedVersion= '1.0.1';
    this.imsNodesApi.listNodes().then((nodes) => { this.nodeList = nodes; });
  }
}

export default YourInstallationCtrl;
