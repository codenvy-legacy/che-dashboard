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
  constructor(codenvyAPI, $location, $rootScope, userDashboardConfig) {
    this.codenvyAPI = codenvyAPI;
    this.$location = $location;

    this.stepsIcons = new Map();
    this.stepsIcons.set(1, 'assets/images/completed.svg');
    this.currentStep = 2;

    this.$rootScope = $rootScope;

    this.profile = codenvyAPI.getProfile().getProfile();

    this.devMode = userDashboardConfig.developmentMode;

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
  initStep(stepNumber) {
    // First, set it to 'to-complete' image
    this.stepsIcons.set(stepNumber, 'assets/images/to-complete.svg');

  }

  /**
   * Sets the account controller
   * @param accountController the account controller
   */
  setAccountController(accountController) {
    this.accountController = accountController;
  }


  /**
   * Callback when email is confirmed
   */
  confirmEmail() {
    this.nextStep();
  }


  /**
   * Defines the credit card controller
   * @param creditCardController
   */
  setCreditCardController(creditCardController) {
    this.creditCardController = creditCardController;
  }


  /**
   * Callback when credit card is added
   */
  addCreditCard() {
    let promise = this.creditCardController.addCreditCard();
    this.addingCardIsInProgress = true;
    // we enable next step only if card is added
    promise.then((data) => {
      this.addingCardIsInProgress = false;
      // ok switch to next step
      this.nextStep();
    }, (error) => {
      //we got error
      this.addingCardIsInProgress = false;
    })

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

    // save preferences by updating the onboarding flow
    let properties = {'onBoardingFlowCompleted' : 'true'};
    this.codenvyAPI.getProfile().updatePreferences(properties);

    this.$location.path('/create-project');
  }

  /**
   * Callback when profile is being completed
   */
  completeProfile() {
    this.accountController.setProfileAttributes(this.profileInformationForm.$valid)

    // go to the next step
    this.nextStep();
  }

  /**
   * When completing a step, flag the current step in lock mode
   */
  nextStep() {


    // lock current step
    this.$rootScope.$broadcast('cdvyPanel:lock', 'onboarding-step' + this.currentStep);

    // change icon
    this.stepsIcons.set(this.currentStep, 'assets/images/completed.svg');

    // increment step
    this.currentStep++;

    // now expand next step
    if (this.currentStep <= 4) {
      this.$rootScope.$broadcast('cdvyPanel:toggle', 'onboarding-step' + this.currentStep);
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


  inDevelopmentMode() {
    return this.devMode;
  }


}

export default OnBoardCtrl;

