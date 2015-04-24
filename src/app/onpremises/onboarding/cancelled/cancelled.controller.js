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

class OnPremisesOnboardCancelledPageCtrl {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor($route, OnPremiseAdminOnboardingSrv) {
      this.onBoardingSrv = OnPremiseAdminOnboardingSrv;
      this.cancelCause = $route.current.params.cause;
  }

  nextPage() {
    this.onBoardingSrv.back(this.cancelCause);
  }
}

export default OnPremisesOnboardCancelledPageCtrl;
