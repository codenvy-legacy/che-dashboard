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
 * Test the git URL
 * @author Florent Benoit
 */

describe('git-url-validator', function() {
  var $scope, form;

  beforeEach(module('userDashboard'));


  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope;
    var element = angular.element(
      '<form name="form">' +
      '<input ng-model="model.myURL" name="url" git-url />' +
      '</form>'
    );
    $scope.model = { myURL: null }
    $compile(element)($scope);
    $scope.$digest();
    form = $scope.form;
  }));

  describe('checkUrls', function() {

    it('ssh URLs', function() {
      var validUrls = ['ssh://user@host.xz:port/path/to/repo.git/',
        'ssh://user@host.xz/path/to/repo.git/',
        'ssh://host.xz:port/path/to/repo.git/',
        'ssh://host.xz:port/path/to/repo.git/',
        'ssh://host.xz/path/to/repo.git/',
        'ssh://user@host.xz/path/to/repo.git/',
        'ssh://host.xz/path/to/repo.git/',
        'ssh://user@host.xz/~user/path/to/repo.git/',
        'ssh://host.xz/~user/path/to/repo.git/',
        'ssh://user@host.xz/~/path/to/repo.git',
        'ssh://host.xz/~/path/to/repo.git'
      ];

      validUrls.forEach(function (url) {
        form.url.$setViewValue(url);
        expect($scope.model.myURL).toEqual(url);
        expect(form.url.$valid).toBe(true);
      });
    });


    it('gitHUb URL', function() {
      form.url.$setViewValue('https://github.com/codenvy/user-dashboard');
      expect($scope.model.myURL).toEqual('https://github.com/codenvy/user-dashboard');
      expect(form.url.$valid).toBe(true);
    });

    it('bitbucket URL', function() {
      form.url.$setViewValue('https://newuserme@bitbucket.org/newuserme/bb101repo.git');
      expect($scope.model.myURL).toEqual('https://newuserme@bitbucket.org/newuserme/bb101repo.git');
      expect(form.url.$valid).toBe(true);
    });

    it('invalids URLs', function() {
      var invalidUrls = ['eeeee'];
      invalidUrls.forEach(function (url) {
        form.url.$setViewValue(url);
        // undefined model
        expect($scope.model.myURL).toBeUndefined();
        // invalid
        expect(form.url.$valid).toBe(false);
        expect(form.url.$invalid).toBe(true);
      });
    });
  });
});