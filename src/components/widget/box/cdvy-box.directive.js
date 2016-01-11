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
 * @ngdoc directive
 * @name components.directive:cdvyBox
 * @restrict E
 * @function
 * @element
 *
 * @description
 * `<cdvy-box>` defines a box used to insert data.
 *
 * @param {string=} cdvy-title the title of the panel
 * @param {string=} cdvy-title-icon icon font prefixing the panel's title
 * @param {string=} cdvy-title-svg-icon path to SVG image used as panel's title
 * @param {boolean=} cdvy-title-background ti specify the background color of the title
 *
 * @usage
 *   <cdvy-box cdvy-title="hello"></cdvy-panel>
 *
 * @example
 <example module="userDashboard">
 <file name="index.html">
 <cdvy-box cdvy-title-icon="fa fa-lock" cdvy-title="hello">This is simple text</cdvy-box>
 </file>
 </example>
 * @author Florent Benoit
 */
class CodenvyBox {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict = 'E';
    this.transclude = true;
    this.bindToController = true;


    this.controller = 'CodenvyBoxCtrl';
    this.controllerAs = 'codenvyBoxCtrl';

    this.scope = {
      svgIcon: '@cdvyTitleSvgIcon',
      title: '@cdvyTitle'
    };
  }


  /**
   * Template for the current toolbar
   * @param element
   * @param attrs
   * @returns {string} the template
   */
  template( element, attrs){
    var template = '<md-card class="cdvy-box';
    if (attrs['cdvyBoxTheme']) {
      template = template + ' cdvy-box-title-bg-' + attrs['cdvyBoxTheme'];
    }
    template = template + '" md-theme="default">';

    if (attrs['cdvyTitle']) {
      template = template + '<div layout="row" class="cdvy-box-titlebox" layout-align="start center"><div class="cdvy-box-title" layout="row" layout-align="start center">';


      if (attrs['cdvyTitleIcon']) {
        template = template + '<span class="cdvy-box-title-icon ' + attrs['cdvyTitleIcon'] + '"></span>';
      }
      if (attrs['cdvyTitleSvgIcon']) {
        template = template + '<md-icon md-svg-src="' + '{{codenvyBoxCtrl.svgIcon}}' + '"></md-icon>';
      }


      template = template + '{{codenvyBoxCtrl.title}}</div>'
      + '<span flex></span>';


      template = template  + '</div>';
    }
    template = template
    +  '<md-card-content class="cdvy-box-content">'
    +  '<ng-transclude></ng-transclude>'
    +  '</md-card-content>'
    +  '</md-card>';

    return template;
  }



}

export default CodenvyBox;

Register.getInstance().directive('cdvyBox', CodenvyBox);
