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
 * Controller for a factory details.
 * @author Florent Benoit
 */
class FactoryDetailsCtrl {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor($scope, $route, $filter, lodash, codenvyAPI) {

    let factoryId = $route.current.params.id;

    this.factory = null;

    let promise = codenvyAPI.getFactory().fetchFactory(factoryId);

    promise.then((factory) => {
      this.factory = factory;
      if (factory.originFactory) {
        this.factoryContent = $filter('json')(factory.originFactory, 2);
      }

    });

    this.toolbarIcons = [
//      {name: 'favorite', font: 'material-design icon-ic_star_24px'},
      {name: 'share', font: 'material-design icon-ic_share_24px'}
    ];

  }

}

export default FactoryDetailsCtrl;

