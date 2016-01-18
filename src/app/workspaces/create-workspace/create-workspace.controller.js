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
  constructor(codenvyAPI, $q, $location, $rootScope, codenvyNotification) {
    this.codenvyAPI = codenvyAPI;
    this.codenvyNotification = codenvyNotification;
    this.$q = $q;
    this.$location = $location;
    this.workspace = {};

    this.workspace.ram = 1000;

    this.recipe = null;
    this.recipes = [];

    this.selectSourceOption = 'select-source-recipe';

    this.editorOptions = {
      lineWrapping : true,
      lineNumbers: false,
      matchBrackets: true,
      mode: 'application/json'
    };

    this.workspaceConfig = '';
    this.generateWorspaceName();

    let promise = codenvyAPI.getRecipe().fetchRecipes();
    promise.then(() => {
      this.updateData();
    });

    $rootScope.$broadcast('navbar-selected:clear');
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

    if (this.selectSourceOption === 'select-source-recipe') {
      let recipeUrl = this.recipe.links[0].href;
      let creationPromise = this.codenvyAPI.getWorkspace().createWorkspace(null, this.workspace.name, recipeUrl, this.workspace.ram);
      creationPromise.then((workspaceData) => {
        this.$location.path('/workspace/' + workspaceData.id);
      }, (error) => {
        let errorMessage = error.data.message ? error.data.message : 'Error during workspace creation.';
        this.codenvyNotification.showError(errorMessage);
        this.$location.path('/workspaces');
      });
    } else {
      //this.workspaceConfig.name = this.workspace.name;
      let creationPromise = this.codenvyAPI.getWorkspace().createWorkspaceFromConfig(null, this.workspaceConfig);
      creationPromise.then((workspaceData) => {
        this.$location.path('/workspace/' + workspaceData.id);
      }, (error) => {
        let errorMessage = error.data.message ? error.data.message : 'Error during workspace creation.';
        this.codenvyNotification.showError(errorMessage);
        this.$location.path('/workspaces');
      });
    }
  }
}

export default CreateWorkspaceCtrl;
