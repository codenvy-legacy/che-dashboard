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
import CreateProjectGithubCtrl from './create-project/github/create-project-github.controller';
import CreateProjectBlank from './create-project/blank/create-project-blank.directive';
import CreateProjectGit from './create-project/git/create-project-git.directive';
import CreateProjectGithub from './create-project/github/create-project-github.directive';
import CreateProjectZip from './create-project/zip/create-project-zip.directive';
import CreateProjectConfFile from './create-project/config-file/create-project-conf-file.directive';
import ProjectDetailsCtrl from './project-details/project-details.controller';

class ProjectConfig {

  constructor(register) {
    register.directive('createProjectConfFile', CreateProjectConfFile);
    register.directive('createProjectBlank', CreateProjectBlank);
    register.directive('createProjectZip', CreateProjectZip);
    register.directive('createProjectGit', CreateProjectGit);
    register.directive('createProjectGithub', CreateProjectGithub);
    register.controller('CreateProjectCtrl', CreateProjectCtrl);
    register.controller('ListProjectsCtrl', ListProjectsCtrl);
    register.controller('CreateProjectGithubCtrl', CreateProjectGithubCtrl);
    register.controller('ProjectDetailsCtrl', ProjectDetailsCtrl);


  }
}

export default ProjectConfig;
