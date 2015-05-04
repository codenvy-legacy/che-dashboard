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

import Register from '../utils/register.js';

/**
 * This class is handling the interface with Installation Manager Server (IMS) part of the API that relates to artifacts.
 */
class imsArtifactApi {

  /**
   * Default constructor for the artifact API.
   * @ngInject for Dependency injection
   */
  constructor($resource) {

    // remote call
    this.remoteImsAPI = $resource('/im', {}, {
      getDownloadedArtifactsList: { method: 'GET', url: '/im/download/list' },
      getInstalledArtifactsList: { method: 'GET', url: '/im/install/list' },
      getAvailableArtifactsList: { method: 'GET', url: '/im/download/check' },

      downloadArtifacts: { method: 'POST', url: '/im/download/start' },
      downloadArtifact: { method: 'POST', url: '/im/download/start?artifact=:artifactName&version=:version' },
    });
  }

  getDownloadedArtifactsList() {
    let request = this.remoteImsAPI.getDownloadedArtifactsList();
    return request.$promise;
  }

  getInstalledArtifactsList() {
    let request = this.remoteImsAPI.getInstalledArtifactsList();
    return request.$promise;
  }

  getAvailableArtifactsList() {
    let request = this.remoteImsAPI.getAvailableArtifactsList();
    return request.$promise;
  }

  downloadArtifacts() {
    let request = this.remoteImsAPI.downloadArtifacts();
    return request.$promise;
  }

  downloadArtifact(artifactName, artifactVersion) {
    let artifact = { artifactName: artifactName, version: artifactVersion };
    let request = this.remoteImsAPI.downloadArtifact(artifact, {});
    return request.$promise;
  }
}

// Register this factory
Register.getInstance().factory('imsArtifactApi', imsArtifactApi);
