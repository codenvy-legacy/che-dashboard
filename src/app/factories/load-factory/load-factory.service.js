/*
 * Copyright (c) 2015-2016 Codenvy, S.A.
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
 * This class is handling the service for the factory loading.
 * @author Ann Shumilova
 */
class LoadFactoryService {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor ($timeout, $compile) {
    this.$timeout = $timeout;
    this.$compile = $compile;
    this.init = false;


    this.loadFactoryInProgress = false;

    this.currentProgressStep = 0;


    this.loadingSteps = [
      {text: 'Load factory data', inProgressText: 'Loading factory data', logs: '', hasError: false},
      {text: 'Initialize workspace', inProgressText: 'Initializing workspace', logs: '', hasError: false},
      {text: 'Start workspace', inProgressText: 'Starting workspace', logs: '', hasError: false},
      {text: 'Start workspace agent', inProgressText: 'Starting workspace agent', logs: '', hasError: false},
      {text: 'Import project(s)', inProgressText: 'Importing project(s)', logs: '', hasError: false},
      {text: 'Project(s) imported', inProgressText: 'Opening workspace', logs: '', hasError: false}
    ];

    this.popupVisible = false;
    this.initPopup = false;
  }

  getStepText(stepNumber) {
    let entry = this.loadingSteps[stepNumber];
    if (this.currentProgressStep >= stepNumber) {
      return entry.inProgressText;
    } else {
      return entry.text;
    }
  }

  getFactoryLoadingSteps() {
    return this.loadingSteps;
  }

  setCurrentProgressStep(currentProgressStep) {
    this.currentProgressStep = currentProgressStep;
  }

  goToNextStep() {
    this.currentProgressStep++;
  }

  getCurrentProgressStep() {
    return this.currentProgressStep;
  }

  resetLoadProgress() {
    this.loadingSteps.forEach((step) => {
      step.logs = '';
    step.hasError = false;
  });
  this.currentProgressStep = 0;

  this.loadFactoryInProgress = false;
  }

  isLoadFactoryInProgress() {
    return this.loadFactoryInProgress;
  }

  setLoadFactoryInProgress(value) {
    this.loadFactoryInProgress = value;
  }
}

export default LoadFactoryService;
