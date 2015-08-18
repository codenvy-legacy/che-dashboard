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
 * Defines a directive for factory item in list.
 * @author Oleksii Orel
 */
class CodenvyFactoryItem {

  /**
   * Default constructor.
   */
  constructor() {
    this.restrict = 'E';

    this.templateUrl = 'app/factories/list-factories/factory-item/factory-item.html';
    this.replace = false;

    this.controller = 'FactoryItemCtrl';
    this.controllerAs = 'factoryItemCtrl';

    this.bindToController = true;

    // scope values
    this.scope = {
      factory: '=cdvyFactory'
    };

  }

}

export default CodenvyFactoryItem;
