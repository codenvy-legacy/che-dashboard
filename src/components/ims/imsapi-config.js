/*
 * Copyright (c) 2015-2016 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 */
'use strict';

import {ImsArtifactApi} from './ims-artifact.factory';
import {ImsConfigApi} from './ims-config.factory';
import {ImsSaasAuthApi} from './ims-saasauth.factory';
import {ImsSubscriptionApi} from './ims-subscription.factory';
import {ImsUpdateApi} from './ims-update.factory';
import {ImsNodesApi} from './ims-nodes.factory';
import {ImsPropertiesApi} from './ims-properties.factory';
import {ImsEventLoggingApi} from './ims-eventlogging.factory';


export class ImsApiConfig {

  constructor(register) {
    register.factory('imsArtifactApi', ImsArtifactApi);
    register.factory('imsConfigApi', ImsConfigApi);

    register.factory('imsSaasAuthApi', ImsSaasAuthApi);

    register.factory('imsSubscriptionApi', ImsSubscriptionApi);

    register.factory('imsUpdateApi', ImsUpdateApi);

    register.factory('imsNodesApi', ImsNodesApi);

    register.factory('imsPropertiesApi', ImsPropertiesApi);

    register.factory('imsEventLoggingApi', ImsEventLoggingApi);

  }
}
