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
 * This class is providing a builder for membership
 * @author Ann Shumilova
 */
class CodenvyMembershipBuilder {

  /**
   * Default constructor.
   */
  constructor() {
    this.membership = {};
    this.membership.roles = [];
  }


  /**
   * Sets the user's id
   * @param id the id of the user
   * @returns {CodenvyMembershipBuilder}
   */
  withUserId(id) {
    this.membership.userId = id;
    return this;
  }

  /**
   * Sets the role of membership
   * @param role the role to use
   * @returns {CodenvyMembershipBuilder}
   */
  withRole(role) {
    this.membership.roles.push(role);
    return this;
  }

  /**
   * Sets the account reference of membership
   * @param account the account refrence
   * @returns {CodenvyMembershipBuilder}
   */
  withAccountReference(account) {
    this.membership.accountReference = account;
    return this;
  }


  /**
   * Build the membership
   * @returns {CodenvyMembershipBuilder.membership|*}
   */
  build() {
    return this.membership;
  }


}

export default CodenvyMembershipBuilder;
