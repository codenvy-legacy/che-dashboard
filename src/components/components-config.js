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

/*exported CodenvyAPI, WidgetConfig, AttributeConfig, GitHub, CodeMirror, CodenvyNotification, CheBranding, RoutingRedirect, OnBoarding,
 CreateProjectGitValidator, UniqueProjectNameValidator, CodenvyIdeFetcher, RouteHistory */

import CodenvyAPI from './api/codenvy-api.factory';
import WidgetConfig from './widget/widget-config';
import AttributeConfig from './attribute/attribute-config';

// import Routing components
import RoutingRedirect from './routing/routing-redirect.factory';
import RouteHistory from './routing/route-history.service';

// import GitHub services
import GitHub from './github/github-service';

// import custom codemirror
import CodeMirror from './codemirror/codemirror';

// import custom notification
import CodenvyNotification from './notification/codenvy-notification.factory';

// import OnBoarding
import OnBoarding from './onboarding/onboarding.factory';

import CreateProjectGitValidator from './validator/git-url-validator.directive';
import UniqueProjectNameValidator from './validator/unique-project-name-validator.directive';

// import CheBranding
import CheBranding from './branding/che-branding.factory';

import CodenvyIdeFetcher from './ide-fetcher/codenvy-ide-fetcher.service';


// Inport IMS API definition
import './ims/imsapi-config';
