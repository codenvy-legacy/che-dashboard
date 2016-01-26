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
 * Defines a directive for displaying extended balance info (with three values).
 * @author Ann Shumilova
 */
export class BalanceExtended {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
    constructor () {
    this.restrict = 'E';
    this.templateUrl = 'app/navbar/billing/balance-extended.html';
    this.replace = true;

    this.scope = {
      consumed: '@cdvyConsumed',
      consumedDescription: '@cdvyConsumedDescription',
      provided: '@cdvyProvided',
      providedDescription: '@cdvyProvidedDescription',
      charged: '@cdvyCharged',
      chargedDescription: '@cdvyChargedDescription',
      layout: '@cdvyLayout',
      layoutAlign: '@cdvyLayoutAlign'

    };

  }

  link($scope, element, attrs) {
    var t = this;

    attrs.$observe('cdvyConsumed', function () {
      if ($scope.consumed && $scope.provided && $scope.charged) {
        t.initChart($scope);
      }
    });

    attrs.$observe('cdvyProvided', function () {
      if ($scope.consumed && $scope.provided && $scope.charged) {
        t.initChart($scope);
      }
    });

    attrs.$observe('cdvyCharged', function () {
      if ($scope.consumed && $scope.provided && $scope.charged) {
        t.initChart($scope);
      }
    });
  }

  initChart($scope) {
    let isCharged = parseFloat($scope.provided) < parseFloat($scope.consumed);
    let dataX= isCharged ? $scope.provided : $scope.consumed;
    let dataY= isCharged ? $scope.charged : ($scope.provided - $scope.consumed);
    let dataXPercents = isCharged ? ($scope.provided * 100 / $scope.consumed).toFixed(0) : ($scope.consumed * 100 / $scope.provided).toFixed(0);
    let dataYPercents = 100 - dataXPercents;
    let dataXColor = isCharged ? '#3b9275' : '#4e5a96';
    let dataYColor = isCharged ? '#f17a3d' : '#3b9275';

    $scope.config = {
      tooltips: true,
      labels: false,
      mouseover: function() {},
      mouseout: function() {},
      click: function() {},
      legend: {
        display: false,
        position: 'right'
      },
      innerRadius: '25',
      colors: [dataXColor, dataYColor]
    };

    $scope.data = {
      data: [{
        x: 'Consumed',
        y: [dataX],
        tooltip: dataXPercents + '%'
      }, {
        x: 'Available',
        y: [dataY],
        tooltip: dataYPercents +'%'
      }]
    };
    $scope.chartEnabled = true;

  }
}
