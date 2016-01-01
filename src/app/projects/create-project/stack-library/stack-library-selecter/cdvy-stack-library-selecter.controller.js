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


/**
 * This class is handling the controller for the stack selecter (only allowing to select the widget)
 * @author Florent Benoit
 */
class CodenvyStackLibrarySelecterCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($scope) {
    this.$scope = $scope;
  }


  /**
   * perform sharing state in an upper scope as it may be shared
   */
  select(globalSelecterName, name, stack) {
    this.globalSelecterName = globalSelecterName;
    this.$scope.$parent.$parent[globalSelecterName + '.stackLibrarySelecterSelected'] = name;
    this.callbackController.cdvyStackLibrarySelecter(stack);
  }

  /**
   * Gets the selected widget among all widgets of this name
   * @returns {*}
   */
  getSelected() {
    var globalSelecterName = this.$scope.selectName;
    return this.$scope.$parent.$parent[globalSelecterName + '.stackLibrarySelecterSelected'];
  }


  setChoice() {
    this.toggleChoice = 'new-workspace';
  }

  /**
   * when initializing with the first item, send this item to the callback controller
   */
  initValue(isFirst) {
    if (isFirst) {
      this.callbackController.cdvyStackLibrarySelecterDefault(this.stack);
    }
  }

}



export default CodenvyStackLibrarySelecterCtrl;

