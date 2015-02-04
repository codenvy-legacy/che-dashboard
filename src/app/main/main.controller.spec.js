'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('userDashboard'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('empty', inject(function($controller) {
    expect(scope.awesomeThings).toBeUndefined();

    $controller('MainCtrl', {
      $scope: scope
    });

  }));
});
