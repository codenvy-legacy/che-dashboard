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

class OnBoardCtrl {


  /**
   * Default constructor
   * @ngInject for Dependency injection
   */
  constructor() {
    this.steps = new Map();
    this.stepsIcons = new Map();
    this.currentStep = 1;


    this.profile = {};
    this.profile.email = 'dummy@dummy.email';

  }

  getIconStep(stepNumber) {
    return this.stepsIcons.get(stepNumber);
  }

  setStep(stepNumber, panel) {
    this.stepsIcons.set(stepNumber, 'assets/images/to-complete.svg');
    this.steps.set(stepNumber, panel);

    // collapse all remaining nodes
    if (stepNumber > 1) {
      panel.codenvyPanelCtrl.collapse = true;

    }


  }

  setAccountProfile(profile) {
    this.profileScope = profile;
    console.log('called setAccount profile with data', profile);
  }


  confirmEmail() {
    this.nextStep();
  }

  addCreditCard() {
    this.nextStep();
  }

  skipCreditCard() {
    this.nextStep();
  }

  createProject() {
    this.nextStep();
  }

  completeProfile() {
    this.nextStep();
  }

  /**
   * When completing signup, flag the first panel in lock mode
   */
  nextStep() {
    console.log("current step is", this.currentStep);
    // lock current step
    this.steps.get(this.currentStep).codenvyPanelCtrl.lock();

    // change icon
    this.stepsIcons.set(this.currentStep, 'assets/images/completed.svg');

    this.currentStep++;

    // now expand step 2
    if (this.currentStep <= 4) {
      this.steps.get(this.currentStep).codenvyPanelCtrl.collapse = false;
    }


  }

  setAccountProfileForm(profileInformationForm) {
    this.profileInformationForm = profileInformationForm;
  }

  isCompleteSignupButtonDisabled() {
    return !this.profileInformationForm  || this.profileInformationForm.$invalid;
  }


}

export default OnBoardCtrl;

