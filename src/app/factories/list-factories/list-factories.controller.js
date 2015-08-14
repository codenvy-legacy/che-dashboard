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
 * Controller for the factories.
 * @author Florent Benoit
 * @author Oleksii Orel
 */
class ListFactoriesCtrl {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor($mdDialog, codenvyAPI, codenvyNotification) {
    this.$mdDialog = $mdDialog;
    this.codenvyAPI = codenvyAPI;
    this.codenvyNotification = codenvyNotification;

    this.dropDownOptionsList = [
      {
        name: 'Sort by views number', orderBy: 'views'
      }, {
        name: 'Sort by creation date', orderBy: 'originFactory.creator.created'
      }, {
        name: 'Delete all selected factories', deleteAll: 'true'
      }
    ];

    this.factoriesOrderBy = 'views';

    this.factoriesFilter = {
      originFactory: {
        project: {
          name: ''
        }
      }
    };

    this.factoriesSelectedStatus = {};

    this.isLoading = true;

    let codenvyFactory = codenvyAPI.getFactory();

    this.factories = codenvyFactory.getFactories();

    // fetch factories when initializing
    let promise = codenvyFactory.fetchFactories();

    promise.then(() => {
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        if (error.status !== 304) {
          codenvyNotification.showError(error.data.message ? error.data.message : 'Update information failed.');
          console.log('error', error);
        }
      });
  }

  /**
   * Delete all selected factories
   * @param event
   */
  deleteSelectedFactories(event) {
    let filtersFactorySelectedKeys = Object.keys(this.factoriesSelectedStatus);
    let deletedFactoriesId = [];
    if (filtersFactorySelectedKeys.length) {
      var ctrl = this;
      filtersFactorySelectedKeys.forEach(function (key) {
        if (ctrl.factoriesSelectedStatus[key] === true) {
          deletedFactoriesId.push(key);
        }
      });
      if (deletedFactoriesId.length) {
        let confirmTitle = 'Would you like to delete ';
        if (deletedFactoriesId.length > 1) {
          confirmTitle += 'these ' + deletedFactoriesId.length + ' factories?';
        } else {
          confirmTitle += 'this selected factory?';
        }
        let confirm = this.$mdDialog.confirm()
          .title(confirmTitle)
          .content('Please confirm for the removal.')
          .ariaLabel('Remove selected factories')
          .ok('Delete!')
          .cancel('Cancel')
          .clickOutsideToClose(true)
          .targetEvent(event);
        this.$mdDialog.show(confirm).then(() => {
          var queueLenth = deletedFactoriesId.length;
          var isError = false;
          deletedFactoriesId.forEach((factoryId) => {
            // remove it !
            let promise = this.codenvyAPI.getFactory().deleteFactoryById(factoryId);
            promise.then(() => {
              queueLenth--;
              if (!queueLenth) {
                if (isError) {
                  this.codenvyNotification.showError('Delete failed.');
                } else {
                  this.codenvyNotification.showInfo('Has been successfully removed.');
                }
              }
            }, (error) => {
              queueLenth--;
              if (!queueLenth) {
                this.codenvyNotification.showError('Delete failed.');
              }
              console.log('error', error);
            });
          });
        });
      } else {
        this.codenvyNotification.showError('No selected factories.');
      }
    } else {
      this.codenvyNotification.showError('No selected factories.');
    }
  }

  /**
   * Callback called when the dropdown is called
   * @param selected
   * @param event
   */
  dropDownSelected(selected, event) {
    if (selected.orderBy) {
      this.factoriesOrderBy = this.factoriesOrderBy === selected.orderBy ? '-' + selected.orderBy : selected.orderBy;
    } else if (selected.deleteAll) {
      this.deleteSelectedFactories(event);
    }
  }

}

export default ListFactoriesCtrl;

