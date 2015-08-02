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

/**
 * Controller for a factory configuration.
 * @author Oleksii Orel
 */
class FactoryConfigurationCtrl {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor($route, $scope, $filter, codenvyAPI, codenvyNotification) {
    this.$scope = $scope;
    this.codenvyAPI = codenvyAPI;
    this.codenvyNotification = codenvyNotification;

    $scope.factoryId = $route.current.params.id;

    $scope.$watch('factoryConfigurationCtrl.factory.originFactory', function (newOriginFactory) {
      if (!newOriginFactory) {
        return;
      }

      let originFactory = angular.copy(newOriginFactory);

      if (originFactory.links) {
        // remove links for display (links are automatically generated so no need to display them)
        delete originFactory.links;
      }
      $scope.factoryContent = $filter('json')(originFactory, 2);
    });
  }

  //Update the factory information by factory Id.
  updateFactory(factoryId) {
    let promise = this.codenvyAPI.getFactory().fetchFactory(factoryId);

    promise.then((factory) => {
      this.factory = factory;
      this.codenvyNotification.showInfo('Factory information successfully updated.');
    }, (error) => {
      this.codenvyNotification.showError(error.data.message ? error.data.message : 'Update factory failed.');
      console.log('error', error);
    });
  }

  //Set factory content by factory Id.
  setFactoryContent(factoryId, factoryContent) {
    let promise = this.codenvyAPI.getFactory().setFactoryContent(factoryId, factoryContent);

    promise.then((factory) => {
      this.factory = factory;
      this.codenvyNotification.showInfo('Factory information successfully updated.');
    }, (error) => {
      this.codenvyNotification.showError(error.data.message ? error.data.message : 'Update factory failed.');
      console.log('error', error);
    });
  }

}

export default FactoryConfigurationCtrl;
