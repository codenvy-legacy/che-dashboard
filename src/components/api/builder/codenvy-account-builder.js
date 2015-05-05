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
 * This class is providing a builder for Account
 * @author Ann Shumilova
 */
class CodenvyAccountBuilder {

  /**
   * Default constructor.
   */
  constructor() {
    this.account = {};
    this.account.attributes = {};
  }


  /**
   * Sets the name of the account
   * @param name the name to use
   * @returns {CodenvyAccountBuilder}
   */
  withName(name) {
    this.account.name = name;
    return this;
  }

  /**
   * Sets the id of the account
   * @param id the id to use
   * @returns {CodenvyAccountBuilder}
   */
  withId(id) {
    this.account.id = id;
    return this;
  }



  /**
   * Sets an attribute on the account
   * @param name the attribute's name
   * @param value the attribute's value
   * @returns {CodenvyAccountBuilder}
   */
  withAttribute(name, value) {
    this.account.attributes[name] = value;
    return this;
  }


  /**
   * Build the account
   * @returns {CodenvyAccountBuilder.account|*}
   */
  build() {
    return this.account;
  }


}

export default CodenvyAccountBuilder;
