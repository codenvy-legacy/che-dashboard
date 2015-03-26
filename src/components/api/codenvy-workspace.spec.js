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
 * Test of the CodenvyWorkspace
 */
describe('CodenvyWorkspace', function(){

  /**
   * Workspace Factory for the test
   */
  var factory;

  /**
   * API builder.
   */
  var apiBuilder;

  /**
   * Backend for handling http operations
   */
  var httpBackend;

  /**
   * Codenvy backend
   */
  var codenvyBackend;

  /**
   * Listener used for the tests
   */
  function Listener() {
    this.workspaces = [];
    this.onChangeWorkspaces = function (remoteWorkspaces) {
      this.workspaces = remoteWorkspaces;
    };
    this.getWorkspaces = function() {
      return this.workspaces;
    };
  }

  /**
   *  setup module
   */
  beforeEach(module('userDashboard'));

  /**
   * Inject factory and http backend
   */
  beforeEach(inject(function(codenvyWorkspace, codenvyAPIBuilder, codenvyHttpBackend) {
    factory = codenvyWorkspace;
    apiBuilder = codenvyAPIBuilder;
    codenvyBackend = codenvyHttpBackend;
    httpBackend = codenvyHttpBackend.getHttpBackend();
  }));

  /**
   * Check assertion after the test
   */
  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  /**
   * Check that we're able to fetch workspaces and calls the listeners
   */
  it('Fetch Workspaces', function() {

      // setup tests objects
      var workspace1 = apiBuilder.getWorkspaceBuilder().withWorkspaceReference(apiBuilder.getWorkspaceReferenceBuilder().withName('testWorkspace').build()).build();
      var tmpWorkspace2 = apiBuilder.getWorkspaceBuilder().withWorkspaceReference(apiBuilder.getWorkspaceReferenceBuilder().withName('tmpWorkspace').withTemporary(true).build()).build();

      // Add the listener
      var listener = new Listener();
      factory.addListener(listener);

      // no workspaces now on factory or on listener
      expect(factory.getWorkspaces().length).toEqual(0);
      expect(listener.getWorkspaces().length).toEqual(0);

      // expecting a GET
      httpBackend.expectGET('/api/workspace/all');

      // providing request
      // add workspaces on Http backend
      codenvyBackend.addWorkspaces([workspace1, tmpWorkspace2]);

      // setup backend
      codenvyBackend.setup();

      // fetch workspaces
      factory.fetchWorkspaces();

      // flush command
      httpBackend.flush();

      // now, check workspaces
      var workspaces = factory.getWorkspaces();

      // check we have only one workspace (temporary workspace is excluded)
      expect(workspaces.length).toEqual(1);

      // check name of the workspace
      var resultWorkspace1 = workspaces[0];
      expect(resultWorkspace1.workspaceReference.name).toEqual(workspace1.workspaceReference.name);

      // check the callback has been called without temporary workspace
      expect(listener.getWorkspaces().length).toEqual(1);
      expect(listener.getWorkspaces()[0].workspaceReference.name).toEqual(workspace1.workspaceReference.name);
    }
  );



});
