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

export var defaultRecipeScript = '# This is a template for your machine recipe.\n' +
  '# Uncomment instructions that you want to use and replace them with yours.\n' +
  '# Inherit from a base image. This can be a Codenvy verified image or any base image you can find at Docker Hub.\n' +
  '# FROM dockerHubUser/yourImage\n' +
  '# Expose ports. All processes running in a Docker container should be access from outside.\n' +
  '# EXPOSE 8080\n' +
  '# Run instructions are identical to commands in your local Unix terminal.\n' +
  '# RUN echo \'hello world\'\n' +
  '# Map application port to the IDE client.\n';
