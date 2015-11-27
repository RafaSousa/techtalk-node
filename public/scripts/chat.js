

var appTechtalk = angular.module('appTechtalk', []);

function mainController($scope) {

    var socket = io.connect('http://localhost:8080');

    $scope.talks = [];
    $scope.formData = {};

    $scope.send = function () {
        var data = {
            name: 'Rafa Sousa',
            text: $scope.formData.text,
            time: new Date()
        };
        
        socket.emit('messages', data);
        
        $scope.talks.push(data);
        
        $scope.formData.text = '';
        
        $("#tweets").scrollTop($("#tweets")[0].scrollHeight + 550);
    };

    socket.on('connect', function (data) {
        socket.emit('join', 'Hello World from client');
    });

    socket.on('messages', function (data) {
        console.log('messages', data);
    });

    socket.on('broad', function (data) {
        $scope.talks.push(data);
        console.log('broad', data);
    });
}