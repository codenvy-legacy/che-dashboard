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

    // remote call
    this.remoteFactoryFindAPI = this.$resource('/api/factory/find');
    this.remoteFactoryAPI = this.$resource('/api/factory/:factoryId', {factoryId: '@id'}, {
      put: {method: 'PUT', url: '/api/factory/:factoryId'}
    });

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


  fetchFactory(factoryId) {
    var deferred = this.$q.defer();

    let promise = this.remoteFactoryAPI.get({factoryId: factoryId}).$promise;
    promise.then((tmpFactory) => {

      let seeLink = this.lodash.find(tmpFactory.links, function (link) {
        if (link.rel === 'create-project') return link;
      });

      let factory = {
        originFactory: tmpFactory,
        seeURL: seeLink ? seeLink.href : '',
        views: 0
      };

      //update factories map
      this.factoriesById.set(factoryId, factory);
      //update factories array
      this.factories.length = 0;
      this.factoriesById.forEach((value)=> {
        this.factories.push(value);
      });

      let viewsPromise = this.codenvyAnalytics.getFactoryUsedFromUrl(tmpFactory.id);

      viewsPromise.then((factoryUsed) => {
        factory.views += parseInt(factoryUsed.value);
        deferred.resolve(factory);
      }, (error) => {
        deferred.reject(error);
      });
    }, (error) => {
      if (error.status === 304) {
        let findFactory = this.factoriesById.get(factoryId);
        if (findFactory) {
          let viewsPromise = this.codenvyAnalytics.getFactoryUsedFromUrl(factoryId);
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


  getFactoryById(factoryId) {
    return this.factoriesById.get(factoryId);
  }

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
        this.fetchFactory(originFactory.id)
      }
      deferred.resolve();
    }, (error) => {
      deferred.reject(error);
    });
    return deferred.promise;
  }

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

  removeFactoryById(factoryId) {
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
  fetchFactories() {
    var deferred = this.$q.defer();
    // get the Codenvy user.
    var user = this.codenvyUser.getUser();

    // when user is there, we can perform the request
    user.$promise.then(() => {

      // use of the user ID
      var userId = user.id;

      // find the factories
      let promise = this.remoteFactoryFindAPI.query({'creator.userId': userId}).$promise;

      // when find is there we can ask for each factory
      promise.then((remoteFactories) => {
        let pos = remoteFactories.length;

        if (pos === 0) {//when we haven't factories
          this.factoriesById.clear();
          deferred.resolve();
        }

        // Gets factory resource based on the factory ID
        remoteFactories.forEach((factory) => {
          pos--;
          // gets the factory id
          var factoryURL = factory.href.trim();
          let factoryId = this.getIDFromFactoryAPIURL(factoryURL);

          // there is a factory ID, so we can ask the factory details
          if (factoryId) {
            let tmpFactoryPromise = this.fetchFactory(factoryId);
            tmpFactoryPromise.then(() => {
              if (pos === 0) { //if last
                deferred.resolve();
              }
            }, (error) => {
              deferred.reject(error);
            });
          } else {
            if (pos === 0) { //if last
              deferred.resolve();
            }
          }
        });
      }, (error) => {
        deferred.reject(error);
      });
    }, (error) => {
      deferred.reject(error);
    });
    return deferred.promise;
  }

}

// Register this factory
Register.getInstance().factory('codenvyFactory', CodenvyFactory);
