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

exports.projectsList = function(){



  angular.module('userDashboardMock', ['userDashboard', 'ngMockE2E'])
    .run(function ($httpBackend, codenvyAPIBuilder) {


      // setup tests objects
      var idWorkspace1 = 'idFlorent';
      var idWorkspace2 = 'idStevan';

      var nameWorkspace1 = 'florent';
      var nameWorkspace2 = 'stevan';

      var workspace1 = codenvyAPIBuilder.getWorkspaceBuilder().withWorkspaceReference(codenvyAPIBuilder.getWorkspaceReferenceBuilder().withName(nameWorkspace1).withId(idWorkspace1).build()).build();
      var workspace2 = codenvyAPIBuilder.getWorkspaceBuilder().withWorkspaceReference(codenvyAPIBuilder.getWorkspaceReferenceBuilder().withName(nameWorkspace2).withId(idWorkspace2).build()).build();

      var wksp1Project1 = codenvyAPIBuilder.getProjectReferenceBuilder().withName('project-wk1-1').build();
      var wksp1Project2 = codenvyAPIBuilder.getProjectReferenceBuilder().withName('project-wk1-2').build();
      var wksp2Project1 = codenvyAPIBuilder.getProjectReferenceBuilder().withName('project-wk2-1').build();


      // add the remote call
      $httpBackend.whenGET('/api/workspace/all').respond([workspace1, workspace2]);
      $httpBackend.whenGET('/api/project/' + idWorkspace1).respond([wksp1Project1, wksp1Project2]);
      $httpBackend.whenGET('/api/project/' + idWorkspace2).respond([wksp2Project1]);

      $httpBackend.whenGET(new RegExp('components.*')).passThrough();
      $httpBackend.whenGET(new RegExp('^app.*')).passThrough();

    });
};



exports.projectsList2 = function(){



  angular.module('userDashboardMock', ['userDashboard', 'ngMockE2E'])
    .run(function ($httpBackend, codenvyAPIBuilder) {


      // setup tests objects
      var idWorkspace1 = 'idFlorent';

      var nameWorkspace1 = 'florent';

      var workspace1 = codenvyAPIBuilder.getWorkspaceBuilder().withWorkspaceReference(codenvyAPIBuilder.getWorkspaceReferenceBuilder().withName(nameWorkspace1).withId(idWorkspace1).build()).build();

      var wksp1Project1 = codenvyAPIBuilder.getProjectReferenceBuilder().withName('project-wk1-1').build();
      var wksp1Project2 = codenvyAPIBuilder.getProjectReferenceBuilder().withName('project-wk1-2').build();


      // add the remote call
      $httpBackend.whenGET('/api/workspace/all').respond([workspace1]);
      $httpBackend.whenGET('/api/project/' + idWorkspace1).respond([wksp1Project1, wksp1Project2]);

      $httpBackend.whenGET(new RegExp('components.*')).passThrough();
      $httpBackend.whenGET(new RegExp('^app.*')).passThrough();

    });
};
