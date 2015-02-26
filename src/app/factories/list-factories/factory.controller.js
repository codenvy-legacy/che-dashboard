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
 * Constroller for a factory.
 * @author Florent Benoit
 */
class FactoryCtrl {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor ($scope, $route, $filter, codenvyAPI) {

    var codenvyFactory = codenvyAPI.getFactory();

    $scope.factoryId = $route.current.params.id;

    var factory = codenvyFactory.fetchFactory($scope.factoryId);
    console.log('ask for factory');
    factory.$promise.then(() => {
      console.log('factory retrieved');
      $scope.factory = factory;
      $scope.factoryContent = $filter('json')(factory, 2);
    }, () => {$scope.factory = null;});


  }
}

export default FactoryCtrl;

