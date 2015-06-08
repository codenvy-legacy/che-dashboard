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

import OnPremisesAdminBridgeConfig from './bridge/bridge-config';
import OnPremisesAdminInstallationConfig from './installation/installation-config';
import OnPremisesAdminNavbarConfig from './navbar/admin-navbar-config';

class OnPremisesAdminConfig {

  constructor(register) {
    new OnPremisesAdminBridgeConfig(register);
    new OnPremisesAdminInstallationConfig(register);
    new OnPremisesAdminNavbarConfig(register);
  }
}

export default OnPremisesAdminConfig;
