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

/**
 * This class is handling the controller for the creating stack library projects
 * @author Florent Benoit
 */
class CreateProjectStackLibraryCtrl {

    /**
     * Default constructor that is using resource
     * @ngInject for Dependency injection
     */
    constructor(codenvyStack, codenvyWorkspace, $rootScope) {
        this.codenvyStack = codenvyStack;
        this.codenvyWorkspace = codenvyWorkspace;
        this.$rootScope = $rootScope;

        this.stacks = [];
        this.workspaces = [];

        this.createChoice = 'new-workspace';

        let promiseStack = codenvyStack.fetchStacks();
        promiseStack.then(() => {
                this.updateDataStacks();
            },
            (error) => {
                // etag handling so also retrieve last data that were fetched before
                if (error.status === 304) {
                    // ok
                    this.updateDataStacks();
                }
            });

        let promiseWorkspaces = codenvyWorkspace.fetchWorkspaces();
        promiseWorkspaces.then(() => {
                this.updateDataWorkspaces();
            },
            (error) => {
                // etag handling so also retrieve last data that were fetched before
                if (error.status === 304) {
                    // ok
                    this.updateDataWorkspaces();
                }
            });
    }

    updateDataStacks() {
        this.stacks.length = 0;
        var remoteStacks = this.codenvyStack.getStacks();
        // remote stacks are
        remoteStacks.forEach((stack) => {
            this.stacks.push(stack);
        });

    }

    hitRadioButton() {
        this.callbackController.stackLibraryChoice(this.createChoice);
    }

    updateDataWorkspaces() {
        this.workspaces.length = 0;
        var remoteWorkspaces = this.codenvyWorkspace.getWorkspaces();
        // remote woceskspax are
        remoteWorkspaces.forEach((workspace) => {
            this.workspaces.push(workspace);
        });
    }


    initCallbackController(controller) {
        this.callbackController = controller;
    }


    /**
     * Provides tooltip data from a stack
     * @param stack the data to analyze
     */
    getTooltip(stack) {
        // get components and add data from the components
        let text = '';
        stack.components.forEach((component) => {
            text += component.name + ':' + component.version + '   ';
        });
        return text;
    }

}

export default CreateProjectStackLibraryCtrl;
