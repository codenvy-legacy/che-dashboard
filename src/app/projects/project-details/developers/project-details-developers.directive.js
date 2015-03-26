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
 * @name projects.details.directive:projectDetailsDevelopers
 * @restrict E
 * @element
 *
 * @description
 * <project-details-developers></project-details-developers>` for displaying project developers entry.
 *
 * @usage
 *   <project-details-developers></project-details-developers>
 *
 * @author Florent Benoit
 */
class ProjectDetailsDevelopers {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.templateUrl = 'app/projects/project-details/developers/project-details-developers.html';

    this.controller = 'ProjectDetailsDevelopersCtrl';
    this.controllerAs = 'projectDetailsDevelopersCtrl';
    this.bindToController = true;

  }

}

export default ProjectDetailsDevelopers;

