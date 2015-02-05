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


 var proxy = require('proxy-middleware');
 var url = require('url');


 var proxyOptions = url.parse('http://nightly.codenvy-stg.com/api');
 //var proxyOptions = url.parse('https://codenvy.com/api');
 proxyOptions.route = '/api';
 proxyOptions.preserveHost = false;




/*
 * Enable proxy
 */

module.exports = [proxy(proxyOptions)];
