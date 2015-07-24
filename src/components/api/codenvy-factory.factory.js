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
    this.remoteFactoryAPI = this.$resource('/api/factory/:factoryId', {factoryId: '@id'});

  }


  /**
   * Gets the factories of the current user
   * @returns {Array}
   */
  getFactories() {
    return this.factories;
  }


  fetchFactory(factoryId) {
    let findFactory = this.factoriesById.get(factoryId);
    if (findFactory) {
      return findFactory;
    }
    // need to fetch
    return this.remoteFactoryAPI.get({factoryId: factoryId});
  }


  getFactoryById(factoryId) {
    return this.factoriesById.get(factoryId);
  }

  /**
   * Helper method that extract the factory ID from a factory URL
   * @param factoryURL the factory URL to analyze
   * @returns the stringified ID of a factory
   */
  getIDFromFactoryAPIURL(factoryURL) {
    var index = factoryURL.lastIndexOf('/factory/');
    if(index > 0){
      return factoryURL.slice(index + '/factory/'.length , factoryURL.length);
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

        // first, reset the list of factories
        this.factories.length = 0;
        this.factoriesById.clear();

        // Gets factory resource based on the factory ID
        remoteFactories.forEach((factory, index) => {
          // gets the factory id
          var factoryURL = factory.href.trim();
          let factoryId = this.getIDFromFactoryAPIURL(factoryURL);

          // there is a factory ID, so we can ask the factory details
          if(factoryId){
            let tmpFactory = this.fetchFactory(factoryId);
            let tmpFactoryPromise = tmpFactory.$promise;
            tmpFactoryPromise.then(() => {
              let seeLink = this.lodash.find(tmpFactory.links, function (link) {
                if (link.rel === 'create-project') return link;
              });
              tmpFactory.seeURL = seeLink ? seeLink.href : '';
              tmpFactory.views = 0;
              let factoryUsedPromise = this.codenvyAnalytics.getFactoryUsedFromUrl(factoryURL);
              factoryUsedPromise.then((factoryUsed) => {
                tmpFactory.views += parseInt(factoryUsed.value);
                if (remoteFactories.length - index === 1) { //if last
                  deferred.resolve();
                }
              }, (error) => {
                deferred.reject(error);
              });
              this.factories.push(tmpFactory);
              this.factoriesById.set(factoryId, tmpFactory);
            }, (error) => {
              deferred.reject(error);
            });
          } else {
            if (remoteFactories.length - index === 1) { //if last
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
