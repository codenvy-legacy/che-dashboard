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

export class UpgradeInstallationCtrl {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor($rootScope, imsSaasAuthApi, imsUpdateApi, imsArtifactApi) {
    this.imsUpdateApi = imsUpdateApi;
    this.$rootScope = $rootScope;
    this.fetchAll = false;
    this.$rootScope.$watch(
      () => imsSaasAuthApi.promise,
      (newValue) => { this.updateSubscriptionStatus(newValue); }
    );
    // by default, false, until login and subscription check
    this.subscriptionOk = false;

    this.upgradable = false;

    this.codenvyUpgradableArtifact = undefined;

    let promise = imsArtifactApi.artifacts();

    promise.then((artifacts) => {
      this.fetchAll = true;
      this.updateUpgradable(artifacts);
    }, () => {
      this.errorFetching = true;
      this.updateUpgradable(undefined);
    });
  }

  saveSchedule() {
    // Not implemented yet
  }

  updateSubscriptionStatus(value) {
    if (value) {
      this.subscriptionOk = true;
    } else {
      this.subscriptionOk = false;
    }
    this.$rootScope.$broadcast('cdvyPanel:disabled', {id: 'upgrade-your-installation-panel', disabled: this.isSectionDisabled()});
  }

  isSectionDisabled() {
    return !this.subscriptionOk;
  }

  updateUpgradable(artifacts) {
    // only one artifact can be installed at a time
    // search if there is one with the correct status
    if (!artifacts) {
      return;
    }
    if (artifacts.codenvy && artifacts.codenvy.toInstall) {
      artifacts.codenvy.toInstall.forEach((artifact) => {
        if ('READY_TO_INSTALL' === artifact.status) {
          this.codenvyUpgradableArtifact = artifact;
        }
      });
    }
  }

  install() {
    this.imsUpdateApi.update();
  }
}

