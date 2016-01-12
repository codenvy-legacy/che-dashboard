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
 * This class is handling the controller for the popup of creating projects
 * @author Florent Benoit
 */
class CreateProjectPopupCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor(createProjectSvc) {
    this.createProjectSvc = createProjectSvc;
  }

  getCreationSteps() {
    return this.createProjectSvc.getProjectCreationSteps();
  }

  getCurrentProgressStep() {
    return this.createProjectSvc.getCurrentProgressStep();
  }

  isShowPopup() {
    return this.createProjectSvc.isShowPopup();
  }

  hidePopup() {
    this.createProjectSvc.hidePopup();
  }


  isCreateProjectInProgress() {
    return this.createProjectSvc.isCreateProjectInProgress();
  }

  getWorkspaceOfProject() {
    return this.createProjectSvc.getWorkspaceOfProject();
  }

  getProject() {
      return this.createProjectSvc.getProject();
  }
}


export default CreateProjectPopupCtrl;
