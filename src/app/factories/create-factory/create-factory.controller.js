/*
 * Copyright (c) 2012-2016 Codenvy, S.A.
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
 * Controller for a create factory.
 * @author Oleksii Orel
 */
class CreateFactoryCtrl {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor($location, codenvyAPI, codenvyNotification) {
    this.$location = $location;
    this.codenvyAPI = codenvyAPI;
    this.codenvyNotification = codenvyNotification;

    this.isLoading = false;
    this.isImporting = false;

    this.factoryContent = null;
  }


  /**
   * Create a new factory by factory content
   * @param factoryContent
   */
  createFactoryByContent(factoryContent) {
    if (!factoryContent) {
      return;
    }
    this.isImporting = true;

    let promise = this.codenvyAPI.getFactory().createFactoryByContent(factoryContent);

    promise.then((factory) => {
      this.isImporting = false;
      this.codenvyNotification.showInfo('Factory successfully created.');
      this.$location.path('/factory/' + factory.id);
    }, (error) => {
      this.isImporting = false;
      this.codenvyNotification.showError(error.data.message ? error.data.message : 'Create factory failed.');
      console.log('error', error);
    });
  }

}

export default CreateFactoryCtrl;

