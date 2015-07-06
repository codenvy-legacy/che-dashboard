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

import AddCreditcardCtrl from '../account/creditcard/add-creditcard.controller';
import AddCreditcard from '../account/creditcard/add-creditcard.directive';
import CreditcardCtrl from '../account/creditcard/creditcard.controller';
import AccountProfile from './profile/account-profile.directive';
import AccountProfileCtrl from './profile/account-profile.controller';
import AccountDelete from '../account/account-delete.directive';
import AccountDeleteCtrl from '../account/account-delete.controller';
import AccountUpdatePassword from '../account/account-update-password.directive';
import AccountCtrl from '../account/account.controller';


class AccountConfig {

  constructor(register) {
    register.controller('CreditcardCtrl', CreditcardCtrl);

    register.controller('AddCreditcardCtrl', AddCreditcardCtrl);
    register.directive('addCreditcard', AddCreditcard);

    register.directive('accountUpdatePassword', AccountUpdatePassword);

    register.controller('AccountProfileCtrl', AccountProfileCtrl);
    register.directive('accountProfile', AccountProfile);

    register.controller('AccountDeleteCtrl', AccountDeleteCtrl);
    register.directive('accountDelete', AccountDelete);

    register.controller('AccountCtrl', AccountCtrl);

    // config routes
    register.app.config(function ($routeProvider) {
      let locationProvider = {
        templateUrl: 'app/navbar/account/account.html',
        controller: 'AccountCtrl',
        controllerAs: 'accountCtrl'
      };

      $routeProvider.accessWhen('/account', locationProvider)
        .accessWhen('/account/:tabName', locationProvider);
    });
  }
}

export default AccountConfig;
