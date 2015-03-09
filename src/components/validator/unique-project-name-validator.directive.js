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

import Register from '../utils/register';

/**
 * Defines a directive for checking if the project name is not already taken
 * @author Florent Benoit
 */
class UniqueProjectNameValidator {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor (codenvyAPI, $q) {
    this.codenvyAPI = codenvyAPI;
    this.$q = $q;
    this.restrict='A';
    this.require = "ngModel";
  }

  /**
   * Check that the GIT URL is compliant
   */
  link($scope, element, attributes, ngModel) {

    // validate only input element
    if ('input' === element[0].localName) {

      ngModel.$asyncValidators.uniqueProjectName = (modelValue) => {

        // create promise
        var deferred = this.$q.defer()

        // parent scope ?
        var scopingTest = $scope.$parent;
        if (!scopingTest) {
          scopingTest = $scope;
        }

        var selectedWorkspace = scopingTest.$eval(attributes.uniqueProjectName);

        // found a selected workspace ?
        if (selectedWorkspace) {
          // check if project is there
          var map = this.codenvyAPI.getProject().getProjectsByWorkspaceMap();


          var projectsWorkspace = map.get(selectedWorkspace.workspaceReference.id);
          for (let i = 0; i < projectsWorkspace.length; i++) {
            let project = projectsWorkspace[i];
            if (modelValue === project.name) {
              // project there so already exists, return false
              deferred.reject(false);
            }

          }
          deferred.resolve(true);
        } else {
          // unable to perform the check so return false
          deferred.reject(false);
        }

        // return promise
        return deferred.promise;
      }
    }
  }


}

export default UniqueProjectNameValidator;

Register.getInstance().directive('uniqueProjectName', UniqueProjectNameValidator);
