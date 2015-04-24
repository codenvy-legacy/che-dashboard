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

class OnPremisesOnboardAgreementPageCtrl {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor(OnPremiseAdminOnboardingSrv) {
    this.onBoardingSrv = OnPremiseAdminOnboardingSrv;
  }

  accept() {
    this.onBoardingSrv.nextPage('agreement');
  }

  decline() {
    this.onBoardingSrv.cancel('agreement');
  }
}

export default OnPremisesOnboardAgreementPageCtrl;
