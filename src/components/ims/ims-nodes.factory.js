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
import dictionary from './dictionary';

/**
 * This class is handling the interface with Installation Manager Server (IMS) update API.
 */
class ImsNodesApi {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor($http) {

    // remote call
    this.remoteImsAPI = {
      addNode: (node) => $http.post('/im/node', { params: {nodeName: node}}),
      deleteNode: (node) => $http.delete('/im/node', { params: {nodeName: node}}),
      getCodenvyOnPremConfig: () => $http.get('/im/nodes')
    };
  }

  /**
   * Add an (existing and running) node to installation.
   * @param node the fully qualified node name
   */
  addNode(node) {
    let nodeDesc = { nodeName: node };
    return this.remoteImsAPI.addNode(nodeDesc, {});
  }

  /**
   * Remove a node from installation.
   * @param node the fully qualified node name
   */
  deleteNode(node) {
    let nodeDesc = { nodeName: node };
    return this.remoteImsAPI.deleteNode(nodeDesc, {});
  }

  /**
   * Returns Codenvy on-premise installation node list.
   * @returns a promise on an object hostKey => { nodeType, hostname }
   */
  listNodes() {
    let serverPromise = this.remoteImsAPI.getCodenvyOnPremConfig();
    return serverPromise.then(response => this.unwrapNodes(response.data));
  }

  unwrapNodes(nodes) {
    if (! nodes || Object.keys(nodes).length === 0) {
      nodes['aio'] = ''; // how do I get this hostname? $location won't provide me a reliable value
    }
    let result = {};
    for (let key in nodes) {
      if (nodes.hasOwnProperty(key)) {
        let nodeHostname = nodes[key];
        let nodeData = dictionary.nodes.get(key);
        if (nodeData) {
          if (nodeData.unwrap) {
            unwrapNodeSet(result, key, nodeData.type, nodeHostName); // Actually, here nodeHostname is not a hostname but an array
          } else {
            result[key] = { type: nodeData.type, hostname: nodeHostname };
          }
        } else {
          result[key] = { type: 'Unknown Type', hostname: nodeHostname };
        }
      } 
    }
    return result;
  }
  
  unwrapNodeSet(result, key, type, nodeArray) {
    var i = 0;
    for (let hostname of nodeArray) {
      result[`${key}_${i}`] = { type: nodeData.type, hostname: nodeHostname };
      i++;
    }
  }
}

// Register this factory
Register.getInstance().factory('imsNodesApi', ImsNodesApi);
