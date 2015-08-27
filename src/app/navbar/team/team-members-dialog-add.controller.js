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
 * @name team.directive:TeamMembersDialogAddCtrl
 * @description This class is handling the controller for adding account members dialog
 * @author Ann Shumilova
 */
class TeamMembersDialogAddCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($mdDialog) {
    this.$mdDialog = $mdDialog;

    this.roles = [];
    this.roles.push({name : 'Manager', id: 'account/manager'});
    this.roles.push({name : 'Member', id: 'account/member'});
    this.roles.push({name : 'Owner', id: 'account/owner'});

    this.userRole = this.roles[0].id;
  }

  /**
   * Callback of the add button of the dialog.
   */
  add() {
    this.$mdDialog.hide();
    let roles = [];
    roles.push(this.userRole);

    this.callbackController.callbackMemberAdd(this.userEmail, roles);
  }


  /**
   * Callback of the cancel button of the dialog.
   */
  abort() {
    this.$mdDialog.hide();
  }
}

export default TeamMembersDialogAddCtrl;
