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
import CodenvyButton from './cdvy-button.directive';

/**
 * @ngdoc directive
 * @name components.directive:cdvyButtonWarning
 * @restrict E
 * @function
 * @element
 *
 * @description
 * `<cdvy-button-warning>` defines a warning button.
 *
 * @param {string=} cdvy-button-title the title of the button
 * @param {string=} cdvy-button-icon the optional icon of the button
 *
 * @usage
 *   <cdvy-button-warning cdvy-button-title="hello"></cdvy-button-warning>
 *
 * @example
 <example module="userDashboard">
 <file name="index.html">
 <cdvy-button-warning cdvy-button-title="Hello"></cdvy-button-warning>
 <cdvy-button-warning cdvy-button-title="Hello" cdvy-button-icon="fa fa-trash"></cdvy-button-warning>
 </file>
 </example>
 * @author Ann Shumilova
 */
class CodenvyButtonWarning extends CodenvyButton {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    super();
  }

  /**
   * Template for the buttons
   */
  getTemplateStart() {
    return '<md-button md-theme=\"warning\" class=\"cdvy-button md-accent md-raised md-hue-3\"';
  }

}

export default CodenvyButtonWarning;

Register.getInstance().directive('cdvyButtonWarning', CodenvyButtonWarning);
