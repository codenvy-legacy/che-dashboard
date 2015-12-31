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
/*exported CodenvyProject, CodenvyWorkspace, CodenvyFactory, CodenvyUser, CodenvyProjectType, CodenvyProfile, CodenvyProjectTemplate,
 CodenvyAPIBuilder, CodenvyHttpBackend, CodenvyHttpBackendFactory, CodenvyHttpBackendProviderFactory, CodenvyAccount, CodenvyAnalytics,
 CodenvySaas, CodenvyPayment, CodenvyWebsocket, CodenvyGit, CodenvySvn, CodenvyFactoryTemplate, CodenvyAnalyticsSession, CodenvyRunner,
 CodenvyService, CodenvyAdminPlugins, CodenvyAdminService, CodenvyRecipe, CodenvyStack */


import Register from '../utils/register';
import CodenvyAPIBuilder from './builder/codenvy-api-builder.factory';
import CodenvyHttpBackendFactory from './test/codenvy-http-backend.factory';
import CodenvyHttpBackendProviderFactory from './test/codenvy-http-backend-provider.factory';

import CodenvyProject from './codenvy-project.factory';
import CodenvyWorkspace from './codenvy-workspace.factory';
import CodenvyUser from './codenvy-user.factory';
import CodenvyAccount from './codenvy-account.factory';
import CodenvyAnalytics from './codenvy-analytics.factory';
import CodenvySaas from './codenvy-saas.factory';
import CodenvyPayment from './codenvy-payment.factory';
import CodenvyProfile from './codenvy-profile.factory';
import CodenvyFactory from './codenvy-factory.factory';
import CodenvyProjectType from './codenvy-project-type.factory';
import CodenvyProjectTemplate from './codenvy-project-template.factory';
import CodenvyWebsocket from './codenvy-websocket.factory';
import CodenvyGit from './codenvy-git.factory';
import CodenvyRunner from './codenvy-runner.factory';
import CodenvySvn from './codenvy-svn.factory';
import CodenvyFactoryTemplate from './codenvy-factory-template.factory';
import CodenvyAnalyticsSession from './codenvy-analytics-session.factory';
import CodenvyService from './codenvy-service.factory';
import CodenvyAdminPlugins from './codenvy-admin-plugins.factory';
import CodenvyAdminService from './codenvy-admin-service.factory';
import CodenvyRecipe from './codenvy-recipe.factory';
import CodenvyStack from './codenvy-stack.factory';


/**
 * This class is providing the entry point for accessing to Codenvy API
 * It handles workspaces, projects, etc.
 * @author Florent Benoit
 */
class CodenvyAPI {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor(codenvyProject, codenvyWorkspace, codenvyFactory, codenvyAccount, codenvyAnalytics, codenvySaas, codenvyUser, codenvyPayment,
              codenvyProfile, codenvyProjectType, codenvyProjectTemplate, codenvyWebsocket, codenvyGit, codenvySvn, codenvyFactoryTemplate,
              codenvyAnalyticsSession, codenvyRunner, codenvyService, codenvyAdminPlugins, codenvyAdminService, codenvyRecipe, codenvyStack) {
    this.codenvyProject = codenvyProject;
    this.codenvyWorkspace = codenvyWorkspace;
    this.codenvyFactory = codenvyFactory;
    this.codenvyAccount = codenvyAccount;
    this.codenvyAnalytics = codenvyAnalytics;
    this.codenvySaas = codenvySaas;
    this.codenvyUser = codenvyUser;
    this.codenvyPayment = codenvyPayment;
    this.codenvyProfile = codenvyProfile;
    this.codenvyProjectType = codenvyProjectType;
    this.codenvyProjectTemplate = codenvyProjectTemplate;
    this.codenvyWebsocket = codenvyWebsocket;
    this.codenvyGit = codenvyGit;
    this.codenvySvn = codenvySvn;
    this.codenvyFactoryTemplate = codenvyFactoryTemplate;
    this.codenvyAnalyticsSession = codenvyAnalyticsSession;
    this.codenvyRunner = codenvyRunner;
    this.codenvyService = codenvyService;
    this.codenvyAdminPlugins = codenvyAdminPlugins;
    this.codenvyAdminService = codenvyAdminService;
    this.codenvyRecipe = codenvyRecipe;
    this.codenvyStack = codenvyStack;

    // register listener of projects onto workspaces
    this.codenvyWorkspace.addListener(this.codenvyProject);
  }




  /**
   * The Codenvy Account API
   * @returns {CodenvyAPI.codenvyAccount|*}
   */
  getAccount() {
    return this.codenvyAccount;
  }

  getAnalytics() {
    return this.codenvyAnalytics;
  }

  /**
   * The Codenvy Saas API
   * @returns {CodenvyAPI.codenvySaas|*}
   */
  getSaas() {
    return this.codenvySaas;
  }

  /**
   * The Codenvy Payment API
   * @returns {CodenvyAPI.codenvyPayment|*}
   */
  getPayment() {
    return this.codenvyPayment;
  }

  /**
   * The Codenvy Project API
   * @returns {CodenvyAPI.codenvyProject|*}
   */
  getProject() {
    return this.codenvyProject;
  }

  /**
   * The Codenvy Workspace API
   * @returns {CodenvyAPI.codenvyWorkspace|*}
   */
  getWorkspace() {
    return this.codenvyWorkspace;
  }

  /**
   * The Codenvy Factory API
   * @returns {codenvyFactory|*}
   */
  getFactory() {
    return this.codenvyFactory;
  }

  /**
   * The Codenvy Factory Template API
   * @returns {CodenvyFactoryTemplate|*}
   */
  getFactoryTemplate() {
    return this.codenvyFactoryTemplate;
  }

  /**
   * The Codenvy User API
   * @returns {CodenvyUser|*}
   */
  getUser() {
    return this.codenvyUser;
  }

  /**
   * The Codenvy Profile API
   * @returns {CodenvyProfile|*}
   */
  getProfile() {
    return this.codenvyProfile;
  }

  /**
   * The Codenvy Project Type API
   * @returns {CodenvyProjectType|*}
   */
  getProjectType() {
    return this.codenvyProjectType;
  }

  /**
   * The Codenvy Project Template API
   * @returns {CodenvyProjectTemplate|*}
   */
  getProjectTemplate() {
    return this.codenvyProjectTemplate;
  }

  /**
   * The Codenvy Websocket API
   * @returns {CodenvyWebsocket|*}
   */
  getWebsocket() {
    return this.codenvyWebsocket;
  }

  /**
   * The Codenvy Runner
   * @returns {CodenvyRunner|*}
   */
  getRunner() {
    return this.codenvyRunner;
  }

  /**
   * The Codenvy Git API
   * @returns {CodenvyGit|*}
   */
  getGit() {
    return this.codenvyGit;
  }

  /**
   * The Codenvy Svn API
   * @returns {CodenvySvn|*}
   */
  getSvn() {
    return this.codenvySvn;
  }

  /**
   * The Codenvy Services API
   * @returns {CodenvyService|*}
   */
  getService() {
    return this.codenvyService;
  }

  /**
   * The Codenvy Admin Services API
   * @returns {CodenvyAdminService|*}
   */
  getAdminService() {
    return this.codenvyAdminService;
  }


  /**
   * The Codenvy Admin plugins API
   * @returns {CodenvyAdminPlugins|*}
   */
  getAdminPlugins() {
    return this.codenvyAdminPlugins;
  }

  /**
   * The Codenvy Recipe API
   * @returns {CodenvyAPI.codenvyRecipe|*}
   */
  getRecipe() {
    return this.codenvyRecipe;
  }

  /**
   * The Codenvy Stack API
   * @returns {CodenvyAPI.codenvyStack|*}
   */
  getStack() {
    return this.codenvyStack;
  }
}

export default CodenvyAPI;

// Register this factory
Register.getInstance().factory('codenvyAPI', CodenvyAPI);
