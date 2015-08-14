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
 * @name workspaces.details.directive:WorkspaceDetailsMembersDialogAddCtrl
 * @description This class is handling the controller for adding workspace members dialog
 * @author Ann Shumilova
 */
class WorkspaceDetailsMembersDialogAddCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($mdDialog) {
    this.$mdDialog = $mdDialog;

    this.roles = [];
    this.roles.push({name : 'Admin', id: 'workspace/admin'});
    this.roles.push({name : 'Developer', id: 'workspace/developer'});
    this.roles.push({name : 'Stakeholder', id: 'workspace/stakeholder'});
    this.roles.push({name : 'Admin Developer', id: 'workspace/admin+developer'});

    this.userRole = this.roles[0].id;
  }

  /**
   * Callback of the add button of the dialog.
   */
  add() {
    this.$mdDialog.hide();
    let roles = [];
    if (this.userRole === 'workspace/admin+developer') {
      roles.push('workspace/admin');
      roles.push('workspace/developer');
    } else {
      roles.push(this.userRole);
    }

    this.callbackController.callbackMemberAdd(this.userEmail, roles);
  }


  /**
   * Callback of the cancel button of the dialog.
   */
  abort() {
    this.$mdDialog.hide();
  }
}

export default WorkspaceDetailsMembersDialogAddCtrl;
