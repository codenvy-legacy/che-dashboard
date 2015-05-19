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

import Register from '../utils/register.js';

/**
 * This class is handling the interface with Installation Manager Server (IMS) update API.
 */
class ImsNodesApi {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor($resource) {

    // remote call
    this.remoteImsAPI = $resource('/im', {}, {
      addNode: { method: 'POST', url: '/im/node?dns=:nodeName' },
      deleteNode: { method: 'DELETE', url: '/im/node?dns=:nodeName' },
      getCodenvyOnPremConfig: { method: 'GET', url: '/im/config/codenvy' }
    });
  }

  /**
   * Add an (existing and running) node to installation.
   * @param node the fully qualified node name
   */
  addNode(node) {
    let nodeDesc = { nodeName: node };
    let request = this.remoteImsAPI.addNode(nodeDesc, {});
    return request.$promise;
  }

  /**
   * Remove a node from installation.
   * @param node the fully qualified node name
   */
  deleteNode(node) {
    let nodeDesc = { nodeName: node };
    let request = this.remoteImsAPI.deleteNode(nodeDesc, {});
    return request.$promise;
  }

  /**
   * Returns Codenvy on-premise installation node list.
   */
  listNodes() {
    let request = this.remoteImsAPI.getCodenvyOnPremConfig();
    return request.$promise;
  }
}

// Register this factory
Register.getInstance().factory('imsNodesApi', ImsNodesApi);
