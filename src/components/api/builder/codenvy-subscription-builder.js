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
 * This class is providing a builder for Subscription
 * @author Ann Shumilova
 */
class CodenvySubscriptionBuilder {

  /**
   * Default constructor.
   */
  constructor() {
    this.subscription = {};
    this.subscription.properties = {};
  }

  /**
   * Sets the id of the account
   * @param accountId the account id
   * @returns {CodenvySubscriptionBuilder}
   */
  withAccountId(accountId) {
    this.subscription.accountId = accountId;
    return this;
  }

  /**
   * Sets the id of the subscription
   * @param id the id to use
   * @returns {CodenvySubscriptionBuilder}
   */
  withId(id) {
    this.subscription.id = id;
    return this;
  }

  /**
   * Sets the service id of the subscription
   * @param serviceId the service id to use
   * @returns {CodenvySubscriptionBuilder}
   */
    withServiceId(serviceId) {
    this.subscription.serviceId = serviceId;
    return this;
  }

  /**
   * Sets the plan id of the subscription
   * @param planId the plan id to use
   * @returns {CodenvySubscriptionBuilder}
   */
    withPlanId(planId) {
    this.subscription.planId = planId;
    return this;
  }



  /**
   * Sets an property of the subscription
   * @param name the property's name
   * @param value the property's value
   * @returns {CodenvySubscriptionBuilder}
   */
  withProperty(name, value) {
    this.subscription.properties[name] = value;
    return this;
  }


  /**
   * Build the subscription
   * @returns {CodenvySubscriptionBuilder.subscription|*}
   */
  build() {
    return this.subscription;
  }


}

export default CodenvySubscriptionBuilder;
