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
 * @ngdoc directive
 * @name components.directive:cdvyPanel
 * @restrict E
 * @function
 * @element
 *
 * @description
 * `<cdvy-toolbar>` defines a panel used to insert data.
 *
 * @param {string=} cdvy-title the title of the panel
 *
 * @usage
 *   <cdvy-panel cdvy-title="hello"></cdvy-panel>
 *
 * @example
 <example module="userDashboard">
 <file name="index.html">
 <cdvy-panel cdvy-title="hello">This is simple text</cdvy-panel>
 </file>
 </example>
 * @author Florent Benoit
 */
class CodenvyPanel {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.replace= true;
    this.transclude= true;
    this.templateUrl = 'components/widget/panel/cdvy-panel.html';

    // we require ngModel as we want to use it inside our directive
    this.require = ['ngModel'];

    // scope values
    this.scope = {
      title:'@cdvyTitle'

    };

  }


}

export default CodenvyPanel;

Register.getInstance().directive('cdvyPanel', CodenvyPanel);
