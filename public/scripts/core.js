// public/core.js
var appTechtalk = angular.module('appTechtalk', []);

function mainController($scope, $http) {
    $scope.formData = {};

    $http.get('/api/tech')
        .success(function(data) {
            $scope.techList = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.createTech = function() {
        $http.post('/api/tech', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.techList = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.deleteTech = function(id) {
        $http.delete('/api/tech/' + id)
            .success(function(data) {
                $scope.techList = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}