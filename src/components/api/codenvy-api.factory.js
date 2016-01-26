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


/**
 * This class is providing the entry point for accessing to Codenvy API
 * It handles workspaces, projects, etc.
 * @author Florent Benoit
 */
export class CodenvyAPI {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor(codenvyProject, codenvyWorkspace, codenvyFactory, codenvyAccount, codenvyAnalytics, codenvySaas, codenvyUser, codenvyPayment,
              codenvyProfile, codenvyProjectType, codenvyProjectTemplate, codenvyWebsocket, codenvyGit, codenvySvn, codenvyFactoryTemplate,
              codenvyAnalyticsSession, codenvyService, codenvyAdminPlugins, codenvyAdminService, codenvyRecipe,
              codenvyRecipeTemplate, codenvyStack) {
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
    this.codenvyService = codenvyService;
    this.codenvyAdminPlugins = codenvyAdminPlugins;
    this.codenvyAdminService = codenvyAdminService;
    this.codenvyRecipe = codenvyRecipe;
    this.codenvyRecipeTemplate = codenvyRecipeTemplate;
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
   * @returns {CodenvyRecipe|*}
   */
  getRecipe() {
    return this.codenvyRecipe;
  }

  /**
   * The Codenvy Recipe Template API
   * @returns {CodenvyRecipeTemplate|*}
   */
  getRecipeTemplate() {
    return this.codenvyRecipeTemplate;
  }


  /**
   * The Codenvy Stack API
   * @returns {CodenvyAPI.codenvyStack|*}
   */
  getStack() {
    return this.codenvyStack;
  }
}
