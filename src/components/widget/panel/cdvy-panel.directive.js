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
 * `<cdvy-panel>` defines a panel used to insert data.
 *
 * @param {string=} cdvy-title the title of the panel
 * @param {string=} cdvy-title-icon icon prefixing the panel's title
 *
 * @usage
 *   <cdvy-panel cdvy-title="hello"></cdvy-panel>
 *
 * @example
 <example module="userDashboard">
 <file name="index.html">
 <cdvy-panel cdvy-title-icon="fa fa-lock" cdvy-title="hello">This is simple text</cdvy-panel>
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
    this.bindToController = true;


    this.controller = 'CodenvyPanelCtrl';
    this.controllerAs = 'codenvyPanelCtrl';


    // we require ngModel as we want to use it inside our directive
    this.require = ['ngModel'];
    this.scope = {};


  }


  /**
   * Template for the current toolbar
   * @param element
   * @param attrs
   * @returns {string} the template
   */
  template( element, attrs){
    var template = '<md-card class="cdvy-panel" md-theme="default">'
      + '<div layout="row" class="cdvy-panel-titlebox" layout-align="start center">'
      + '<div class="cdvy-panel-title" layout="row" layout-align="start center">';

    if (attrs['cdvyTitleIcon']) {
      template = template + '<span class="cdvy-panel-title-icon ' + attrs['cdvyTitleIcon'] + '"></span>';
    }

    template = template + attrs['cdvyTitle'] + '</div>'
    + '<span flex></span>'
    + '<i class="{{codenvyPanelCtrl.getToggleIcon()}}" ng-click="codenvyPanelCtrl.toggle()"></i>'
    + '</div>'
    +  '<md-card-content class="cdvy-panel-content" ng-hide="codenvyPanelCtrl.isCollapsed()">'
    +  '<ng-transclude></ng-transclude>'
    +  '</md-card-content>'
    +  '</md-card>';

    return template;
  }



}

export default CodenvyPanel;

Register.getInstance().directive('cdvyPanel', CodenvyPanel);
