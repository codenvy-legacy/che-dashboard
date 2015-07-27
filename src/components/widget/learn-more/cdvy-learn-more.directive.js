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
 * @name components.directive:cdvyLearnMore
 * @restrict E
 * @function
 * @element
 *
 * @description
 * `<cdvy-learn-more>` defines a learn more component.
 *
 * @author Florent Benoit
 */
class CodenvyLearnMore {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
    this.restrict = 'E';
    //this.replace= true;
    //this.transclude= true;
    this.bindToController = true;


    this.controller = 'CodenvyLearnMoreCtrl';
    this.controllerAs = 'codenvyLearnMoreCtrl';

    this.scope = {
      title: '@cdvyTitle'
    };
  }


  /**
   * Template for the current toolbar
   * @param element
   * @param attrs
   * @returns {string} the template
   */
  template(element, attrs) {

    // keep the current value into the attributes
    attrs['$cdvyLearnMoreTemplate'] = element.html();

    var template = '<md-card class="cdvy-learn-more-panel" md-theme="default">'
      + '<div layout="row" class="cdvy-learn-more-titlebox" layout-align="start center">'
      + '<div class="cdvy-learn-more-title" layout="row" layout-align="start center">' + '{{codenvyLearnMoreCtrl.title}}</div>'
      + '<span flex></span></div>'
      + '<md-card-content><cdvy-learn-more-wrapper layout-sm="column" layout-md="column" layout-gt-md="row">'
      + '<cdvy-learn-more-data ng-hide="true"></cdvy-learn-more-data>'
      + '<cdvy-learn-more-titles layout="column">'
      + '<cdvy-learn-more-title-container ng-class="codenvyLearnMoreCtrl.isSelectedItem({{item.index}}) ? '
      + '\'cdvy-learn-more-title-container-selected\' : \'cdvy-learn-more-title-container-unselected\'"'
      + ' ng-repeat="item in codenvyLearnMoreCtrl.items"><cdvy-learn-more-title ng-click="codenvyLearnMoreCtrl.setCurrentIndex(item.index)">'
      + '<md-icon md-svg-src="assets/images/completed.svg" class="cdvy-learn-more-item-completeted-box" ng-show="codenvyLearnMoreCtrl.isItemCompleted(item.key)"></md-icon>'
      + '<md-icon md-svg-src="assets/images/to-complete.svg" class="cdvy-learn-more-item-to-complete-box" ng-hide="codenvyLearnMoreCtrl.isItemCompleted(item.key)">'
      + '</md-icon>{{item.title}}</cdvy-learn-more-title></<cdvy-learn-more-title-container>'
      + '</cdvy-learn-more-titles>'
      + '<cdvy-learn-more-contents flex><cdvy-learn-more-content ng-show="codenvyLearnMoreCtrl.isSelectedItem({{item.index}})" ng-repeat="item in codenvyLearnMoreCtrl.items">'
      + '<div layout="column" layout-align="center center" cdvy-learn-more-template="::item.content" cdvy-scope="::item.parent" ></div></cdvy-learn-more-content></cdvy-learn-more-contents>'
      + '</cdvy-learn-more-wrapper></md-card-content></md-card>';
    return template;
  }


}

export default CodenvyLearnMore;

Register.getInstance().directive('cdvyLearnMore', CodenvyLearnMore);
