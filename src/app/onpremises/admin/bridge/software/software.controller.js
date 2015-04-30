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

    artifactsPromise.then((result) => { this.artifacts = result; });
    artifactsPromise.catch((error) => { console.log('artifacts list failed' , error); this.artifacts = undefined; });
  }

  downloadArtifact(artifact) {
    this.imsArtifactApi.downloadArtifact(artifact.name, artifact.available.version);
  }

  showDownloadAction(artifact) {
    if (artifact && artifact.available) {
      if (artifact.downloaded) {
        return artifact.available.version !== artifact.downloaded.version;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
}

export default OnPremisesAdminBridgeAvailableSoftwareCtrl;
