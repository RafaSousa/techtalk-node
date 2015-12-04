angular.module('Techtalk')
    .controller('HomeCtrl', function ($scope, $rootScope, API) {

        API.getUsers().success(function (data) {
            $scope.users = data;
        });

        $scope.createUser = function () {
            API.createUser($scope.formData).success(function (data) {
                $scope.formData = {};
                $scope.users = data;
            });
        };

        $scope.deleteUser = function (id) {
            API.deleteUser(id).success(function (data) {
                $scope.users = data;
            });
        };
    });