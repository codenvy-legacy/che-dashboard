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

class ScrollValidate {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict = 'A';
  }


  /**
   * Re-apply ng-disabled on child
   */
  link($scope, element) {
    var innerElement = element[0];

    element.bind('scroll', function () {
      // reach end of the scrolling, notify the onboarding controller
      if (innerElement.scrollTop + innerElement.offsetHeight >= innerElement.scrollHeight) {
        $scope.$parent.$parent.onPremisesOnboardingCtrl.enableLicenseAgreement();
        $scope.$apply();
      }
    });
  }

}

export default ScrollValidate;
