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


import Register from '../../utils/register';

/**
 * @ngdoc controller
 * @name components.controller:CodenvyDropZoneCtrl
 * @description This class is handling the controller of a dropzone
 * @author Florent Benoit
 */
class CodenvyDropZoneCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($scope, lodash) {
    this.$scope = $scope;
    this.lodash = lodash;
    this.HOVER_KO_CLASS = 'cdvy-dropzone-hover-ko';
    this.HOVER_OK_CLASS = 'cdvy-dropzone-hover-ok';
    this.errorMessage = null;
  }




  dropCallback(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var url = evt.dataTransfer.getData('URL');
    if (url == null) {
      this.$scope.$apply(() => {
        this.dropClass = this.HOVER_KO_CLASS;
      });
      return;
    }

    let delegateController = this.$scope.codenvyDropZoneCtrl.callbackController;

    // promise
    let acceptPromise = delegateController.dropzoneAcceptURL(url);

    // waiting answer
    this.$scope.$apply(() => {
      this.waitingDrop = true;
    });

    acceptPromise.then(() => {
      this.waitingDrop = false;
      this.dropClass = '';
    }, (error) => {
      this.waitingDrop = false;
      this.dropClass = this.HOVER_KO_CLASS;
      if (error.data && error.data.message) {
        this.errorMessage = error.data.message;
      } else {
        this.errorMessage = error;
      }
    });

  }


  dragoverCallback(evt) {

    evt.stopPropagation();
    evt.preventDefault();
    var okFiles = evt.dataTransfer && evt.dataTransfer && evt.dataTransfer.types && this.lodash.indexOf(evt.dataTransfer.types, 'Files') >= 0;
    var okURI = evt.dataTransfer && evt.dataTransfer && evt.dataTransfer.types && this.lodash.indexOf(evt.dataTransfer.types, 'text/uri-list') >= 0;

    var ok = okFiles || okURI;

    this.$scope.$apply(() => {
      if (ok) {
        this.dropClass = this.HOVER_OK_CLASS;
      } else {
        this.dropClass = this.HOVER_KO_CLASS;
      }
    });
  }


  dragEnterCallback(evt) {
    this.cleanup(evt);
  }

  dragLeaveCallback(evt) {
    this.cleanup(evt);
  }


  cleanup(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    this.$scope.$apply(() => {
      this.waitingDrop = false;
      this.dropClass = '';
      this.errorMessage = '';
    });
  }


}


export default CodenvyDropZoneCtrl;

Register.getInstance().controller('CodenvyDropZoneCtrl', CodenvyDropZoneCtrl);
