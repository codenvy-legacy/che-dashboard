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
 * @name components.directive:cdvyToolbar
 * @restrict E
 * @function
 * @element
 *
 * @description
 * `<cdvy-toolbar>` defines a top toolbar.
 *
 * @param {string=} cdvy-title the title of the toolbar
 * @param {string=} cdvy-button-name the optional name of the right button
 * @param {string=} cdvy-button-href the optional link of the right button
 * @param {string=} cdvy-breadcrumb-title title of the breadcrumb
 * @param {string=} cdvy-breadcrumb-href link used by the breadcrumb
 * @param {string=} cdvy-subheader-title title of the sub header
 * @param {string=} cdvy-subheader-icon icon of the sub header
 *
 * @usage
 *   <cdvy-toolbar cdvy-title="hello"></cdvy-toolbar>
 *
 * @example
 <example module="userDashboard">
 <file name="index.html">
 <cdvy-toolbar cdvy-title="Hello"
               cdvy-button-name="My Button"
               cdvy-button-href="http://www.codenvy.com"
               cdvy-breadcrumb-title="My Breadcrumb"
               cdvy-breadcrumb-href="http://www.codenvy.com"
               cdvy-subheader-title="subtitle"
 ></cdvy-toolbar>
 </file>
 </example>
 * @author Florent Benoit
 */
class CodenvyToolbar {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.controller = 'NavbarCtrl';
    this.controllerAs = 'controller';
    this.bindToController = true;
  }

  /**
   * Template for the current toolbar
   * @param element
   * @param attrs
   * @returns {string} the template
   */
  template( element, attrs){
    var title = attrs.cdvyTitle;
    var titleController  = attrs.cdvyTitleIconsController;
    var buttonHref = attrs.cdvyButtonHref;
    var buttonName = attrs.cdvyButtonName;

    var breadcrumbTitle = attrs.cdvyBreadcrumbTitle;
    var breadcrumbHref = attrs.cdvyBreadcrumbHref;

    var subheaderTitle = attrs.cdvySubheaderTitle;
    var subheaderIcon = attrs.cdvySubheaderIcon;

    var theme = attrs.theme;

    if (!theme) {
      theme = 'toolbar-theme';
    }

    var template = '<md-toolbar class=\"md-tall\" md-theme=\"' + theme +'\">\n'
      + '<div layout=\"column\" flex>'
      + '<div layout=\"row\" flex class=\"cdvy-toolbar-breadcrumb\" layout-align=\"start center\">'
      + '<button class=\"toolbar-switch\" hide-gt-md ng-click=\"controller.toggleLeftMenu()\" >'
      + '<md-icon md-font-icon=\"fa fa-bars fa-2x\"></md-icon>'
      + '</button>';

    if (breadcrumbHref) {
      template = template + '<a href=\"' + breadcrumbHref + '\" class=\"icon-breadcrumb material-design icon-ic_chevron_left_24px\" md-theme=\"default\"></a>';
    }

    if (breadcrumbTitle) {
      template = template + breadcrumbTitle;
    }

    template = template + '</div>'
    + '<div layout=\"row\" flex class=\"fill-height \">'
    + '<div class=\"cdvy-toolbar-title\">'
    + '<span class=\"cdvy-toolbar-title-label\">'
    + title + '</span><span class=\"cdvy-toolbar-title-icons\">';
    if (titleController) {
      template = template
      + '<md-icon ng-repeat=\"icon in ' + titleController + '.toolbarIcons\" md-font-icon=\"{{icon.font}}\" ng-click=\"' + titleController + '.callbackToolbarClick(icon.name)\"';
    }

    template = template
    + '</span>'
    + '</div>'
    + '<span flex></span>'
    + '<div class=\"cdvy-toolbar-button\" layout=\"row\">';

    if (buttonName) {
      template = template + '<cdvy-button-primary cdvy-button-title=\"' + buttonName + '\" href=\"' + buttonHref + '\"></cdvy-button-primary>';
    }


    template = template + '</div>'
    + '</div>'
    + '<div layout=\"row\" class=\"cdvy-toolbar-subheader\">';
    if (subheaderIcon) {
      template = template + '<i class=\"'
      + subheaderIcon
      + '\"></i>';
    }
    if (subheaderTitle) {
      template = template
      + subheaderTitle
      + '</div>';
    }


    template = template
    + '</div>'
    + '</md-toolbar>';

    return template;
  }

}

export default CodenvyToolbar;

Register.getInstance().directive('cdvyToolbar', CodenvyToolbar);
