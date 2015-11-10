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

import Register from '../utils/register.js';

/**
 * This class is handling the recipes retrieval
 * It sets to the array of recipes
 * @author Florent Benoit
 */
class CodenvyRecipe {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor ($resource) {

    // keep resource
    this.$resource = $resource;

    // recipes per id
    this.recipesByid = {};

    // recipes
    this.recipes = [];

    // remote call
    this.remoteRecipesAPI = this.$resource('/api/recipe');
  }


  /**
   * Fetch the recipes
   */
  fetchRecipes() {

    let promise = this.remoteRecipesAPI.query().$promise;
    let updatedPromise = promise.then((recipes) => {


      // reset global list
      this.recipes.length = 0;
      for (var member in this.recipesByid) {
        delete this.recipesByid[member];
      }

      recipes.forEach((recipe) => {

        // get attributes
        var recipeId = recipe.id;

        // add element on the list
        this.recipesByid[recipeId] = recipe;
        this.recipes.push(recipe);
      });



    });
    return updatedPromise;
  }

  /**
   * Gets all recipes
   * @returns {Array}
   */
  getRecipes() {
    return this.recipes;
  }

  /**
   * The recipes per id
   * @returns {*}
   */
  getRecipeById(id) {
    return this.recipesByid[id];
  }


}

// Register this factory
Register.getInstance().factory('codenvyRecipe', CodenvyRecipe);
