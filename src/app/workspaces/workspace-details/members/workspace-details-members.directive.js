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
 * @ngdoc directive
 * @name workspaces.details.directive:workspaceDetailsMembers
 * @restrict E
 * @element
 *
 * @description
 * <workspace-details-members></workspace-details-members> for displaying workspace members entry.
 *
 * @usage
 *   <workspace-details-members></workspace-details-members>
 *
 * @author Ann Shumilova
 */
class WorkspaceDetailsMembers {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict = 'E';
    this.templateUrl = 'app/workspaces/workspace-details/members/workspace-details-members.html';
  }

}

export default WorkspaceDetailsMembers;

