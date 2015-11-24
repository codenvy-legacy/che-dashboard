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
 * @name navbar.team.directive:TeamMembersList
 * @description This class is adding a team member to an account
 * @author Oleksii Orel
 */
class TeamMembersList {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict = 'E';
    this.templateUrl = 'app/navbar/team/team-members-list.html';
    this.replace = false;
    this.controller = 'TeamMembersListCtrl';
    this.controllerAs = 'teamMembersListCtrl';
    this.bindToController = true;

    // scope values
    this.scope = {
      account:'=cdvyAccount'
    };
  }

}

export default TeamMembersList;
