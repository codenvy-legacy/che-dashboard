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
class ImsArtifactApi {

  /**
   * Default constructor for the artifact API.
   * @ngInject for Dependency injection
   */
  constructor($resource) {

    // remote call
    this.remoteImsAPI = $resource('/im', {}, {
      getDownloadedArtifactsList: { method: 'GET', url: '/im/download' },
      getInstalledArtifactsList: { method: 'GET', url: '/im/installation' },
      getAvailableArtifactsList: { method: 'GET', url: '/im/update' },

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

  artifacts() {
    let installPromise = this.getInstalledArtifactsList();
    let downloadedPromise = this.getDownloadedArtifactsList();
    let availablePromise = this.getAvailableArtifactsList();
    let all = Promise.all([installPromise, downloadedPromise, availablePromise]);

    return all.then((results) => this.consolidateArtifacts(results));
  }

  /**
   * Assemble all sources of informations for a given artifacts: installed, downloaded and available,
   * in the same object.
   */
  consolidateArtifacts(results) {
    let artifacts = {};
    let installedResult = results.shift();

    if (installedResult && installedResult.artifacts) {
      for (let artifact of installedResult.artifacts) {
        let value = {
          name: artifact.artifact,
          description: artifact.description,
          installed: {
            version: artifact.version,
            date: artifact.date
          }
        };
        artifacts[artifact.artifact] = value;
      }
    }

    let downloadedResult = results.shift();
    if (downloadedResult && downloadedResult.artifacts) {
      for (let artifact of downloadedResult.artifacts) {
        let value = artifacts[artifact.artifact];
        if (!value) {
          value = { name: artifact.artifact, description: artifact.description };
        }
        artifacts[artifact.artifact] = value; // in case it was just created
        value.downloaded = {
          version: artifact.version,
          date: artifact.date
        };
      }
    }

    let availableResult = results.shift();
    if (availableResult && availableResult.artifacts) {
      for (let artifact of availableResult.artifacts) {
        let value = artifacts[artifact.artifact];
        if (!value) {
          value = { name: artifact.artifact, description: artifact.description };
        }
        artifacts[artifact.artifact] = value; // in case it was just created
        value.available = {
          version: artifact.version,
          date: artifact.date
        };
      }
    }

    return artifacts;
  }
}

// Register this factory
Register.getInstance().factory('imsArtifactApi', ImsArtifactApi);
