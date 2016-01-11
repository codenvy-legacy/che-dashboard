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


import Register from '../../utils/register';

/**
 * @ngdoc controller
 * @name components.controller:CodenvyBoxCtrl
 * @description This class is handling the controller of a box
 * @author Florent Benoit
 */
class CodenvyBoxCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
  }


}


export default CodenvyBoxCtrl;

Register.getInstance().controller('CodenvyBoxCtrl', CodenvyBoxCtrl);
