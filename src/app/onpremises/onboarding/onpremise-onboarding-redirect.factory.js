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
 * @ngdoc factory
 * @name onpremises.factory:OnPremiseOnBoardRedirect
 * @description This class is asking to redirect all the links into admin onboarding page
 * @author Florent Benoit
 */

class OnPremiseOnBoardingRedirect {


  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor (codenvyAPI, routingRedirect) {
    this.codenvyAPI = codenvyAPI;
    routingRedirect.addRouteCallback(this);
  }

  /**
   * Authorize the given path if it wants onboarding page
   * @param path
   */
  checkPage(path) {
    console.log('checking path onboarding flow for admin');
    if ('app/onpremises/onboarding/onboarding.html' == path) {
      return true;
    }
    return false;
  }


  /**
   * Check if we need for the selected user to redirect to onboarding flow or not
   * @returns {*}
   */
  checkRedirect() {
    console.log('checking redirect onboarding flow for admin');
    let user = this.codenvyAPI.getUser();

    // if user is simple user, nothing to display
    if (!user.isAdmin()) {
      return {};
    }
    let preferences = this.codenvyAPI.getProfile().getPreferences();

    // check role (needs to fixed that when isUserInRole will be merged) FIXME
    // for now admin is a preference
    console.log('preferences are', preferences);
    if (preferences.isAdmin && preferences.isAdmin == 'true') {
      console.log('preferences isAdmin is', preferences.isAdmin);
      console.log('preferences adminOnBoardingFlowCompleted is', preferences.adminOnBoardingFlowCompleted);

      // check if onboarding has already been made (it should call remote IMS) !!! FIXME
      if (!preferences.adminOnBoardingFlowCompleted || preferences.adminOnBoardingFlowCompleted !== 'true') {
        return {route:"/onpremises/onboarding"};
      }
    }

    // simple user or flow already be done
    return {};

  }

}

export default OnPremiseOnBoardingRedirect;
