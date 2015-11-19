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

import Register from '../utils/register.js';

/**
 * This class is checking onBoarding state.
 * @author Oleksii Orel
 */
class OnBoarding {

  /**
   * Default constructor for the artifact API.
   * @ngInject for Dependency injection
   */
  constructor(codenvyAPI, imsArtifactApi) {
    this.imsArtifactApi = imsArtifactApi;
    this.codenvyUser = codenvyAPI.getUser();
    this.profile = codenvyAPI.getProfile().getProfile();
    this.preferences = codenvyAPI.getProfile().getPreferences();
  }

  isUserOnBoarding() {
    // if admin
    if (this.codenvyUser.isAdmin() || this.imsArtifactApi.isImsAvailable()) {
      return false;
    }

    let property = this.preferences.onBoardingFlowCompleted;

    return !property || property !== 'true';
  }

}

// Register this factory
Register.getInstance().factory('onBoarding', OnBoarding);
