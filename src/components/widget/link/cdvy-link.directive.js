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
 * Defines the link component.
 */
class CodenvyLink {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict = 'E';
    this.bindToController = true;
  }

  /**
   * Template for the link component.
   * @param element
   * @param attrs
   * @returns {string} the template
   */
  template( element, attrs) {
    let linkText = attrs['cdvyLinkText'] || '';
    let destination = attrs.ngHref ? `ng-href="${attrs.ngHref}"` : '';
    let target = attrs.target ? `target="${attrs.target}"` : '';

    var template = `<md-button md-theme="default" class="cdvy-link md-primary md-no-ink md-hue-2" ${destination} ${target}>${linkText}</md-button>`;

    return template;
  }


}

export default CodenvyLink;

Register.getInstance().directive('cdvyLink', CodenvyLink);
