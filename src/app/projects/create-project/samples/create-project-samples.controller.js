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
 * This class is handling the controller for the samples part
 * @author Florent Benoit
 */
class CreateProjectSamplesCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor(codenvyAPI) {
    this.codenvyAPI = codenvyAPI;

    // ask to load codenvy templates
    let promise = codenvyAPI.getProjectTemplate().fetchTemplates();

    // promise update
    promise.then(() => {
        this.updateData();
      },
      (error) => {
        if (error.status === 304) {
          // ok
          this.updateData();
          return;
        }
        this.state = 'error';
      });
  }

  /**
   * Defines the samples
   */
  updateData() {
    this.templatesByCategory = this.codenvyAPI.getProjectTemplate().getTemplatesByCategory();
    this.templates = this.codenvyAPI.getProjectTemplate().getAllProjectTemplates();
  }

  /**
   * Callback when a template is selected and also give the controller on which to select the data
   * @param template the selected template
   * @param createProjectCtrl callback controller
   */
  selectTemplate(template, createProjectCtrl) {

    // update source details
    createProjectCtrl.importProjectData.source.project.type = template.source.type;
    createProjectCtrl.importProjectData.source.project.location = template.source.location;
    createProjectCtrl.importProjectData.source.project.parameters = template.source.parameters;
    // update name, type, description
    createProjectCtrl.importProjectData.project.description = template.description;
    createProjectCtrl.importProjectData.project.type = template.type;

    var name = template.displayName;
    // strip space
    name = name.replace(/\s/g, '_');
    // strip dot
    name = name.replace(/\./g, '_');
    createProjectCtrl.importProjectData.project.name = name;


  }

}


export default CreateProjectSamplesCtrl;
