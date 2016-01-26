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
 * @ngdoc directive
 * @name workspaces.details.directive:workspaceResourcesProjects
 * @restrict E
 * @element
 *
 * @description
 * <workspace-details-resources></workspace-details-resources>` for displaying workspace resources entry.
 *
 * @usage
 *   <workspace-details-resources></workspace-details-resources>
 *
 * @author Ann Shumilova
 */
export class WorkspaceDetailsResources {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict = 'E';
    this.templateUrl = 'app/workspaces/workspace-details/resources/workspace-details-resources.html';

    this.controller = 'WorkspaceDetailsResourcesCtrl';
    this.controllerAs = 'workspaceDetailsResourcesCtrl';
    this.bindToController = true;
  }

}
