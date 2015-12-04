angular.module('Techtalk')
  .factory('API', function ($http, config) {
    return {
      getUsers: function () {
        return $http.get(config.Urls.URLService + '/api/users');
      },
      createUser: function (user) {
        return $http.post(config.Urls.URLService +'/api/user/', user);
      },
      deleteUser: function (id) {
        return $http.delete(config.Urls.URLService +'/api/user/' + id);
      }
    }
  });