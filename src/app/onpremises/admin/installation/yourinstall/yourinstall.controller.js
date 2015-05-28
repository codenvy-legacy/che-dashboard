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
  constructor(imsNodesApi, imsArtifactApi) {
    this.customerName = '<Customer Name>';

    imsNodesApi.listNodes().then((nodes) => { this.nodeList = nodes; });
    imsArtifactApi.getInstalledArtifactsList().then(result => this.updateInstalledVersion(result));
    imsArtifactApi.getDownloadedArtifactsList().then(result => this.updateDownloadedVersion(result));
  }

  updateInstalledVersion(resource) {
    if (resource.artifacts) {
      for (let artifact of resource.artifacts) {
        if (artifact.artifact === 'codenvy') {
          this.installedVersion = artifact.version;
          return;
        }
      }
    }
    this.installedVersion = undefined;
  }

  updateDownloadedVersion(resource) {
    if (resource.artifacts) {
      for (let artifact of resource.artifacts) {
        if (artifact.artifact === 'codenvy') {
          this.downloadedVersion = artifact.version;
          return;
        }
      }
    }
    this.downloadedVersion = undefined;
  }
}

export default YourInstallationCtrl;
