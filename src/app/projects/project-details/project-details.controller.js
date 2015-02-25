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
 * Constroller for a project details
 * @author Florent Benoit
 */
class ProjectDetailsCtrl {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor ($route, codenvyAPI) {

    this.askedWorkspaceId = $route.current.params.workspaceId;
    this.askedProjectName = $route.current.params.projectName;
  }
}

export default ProjectDetailsCtrl;

