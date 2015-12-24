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

/* global FormData */

import Register from '../utils/register.js';

/**
 * This class is handling the factory retrieval
 * @author Florent Benoit
 */
class CodenvyFactory {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($resource, $q, codenvyUser, lodash, codenvyAnalytics) {
    // keep resource
    this.$resource = $resource;
    this.$q = $q;

    this.codenvyUser = codenvyUser;
    this.lodash = lodash;
    this.codenvyAnalytics = codenvyAnalytics;

    this.factories = [];
    this.factoriesById = new Map();
    this.factoryContentsByWorkspaceId = new Map();

    // remote calls
    this.remoteFactoryFindAPI = this.$resource('/api/factory/find');
    this.remoteFactoryAPI = this.$resource('/api/factory/:factoryId', {factoryId: '@id'}, {
      put: {method: 'PUT', url: '/api/factory/:factoryId'},
      getFactoryContentFromWorkspace: {method: 'GET', url: '/api/factory/workspace/:workspaceId'},
      createFactoryByContent: {
        method: 'POST',
        url: '/api/factory',
        isArray: false,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
      }
    });

  }

  /**
   * Gets the factory service path.
   * @returns {string}
   */
  getFactoryServicePath() {
    return 'factory';
  }

  /**
   * Ask for loading the factory content in asynchronous way
   * If there are no changes, it's not updated
   * @param workspace
   * @returns {*|promise|n|N}
   */
  fetchFactoryContentFromWorkspace(workspace) {
    var deferred = this.$q.defer();

    let factoryContent = this.factoryContentsByWorkspaceId.get(workspace.id);
    if (factoryContent) {
      deferred.resolve(factoryContent);
    }

    let promise = this.remoteFactoryAPI.getFactoryContentFromWorkspace({
      workspaceId: workspace.id
    }).$promise;

    promise.then((factoryContent) => {
      //update factoryContents map
      this.factoryContentsByWorkspaceId.set(workspace.id, factoryContent);
      deferred.resolve(factoryContent);
    }, (error) => {
      if (error.status === 304) {
        let findFactoryContent = this.factoryContentsByWorkspaceId.get(workspace.id);
        deferred.resolve(findFactoryContent);
      } else {
        deferred.reject(error);
      }
    });

    return deferred.promise;
  }

  /**
   * Get factory from project
   * @param workspace
   * @return the factory content
   * @returns factoryContent
   */
  getFactoryContentFromWorkspace(workspace) {
    return this.factoryContentsByWorkspaceId.get(workspace.workspaceId);
  }

  /**
   * Create factory by content
   * @param factoryContent  the factory content
   * @returns {*|promise|n|N}
   */
  createFactoryByContent(factoryContent) {

    var formDataObject = new FormData();
    formDataObject.append('factory', factoryContent);

    return this.remoteFactoryAPI.createFactoryByContent({}, formDataObject).$promise;
  }

  /**
   * Gets the factories of the current user
   * @returns {Array}
   */
  getFactories() {
    return this.factories;
  }

  /**
   * Gets the factories of the current user
   * @returns {Map}
   */
  getFactoriesMap() {
    return this.factoriesById;
  }

  /**
   * Ask for loading the factory in asynchronous way
   * If there are no changes, it's not updated
   * @param factoryId the factory ID
   * @returns {*|promise|n|N}
   */
  fetchFactory(factoryId) {
    var deferred = this.$q.defer();

    let promise = this.remoteFactoryAPI.get({factoryId: factoryId}).$promise;
    promise.then((tmpFactory) => {
      if (!tmpFactory) {
        deferred.resolve(tmpFactory);
        return;
      }

      let seeLink = this.lodash.find(tmpFactory.links, function (link) {
        if (link.rel === 'create-project') {
          return link;
        }
      });

      //set default fields
      if (!tmpFactory.name) {
        tmpFactory.name = '';
      }

      let findFactory = this.factoriesById.get(factoryId);
      let factory = {
        originFactory: tmpFactory,
        seeURL: seeLink ? seeLink.href : '',
        views: findFactory && findFactory.views ? findFactory.views : 0
      };

      //update factories map
      this.factoriesById.set(factoryId, factory);
      //update factories array
      this.factories.length = 0;
      this.factoriesById.forEach((value) => {
        this.factories.push(value);
      });

      let viewsPromise = this.codenvyAnalytics.getFactoryUsedFromId(tmpFactory.id);

      viewsPromise.then((factoryUsed) => {
        factory.views = parseInt(factoryUsed.value);
        deferred.resolve(factory);
      }, (error) => {
        if (error.status === 304) {
          deferred.resolve(factory);
        } else {
          deferred.reject(error);
        }
      });
    }, (error) => {
      if (error.status === 304) {
        let findFactory = this.factoriesById.get(factoryId);
        if (findFactory) {
          let viewsPromise = this.codenvyAnalytics.getFactoryUsedFromId(factoryId);
          viewsPromise.then((factoryUsed) => {
            findFactory.views = parseInt(factoryUsed.value);
          });
        }
        deferred.resolve(findFactory);
      } else {
        deferred.reject(error);
      }
    });
    return deferred.promise;
  }

  /**
   * Get the factory from factoryMap by factoryId
   * @param factoryId the factory ID
   * @returns factory
   */
  getFactoryById(factoryId) {
    return this.factoriesById.get(factoryId);
  }

  /**
   * Set the factory
   * @param originFactory
   * @returns {*|promise|n|N}
   */
  setFactory(originFactory) {
    var deferred = this.$q.defer();

    let promise = this.remoteFactoryAPI.put({factoryId: originFactory.id}, originFactory).$promise;

    // check if was OK or not
    promise.then(() => {
      let factory = this.factoriesById.get(originFactory.id);
      if (factory) {
        factory.originFactory = originFactory;

        //update factories map
        this.factoriesById.set(originFactory.id, factory);//set factory
        //update factories array
        this.factories.length = 0;
        this.factoriesById.forEach((value)=> {
          this.factories.push(value);
        });

      } else {
        this.fetchFactory(originFactory.id);
      }
      deferred.resolve();
    }, (error) => {
      deferred.reject(error);
    });
    return deferred.promise;
  }

  /**
   * Set the factory content by factoryId
   * @param factoryId  the factory ID
   * @param factoryContent  the factory content
   * @returns {*|promise|n|N}
   */
  setFactoryContent(factoryId, factoryContent) {
    var deferred = this.$q.defer();

    let promise = this.remoteFactoryAPI.put({factoryId: factoryId}, factoryContent).$promise;

    // check if was OK or not
    promise.then(() => {

      let fetchFactoryPromise = this.fetchFactory(factoryId);

      fetchFactoryPromise.then((factory) => {
        deferred.resolve(factory);
      }, (error) => {
        deferred.reject(error);
      });
    }, (error) => {
      deferred.reject(error);
    });
    return deferred.promise;
  }

  /**
   * Performs factory deleting by the given factoryId.
   * @param factoryId the factory ID
   * @returns {*|promise|n|N}
   */
  deleteFactoryById(factoryId) {
    var deferred = this.$q.defer();

    let promise = this.remoteFactoryAPI.delete({factoryId: factoryId}).$promise;

    // check if was OK or not
    promise.then(() => {

      //update factories map
      this.factoriesById.delete(factoryId);//remove factory
      //update factories array
      this.factories.length = 0;
      this.factoriesById.forEach((value)=> {
        this.factories.push(value);
      });

      deferred.resolve();
    }, (error) => {
      deferred.reject(error);
    });
    return deferred.promise;
  }

  /**
   * Helper method that extract the factory ID from a factory URL
   * @param factoryURL the factory URL to analyze
   * @returns the stringified ID of a factory
   */
  getIDFromFactoryAPIURL(factoryURL) {
    let index = factoryURL.lastIndexOf('/factory/');
    if (index > 0) {
      return factoryURL.slice(index + '/factory/'.length, factoryURL.length);
    }
  }

  /**
   * Ask for loading the factories in asynchronous way
   * If there are no changes, it's not updated
   */
  fetchFactories(maxItems, skipCount) {
    var promises = [];

    // get the Codenvy user.
    var user = this.codenvyUser.getUser();

    // when user is there, we can perform the request
    user.$promise.then(() => {

      // use of the user ID
      var userId = user.id;

      // find the factories
      let factoriesPromise = this.remoteFactoryFindAPI.query(
        {'creator.userId': userId, 'maxItems': maxItems, 'skipCount': skipCount}).$promise;

      // when find is there we can ask for each factory
      factoriesPromise.then((remoteFactories) => {
        if (remoteFactories.length === 0) {//when we have no factories
          this.factoriesById.clear();
        }

        // Gets factory resource based on the factory ID
        remoteFactories.forEach((factory) => {
          // there is a factory ID, so we can ask the factory details
          if (factory.id) {
            let tmpFactoryPromise = this.fetchFactory(factory.id);
            promises.push(tmpFactoryPromise);
          }
        });
      });
    });
    return this.$q.all(promises);
  }

}

// Register this factory
Register.getInstance().factory('codenvyFactory', CodenvyFactory);
