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

/**
 * Tests of the CodenvyWorkspaceBuilder
 * @author Florent Benoit
 */
describe('CodenvyWorkspaceBuilder', function(){


  var apiBuilder;

  /**
   *  setup module
   */
  beforeEach(module('userDashboard'));


  /**
   * Inject builder
   */
  beforeEach(inject(function(codenvyAPIBuilder) {
    apiBuilder = codenvyAPIBuilder;
  }));

  /**
   * Check builder
   */
  it('check builder', function() {

    var wkspBuilder = apiBuilder.getWorkspaceBuilder();
    var wkspRefBuilder = apiBuilder.getWorkspaceReferenceBuilder();

    var name = 'hello';
    var workspace = wkspBuilder.withWorkspaceReference(wkspRefBuilder.withName(name).build()).build();


    // check values
    expect(workspace.workspaceReference.name).toEqual(name);

  });



});
