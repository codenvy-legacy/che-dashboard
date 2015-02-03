'use strict';
/*jshint esnext: true */

class LoginCtrl {
  /*@ngInject*/
  constructor($scope, $rootScope, $timeout, $http, $location, $cookies, $window) {

    $scope.username = 'test';
    $scope.password = 'test';
    $scope.submit = function () {
      $http({
        url: "/api/auth/login",
        method: "POST",
        data: { "username": $scope.username, "password": $scope.password}
      }).then(function (response) { // success
        $cookies.token = response.data.value;
        $cookies.refreshStatus = "DISABLED";
      }, function (response) { // optional
        console.log("error on login");
        alert('error');
        console.log(response);
      });
    };
  }
}


export default LoginCtrl;



