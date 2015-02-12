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

import Register from '../utils/register';

/**
 * Defines a directive for creating and managing Codenvy top toolbar.
 * @author Florent Benoit
 */
class CodenvyToolbar {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
  }

  /**
   * Template for the current toolbar
   * @param element
   * @param attrs
   * @returns {string} the template
   */
  template(element, attrs){
    var title = attrs.title;
    var buttonHref = attrs.buttonHref;
    var buttonName = attrs.buttonName;
    var theme = attrs.theme;

    if (!theme) {
      theme = 'toolbar-theme';
    }

    var template = '<md-toolbar class=\"md-tall md-toolbar-tools\" md-theme=\"' + theme +'\">\n'
    + '<div layout=\"row\" flex class=\"fill-height\">'
    + '<div class=\"md-toolbar-item md-breadcrumb\">'
    + '<h1>' + title + '</h1>'
    + '</div>'
    + '<span flex></span>'
    + '<div class=\"md-toolbar-item md-tools\" layout=\"row\">';

    if (buttonName) {
      template = template + '<a class=\"md-button md-default-theme\" ng-href=\"' + buttonHref + '\">'
      + '<md-button class=\"md-raised md-accent\">' + buttonName + '</md-button>'
      + '</a>';
    }

    template = template + '</div>'
    + '</div>'
    + '</md-toolbar>';

    return template;
  }

}

export default CodenvyToolbar;

Register.getInstance().directive('cdvyToolbar', CodenvyToolbar);
