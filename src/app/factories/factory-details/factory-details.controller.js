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
  constructor($route, codenvyAPI) {

    let factoryId = $route.current.params.id;

    this.factory = codenvyAPI.getFactory().getFactoryById(factoryId);

    let promise = codenvyAPI.getFactory().fetchFactory(factoryId);

    promise.then((factory) => {
      this.factory = factory;
    }, (error) => {
      this.codenvyNotification.showError(error.data.message ? error.data.message : 'Get factory failed.');
      console.log('error', error);
    });

    this.toolbarIcons = [
//      {name: 'favorite', font: 'material-design icon-ic_star_24px'},
//      {name: 'share', font: 'material-design icon-ic_share_24px'}
    ];

  }

}

export default FactoryDetailsCtrl;

