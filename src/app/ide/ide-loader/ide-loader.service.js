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

/*global $:false

 */
/**
 * Defines a service for displaying loader before displaying the IDE.
 * @author Florent Benoit
 */
class IdeLoaderSvc {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor ($timeout) {
    this.isLoaderAdded = false;
    this.$timeout = $timeout;

  }


  addLoader() {
    if (!this.isLoaderAdded) {
      this.isLoaderAdded = true;
        // The new element to be added
        var $div = $('<ide-loader id="ide-loader" class="ide-loader-window" ng-hide="hideIdeLoader"></ide-loader>');

        // The parent of the new element
        var $target = $('body');

        this.$timeout(() => {
          angular.element($target).injector().invoke(($compile) => {
            var $scope = angular.element($target).scope();
            $target.append($compile($div)($scope));
            // Finally, refresh the watch expressions in the new element
            $scope.$apply();
          });
        }, 500);
    }
  }


}

export default IdeLoaderSvc;

