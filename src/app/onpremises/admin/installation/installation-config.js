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

import AutomaticUpdatesCtrl from './automatic/automatic.controller';
import AutomaticUpdatesPanel from './automatic/automatic.directive';
import OnPremConfigurationCtrl from './configuration/configuration.controller';
import ConfigurationPanel from './configuration/configuration.directive';
import UpgradeInstallationCtrl from './upgrade/upgrade.controller';
import UpgradeInstallationPanel from './upgrade/upgrade.directive';
import YourInstallationCtrl from './yourinstall/yourinstall.controller';
import YourInstallationPanel from './yourinstall/yourinstall.directive';

class OnPremisesAdminInstallationConfig {

  constructor(register) {

    register.controller('OnPremConfigurationCtrl', OnPremConfigurationCtrl);
    register.controller('UpgradeInstallationCtrl', UpgradeInstallationCtrl);
    register.controller('AutomaticUpdatesCtrl', AutomaticUpdatesCtrl);
    register.controller('YourInstallationCtrl', YourInstallationCtrl);

    register.directive('cdvyOnpremAutoUpdates', AutomaticUpdatesPanel);
    register.directive('cdvyOnpremInstallConfig', ConfigurationPanel);
    register.directive('cdvyOnpremUpgradeInstall', UpgradeInstallationPanel);
    register.directive('cdvyOnpremYourInstall', YourInstallationPanel);
  }
}

export default OnPremisesAdminInstallationConfig;
