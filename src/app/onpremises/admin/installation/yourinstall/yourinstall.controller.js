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
    this.imsArtifactApi = imsArtifactApi;
    this.imsNodesApi = imsNodesApi;
    this.$q = $q;

    this.isLoading = false;
    this.initArtifacts();
  }

  initArtifacts() {
    this.isLoading = true;
    let first = this.imsNodesApi.listNodes().then((nodes) => { this.nodeList = nodes; });
    let second = this.imsArtifactApi.getInstalledArtifactsList().then(result => this.updateInstalledVersion(result));
    let third = this.imsArtifactApi.getDownloadedArtifactsList().then(result => this.updateDownloadedVersion(result));
    let allPromise = this.$q.all([first, second, third]);
    allPromise.then(() => {
        this.isLoading = false;
    }, () => {
        this.isLoading = false;
    });

  }

  updateInstalledVersion(resource) {
    if (resource) {
      for (let artifact of resource) {
        if (artifact.artifact === 'codenvy') {
          this.installedVersion = artifact.version;
          return;
        }
      }
    }
    this.installedVersion = undefined;
  }

  removeDownloadedVersion(downloadedVersion) {
    // delete
    let deletePromise = this.imsArtifactApi.deleteDownloadedArtifact('codenvy', downloadedVersion);

    // remove existing versions
    deletePromise.then(() => {this.imsArtifactApi.getDownloadedArtifactsList().then(result => this.updateDownloadedVersion(result));});

  }


  updateDownloadedVersion(resource) {
    this.downloadedVersions.length = 0;
    if (resource) {
      for (let artifact of resource) {
        if (artifact.artifact === 'codenvy' && artifact.status !== 'INSTALLED') {
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
