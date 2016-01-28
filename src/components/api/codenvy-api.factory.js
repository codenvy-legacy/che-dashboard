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
 * This class is providing the entry point for accessing to Codenvy API
 * It handles workspaces, projects, etc.
 * @author Florent Benoit
 */
export class CodenvyAPI {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor(codenvyAccount, codenvyAnalytics, codenvyAnalyticsSession,
                codenvyFactory, codenvyFactoryTemplate, codenvyPayment, codenvySaas) {
    this.codenvyAccount = codenvyAccount;
    this.codenvyAnalytics = codenvyAnalytics;
    this.codenvyAnalyticsSession = codenvyAnalyticsSession;
    this.codenvyFactory = codenvyFactory;
    this.codenvyFactoryTemplate = codenvyFactoryTemplate;
    this.codenvyPayment = codenvyPayment;
    this.codenvySaas = codenvySaas;

  }


  /**
   * The Codenvy Account API
   * @returns {CodenvyAPI.codenvyAccount|*}
   */
  getAccount() {
    return this.codenvyAccount;
  }

  getAnalytics() {
    return this.codenvyAnalytics;
  }

  getAnalyticsSession() {
    return this.codenvyAnalyticsSession;
  }

  /**
   * The Codenvy Factory API
   * @returns {codenvyFactory|*}
   */
  getFactory() {
    return this.codenvyFactory;
  }

  /**
   * The Codenvy Factory Template API
   * @returns {CodenvyFactoryTemplate|*}
   */
  getFactoryTemplate() {
    return this.codenvyFactoryTemplate;
  }

  /**
   * The Codenvy Payment API
   * @returns {CodenvyAPI.codenvyPayment|*}
   */
  getPayment() {
    return this.codenvyPayment;
  }

  /**
   * The Codenvy Saas API
   * @returns {CodenvyAPI.codenvySaas|*}
   */
  getSaas() {
    return this.codenvySaas;
  }


}
