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

import NavBarCtrl from '../navbar/navbar.controller';
import NavBar from '../navbar/navbar.directive.js';
import NavBarSelected from '../navbar/navbar-selected.directive.js';
import UdBetaWidget from '../navbar/ud-beta-widget.directive.js';

class NavbarConfig {

  constructor(register) {
    register.controller('NavbarCtrl', NavBarCtrl);
    register.directive('cdvyNavBar', NavBar);
    register.directive('navBarSelected', NavBarSelected);
    register.directive('udBetaWidget', UdBetaWidget);
  }
}


export default NavbarConfig;
