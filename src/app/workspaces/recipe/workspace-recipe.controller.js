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
 * @name workspaces.recipe.controller:WorkspacesRecipeCtrl
 * @description This class is handling the controller for the workspace recipe widget
 * @author Oleksii Orel
 */
class WorkspaceRecipeCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor(codenvyAPI) {
    this.recipeUrl = null;

    //set default selection
    this.selectSourceOption = 'upload-custom-stack';

    let defaultRecipe = codenvyAPI.getRecipeTemplate().getDefaultRecipe();

    if (defaultRecipe !== null) {
      this.defaultRecipeScript = defaultRecipe.script;
    } else {
      codenvyAPI.getRecipeTemplate().fetchDefaultRecipe().then((defaultRecipe) => {
        this.defaultRecipeScript = defaultRecipe.script;
      });
    }

    this.editorOptions = {
      lineWrapping: true,
      lineNumbers: true,
      matchBrackets: true,
      mode: 'text/x-dockerfile'
    };

  }

  setRecipeScript(recipeScript) {
    this.recipeUrl = null;
    this.recipeScript = angular.copy(recipeScript);
  }
}

export default WorkspaceRecipeCtrl;
