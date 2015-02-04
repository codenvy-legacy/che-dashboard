'use strict';
/*jshint esnext: true */

class LoginCtrl {
  /*@ngInject*/
  constructor($scope, $http, $cookies, $window, $location) {

    $scope.username = 'test';
    $scope.password = 'test';
    $scope.submit = function () {
      $http({
        url: '/api/auth/login',
        method: 'POST',
        data: { 'username': $scope.username, 'password': $scope.password}
      }).then(function (response) {
        $cookies.token = response.data.value;
        $cookies.refreshStatus = 'DISABLED';
        $location.path('#/');

      }, function (response) {
        console.log('error on login');
        $window.alert('error');
        console.log(response);
      });
    };
  }
}


export default LoginCtrl;



