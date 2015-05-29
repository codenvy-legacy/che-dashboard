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
import dictionary from './dictionary';

/**
 * This class is handling the interface with Installation Manager Server (IMS) part of the API that relates to artifacts.
 */
class ImsArtifactApi {

  /**
   * Default constructor for the artifact API.
   * @ngInject for Dependency injection
   */
  constructor($resource, $q) {
    this.$q = $q;

    // remote call
    this.remoteImsAPI = $resource('/im', {}, {
      getDownloadedArtifactsList: { method: 'GET', url: '/im/downloads' },
      getInstalledArtifactsList: { method: 'GET', url: '/im/installation' },
      getAvailableArtifactsList: { method: 'GET', url: '/im/update' },

      downloadArtifacts: { method: 'POST', url: '/im/downloads' },

      artifactProperties: {method: 'GET', url:'/im/artifact/:artifactName/version/:version/properties'}
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
    let artifact = { artifact: artifactName, version: artifactVersion };
    let request = this.remoteImsAPI.downloadArtifacts(artifact, {});
    return request.$promise;
  }

  artifacts() {
    let installPromise = this.getInstalledArtifactsList();
    let downloadedPromise = this.getDownloadedArtifactsList();
    let availablePromise = this.getAvailableArtifactsList();
    let all = this.$q.all([installPromise, downloadedPromise, availablePromise]);

    return all.then(results => this._consolidateArtifacts(results));
  }

  /**
   * Assemble all sources of informations for a given artifacts: installed, downloaded and available,
   * in the same object.
   */
  _consolidateArtifacts(results) {
    let artifacts = {};
    let toGather = new Set();
    let installedResult = results.shift();

    if (installedResult && installedResult.artifacts) {
      for (let artifact of installedResult.artifacts) {
        let value = {
          name: artifact.artifact,
          installed: {
            version: artifact.version
          }
        };
        artifacts[artifact.artifact] = value;
        toGather.add({ name: artifact.artifact, version: artifact.version });
      }
    }

    let downloadedResult = results.shift();
    if (downloadedResult && downloadedResult.artifacts) {
      for (let artifact of downloadedResult.artifacts) {
        let value = artifacts[artifact.artifact];
        if (!value) {
          value = { name: artifact.artifact };
        }
        artifacts[artifact.artifact] = value; // in case it was just created
        value.downloaded = {
          version: artifact.version
        };
        toGather.add({ name: artifact.artifact, version: artifact.version });
      }
    }

    let availableResult = results.shift();
    if (availableResult && availableResult.artifacts) {
      for (let artifact of availableResult.artifacts) {
        let value = artifacts[artifact.artifact];
        if (!value) {
          value = { name: artifact.artifact };
        }
        artifacts[artifact.artifact] = value; // in case it was just created
        value.available = {
          version: artifact.version
        };
        toGather.add({ name: artifact.artifact, version: artifact.version });
      }
    }

    let datesPromise = this._gatherDates(toGather);
    return datesPromise.then(data => this._injectDates(data, artifacts));
  }

  /**
   * Builds a Map with the dates of release for all listed artifacts.
   */
  _gatherDates(artifacts) {
    let promises = [];
    let artifactsArray = [];
    for (let artifact of artifacts) {
      let promise = this.getArtifactReleaseDate(artifact.name, artifact.version);
      artifactsArray.push(artifact);
      promises.push(promise);
    }
    let all = this.$q.all(promises);
    return all.then(dates => {
      let result = new Map();
      for (let i in artifactsArray) {
        let key = this._formatkey(artifactsArray[i].name, artifactsArray[i].version);
        result.set(key, dates[i]);
      }
      return result;
    });
  }

  _formatkey(name, version) {
    return `${name}\/${version}`;
  }

  /**
   * Inject the dates in the artifacts.
   */
  _injectDates(data, artifacts) {
    for (let name of Object.keys(artifacts)) {
      for (let state of ['available', 'downloaded', 'installed']) {
        let artifact = artifacts[name][state];
        if (artifact) {
          let key = this._formatkey(name, artifact.version);
          artifact.date = data.get(key);
        }
      }
    }
    return artifacts;
  }

  getArtifactDisplayName(artifact) {
    let entry = dictionary.artifacts[artifact];
    if (entry) {
      return entry.display;
    } else {
      return artifact;
    }
  }

  getArtifactDescription(artifact) {
    let entry = dictionary.artifacts[artifact];
    if (entry) {
      return entry.description;
    } else {
      return ;
    }
  }

  getArtifactReleaseNotesUrl(artifact) {
    let entry = dictionary.artifacts[artifact];
    if (entry) {
      return entry.releaseNotes;
    } else {
      return undefined;
    }
  }

  getArtifactProperties(artifactName, version) {
    let params = { artifactName: artifactName, version: version };
    return this.remoteImsAPI.artifactProperties(params).$promise;
  }

  getArtifactReleaseDate(artifactName, version) {
    let propertiesPromise = this.getArtifactProperties(artifactName, version);
    return propertiesPromise.then(props => this._gotArtifactProperties(artifactName, version, props))
                                  /* Eat all errors. */
                            .catch(error => this._artifactPropertiesError(artifactName, version, error));
  }

  _gotArtifactProperties(artifact, version, properties) {
    if (properties && properties['build-time']) {
      let result =  Date.parse(properties['build-time']);
      return result;
    } else {
      console.log(`WARNING no date for artifact ${artifact} ${version}`);
      return undefined;
    }
  }

  _artifactPropertiesError(artifact, version, error) {
    console.log(`Can't get properties for artifact ${artifact}, ${version}`, error);
    return undefined;
  }
}

// Register this factory
Register.getInstance().factory('imsArtifactApi', ImsArtifactApi);
