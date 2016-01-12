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

import Register from '../../utils/register';

/**
 * Defines a directive for creating search/filtering input.
 * @author Ann Shumilova
 */
class CodenvySearch {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict = 'E';
   // this.replace= true;
    this.transclude= true;
    this.templateUrl = 'components/widget/search/cdvy-search.html';

    // we require ngModel as we want to use it inside our directive
    this.require = ['ngModel'];

    // scope values
    this.scope = {
      placeholder:'@cdvyPlaceholder',
      valueModel : '=ngModel',
      inputName:'@cdvyName'
    };
  }
}

export default CodenvySearch;

Register.getInstance().directive('cdvySearch', CodenvySearch);
