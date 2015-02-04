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
   *  setup module
   */
  beforeEach(module('userDashboard'));

  /**
   * Inject factory and http backend
   */
  beforeEach(inject(function(codenvyProject, $httpBackend) {
    factory = codenvyProject;
    httpBackend = $httpBackend;
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
      var workspace1 = {workspaceReference : {name : 'testWorkspace1', id: 'idOfMyWorkspace1'}};
      var wksp1Project1 = {name: 'project-wk1-1'};
      var wksp1Project2 = {name: 'project-wk1-2'};
      var workspace2 = {workspaceReference : {name : 'testWorkspace2', id: 'idOfMyWorkspace2'}};
      var wksp2Project1 = {name: 'project-wk2-1'};


      // no projects now
      expect(factory.getAllProjects().length).toEqual(0);

      // expecting a GET
      httpBackend.expectGET('/api/project/idOfMyWorkspace1');
      httpBackend.expectGET('/api/project/idOfMyWorkspace2');

      // providing request
      httpBackend.when('GET', '/api/project/idOfMyWorkspace1').respond([wksp1Project1, wksp1Project2]);
      httpBackend.when('GET', '/api/project/idOfMyWorkspace2').respond([wksp2Project1]);


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
      var projectsByWorkspace = factory.getProjectsByWorkspace();
      expect(projectsByWorkspace.size).toEqual(2);

      var projectsOfWorkspace1 = projectsByWorkspace.get('idOfMyWorkspace1');
      var projectsOfWorkspace2 = projectsByWorkspace.get('idOfMyWorkspace2');
      expect(projectsOfWorkspace1.length).toEqual(2);
      expect(projectsOfWorkspace1[0].name).toEqual(wksp1Project1.name);
      expect(projectsOfWorkspace1[1].name).toEqual(wksp1Project2.name);

      expect(projectsOfWorkspace2.length).toEqual(1);
      expect(projectsOfWorkspace2[0].name).toEqual(wksp2Project1.name);

    }
  );



});
