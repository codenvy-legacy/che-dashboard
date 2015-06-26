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

class OnPremConfigurationCtrl {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor(imsConfigApi, $mdDialog, $rootScope, $timeout) {
    this.imsConfigApi = imsConfigApi;
    this.$mdDialog = $mdDialog;

    this.editorOptions = {
      lineWrapping: true,
      lineNumbers: true,
      mode: 'text/plain',
      lint: false,
      foldgutter: false,
      matchBrackets: true,
      autoCloseBrackets: true,
      styleActiveLine: true,
      theme: 'codenvy'
    };

    this.editorOptions.onLoad = (instance => this.codemirrorLoaded(instance, $rootScope, $timeout));

    this._enterSubmitState();
    this._retrieveConfig();
  }

  _retrieveConfig() {
    this.imsConfigApi.getIMConfig().$promise.then((response) => this._formatConfig(response))
                                            .then(() => this._exitSubmitState());
  }

  _formatConfig(response) {
    this.unmodifiedConfig = this._filterUnwanted(angular.fromJson(response.toJSON()));
    let props = [];
    for (let [key, value] of this.unmodifiedConfig) {
      props.push(key);
    }
    props.sort();

    let result = '';
    for (let propName of props) {
      let value = this.unmodifiedConfig.get(propName);
      result = result + propName + ' ' + value + '\n';
    }
    this.config = result;
  }

  /**
   * Filter out properties we know doen't hold real values
   * @param {config|object}
   * @return a Map
   */
  _filterUnwanted(config) {
    let result = new Map();
    for (let key of Object.getOwnPropertyNames(config)) {
      if (!key.match(/password$|_pass$|secret$/)) {
        result.set(key, config[key]);
      }
    }
    return result;
  }

  updateConfig() {
    let lines = this.config.split('\n');
    let config = new Map();

    for (let line of lines) {
      let parseLineResult = this._handleLine(line);
      if (parseLineResult) {
        let [key, value] = parseLineResult;
        if (config.get(key)) {
          // already seen the key, warn and abort
          this._warnDuplicate(key);
          return;
        } else {
          config.set(key, value);
        }
      }
    }
    let filtered = this._filterUnchanged(config);
    if (filtered && filtered.size > 0) {
      this._enterSubmitState();
      this.imsConfigApi.setIMConfig(filtered).$promise.then((response) => this._updateSuccess()).catch((error) => this._updateError(error));
    }
  }

  _filterUnchanged(config) {
    let result = new Map();
    for (let [key, value] of config) {
      if (this.unmodifiedConfig.get(key) !== value) {
        result.set(key, value);
      }
    }
    return result;
  }

  _updateSuccess() {
    // the config was changed, read it again
    this._retrieveConfig();
  }

  _updateError(error) {
    if (error.status === 404) {
      // there was an invalid property
      let payload = angular.fromJson(error.data);
      if (payload.properties && payload.properties.length > 0) {
        this._warnInvalidProperties(payload.properties);
        this._exitSubmitState();
      }
      // will not synchronize the content to let the user fix their changes
    } else {
      // synchronize content with actual values
      this._retrieveConfig();
    }
  }

  /**
   * Parses a line.
   * @param {line|string} the line to parse
   * @returns [key, value] or undefined
   */
  _handleLine(line) {
      let words = line.split(' ');
      switch (words.length) {
        case 0:
          return;
        case 1:
          let key = words[0];
          if (key.length > 0) {
            return [key, ''];
          } else {
            return;
          }
        default:
          return [words[0], words.slice(1).join(' ')];
      }
  }

  _warnDuplicate(key) {
    console.log(`Codenvy configuration editor: the ${key} property is set multiple times ; aborting update.`);
    let aborted = this.$mdDialog.alert()
      .title('Update Configuration Aborted')
      .content(`There is more than one value for the property '${key}'`)
      .ok('Close');
    this.$mdDialog.show(aborted);
  }

  _warnInvalidProperties(properties) {
    console.log(`Codenvy configuration editor: the following properties are not accepted. Update cancelled.`, properties);
    let errorDialog = this.$mdDialog.alert()
      .title('Update Configuration Aborted')
      .ok('Close');
    if (properties.length == 1) {
      errorDialog.content(`The property ${properties[0]} is not a known configuration property name. The configuration was not updated.`);
    } else {
      errorDialog.content(`Some properties were not known configuration property names. The configuration was not updated. (properties: ${properties.join(', ')}).`);
    }
    this.$mdDialog.show(errorDialog);
  }

  _enterSubmitState() {
    this.editorOptions.readOnly = 'nocursor';
    this.submitState = true;
  }

  _exitSubmitState() {
    this.editorOptions.readOnly = false;
    this.submitState = false;
  }

  codemirrorLoaded(instance, $rootScope, $timeout) {
    $rootScope.$watch(() => $rootScope.waitingLoaded, (newValue) => {
      if (newValue) {
        $timeout(() => instance.refresh(), 500);
      }
    });
  }
}

export default OnPremConfigurationCtrl;
