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
/*exported CodenvyWorkspaceReferenceBuilder */


import Register from '../../utils/register';
import CodenvyWorkspaceReferenceBuilder from './codenvy-workspacereference-builder';
import CodenvyWorkspaceBuilder from './codenvy-workspace-builder';
import CodenvyProjectReferenceBuilder from './codenvy-projectreference-builder';
import CodenvyProjectDetailsBuilder from './codenvy-projectdetails-builder';
import CodenvyProjectPermissionsBuilder from './codenvy-projectpermissions-builder';
import CodenvyProjectTypeBuilder from './codenvy-projecttype-builder';
import CodenvyProjectTemplateBuilder from './codenvy-projecttemplate-builder';
import CodenvyProjectTypeAttributeDescriptorBuilder from './codenvy-projecttype-attribute-descriptor-builder';
import CodenvyProfileBuilder from './codenvy-profile-builder.js';
import CodenvyUserBuilder from './codenvy-user-builder.js';
import CodenvyAccountBuilder from './codenvy-account-builder.js';
import CodenvyMembershipBuilder from './codenvy-membership-builder.js';

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
   * The Codenvy Account builder
   * @returns {CodenvyAPI.codenvyAccount|*}
   */
  getAccountBuilder() {
    return new CodenvyAccountBuilder();
  }

  /**
   * The Codenvy Membership builder
   * @returns {CodenvyAPI.codenvyMembership|*}
   */
  getUserMembershipBuilder() {
    return new CodenvyMembershipBuilder();
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
   * The Codenvy Profile builder
   * @returns {CodenvyProfileBuilder}
   */
  getProfileBuilder() {
    return new CodenvyProfileBuilder();
  }

  /***
   * The Codenvy Project Reference builder
   * @returns {CodenvyProjectReferenceBuilder}
   */
  getProjectReferenceBuilder() {
    return new CodenvyProjectReferenceBuilder();
  }


  /***
   * The Codenvy Project Details builder
   * @returns {CodenvyProjectDetailsBuilder}
   */
  getProjectDetailsBuilder() {
    return new CodenvyProjectDetailsBuilder();
  }



  /***
   * The Codenvy Project Permission builder
   * @returns {CodenvyProjectPermissionsBuilder}
   */
  getProjectPermissionsBuilder() {
    return new CodenvyProjectPermissionsBuilder();
  }


  /***
   * The Codenvy Project Template builder
   * @returns {CodenvyProjectTemplateBuilder}
   */
  getProjectTemplateBuilder() {
    return new CodenvyProjectTemplateBuilder();
  }

  /***
   * The Codenvy Project Type builder
   * @returns {CodenvyProjectTypeBuilder}
   */
  getProjectTypeBuilder() {
    return new CodenvyProjectTypeBuilder();
  }

  /**
   * Attribute descriptor builder
   * @returns {CodenvyProjectTypeAttributeDescriptorBuilder}
   */
  getProjectTypeAttributeDescriptorBuilder() {
    return new CodenvyProjectTypeAttributeDescriptorBuilder();
  }

  /***
   * The Codenvy User builder
   * @returns {CodenvyUserBuilder}
   */
  getUserBuilder() {
    return new CodenvyUserBuilder();
  }



}

export default CodenvyAPIBuilder;

// Register this factory
Register.getInstance().factory('codenvyAPIBuilder', CodenvyAPIBuilder);
