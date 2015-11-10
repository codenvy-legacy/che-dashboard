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
 * This class is handling the controller for the simple selecter (only allowing to select the widget)
 * @author Florent Benoit
 */
class CodenvySimpleSelecterCtrl {

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
  select(globalSelecterName, name) {
    this.globalSelecterName = globalSelecterName;
    this.$scope.$parent.$parent[globalSelecterName + '.selecterSelected'] = name;
    this.callbackController.cdvySimpleSelecter(name);
  }

  /**
   * Gets the selected widget among all widgets of this name
   * @returns {*}
   */
  getSelected() {
    var globalSelecterName = this.$scope.selectName;
    return this.$scope.$parent.$parent[globalSelecterName + '.selecterSelected'];
  }



  /**
   * Event when select operation is called
   * @param category the key of t
   * @param values
   */
  onChangeType(key) {

    // look at the model and define the value
    if (this.$scope.valueModel) {

      // notify callbacks
      this.$scope.callbackController.cdvySimpleSelecter(key);
    }

  }

}



export default CodenvySimpleSelecterCtrl;

Register.getInstance().controller('CodenvySimpleSelecterCtrl', CodenvySimpleSelecterCtrl);
