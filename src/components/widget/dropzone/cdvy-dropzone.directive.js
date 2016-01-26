/*
 * Copyright (c) 2015-2016 Codenvy, S.A.
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
 * @ngdoc directive
 * @name components.directive:cdvyDropzone
 * @restrict E
 * @function
 * @element
 *
 * @description
 * `<cdvy-dropzone>` defines a drop box used to drag and drop data.
 *
 * @param {string=} cdvy-title the title of the panel
 *
 * @usage
 *   <cdvy-dropzone></cdvy-dropzone>
 *
 * @example
 <example module="userDashboard">
 <file name="index.html">
 <cdvy-dropzone>This is a drag and drop zone</cdvy-dropzone>
 </file>
 </example>
 * @author Florent Benoit
 */
export class CodenvyDropZone {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict = 'E';
    this.transclude = true;
    this.bindToController = true;
    this.replace = true;

    this.controller = 'CodenvyDropZoneCtrl';
    this.controllerAs = 'codenvyDropZoneCtrl';


    this.scope = {
      callbackController: '=cdvyCallbackController'
    };

  }


  /**
   * Template for the current drop zone
   * @returns {string} the template
   */
  template(){
    var template = '<div ng-class="codenvyDropZoneCtrl.dropClass" class="cdvy-dropzone" flex layout="row" layout-align="center center">'
      + '<div>Drag and drop a plug-in</div>'
      + '<div ng-show="codenvyDropZoneCtrl.errorMessage">{{codenvyDropZoneCtrl.errorMessage}}</div>'
      + '<md-progress-circular ng-show="codenvyDropZoneCtrl.waitingDrop" md-theme="maincontent-theme" md-mode="indeterminate">'
      + '</md-progress-circular></div>';
    return template;
  }



  /**
   * Keep reference to the model controller
   */
  link($scope, element, attributes, controller) {
    let innerElement = element[0];

    innerElement.addEventListener('dragenter', (evt) =>  {
      controller.dragEnterCallback(evt);
    });

    innerElement.addEventListener('dragleave', (evt) =>  {
      controller.dragLeaveCallback(evt);
    });
    innerElement.addEventListener('dragover', (evt) =>  {
      controller.dragoverCallback(evt);
    });

    innerElement.addEventListener('drop', (evt) =>  {
      controller.dropCallback(evt);
    });


  }

}
