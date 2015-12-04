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
 * @name components.directive:cdvyAutoScroll
 * @restrict A
 * @function
 * @element
 *
 * @description
 * `cdvy-auto-scroll` defines an attribute for auto scrolling to the bottom of the element applied.
 *
 * @usage
 *   <text-area cdvy-auto-scroll></text-area>
 *
 * @author Florent Benoit
 */
class CodenvyAutoScroll {

    /**
     * Default constructor that is using resource
     * @ngInject for Dependency injection
     */
    constructor($timeout) {
        this.$timeout = $timeout;
        this.restrict = 'A';
    }

    /**
     * Keep reference to the model controller
     */
    link($scope, element, attr) {
        $scope.$watch(attr.ngModel, () => {
            this.$timeout(() => {
                element[0].scrollTop = element[0].scrollHeight;
            });
        });
    }

}

export default CodenvyAutoScroll;

Register.getInstance().directive('cdvyAutoScroll', CodenvyAutoScroll);