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
 * @name projects.create.directive:createProjectBlank
 * @restrict E
 * @element
 *
 * @description
 * `<create-project-blank></create-project-blank>` for creating new projects from blank.
 *
 * @usage
 *   <create-project-blank class="projects-create-project-tab" layout="row" layout-wrap></create-project-blank>
 *
 * @author Florent Benoit
 */
class CreateProjectBlank {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.templateUrl = 'app/projects/create-project/blank/create-project-blank.html';

    this.controller = 'CreateProjectBlankCtrl';
    this.controllerAs = 'createProjectBlankCtrl';
    this.bindToController = true;

  }

}

export default CreateProjectBlank;

