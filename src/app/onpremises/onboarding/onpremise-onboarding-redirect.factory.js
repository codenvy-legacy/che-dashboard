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
  constructor (codenvyAPI, routingRedirect, imsPropertiesApi) {
    this.codenvyAPI = codenvyAPI;
    this.imsPropertiesApi = imsPropertiesApi;
    routingRedirect.addRouteCallback(this);
  }

  /**
   * Authorize the given path if it wants onboarding page
   * @param path
   */
  checkPage(path) {
    if ('app/onpremises/onboarding/onboarding.html' === path) {
      return true;
    }
    return false;
  }


  /**
   * Check if we need for the selected user to redirect to onboarding flow or not
   * @returns {*}
   */
  checkRedirect(url) {

    let user = this.codenvyAPI.getUser();
    // if user is simple user, nothing to display
    if (user.isUser()) {
      return {};
    }

    // if user tries to get dashboard, redirect
    if ('app/projects/list-projects/list-projects.html' === url) {
      return {route:'/onprem/admin/bridge'};
    }


    // check if property is defined on the ims server
    // if not defined, redirect to the onboarding flow
    let property = this.imsPropertiesApi.getProperty('onboardingCompleted');

    if (!property  || property !== 'true') {
      return {route:'/onprem/onboarding'};
    }

    // flow not yet completed
    return {};

  }

}

export default OnPremiseOnBoardingRedirect;
