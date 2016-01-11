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


import ListWorkspacesCtrl from './list-workspaces/list-workspaces.controller';
import CodenvyWorkspaceItem from './list-workspaces/workspace-item/workspace-item.directive';
import CreateWorkspaceCtrl from './create-workspace/create-workspace.controller';
import CreateWorkspaceAddMemberCtrl from './create-workspace/create-workspace-add-member.controller';
import UsageChart from './list-workspaces/workspace-item/usage-chart.directive';
import WorkspaceItemCtrl from './list-workspaces/workspace-item/workspace-item.controller';
import WorkspaceDetailsCtrl from './workspace-details/workspace-details.controller';
import WorkspaceDetailsProjectsCtrl from './workspace-details/workspace-projects/workspace-details-projects.controller';
import WorkspaceDetailsProjects from './workspace-details/workspace-projects/workspace-details-projects.directive';
import WorkspaceDetailsResourcesCtrl from './workspace-details/resources/workspace-details-resources.controller';
import WorkspaceDetailsResources from './workspace-details/resources/workspace-details-resources.directive';
import WorkspaceRecipeCtrl from './recipe/workspace-recipe.controller';
import WorkspaceRecipe from './recipe/workspace-recipe.directive';
import CodenvyWorkspaceRamAllocationSliderCtrl from './workspace-ram-slider/cdvy-workspace-ram-allocation-slider.controller';
import CodenvyWorkspaceRamAllocationSlider from './workspace-ram-slider/cdvy-workspace-ram-allocation-slider.directive';


/**
 * @ngdoc controller
 * @name workspaces:WorkspacesConfig
 * @description This class is used for configuring all workspaces stuff.
 * @author Ann Shumilova
 */
class WorkspacesConfig {

  constructor(register) {
    register.controller('ListWorkspacesCtrl', ListWorkspacesCtrl);
    register.controller('CreateWorkspaceCtrl', CreateWorkspaceCtrl);
    register.controller('CreateWorkspaceAddMemberCtrl', CreateWorkspaceAddMemberCtrl);

    register.directive('cdvyWorkspaceItem', CodenvyWorkspaceItem);
    register.controller('WorkspaceItemCtrl', WorkspaceItemCtrl);
    register.directive('usageChart', UsageChart);

    register.controller('WorkspaceDetailsCtrl', WorkspaceDetailsCtrl);

    register.controller('WorkspaceDetailsProjectsCtrl', WorkspaceDetailsProjectsCtrl);
    register.directive('workspaceDetailsProjects', WorkspaceDetailsProjects);

    register.controller('WorkspaceDetailsResourcesCtrl', WorkspaceDetailsResourcesCtrl);
    register.directive('workspaceDetailsResources', WorkspaceDetailsResources);

    register.controller('WorkspaceRecipeCtrl', WorkspaceRecipeCtrl);
    register.directive('cdvyWorkspaceRecipe', WorkspaceRecipe);

    register.controller('CodenvyWorkspaceRamAllocationSliderCtrl', CodenvyWorkspaceRamAllocationSliderCtrl);
    register.directive('cdvyWorkspaceRamAllocationSlider', CodenvyWorkspaceRamAllocationSlider);

    // config routes
    register.app.config(function ($routeProvider) {
      $routeProvider.accessWhen('/workspaces', {
        templateUrl: 'app/workspaces/list-workspaces/list-workspaces.html',
        controller: 'ListWorkspacesCtrl',
        controllerAs: 'listWorkspacesCtrl'
      })
      .accessWhen('/workspace/:workspaceId', {
          templateUrl: 'app/workspaces/workspace-details/workspace-details.html',
          controller: 'WorkspaceDetailsCtrl',
          controllerAs: 'workspaceDetailsCtrl'
        })
      .accessWhen('/create-workspace', {
          templateUrl: 'app/workspaces/create-workspace/create-workspace.html',
          controller: 'CreateWorkspaceCtrl',
          controllerAs: 'createWorkspaceCtrl'
        });
    });
  }
}

export default WorkspacesConfig;
