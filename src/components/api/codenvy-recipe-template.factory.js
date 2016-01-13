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

import Register from '../utils/register.js';

/**
 * This class is handling the recipe template retrieval
 * @author Oleksii Orel
 */
class CodenvyRecipeTemplate {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($resource) {
    // keep resource
    this.$resource = $resource;

    this.defaultRecipe = null;

    // remote call
    this.remoteRecipeTemplateAPI = this.$resource('https://dockerfiles.codenvycorp.com/templates-4.0/recipe/:fileName');
  }


  /**
   * Gets default recipe template
   * @returns default recipe
   */
  getDefaultRecipe() {
    return this.defaultRecipe;
  }

  /**
   * Ask for loading the recipe default template in asynchronous way
   * @returns {*} the promise
   */
  fetchDefaultRecipe() {
    let promise = this.remoteRecipeTemplateAPI.get({fileName: 'defaultRecipe.json'}).$promise;

    promise.then((defaultRecipe) => {
      this.defaultRecipe = defaultRecipe;
    });

    return promise;
  }

}

// Register this factory
Register.getInstance().factory('codenvyRecipeTemplate', CodenvyRecipeTemplate);
