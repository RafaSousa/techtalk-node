angular.module('Techtalk')
  .controller('NavbarCtrl', function ($scope, $rootScope, socket, $window) {

    $scope.isAuthenticated = function () {
      return $window.localStorage.currentUser != undefined;
    };

    $scope.logout = function () {
      socket.emit('send:logout', { user: $rootScope.currentUser }, function (data) {
        delete $window.localStorage.currentUser;
      });
    };
  });