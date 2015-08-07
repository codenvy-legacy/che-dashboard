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
 * Defines a directive for displaying factory from template widget.
 * @author Oleksii Orel
 */
class FactoryFromTemplate {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
    this.restrict = 'E';

    this.templateUrl = 'app/factories/create-factory/template-tab/factory-from-template.html';
    this.replace = false;
    this.controller = function ($scope, $filter, codenvyAPI, codenvyNotification) {
      //Perform factory deletion.
      $scope.getFactoryTemplate = function (templateName) {

        let factoryContent = codenvyAPI.getFactoryTemplate().getFactoryTemplate(templateName);

        if (factoryContent) {
          $scope.factoryContent = $filter('json')(factoryContent, 2);
          return;
        }

        $scope.isImporting = true;
        // fetch it !
        let promise = codenvyAPI.getFactoryTemplate().fetchFactoryTemplate(templateName);

        promise.then((factoryContent) => {
          $scope.isImporting = false;
          $scope.factoryContent = $filter('json')(factoryContent, 2);
        }, (error) => {
          $scope.isImporting = false;
          codenvyNotification.showError(error.data.message ? error.data.message : 'Fail to get factory template.');
          console.log('error', error);
        });

      }
    };

    // scope values
    this.scope = {
      factoryContent: '=cdvyFactoryContent',
      isImporting: '=cdvyIsImporting'
    };
  }

}

export default FactoryFromTemplate;
