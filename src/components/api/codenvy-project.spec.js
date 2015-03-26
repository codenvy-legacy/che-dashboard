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

describe('CodenvyProject', function(){

  /**
   * Project Factory for the test
   */
  var factory;

  /**
   * Backend for handling http operations
   */
  var httpBackend;

  /**
   * Codenvy backend
   */
  var codenvyBackend;

  /**
   * API builder.
   */
  var apiBuilder;


  /**
   *  setup module
   */
  beforeEach(module('userDashboard'));

  /**
   * Inject factory and http backend
   */
  beforeEach(inject(function(codenvyProject, codenvyAPIBuilder, codenvyHttpBackend) {
    factory = codenvyProject;
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
   * Check that we're able to fetch projects
   */
  it('On Change Workspaces', function() {


      // setup tests objects
      var idWorkspace1 = 'idOfMyWorkspace1';
      var idWorkspace2 = 'idOfMyWorkspace2';

      var workspace1 = apiBuilder.getWorkspaceBuilder().withWorkspaceReference(apiBuilder.getWorkspaceReferenceBuilder().withName('testWorkspace1').withId(idWorkspace1).build()).build();
      var workspace2 = apiBuilder.getWorkspaceBuilder().withWorkspaceReference(apiBuilder.getWorkspaceReferenceBuilder().withName('testWorkspace2').withId(idWorkspace2).build()).build();

      var wksp1Project1 = apiBuilder.getProjectReferenceBuilder().withName('project-wk1-1').build();
      var wksp1Project2 = apiBuilder.getProjectReferenceBuilder().withName('project-wk1-2').build();
      var wksp2Project1 = apiBuilder.getProjectReferenceBuilder().withName('project-wk2-1').build();

      // add into backend
      codenvyBackend.addProjects(workspace1, [wksp1Project1, wksp1Project2]);
      codenvyBackend.addProjects(workspace2, [wksp2Project1]);

      // setup backend
      codenvyBackend.setup();

      // no projects now
      expect(factory.getAllProjects().length).toEqual(0);

      // expecting a GET
      httpBackend.expectGET('/api/project/' + idWorkspace1);
      httpBackend.expectGET('/api/project/' + idWorkspace2);

      // update projects workspaces
      factory.onChangeWorkspaces([workspace1, workspace2]);

      // flush command
      httpBackend.flush();

      // check we have projects now (2 from wks 1 and 1 from wks 2)
      var receivedProjects = factory.getAllProjects();
      expect(receivedProjects.length).toEqual(3);

      // check names
      expect(receivedProjects[0].name).toEqual(wksp1Project1.name);
      expect(receivedProjects[1].name).toEqual(wksp1Project2.name);
      expect(receivedProjects[2].name).toEqual(wksp2Project1.name);


      // check map
      var projectsByWorkspace = factory.getProjectsByWorkspaceMap();
      expect(projectsByWorkspace.size).toEqual(2);

      var projectsOfWorkspace1 = projectsByWorkspace.get(idWorkspace1);
      var projectsOfWorkspace2 = projectsByWorkspace.get(idWorkspace2);
      expect(projectsOfWorkspace1.length).toEqual(2);
      expect(projectsOfWorkspace1[0].name).toEqual(wksp1Project1.name);
      expect(projectsOfWorkspace1[1].name).toEqual(wksp1Project2.name);

      expect(projectsOfWorkspace2.length).toEqual(1);
      expect(projectsOfWorkspace2[0].name).toEqual(wksp2Project1.name);

    }
  );



});
