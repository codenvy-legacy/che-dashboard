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
/*exported CodenvyWorkspaceReferenceBuilder */


import Register from '../../utils/register';
import CodenvyWorkspaceReferenceBuilder from './codenvy-workspacereference-builder';
import CodenvyWorkspaceBuilder from './codenvy-workspace-builder';
import CodenvyProjectReferenceBuilder from './codenvy-projectreference-builder';

/**
 * This class is providing the entry point for accessing the builders
 * @author Florent Benoit
 */
class CodenvyAPIBuilder {

  /**
   * Default constructor
   * @ngInject for Dependency injection
   */
  constructor () {
  }

  /**
   * The Codenvy Workspace Reference builder
   * @returns {CodenvyAPI.codenvyProject|*}
   */
  getWorkspaceReferenceBuilder() {
    return new CodenvyWorkspaceReferenceBuilder();
  }

  /**
   * The Codenvy Workspace builder
   * @returns {CodenvyWorkspaceBuilder}
   */
  getWorkspaceBuilder() {
    return new CodenvyWorkspaceBuilder();
  }


  /***
   * The Codenvy Project Reference builder
   * @returns {CodenvyProjectReferenceBuilder}
   */
  getProjectReferenceBuilder() {
    return new CodenvyProjectReferenceBuilder();
  }


}

export default CodenvyAPIBuilder;

// Register this factory
Register.getInstance().factory('codenvyAPIBuilder', CodenvyAPIBuilder);
