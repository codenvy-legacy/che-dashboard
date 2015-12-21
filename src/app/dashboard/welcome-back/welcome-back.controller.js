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
 * @name dashboard.controller:WelcomeBackCtrl
 * @description This class is handling the controller of the 'welcome back' panel in dashboard
 * @author Florent Benoit
 */
class WelcomeBackCtrl {


  /**
   * Default constructor
   * @ngInject for Dependency injection
   */
  constructor(codenvyProject, codenvyWorkspace, codenvyProfile, userDashboardConfig, $location, $rootScope) {
    this.codenvyProject = codenvyProject;
    this.codenvyWorkspace = codenvyWorkspace;
    this.codenvyProfile = codenvyProfile;
    this.userDashboardConfig = userDashboardConfig;
    this.$location = $location;
    this.$rootScope = $rootScope;

    // ask to keep loader until we've not performed the choice
    if (!$rootScope.waitingLoaded) {
      $rootScope.wantTokeepLoader = true;
    }

    this.requireUserAction = false;

    // fetch workspaces when initializing
    let promise = this.codenvyWorkspace.fetchWorkspaces();

    promise.then(() => {
          this.checkIfWorkspaces();
          this.state = 'OK';
        },
        (error) => {
          if (error.status === 304) {
            // ok
            this.checkIfWorkspaces();
            this.state = 'OK';
            return;
          }
          this.state = 'error';
        });
  }


  checkIfWorkspaces() {

    let preferences = this.codenvyProfile.getPreferences();




    let workspaces = this.codenvyWorkspace.getWorkspaces();
    // no workspaces
    if (workspaces.length >= 0) {
      // select the last one
      this.lastWorkspace = workspaces[0].name;

      // user has not make the choice
      if (!preferences.choiceUDtoIDE) {
        this.requireUserAction = true;
      }

      // user has decided to redirect to the
      if (preferences.choiceUDtoIDE && !this.$rootScope.waitingLoaded) {
        this.$location.path('/ide/' + this.lastWorkspace);
      }
    }

    if (this.$rootScope.wantTokeepLoader) {
      this.$rootScope.wantTokeepLoader = false;
      if (this.$rootScope.waitingLoaded) {
        this.$rootScope.hideLoader = true;
      }
    }

  }

  selectChoice(value) {
    // save preferences by updating the choiceUDtoIDE property
    let properties = {'choiceUDtoIDE' : value};
    this.codenvyProfile.updatePreferences(properties);
    this.requireUserAction = false;
  }


  needUserAction() {
    return this.requireUserAction;
  }

  isDevMode() {
    return this.userDashboardConfig.developmentMode;
  }

  removeChoice() {
    let properties = ['choiceUDtoIDE'];
    this.codenvyProfile.removePreferences(properties);
  }


}

export default WelcomeBackCtrl;

