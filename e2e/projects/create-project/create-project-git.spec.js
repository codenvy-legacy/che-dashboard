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


describe('Create project using git TAB', function () {
  var createProjectsPage;

  var createProjectMock;

  beforeEach(function () {
    createProjectsPage = require('./create-project.po.js');
    createProjectMock = require('./create-project-http.mock');
  });


  it('launch browser', function() {
    browser.get('http://localhost:5000/');
    browser.waitForAngular();

  });


  it('Check setting git URL', function() {
    browser.addMockModule('userDashboardMock', createProjectMock.initialList);
    browser.get('http://localhost:5000/#/create-project');
    browser.waitForAngular();

    // click on next
    createProjectsPage.tabNextPaginator.click();
    browser.sleep(1000);

    expect(createProjectsPage.gitTab.isDisplayed()).toBe(true);

    // click on the git tab
    createProjectsPage.gitTab.click();

    // get input element
    var gitInputElement = createProjectsPage.gitUrlInput;

    // check that input is invalid
    expect(gitInputElement.getAttribute('class')).toMatch('ng-invalid');
    expect(gitInputElement.getAttribute('class')).toContain('ng-invalid-git-url', 'ng-invalid-required');

    // we can see the input element of git
    expect(gitInputElement.isDisplayed()).toBe(true);


    // check we have a dummy name and not user-dashboard already
    expect(createProjectsPage.projectInformationName.getAttribute('value')).not.toEqual('user-dashboard');

    // generated project name should start with project-<projecttype>
    expect(createProjectsPage.projectInformationName.getAttribute('value')).toContain('project-blank-');


    // now enter a valid URL
    gitInputElement.sendKeys('https://github.com/codenvy/user-dashboard');

    // check it's now valid
    expect(gitInputElement.getAttribute('class')).toContain('ng-valid-required', 'ng-valid', 'ng-valid-git-url');


    // now we want to also check that project name has been automatically setup
    expect(createProjectsPage.projectInformationName.getAttribute('value')).toEqual('user-dashboard');

  });

});
