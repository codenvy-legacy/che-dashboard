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
 * Defines a directive for creating text info container.
 * @author Oleksii Orel
 */
class CodenvyTextInfo {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
    this.restrict = 'E';
    this.replace = true;
    this.transclude = false;
    this.templateUrl = 'components/widget/text-info/cdvy-text-info.html';

    // scope values
    this.scope = {
      textValue: '=cdvyText',
      hrefValue: '=cdvyHref',
      labelName: '@cdvyLabelName',
      copyClipboard: '@cdvyCopyClipboard'
    };

  }

}

export default CodenvyTextInfo;

Register.getInstance().directive('cdvyTextInfo', CodenvyTextInfo);
