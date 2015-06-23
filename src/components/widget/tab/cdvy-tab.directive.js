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
 * Defines a directive for creating sub menu tab.
 * @author Oleksii Orel
 */
class CodenvyTab {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
    this.restrict = 'E';
    this.replace = true;
    this.transclude = true;
    this.templateUrl = 'components/widget/tab/cdvy-tab.html';

    // scope values
    this.scope = {
      title: '@cdvyTitle',
      icon: '@cdvyIcon'
    };

  }


  compile(element, attrs) {
    var keys = Object.keys(attrs);

    // search the input field
    var tabElement = element.find('md-tab');

    keys.forEach((key) => {

      // don't reapply internal properties
      if (key.indexOf('$') === 0) {
        return;
      }
      // don't reapply internal element properties
      if (key.indexOf('cdvy') === 0) {
        return;
      }
      // avoid model
      if (key.indexOf('ngModel') === 0) {
        return;
      }
      var value = attrs[key];

      // handle empty values as boolean
      if (value === '') {
        value = 'true';
      }

      // set the value of the attribute
      tabElement.attr(attrs.$attr[key], value);

    });
  }

  /**
   * Performs a manual transclude of the element
   * @param transclude the transcluded element
   */
  link($scope, element, attrs, ctrl, transclude) {

    // root mdTabs
    var mdTabsElement = element.closest('md-tabs');

    // current tab ID
    var mdTabItem = element[0].querySelectorAll('md-tab')[0];
    var mdTabId = mdTabItem.getAttribute('id');

    // now search the md tab content
    var mdTabContent = angular.element(mdTabsElement[0].querySelectorAll('div[id*=content_' + mdTabId + ']'));

    // Append the transcluded element in the tab content element
    transclude((clone) => {
      mdTabContent.append(clone);
    });
  }

}

export default CodenvyTab;

Register.getInstance().directive('cdvyTab', CodenvyTab);
