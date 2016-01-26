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
 * @name components.directive:cdvyLearnMoreItem
 * @restrict E
 * @function
 * @element
 *
 * @description
 * `<cdvy-learn-more>` defines a learn more item.
 *
 * @author Florent Benoit
 */
export class CodenvyLearnMoreItem {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='E';

    this.require = '^cdvyLearnMore';
    this.terminal = true;

    this.scope = {
    };
  }

  /**
   * Defines id of the controller and apply some initial settings
   */

  link(scope, element, attributes, controller) {
    var items = element.parent()[0].getElementsByTagName('cdvy-learn-more-item');
    //console.log('found value set to', items);
    var index = Array.prototype.indexOf.call(items, element[ 0 ]);

    var title = element.find('cdvy-learn-more-item-title').eq(0).remove();
    var content  = element.find('cdvy-learn-more-item-content').eq(0).remove();
    var key = attributes.cdvyLearnMoreKey;

    controller.insertItem({
        scope:    scope,
        parent:   scope.$parent,
        index:    index,
        element:  element,
        key: key,
        content: content.html(),
        title:    title.html()});
  }


}
