/*******************************************************************************
 * Copyright (c) 2015 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 *******************************************************************************/

'use strict';
/*exported CodenvyProject, CodenvyWorkspace, CodenvyFactory, CodenvyUser, CodenvyAPIBuilder, CodenvyHttpBackend, CodenvyHttpBackendProviderFactory */


import Register from '../utils/register';
import CodenvyProject from './codenvy-project.factory';
import CodenvyWorkspace from './codenvy-workspace.factory';
import CodenvyUser from './codenvy-user.factory';
import CodenvyFactory from './codenvy-factory.factory';
import CodenvyAPIBuilder from './builder/codenvy-api-builder.factory';
import CodenvyHttpBackend from './test/codenvy-http-backend.factory';
import CodenvyHttpBackendProviderFactory from './test/codenvy-http-backend-provider.factory';

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
  constructor (codenvyProject, codenvyWorkspace, codenvyFactory, codenvyUser) {
    this.codenvyProject = codenvyProject;
    this.codenvyWorkspace = codenvyWorkspace;
    this.codenvyFactory = codenvyFactory;
    this.codenvyUser = codenvyUser;

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

}

export default CodenvyAPI;

// Register this factory
Register.getInstance().factory('codenvyAPI', CodenvyAPI);
