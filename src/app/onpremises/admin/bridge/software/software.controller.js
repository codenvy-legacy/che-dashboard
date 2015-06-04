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

class OnPremisesAdminBridgeAvailableSoftwareCtrl {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor(imsArtifactApi) {
    this.imsArtifactApi = imsArtifactApi;
    let artifactsPromise = this.imsArtifactApi.artifacts();

    artifactsPromise.then(result => { console.log('got artifacts data:', result); this.artifacts = result; });
    artifactsPromise.catch(error => { console.log('artifacts list failed' , error); this.artifacts = undefined; });
  }

  downloadArtifact(artifact, artifactAvailableVersion) {
    this.imsArtifactApi.downloadArtifact(artifact.name, artifactAvailableVersion);
  }

  showDownloadAction(artifact) {
    if (artifact && artifact.availables) {
      if (artifact.downloaded) {
        return artifact.availables.indexOf(artifact.downloaded.version) !== -1;
      } else {
        return true;
      }
    } else {
      return false;
    }
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

export default OnPremisesAdminBridgeAvailableSoftwareCtrl;
