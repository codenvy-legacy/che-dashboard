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

/*exported CodenvyProjectTemplateBuilder */

/**
 * This class is providing a builder for ProjectTemplate
 * @author Florent Benoit
 */
class CodenvyProjectTypeBuilder {

  constructor() {
    this.type = {};
    this.type.attributeDescriptors = [];

  }

  withAttributeDescriptors(attributeDescriptors) {
    this.type.attributeDescriptors = attributeDescriptors;
    return this;
  }

  withDisplayname(name) {
  this.type.displayName = name;
    return this;
  }

  withId(id) {
    this.type.id = id;
    return this;
  }

  build() {
    return this.type;
  }


}

export default CodenvyProjectTypeBuilder;
