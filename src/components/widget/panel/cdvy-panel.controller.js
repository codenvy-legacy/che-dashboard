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
 * @ngdoc controller
 * @name components.controller:CodenvyPanelCtrl
 * @description This class is handling the controller of a panel
 * @author Florent Benoit
 */
class CodenvyPanelCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($scope) {
    this.collapse = false;


    // in lock mode, we're unable to toggle and see the content
    this.locked = false;

    this.id = '';


    this.$scope = $scope;

  }

  /**
   * Sets the id
   * @param id
   */
  setId(id) {
    this.id = id;

    // listener on events
    this.$scope.$on('cdvyPanel:toggle', (event, data) => {
      if (data === this.id) {
        this.toggle();
      }
    });

    this.$scope.$on('cdvyPanel:lock', (event, data) => {
      if (data === this.id) {
        this.lock();
      }
    });

    this.$scope.$on('cdvyPanel:collapse', (event, data) => {
      if (data === this.id) {
        this.collapse = true;
      }
    });

    this.$scope.$on('cdvyPanel:disabled', (event, data) => {
      if (data && (data.id === this.id)) {
        this.disabled = data.disabled;
      }
    });
  }


  /**
   * @returns true if the panel is collapsed.
   */
  isCollapsed() {
    return this.collapse;
  }

  /**
   * Toggle the collapsed mode
   */
  toggle() {
    this.collapse = !this.collapse;
  }

  /**
   * @returns {string} the icon to display
   */
  getToggleIcon() {
    if (this.locked) {
      return '';
    }

    if (this.isCollapsed()) {
      return 'material-design icon-ic_add_24px';
    } else {
      return 'material-design icon-ic_keyboard_arrow_down_24px';
    }
  }

  lock() {
    this.collapse = true;
    this.locked = true;
  }


}


export default CodenvyPanelCtrl;

Register.getInstance().controller('CodenvyPanelCtrl', CodenvyPanelCtrl);
