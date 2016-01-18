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
 * @name navbar.selected.directive:NavBarSelected
 * @description This class is adding a CSS class when element is clicked
 * @author Florent Benoit
 */
class NavBarSelected {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor ($rootScope) {
    this.$rootScope = $rootScope;
    this.restrict = 'A';
    this.replace = false;
    this.controller = 'NavBarSelectedCtrl';
    this.controllerAs = 'navBarSelectedCtrl';
    this.bindToController = true;

    $rootScope.$on('navbar-selected:clear', () => {
        if (this.$rootScope.selectedNavBarElement) {
            this.$rootScope.selectedNavBarElement.removeClass('cdvy-navbar-selected');
        }
    });
  }


  /**
   * Monitor click
   */
  link($scope, element, attrs, controller) {
    element.bind('click', () => {

      // if there is a previous selected element, unselect it
      if (this.$rootScope.selectedNavBarElement) {
        this.$rootScope.selectedNavBarElement.removeClass('cdvy-navbar-selected');
      }

      controller.close();

      // select the new element
      this.$rootScope.selectedNavBarElement = element;
      // add the class
      element.addClass('cdvy-navbar-selected');

    });

  }


}

export default NavBarSelected;
