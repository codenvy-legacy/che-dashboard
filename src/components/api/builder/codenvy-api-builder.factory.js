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


import {CodenvyAccountBuilder} from './codenvy-account-builder.js';
import {CodenvyMembershipBuilder} from './codenvy-membership-builder.js';

/**
 * This class is providing the entry point for accessing the builders
 * @author Florent Benoit
 */
export class CodenvyAPIBuilder {

  /**
   * Default constructor
   * @ngInject for Dependency injection
   */
  constructor () {
  }

  /**
   * The Codenvy Account builder
   * @returns {CodenvyAPI.codenvyAccount|*}
   */
  getAccountBuilder() {
    return new CodenvyAccountBuilder();
  }

  /**
   * The Codenvy Membership builder
   * @returns {CodenvyAPI.codenvyMembership|*}
   */
  getUserMembershipBuilder() {
    return new CodenvyMembershipBuilder();
  }

}
