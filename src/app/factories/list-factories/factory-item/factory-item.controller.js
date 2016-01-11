/*
 * Copyright (c) 2012-2016 Codenvy, S.A.
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
 * Controller for a factory item.
 * @author Oleksii Orel
 */
class FactoryItemCtrl {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor($location) {
    this.$location = $location;
  }

  //Redirect to factory details.
  redirectToFactoryDetails() {
    this.$location.path('/factory/' + this.factory.originFactory.id);
  }

}

export default FactoryItemCtrl;
