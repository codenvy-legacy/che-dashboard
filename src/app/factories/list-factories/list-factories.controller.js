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
  constructor(codenvyAPI, codenvyNotification) {

    this.dropDownOptionsList = [
      {
        name: 'Sort by views number', orderBy: 'views'
      }, {
        name: 'Sort by creation date', orderBy: 'originFactory.creator.created'
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

    this.loading = true;

    let codenvyFactory = codenvyAPI.getFactory();

    this.factories = codenvyFactory.getFactories();

    // fetch factories when initializing
    let promise = codenvyFactory.fetchFactories();

    promise.then(() => {
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        if (error.status !== 304) {
          codenvyNotification.showError(error.data.message ? error.data.message : 'Update information failed.');
          console.log('error', error);
        }
      });
  }

  /**
   * Callback called when the dropdown is called
   * @param selected the selected element
   */
  dropDownSelected(selected) {
    if (selected.orderBy) {
      this.factoriesOrderBy = this.factoriesOrderBy === selected.orderBy ? "-" + selected.orderBy : selected.orderBy;
    }
  }

}

export default ListFactoriesCtrl;

