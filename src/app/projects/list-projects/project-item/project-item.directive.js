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
 * Defines a directive for items in project list.
 * Expects in parent scope:
 * @param{string} workspaceId
 * @param{object} project
 */
class CodenvyProjectItem {

  /**
   * Default constructor.
   */
  constructor() {
    this.restrict = 'E';

    // scope values
    this.scope = {
      workspaceId: '=cdvyProjectItemWorkspaceId',
      project: '=cdvyProjectItemProject',
      profileCreationDate: '=cdvyProfileCreationDate'
    };

    this.templateUrl = 'app/projects/list-projects/project-item/project-item.html';
  }

  /**
   * Keep reference to the model controller
   */
  link($scope) {
    $scope.getProjectModificationDate = function (project) {
      if (project.modificationDate !== -1) {
        return project.modificationDate;
      } else if (project.creationDate !== -1) {
        return project.creationDate;
      }
      return $scope.profileCreationDate;
    };
  }
}

export default CodenvyProjectItem;
