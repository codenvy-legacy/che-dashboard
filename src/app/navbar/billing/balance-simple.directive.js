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
 * Defines a directive for displaying simple balance info (with two values).
 * @author Ann Shumilova
 */
export class BalanceSimple {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
    constructor () {
    this.restrict = 'E';
    this.templateUrl = 'app/navbar/billing/balance-simple.html';
    this.replace = true;

    this.scope = {
      consumed: '@cdvyConsumed',
      consumedDescription: '@cdvyConsumedDescription',
      provided: '@cdvyProvided',
      providedDescription: '@cdvyProvidedDescription',
      layout: '@cdvyLayout',
      layoutAlign: '@cdvyLayoutAlign'
    };

  }

  link($scope, element, attrs) {
    var t = this;

    attrs.$observe('cdvyConsumed', function () {
      if ($scope.consumed && $scope.provided) {
        t.initChart($scope);
      }
    });

    attrs.$observe('cdvyProvided', function () {
      if ($scope.consumed && $scope.provided) {
        t.initChart($scope);
      }
    });

  }

  initChart($scope) {
    let available = $scope.provided - $scope.consumed;
    let consumedPercents = ($scope.consumed * 100 / $scope.provided).toFixed(0);
    let availablePercents = 100 - consumedPercents;
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
      colors: ['#4e5a96', '#d4d4d4']
    };

    $scope.data = {
      data: [{
        x: 'Consumed',
        y: [$scope.consumed],
        tooltip: 'Consumed (' + consumedPercents + '%)'
      }, {
        x: 'Available',
        y: [available],
        tooltip: 'Available (' + availablePercents + '%)'
      }]
    };
    $scope.chartEnabled = true;

  }
}
