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

/*exported CodenvyWorkspaceReferenceBuilder */

/**
 * This class is providing a builder for WorkspaceReferences
 * @author Florent Benoit
 */
class CodenvyWorkspaceReferenceBuilder {

  constructor() {
    this.workspaceReference = {};
  }


  withName(name) {
    this.workspaceReference.name = name;
    return this;
  }

  withId(id) {
    this.workspaceReference.id = id;
    return this;
  }

  withTemporary(temporary) {
    this.workspaceReference.temporary = temporary;
    return this;
  }

  build() {
    return this.workspaceReference;
  }


}

export default CodenvyWorkspaceReferenceBuilder;
