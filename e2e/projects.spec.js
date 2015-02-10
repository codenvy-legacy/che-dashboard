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


describe('The projects view', function () {
  var projectsPage;


  var projectsMock;

  beforeEach(function () {
    
    browser.driver.sleep(1500);
    projectsPage = require('./projects.po.js');
    projectsMock = require('./projects-http.mock');
  });


  it('should include my 2 workspaces', function() {
    browser.addMockModule('userDashboardMock', projectsMock.projectsList);
    browser.get('http://localhost:5000/#/projects');
    browser.waitForAngular();

    expect(projectsPage.projectsWorkspaceElements.count()).toEqual(2);

  });

  it('should include only 1 workspace', function() {
    browser.addMockModule('userDashboardMock', projectsMock.projectsList2);
    browser.get('http://localhost:5000/#/projects');
    browser.waitForAngular();

    expect(projectsPage.projectsWorkspaceElements.count()).toEqual(1);

  });

});
