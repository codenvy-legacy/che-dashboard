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
 * @name projects.details.directive:ProjectDetailsDevelopersDialogAddCtrl
 * @description This class is handling the controller for adding developers dialog
 * @author Florent Benoit
 */
class ProjectDetailsDevelopersDialogAddCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($mdDialog) {
    this.$mdDialog = $mdDialog;

    // initialize default permissions to check
    this.permissions = {};
    this.permissions['read'] = true;
    this.permissions['write'] = true;
    this.permissions['build'] = true;
    this.permissions['run'] = true;
    this.permissions['update_acl'] = false;
  }

  /**
   * Callback of the add button of the dialog.
   */
  add() {
    this.$mdDialog.hide();
    this.callbackController.callbackUserAdd(this.userIDtoAdd, this.permissions);
  }


  /**
   * Callback of the cancel button of the dialog.
   */
  abort() {
    this.$mdDialog.hide();
  }


  /**
   * Defines the form used by the dialog.
   * @param form the element
   */
  setForm(form) {
    this.form = form;
  }

  /**
   * @returns {boolean} true if there is at least one checkbox that is being checked. false if there are no checked checkboxes.
   */
  atLeastOneCheckbox() {
    var checked = false;

    for(let permission in this.permissions) {
      if (this.permissions[permission]) {
        checked = true;
      }
    }
    return checked;
  }

  /**
   * @returns {boolean} true if the primary button needs to be disabled (no checkbox or form is invalid)
   */
  isButtonDisabled() {
    return !this.atLeastOneCheckbox() || (this.form != null && this.form.$invalid);
  }


}

export default ProjectDetailsDevelopersDialogAddCtrl;
