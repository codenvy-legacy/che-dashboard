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

export class OnPremisesAdminAvailableSoftwareCtrl {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor(imsArtifactApi, $interval) {
    'ngInject';

    this.imsArtifactApi = imsArtifactApi;
    this.$interval = $interval;
    let artifactsPromise = this.imsArtifactApi.artifacts();
    artifactsPromise.then(result => { console.log('got artifacts data:', result); this.artifacts = result; });
    artifactsPromise.catch(error => { console.log('artifacts list failed' , error); this.artifacts = undefined; });

    this.currentDownloadedArtifact = {
      inProgress: false,
      name: '',
      version: '',
      percent: 0
    };

    function internalFunction(object, id) {
      object.checkDownloadID(id);
    }

    // do we have a download in progress ?
    let promise = this.imsArtifactApi.getCurrentDownloadID();
    promise.then(() => {
      promise.then((data) => {
        this.promiseInterval = this.$interval(() => {internalFunction(this, data.id);}, 2000);
      });
    });
  }


  downloadArtifact(artifact, artifactAvailableVersion) {
    function internalFunction(object, id) {
      object.checkDownloadID(id);
    }

    let promise = this.imsArtifactApi.downloadArtifact(artifact.name, artifactAvailableVersion);
    promise.then((data) => {
      this.promiseInterval = this.$interval(() => {internalFunction(this, data.id);}, 2000);
    });

  }

  checkDownloadID(id) {
    let promise = this.imsArtifactApi.getInfoDownloadID(id);
    promise.then(data => {
      // check artifact being downloaded
      let artifact = data.artifacts[0];
      let artifactName = artifact.name;
      let artifactVersion = artifact.version;
      let percent = data.percents;
      let status = data.status;

      this.currentDownloadedArtifact.name = artifactName;
      this.currentDownloadedArtifact.version = artifactVersion;
      this.currentDownloadedArtifact.percent = percent;

      if (status === 'DOWNLOADED') {
        this.$interval.cancel(this.promiseInterval);
        this.currentDownloadedArtifact.inProgress = false;
        let artifactsPromise = this.imsArtifactApi.artifacts();
        // update artifacts
        artifactsPromise.then(result => {
          this.artifacts = result;
        });

      }

      this.currentDownloadedArtifact.inProgress = true;
    });

      promise.catch(() => {
      // remove any timeout
      if (this.promiseInterval) {
        this.$interval.cancel(this.promiseInterval);
        this.currentDownloadedArtifact.inProgress = false;
      }
    });
  }

  artifactDisplayName(artifactId) {
    return this.imsArtifactApi.getArtifactDisplayName(artifactId);
  }

  artifactDescription(artifactId) {
    return this.imsArtifactApi.getArtifactDescription(artifactId);
  }

  releaseNoteUrl(artifactId, version) {
    return this.imsArtifactApi.getArtifactReleaseNotesUrl(artifactId, version);
  }
}
