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
 * Defines a directive for displaying delete factory widget.
 * @author Oleksii Orel
 */
class DeleteFactory {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
    this.restrict = 'E';

    this.templateUrl = 'app/factories/factory-details/information-tab/delete-factory/delete-factory.html';
    this.replace = false;
    this.controller = function ($scope, $location, $mdDialog, codenvyAPI, codenvyNotification) {
      //Perform factory deletion.
      $scope.deleteFactory = function (event) {
        let confirm = $mdDialog.confirm()
          .title('Would you like to delete the factory ' + $scope.factory.originFactory.project.name + '?')
          .content('Please confirm for the factory removal.')
          .ariaLabel('Remove factory')
          .ok('Delete it!')
          .cancel('Cancel')
          .clickOutsideToClose(true)
          .targetEvent(event);
        $mdDialog.show(confirm).then(() => {
          // remove it !
          let promise = codenvyAPI.getFactory().deleteFactoryById($scope.factory.originFactory.id);
          promise.then(() => {
            $location.path('/factories');
          }, (error) => {
            codenvyNotification.showError(error.data.message ? error.data.message : 'Delete failed.');
            console.log('error', error);
          });
        });
      }
    };

    // scope values
    this.scope = {
      factory: '=cdvyFactory'
    };
  }

}

export default DeleteFactory;
