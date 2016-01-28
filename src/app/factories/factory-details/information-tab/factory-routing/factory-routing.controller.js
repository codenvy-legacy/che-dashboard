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
 * Controller for a factory routing.
 * @author Oleksii Orel
 */
export class FactoryRoutingCtrl {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor($scope, codenvyAPI, cheNotification) {
    this.$scope = $scope;
    this.codenvyAPI = codenvyAPI;
    this.cheNotification = cheNotification;

    //set default value for factory workspace.
    $scope.$watch('factoryRoutingCtrl.factory.originFactory.workspace', function (newWorkspace) {
      $scope.workspace = {
        type: newWorkspace && newWorkspace.type ? newWorkspace.type : 'named',
        location: newWorkspace && newWorkspace.location ? newWorkspace.location : 'acceptor'
      };
    });
  }

  //Set factory workspace.
  setFactoryWorkspace(factoryWorkspace) {
    let factory = angular.copy(this.factory.originFactory);

    factory.workspace = factoryWorkspace;

    let promise = this.codenvyAPI.getFactory().setFactory(factory);

    promise.then(() => {
      this.factory.workspace = angular.copy(factoryWorkspace);
      this.cheNotification.showInfo('Factory workspace information successfully updated.');
    }, (error) => {
      factoryWorkspace = this.factory.originFactory.workspace;
      this.cheNotification.showError(error.data.message ? error.data.message : 'Update factory failed.');
      console.log('error', error);
    });
  }

}
