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
 * Defines a directive for displaying on-prem subscription information.
 * @author Ann Shumilova
 */
class OnpremSubscriptionInfo {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.templateUrl = 'app/navbar/subscriptions/onprem-subscription-info.html';
    this.transclude= true;

    // scope values
    this.scope = {
      subscription:'=cdvySubscription'
    };
  }

}

export default OnpremSubscriptionInfo;

