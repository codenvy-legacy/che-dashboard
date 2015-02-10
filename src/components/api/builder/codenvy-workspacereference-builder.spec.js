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

/**
 * Tests of the CodenvyWorkspaceReferenceBuilder
 * @author Florent Benoit
 */
describe('CodenvyWorkspaceReferenceBuilder', function(){


  var builder;

  /**
   *  setup module
   */
  beforeEach(module('userDashboard'));


  /**
   * Inject builder
   */
  beforeEach(inject(function(codenvyAPIBuilder) {
    builder = codenvyAPIBuilder.getWorkspaceReferenceBuilder();
  }));

  /**
   * Check builder
   */
  it('check builder 1', function() {

    var name = 'hello';
    var id = 'id1';
    var workspaceReference = builder.withName('hello').withId('id1').withTemporary(true).build();


    // check values
    expect(workspaceReference.name).toEqual(name);
    expect(workspaceReference.id).toEqual(id);
    expect(workspaceReference.temporary).toBeTruthy();

  });

  /**
   * Check builder
   */
  it('check builder 2', function() {

    var workspaceReference = builder.withTemporary(false).build();

    // check values
    expect(workspaceReference.temporary).toBeFalsy();


  });


});
