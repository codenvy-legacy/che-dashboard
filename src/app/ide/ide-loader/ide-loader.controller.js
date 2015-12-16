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
 * This class is handling the controller for the loader displayed beofre displaying the IDE
 * @author Florent Benoit
 */
class IdeLoaderCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor(ideSvc, $rootScope) {
    this.ideSvc= ideSvc;
    this.$rootScope = $rootScope;
  }


  getSteps() {
    return this.ideSvc.steps;
  }

  getCurrentStep() {
    return this.ideSvc.currentStep;
  }

}


export default IdeLoaderCtrl;
