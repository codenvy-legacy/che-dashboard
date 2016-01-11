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

/**
 * Tests of the CodenvyWorkspaceBuilder
 * @author Florent Benoit
 */
describe('CodenvyWorkspaceBuilder', function(){


  var wkspBuilder;

  /**
   *  setup module
   */
  beforeEach(module('userDashboard'));


  /**
   * Inject builder
   */
  beforeEach(inject(function(codenvyAPIBuilder) {
    wkspBuilder = codenvyAPIBuilder.getWorkspaceBuilder();
  }));

  /**
   * Check builder
   */
  it('check builder', function() {

    var name = 'hello';
    var workspace = wkspBuilder.withName(name).build();


    // check values
    expect(workspace.name).toEqual(name);

  });


  /**
   * Check builder
   */
  it('check builder 1', function() {

    var name = 'hello';
    var id = 'id1';
    var workspace = wkspBuilder.withName('hello').withId('id1').withTemporary(true).build();


    // check values
    expect(workspace.name).toEqual(name);
    expect(workspace.id).toEqual(id);
    expect(workspace.temporary).toBeTruthy();

  });

  /**
   * Check builder
   */
  it('check builder 2', function() {

    var workspace = wkspBuilder.withTemporary(false).build();

    // check values
    expect(workspace.temporary).toBeFalsy();


  });



});
