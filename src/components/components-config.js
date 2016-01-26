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

// components
import {ApiConfig} from './api/codenvy-api-config';
import {AttributeConfig} from './attribute/attribute-config';
import {CheBrandingConfig} from './branding/che-branding-config';
import {CodeMirrorConstant} from './codemirror/codemirror';
import {GitHubService} from './github/github-service';
import {CodenvyIdeFetcherConfig} from './ide-fetcher/codenvy-ide-fetcher-config';
import {ImsApiConfig} from './ims/imsapi-config';
import {CodenvyNotificationConfig} from './notification/codenvy-notification-config';
import {OnBoardingConfig} from './onboarding/onboarding-config';
import {RoutingConfig} from './routing/routing-config';
import {ValidatorConfig} from './validator/validator-config';
import {WidgetConfig} from './widget/widget-config';

export class ComponentsConfig {

  constructor(register) {
    new ApiConfig(register);
    new AttributeConfig(register);
    new CheBrandingConfig(register);
    new CodeMirrorConstant(register);
    new GitHubService(register);
    new CodenvyIdeFetcherConfig(register);
    new ImsApiConfig(register);
    new CodenvyNotificationConfig(register);
    new OnBoardingConfig(register);
    new RoutingConfig(register);
    new ValidatorConfig(register);
    new WidgetConfig(register);

  }
}
