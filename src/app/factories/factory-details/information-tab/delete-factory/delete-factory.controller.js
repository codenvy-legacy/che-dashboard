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
 * Controller for delete a factory.
 * @author Oleksii Orel
 */
export class DeleteFactoryCtrl {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor($mdDialog, $location, codenvyAPI, cheNotification) {
    this.$mdDialog = $mdDialog;
    this.$location = $location;
    this.codenvyAPI = codenvyAPI;
    this.cheNotification = cheNotification;

  }

//Perform factory deletion.
  deleteFactory(event) {
    let confirm = this.$mdDialog.confirm()
      .title('Would you like to delete the factory ' + (this.factory.originFactory.name ? '"' + this.factory.originFactory.name + '"' : this.factory.originFactory.id + '?'))
      .content('Please confirm for the factory removal.')
      .ariaLabel('Remove factory')
      .ok('Delete it!')
      .cancel('Cancel')
      .clickOutsideToClose(true)
      .targetEvent(event);
    this.$mdDialog.show(confirm).then(() => {
      // remove it !
      let promise = this.codenvyAPI.getFactory().deleteFactoryById(this.factory.originFactory.id);
      promise.then(() => {
        this.$location.path('/factories');
      }, (error) => {
        this.cheNotification.showError(error.data.message ? error.data.message : 'Delete failed.');
        console.log('error', error);
      });
    });
  }

}
