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
 * @name workspaces.list.controller:WorkspaceItemCtrl
 * @description This class is handling the controller for item of workspace list
 * @author Ann Shumilova
 */
class WorkspaceItemCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($location) {
    this.$location = $location;
  }

  redirectToWorkspaceDetails() {
    this.$location.path('/workspace/' + this.workspace.id);
  }

}

export default WorkspaceItemCtrl;
