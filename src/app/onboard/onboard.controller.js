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

import Register from '../../components/utils/register';

/**
 * @ngdoc controller
 * @name onboard.controller:OnBoardCtrl
 * @description This class is handling the controller of the onboarding flow
 * @author Florent Benoit
 */
class OnBoardCtrl {


  /**
   * Default constructor
   * @ngInject for Dependency injection
   */
  constructor(codenvyAPI, $location) {
    this.codenvyAPI = codenvyAPI;
    this.$location = $location;

    this.steps = new Map();
    this.stepsIcons = new Map();
    this.currentStep = 1;



    this.profile = codenvyAPI.getProfile().getProfile();
  }

  deleteOnBoardingCompleted() {
    let properties = {'onBoardingFlowCompleted' : 'false'};
    this.codenvyAPI.getProfile().updatePreferences(properties);

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
  setStep(stepNumber, panel) {
    // First, set it to 'to-complete' image
    this.stepsIcons.set(stepNumber, 'assets/images/to-complete.svg');
    this.steps.set(stepNumber, panel);

    // for now the first step should already be done
    if (stepNumber === 1) {
      panel.codenvyPanelCtrl.lock();
      // change icon
      this.stepsIcons.set(this.currentStep, 'assets/images/completed.svg');

      // increment step
      this.currentStep++;

    }

    // collapse all remaining nodes
    if (stepNumber > 2) {
      panel.codenvyPanelCtrl.collapse = true;
    }


  }

  /**
   * Sets the account profile
   * @param profile the profile data
   */
  setAccountProfile(profile) {
    this.profileScope = profile;
  }


  /**
   * Callback when email is confirmed
   */
  confirmEmail() {
    this.nextStep();
  }

  /**
   * Callback when credit card is added
   */
  addCreditCard() {
    this.nextStep();
  }

  /**
   * Callback when credit card is skipped
   */
  skipCreditCard() {
    this.nextStep();
  }

  /**
   * Callback when createProject is called
   */
  createProject() {
    this.nextStep();
    this.$location.path('/create-project');
  }

  /**
   * Callback when profile is being completed
   */
  completeProfile() {
    this.nextStep();
  }

  /**
   * When completing a step, flag the current step in lock mode
   */
  nextStep() {
    let properties = {'onBoardingFlowCompleted' : 'true'};
    this.codenvyAPI.getProfile().updatePreferences(properties);

    // lock current step
    this.steps.get(this.currentStep).codenvyPanelCtrl.lock();

    // change icon
    this.stepsIcons.set(this.currentStep, 'assets/images/completed.svg');

    // increment step
    this.currentStep++;

    // now expand step 2
    if (this.currentStep <= 4) {
      this.steps.get(this.currentStep).codenvyPanelCtrl.collapse = false;
    }


  }

  /**
   * Provide the form for profile
   * @param profileInformationForm
   */
  setAccountProfileForm(profileInformationForm) {
    this.profileInformationForm = profileInformationForm;
  }

  /**
   * Do not let button enable if data are invalid
   * @param profileInformationForm
   */
  isCompleteSignupButtonDisabled() {
    return !this.profileInformationForm  || this.profileInformationForm.$invalid;
  }


}

export default OnBoardCtrl;

