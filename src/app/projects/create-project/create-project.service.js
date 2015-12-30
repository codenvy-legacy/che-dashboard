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
/*global $:false */

/**
 * This class is handling the service for the creation of projects
 * @author Florent Benoit
 */
class CreateProjectSvc {

    /**
     * Default constructor that is using resource
     * @ngInject for Dependency injection
     */
    constructor ($timeout, $compile) {
        this.$timeout = $timeout;
        this.$compile = $compile;
        this.init = false;


        this.createProjectInProgress = false;

        this.currentProgressStep = 0;


        this.creationSteps = [
            {text: 'Create and initialize workspace', inProgressText: 'Creating workspace', logs: '', hasError: false},
            {text: 'Start workspace master', inProgressText: 'Starting workspace master', logs: '', hasError: false},
            {text: 'Inject workspace agent', inProgressText: 'Injecting workspace agent', logs: '', hasError: false},
            {text: 'Create project', inProgressText: 'Creating project', logs: '', hasError: false},
            {text: 'Project created', inProgressText: 'Opening project', logs: '', hasError: false}
        ];


        this.popupVisible = false;
        this.initPopup = false;


    }


    getStepText(stepNumber) {
        let entry = this.creationSteps[stepNumber];
        if (this.currentProgressStep >= stepNumber) {
            return entry.inProgressText;
        } else {
            return entry.text;
        }
    }

    getProjectCreationSteps() {
        return this.creationSteps;
    }

    setCurrentProgressStep(currentProgressStep) {
        this.currentProgressStep = currentProgressStep;
    }

    getCurrentProgressStep() {
        return this.currentProgressStep;
    }

    hasInit() {
        return this.init;
    }

    isShowPopup() {
        return this.popupVisible;
    }

    showPopup() {
        this.popupVisible = true;
    }

    hidePopup() {
        this.popupVisible = false;
    }


    resetCreateProgress() {
        this.creationSteps.forEach((step) => {
            step.logs = '';
            step.hasError = false;
        });
        this.currentProgressStep = 0;

        this.createProjectInProgress = false;
    }


    isCreateProjectInProgress() {
        return this.createProjectInProgress;
    }

    setCreateProjectInProgress(value) {
        this.createProjectInProgress = value;
    }

    setWorkspaceOfProject(workspaceOfProject) {
        this.workspaceOfProject = workspaceOfProject;
    }

    getWorkspaceOfProject() {
        return this.workspaceOfProject;
    }

    setProject(project) {
        this.project = project;
    }

    getProject() {
        return this.project;
    }

    createPopup() {
        if (!this.initPopup) {
            this.initPopup = true;
            // The new element to be added
            var $div = $('<create-project-popup></create-project-popup>');

            // The parent of the new element
            var $target = $('body');

            let $scope = angular.element($target).scope();
            let insertHtml = this.$compile($div)($scope);
            $target.append(insertHtml);
        }

    }

}

export default CreateProjectSvc;
