 /*jshint unused:false */

/***************

  This file allow to configure a proxy system plugged into BrowserSync
  in order to redirect backend requests while still serving and watching
  files from the web project

  IMPORTANT: The proxy is disabled by default.

  If you want to enable it, watch at the configuration options and finally
  change the `module.exports` at the end of the file

***************/

'use strict';


 var proxy = require('proxy-middleware');
 var url = require('url');


 var proxyOptions = url.parse('http://nightly.codenvy-stg.com/api');
 proxyOptions.route = '/api';
 proxyOptions.preserveHost = false;




/*
 * This is where you activate or not your proxy.
 *
 * The first line activate if and the second one ignored it
 */

module.exports = [proxy(proxyOptions)];
//module.exports = [];
