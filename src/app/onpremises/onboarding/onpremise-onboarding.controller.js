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
  constructor(codenvyAPI, imsPropertiesApi, $rootScope, $location, userDashboardConfig) {
    this.codenvyAPI = codenvyAPI;
    this.imsPropertiesApi = imsPropertiesApi;
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.stepsIcons = new Map();
    this.currentStep = 1;
    this.completed = false;
    this.devMode = userDashboardConfig.developmentMode;
    this.agreementButtonEnabled = true;
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

    if (stepNumber == 1) {
      if (this.imsPropertiesApi.getProperty('onboardingCompleted') === 'true') {
        this.completed = true;
      } else {
        this.completed = false;
      }
    }
  }


  /**
   * When completing a step, flag the current step in lock mode
   */
  nextStep() {
    // lock current step
    this.$rootScope.$broadcast('cdvyPanel:lock', 'onpremise-onboarding-step' + this.currentStep);

    // change icon
    this.stepsIcons.set(this.currentStep, 'assets/images/completed.svg');

    // increment step
    this.currentStep++;

    // now expand next step
    if (this.currentStep <= 2) {
      this.$rootScope.$broadcast('cdvyPanel:toggle', 'onpremise-onboarding-step' + this.currentStep);
    }

  }

  validateMarketing() {
    this.nextStep();
  }

  /**
   * Validate the flag of onboarding
   */
  validateAgreement() {
    if (this.currentStep < 2) {
      return;
    }
    let promise = this.imsPropertiesApi.storeProperty('onboardingCompleted', 'true');
    this.nextStep();
    promise.then(() => {
      this.completed = true;
      this.$location.path('/onprem/admin/installation');
    });
  }


  resetOnboardingAdminFlag() {
    this.imsPropertiesApi.storeProperty('onboardingCompleted', 'false');
    this.completed = false;

  }

  isValidateAgreementDisabled() {
    return  (this.currentStep < 2) || !this.agreementButtonEnabled;
  }

  enableLicenseAgreement() {
    this.agreementButtonEnabled = true;
  }

  isCompleted() {
    return this.completed;
  }

  inDevelopmentMode() {
    return this.devMode;
  }
}

export default OnPremisesOnboardingCtrl;
