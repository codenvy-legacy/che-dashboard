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
/*exported CodenvyProject, CodenvyWorkspace, CodenvyFactory, CodenvyUser, CodenvyProjectType, CodenvyProfile, CodenvyProjectTemplate, CodenvyAPIBuilder, CodenvyHttpBackend, CodenvyHttpBackendProviderFactory */


import Register from '../utils/register';
import CodenvyAPIBuilder from './builder/codenvy-api-builder.factory';
import CodenvyHttpBackendFactory from './test/codenvy-http-backend.factory';
import CodenvyHttpBackendProviderFactory from './test/codenvy-http-backend-provider.factory';

import CodenvyProject from './codenvy-project.factory';
import CodenvyWorkspace from './codenvy-workspace.factory';
import CodenvyUser from './codenvy-user.factory';
import CodenvyProfile from './codenvy-profile.factory';
import CodenvyFactory from './codenvy-factory.factory';
import CodenvyProjectType from './codenvy-project-type.factory';
import CodenvyProjectTemplate from './codenvy-project-template.factory';
import CodenvyWebsocket from './codenvy-websocket.factory';

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
  constructor (codenvyProject, codenvyWorkspace, codenvyFactory, codenvyUser, codenvyProfile, codenvyProjectType, codenvyProjectTemplate, codenvyWebsocket) {
    this.codenvyProject = codenvyProject;
    this.codenvyWorkspace = codenvyWorkspace;
    this.codenvyFactory = codenvyFactory;
    this.codenvyUser = codenvyUser;
    this.codenvyProfile = codenvyProfile;
    this.codenvyProjectType = codenvyProjectType;
    this.codenvyProjectTemplate = codenvyProjectTemplate;
    this.codenvyWebsocket = codenvyWebsocket;

    // register listener of projects onto workspaces
    this.codenvyWorkspace.addListener(this.codenvyProject);
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
   * @returns {CodenvyAPI.codenvyProject|*}
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

}

export default CodenvyAPI;

// Register this factory
Register.getInstance().factory('codenvyAPI', CodenvyAPI);
