

var appTechtalk = angular.module('appTechtalk', []);

function mainController($scope) {

    var socket = io.connect('http://localhost:8080');

    $scope.talks = [];
    $scope.formData = {};
    $scope.offilne = true;
    $scope.techName = '';
    $scope.qtyOnline = 0;

    $scope.send = function () {
        socket.emit('sendMessage', { text: $scope.formData.text });
        $scope.formData.text = '';
    };

    $scope.login = function () {
        socket.emit('setConnection', { name: $scope.formData.name }, function(res) {
            $scope.$apply(function () {
                $scope.offilne = false; 
            });
        });
    };
    
    socket.on('connect', function (data) {
        
        socket.on('disconnect', function () {
            $scope.offilne = true;
        });
        
        console.log('connect', data);
    });
    
    socket.on('sendBroadcast', function (data) {
        $scope.$apply(function () {
            $scope.talks.push(data);
        });

        console.log('sendBroadcast', data);
    });
    
    socket.on('sendQtyOnline', function (data) {
        $scope.$apply(function () {
            $scope.techName = data.name;
            $scope.qtyOnline = data.qtyOnline;
        });

        console.log('sendQtyOnline', data);
    });
}

appTechtalk.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                var $id = $("#" + attrs.ngScrollBottom);
                $id.scrollTop($id[0].scrollHeight);
                event.preventDefault();
            }
        });
    };
});

appTechtalk.directive("ngScrollBottom", function () {
    return {
        link: function (scope, element, attr) {
            var $id = $("#" + attr.ngScrollBottom);
            $(element).on("click", function () {
                $id.scrollTop($id[0].scrollHeight);
            });
        }
    }
});