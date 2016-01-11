/*
 * Copyright (c) 2012-2016 Codenvy, S.A.
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
    description: 'The Codenvy On-Prem binary that runs both single-node and multi-node.',
    releaseNotes: 'http://docs.codenvy.com/user/saas-release-notes/'
  },
  'installation-manager-cli': {
    display: 'Codenvy Installer',
    description: 'Detects new versions of Codenvy software, schedules software downloads, and executes the installation / update process for new software.',
    releaseNotes: 'http://docs.codenvy.com/onpremises/cdec-onpremises-installation-manager-release-notes/'
  }
};

var NodeDictionary = new Map();
NodeDictionary.set('puppet_master_host_name', { type: 'Puppet Master' });
NodeDictionary.set('builder_host_name', { type: 'Main Builder' });
NodeDictionary.set('additional_builders', { type: 'Additional Builder', unwrap: true });
NodeDictionary.set('runner_host_name', { type: 'Main Runner' });
NodeDictionary.set('additional_runners', { type: 'Additional Runner', unwrap: true });
NodeDictionary.set('analytics_host_name', { type: 'Analytics service' });
NodeDictionary.set('data_host_name', { type: 'Data service' });
NodeDictionary.set('api_host_name', { type: 'Api service' });
NodeDictionary.set('site_host_name', { type: 'Site' });
NodeDictionary.set('datasource_host_name', { type: 'Datasource service' });
NodeDictionary.set('host_url', { type: 'All-in-one single node' });

export default { artifacts: ArtifactDictionary, nodes: NodeDictionary };

