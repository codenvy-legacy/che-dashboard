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
 * Defines a directive for the stack library selecter.
 * @author Florent Benoit
 */
class CodenvyStackLibrarySelecter {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';
    this.templateUrl = 'app/workspaces/create-workspace/select-stack/stack-library/stack-library-selecter/cdvy-stack-library-selecter.html';

    // scope values
    this.scope = {
      title: '@cdvyTitle',
      text: '@cdvyText',
      extraText: '@cdvyExtraText',
      stackId: '@cdvyStackId',
      isActive: '=cdvyIsActive',
      isSelect: '=cdvyIsSelect'
    };
  }

  link($scope) {
    //select item
    $scope.select = () => {
      $scope.$emit('event:selectStackId', $scope.stackId);
    };
  }

}

export default CodenvyStackLibrarySelecter;

