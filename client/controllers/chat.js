angular.module('Techtalk')
	.controller('ChatCtrl', function ($scope, $rootScope, socket, $window) {

		$scope.formData = {};
		$scope.messages = [];
		$scope.users = [];

		$scope.login = function () {
			socket.emit('user:connect', { name: $scope.formData.nickname }, function (data) {
				$window.localStorage.currentUser = JSON.stringify(data.user);
				$rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
				$scope.users = data.users;
				$scope.messages = [];
			});
		};

		$scope.sendMessage = function () { 
			socket.emit('send:message', { message: $scope.formData.message }, function (data) {
				$scope.messages.push(data);
			});

			$scope.formData.message = '';
		};

		socket.on('send:broad', function (data) {
			$scope.messages.push(data);
		});

		socket.on('user:join', function (data) {
			$scope.messages.push(data.message);
			$scope.users.push(data.user);
		});

		socket.on('user:left', function (data) {
			$scope.messages.push(data.message);

			for (var i = 0; i < $scope.users.length; i++) {
				var user = $scope.users[i];
				if (user.id === data.user.id) {
					$scope.users.splice(i, 1);
					break;
				}
			}
		});

		socket.on('disconnect', function () {
			delete $window.localStorage.currentUser;
		});

		$scope.isAuthenticated = function () {
			return $window.localStorage.currentUser != undefined;
		};

		if ($scope.isAuthenticated()) {
			$rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
			
			socket.emit('user:getUser', { user: $rootScope.currentUser }, function (data) {
				$scope.users = data.users;
				$scope.messages = data.messages;
			});
		}
	});