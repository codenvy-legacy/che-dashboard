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

var ArtifactDictionary = {
  codenvy: {
    display: 'Codenvy',
    description: 'The file that contains the configuration to run all of the Codenvy nodes. The Codenvy Installer will partition the software onto the appropriate nodes during installation.',
    releaseNotes: 'http://docs.codenvy.com/user/saas-release-notes/'
  },
  'installation-manager-cli': {
    display: "Codenvy Installer",
    description: "Detects new versions of Codenvy software, schedules software downloads, and executes the installation / update process for new software.",
    releaseNotes: 'http://docs.codenvy.com/onpremises/cdec-onpremises-installation-manager-release-notes/'
  }
};

var NodeDictionary = new Map([
    ['puppet_master_host_name', { type: 'Puppet Master' }],
    ['builder_host_name',       { type: 'Main Builder' }],
    ['additional_builders',     { type: 'Additional Builder', unwrap: true }],
    ['runner_host_name',        { type: 'Main Runner' }],
    ['additional_runners',      { type: 'Additional Runner', unwrap: true }],
    ['analytics_host_name',     { type: 'Analytics service' }],
    ['data_host_name',          { type: 'Data service' }],
    ['api_host_name',           { type: 'Api service' }],
    ['site_host_name',          { type: 'Site' }],
    ['datasource_host_name',    { type: 'Datasource service' }],
    ['aio',                     { type: 'All-in-one single node' }]
  ]);

export default { artifacts: ArtifactDictionary, nodes: NodeDictionary };

