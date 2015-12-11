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
 * @ngdoc controller
 * @name workspaces.create.workspace.controller:CreateWorkspaceCtrl
 * @description This class is handling the controller for workspace creation
 * @author Ann Shumilova
 */
class CreateWorkspaceCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor (codenvyAPI, $q, $location, codenvyNotification) {
    this.codenvyAPI = codenvyAPI;
    this.codenvyNotification = codenvyNotification;
    this.$q = $q;
    this.$location = $location;
    this.workspace = {};

    this.workspace.ram = 1000;

    this.recipe = null;
    this.recipes = [];


    this.generateWorspaceName();

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

    this.recipe = this.recipes[0];

  }

  selectRecipe(userRecipe) {
    this.recipe = userRecipe;
  }



  generateWorspaceName() {
    // starts with workspace
    var name = 'workspace';
    name = name + '-' + (('0000' + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)); // jshint ignore:line

    this.workspace.name = name;

  }


  createWorkspace() {

    let recipeUrl = this.recipe.links[0].href;
    let creationPromise = this.codenvyAPI.getWorkspace().createWorkspace(null, this.workspace.name, recipeUrl, this.workspace.ram);
    creationPromise.then(() => {
      this.$location.path('/workspaces');
    }, (error) => {
      let errorMessage = error.data.message ? error.data.message : 'Error during workspace creation.';
      this.codenvyNotification.showError(errorMessage);
      this.$location.path('/workspaces');
    });
  }
}

export default CreateWorkspaceCtrl;
