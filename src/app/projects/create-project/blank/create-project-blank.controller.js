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
 * This class is handling the controller for the createblank projects
 * @author Florent Benoit
 */
class CreateProjectBlankCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor(codenvyAPI, $rootScope) {
    this.codenvyAPI = codenvyAPI;
    this.$rootScope = $rootScope;

    this.typesByCategory = [];
    this.typesByCategory.push('java');

    // broadcast event
    this.$rootScope.$broadcast('create-project-blank:initialized');

    this.recipes = [];

    this.selectStackOption = 'select-default-stack';

    let promise = codenvyAPI.getRecipe().fetchRecipes();
    promise.then(() => {
          this.updateData();
        },
        (error) => {
          // etag handling so also retrieve last data that were fetched before
          if (error.status === 304) {
            // ok
            this.updateData();
          }
        });

  }

  updateData() {
    this.recipes.length = 0;

    var remoteRecipes = this.codenvyAPI.getRecipe().getRecipes();
    // init WS bus
    remoteRecipes.forEach((recipe) => {
      this.recipes.push(recipe);
    });

    this.initDefaultRecipe();
  }


  selectRecipe(recipe, controller) {
    // first link of recipe is the recipe URL
    controller.recipeUrl = recipe.links[0].href;
  }


  initCallbackController(controller) {
    this.callbackController = controller;
    this.initDefaultRecipe();
  }

  /**
   * Init default recipe only if controller is here and if recipes have been analyzed
   */
  initDefaultRecipe() {
    if (!this.callbackController) {
      return;
    }
    if (this.recipes.length > 0) {
      // init recipe URL with first recipe
      this.callbackController.recipeUrl = this.recipes[0].links[0].href;
    }

  }

}

export default CreateProjectBlankCtrl;
