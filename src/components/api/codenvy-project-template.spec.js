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
 * Test of the CodenvyProjectTemplate
 */
describe('CodenvyProjectTemplate', function(){

  /**
   * Project Template Factory for the test
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
   *  setup module
   */
  beforeEach(module('userDashboard'));

  /**
   * Inject factory and http backend
   */
  beforeEach(inject(function(codenvyProjectTemplate, codenvyAPIBuilder, codenvyHttpBackend) {
    factory = codenvyProjectTemplate;
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
   * Check that we're able to fetch project types
   */
  it('Fetch project types', function() {

      // setup tests objects
      var templateHelloWorldCli = apiBuilder.getProjectTemplateBuilder()
        .withProjectType('maven')
        .withCategory('Samples - Hello World')
        .withSourceLocation('https://github.com/codenvy-templates/desktop-console-java.git')
        .withSourceType('git')
        .withSourceParameters({branch: '3.1.0', keepVcs: 'false'})
        .withDescription('A simple JAR project based on Maven.')
        .withDisplayname('Maven Java Console')
        .build();

      var templateSwing = apiBuilder.getProjectTemplateBuilder()
        .withProjectType('maven')
        .withCategory('Samples - Hello World')
        .withSourceLocation('https://github.com/codenvy-templates/desktop-swing-java-basic.git')
        .withSourceType('git')
        .withSourceParameters({branch: '3.1.0', keepVcs: 'false'})
        .withDescription('A simple Java Swing application.')
        .withDisplayname('Swing')
        .build();

      var templateUD = apiBuilder.getProjectTemplateBuilder()
        .withProjectType('AngularJS')
        .withCategory('Samples - Codenvy')
        .withSourceLocation('https://github.com/codenvy/user-dashboard.git')
        .withSourceType('git')
        .withSourceParameters({branch: '3.1.0', keepVcs: 'false'})
        .withDescription('Codenvy User Dashboard example..')
        .withDisplayname('User Dashboard')
        .build();

      // providing request
      // add workspaces on Http backend
      codenvyBackend.addProjectTemplates([templateHelloWorldCli, templateSwing, templateUD]);

      // setup backend
      codenvyBackend.setup();

      // no templates now on factory
      expect(factory.getAllProjectTemplates().length).toEqual(0);

      // fetch types
      factory.fetchTemplates();

      // expecting a GET
      httpBackend.expectGET('/api/project-template');

      // flush command
      httpBackend.flush();


      // now, check types
      var projectTemplates = factory.getAllProjectTemplates();
      var templatesByCategory = factory.getTemplatesByCategory();


      // check we have 3 types
      expect(projectTemplates.length).toEqual(3);

      // check category hello world
      var helloWorldCategory = templatesByCategory['Samples - Hello World'];
      expect(helloWorldCategory).not.toBeNull();

      expect(helloWorldCategory.length).toEqual(2);

      var firstType = helloWorldCategory[0];
      expect(firstType.projectType).toEqual(templateHelloWorldCli.projectType);
      expect(firstType.displayName).toEqual(templateHelloWorldCli.displayName);

      var secondType = helloWorldCategory[1];
      expect(secondType.projectType).toEqual(templateSwing.projectType);
      expect(secondType.displayName).toEqual(templateSwing.displayName);


      // check category samples
      var sampleCategory = templatesByCategory['Samples - Codenvy'];
      expect(sampleCategory).not.toBeNull();
      expect(sampleCategory.length).toEqual(1);
      var anotherType = sampleCategory[0];
      expect(anotherType.projectType).toEqual(templateUD.projectType);
      expect(anotherType.displayName).toEqual(templateUD.displayName);


    }
  );



});
