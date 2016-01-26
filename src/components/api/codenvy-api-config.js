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

import {CodenvyAPI} from './codenvy-api.factory';
import {CodenvyAPIBuilder} from './builder/codenvy-api-builder.factory';
import {CodenvyAccount} from './codenvy-account.factory';
import {CodenvyService} from './codenvy-service.factory';
import {CodenvyProject} from './codenvy-project.factory';
import {CodenvyWorkspace} from './codenvy-workspace.factory';
import {CodenvyUser} from './codenvy-user.factory';
import {CodenvyAdminService} from './codenvy-admin-service.factory';
import {CodenvyHttpBackend} from './test/codenvy-http-backend';
import {CodenvyHttpBackendProviderFactory} from './test/codenvy-http-backend-provider.factory'
import {CodenvyHttpBackendFactory} from './test/codenvy-http-backend.factory';
import {CodenvyAnalytics} from './codenvy-analytics.factory';
import {CodenvySaas} from './codenvy-saas.factory';
import {CodenvyPayment} from './codenvy-payment.factory';
import {CodenvyProfile} from './codenvy-profile.factory';
import {CodenvyFactory} from './codenvy-factory.factory';
import {CodenvyProjectType} from './codenvy-project-type.factory';
import {CodenvyProjectTemplate} from './codenvy-project-template.factory';
import {CodenvyWebsocket} from './codenvy-websocket.factory';
import {CodenvyGit} from './codenvy-git.factory';
import {CodenvySvn} from './codenvy-svn.factory';
import {CodenvyFactoryTemplate} from './codenvy-factory-template.factory';
import {CodenvyAnalyticsSession} from './codenvy-analytics-session.factory';
import {CodenvyAdminPlugins} from './codenvy-admin-plugins.factory';
import {CodenvyRecipe} from './codenvy-recipe.factory';
import {CodenvyRecipeTemplate} from './codenvy-recipe-template.factory';
import {CodenvyStack} from './codenvy-stack.factory';

export class ApiConfig {

  constructor(register) {
    register.factory('codenvyAdminService', CodenvyAdminService);
    register.factory('codenvyService', CodenvyService);
    register.factory('codenvyProject', CodenvyProject);
    register.factory('codenvyWorkspace', CodenvyWorkspace);
    register.factory('codenvyUser', CodenvyUser);
    register.factory('codenvyAccount', CodenvyAccount);
    register.factory('codenvyAnalytics', CodenvyAnalytics);
    register.factory('codenvySaas', CodenvySaas);

    register.factory('codenvyPayment', CodenvyPayment);
    register.app.constant('clientTokenPath', '/');//is necessary for Braintree

    register.factory('codenvyProfile', CodenvyProfile);
    register.factory('codenvyFactory', CodenvyFactory);
    register.factory('codenvyProjectType', CodenvyProjectType);

    register.factory('codenvyProjectTemplate', CodenvyProjectTemplate);


    register.factory('codenvyWebsocket', CodenvyWebsocket);
    register.factory('codenvyGit', CodenvyGit);
    register.factory('codenvySvn', CodenvySvn);

    register.factory('codenvyFactoryTemplate', CodenvyFactoryTemplate);

    register.factory('codenvyAnalyticsSession', CodenvyAnalyticsSession);

    register.factory('codenvyAdminPlugins', CodenvyAdminPlugins);

    register.factory('codenvyRecipe', CodenvyRecipe);

    register.factory('codenvyRecipeTemplate', CodenvyRecipeTemplate);
    register.factory('codenvyStack', CodenvyStack);


    register.factory('codenvyHttpBackendProvider', CodenvyHttpBackendProviderFactory);
    register.factory('codenvyHttpBackend', CodenvyHttpBackendFactory);
    //register.factory('codenvyHttpBackend', CodenvyHttpBackend);

    register.factory('codenvyAPI', CodenvyAPI);
    register.factory('codenvyAPIBuilder', CodenvyAPIBuilder);

  }
}
