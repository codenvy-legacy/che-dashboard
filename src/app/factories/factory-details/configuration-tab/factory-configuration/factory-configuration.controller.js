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

/**
 * Controller for a factory configuration.
 * @author Oleksii Orel
 */
export class FactoryConfigurationCtrl {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor($route, $scope, $filter, codenvyAPI, cheNotification) {
    this.$filter = $filter;
    this.codenvyAPI = codenvyAPI;
    this.cheNotification = cheNotification;

    this.factoryId = $route.current.params.id;

    var ctrl = this;

    $scope.$watch('factoryConfigurationCtrl.factory.originFactory', function (newOriginFactory) {
      if (!newOriginFactory) {
        return;
      }
      ctrl.updateFactoryContent(newOriginFactory);
    });
  }

  //Update the factory content from origin factory.
  updateFactoryContent(originFactory) {
    let copyOriginFactory = angular.copy(originFactory);

    if (copyOriginFactory.links) {
      // remove links for display (links are automatically generated so no need to display them)
      delete copyOriginFactory.links;
    }
    this.originFactoryContent = copyOriginFactory;
    this.factoryContent = this.$filter('json')(this.originFactoryContent, 2);
  }

  //Update the factory information by factory Id.
  updateFactory(factoryId) {
    let promise = this.codenvyAPI.getFactory().fetchFactory(factoryId);

    promise.then((factory) => {
      if (factory.originFactory) {
        this.updateFactoryContent(factory.originFactory);
      }
      this.factory = factory;
      this.cheNotification.showInfo('Factory information successfully updated.');
    }, (error) => {
      this.cheNotification.showError(error.data.message ? error.data.message : 'Update factory failed.');
      console.log('error', error);
    });
  }

  //Set factory content by factory Id.
  setFactoryContent(factoryId, factoryContent) {
    let promise = this.codenvyAPI.getFactory().setFactoryContent(factoryId, factoryContent);

    promise.then((factory) => {
      this.factory = factory;
      this.cheNotification.showInfo('Factory information successfully updated.');
    }, (error) => {
      this.factoryContent = this.$filter('json')(this.originFactoryContent, 2);
      this.cheNotification.showError(error.data.message ? error.data.message : 'Update factory failed.');
      console.log('error', error);
    });
  }

}
