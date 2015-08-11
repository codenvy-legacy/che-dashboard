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
 * @name workspaces.create.workspace.controller:CreateWorkspaceCtrl
 * @description This class is handling the controller for workspace creation
 * @author Ann Shumilova
 */
class CreateWorkspaceCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor (codenvyAPI, $q, $location) {
    this.codenvyAPI = codenvyAPI;
    this.$q = $q;
    this.$location = $location;
    this.workspace = {};
    this.members = [];

    this.workspace.ram = 4000;

    if (this.codenvyAPI.getAccount().getAccounts().length > 0) {
      this.accounts = this.codenvyAPI.getAccount().getAccounts();
      this.account = this.accounts[0];
    } else {
      this.codenvyAPI.getAccount().fetchAccounts().then(() => {
        this.accounts = this.codenvyAPI.getAccount().getAccounts();
        this.account = this.accounts[0];
      });
    }
  }

  createWorkspace() {
    let promises = [];

    let creationPromise = this.codenvyAPI.getWorkspace().createWorkspace(this.account.id, this.workspace.name);
    let resourcesPromise = creationPromise.then((data) => {
      if (this.workspace.ram && this.workspace.ram > 0) {
        let resources = {};
        resources.runnerRam = this.workspace.ram;
        let redistributePromise = this.codenvyAPI.getSaas().redistributeResources(data.accountId, data.id, resources);
        promises.push(redistributePromise);
      }

      this.members.forEach((member) => {
        let addMemberPromise = this.codenvyAPI.getWorkspace().addMember(data.id, member.id, member.roles);
        promises.push(addMemberPromise);
      });
    });

    promises.push(resourcesPromise);



    this.$q.all(promises).then(() => {
      this.$location.path('/workspaces');
    });
  }
}

export default CreateWorkspaceCtrl;
