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

import Register from '../../utils/register';

/**
 * Defines a directive for the clipboard.
 * @author Oleksii Orel
 */
class CodenvyClipboard {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
    this.restrict = 'E';
    this.replace = true;
    this.templateUrl = 'components/widget/copy-clipboard/cdvy-clipboard.html';

    // scope value
    this.scope = {
      value: '@cdvyValue'
    };

  }

  /**
   * Keep reference to the model controller
   */
  link($scope, element) {
    //TODO why the zeroclipboard-is-hover class may not be removed after mouse leave
    $scope.onMouseLeave = function () {
      // search the copy clipboard hover element
      var hoverElement = element.find('.zeroclipboard-is-hover');
      if (hoverElement) {
        hoverElement.removeClass('zeroclipboard-is-hover');
      }
    };
  }
}

export default CodenvyClipboard;

Register.getInstance().directive('cdvyClipboard', CodenvyClipboard);
