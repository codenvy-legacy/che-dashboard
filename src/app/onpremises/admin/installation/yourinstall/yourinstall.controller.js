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
  constructor(imsNodesApi, imsArtifactApi, $q) {
    this.customerName = '<Customer Name>';
    this.downloadedVersions = [];
    this.fetchAll = false;
    this.errorFetching = false;
    let first = imsNodesApi.listNodes().then((nodes) => { this.nodeList = nodes; });
    let second = imsArtifactApi.getInstalledArtifactsList().then(result => this.updateInstalledVersion(result));
    let third = imsArtifactApi.getDownloadedArtifactsList().then(result => this.updateDownloadedVersion(result));
    let allPromise = $q.all([first, second, third]);
    allPromise.then(() => this.fetchAll = true, () => this.errorFetching = true);
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
          this.downloadedVersions.push(artifact.version);
        }
      }
      return;
    }
    // else, clear all values
    this.downloadedVersions.length = 0;
  }
}

export default YourInstallationCtrl;
