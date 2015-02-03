'use strict';

import Register from '../utils/register.js';
import CodenvyProject from './codenvy-project.factory.js';
import CodenvyWorkspace from './codenvy-workspace.factory.js';

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
  constructor (codenvyProject, codenvyWorkspace) {
    this.codenvyProject = codenvyProject;
    this.codenvyWorkspace = codenvyWorkspace;

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

}

export default CodenvyAPI;

// Register this factory
Register.getInstance().factory('codenvyAPI', CodenvyAPI);
