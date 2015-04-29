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

class OnPremConfigurationCtrl {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor() {

    this.editorOptions = {
      lineWrapping: true,
      lineNumbers: true,
      mode: 'text/plain',
      lint: false,
      foldgutter: false,
      matchBrackets: true,
      autoCloseBrackets: true,
      styleActiveLine: true,
      theme: 'codenvy'
    };
  }

}

export default OnPremConfigurationCtrl;
