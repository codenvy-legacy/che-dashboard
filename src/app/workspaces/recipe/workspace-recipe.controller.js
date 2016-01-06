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

import {defaultRecipeScript} from '../recipe/workspace-recipe-data';

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
  constructor() {
    this.recipeUrl = null;
    this.recipeScript = null;

    //set default selection
    this.selectSourceOption = 'upload-custom-stack';

    this.editorOptions = {
      lineWrapping : true,
      lineNumbers: true,
      matchBrackets: true,
      mode: 'text/x-dockerfile'
    };

  }

  updateDefaultScript(){
    this.recipeUrl = null;
    this.recipeScript = angular.copy(defaultRecipeScript);
  }
}

export default WorkspaceRecipeCtrl;
