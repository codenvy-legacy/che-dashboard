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
 * @description This class is handling the controller for account members
 * @author Ann Shumilova
 */
class TeamCtrl {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor (codenvyAPI, $mdMedia, $q, $mdDialog, codenvyNotification) {
    this.codenvyAPI = codenvyAPI;
    this.$mdMedia = $mdMedia;
    this.$q = $q;
    this.$mdDialog = $mdDialog;
    this.codenvyNotification = codenvyNotification;

    this.members = [];
    this.isLoading = true;

    this.accounts = this.codenvyAPI.getAccount().getAccounts();

    if(this.accounts && this.accounts.length > 0){ 
      this.account = this.accounts[0];
    } else {
      this.updateAccountData();    
    }
  }

  updateAccountData() {
    this.codenvyAPI.getAccount().fetchAccounts().then(() => {
      if(this.accounts && this.accounts.length > 0){ 
        this.account = this.accounts[0];
      }
    });
  }
 
}

export default TeamCtrl;
