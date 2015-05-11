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
 * @name onboard.factory:OnBoardRedirect
 * @description This class is asking to redirect all the links onto onboarding page
 * @author Florent Benoit
 */

class OnBoardRedirect {


  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor (codenvyProfile, routingRedirect) {
    this.codenvyProfile = codenvyProfile;
    routingRedirect.addRouteCallback(this);
  }

  /**
   * Authorize the given path if it wants onboarding page
   * @param path
   */
  checkPage(path) {
    if ('app/onboard/onboard.html' == path) {
      return true;
    }
    return false;
  }


  /**
   * Check if we need for the selected user to redirect to onboarding flow or not
   * @returns {*}
   */
  checkRedirect() {
    let preferences = this.codenvyProfile.getPreferences();

    // Preferences say that flow hasn't been completed ?
    if (!preferences.onBoardingFlowCompleted || preferences.onBoardingFlowCompleted !== 'true') {
      return {route:"/welcome"};
    }
    return {};


  }

}

export default OnBoardRedirect;
