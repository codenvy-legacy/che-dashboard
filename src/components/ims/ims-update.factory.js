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
 * This class is handling the interface with Installation Manager Server (IMS) update API.
 */
class ImsUpdateApi {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor($resource) {

    // remote call
    this.remoteImsAPI = $resource('/im', {}, {
      updateCodenvy: { method: 'POST', url: '/im/update/codenvy' }
    });
  }

  update() {
    let request = this.remoteImsAPI.update();
    return request.$promise;
  }

}

// Register this factory
Register.getInstance().factory('imsUpdateApi', ImsUpdateApi);
