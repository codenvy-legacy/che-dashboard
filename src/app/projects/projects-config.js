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

import CreateProjectCtrl from './create-project/create-project.controller';
import ListProjectsCtrl from './list-projects/list-projects.controller';
import ListProjectsWorkspaceFilter from './list-projects/list-projects-filter-workspace.filter';
import CreateProjectGithubCtrl from './create-project/github/create-project-github.controller';
import CreateProjectBlank from './create-project/blank/create-project-blank.directive';
import CreateProjectBlankCtrl from './create-project/blank/create-project-blank.controller';
import CreateProjectGit from './create-project/git/create-project-git.directive';
import CreateProjectGitCtrl from './create-project/git/create-project-git.controller';
import CreateProjectGithub from './create-project/github/create-project-github.directive';
import CreateProjectSamplesCtrl from './create-project/samples/create-project-samples.controller';
import CreateProjectSamples from './create-project/samples/create-project-samples.directive';
import CreateProjectSamplesFilter from './create-project/samples/create-project-samples.filter';
import CreateProjectZip from './create-project/zip/create-project-zip.directive';
import CreateProjectConfFile from './create-project/config-file/create-project-conf-file.directive';
import ProjectDetailsCtrl from './project-details/project-details.controller';
import ProjectDetailsDevelopersCtrl from './project-details/developers/project-details-developers.controller';
import ProjectDetailsDevelopers from './project-details/developers/project-details-developers.directive';
import ProjectDetailsDevelopersDialogAddCtrl from './project-details/developers/project-details-developers-dialog-add.controller';
import ProjectRepositoryConfig from './project-details/repository/project-repository-config';
import CodenvyProjectItem from './list-projects/project-item/project-item.directive';


class ProjectConfig {

  constructor(register) {
    register.controller('ListProjectsCtrl', ListProjectsCtrl);

    register.controller('ProjectDetailsCtrl', ProjectDetailsCtrl);

    register.controller('ProjectDetailsDevelopersDialogAddCtrl', ProjectDetailsDevelopersDialogAddCtrl);

    register.controller('CreateProjectBlankCtrl', CreateProjectBlankCtrl);
    register.directive('createProjectBlank', CreateProjectBlank);

    register.controller('CreateProjectGitCtrl', CreateProjectGitCtrl);
    register.directive('createProjectGit', CreateProjectGit);

    register.controller('CreateProjectGithubCtrl', CreateProjectGithubCtrl);
    register.directive('createProjectGithub', CreateProjectGithub);

    register.controller('CreateProjectSamplesCtrl', CreateProjectSamplesCtrl);
    register.directive('createProjectSamples', CreateProjectSamples);

    register.controller('ProjectDetailsDevelopersCtrl', ProjectDetailsDevelopersCtrl);
    register.directive('projectDetailsDevelopers', ProjectDetailsDevelopers);

    register.directive('createProjectZip', CreateProjectZip);

    register.directive('createProjectConfFile', CreateProjectConfFile);

    register.controller('CreateProjectCtrl', CreateProjectCtrl);

    register.directive('cdvyProjectItem', CodenvyProjectItem);

    // config routes
    register.app.config(function ($routeProvider) {
      $routeProvider.accessWhen('/projects', {
        templateUrl: 'app/projects/list-projects/list-projects.html',
        controller: 'ListProjectsCtrl',
        controllerAs: 'listProjectsCtrl'
      })
        .accessWhen('/project/:workspaceId/:projectName', {
          templateUrl: 'app/projects/project-details/project-details.html',
          controller: 'ProjectDetailsCtrl',
          controllerAs: 'projectDetailsCtrl'
        })
        .accessWhen('/create-project', {
          templateUrl: 'app/projects/create-project/create-project.html',
          controller: 'CreateProjectCtrl',
          controllerAs: 'createProjectCtrl'
        });

    });

    // config files
    new ProjectRepositoryConfig(register);

  }
}


export default ProjectConfig;
