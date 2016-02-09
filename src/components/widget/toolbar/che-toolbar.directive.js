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

/**
 * @ngdoc directive
 * @name components.directive:cheToolbar
 * @restrict E
 * @function
 * @element
 *
 * @description
 * `<che-toolbar>` defines a top toolbar.
 *
 * @param {string=} che-title the title of the toolbar
 * @param {string=} che-button-name the optional name of the right button
 * @param {string=} che-button-href the optional link of the right button
 * @param {string=} che-button-href-target the optional target of the right button
 * @param {string=} che-breadcrumb-title title of the breadcrumb
 * @param {string=} che-breadcrumb-href link used by the breadcrumb
 * @param {string=} che-subheader-title title of the sub header
 * @param {string=} che-subheader-icon icon of the sub header
 *
 * @usage
 *   <che-toolbar che-title="hello"></che-toolbar>
 *
 * @example
 <example module="userDashboard">
 <file name="index.html">
 <che-toolbar che-title="Hello"
               che-button-name="My Button"
               che-button-href="http://www.eclipse.org/che"
               che-breadcrumb-title="My Breadcrumb"
               che-breadcrumb-href="http://www.eclipse.org/che"
               che-subheader-title="subtitle"
 ></che-toolbar>
 </file>
 </example>
 * @author Florent Benoit
 */
export class CheToolbar {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.replace = true;
    this.controller = 'CheNavBarCtrl';
    this.controllerAs = 'controller';
    this.bindToController = true;
    this.transclude= true;

  }

  /**
   * Template for the current toolbar
   * @param element
   * @param attrs
   * @returns {string} the template
   */
  template( element, attrs){
    var title = attrs.cheTitle;
    var titleController  = attrs.cheTitleIconsController;
    var buttonHref = attrs.cheButtonHref;
    var buttonHrefTarget = attrs.cheButtonHrefTarget;
    var buttonName = attrs.cheButtonName;

    var breadcrumbTitle = attrs.cheBreadcrumbTitle;
    var breadcrumbHref = attrs.cheBreadcrumbHref;

    var subheaderTitle = attrs.cheSubheaderTitle;
    var subheaderIcon = attrs.cheSubheaderIcon;

    var searchPlaceholder = attrs.cheSearchPlaceholder;
    var searchModel = attrs.cheSearchModel;

    var dropdownMenu = attrs.cheDropdownMenu;
    var dropdownModel = attrs.cheDropdownModel;
    var dropdownOnchange = attrs.cheDropdownOnchange;

    var theme = attrs.theme;

    if (!theme) {
      theme = 'toolbar-theme';
    }

    var template = '<div class=\"che-toolbar\"><md-toolbar md-theme=\"' + theme +'\">\n'
      + '<div layout=\"column\" flex>';

    // start href link
    if (breadcrumbHref) {
      template = template + '<div layout=\"row\" flex class=\"che-toolbar-breadcrumb\" layout-align=\"start center\">'
      + '<a href=\"' + breadcrumbHref + '\" layout=\"row\" layout-align=\"start center\">' +
      '<i class=\"icon-breadcrumb material-design icon-ic_chevron_left_24px\" md-theme=\"default\"></i>';
    }

    if (breadcrumbTitle) {
      template = template + '<span class="che-toolbar-breadcrumb-title">' + breadcrumbTitle + '</span>';
    }

    // end href link
    if (breadcrumbHref) {
      template = template + '</a></div>';
    }

    template = template + '<div layout=\"row\" flex layout-align=\"start center\" class=\"che-toolbar-header\">'
    + '<button class=\"che-toolbar-control-button\" hide-gt-md ng-click=\"controller.toggleLeftMenu()\" >'
    + '<md-icon md-font-icon=\"fa fa-bars\"></md-icon>'
    + '</button>'
    + '<div class=\"che-toolbar-title\">'
    + '<span class=\"che-toolbar-title-label\">'
    + title + '</span><span class=\"che-toolbar-title-icons\">';
    if (titleController) {
      template = template
      + '<md-icon ng-repeat=\"icon in ' + titleController + '.toolbarIcons\" md-font-icon=\"{{icon.font}}\" ng-click=\"'
      + titleController + '.callbackToolbarClick(icon.name)\"';
    }

    template += '</span></div>';

    if (searchModel) {
      template += '<che-search flex che-placeholder=\"' + searchPlaceholder+ '\" class=\"che-toolbar-control-button\" ng-model=\"' + searchModel + '\"></che-search>';
    } else {
      template += '<span flex></span>';
    }
    template += '<div layout=\"row\" layout-align=\"start center\">';

    if (dropdownMenu) {
      template += '<div class=\"che-toolbar-control-button\" dropdown-menu=\"'+ dropdownMenu+'\" dropdown-model=\"'
      + dropdownModel+'\" dropdown-onchange=\"' + dropdownOnchange+'\" dropdown-item-label=\"name\"><md-icon md-font-icon=\"fa fa-ellipsis-v\"></md-icon></div>';

   /* template += "<i class=\"material-design icon-ic_filter_list_24px\" dropdown-menu=\"listProjectsCtrl.dropDownOptionsList\" " +
    "dropdown-model=\"listProjectsCtrl.dropDownValue\" dropdown-onchange=\"listProjectsCtrl.dropDownSelected(selected)\"" +
    ></i>";*/

    }

    if (buttonName) {
      template = template + '<a class=\"che-toolbar-control-button\" title=\"' + buttonName + '\" href=\"' + buttonHref + '\"';

      if (buttonHrefTarget) {
        template = template + ' target=\"' + buttonHrefTarget + '\"';
      }

      template = template + '><md-icon md-font-icon=\"fa fa-plus\"></md-icon></a>';
    }
    template = template + '<ng-transclude></ng-transclude>';


    template = template + '</div>'
    + '</div>'
    + '<div layout=\"row\" class=\"che-toolbar-subheader\">';
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
    + '</md-toolbar></div>';

    return template;
  }

}

