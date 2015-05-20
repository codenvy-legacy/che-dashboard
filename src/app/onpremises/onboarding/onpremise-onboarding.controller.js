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

class OnPremisesOnboardingCtrl {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor(codenvyAPI, imsPropertiesApi) {
    this.codenvyAPI = codenvyAPI;
    this.imsPropertiesApi = imsPropertiesApi;

    this.stepsIcons = new Map();
    this.currentStep = 1;
  }



  /**
   * Gets the icon for the provided step
   * @param stepNumber the step number
   * @returns {*}
   */
  getIconStep(stepNumber) {
    return this.stepsIcons.get(stepNumber);
  }

  /**
   * Provides the panel and the associated step
   * @param stepNumber the index of this step
   * @param panel the panel element
   */
  initStep(stepNumber) {
    // First, set it to 'to-complete' image
    this.stepsIcons.set(stepNumber, 'assets/images/to-complete.svg');

  }



  resetOnboardingAdminFlag() {
    this.imsPropertiesApi.storeProperty('onboardingCompleted', 'false');
  }

  skipOnboardingAdminFlag() {
    this.imsPropertiesApi.storeProperty('onboardingCompleted', 'true');

  }
}

export default OnPremisesOnboardingCtrl;
