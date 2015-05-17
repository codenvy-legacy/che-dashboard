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

/**
 * @ngdoc directive
 * @name account.creditcard.directive:addCreditcard
 * @restrict E
 * @element
 *
 * @description
 * <add-creditcard></add-creditcard> for adding account creditcard.
 *
 * @usage
 *   <add-creditcard></add-creditcard>
 *
 * @author Ann Shumilova
 */
class AddCreditcard {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor ($timeout) {
    this.$timeout = $timeout;
    this.restrict='E';
    this.templateUrl = 'app/navbar/account/creditcard/add-creditcard.html';
    this.controller = 'AddCreditcardCtrl';
    this.controllerAs = 'addCreditcardCtrl';

    this.bindToController = true;

    this.scope = true;
  }

  link($scope, element, attrs) {
    /*attrs.$observe('loaded', function (val) {
      if (val === 'true') {
        $scope.addCreditcardCtrl.getCard();
      }
    });*/
    var t = this;
    $scope.$watch(function() { return element.is(':visible'); }, function() {
      //Check credit card is already loaded not to load it twice:
      if (element.is(':visible') && element.find('.card-wrapper').children().length === 0) {
        //Timeout is needed to wait form components also to become visible to be able to bind them:
        t.$timeout(function() {
          $scope.addCreditcardCtrl.getCard();
        }, 200);
      }
    });

  }
}

export default AddCreditcard;
