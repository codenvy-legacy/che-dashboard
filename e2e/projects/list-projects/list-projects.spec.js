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
  var listProjectsPage;


  var projectsMock;

  beforeEach(function () {
    listProjectsPage = require('./list-projects.po.js');
    projectsMock = require('./list-projects-http.mock');
  });


  it('launch browser', function() {
    browser.get('http://localhost:5000/');
    browser.waitForAngular();

  });


  it('should include my 2 workspaces', function() {
    browser.addMockModule('userDashboardMock', projectsMock.projectsList);
    browser.get('http://localhost:5000/#/projects');
    browser.waitForAngular();

    expect(listProjectsPage.projectsWorkspaceElements.count()).toEqual(2);

  });

  it('should include only 1 workspace', function() {
    browser.addMockModule('userDashboardMock', projectsMock.projectsList2);
    browser.get('http://localhost:5000/#/projects');
    browser.waitForAngular();

    expect(listProjectsPage.projectsWorkspaceElements.count()).toEqual(1);
    expect(listProjectsPage.projectElements.count()).toEqual(2);
    expect(listProjectsPage.noProjectsLabel.isDisplayed()).toBe(false);
  });

  it('should not have any projects', function() {
    browser.addMockModule('userDashboardMock', projectsMock.emptyProjectsList);
    browser.get('http://localhost:5000/#/projects');
    browser.waitForAngular();

    expect(listProjectsPage.projectsWorkspaceElements.count()).toEqual(1);
    expect(listProjectsPage.projectElements.count()).toEqual(0);
    expect(listProjectsPage.noProjectsLabel.isDisplayed()).toBe(true);
  });


  it('Manage workspace filter: click on chechbox and look that it disappear/appear', function() {
    // use 2 workspaces
    browser.addMockModule('userDashboardMock', projectsMock.projectsList);
    browser.get('http://localhost:5000/#/projects');
    browser.waitForAngular();


    // check that we have 2 projects
    expect(listProjectsPage.projectsWorkspaceElements.count()).toEqual(2);

    // click on the cog
    listProjectsPage.cogElement.click();

    // click on the 'workspace filtering element'
    listProjectsPage.dropDownWorkspaceElement.click();

    // click on checkbox that remove a workspace
    listProjectsPage.filterWorkspacePanelFistCheckBox.click();

    // check that we have 1 projects
    expect(listProjectsPage.projectsWorkspaceElements.count()).toEqual(1);

    // click again on the checkbox
    listProjectsPage.filterWorkspacePanelFistCheckBox.click();

    // it's there again
    expect(listProjectsPage.projectsWorkspaceElements.count()).toEqual(2);

    // now click on all the checkboxes
    listProjectsPage.filterWorkspacePanelAllCheckBoxes.click();

    // it should be empty
    expect(listProjectsPage.projectsWorkspaceElements.count()).toEqual(0);

    // now click on all the checkboxes
    listProjectsPage.filterWorkspacePanelAllCheckBoxes.click();

    // it's there again
    expect(listProjectsPage.projectsWorkspaceElements.count()).toEqual(2);
  });

});
