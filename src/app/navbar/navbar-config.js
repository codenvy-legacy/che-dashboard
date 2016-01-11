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

import NavBarCtrl from '../navbar/navbar.controller';
import NavBar from '../navbar/navbar.directive.js';
import NavBarSelectedCtrl from '../navbar/navbar-selected.controller.js';
import NavBarSelected from '../navbar/navbar-selected.directive.js';
import HelpCtrl from '../navbar/help/help.controller.js';
import HelpWidget from '../navbar/help/help.directive.js';
import LogoutCtrl from '../navbar/logout/logout.controller.js';
import LogoutWidget from '../navbar/logout/logout.directive.js';

class NavbarConfig {

  constructor(register) {
    register.controller('NavbarCtrl', NavBarCtrl);
    register.controller('HelpCtrl', HelpCtrl);
    register.controller('LogoutCtrl', LogoutCtrl);
    register.controller('NavBarSelectedCtrl', NavBarSelectedCtrl);
    register.directive('cdvyNavBar', NavBar);
    register.directive('navBarSelected', NavBarSelected);
    register.directive('helpWidget', HelpWidget);
    register.directive('logoutWidget', LogoutWidget);
  }
}


export default NavbarConfig;
