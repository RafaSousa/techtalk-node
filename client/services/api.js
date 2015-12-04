angular.module('Techtalk')
  .factory('API', function ($http) {
    return {
      getUsers: function () {
        return $http.get('/api/users');
      },
      createUser: function (user) {
        return $http.post('/api/user/', user);
      },
      deleteUser: function (id) {
        return $http.delete('/api/user/' + id);
      }
    }
  });